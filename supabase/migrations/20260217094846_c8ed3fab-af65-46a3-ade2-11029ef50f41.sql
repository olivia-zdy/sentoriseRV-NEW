
-- Enable pg_net extension for HTTP calls from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create trigger function to notify on new leads
CREATE OR REPLACE FUNCTION public.notify_new_lead_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
  service_key text;
  supabase_url text;
BEGIN
  -- Build payload based on source table
  IF TG_TABLE_NAME = 'quote_requests' THEN
    payload := jsonb_build_object(
      'lead_type', 'quote_request',
      'name', NEW.name,
      'email', NEW.email,
      'phone', NEW.phone,
      'company', NEW.company,
      'product_name', NEW.product_name,
      'message', NEW.message,
      'quantity', NEW.quantity
    );
  ELSIF TG_TABLE_NAME = 'contact_submissions' THEN
    payload := jsonb_build_object(
      'lead_type', 'contact_submission',
      'name', NEW.name,
      'email', NEW.email,
      'message', NEW.message
    );
  END IF;

  -- Get secrets from vault
  SELECT decrypted_secret INTO supabase_url FROM vault.decrypted_secrets WHERE name = 'supabase_url' LIMIT 1;
  SELECT decrypted_secret INTO service_key FROM vault.decrypted_secrets WHERE name = 'service_role_key' LIMIT 1;

  -- If vault secrets not available, use fallback
  IF supabase_url IS NULL THEN
    supabase_url := 'https://snxnegozwerebpmgfomq.supabase.co';
  END IF;

  -- Fire async HTTP request to edge function
  IF service_key IS NOT NULL THEN
    PERFORM net.http_post(
      url := supabase_url || '/functions/v1/notify-new-lead',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || service_key
      ),
      body := payload
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Create triggers on both tables
CREATE TRIGGER on_new_quote_request
  AFTER INSERT ON public.quote_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead_trigger();

CREATE TRIGGER on_new_contact_submission
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_new_lead_trigger();
