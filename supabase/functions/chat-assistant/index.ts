import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 3600; // 1 hour in seconds
const MAX_REQUESTS_PER_IP = 20; // 20 requests per hour per IP

// Input validation limits
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 2000;
const ALLOWED_ROLES = ["user", "assistant"] as const;
type AllowedRole = (typeof ALLOWED_ROLES)[number];

interface ValidatedMessage {
  role: AllowedRole;
  content: string;
}

const SYSTEM_PROMPT = `You are a helpful AI assistant for Sentorise, a premium LiFePO4 battery brand for RV, vanlife, and off-grid applications.

You have expert knowledge about:
- LiFePO4 battery technology and its advantages over lead-acid batteries
- Sentorise product lineup:
  - Lite Series (6Ah-50Ah): Portable and backup power
  - Core Series (100Ah): Standard RV/solar batteries in DIN, Standard, and Mini formats
  - Plus Series (200Ah): Self-heating batteries for cold climates
- Key features: 4000+ cycle lifespan, Bluetooth monitoring, BMS protection, low-temperature charge protection
- Certifications: CE, UN38.3, FCC, IEC 62619, RoHS
- 5-year warranty coverage
- Installation guidance and compatibility

Guidelines:
- Be helpful, concise, and friendly
- If asked about pricing, direct users to the products page or suggest requesting a quote
- For technical issues, suggest contacting support@sentorise.com
- Keep responses under 150 words when possible
- Use simple language, avoid jargon`;

function validateMessages(messages: unknown): ValidatedMessage[] {
  // Check messages exists and is array
  if (!messages || !Array.isArray(messages)) {
    throw new Error("Messages must be a non-empty array");
  }

  // Check array length
  if (messages.length === 0) {
    throw new Error("Messages array cannot be empty");
  }

  if (messages.length > MAX_MESSAGES) {
    throw new Error(`Too many messages. Maximum ${MAX_MESSAGES} allowed.`);
  }

  const validated: ValidatedMessage[] = [];

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    // Check message is object
    if (!msg || typeof msg !== "object" || Array.isArray(msg)) {
      throw new Error(`Message at index ${i} must be an object`);
    }

    const msgObj = msg as Record<string, unknown>;

    // Check required fields exist
    if (!msgObj.role || !msgObj.content) {
      throw new Error(`Message at index ${i} must have 'role' and 'content' fields`);
    }

    // Validate role is allowed (blocks 'system' injection!)
    if (!ALLOWED_ROLES.includes(msgObj.role as AllowedRole)) {
      throw new Error(`Message at index ${i} has invalid role '${msgObj.role}'. Allowed: ${ALLOWED_ROLES.join(", ")}`);
    }

    // Validate content is string
    if (typeof msgObj.content !== "string") {
      throw new Error(`Message at index ${i} content must be a string`);
    }

    // Check content length
    if (msgObj.content.trim().length === 0) {
      throw new Error(`Message at index ${i} content cannot be empty`);
    }

    if (msgObj.content.length > MAX_MESSAGE_LENGTH) {
      throw new Error(`Message at index ${i} exceeds ${MAX_MESSAGE_LENGTH} character limit`);
    }

    validated.push({
      role: msgObj.role as AllowedRole,
      content: msgObj.content.trim(),
    });
  }

  return validated;
}

async function checkRateLimit(clientIp: string): Promise<{ allowed: boolean; error?: string }> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Rate limiting skipped: Supabase credentials not configured");
    return { allowed: true };
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const rateLimitKey = `chat:${clientIp}`;
  const now = Math.floor(Date.now() / 1000);

  try {
    // Query rate_limits table
    const { data: existing, error: selectError } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("key", rateLimitKey)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // PGRST116 = row not found, which is fine
      console.error("Rate limit check error:", selectError);
      return { allowed: true }; // Fail open to not block legitimate users
    }

    if (existing) {
      if (now - existing.window_start < RATE_LIMIT_WINDOW) {
        if (existing.count >= MAX_REQUESTS_PER_IP) {
          return { allowed: false, error: "Rate limit exceeded. Please try again later." };
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    console.log(`Chat request from IP: ${clientIp}`);

    // Check rate limit
    const rateLimitResult = await checkRateLimit(clientIp);
    if (!rateLimitResult.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(
        JSON.stringify({ error: rateLimitResult.error }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Parse body with error handling
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate messages
    let validatedMessages: ValidatedMessage[];
    try {
      validatedMessages = validateMessages((body as Record<string, unknown>).messages);
    } catch (error) {
      console.warn("Validation failed:", error instanceof Error ? error.message : "Unknown");
      return new Response(
        JSON.stringify({ error: error instanceof Error ? error.message : "Validation failed" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log(`Processing ${validatedMessages.length} messages`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...validatedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      const text = await response.text();
      console.error("AI gateway error:", status, text);

      if (status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat assistant error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
