import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-webhook-secret, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface NewLeadNotification {
  lead_type: "quote_request" | "contact_submission";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  product_name?: string;
  message?: string;
  quantity?: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // --- Authentication: service role key OR internal webhook token ---
    const authHeader = req.headers.get("Authorization");
    const webhookToken = req.headers.get("x-webhook-secret");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // Internal trigger token - matches value in notify_new_lead_trigger() DB function
    const INTERNAL_WEBHOOK_TOKEN = "wh_sentorise_lead_notify_2026";

    const isServiceRole = authHeader && authHeader === `Bearer ${serviceRoleKey}`;
    const isInternalTrigger = webhookToken === INTERNAL_WEBHOOK_TOKEN;

    if (!isServiceRole && !isInternalTrigger) {
      console.log("Auth failed:", { hasAuth: !!authHeader, hasWebhook: !!webhookToken });
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    // --- End authentication ---

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const resend = new Resend(RESEND_API_KEY);
    const lead: NewLeadNotification = await req.json();

    const adminEmail = "team@sentorise.com";

    const isQuoteRequest = lead.lead_type === "quote_request";
    const subject = isQuoteRequest 
      ? `🔋 New Quote Request from ${lead.name}` 
      : `📬 New Contact Form Submission from ${lead.name}`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">
        ${isQuoteRequest ? "New Quote Request" : "New Contact Inquiry"}
      </h1>
    </div>
    
    <div style="padding: 30px;">
      <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px 0; color: #1a472a; font-size: 18px;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 100px;">Name:</td>
            <td style="padding: 8px 0; color: #1e293b; font-weight: 500;">${lead.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a></td>
          </tr>
          ${lead.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Phone:</td>
            <td style="padding: 8px 0;"><a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none;">${lead.phone}</a></td>
          </tr>
          ` : ""}
          ${lead.company ? `
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Company:</td>
            <td style="padding: 8px 0; color: #1e293b;">${lead.company}</td>
          </tr>
          ` : ""}
        </table>
      </div>

      ${isQuoteRequest && lead.product_name ? `
      <div style="background: #ecfdf5; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #10b981;">
        <h3 style="margin: 0 0 10px 0; color: #1a472a; font-size: 16px;">Product Interest</h3>
        <p style="margin: 0; color: #1e293b; font-weight: 500;">${lead.product_name}</p>
        ${lead.quantity ? `<p style="margin: 5px 0 0 0; color: #64748b;">Quantity: ${lead.quantity}</p>` : ""}
      </div>
      ` : ""}

      ${lead.message ? `
      <div style="background: #fff7ed; border-radius: 8px; padding: 20px; margin-bottom: 20px; border-left: 4px solid #f97316;">
        <h3 style="margin: 0 0 10px 0; color: #9a3412; font-size: 16px;">Message</h3>
        <p style="margin: 0; color: #1e293b; white-space: pre-wrap;">${lead.message}</p>
      </div>
      ` : ""}

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://sentorise.lovable.app/admin/leads" 
           style="display: inline-block; background: #1a472a; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          View in Lead Dashboard →
        </a>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #64748b; font-size: 14px;">
        This is an automated notification from Sentorise Lead Management
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sentorise Leads <notifications@sentorise.com>",
      to: [adminEmail],
      subject,
      html,
    });

    console.log("Lead notification email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: unknown) {
    console.error("Error sending lead notification:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
