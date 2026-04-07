-- 1. Tags
-- Centralised tag table. Each tag has a machine name and localised label.
create table if not exists public.tags (
  id         uuid primary key default gen_random_uuid(),
  name       text not null unique,                 -- machine key, e.g. "closures"
  label      jsonb not null default '{}'::jsonb,   -- { "ru": "Замыкания", "en": "Closures" }
  created_at timestamptz not null default now()
);

alter table public.tags enable row level security;

-- Tags are public read for every authenticated user
create policy "Authenticated users can read tags"
  on public.tags for select
  using (auth.role() = 'authenticated');


--  2. Topics 
create table if not exists public.topics (
  id          uuid primary key default gen_random_uuid(),
  title       jsonb not null default '{}'::jsonb,       -- { "ru": "...", "en": "..." }
  description jsonb not null default '{}'::jsonb,
  difficulty  smallint not null default 1 check (difficulty between 1 and 3),
  order_index integer not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.topics enable row level security;

create policy "Authenticated users can read topics"
  on public.topics for select
  using (auth.role() = 'authenticated');


--  3. topic ↔ tag  (many-to-many) 
create table if not exists public.topic_tag_map (
  topic_id uuid not null references public.topics(id) on delete cascade,
  tag_id   uuid not null references public.tags(id)   on delete cascade,
  primary key (topic_id, tag_id)
);

alter table public.topic_tag_map enable row level security;

create policy "Authenticated users can read topic_tag_map"
  on public.topic_tag_map for select
  using (auth.role() = 'authenticated');


--  4. Widgets (single table, payload as JSONB) 
-- One table for ALL widget types. The `type` discriminator determines how the 'payload' and 'correct_answer' JSONBs are interpreted.
create table if not exists public.widgets (
  id             uuid primary key default gen_random_uuid(),
  type           text not null,                               -- 'quiz' | 'code-ordering'
  difficulty     smallint not null default 1 check (difficulty between 1 and 3),
  payload        jsonb not null default '{}'::jsonb,           -- type-specific question data
  correct_answer jsonb not null default '{}'::jsonb,           -- NOT sent to client in prod
  created_at     timestamptz not null default now()
);

alter table public.widgets enable row level security;

create policy "Authenticated users can read widgets"
  on public.widgets for select
  using (auth.role() = 'authenticated');


--  5. widget ↔ tag  (many-to-many) 
create table if not exists public.widget_tag_map (
  widget_id uuid not null references public.widgets(id) on delete cascade,
  tag_id    uuid not null references public.tags(id)    on delete cascade,
  primary key (widget_id, tag_id)
);

alter table public.widget_tag_map enable row level security;

create policy "Authenticated users can read widget_tag_map"
  on public.widget_tag_map for select
  using (auth.role() = 'authenticated');


--  6. topic ↔ widget  (many-to-many, order matters) 
create table if not exists public.topic_widgets (
  topic_id   uuid not null references public.topics(id)  on delete cascade,
  widget_id  uuid not null references public.widgets(id) on delete cascade,
  sort_order integer not null default 0,
  primary key (topic_id, widget_id)
);

alter table public.topic_widgets enable row level security;

create policy "Authenticated users can read topic_widgets"
  on public.topic_widgets for select
  using (auth.role() = 'authenticated');


--  7. Indexes 
create index if not exists idx_widgets_type       on public.widgets(type);
create index if not exists idx_topic_widgets_topic on public.topic_widgets(topic_id);
create index if not exists idx_widget_tag_widget   on public.widget_tag_map(widget_id);
create index if not exists idx_topic_tag_topic     on public.topic_tag_map(topic_id);
