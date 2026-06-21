alter table public.onboarding_submissions
drop constraint if exists onboarding_submissions_mode_check;

alter table public.onboarding_submissions
add constraint onboarding_submissions_mode_check
check (mode in ('audit', 'demo', 'implement'));
