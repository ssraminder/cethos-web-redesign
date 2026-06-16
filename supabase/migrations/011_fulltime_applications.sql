-- 011_fulltime_applications.sql
-- Full-time ("Careers") staff applications, kept separate from the vendor/
-- freelancer network applications (cvp_applications).
--
-- Capture: the public Careers form (join.cethos.com/careers/:slug) INSERTs a row
-- and uploads a CV to the private `careers-applications` bucket.
-- View: cethos.com/admin → Employment Applications, super-admin only. The admin
-- API reads with the service role; RLS blocks all public reads.

create table if not exists public.fulltime_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  role_slug text not null,
  role_title text,
  full_name text not null,
  email text not null,
  phone text,
  city text,
  country text not null,
  linkedin_url text,
  years_experience text not null,
  resume_bucket text not null default 'careers-applications',
  resume_path text not null,
  screening_experience text not null,
  screening_hours text not null,
  expected_comp_amount numeric,
  expected_comp_currency text,
  writing_sample text not null,
  how_heard text,
  additional_notes text,
  consent_privacy boolean not null default false,
  status text not null default 'new',
  source text,
  ip_address text,
  user_agent text
);

create index if not exists fulltime_applications_created_at_idx
  on public.fulltime_applications (created_at desc);
create index if not exists fulltime_applications_role_slug_idx
  on public.fulltime_applications (role_slug);

alter table public.fulltime_applications enable row level security;

-- INSERT-only for the public form. Targeted at `public` (any role): PostgREST in
-- this project does not switch the effective role to `anon` for these requests,
-- so a {anon,authenticated}-scoped policy is rejected by the with-check. There is
-- intentionally NO SELECT/UPDATE/DELETE policy, so only the service role (which
-- bypasses RLS) can read or modify rows -- i.e. the super-admin-gated admin API.
-- Applicant PII is never publicly readable.
-- The form should submit with `Prefer: return=minimal` (no SELECT policy exists
-- to return the inserted representation).
drop policy if exists "fulltime_applications public insert" on public.fulltime_applications;
create policy "fulltime_applications public insert"
  on public.fulltime_applications
  for insert
  to public
  with check (true);

-- Private bucket for full-time CV uploads (separate from vendor resumes).
insert into storage.buckets (id, name, public)
values ('careers-applications', 'careers-applications', false)
on conflict (id) do nothing;

-- Public form may upload a CV; no public read policy, so downloads happen only
-- via service-role-signed URLs from the admin API.
drop policy if exists "careers cv public upload" on storage.objects;
create policy "careers cv public upload"
  on storage.objects
  for insert
  to public
  with check (bucket_id = 'careers-applications');
