-- ============================================================================
-- 017_webchat.sql — cethos.com live chat → portal inbox, + staff Web Push
--
-- Shared Supabase project (lmzoyezvsjgsxveoakdr). Website chats reuse the
-- existing customer_conversations / conversation_messages model the portal
-- already renders at /admin/messages; this migration only adds:
--
--   1. 'webchat' as an allowed conversation_messages.source
--   2. customer_conversations.channel ('portal' | 'webchat') — the channel of
--      the customer's most recent message, maintained by trigger
--   3. webchat_sessions — anonymous widget sessions (opaque bearer token,
--      per-session random Broadcast topic, email-OTP gate for existing
--      customers). Service-role only.
--   4. staff_push_subscriptions — Web Push endpoints for the installable
--      portal PWA. Service-role only (written via save-push-subscription).
--   5. AFTER INSERT trigger on conversation_messages that
--        a) keeps customer_conversations.channel current,
--        b) Broadcasts the message to every live, verified widget session of
--           that conversation (topic 'webchat:<session.topic>'),
--        c) fires send-web-push via pg_net for inbound customer messages.
--      Every step is wrapped so a failure can never block a message insert.
--
-- Security note: the Broadcast topic is a per-session random secret, NOT the
-- conversation id, so knowing a conversation UUID does not let anyone listen.
-- Existing-customer emails must pass an email code before a session is
-- verified (see supabase/functions/webchat).
-- ============================================================================

-- 1. Allow 'webchat' as a message source ------------------------------------
alter table public.conversation_messages
  drop constraint if exists conversation_messages_source_check;
alter table public.conversation_messages
  add constraint conversation_messages_source_check
  check ((source)::text = any (array['app', 'email', 'webchat']::text[]));

-- 2. Conversation channel ----------------------------------------------------
alter table public.customer_conversations
  add column if not exists channel text not null default 'portal';
alter table public.customer_conversations
  drop constraint if exists customer_conversations_channel_check;
alter table public.customer_conversations
  add constraint customer_conversations_channel_check
  check (channel in ('portal', 'webchat'));

comment on column public.customer_conversations.channel is
  'Channel of the customer''s most recent message: portal (customer portal / email) or webchat (cethos.com widget). Maintained by trg_webchat_on_message.';

-- 3. Widget sessions ---------------------------------------------------------
create table if not exists public.webchat_sessions (
  id               uuid primary key default gen_random_uuid(),
  customer_id      uuid not null references public.customers(id) on delete cascade,
  -- null until verified (existing customers verify by email code first)
  conversation_id  uuid references public.customer_conversations(id) on delete cascade,
  token_hash       text not null unique,          -- sha256(hex) of the bearer token
  topic            text not null unique,          -- random Broadcast topic suffix
  verified_at      timestamptz,
  is_new_customer  boolean not null default false,
  otp_hash         text,
  otp_expires_at   timestamptz,
  otp_attempts     integer not null default 0,
  otp_sent_at      timestamptz,
  first_message_at timestamptz,
  visitor_name     text,
  visitor_phone    text,
  page_url         text,
  locale           text,
  user_agent       text,
  created_at       timestamptz not null default now(),
  last_seen_at     timestamptz not null default now(),
  expires_at       timestamptz not null default (now() + interval '30 days')
);

create index if not exists webchat_sessions_conversation_live_idx
  on public.webchat_sessions (conversation_id)
  where verified_at is not null;
create index if not exists webchat_sessions_customer_created_idx
  on public.webchat_sessions (customer_id, created_at desc);

alter table public.webchat_sessions enable row level security;
-- No policies: anon/authenticated get nothing. Edge functions use service role.

comment on table public.webchat_sessions is
  'Anonymous cethos.com chat-widget sessions. Bearer token stored as sha256; topic is the per-session Broadcast secret. Service-role only — access via the webchat edge function.';

-- 4. Staff Web Push subscriptions -------------------------------------------
create table if not exists public.staff_push_subscriptions (
  id           uuid primary key default gen_random_uuid(),
  staff_id     uuid not null references public.staff_users(id) on delete cascade,
  endpoint     text not null unique,
  p256dh       text not null,
  auth         text not null,
  user_agent   text,
  created_at   timestamptz not null default now(),
  last_used_at timestamptz,
  last_error   text
);

create index if not exists staff_push_subscriptions_staff_idx
  on public.staff_push_subscriptions (staff_id);

alter table public.staff_push_subscriptions enable row level security;
-- No policies: written by save-push-subscription, read by send-web-push.

comment on table public.staff_push_subscriptions is
  'Web Push endpoints for the installable portal PWA, one row per staff device/browser. Service-role only.';

-- 5. Trigger: channel + Broadcast + push ------------------------------------
create or replace function public.webchat_on_message()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_sender_name text;
  v_payload     jsonb;
  v_session     record;
begin
  -- a) channel of the customer's latest message
  if NEW.sender_type = 'customer' then
    begin
      update public.customer_conversations
         set channel = case when NEW.source = 'webchat' then 'webchat' else 'portal' end
       where id = NEW.conversation_id
         and channel is distinct from
             case when NEW.source = 'webchat' then 'webchat' else 'portal' end;
    exception when others then
      raise warning 'webchat_on_message: channel update failed: %', sqlerrm;
    end;
  end if;

  -- b) Broadcast to live widget sessions of this conversation
  begin
    if exists (
      select 1 from public.webchat_sessions
       where conversation_id = NEW.conversation_id
         and verified_at is not null
         and expires_at > now()
    ) then
      if NEW.sender_type = 'staff' and NEW.sender_staff_id is not null then
        select split_part(coalesce(full_name, ''), ' ', 1)
          into v_sender_name
          from public.staff_users where id = NEW.sender_staff_id;
      end if;

      v_payload := jsonb_build_object(
        'id',           NEW.id,
        'sender_type',  NEW.sender_type,
        'sender_name',  nullif(v_sender_name, ''),
        'message_type', NEW.message_type,
        'message_text', NEW.message_text,
        'created_at',   NEW.created_at
      );

      for v_session in
        select topic from public.webchat_sessions
         where conversation_id = NEW.conversation_id
           and verified_at is not null
           and expires_at > now()
      loop
        perform realtime.send(v_payload, 'message', 'webchat:' || v_session.topic, false);
      end loop;
    end if;
  exception when others then
    raise warning 'webchat_on_message: broadcast failed: %', sqlerrm;
  end;

  -- c) Web Push to staff for inbound customer messages
  if NEW.sender_type = 'customer' then
    begin
      if exists (select 1 from public.staff_push_subscriptions) then
        perform net.http_post(
          url     := 'https://lmzoyezvsjgsxveoakdr.supabase.co/functions/v1/send-web-push',
          headers := jsonb_build_object(
                       'Content-Type',  'application/json',
                       'x-cron-secret', public.get_cron_shared_secret()
                     ),
          body    := jsonb_build_object('message_id', NEW.id)
        );
      end if;
    exception when others then
      raise warning 'webchat_on_message: push dispatch failed: %', sqlerrm;
    end;
  end if;

  return NEW;
end;
$$;

-- 6. VAPID keypair reader ----------------------------------------------------
-- The Web Push VAPID keypair (JWK JSON) is stored in Supabase Vault as
-- 'vapid_keys_json' because the project is at the 100 function-secret limit.
-- Same pattern as get_cron_shared_secret(): service_role EXECUTE only.
create or replace function public.get_vapid_keys_json()
returns text
language sql
security definer
set search_path to 'public'
as $function$
  select decrypted_secret from vault.decrypted_secrets where name = 'vapid_keys_json';
$function$;

revoke execute on function public.get_vapid_keys_json() from public, anon, authenticated;
grant execute on function public.get_vapid_keys_json() to service_role;

-- Trigger-only function: keep it off /rest/v1/rpc (security advisor). Triggers
-- fire regardless of EXECUTE privilege.
revoke execute on function public.webchat_on_message() from public, anon, authenticated;

drop trigger if exists trg_webchat_on_message on public.conversation_messages;
create trigger trg_webchat_on_message
  after insert on public.conversation_messages
  for each row execute function public.webchat_on_message();
