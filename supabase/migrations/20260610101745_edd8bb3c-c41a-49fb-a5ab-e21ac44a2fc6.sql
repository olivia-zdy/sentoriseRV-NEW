-- Trigger to invoke send-warranty-confirmation edge function on new warranty registration
-- Uses hardcoded shared secret so the edge function can be locked down to internal calls only.

CREATE OR REPLACE FUNCTION public.notify_warranty_email_trigger()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  payload jsonb;
BEGIN
  payload := jsonb_build_object(
    'registration_id', NEW.id,
    'name', NEW.name,
    'email', NEW.email,
    'product_name', NEW.product_name,
    'purchase_date', NEW.purchase_date,
    'warranty_end_date', NEW.warranty_end_date,
    'serial_number', NEW.serial_number,
    'order_number', NEW.order_number
  );

  PERFORM net.http_post(
    url := 'https://snxnegozwerebpmgfomq.supabase.co/functions/v1/send-warranty-confirmation',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'x-webhook-secret', 'wh_sentorise_warranty_email_2026'
    ),
    body := payload
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS warranty_registration_email_trigger ON public.warranty_registrations;

CREATE TRIGGER warranty_registration_email_trigger
AFTER INSERT ON public.warranty_registrations
FOR EACH ROW
EXECUTE FUNCTION public.notify_warranty_email_trigger();