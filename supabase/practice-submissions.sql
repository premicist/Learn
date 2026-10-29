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

-- 2. Storage Bucket for Handwritten Practice Uploads (Private to protect student work/PII)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'practice-uploads',
  'practice-uploads',
  false,
  5242880, -- 5 MB limit
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = false,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

-- Allow anon & authenticated users to upload practice answer images with strict extension validation
drop policy if exists "Allow public uploads for practice answers" on storage.objects;
create policy "Allow public uploads for practice answers"
  on storage.objects for insert
  to anon, authenticated
  with check (
    bucket_id = 'practice-uploads'
    and (storage.extension(name) in ('jpg', 'jpeg', 'png', 'webp'))
  );

-- Only authenticated users (teachers/admins) may read submitted student homework
drop policy if exists "Allow public read for practice answers" on storage.objects;
drop policy if exists "Allow authenticated read for practice answers" on storage.objects;
create policy "Allow authenticated read for practice answers"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'practice-uploads');


-- 3. Teacher Practice Submissions View Function
create or replace function public.get_teacher_practice_submissions(
  p_secret text,
  p_practice_set_id text default null,
  p_class text default null,
  p_section text default null
)
returns table (
  id uuid,
  practice_set_id text,
  subject_id text,
  student_name text,
  class text,
  section text,
  roll_no text,
  answers jsonb,
  numerical_score numeric,
  numerical_total numeric,
  submitted_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_teacher_pin text := coalesce(current_setting('app.teacher_pin', true), 'econ2026');
begin
  if p_secret is null or p_secret <> v_teacher_pin then
    raise exception 'Unauthorized: Invalid teacher access key';
  end if;

  return query
  select
    s.id,
    s.practice_set_id,
    s.subject_id,
    s.student_name,
    s.class,
    s.section,
    s.roll_no,
    s.answers,
    s.numerical_score,
    s.numerical_total,
    s.submitted_at
  from public.practice_submissions s
  where (p_practice_set_id is null or s.practice_set_id = p_practice_set_id)
    and (p_class is null or lower(trim(s.class)) = lower(trim(p_class)))
    and (p_section is null or lower(trim(s.section)) = lower(trim(p_section)))
  order by s.submitted_at desc;
end;
$$;

revoke all on function public.get_teacher_practice_submissions(text, text, text, text) from public;
grant execute on function public.get_teacher_practice_submissions(text, text, text, text) to anon, authenticated;
