-- Remove self-registration policies that allow anyone to create team member accounts
-- This is a critical security fix - team members should be created by admins only

-- Drop the policy that allows anyone to self-insert into team_members
DROP POLICY IF EXISTS "Allow self-insert during signup" ON public.team_members;

-- Drop the policy that allows anyone to self-assign roles
DROP POLICY IF EXISTS "Allow self-insert role during signup" ON public.user_roles;