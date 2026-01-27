-- Drop the dangerously permissive warranty policy
DROP POLICY IF EXISTS "Users can view their own warranty by email" ON warranty_registrations;

-- Add explicit deny policies for all customer tables
CREATE POLICY "No public reads" ON contact_submissions 
  FOR SELECT USING (false);

CREATE POLICY "No public reads" ON quote_requests 
  FOR SELECT USING (false);

CREATE POLICY "No public reads" ON newsletter_subscribers 
  FOR SELECT USING (false);

CREATE POLICY "No public reads" ON warranty_registrations 
  FOR SELECT USING (false);

-- Drop unused chat_messages table (has 0 rows, no code references, overly permissive policy)
DROP TABLE IF EXISTS chat_messages CASCADE;

-- Create rate_limits table for IP-based rate limiting
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start BIGINT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on rate_limits (only edge functions with service role can access)
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access to rate_limits - only service role can access
CREATE POLICY "No public access" ON rate_limits FOR ALL USING (false);