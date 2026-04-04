--  Leaderboard RPC 
-- Returns aggregated stats per user for the leaderboard.
-- SECURITY DEFINER so it can read across all users' test_results
-- while RLS keeps direct table access private.

create or replace function public.get_leaderboard(result_limit integer default 20)
returns table (
  user_id       uuid,
  display_name  text,
  tests_taken   bigint,
  avg_score     integer,
  best_score    smallint,
  last_active   timestamptz
)
language sql
security definer
set search_path = ''
as $$
  select
    tr.user_id,
    coalesce(
      nullif(trim(concat(up.first_name, ' ', up.last_name)), ''),
      split_part(up.email, '@', 1),
      'User'
    ) as display_name,
    count(*)              as tests_taken,
    round(avg(tr.percentage))::integer as avg_score,
    max(tr.percentage)    as best_score,
    max(tr.completed_at)  as last_active
  from public.test_results tr
  left join public.user_profiles up on up.user_id = tr.user_id
  group by tr.user_id, up.first_name, up.last_name, up.email
  order by avg_score desc, tests_taken desc
  limit result_limit;
$$;

-- Grant execute to authenticated users
grant execute on function public.get_leaderboard(integer) to authenticated;
