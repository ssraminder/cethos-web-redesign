-- Required intro video for full-time ("Careers") applications, stored in a
-- private bucket separate from CVs. 50 MB cap; mp4/mov/webm only.
--
-- Uploads happen directly from the browser (Netlify functions cap bodies at
-- ~6 MB, far below video size), so the bucket needs a public INSERT policy; reads
-- are super-admin-only via has_staff_role (mirrors careers-applications).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'careers-videos', 'careers-videos', false, 52428800,
  array['video/mp4', 'video/quicktime', 'video/webm']
)
on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types,
  public = false;

drop policy if exists "careers video public upload" on storage.objects;
create policy "careers video public upload"
  on storage.objects
  for insert
  to public
  with check (bucket_id = 'careers-videos');

drop policy if exists "careers video super_admin read" on storage.objects;
create policy "careers video super_admin read"
  on storage.objects
  for select
  to authenticated
  using (bucket_id = 'careers-videos' and public.has_staff_role('super_admin'));

alter table public.fulltime_applications
  add column if not exists video_bucket text default 'careers-videos',
  add column if not exists video_path text;
