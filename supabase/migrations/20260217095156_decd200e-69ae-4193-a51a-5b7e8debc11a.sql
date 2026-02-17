
-- Update trigger function to use webhook secret from vault
CREATE OR REPLACE FUNCTION public.notify_new_lead_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
  webhook_secret text;
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

  -- Get webhook secret from vault
  SELECT decrypted_secret INTO webhook_secret
  FROM vault.decrypted_secrets
  WHERE name = 'notify_lead_webhook_secret'
  LIMIT 1;

  -- Fire async HTTP request to edge function
  IF webhook_secret IS NOT NULL THEN
    PERFORM net.http_post(
      url := 'https://snxnegozwerebpmgfomq.supabase.co/functions/v1/notify-new-lead',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'x-webhook-secret', webhook_secret
      ),
      body := payload
    );
  END IF;

  RETURN NEW;
END;
$$;
