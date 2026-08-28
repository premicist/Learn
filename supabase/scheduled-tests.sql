-- Phase 2 Scheduled Tests
-- Run this in the Supabase SQL editor after the Phase 1 practice_submissions setup.

create table if not exists public.scheduled_test_submissions (
  id uuid primary key default gen_random_uuid(),
  scheduled_test_id text not null,
  subject_id text not null,
  student_name text not null,
  class text not null,
  section text not null,
  roll_no text not null,
  answers jsonb not null default '{}'::jsonb,
  numerical_score numeric not null default 0,
  numerical_total numeric not null default 0,
  submitted_at timestamptz not null default now()
);

alter table public.scheduled_test_submissions enable row level security;

revoke all on table public.scheduled_test_submissions from anon, authenticated;
grant insert on table public.scheduled_test_submissions to anon, authenticated;

drop policy if exists "Public may submit scheduled tests" on public.scheduled_test_submissions;
create policy "Public may submit scheduled tests"
  on public.scheduled_test_submissions
  for insert
  to anon, authenticated
  with check (
    char_length(trim(student_name)) between 1 and 160
    and char_length(trim(class)) between 1 and 80
    and char_length(trim(section)) between 1 and 40
    and char_length(trim(roll_no)) between 1 and 40
    and char_length(trim(scheduled_test_id)) between 1 and 120
    and char_length(trim(subject_id)) between 1 and 120
    and jsonb_typeof(answers) = 'object'
    and numerical_score >= 0
    and numerical_total >= 0
    and numerical_score <= numerical_total
  );

create or replace function public.get_scheduled_test_leaderboard(test_id text)
returns table (
  position bigint,
  roll_no text,
  class text,
  section text,
  score numeric
)
language sql
security definer
set search_path = public
as $$
  select ranked.position, ranked.roll_no, ranked.class, ranked.section, ranked.score
  from (
    select
      row_number() over (order by numerical_score desc, submitted_at asc, id asc) as position,
      s.roll_no,
      s.class,
      s.section,
      s.numerical_score as score
    from public.scheduled_test_submissions s
    where s.scheduled_test_id = test_id
      and s.numerical_total > 0
  ) ranked
  where ranked.position <= 10
  order by ranked.position;
$$;

revoke all on function public.get_scheduled_test_leaderboard(text) from public;
grant execute on function public.get_scheduled_test_leaderboard(text) to anon, authenticated;
