-- Practice Set Submissions & Handwritten Image Storage
-- Run this in the Supabase SQL editor to enable practice submissions and handwritten answer image uploads.

-- 1. Table for Practice Submissions
create table if not exists public.practice_submissions (
  id uuid primary key default gen_random_uuid(),
  practice_set_id text not null,
  subject_id text not null,
  student_name text not null,
  class text not null,
  section text not null,
  roll_no text not null,
  answers jsonb not null default '{}'::jsonb,
  numerical_score numeric,
  numerical_total numeric,
  submitted_at timestamptz not null default now()
);

alter table public.practice_submissions enable row level security;

revoke all on table public.practice_submissions from anon, authenticated;
grant insert on table public.practice_submissions to anon, authenticated;

drop policy if exists "Public may submit practice sets" on public.practice_submissions;
create policy "Public may submit practice sets"
  on public.practice_submissions
  for insert
  to anon, authenticated
  with check (
    char_length(trim(student_name)) between 1 and 160
    and char_length(trim(class)) between 1 and 80
    and char_length(trim(section)) between 1 and 40
    and char_length(trim(roll_no)) between 1 and 40
    and char_length(trim(practice_set_id)) between 1 and 120
    and char_length(trim(subject_id)) between 1 and 120
    and jsonb_typeof(answers) = 'object'
  );

-- 2. Storage Bucket for Handwritten Practice Uploads
insert into storage.buckets (id, name, public)
values ('practice-uploads', 'practice-uploads', true)
on conflict (id) do update set public = true;

-- Allow anon & authenticated users to upload practice answer images
drop policy if exists "Allow public uploads for practice answers" on storage.objects;
create policy "Allow public uploads for practice answers"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'practice-uploads');

-- Allow public read of uploaded practice answers
drop policy if exists "Allow public read for practice answers" on storage.objects;
create policy "Allow public read for practice answers"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'practice-uploads');
