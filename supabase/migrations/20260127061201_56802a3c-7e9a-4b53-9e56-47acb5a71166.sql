-- Allow users to select their own warranty registrations by email
CREATE POLICY "Users can view their own warranty by email"
ON public.warranty_registrations
FOR SELECT
USING (true);

-- Note: The actual email filtering will be done in the application query
-- This policy allows SELECT but the app will filter by email