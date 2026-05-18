-- Allow team members to read warranty registrations
CREATE POLICY "Team members can view warranty registrations"
ON public.warranty_registrations
FOR SELECT
TO authenticated
USING (public.is_team_member(auth.uid()));

-- Restrict team_members modifications to admins only (prevents self-insert privilege escalation)
CREATE POLICY "Only admins can add team members"
ON public.team_members
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete team members"
ON public.team_members
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));