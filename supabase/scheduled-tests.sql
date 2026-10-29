-- Phase 2 Scheduled Tests
-- Run this in the Supabase SQL editor after the Phase 1 practice_submissions setup.
-- Re-running the whole file is safe: later statements are idempotent.

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

-- Identity matching: "A" = "a", "12" = "012", extra spaces ignored.
create or replace function public.normalize_class_section(value text)
returns text
language sql
immutable
as $$
  select lower(regexp_replace(trim(coalesce(value, '')), '\s+', ' ', 'g'));
$$;

create or replace function public.normalize_roll_no(value text)
returns text
language sql
immutable
as $$
  select case
    when cleaned = '' then ''
    when cleaned ~ '^[0]+$' then '0'
    else regexp_replace(cleaned, '^0+', '')
  end
  from (
    select lower(regexp_replace(trim(coalesce(value, '')), '\s+', '', 'g')) as cleaned
  ) normalized;
$$;

-- Keep the earliest attempt when the same student submitted more than once.
delete from public.scheduled_test_submissions s
where s.id in (
  select ranked.id
  from (
    select
      id,
      row_number() over (
        partition by
          scheduled_test_id,
          public.normalize_class_section(class),
          public.normalize_class_section(section),
          public.normalize_roll_no(roll_no)
        order by submitted_at asc, id asc
      ) as keep_rank
    from public.scheduled_test_submissions
  ) ranked
  where ranked.keep_rank > 1
);

create unique index if not exists scheduled_test_submissions_one_attempt
  on public.scheduled_test_submissions (
    scheduled_test_id,
    (public.normalize_class_section(class)),
    (public.normalize_class_section(section)),
    (public.normalize_roll_no(roll_no))
  );

create or replace function public.has_scheduled_test_submission(
  test_id text,
  student_class text,
  student_section text,
  student_roll_no text
)
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.scheduled_test_submissions s
    where s.scheduled_test_id = test_id
      and public.normalize_class_section(s.class) = public.normalize_class_section(student_class)
      and public.normalize_class_section(s.section) = public.normalize_class_section(student_section)
      and public.normalize_roll_no(s.roll_no) = public.normalize_roll_no(student_roll_no)
  );
$$;

revoke all on function public.has_scheduled_test_submission(text, text, text, text) from public;
grant execute on function public.has_scheduled_test_submission(text, text, text, text) to anon, authenticated;

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
      row_number() over (order by first_attempts.numerical_score desc, first_attempts.submitted_at asc, first_attempts.id asc) as position,
      first_attempts.roll_no,
      first_attempts.class,
      first_attempts.section,
      first_attempts.numerical_score as score
    from (
      select distinct on (
        public.normalize_class_section(s.class),
        public.normalize_class_section(s.section),
        public.normalize_roll_no(s.roll_no)
      )
        s.id,
        s.roll_no,
        s.class,
        s.section,
        s.numerical_score,
        s.submitted_at
      from public.scheduled_test_submissions s
      where s.scheduled_test_id = test_id
        and s.numerical_total > 0
      order by
        public.normalize_class_section(s.class),
        public.normalize_class_section(s.section),
        public.normalize_roll_no(s.roll_no),
        s.submitted_at asc,
        s.id asc
    ) first_attempts
  ) ranked
  where ranked.position <= 10
  order by ranked.position;
$$;

revoke all on function public.get_scheduled_test_leaderboard(text) from public;
grant execute on function public.get_scheduled_test_leaderboard(text) to anon, authenticated;


-- -----------------------------------------------------------------------------
-- Tamper-Proof Server-Side Grading: Scheduled Test Keys & Secure Submission RPC
-- -----------------------------------------------------------------------------

create table if not exists public.scheduled_test_keys (
  scheduled_test_id text not null,
  question_index int not null,
  answer numeric not null,
  tolerance numeric not null default 0,
  points numeric not null default 1,
  primary key (scheduled_test_id, question_index)
);

alter table public.scheduled_test_keys enable row level security;
revoke all on table public.scheduled_test_keys from anon, authenticated;

create or replace function public.submit_scheduled_test_verified(
  p_scheduled_test_id text,
  p_subject_id text,
  p_student_name text,
  p_class text,
  p_section text,
  p_roll_no text,
  p_answers jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_score numeric := 0;
  v_total numeric := 0;
  v_rec record;
  v_given text;
  v_given_num numeric;
begin
  -- Validate roster if active roster exists
  if not public.is_on_class_roster(p_class, p_section, p_roll_no) then
    return jsonb_build_object('ok', false, 'reason', 'not_on_roster');
  end if;

  -- Calculate score if answer keys exist
  for v_rec in
    select question_index, answer, tolerance, points
    from public.scheduled_test_keys
    where scheduled_test_id = p_scheduled_test_id
    order by question_index
  loop
    v_total := v_total + v_rec.points;
    v_given := p_answers->>v_rec.question_index::text;
    if v_given is not null and v_given ~ '^-?[0-9]+(\.[0-9]+)?$' then
      v_given_num := v_given::numeric;
      if abs(v_given_num - v_rec.answer) <= v_rec.tolerance then
        v_score := v_score + v_rec.points;
      end if;
    end if;
  end loop;

  -- Insert the submission
  insert into public.scheduled_test_submissions (
    scheduled_test_id,
    subject_id,
    student_name,
    class,
    section,
    roll_no,
    answers,
    numerical_score,
    numerical_total
  )
  values (
    p_scheduled_test_id,
    p_subject_id,
    p_student_name,
    p_class,
    p_section,
    p_roll_no,
    p_answers,
    v_score,
    v_total
  );

  return jsonb_build_object(
    'ok', true,
    'numerical_score', v_score,
    'numerical_total', v_total
  );
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'reason', 'duplicate');
  when others then
    return jsonb_build_object('ok', false, 'reason', 'error', 'message', SQLERRM);
end;
$$;

revoke all on function public.submit_scheduled_test_verified(text, text, text, text, text, text, jsonb) from public;
grant execute on function public.submit_scheduled_test_verified(text, text, text, text, text, text, jsonb) to anon, authenticated;
