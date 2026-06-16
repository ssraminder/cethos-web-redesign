-- Rename the full-time application "writing_sample" question to "about_you":
-- applicants are now asked to tell us about themselves (~200 words) instead of
-- providing a writing sample. Safe rename (no data migration needed).

alter table public.fulltime_applications
  rename column writing_sample to about_you;
