-- Warehouses table for per-country shipping copy
CREATE TABLE public.warehouses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  country_codes TEXT[] NOT NULL DEFAULT '{}',
  shipping_copy_en TEXT NOT NULL,
  shipping_copy_de TEXT NOT NULL,
  shipping_copy_fr TEXT NOT NULL,
  shipping_copy_zh TEXT NOT NULL,
  is_default BOOLEAN NOT NULL DEFAULT false,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.warehouses ENABLE ROW LEVEL SECURITY;

-- Public can read active warehouses (needed for shipping copy on storefront)
CREATE POLICY "Public can read active warehouses"
ON public.warehouses FOR SELECT
TO public
USING (active = true);

-- Team members can read all (including inactive) via authenticated role
CREATE POLICY "Team members can read all warehouses"
ON public.warehouses FOR SELECT
TO authenticated
USING (is_team_member(auth.uid()));

CREATE POLICY "Team members can insert warehouses"
ON public.warehouses FOR INSERT
TO authenticated
WITH CHECK (is_team_member(auth.uid()));

CREATE POLICY "Team members can update warehouses"
ON public.warehouses FOR UPDATE
TO authenticated
USING (is_team_member(auth.uid()))
WITH CHECK (is_team_member(auth.uid()));

CREATE POLICY "Admins can delete warehouses"
ON public.warehouses FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_warehouses_updated_at
BEFORE UPDATE ON public.warehouses
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed initial 3 warehouses (DE / PL / UK)
INSERT INTO public.warehouses (code, display_name, country_codes, shipping_copy_en, shipping_copy_de, shipping_copy_fr, shipping_copy_zh, is_default, sort_order) VALUES
('DE', 'Germany warehouse', ARRAY['DE','AT','CH','LU','LI','NL','BE','DK','CZ','PL_FALLBACK'],
  'Ships from our Germany warehouse · 2–4 working days',
  'Versand aus unserem deutschen Lager · 2–4 Werktage',
  'Expédié depuis notre entrepôt en Allemagne · 2 à 4 jours ouvrés',
  '由德国本地仓直发 · 2–4 个工作日送达',
  true, 1),
('PL', 'Poland warehouse', ARRAY['PL','CZ','SK','HU','LT','LV','EE','RO','BG','HR','SI'],
  'Ships from our Poland warehouse · 2–4 working days',
  'Versand aus unserem polnischen Lager · 2–4 Werktage',
  'Expédié depuis notre entrepôt en Pologne · 2 à 4 jours ouvrés',
  '由波兰本地仓直发 · 2–4 个工作日送达',
  false, 2),
('UK', 'UK warehouse', ARRAY['GB','IE'],
  'Ships from our UK warehouse · 2–4 working days',
  'Versand aus unserem UK-Lager · 2–4 Werktage',
  'Expédié depuis notre entrepôt au Royaume-Uni · 2 à 4 jours ouvrés',
  '由英国本地仓直发 · 2–4 个工作日送达',
  false, 3);