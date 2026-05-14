-- Lock down cethosweb-quote-files storage bucket.
--
-- Context: this bucket is the destination for files uploaded through the
-- public quote forms on cethos.com (life-sciences, certified, etc.).
-- It was created public:true with anon SELECT + INSERT policies, which
-- means anyone with a bucket-listing endpoint could enumerate every
-- customer's documents — same incident class as the May 2026 lockdown
-- on the portal's `quote-files` bucket.
--
-- The intake routes (app/api/quote/route.ts and app/api/certified-quote/
-- route.ts) upload files server-side using the service-role client and
-- then embed the URL in a Brevo email to staff. We switched those routes
-- from getPublicUrl() to createSignedUrl(filePath, 30 days), so the
-- email-delivery path keeps working with the bucket locked down.
--
-- Idempotent: every CREATE POLICY is preceded by DROP POLICY IF EXISTS.

BEGIN;

-- Force private. If the bucket somehow doesn't exist yet, this creates it
-- as private from the start.
INSERT INTO storage.buckets (id, name, public)
VALUES ('cethosweb-quote-files', 'cethosweb-quote-files', false)
ON CONFLICT (id) DO UPDATE SET public = false;

-- Drop the four legacy over-broad policies (FOR INSERT/SELECT TO public).
DROP POLICY IF EXISTS "Allow reads"                       ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads"                     ON storage.objects;
DROP POLICY IF EXISTS "Allow uploads to quote files"      ON storage.objects;
DROP POLICY IF EXISTS "Public read access for quote files" ON storage.objects;

-- Defensive: drop the new policy names if they already exist (rerun safety).
DROP POLICY IF EXISTS cethosweb_quote_files_service_role_all ON storage.objects;
DROP POLICY IF EXISTS cethosweb_quote_files_staff_all        ON storage.objects;

-- Service role: full access. Used by the Next.js API routes
-- (lib/supabase.ts createServerSupabaseClient) which sign URLs after upload.
CREATE POLICY cethosweb_quote_files_service_role_all
  ON storage.objects FOR ALL TO service_role
  USING (bucket_id = 'cethosweb-quote-files')
  WITH CHECK (bucket_id = 'cethosweb-quote-files');

-- Staff: full access. Only relevant if any admin UI ever needs to list this
-- bucket directly; admin routes currently go through service-role too.
-- Uses the canonical is_active_staff() helper installed by the portal's
-- 20260514_emergency_rls_lockdown.sql (same Supabase project).
CREATE POLICY cethosweb_quote_files_staff_all
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'cethosweb-quote-files' AND public.is_active_staff())
  WITH CHECK (bucket_id = 'cethosweb-quote-files' AND public.is_active_staff());

-- Anon: no policy = no access. Bucket is fully locked from the public.

COMMIT;
