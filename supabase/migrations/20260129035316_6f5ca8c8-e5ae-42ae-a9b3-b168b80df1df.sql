-- Create brand_assets table
CREATE TABLE public.brand_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    asset_type TEXT NOT NULL CHECK (asset_type IN ('social', 'email', 'document')),
    template_type TEXT NOT NULL,
    dimensions TEXT NOT NULL,
    image_url TEXT,
    settings JSONB DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.brand_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all assets"
ON public.brand_assets FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can create assets"
ON public.brand_assets FOR INSERT
TO authenticated
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update assets"
ON public.brand_assets FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Admins can delete assets"
ON public.brand_assets FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_brand_assets_updated_at
BEFORE UPDATE ON public.brand_assets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create lead_activities table
CREATE TABLE public.lead_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL,
    lead_source TEXT NOT NULL CHECK (lead_source IN ('quote_request', 'contact_submission')),
    activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'call', 'email', 'status_change')),
    content TEXT,
    metadata JSONB DEFAULT '{}',
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all activities"
ON public.lead_activities FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can create activities"
ON public.lead_activities FOR INSERT
TO authenticated
WITH CHECK (public.is_team_member(auth.uid()));

-- Create follow_up_reminders table
CREATE TABLE public.follow_up_reminders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID NOT NULL,
    lead_source TEXT NOT NULL CHECK (lead_source IN ('quote_request', 'contact_submission')),
    reminder_date DATE NOT NULL,
    reminder_time TIME,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'dismissed', 'snoozed')),
    created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    completed_at TIMESTAMP WITH TIME ZONE
);

ALTER TABLE public.follow_up_reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view all reminders"
ON public.follow_up_reminders FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can create reminders"
ON public.follow_up_reminders FOR INSERT
TO authenticated
WITH CHECK (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update reminders"
ON public.follow_up_reminders FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

-- Add lead_status column to quote_requests and contact_submissions
ALTER TABLE public.quote_requests 
ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'new';

ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS lead_status TEXT DEFAULT 'new';

-- Allow team members to read and update quote_requests
CREATE POLICY "Team members can view quote requests"
ON public.quote_requests FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update quote requests"
ON public.quote_requests FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));

-- Allow team members to read and update contact_submissions
CREATE POLICY "Team members can view contact submissions"
ON public.contact_submissions FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

CREATE POLICY "Team members can update contact submissions"
ON public.contact_submissions FOR UPDATE
TO authenticated
USING (public.is_team_member(auth.uid()))
WITH CHECK (public.is_team_member(auth.uid()));