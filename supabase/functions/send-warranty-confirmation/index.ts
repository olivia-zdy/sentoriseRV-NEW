import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting configuration - strict for email function
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_EMAILS_PER_IP = 5; // 5 emails per hour per IP

interface WarrantyConfirmationRequest {
  name: string;
  email: string;
  product_name: string;
  purchase_date: string;
  warranty_end_date: string;
  serial_number?: string;
  order_number?: string;
}

// Sanitize error messages to prevent information leakage
function getSafeErrorMessage(error: unknown): string {
  if (!(error instanceof Error)) return "An unexpected error occurred. Please try again.";
  
  const msg = error.message.toLowerCase();
  
  // Map known errors to safe messages
  if (msg.includes("rate limit")) return "Too many requests. Please try again later.";
  if (msg.includes("missing required")) return "Invalid request data.";
  if (msg.includes("warranty not found") || msg.includes("no matching")) return "Unable to process request.";
  if (msg.includes("resend") || msg.includes("email")) return "Email service temporarily unavailable.";
  if (msg.includes("not configured")) return "Service temporarily unavailable.";
  
  // Generic fallback - never expose internal error details
  return "An error occurred. Please contact support@sentorise.com if this persists.";
}

// Check rate limit using the rate_limits table
async function checkRateLimit(clientIp: string): Promise<{ allowed: boolean; error?: string }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Rate limiting skipped: Supabase credentials not configured");
    return { allowed: true };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const rateLimitKey = `warranty-email:${clientIp}`;
  const now = Math.floor(Date.now() / 1000);

  try {
    const { data: existing, error: selectError } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("key", rateLimitKey)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Rate limit check error:", selectError);
      return { allowed: true }; // Fail open to not block legitimate users
    }

    if (existing) {
      if (now - existing.window_start < RATE_LIMIT_WINDOW) {
        if (existing.count >= MAX_EMAILS_PER_IP) {
          return { allowed: false, error: "Rate limit exceeded" };
        }
        await supabase
          .from("rate_limits")
          .update({ count: existing.count + 1 })
          .eq("key", rateLimitKey);
      } else {
        // Window expired, reset
        await supabase
          .from("rate_limits")
          .update({ count: 1, window_start: now })
          .eq("key", rateLimitKey);
      }
    } else {
      // New record
      await supabase.from("rate_limits").insert({ key: rateLimitKey, count: 1, window_start: now });
    }

    return { allowed: true };
  } catch (error) {
    console.error("Rate limit error:", error);
    return { allowed: true }; // Fail open
  }
}

// Verify warranty exists in database before sending email
async function verifyWarrantyExists(data: WarrantyConfirmationRequest): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Warranty verification skipped: Supabase credentials not configured");
    return true; // Allow if we can't verify
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // Check if a matching warranty registration exists
    const { data: warranty, error } = await supabase
      .from("warranty_registrations")
      .select("id")
      .eq("email", data.email.toLowerCase().trim())
      .eq("product_name", data.product_name)
      .eq("purchase_date", data.purchase_date)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.error("Warranty verification error:", error);
      return false;
    }

    return warranty !== null;
  } catch (error) {
    console.error("Warranty verification exception:", error);
    return false;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    console.log(`Warranty email request from IP: ${clientIp}`);

    // Check rate limit FIRST
    const rateLimitResult = await checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse request body
    let data: WarrantyConfirmationRequest;
    try {
      data = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid request data." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate required fields
    if (!data.email || !data.name || !data.product_name || !data.purchase_date || !data.warranty_end_date) {
      return new Response(
        JSON.stringify({ error: "Invalid request data." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verify warranty exists in database before sending email
    const warrantyExists = await verifyWarrantyExists(data);
    if (!warrantyExists) {
      console.warn(`No matching warranty found for email: ${data.email}, product: ${data.product_name}`);
      return new Response(
        JSON.stringify({ error: "Unable to process request." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Format dates for display
    const purchaseDate = new Date(data.purchase_date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const warrantyEndDate = new Date(data.warranty_end_date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 30px; text-align: center; background: linear-gradient(135deg, #059669 0%, #10b981 100%);">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">Sentorise</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 14px;">Premium LiFePO₄ Batteries</p>
            </td>
          </tr>
          
          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="color: #0f172a; margin: 0 0 20px; font-size: 24px;">
                Hallo ${data.name}! 👋
              </h2>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 20px;">
                Vielen Dank für die Registrierung Ihrer 5-Jahres-Garantie bei Sentorise. Ihre Batterie ist nun offiziell geschützt.
              </p>
              
              <p style="color: #475569; line-height: 1.6; margin: 0 0 30px;">
                Thank you for registering your 5-year warranty with Sentorise. Your battery is now officially protected.
              </p>
              
              <!-- Warranty Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px;">
                    <h3 style="color: #059669; margin: 0 0 20px; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px;">
                      🛡️ Garantiedetails / Warranty Details
                    </h3>
                    
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Produkt / Product:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600; text-align: right;">
                          ${data.product_name}
                        </td>
                      </tr>
                      ${data.serial_number ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Seriennummer / Serial:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: monospace; text-align: right;">
                          ${data.serial_number}
                        </td>
                      </tr>
                      ` : ''}
                      ${data.order_number ? `
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Bestellnummer / Order:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-family: monospace; text-align: right;">
                          ${data.order_number}
                        </td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Kaufdatum / Purchase Date:</td>
                        <td style="padding: 8px 0; color: #0f172a; font-size: 14px; text-align: right;">
                          ${purchaseDate}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0 8px; border-top: 1px solid #bbf7d0; color: #059669; font-size: 14px; font-weight: 600;">
                          Garantie gültig bis / Valid until:
                        </td>
                        <td style="padding: 12px 0 8px; border-top: 1px solid #bbf7d0; color: #059669; font-size: 16px; font-weight: 700; text-align: right;">
                          ${warrantyEndDate}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- What's Covered -->
              <h3 style="color: #0f172a; margin: 0 0 15px; font-size: 16px;">
                Was ist abgedeckt? / What's covered?
              </h3>
              <ul style="color: #475569; line-height: 1.8; margin: 0 0 30px; padding-left: 20px;">
                <li>Produktionsfehler / Manufacturing defects</li>
                <li>BMS-Fehlfunktionen / BMS malfunctions</li>
                <li>Vorzeitiger Kapazitätsverlust unter 80% / Premature capacity loss below 80%</li>
                <li>Kostenloser Ersatz bei berechtigten Ansprüchen / Free replacement for valid claims</li>
              </ul>
              
              <!-- Support CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 24px; text-align: center;">
                    <p style="color: #475569; margin: 0 0 15px; font-size: 14px;">
                      Fragen? Unser Support-Team hilft gerne. / Questions? Our support team is here to help.
                    </p>
                    <a href="mailto:support@sentorise.com" 
                       style="display: inline-block; background-color: #059669; color: #ffffff; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                      Support kontaktieren / Contact Support
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.6;">
                Bitte bewahren Sie diese E-Mail für Ihre Unterlagen auf. / Please keep this email for your records.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 30px 40px; background-color: #0f172a; text-align: center;">
              <p style="color: #94a3b8; margin: 0 0 10px; font-size: 14px;">
                Sentorise Energy GmbH
              </p>
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                Friedrichstraße 123, 10117 Berlin, Germany
              </p>
              <p style="color: #64748b; margin: 10px 0 0; font-size: 12px;">
                <a href="https://sentorise.com" style="color: #10b981; text-decoration: none;">sentorise.com</a>
                &nbsp;|&nbsp;
                <a href="mailto:support@sentorise.com" style="color: #10b981; text-decoration: none;">support@sentorise.com</a>
              </p>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    // Send email via Resend API
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Sentorise <warranty@sentorise.com>",
        to: [data.email],
        subject: "✅ Ihre Garantie wurde registriert | Your Warranty is Registered",
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      return new Response(
        JSON.stringify({ error: "Email service temporarily unavailable." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Warranty confirmation email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-warranty-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: getSafeErrorMessage(error) }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
