import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let body: { email?: string };
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const email = body.email?.toLowerCase().trim();
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limit by IP
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
    const rateLimitKey = `warranty-lookup:${clientIp}`;
    const now = Math.floor(Date.now() / 1000);
    const WINDOW = 600; // 10 minutes
    const MAX_REQUESTS = 10;

    const { data: existing } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("key", rateLimitKey)
      .single();

    if (existing) {
      if (now - existing.window_start < WINDOW) {
        if (existing.count >= MAX_REQUESTS) {
          return new Response(
            JSON.stringify({ error: "Too many requests. Please try again later." }),
            { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }
        await supabase.from("rate_limits").update({ count: existing.count + 1 }).eq("key", rateLimitKey);
      } else {
        await supabase.from("rate_limits").update({ count: 1, window_start: now }).eq("key", rateLimitKey);
      }
    } else {
      await supabase.from("rate_limits").insert({ key: rateLimitKey, count: 1, window_start: now });
    }

    const { data, error } = await supabase
      .from("warranty_registrations")
      .select("id, product_name, serial_number, purchase_date, warranty_end_date, status, created_at")
      .eq("email", email)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Warranty lookup error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to look up warranties" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ data: data || [] }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Warranty lookup error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
