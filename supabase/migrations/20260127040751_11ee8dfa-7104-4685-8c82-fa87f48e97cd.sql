-- Create warranty registrations table
CREATE TABLE public.warranty_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  -- Customer info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  
  -- Product info
  product_name TEXT NOT NULL,
  product_sku TEXT,
  serial_number TEXT,
  
  -- Purchase info
  purchase_date DATE NOT NULL,
  purchase_location TEXT,
  order_number TEXT,
  
  -- Address for warranty claims
  street_address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'Germany',
  
  -- Status tracking
  status TEXT DEFAULT 'registered',
  warranty_end_date DATE,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.warranty_registrations ENABLE ROW LEVEL SECURITY;

-- Allow anonymous insert for warranty registration
CREATE POLICY "Allow anonymous warranty registration"
ON public.warranty_registrations
FOR INSERT
WITH CHECK (true);

-- Create index for email lookups
CREATE INDEX idx_warranty_email ON public.warranty_registrations(email);

-- Create function to auto-calculate warranty end date
CREATE OR REPLACE FUNCTION public.set_warranty_end_date()
RETURNS TRIGGER AS $$
BEGIN
  NEW.warranty_end_date = NEW.purchase_date + INTERVAL '5 years';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger to set warranty end date on insert
CREATE TRIGGER set_warranty_end_date_trigger
BEFORE INSERT ON public.warranty_registrations
FOR EACH ROW
EXECUTE FUNCTION public.set_warranty_end_date();