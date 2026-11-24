-- ============================================================================
-- 018_chat_app_push — separate "Cethos Chat" app + portal event pushes
--
-- Two installable staff apps share portal.cethos.com:
--   * Cethos Portal (/admin/) — pushes for new orders, new quotes, customer
--     portal/email messages and inbound SMS.
--   * Cethos Chat   (/chat/)  — pushes for website chats only.
-- Each device subscription records which app it belongs to. send-web-push
-- (portal repo) routes every event to the right app.
--
-- Website-chat access: staff_users.permissions.webchat = true, or role
-- admin / super_admin.
-- ============================================================================

-- 1. Which app a push subscription belongs to ------------------------------
alter table public.staff_push_subscriptions
  add column if not exists app text not null default 'portal';

do $$ begin
  alter table public.staff_push_subscriptions
    add constraint staff_push_subscriptions_app_check check (app in ('portal', 'chat'));
exception when duplicate_object then null;
end $$;

create index if not exists staff_push_subscriptions_app_idx
  on public.staff_push_subscriptions (app);

-- 2. Website-chat access check --------------------------------------------
create or replace function public.staff_has_webchat_access()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1 from public.staff_users su
     where su.auth_user_id = auth.uid()
       and su.is_active
       and (su.role in ('admin', 'super_admin')
            or coalesce((su.permissions ->> 'webchat')::boolean, false))
  );
$$;

revoke execute on function public.staff_has_webchat_access() from public, anon;
grant execute on function public.staff_has_webchat_access() to authenticated;

-- 3. Inbox for the Chat app -----------------------------------------------
-- p_conversation_id: return just that conversation (any channel) for the
-- Chat app's conversation header; null = the website-chat inbox.
create or replace function public.chat_list_webchat_threads(
  p_limit integer default 50,
  p_conversation_id uuid default null
)
returns table (
  conversation_id      uuid,
  customer_id          uuid,
  customer_name        text,
  customer_email       text,
  customer_phone       text,
  last_message_text    text,
  last_message_at      timestamptz,
  last_message_sender  text,
  unread_count_staff   integer,
  visitor_last_seen_at timestamptz,
  visitor_page_url     text
)
language plpgsql
stable
security definer
set search_path = public, pg_temp
as $$
begin
  if not public.staff_has_webchat_access() then
    raise exception 'permission_denied' using errcode = '42501';
  end if;

  return query
  select
    cc.id,
    cc.customer_id,
    coalesce(nullif(c.full_name, ''), c.email)::text,
    c.email::text,
    c.phone::text,
    cc.last_message_preview,
    cc.last_message_at,
    cc.last_message_sender::text,
    coalesce(cc.unread_count_staff, 0),
    ws.last_seen_at,
    ws.page_url
  from public.customer_conversations cc
  join public.customers c on c.id = cc.customer_id
  left join lateral (
    select s.last_seen_at, s.page_url
      from public.webchat_sessions s
     where s.conversation_id = cc.id
     order by s.last_seen_at desc nulls last
     limit 1
  ) ws on true
  where (p_conversation_id is null and cc.channel = 'webchat')
     or cc.id = p_conversation_id
  order by coalesce(cc.unread_count_staff, 0) > 0 desc, cc.last_message_at desc nulls last
  limit greatest(1, least(coalesce(p_limit, 50), 200));
end;
$$;

revoke execute on function public.chat_list_webchat_threads(integer, uuid) from public, anon;
grant execute on function public.chat_list_webchat_threads(integer, uuid) to authenticated;

-- 4. Portal event pushes (orders, quotes, inbound SMS) ---------------------
-- Messages are already dispatched by trg_webchat_on_message (017).
create or replace function public.staff_push_dispatch(p_kind text, p_id uuid)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if not exists (select 1 from public.staff_push_subscriptions) then
    return;
  end if;
  perform net.http_post(
    url     := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/send-web-push',
    headers := jsonb_build_object(
                 'Content-Type',  'application/json',
                 'x-cron-secret', public.get_cron_shared_secret()
               ),
    body    := jsonb_build_object('kind', p_kind, 'id', p_id)
  );
exception when others then
  raise warning 'staff_push_dispatch(%): %', p_kind, sqlerrm;
end;
$$;

revoke execute on function public.staff_push_dispatch(text, uuid) from public, anon, authenticated;

create or replace function public.staff_push_on_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  begin
    if TG_TABLE_SCHEMA = 'comms' and TG_TABLE_NAME = 'sms_messages' then
      if NEW.direction = 'inbound' then
        perform public.staff_push_dispatch('sms', NEW.id);
      end if;
    elsif TG_TABLE_NAME = 'orders' then
      perform public.staff_push_dispatch('order', NEW.id);
    elsif TG_TABLE_NAME = 'quotes' then
      perform public.staff_push_dispatch('quote', NEW.id);
    end if;
  exception when others then
    raise warning 'staff_push_on_insert(%.%): %', TG_TABLE_SCHEMA, TG_TABLE_NAME, sqlerrm;
  end;
  return NEW;
end;
$$;

revoke execute on function public.staff_push_on_insert() from public, anon, authenticated;

drop trigger if exists trg_staff_push_order on public.orders;
create trigger trg_staff_push_order
  after insert on public.orders
  for each row execute function public.staff_push_on_insert();

drop trigger if exists trg_staff_push_quote on public.quotes;
create trigger trg_staff_push_quote
  after insert on public.quotes
  for each row execute function public.staff_push_on_insert();

drop trigger if exists trg_staff_push_sms on comms.sms_messages;
create trigger trg_staff_push_sms
  after insert on comms.sms_messages
  for each row execute function public.staff_push_on_insert();
