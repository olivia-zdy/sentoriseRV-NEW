import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WarrantyConfirmationRequest {
  name: string;
  email: string;
  product_name: string;
  purchase_date: string;
  warranty_end_date: string;
  serial_number?: string;
  order_number?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const data: WarrantyConfirmationRequest = await req.json();
    console.log("Sending warranty confirmation email to:", data.email);

    // Validate required fields
    if (!data.email || !data.name || !data.product_name || !data.purchase_date || !data.warranty_end_date) {
      throw new Error("Missing required fields");
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
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
        from: "Sentorise <onboarding@resend.dev>",
        to: [data.email],
        subject: "✅ Ihre Garantie wurde registriert | Your Warranty is Registered",
        html: emailHtml,
      }),
    });

    const emailResult = await emailResponse.json();

    if (!emailResponse.ok) {
      console.error("Resend API error:", emailResult);
      throw new Error(emailResult.message || "Failed to send email");
    }

    console.log("Warranty confirmation email sent successfully:", emailResult);

    return new Response(JSON.stringify({ success: true, data: emailResult }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in send-warranty-confirmation function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
