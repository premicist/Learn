-- Class roster (private)
-- Run this in the Supabase SQL editor after scheduled-tests.sql
-- (needs normalize_class_section / normalize_roll_no from that file).
-- Re-running is safe.

-- Teacher-managed list of allowed students. Never exposed to the public site.
create table if not exists public.class_roster (
  id uuid primary key default gen_random_uuid(),
  class text not null,
  section text not null,
  roll_no text not null,
  student_name text,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.class_roster enable row level security;

-- No public read or write. Teachers manage rows in the Supabase dashboard
-- (Table Editor) while signed in as the project owner.
revoke all on table public.class_roster from anon, authenticated;

-- One row per identity ("A" = "a", "12" = "012").
create unique index if not exists class_roster_one_identity
  on public.class_roster (
    (public.normalize_class_section(class)),
    (public.normalize_class_section(section)),
    (public.normalize_roll_no(roll_no))
  );

-- Returns true when:
--   1) the roster is empty (open mode — anyone may start), or
--   2) an active row matches class + section + roll.
-- Returns false only when the roster has students and this identity is missing.
create or replace function public.is_on_class_roster(
  student_class text,
  student_section text,
  student_roll_no text
)
returns boolean
language sql
security definer
set search_path = public
as $$
  select
    not exists (
      select 1 from public.class_roster r where r.active = true
    )
    or exists (
      select 1
      from public.class_roster r
      where r.active = true
        and public.normalize_class_section(r.class) = public.normalize_class_section(student_class)
        and public.normalize_class_section(r.section) = public.normalize_class_section(student_section)
        and public.normalize_roll_no(r.roll_no) = public.normalize_roll_no(student_roll_no)
    );
$$;

revoke all on function public.is_on_class_roster(text, text, text) from public;
grant execute on function public.is_on_class_roster(text, text, text) to anon, authenticated;

-- Example rows (delete or edit after testing):
-- insert into public.class_roster (class, section, roll_no, student_name) values
--   ('12', 'A', '1', 'Example Student'),
--   ('12', 'A', '2', 'Another Student');
