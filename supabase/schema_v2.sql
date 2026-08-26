-- Phase 3: Auth trigger, role protection, profile RLS, and demo accounts.
-- Run this once AFTER supabase/schema.sql.
--
-- IMPORTANT:
-- This script assumes schema.sql has already created:
--   public.users
--   public.user_role
--   public.cooperatives
--   public.applications
--   public.workers
--   public.worker_skills
--   public.bookings
--   public.services

-- ============================================================
-- 1. Add cooperative association to users
-- ============================================================

ALTER TABLE public.users
  ADD COLUMN cooperative_id UUID
  REFERENCES public.cooperatives(id)
  ON DELETE SET NULL;


-- ============================================================
-- 2. Automatically create a CUSTOMER profile for new signups
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    name,
    role
  )
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NEW.raw_user_meta_data->>'name',
      split_part(NEW.email, '@', 1)
    ),
    'CUSTOMER'
  );

  RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();


-- ============================================================
-- 3. Prevent users from changing role/cooperative membership
-- ============================================================

CREATE OR REPLACE FUNCTION public.protect_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF current_setting('role', true) IN ('authenticated', 'anon') THEN

    IF NEW.role IS DISTINCT FROM OLD.role THEN
      RAISE EXCEPTION
        'Permission denied: User roles can only be modified by administrators.';
    END IF;

    IF NEW.cooperative_id IS DISTINCT FROM OLD.cooperative_id THEN
      RAISE EXCEPTION
        'Permission denied: Cooperative membership can only be modified by administrators.';
    END IF;

  END IF;

  RETURN NEW;
END;
$$;


DROP TRIGGER IF EXISTS enforce_role_protection ON public.users;

CREATE TRIGGER enforce_role_protection
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.protect_user_role();


-- ============================================================
-- 4. Helper functions for RLS
-- ============================================================

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS public.user_role
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role public.user_role;
BEGIN

  SELECT role
  INTO v_role
  FROM public.users
  WHERE id = auth.uid();

  RETURN v_role;

END;
$$;


CREATE OR REPLACE FUNCTION public.get_user_cooperative_id()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_cooperative_id UUID;
BEGIN

  SELECT cooperative_id
  INTO v_cooperative_id
  FROM public.users
  WHERE id = auth.uid();

  RETURN v_cooperative_id;

END;
$$;


-- ============================================================
-- 5. Replace users RLS policies
-- ============================================================

DROP POLICY IF EXISTS "Public read access for users"
  ON public.users;

DROP POLICY IF EXISTS "Users can insert their own record"
  ON public.users;

DROP POLICY IF EXISTS "Users can update their own record"
  ON public.users;

DROP POLICY IF EXISTS "Workers are visible to all authenticated users"
  ON public.users;

DROP POLICY IF EXISTS "Admins and Officers can read all users"
  ON public.users;

DROP POLICY IF EXISTS "Workers can read customers they have bookings with"
  ON public.users;

DROP POLICY IF EXISTS "Federation admins can read all users"
  ON public.users;

DROP POLICY IF EXISTS "Officers can read users in their cooperative"
  ON public.users;


-- Users can read their own profile

CREATE POLICY "Users can read their own profile"
ON public.users
FOR SELECT
TO authenticated
USING (
  auth.uid() = id
);


-- Federation admins can read all users

CREATE POLICY "Federation admins can read all users"
ON public.users
FOR SELECT
TO authenticated
USING (
  public.get_user_role() = 'FEDERATION_ADMIN'
);


-- Cooperative officers can read:
-- 1. Users belonging to their cooperative
-- 2. Applicants who applied to their cooperative

CREATE POLICY "Officers can read users in their cooperative"
ON public.users
FOR SELECT
TO authenticated
USING (
  public.get_user_role() = 'COOPERATIVE_OFFICER'
  AND
  (
    cooperative_id = public.get_user_cooperative_id()

    OR EXISTS (
      SELECT 1
      FROM public.applications
      WHERE applications.user_id = users.id
      AND applications.cooperative_id =
          public.get_user_cooperative_id()
    )
  )
);


-- Workers can read customers they have bookings with

CREATE POLICY "Workers can read customers they have bookings with"
ON public.users
FOR SELECT
TO authenticated
USING (
  public.get_user_role() = 'WORKER'
  AND EXISTS (
    SELECT 1
    FROM public.bookings
    WHERE bookings.customer_id = users.id
    AND bookings.worker_id = auth.uid()
  )
);


-- Users can update their own profile

CREATE POLICY "Users can update their own record"
ON public.users
FOR UPDATE
TO authenticated
USING (
  auth.uid() = id
)
WITH CHECK (
  auth.uid() = id
);


-- ============================================================
-- 6. Demo/test accounts
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;


DO $$
DECLARE

  v_customer_id UUID := gen_random_uuid();
  v_applicant_id UUID := gen_random_uuid();
  v_worker_id UUID := gen_random_uuid();
  v_officer_id UUID := gen_random_uuid();
  v_fed_admin_id UUID := gen_random_uuid();

  v_cooperative_id UUID;
  v_service_id UUID;

  v_default_password TEXT :=
    crypt('password123', gen_salt('bf'));

BEGIN

  -- ----------------------------------------------------------
  -- Find an existing cooperative from schema.sql
  -- ----------------------------------------------------------

  SELECT id
  INTO v_cooperative_id
  FROM public.cooperatives
  ORDER BY created_at, id
  LIMIT 1;


  -- ----------------------------------------------------------
  -- Find an existing service from schema.sql
  -- ----------------------------------------------------------

  SELECT id
  INTO v_service_id
  FROM public.services
  ORDER BY created_at, id
  LIMIT 1;


  IF v_cooperative_id IS NULL THEN
    RAISE EXCEPTION
      'No cooperative found. Run schema.sql seed data first.';
  END IF;


  IF v_service_id IS NULL THEN
    RAISE EXCEPTION
      'No service found. Run schema.sql seed data first.';
  END IF;


  -- ==========================================================
  -- CUSTOMER
  -- ==========================================================

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    v_customer_id,
    '00000000-0000-0000-0000-000000000000',
    'customer@demo.com',
    v_default_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Priya (Customer)"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
  );


  -- ==========================================================
  -- APPLICANT
  -- ==========================================================

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    v_applicant_id,
    '00000000-0000-0000-0000-000000000000',
    'applicant@demo.com',
    v_default_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Rahul (Applicant)"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
  );


  -- ==========================================================
  -- WORKER
  -- ==========================================================

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    v_worker_id,
    '00000000-0000-0000-0000-000000000000',
    'worker@demo.com',
    v_default_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Anil (Worker)"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
  );


  -- ==========================================================
  -- COOPERATIVE OFFICER
  -- ==========================================================

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    v_officer_id,
    '00000000-0000-0000-0000-000000000000',
    'officer@demo.com',
    v_default_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Meera (Coop Officer)"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
  );


  -- ==========================================================
  -- FEDERATION ADMIN
  -- ==========================================================

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    confirmation_token,
    recovery_token,
    email_change_token_new,
    email_change
  )
  VALUES (
    v_fed_admin_id,
    '00000000-0000-0000-0000-000000000000',
    'admin@demo.com',
    v_default_password,
    now(),
    '{"provider":"email","providers":["email"]}',
    '{"name":"Vikram (Fed Admin)"}',
    now(),
    now(),
    'authenticated',
    '',
    '',
    '',
    ''
  );


  -- ==========================================================
  -- Assign roles and cooperative relationships
  -- ==========================================================

  UPDATE public.users
  SET role = 'APPLICANT'
  WHERE id = v_applicant_id;


  UPDATE public.users
  SET
    role = 'WORKER',
    cooperative_id = v_cooperative_id
  WHERE id = v_worker_id;


  UPDATE public.users
  SET
    role = 'COOPERATIVE_OFFICER',
    cooperative_id = v_cooperative_id
  WHERE id = v_officer_id;


  UPDATE public.users
  SET role = 'FEDERATION_ADMIN'
  WHERE id = v_fed_admin_id;


  -- ==========================================================
  -- Applicant demo application
  -- ==========================================================

  INSERT INTO public.applications (
    user_id,
    cooperative_id,
    status
  )
  VALUES (
    v_applicant_id,
    v_cooperative_id,
    'PENDING'
  );


  -- ==========================================================
  -- Worker demo record
  -- ==========================================================

  INSERT INTO public.workers (
    id,
    cooperative_id,
    verification_status,
    status
  )
  VALUES (
    v_worker_id,
    v_cooperative_id,
    'VERIFIED',
    'AVAILABLE'
  );


  -- ==========================================================
  -- Worker demo skill
  -- ==========================================================

  INSERT INTO public.worker_skills (
    worker_id,
    service_id
  )
  VALUES (
    v_worker_id,
    v_service_id
  );

END;
$$;