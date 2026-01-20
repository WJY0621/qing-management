
-- 1. Add role column to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- 2. Create a policy for Admins to view all profiles
-- First, drop existing restrictive policies if necessary, or just add a new one that ORs with the existing one?
-- Postgres policies are permissive by default if multiple exist for the same action (OR logic).
-- So we can just ADD a new policy.

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 3. Allow Admins to view all weight logs
CREATE POLICY "Admins can view all weight logs" ON public.weight_logs
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 4. Allow Admins to view all recipes
CREATE POLICY "Admins can view all recipes" ON public.recipes
  FOR SELECT USING (
    (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
  );

-- 5. Helper to make your current user an admin (Replace YOUR_EMAIL with your actual email)
-- update public.profiles set role = 'admin' where id = (select id from auth.users where email = 'YOUR_EMAIL');
