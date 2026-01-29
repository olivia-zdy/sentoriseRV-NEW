import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
    if (!SUPABASE_URL) throw new Error("SUPABASE_URL is not configured");
    if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not configured");

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const resend = new Resend(RESEND_API_KEY);

    // Get today's date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Fetch pending reminders for today
    const { data: reminders, error: fetchError } = await supabase
      .from("follow_up_reminders")
      .select("*")
      .eq("reminder_date", today)
      .eq("status", "pending");

    if (fetchError) throw fetchError;

    if (!reminders || reminders.length === 0) {
      return new Response(JSON.stringify({ success: true, message: "No reminders due today" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Fetch lead details for each reminder
    const leadDetails = await Promise.all(
      reminders.map(async (reminder) => {
        const table = reminder.lead_source === "quote_request" ? "quote_requests" : "contact_submissions";
        const { data: lead } = await supabase.from(table).select("*").eq("id", reminder.lead_id).single();
        return { reminder, lead };
      })
    );

    const adminEmail = "team@sentorise.com"; // Change to your team email

    const reminderRows = leadDetails
      .filter((item) => item.lead)
      .map(
        ({ reminder, lead }) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          <strong>${lead.name}</strong><br>
          <span style="color: #64748b; font-size: 14px;">${lead.email}</span>
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; color: #64748b;">
          ${reminder.lead_source === "quote_request" ? "Quote Request" : "Contact Form"}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0;">
          ${reminder.note || "Follow up required"}
        </td>
        <td style="padding: 12px; border-bottom: 1px solid #e2e8f0; text-align: center;">
          <a href="https://sentorise.lovable.app/admin/leads?lead=${reminder.lead_id}&source=${reminder.lead_source}" 
             style="color: #2563eb; text-decoration: none;">View →</a>
        </td>
      </tr>
    `
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
  <div style="max-width: 700px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%); padding: 30px; text-align: center;">
      <h1 style="color: white; margin: 0; font-size: 24px;">
        📅 Follow-up Reminders for Today
      </h1>
      <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">
        You have ${reminders.length} lead${reminders.length > 1 ? "s" : ""} to follow up with
      </p>
    </div>
    
    <div style="padding: 30px;">
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f8fafc;">
            <th style="padding: 12px; text-align: left; color: #64748b; font-weight: 500; border-bottom: 2px solid #e2e8f0;">Lead</th>
            <th style="padding: 12px; text-align: left; color: #64748b; font-weight: 500; border-bottom: 2px solid #e2e8f0;">Source</th>
            <th style="padding: 12px; text-align: left; color: #64748b; font-weight: 500; border-bottom: 2px solid #e2e8f0;">Note</th>
            <th style="padding: 12px; text-align: center; color: #64748b; font-weight: 500; border-bottom: 2px solid #e2e8f0;">Action</th>
          </tr>
        </thead>
        <tbody>
          ${reminderRows}
        </tbody>
      </table>

      <div style="text-align: center; margin-top: 30px;">
        <a href="https://sentorise.lovable.app/admin/leads" 
           style="display: inline-block; background: #1a472a; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 500;">
          Open Lead Dashboard →
        </a>
      </div>
    </div>

    <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
      <p style="margin: 0; color: #64748b; font-size: 14px;">
        This is your daily follow-up digest from Sentorise Lead Management
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "Sentorise Reminders <notifications@sentorise.com>",
      to: [adminEmail],
      subject: `📅 ${reminders.length} Follow-up Reminder${reminders.length > 1 ? "s" : ""} for Today`,
      html,
    });

    console.log("Reminder digest email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse, reminderCount: reminders.length }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Error sending reminder digest:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
