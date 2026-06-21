-- Onboarding submissions
create table if not exists public.onboarding_submissions (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  mode text not null check (mode in ('audit', 'demo')),
  name text not null,
  email text not null,
  phone text,
  brand_name text,
  category text,
  website text,
  business_desc text,
  mrr numeric,
  customers integer,
  dead_customers integer,
  problem text,
  agents text[] not null default '{}',
  lead_reviver_sub text
);

-- Careers application submissions
create table if not exists public.careers_applications (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  role text not null,
  message text not null,
  status text not null default 'new',
  source text not null default 'website'
);

alter table public.onboarding_submissions enable row level security;
alter table public.careers_applications enable row level security;

-- Anonymous users may submit forms, but cannot read/update/delete rows.
drop policy if exists "allow_anonymous_insert_onboarding" on public.onboarding_submissions;
create policy "allow_anonymous_insert_onboarding"
on public.onboarding_submissions
for insert
to anon
with check (true);

drop policy if exists "allow_anonymous_insert_careers" on public.careers_applications;
create policy "allow_anonymous_insert_careers"
on public.careers_applications
for insert
to anon
with check (true);
