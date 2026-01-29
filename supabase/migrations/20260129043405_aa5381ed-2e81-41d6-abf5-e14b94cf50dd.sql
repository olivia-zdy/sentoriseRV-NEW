-- Allow inserting team members during signup
-- The first user should be able to create their own team_members record
CREATE POLICY "Allow self-insert during signup"
ON public.team_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow inserting user roles during signup
-- Users can assign themselves a role during initial signup
CREATE POLICY "Allow self-insert role during signup"
ON public.user_roles
FOR INSERT
WITH CHECK (auth.uid() = user_id);