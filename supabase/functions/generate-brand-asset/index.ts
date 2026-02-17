import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface GenerateAssetRequest {
  asset_id: string;
  template_type: string;
  dimensions: string;
  headline?: string;
  tagline?: string;
  asset_type: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not configured");
    if (!SUPABASE_ANON_KEY) throw new Error("SUPABASE_ANON_KEY is not configured");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

    // --- Authentication: require valid user JWT + team membership ---
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check team membership using service role client
    const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const { data: member } = await serviceClient
      .from("team_members")
      .select("id")
      .eq("user_id", userId)
      .single();

    if (!member) {
      return new Response(
        JSON.stringify({ error: "Team access required" }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // --- End authentication ---

    const body: GenerateAssetRequest = await req.json();
    const { asset_id, template_type, dimensions, headline, tagline, asset_type } = body;

    // Build AI prompt based on template type
    const templatePrompts: Record<string, string> = {
      "instagram-post": "Create a professional Instagram post graphic",
      "facebook-cover": "Create a Facebook cover photo",
      "twitter-header": "Create a Twitter/X header banner",
      "linkedin-post": "Create a LinkedIn post image",
      "email-header": "Create an email newsletter header banner",
      "email-signature": "Create a professional email signature block",
      "letterhead": "Create a business letterhead design",
      "invoice-header": "Create an invoice header design",
      "presentation-slide": "Create a presentation slide background",
    };

    const basePrompt = templatePrompts[template_type] || "Create a professional marketing graphic";
    
    const prompt = `${basePrompt} for Sentorise, a European LiFePO4 battery brand for RV, off-grid, and solar applications. 
Brand colors: Forest green (#1a472a), lime accent (#84cc16), dark charcoal, white.
Style: Professional, technical, trustworthy, clean industrial design.
Dimensions: ${dimensions}
${headline ? `Main text: "${headline}"` : ""}
${tagline ? `Subtext: "${tagline}"` : ""}
Include the Sentorise brand feel with clean lines, battery/energy imagery if appropriate.
Ultra high resolution, crisp and modern.`;

    console.log("Generating asset with prompt:", prompt);

    // Call Lovable AI Gateway for image generation
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits to continue." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI generation failed: ${response.status}`);
    }

    const aiResult = await response.json();
    const imageData = aiResult.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageData) {
      throw new Error("No image generated by AI");
    }

    // Extract base64 data and upload to storage
    const base64Data = imageData.replace(/^data:image\/\w+;base64,/, "");
    const imageBytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const fileName = `${asset_id}.png`;
    const { data: uploadData, error: uploadError } = await serviceClient.storage
      .from("brand-assets")
      .upload(fileName, imageBytes, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: urlData } = serviceClient.storage.from("brand-assets").getPublicUrl(fileName);
    const imageUrl = urlData.publicUrl;

    // Update the asset record with the image URL
    const { error: updateError } = await serviceClient
      .from("brand_assets")
      .update({
        image_url: imageUrl,
        status: "published",
      })
      .eq("id", asset_id);

    if (updateError) {
      console.error("Database update error:", updateError);
      throw new Error(`Failed to update asset: ${updateError.message}`);
    }

    console.log("Asset generated successfully:", imageUrl);

    return new Response(
      JSON.stringify({ success: true, image_url: imageUrl }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error generating brand asset:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
