-- Create feedback_entries table
CREATE TABLE public.feedback_entries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'email', 'form', 'slack', 'phone')),
    customer_name TEXT,
    customer_email TEXT,
    product_id TEXT,
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('praise', 'issue', 'suggestion', 'question')),
    content TEXT NOT NULL,
    sentiment TEXT NOT NULL DEFAULT 'neutral' CHECK (sentiment IN ('positive', 'neutral', 'negative')),
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'actioned', 'archived')),
    internal_notes TEXT,
    linked_lead_id UUID,
    linked_lead_source TEXT CHECK (linked_lead_source IN ('quote_request', 'contact_submission')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all feedback"
ON public.feedback_entries FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can create feedback"
ON public.feedback_entries FOR INSERT
TO authenticated
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update feedback"
ON public.feedback_entries FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Admins can delete feedback"
ON public.feedback_entries FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_feedback_entries_updated_at
BEFORE UPDATE ON public.feedback_entries
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create feedback_tags table
CREATE TABLE public.feedback_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    color TEXT DEFAULT '#6b7280',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.feedback_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all tags"
ON public.feedback_tags FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can create tags"
ON public.feedback_tags FOR INSERT
TO authenticated
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update tags"
ON public.feedback_tags FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Admins can delete tags"
ON public.feedback_tags FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create feedback_entry_tags junction table
CREATE TABLE public.feedback_entry_tags (
    feedback_id UUID REFERENCES public.feedback_entries(id) ON DELETE CASCADE NOT NULL,
    tag_id UUID REFERENCES public.feedback_tags(id) ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (feedback_id, tag_id)
);

ALTER TABLE public.feedback_entry_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all entry tags"
ON public.feedback_entry_tags FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can manage entry tags"
ON public.feedback_entry_tags FOR ALL
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

-- Insert default feedback tags
INSERT INTO public.feedback_tags (name, color) VALUES
    ('Bluetooth App', '#3b82f6'),
    ('Battery Performance', '#22c55e'),
    ('Shipping', '#f59e0b'),
    ('Documentation', '#8b5cf6'),
    ('Customer Service', '#ec4899'),
    ('Installation', '#06b6d4'),
    ('Pricing', '#f97316'),
    ('Warranty', '#14b8a6')
ON CONFLICT (name) DO NOTHING;

-- Create storage bucket for brand assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('brand-assets', 'brand-assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Team members can upload brand assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'brand-assets' AND public.is_team_member(auth.uid()));

CREATE POLICY "Brand assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'brand-assets');

CREATE POLICY "Team members can update brand assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'brand-assets' AND public.is_team_member(auth.uid()))
WITH CHECK (bucket_id = 'brand-assets' AND public.is_team_member(auth.uid()));

CREATE POLICY "Admins can delete brand assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'brand-assets' AND public.has_role(auth.uid(), 'admin'));