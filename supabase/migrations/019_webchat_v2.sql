-- ============================================================================
-- 019_webchat_v2 — Tawk.to-style website chat
--
-- Website chats get their own model: visitor → chats → messages.
--   * webchat_visitors   one per browser (token in the visitor's localStorage)
--   * webchat_page_views pages a visitor viewed (Live visitors, sidebar)
--   * webchat_chats      one chat "ticket" — status, assignee, rating, tags
--   * webchat_messages   messages, with attachments (message-attachments bucket)
--   * webchat_agent_status  Online / Away for each agent (+ heartbeat)
--   * webchat_canned_replies  team shortcuts like /iqas
--   * webchat_settings   greeting popup + offline email (singleton)
--
-- Visitors chat first and give details later. A chat links to a customers
-- row only when the visitor gives an email that matches (unverified — staff
-- context only; the visitor never sees anything but their own chats).
--
-- Written by edge functions (service role):
--   webchat-visitor  — the cethos.com bubble (visitor bearer token)
--   webchat-agent    — Cethos Chat sends (staff JWT)
-- Read by Cethos Chat (portal.cethos.com/chat) through RLS + the chat_* RPCs,
-- gated by staff_has_webchat_access() (018).
--
-- Replaces the 017 design (webchat in customer_conversations). 017 objects
-- stay until the old widget is gone; drop them in a later migration.
-- ============================================================================

-- 0. Helper: the calling agent's staff id (null if no webchat access) --------
create or replace function public.webchat_current_staff_id()
returns uuid
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select su.id from public.staff_users su
   where su.auth_user_id = auth.uid()
     and su.is_active
     and (su.role in ('admin', 'super_admin')
          or coalesce((su.permissions ->> 'webchat')::boolean, false))
   limit 1;
$$;
revoke execute on function public.webchat_current_staff_id() from public, anon;
grant execute on function public.webchat_current_staff_id() to authenticated;

-- 1. Tables ------------------------------------------------------------------
create table if not exists public.webchat_visitors (
  id             uuid primary key default gen_random_uuid(),
  token_hash     text not null unique,
  topic          text not null unique,          -- Broadcast topic suffix (secret)
  first_seen_at  timestamptz not null default now(),
  last_seen_at   timestamptz not null default now(),
  visit_started_at timestamptz not null default now(),
  visits         integer not null default 1,
  current_url    text,
  current_title  text,
  referrer       text,
  country        text,
  region         text,
  city           text,
  user_agent     text,
  locale         text,
  name           text,
  email          text,
  phone          text,
  customer_id    uuid references public.customers(id) on delete set null,
  banned_at      timestamptz,
  created_at     timestamptz not null default now()
);
create index if not exists webchat_visitors_last_seen_idx on public.webchat_visitors (last_seen_at desc);
create index if not exists webchat_visitors_customer_idx on public.webchat_visitors (customer_id) where customer_id is not null;

create table if not exists public.webchat_page_views (
  id          bigint generated always as identity primary key,
  visitor_id  uuid not null references public.webchat_visitors(id) on delete cascade,
  url         text not null,
  title       text,
  viewed_at   timestamptz not null default now()
);
create index if not exists webchat_page_views_visitor_idx on public.webchat_page_views (visitor_id, viewed_at desc);

create table if not exists public.webchat_chats (
  id                  uuid primary key default gen_random_uuid(),
  visitor_id          uuid not null references public.webchat_visitors(id) on delete cascade,
  customer_id         uuid references public.customers(id) on delete set null,
  status              text not null default 'open' check (status in ('open', 'offline', 'closed')),
  started_by          text not null default 'visitor' check (started_by in ('visitor', 'staff')),
  assigned_staff_id   uuid references public.staff_users(id) on delete set null,
  started_url         text,
  created_at          timestamptz not null default now(),
  first_response_at   timestamptz,
  last_message_at     timestamptz,
  last_message_text   text,
  last_message_sender text,
  unread_staff        integer not null default 0,
  unread_visitor      integer not null default 0,
  rating              text check (rating in ('up', 'down')),
  rating_comment      text,
  tags                text[] not null default '{}',
  notes               text,
  closed_at           timestamptz,
  closed_by_staff_id  uuid references public.staff_users(id) on delete set null,
  emailed_at          timestamptz             -- last "you have a reply" email (debounce)
);
create index if not exists webchat_chats_status_idx on public.webchat_chats (status, last_message_at desc nulls last);
create index if not exists webchat_chats_visitor_idx on public.webchat_chats (visitor_id, created_at desc);
create index if not exists webchat_chats_assignee_idx on public.webchat_chats (assigned_staff_id) where status <> 'closed';
create index if not exists webchat_chats_customer_idx on public.webchat_chats (customer_id) where customer_id is not null;

create table if not exists public.webchat_messages (
  id           uuid primary key default gen_random_uuid(),
  chat_id      uuid not null references public.webchat_chats(id) on delete cascade,
  sender_type  text not null check (sender_type in ('visitor', 'staff', 'system')),
  staff_id     uuid references public.staff_users(id) on delete set null,
  body         text not null default '',
  attachments  jsonb not null default '[]'::jsonb,   -- [{path,name,mime,size}]
  created_at   timestamptz not null default now(),
  read_at      timestamptz
);
create index if not exists webchat_messages_chat_idx on public.webchat_messages (chat_id, created_at);

create table if not exists public.webchat_agent_status (
  staff_id      uuid primary key references public.staff_users(id) on delete cascade,
  status        text not null default 'online' check (status in ('online', 'away')),
  heartbeat_at  timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create table if not exists public.webchat_canned_replies (
  id          uuid primary key default gen_random_uuid(),
  shortcut    text not null,
  title       text not null,
  body        text not null,
  created_by  uuid references public.staff_users(id) on delete set null,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create unique index if not exists webchat_canned_replies_shortcut_idx on public.webchat_canned_replies (lower(shortcut));

create table if not exists public.webchat_settings (
  id                int primary key default 1 check (id = 1),
  greeting_enabled  boolean not null default true,
  greeting_delay_s  integer not null default 20 check (greeting_delay_s between 3 and 600),
  greeting_en       text not null default 'Hi! Need a certified translation? Ask us anything — we usually reply within minutes.',
  greeting_fr       text not null default 'Bonjour ! Besoin d’une traduction certifiée ? Écrivez-nous — nous répondons en quelques minutes.',
  offline_email     text not null default 'support@cethos.com',
  updated_at        timestamptz not null default now(),
  updated_by        uuid references public.staff_users(id) on delete set null
);
insert into public.webchat_settings (id) values (1) on conflict (id) do nothing;

comment on table public.webchat_visitors is 'cethos.com chat visitors, one per browser. Written by webchat-visitor (service role); read by Cethos Chat staff.';
comment on table public.webchat_chats is 'Website chats (Tawk.to-style tickets). status open|offline (left message)|closed.';
comment on table public.webchat_messages is 'Website chat messages. Inserts by webchat-visitor / webchat-agent / chat_* RPCs; trigger broadcasts to the visitor topic and pushes to agents.';

-- 2. RLS -------------------------------------------------------------------
alter table public.webchat_visitors       enable row level security;
alter table public.webchat_page_views     enable row level security;
alter table public.webchat_chats          enable row level security;
alter table public.webchat_messages       enable row level security;
alter table public.webchat_agent_status   enable row level security;
alter table public.webchat_canned_replies enable row level security;
alter table public.webchat_settings       enable row level security;

drop policy if exists webchat_visitors_staff_select on public.webchat_visitors;
create policy webchat_visitors_staff_select on public.webchat_visitors
  for select to authenticated using (public.staff_has_webchat_access());

drop policy if exists webchat_page_views_staff_select on public.webchat_page_views;
create policy webchat_page_views_staff_select on public.webchat_page_views
  for select to authenticated using (public.staff_has_webchat_access());

drop policy if exists webchat_chats_staff_select on public.webchat_chats;
create policy webchat_chats_staff_select on public.webchat_chats
  for select to authenticated using (public.staff_has_webchat_access());

drop policy if exists webchat_messages_staff_select on public.webchat_messages;
create policy webchat_messages_staff_select on public.webchat_messages
  for select to authenticated using (public.staff_has_webchat_access());

drop policy if exists webchat_agent_status_staff_select on public.webchat_agent_status;
create policy webchat_agent_status_staff_select on public.webchat_agent_status
  for select to authenticated using (public.staff_has_webchat_access());

drop policy if exists webchat_canned_staff_all on public.webchat_canned_replies;
create policy webchat_canned_staff_all on public.webchat_canned_replies
  for all to authenticated
  using (public.staff_has_webchat_access())
  with check (public.staff_has_webchat_access());

drop policy if exists webchat_settings_staff_select on public.webchat_settings;
create policy webchat_settings_staff_select on public.webchat_settings
  for select to authenticated using (public.staff_has_webchat_access());

-- Realtime (postgres_changes for the Cethos Chat console; RLS applies)
do $$ begin
  alter publication supabase_realtime add table public.webchat_chats;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.webchat_messages;
exception when duplicate_object then null; end $$;

-- 3. Message trigger: chat summary + Broadcast to the visitor + push ----------
create or replace function public.webchat_v2_on_message()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_topic    text;
  v_name     text;
  v_avatar   text;
  v_summary  text;
  v_payload  jsonb;
begin
  v_summary := nullif(left(NEW.body, 300), '');
  if v_summary is null and jsonb_array_length(NEW.attachments) > 0 then
    v_summary := '📎 ' || coalesce(NEW.attachments -> 0 ->> 'name', 'File');
  end if;

  update public.webchat_chats c
     set last_message_at     = NEW.created_at,
         last_message_text   = coalesce(v_summary, c.last_message_text),
         last_message_sender = NEW.sender_type,
         unread_staff   = case when NEW.sender_type = 'visitor' then c.unread_staff + 1 else c.unread_staff end,
         unread_visitor = case when NEW.sender_type = 'staff' then c.unread_visitor + 1 else c.unread_visitor end,
         first_response_at = case when NEW.sender_type = 'staff' and c.first_response_at is null
                                  then NEW.created_at else c.first_response_at end
   where c.id = NEW.chat_id;

  begin
    select v.topic into v_topic
      from public.webchat_chats c join public.webchat_visitors v on v.id = c.visitor_id
     where c.id = NEW.chat_id;

    if NEW.staff_id is not null then
      select split_part(coalesce(full_name, ''), ' ', 1), avatar_url
        into v_name, v_avatar
        from public.staff_users where id = NEW.staff_id;
    end if;

    v_payload := jsonb_build_object(
      'id',          NEW.id,
      'chat_id',     NEW.chat_id,
      'sender_type', NEW.sender_type,
      'sender_name', nullif(v_name, ''),
      'sender_avatar', v_avatar,
      'body',        NEW.body,
      'attachments', (select coalesce(jsonb_agg(jsonb_build_object(
                         'name', a ->> 'name', 'mime', a ->> 'mime', 'size', (a ->> 'size')::bigint)), '[]'::jsonb)
                        from jsonb_array_elements(NEW.attachments) a),
      'created_at',  NEW.created_at
    );
    if v_topic is not null then
      perform realtime.send(v_payload, 'message', 'webchat:' || v_topic, false);
    end if;
  exception when others then
    raise warning 'webchat_v2_on_message: broadcast failed: %', sqlerrm;
  end;

  if NEW.sender_type = 'visitor' then
    perform public.staff_push_dispatch('webchat', NEW.id);
  end if;

  return NEW;
end;
$$;
revoke execute on function public.webchat_v2_on_message() from public, anon, authenticated;

drop trigger if exists trg_webchat_v2_on_message on public.webchat_messages;
create trigger trg_webchat_v2_on_message
  after insert on public.webchat_messages
  for each row execute function public.webchat_v2_on_message();

-- Chat status / assignee changes → tell the visitor's bubble
create or replace function public.webchat_v2_on_chat_update()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_topic text;
  v_name  text;
  v_avatar text;
begin
  if NEW.status is distinct from OLD.status
     or NEW.assigned_staff_id is distinct from OLD.assigned_staff_id then
    begin
      select topic into v_topic from public.webchat_visitors where id = NEW.visitor_id;
      if NEW.assigned_staff_id is not null then
        select split_part(coalesce(full_name, ''), ' ', 1), avatar_url into v_name, v_avatar
          from public.staff_users where id = NEW.assigned_staff_id;
      end if;
      if v_topic is not null then
        perform realtime.send(
          jsonb_build_object('chat_id', NEW.id, 'status', NEW.status,
                             'agent_name', nullif(v_name, ''), 'agent_avatar', v_avatar),
          'chat', 'webchat:' || v_topic, false);
      end if;
    exception when others then
      raise warning 'webchat_v2_on_chat_update: %', sqlerrm;
    end;
  end if;
  return NEW;
end;
$$;
revoke execute on function public.webchat_v2_on_chat_update() from public, anon, authenticated;

drop trigger if exists trg_webchat_v2_on_chat_update on public.webchat_chats;
create trigger trg_webchat_v2_on_chat_update
  after update on public.webchat_chats
  for each row execute function public.webchat_v2_on_chat_update();

-- 4. Console RPCs (Cethos Chat) ----------------------------------------------
-- Tabs: incoming = open/offline and unassigned; mine = open/offline assigned
-- to me; open = all open/offline; closed = closed. p_chat_id = just that chat.
create or replace function public.chat_list_chats(
  p_tab text default 'open',
  p_search text default null,
  p_chat_id uuid default null,
  p_limit integer default 100
)
returns table (
  id uuid, visitor_id uuid, customer_id uuid, status text, started_by text,
  assigned_staff_id uuid, assigned_name text,
  display_name text, email text, phone text,
  created_at timestamptz, first_response_at timestamptz,
  last_message_at timestamptz, last_message_text text, last_message_sender text,
  unread_staff integer, rating text, rating_comment text, tags text[], notes text,
  closed_at timestamptz,
  visitor_last_seen_at timestamptz, visitor_current_url text, visitor_current_title text,
  country text, city text, topic text
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := public.webchat_current_staff_id();
  v_q  text := nullif(trim(coalesce(p_search, '')), '');
begin
  if v_me is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;

  return query
  select c.id, c.visitor_id, c.customer_id, c.status, c.started_by,
         c.assigned_staff_id, su.full_name,
         coalesce(nullif(v.name, ''), nullif(v.email, ''),
                  'Visitor #' || upper(left(replace(v.id::text, '-', ''), 4))),
         v.email, v.phone,
         c.created_at, c.first_response_at,
         c.last_message_at, c.last_message_text, c.last_message_sender,
         c.unread_staff, c.rating, c.rating_comment, c.tags, c.notes,
         c.closed_at,
         v.last_seen_at, v.current_url, v.current_title,
         v.country, v.city, v.topic
    from public.webchat_chats c
    join public.webchat_visitors v on v.id = c.visitor_id
    left join public.staff_users su on su.id = c.assigned_staff_id
   where (p_chat_id is not null and c.id = p_chat_id)
      or (p_chat_id is null and (
            (p_tab = 'incoming' and c.status <> 'closed' and c.assigned_staff_id is null)
         or (p_tab = 'mine'     and c.status <> 'closed' and c.assigned_staff_id = v_me)
         or (p_tab = 'open'     and c.status <> 'closed')
         or (p_tab = 'closed'   and c.status = 'closed')
         or (p_tab = 'all')
        ) and (
            v_q is null
         or v.name ilike '%' || v_q || '%'
         or v.email ilike '%' || v_q || '%'
         or c.last_message_text ilike '%' || v_q || '%'
         or exists (select 1 from public.webchat_messages m
                     where m.chat_id = c.id and m.body ilike '%' || v_q || '%')
        ))
   order by (c.unread_staff > 0) desc, c.last_message_at desc nulls last, c.created_at desc
   limit greatest(1, least(p_limit, 500));
end;
$$;
revoke execute on function public.chat_list_chats(text, text, uuid, integer) from public, anon;
grant execute on function public.chat_list_chats(text, text, uuid, integer) to authenticated;

-- Visitors on cethos.com right now (checked in within 2 minutes)
create or replace function public.chat_live_visitors()
returns table (
  id uuid, display_name text, email text, country text, region text, city text,
  user_agent text, locale text, current_url text, current_title text, referrer text,
  first_seen_at timestamptz, visit_started_at timestamptz, last_seen_at timestamptz,
  visits integer, pages_this_visit bigint,
  open_chat_id uuid, open_chat_assigned_name text, customer_id uuid
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  return query
  select v.id,
         coalesce(nullif(v.name, ''), nullif(v.email, ''),
                  'Visitor #' || upper(left(replace(v.id::text, '-', ''), 4))),
         v.email, v.country, v.region, v.city, v.user_agent, v.locale,
         v.current_url, v.current_title, v.referrer,
         v.first_seen_at, v.visit_started_at, v.last_seen_at, v.visits,
         (select count(*) from public.webchat_page_views pv
           where pv.visitor_id = v.id and pv.viewed_at >= v.visit_started_at),
         oc.id, su.full_name, v.customer_id
    from public.webchat_visitors v
    left join lateral (
      select c.id, c.assigned_staff_id from public.webchat_chats c
       where c.visitor_id = v.id and c.status <> 'closed'
       order by c.created_at desc limit 1
    ) oc on true
    left join public.staff_users su on su.id = oc.assigned_staff_id
   where v.last_seen_at > now() - interval '2 minutes'
     and v.banned_at is null
   order by (oc.id is not null) desc, v.visit_started_at desc;
end;
$$;
revoke execute on function public.chat_live_visitors() from public, anon;
grant execute on function public.chat_live_visitors() to authenticated;

-- Everything for the visitor sidebar, as one jsonb document
create or replace function public.chat_visitor_detail(p_visitor_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
declare
  v_vis  public.webchat_visitors;
  v_out  jsonb;
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  select * into v_vis from public.webchat_visitors where id = p_visitor_id;
  if not found then return null; end if;

  v_out := jsonb_build_object(
    'visitor', jsonb_build_object(
      'id', v_vis.id, 'name', v_vis.name, 'email', v_vis.email, 'phone', v_vis.phone,
      'country', v_vis.country, 'region', v_vis.region, 'city', v_vis.city,
      'user_agent', v_vis.user_agent, 'locale', v_vis.locale, 'referrer', v_vis.referrer,
      'current_url', v_vis.current_url, 'current_title', v_vis.current_title,
      'first_seen_at', v_vis.first_seen_at, 'visit_started_at', v_vis.visit_started_at,
      'last_seen_at', v_vis.last_seen_at, 'visits', v_vis.visits,
      'banned_at', v_vis.banned_at, 'customer_id', v_vis.customer_id),
    'page_views', coalesce((
      select jsonb_agg(jsonb_build_object('url', pv.url, 'title', pv.title, 'viewed_at', pv.viewed_at)
                       order by pv.viewed_at desc)
        from (select * from public.webchat_page_views
               where visitor_id = v_vis.id order by viewed_at desc limit 30) pv), '[]'::jsonb),
    'chats', coalesce((
      select jsonb_agg(jsonb_build_object('id', c.id, 'status', c.status, 'created_at', c.created_at,
                                          'last_message_text', c.last_message_text, 'rating', c.rating)
                       order by c.created_at desc)
        from (select * from public.webchat_chats
               where visitor_id = v_vis.id order by created_at desc limit 20) c), '[]'::jsonb)
  );

  if v_vis.customer_id is not null then
    v_out := v_out || jsonb_build_object(
      'customer', (select jsonb_build_object('id', cu.id, 'full_name', cu.full_name, 'email', cu.email,
                                             'phone', cu.phone, 'company_name', cu.company_name,
                                             'created_at', cu.created_at)
                     from public.customers cu where cu.id = v_vis.customer_id),
      'quotes_count', (select count(*) from public.quotes q
                        where q.customer_id = v_vis.customer_id and q.deleted_at is null),
      'quotes', coalesce((
        select jsonb_agg(jsonb_build_object('id', q.id, 'quote_number', q.quote_number, 'status', q.status,
                                            'total', q.total, 'created_at', q.created_at)
                         order by q.created_at desc)
          from (select * from public.quotes where customer_id = v_vis.customer_id and deleted_at is null
                 order by created_at desc limit 5) q), '[]'::jsonb),
      'orders_count', (select count(*) from public.orders o
                        where o.customer_id = v_vis.customer_id and o.deleted_at is null),
      'orders', coalesce((
        select jsonb_agg(jsonb_build_object('id', o.id, 'order_number', o.order_number, 'status', o.status,
                                            'total_amount', o.total_amount, 'created_at', o.created_at)
                         order by o.created_at desc)
          from (select * from public.orders where customer_id = v_vis.customer_id and deleted_at is null
                 order by created_at desc limit 5) o), '[]'::jsonb)
    );
  end if;
  return v_out;
end;
$$;
revoke execute on function public.chat_visitor_detail(uuid) from public, anon;
grant execute on function public.chat_visitor_detail(uuid) to authenticated;

-- Agents with website-chat access, with Online/Away (for status + Transfer)
create or replace function public.chat_agents()
returns table (id uuid, full_name text, avatar_url text, status text, online boolean)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  return query
  select su.id, su.full_name, su.avatar_url,
         coalesce(s.status, 'away'),
         coalesce(s.status = 'online' and s.heartbeat_at > now() - interval '2 minutes', false)
    from public.staff_users su
    left join public.webchat_agent_status s on s.staff_id = su.id
   where su.is_active
     and (su.role in ('admin', 'super_admin') or coalesce((su.permissions ->> 'webchat')::boolean, false))
   order by 5 desc, su.full_name;
end;
$$;
revoke execute on function public.chat_agents() from public, anon;
grant execute on function public.chat_agents() to authenticated;

-- My status (Online/Away); p_status null = heartbeat only
create or replace function public.chat_set_agent_status(p_status text default null)
returns text
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := public.webchat_current_staff_id();
  v_status text;
begin
  if v_me is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  if p_status is not null and p_status not in ('online', 'away') then
    raise exception 'invalid status';
  end if;
  insert into public.webchat_agent_status as s (staff_id, status, heartbeat_at, updated_at)
  values (v_me, coalesce(p_status, 'online'), now(), now())
  on conflict (staff_id) do update
     set status = coalesce(p_status, s.status),
         heartbeat_at = now(),
         updated_at = case when p_status is not null then now() else s.updated_at end
  returning status into v_status;
  return v_status;
end;
$$;
revoke execute on function public.chat_set_agent_status(text) from public, anon;
grant execute on function public.chat_set_agent_status(text) to authenticated;

-- Claim (Join) an unassigned chat — or take it over with p_force
create or replace function public.chat_claim(p_chat_id uuid, p_force boolean default false)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := public.webchat_current_staff_id();
  v_prev uuid;
  v_name text;
begin
  if v_me is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  select assigned_staff_id into v_prev from public.webchat_chats where id = p_chat_id for update;
  if not found then raise exception 'chat not found'; end if;
  if v_prev is not distinct from v_me then return; end if;
  if v_prev is not null and not p_force then
    raise exception 'chat already assigned' using errcode = 'P0001';
  end if;
  update public.webchat_chats set assigned_staff_id = v_me,
         status = case when status = 'closed' then 'open' else status end
   where id = p_chat_id;
  select split_part(full_name, ' ', 1) into v_name from public.staff_users where id = v_me;
  insert into public.webchat_messages (chat_id, sender_type, body)
  values (p_chat_id, 'system', coalesce(v_name, 'An agent') || ' joined the chat');
end;
$$;
revoke execute on function public.chat_claim(uuid, boolean) from public, anon;
grant execute on function public.chat_claim(uuid, boolean) to authenticated;

create or replace function public.chat_transfer(p_chat_id uuid, p_staff_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := public.webchat_current_staff_id();
  v_name text;
begin
  if v_me is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  select split_part(su.full_name, ' ', 1) into v_name
    from public.staff_users su
   where su.id = p_staff_id and su.is_active
     and (su.role in ('admin', 'super_admin') or coalesce((su.permissions ->> 'webchat')::boolean, false));
  if not found then raise exception 'that person has no website chat access'; end if;
  update public.webchat_chats set assigned_staff_id = p_staff_id where id = p_chat_id;
  if not found then raise exception 'chat not found'; end if;
  insert into public.webchat_messages (chat_id, sender_type, body)
  values (p_chat_id, 'system', 'Chat transferred to ' || coalesce(v_name, 'another agent'));
end;
$$;
revoke execute on function public.chat_transfer(uuid, uuid) from public, anon;
grant execute on function public.chat_transfer(uuid, uuid) to authenticated;

create or replace function public.chat_close(p_chat_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid := public.webchat_current_staff_id();
begin
  if v_me is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  update public.webchat_chats
     set status = 'closed', closed_at = now(), closed_by_staff_id = v_me, unread_staff = 0
   where id = p_chat_id and status <> 'closed';
  if found then
    insert into public.webchat_messages (chat_id, sender_type, body)
    values (p_chat_id, 'system', 'Chat ended');
  end if;
end;
$$;
revoke execute on function public.chat_close(uuid) from public, anon;
grant execute on function public.chat_close(uuid) to authenticated;

create or replace function public.chat_mark_read(p_chat_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  update public.webchat_messages set read_at = now()
   where chat_id = p_chat_id and sender_type = 'visitor' and read_at is null;
  update public.webchat_chats set unread_staff = 0 where id = p_chat_id and unread_staff <> 0;
end;
$$;
revoke execute on function public.chat_mark_read(uuid) from public, anon;
grant execute on function public.chat_mark_read(uuid) to authenticated;

-- Tags + private notes on a chat
create or replace function public.chat_update_meta(p_chat_id uuid, p_tags text[] default null, p_notes text default null)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  update public.webchat_chats
     set tags  = coalesce((select array_agg(distinct lower(trim(t))) from unnest(p_tags) t where trim(t) <> ''),
                          case when p_tags is null then tags else '{}' end),
         notes = case when p_notes is null then notes else nullif(left(p_notes, 5000), '') end
   where id = p_chat_id;
end;
$$;
revoke execute on function public.chat_update_meta(uuid, text[], text) from public, anon;
grant execute on function public.chat_update_meta(uuid, text[], text) to authenticated;

-- Edit the visitor's contact details; re-links the customer by email
create or replace function public.chat_update_visitor(p_visitor_id uuid, p_name text, p_email text, p_phone text)
returns uuid
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_email text := nullif(lower(trim(coalesce(p_email, ''))), '');
  v_customer uuid;
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  if v_email is not null then
    select id into v_customer from public.customers where lower(email) = v_email limit 1;
  end if;
  update public.webchat_visitors
     set name = nullif(left(trim(coalesce(p_name, '')), 120), ''),
         email = v_email,
         phone = nullif(left(trim(coalesce(p_phone, '')), 40), ''),
         customer_id = v_customer
   where id = p_visitor_id;
  update public.webchat_chats set customer_id = v_customer
   where visitor_id = p_visitor_id and status <> 'closed';
  return v_customer;
end;
$$;
revoke execute on function public.chat_update_visitor(uuid, text, text, text) from public, anon;
grant execute on function public.chat_update_visitor(uuid, text, text, text) to authenticated;

create or replace function public.chat_ban_visitor(p_visitor_id uuid, p_ban boolean)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if public.webchat_current_staff_id() is null then
    raise exception 'webchat access required' using errcode = '42501';
  end if;
  update public.webchat_visitors set banned_at = case when p_ban then now() else null end
   where id = p_visitor_id;
end;
$$;
revoke execute on function public.chat_ban_visitor(uuid, boolean) from public, anon;
grant execute on function public.chat_ban_visitor(uuid, boolean) to authenticated;

-- Greeting + offline email (admins and super admins only)
create or replace function public.chat_update_settings(
  p_greeting_enabled boolean, p_greeting_delay_s integer,
  p_greeting_en text, p_greeting_fr text, p_offline_email text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_me uuid;
begin
  select su.id into v_me from public.staff_users su
   where su.auth_user_id = auth.uid() and su.is_active and su.role in ('admin', 'super_admin');
  if v_me is null then
    raise exception 'admins only' using errcode = '42501';
  end if;
  update public.webchat_settings
     set greeting_enabled = p_greeting_enabled,
         greeting_delay_s = greatest(3, least(p_greeting_delay_s, 600)),
         greeting_en = left(trim(p_greeting_en), 300),
         greeting_fr = left(trim(p_greeting_fr), 300),
         offline_email = trim(p_offline_email),
         updated_at = now(), updated_by = v_me
   where id = 1;
end;
$$;
revoke execute on function public.chat_update_settings(boolean, integer, text, text, text) from public, anon;
grant execute on function public.chat_update_settings(boolean, integer, text, text, text) to authenticated;

-- Website chats for a customer (portal customer page)
create or replace function public.chat_customer_chats(p_customer_id uuid)
returns table (id uuid, status text, created_at timestamptz, last_message_at timestamptz,
               last_message_text text, assigned_name text, rating text)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if not exists (select 1 from public.staff_users where auth_user_id = auth.uid() and is_active) then
    raise exception 'staff only' using errcode = '42501';
  end if;
  return query
  select c.id, c.status, c.created_at, c.last_message_at, c.last_message_text, su.full_name, c.rating
    from public.webchat_chats c
    left join public.staff_users su on su.id = c.assigned_staff_id
   where c.customer_id = p_customer_id
   order by c.created_at desc
   limit 50;
end;
$$;
revoke execute on function public.chat_customer_chats(uuid) from public, anon;
grant execute on function public.chat_customer_chats(uuid) to authenticated;

-- 5. Storage: agent photos (public) ------------------------------------------
insert into storage.buckets (id, name, public)
values ('staff-avatars', 'staff-avatars', true)
on conflict (id) do nothing;

-- 6. Retention ---------------------------------------------------------------
-- Visitors who never chatted: removed 30 days after their last visit (page
-- views cascade). Page views of chatting visitors: kept 180 days.
do $$ begin
  perform cron.unschedule('webchat-visitors-purge-30d');
exception when others then null; end $$;
select cron.schedule(
  'webchat-visitors-purge-30d',
  '23 4 * * *',
  $cron$
    delete from public.webchat_visitors v
     where v.last_seen_at < now() - interval '30 days'
       and not exists (select 1 from public.webchat_chats c where c.visitor_id = v.id);
    delete from public.webchat_page_views where viewed_at < now() - interval '180 days';
  $cron$
);
