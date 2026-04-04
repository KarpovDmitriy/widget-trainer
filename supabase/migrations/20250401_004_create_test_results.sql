-- Test results history table
-- Stores each completed test session for a user
create table if not exists public.test_results (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  topic_id     uuid not null references public.topics(id) on delete cascade,
  percentage   smallint not null check (percentage between 0 and 100),
  total_correct smallint not null default 0,
  total_questions smallint not null default 0,
  completed_at timestamptz not null default now()
);

alter table public.test_results enable row level security;

-- Users can only read their own results
create policy "Users can read own test results"
  on public.test_results for select
  using (auth.uid() = user_id);

-- Users can insert their own results
create policy "Users can insert own test results"
  on public.test_results for insert
  with check (auth.uid() = user_id);

-- Indexes for efficient queries
create index if not exists idx_test_results_user      on public.test_results(user_id);
create index if not exists idx_test_results_user_date on public.test_results(user_id, completed_at desc);
create index if not exists idx_test_results_topic     on public.test_results(topic_id);
