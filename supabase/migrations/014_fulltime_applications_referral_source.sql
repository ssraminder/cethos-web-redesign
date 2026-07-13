-- 014_fulltime_applications_referral_source.sql
-- Link-based referral attribution for full-time ("Careers") applications.
--
-- The public apply form captures a `?ref=` URL parameter (e.g. ?ref=indeed,
-- ?ref=linkedin) into a hidden field and submits it as `referral_source`. This
-- is distinct from the self-reported `how_heard` dropdown: it is set purely by
-- which tracked link the applicant clicked, so it gives reliable channel
-- attribution (Indeed vs LinkedIn vs a specific campaign token).

alter table public.fulltime_applications
  add column if not exists referral_source text;
