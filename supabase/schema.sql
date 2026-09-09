-- Aavishkara '26 Hackathon Submissions Schema
-- Run this script in your Supabase SQL Editor

-- 1. Create submissions table
create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  team_name text not null,
  case_study_code text not null,
  case_study_title text not null,
  github_link text not null,
  ppt_file_url text not null,
  submitted_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add index on team_name for rapid duplicate checks
create index if not exists idx_submissions_team_name on public.submissions(team_name);

-- 2. Enable Row Level Security (RLS)
alter table public.submissions enable row level security;

-- Policy: Allow public read access to submissions (so teams can verify their submission status)
drop policy if exists "Allow public read of submissions" on public.submissions;
create policy "Allow public read of submissions"
  on public.submissions
  for select
  using (true);

-- Policy: Allow public to insert submissions
drop policy if exists "Allow public insert of submissions" on public.submissions;
create policy "Allow public insert of submissions"
  on public.submissions
  for insert
  with check (true);

-- 3. Set up Storage Bucket for team presentation files
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'team-submissions',
  'team-submissions',
  true,
  52428800, -- 50MB in bytes
  array[
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/octet-stream'
  ]
)
on conflict (id) do update set
  public = true,
  file_size_limit = 52428800;

-- Storage Policy: Allow public upload to team-submissions bucket
drop policy if exists "Allow public upload to team-submissions" on storage.objects;
create policy "Allow public upload to team-submissions"
  on storage.objects
  for insert
  with check (bucket_id = 'team-submissions');

-- Storage Policy: Allow public to read/download uploaded files
drop policy if exists "Allow public read from team-submissions" on storage.objects;
create policy "Allow public read from team-submissions"
  on storage.objects
  for select
  using (bucket_id = 'team-submissions');
