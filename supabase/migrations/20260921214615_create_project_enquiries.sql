create table if not exists public.project_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 320),
  brief text not null check (char_length(brief) between 1 and 5000),
  created_at timestamptz not null default now()
);

alter table public.project_enquiries enable row level security;

-- No client roles receive table privileges. The server route is the only writer.
revoke all on public.project_enquiries from anon, authenticated;
