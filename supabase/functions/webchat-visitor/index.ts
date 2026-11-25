// ============================================================================
// webchat-visitor v1.0 — backend for the Tawk.to-style cethos.com chat bubble
// (replaces `webchat`, which served the v1 form-first widget).
//
// Model (migration 019): visitor → chats → messages. A visitor is created on
// first page load and identified by an opaque bearer token kept in the
// browser (stored here as sha256). Visitors chat first and may share
// name/email/phone after their first message (required before they can send
// more — details_required); a matching email links the visitor to a customers row
// for staff context only — the visitor only ever sees their own chats, so no
// email code is needed.
//
// POST JSON { action, token, ... } (upload: multipart/form-data):
//   hello      { url, title, referrer, locale, geo{country,region,city} }
//                → { token?, topic, visitor, team, settings, chat, messages }
//   ping       { url?, title?, chat_id? } → { team, chat_id, unread }
//   send       { body }                    → { chat_id, message }
//   upload     form: token, file, body?    → { chat_id, message }
//   history    { chat_id, since?, mark_read? } → { chat, messages }
//   identify   { name, email, phone }      → { visitor }   (all required)
//   end        { chat_id }                 → { ok }
//   rate       { chat_id, rating, comment? } → { ok }
//   transcript { chat_id, email? }         → { ok }
//   offline    { name, email, phone, message } → { chat_id }
//
// Staff replies reach the bubble via Broadcast on `webchat:<topic>` (trigger
// webchat_v2_on_message). Typing indicators are client-to-client Broadcasts
// on the same topic.
// ============================================================================

import {
  admin,
  clean,
  CORS,
  customerIdForEmail,
  decorateMessages,
  EMAIL_RE,
  HttpError,
  json,
  MAX_MESSAGE_LEN,
  MESSAGE_COLUMNS,
  onlineAgents,
  PHONE_RE,
  PORTAL_URL,
  randomHex,
  randomToken,
  sendBrevo,
  sha256,
  storeAttachment,
} from "../_shared/webchat-common.ts";
import {
  ctaButton,
  detailsTable,
  emailShell,
  esc,
  lead,
  messageBlock,
  REPLY,
  statusBadge,
  title,
  type TemplateMeta,
} from "../_shared/email-shell.ts";

const MAX_MESSAGES_PER_MINUTE = 15;
const MAX_OFFLINE_PER_HOUR = 3;
const NEW_VISIT_AFTER_MS = 30 * 60_000;
const HISTORY_LIMIT = 100;

const STAFF_TEMPLATE: TemplateMeta = { name: "Admin — Website Chat (v2)", version: "2.0", updatedAt: "2026-11-24" };
const TRANSCRIPT_TEMPLATE: TemplateMeta = { name: "Customer — Website Chat Transcript", version: "1.0", updatedAt: "2026-11-24" };

interface Visitor {
  id: string;
  topic: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  customer_id: string | null;
  current_url: string | null;
  last_seen_at: string;
  visit_started_at: string;
  visits: number;
  banned_at: string | null;
  country: string | null;
  locale: string | null;
}

const VISITOR_COLUMNS =
  "id, topic, name, email, phone, customer_id, current_url, last_seen_at, visit_started_at, visits, banned_at, country, locale";

async function findVisitor(token: unknown): Promise<Visitor | null> {
  if (typeof token !== "string" || token.length < 20 || token.length > 200) return null;
  const { data, error } = await admin()
    .from("webchat_visitors")
    .select(VISITOR_COLUMNS)
    .eq("token_hash", await sha256(token))
    .maybeSingle();
  if (error) throw error;
  return (data as Visitor) ?? null;
}

async function requireVisitor(token: unknown): Promise<Visitor> {
  const v = await findVisitor(token);
  if (!v) throw new HttpError(401, "invalid_session");
  if (v.banned_at) throw new HttpError(403, "banned");
  return v;
}

function cleanUrl(u: unknown): string | null {
  const s = clean(u, 500);
  return /^https?:\/\//i.test(s) ? s : null;
}

/** Heartbeat + page tracking shared by hello and ping. */
async function touch(v: Visitor, url: string | null, pageTitle: string): Promise<void> {
  const now = Date.now();
  const newVisit = now - new Date(v.last_seen_at).getTime() > NEW_VISIT_AFTER_MS;
  const patch: Record<string, unknown> = { last_seen_at: new Date(now).toISOString() };
  if (newVisit) {
    patch.visit_started_at = patch.last_seen_at;
    patch.visits = v.visits + 1;
  }
  const pageChanged = !!url && (url !== v.current_url || newVisit);
  if (pageChanged) {
    patch.current_url = url;
    patch.current_title = pageTitle || null;
  }
  await admin().from("webchat_visitors").update(patch).eq("id", v.id);
  if (pageChanged) {
    await admin().from("webchat_page_views").insert({ visitor_id: v.id, url, title: pageTitle || null });
  }
}

interface ChatRow {
  id: string;
  status: "open" | "offline" | "closed";
  assigned_staff_id: string | null;
  rating: string | null;
  closed_at: string | null;
  unread_visitor: number;
  created_at: string;
}

const CHAT_COLUMNS = "id, status, assigned_staff_id, rating, closed_at, unread_visitor, created_at";

/** The chat the bubble should show: an open one, or one closed in the last 30 min. */
async function currentChat(visitorId: string): Promise<ChatRow | null> {
  const { data } = await admin()
    .from("webchat_chats")
    .select(CHAT_COLUMNS)
    .eq("visitor_id", visitorId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!data) return null;
  const c = data as ChatRow;
  if (c.status !== "closed") return c;
  return c.closed_at && Date.now() - new Date(c.closed_at).getTime() < 30 * 60_000 ? c : null;
}

async function chatForVisitor(visitorId: string, chatId: unknown): Promise<ChatRow> {
  if (typeof chatId !== "string") throw new HttpError(400, "chat_required");
  const { data } = await admin()
    .from("webchat_chats")
    .select(CHAT_COLUMNS)
    .eq("id", chatId)
    .eq("visitor_id", visitorId)
    .maybeSingle();
  if (!data) throw new HttpError(404, "chat_not_found");
  return data as ChatRow;
}

async function agentInfo(staffId: string | null) {
  if (!staffId) return null;
  const { data } = await admin().from("staff_users").select("full_name, avatar_url").eq("id", staffId).maybeSingle();
  if (!data) return null;
  return { name: (data.full_name || "").trim().split(/\s+/)[0] || null, avatar: data.avatar_url ?? null };
}

async function chatOut(c: ChatRow | null) {
  if (!c) return null;
  return { id: c.id, status: c.status, rating: c.rating, agent: await agentInfo(c.assigned_staff_id) };
}

async function loadMessages(chatId: string, since?: string) {
  const base = admin().from("webchat_messages").select(MESSAGE_COLUMNS).eq("chat_id", chatId);
  const { data, error } = since
    ? await base.gt("created_at", since).order("created_at", { ascending: true }).limit(HISTORY_LIMIT)
    : await base.order("created_at", { ascending: false }).limit(HISTORY_LIMIT);
  if (error) throw error;
  const rows = since ? data ?? [] : (data ?? []).reverse();
  return decorateMessages(rows as any);
}

async function team() {
  const agents = await onlineAgents();
  return { online: agents.length > 0, agents: agents.slice(0, 3) };
}

/** Open chat for the visitor, or a new one (status open). */
async function openOrCreateChat(v: Visitor): Promise<{ id: string; created: boolean }> {
  const { data: existing } = await admin()
    .from("webchat_chats")
    .select("id")
    .eq("visitor_id", v.id)
    .neq("status", "closed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (existing) return { id: existing.id, created: false };
  const { data, error } = await admin()
    .from("webchat_chats")
    .insert({ visitor_id: v.id, customer_id: v.customer_id, started_url: v.current_url, status: "open" })
    .select("id")
    .single();
  if (error) throw error;
  return { id: data.id, created: true };
}

async function checkRate(v: Visitor): Promise<void> {
  const { data: chats } = await admin().from("webchat_chats").select("id").eq("visitor_id", v.id)
    .order("created_at", { ascending: false }).limit(5);
  const ids = (chats ?? []).map((c) => c.id);
  if (!ids.length) return;
  const { count } = await admin()
    .from("webchat_messages")
    .select("id", { count: "exact", head: true })
    .in("chat_id", ids)
    .eq("sender_type", "visitor")
    .gt("created_at", new Date(Date.now() - 60_000).toISOString());
  if ((count ?? 0) >= MAX_MESSAGES_PER_MINUTE) throw new HttpError(429, "slow_down");
}

/** Valid phone: allowed characters and at least 7 digits. */
function validPhone(p: string): boolean {
  return PHONE_RE.test(p) && p.replace(/\D/g, "").length >= 7;
}

/**
 * Name, email and phone are required after the visitor's first message: the
 * first question goes through, anything more needs the details (2026-11-25).
 */
async function requireDetailsAfterFirst(v: Visitor): Promise<void> {
  if (v.name && v.email && v.phone) return;
  const { data: chats } = await admin().from("webchat_chats").select("id").eq("visitor_id", v.id)
    .neq("status", "closed");
  const ids = (chats ?? []).map((c) => c.id);
  if (!ids.length) return;
  const { count } = await admin()
    .from("webchat_messages")
    .select("id", { count: "exact", head: true })
    .in("chat_id", ids)
    .eq("sender_type", "visitor");
  if ((count ?? 0) > 0) throw new HttpError(403, "details_required");
}

function visitorLabel(v: Visitor): string {
  return v.name || v.email || `Visitor #${v.id.replace(/-/g, "").slice(0, 4).toUpperCase()}`;
}

/** Email the team when a chat starts and nobody is online, or a message is left. */
async function notifyTeam(v: Visitor, chatId: string, text: string, kind: "new_chat" | "offline") {
  const { data: settings } = await admin().from("webchat_settings").select("offline_email").eq("id", 1).maybeSingle();
  const to = settings?.offline_email || "support@cethos.com";
  const name = visitorLabel(v);
  const html = emailShell(
    [
      statusBadge("info", kind === "offline" ? "Message left · website chat" : "New website chat · nobody online"),
      title(kind === "offline" ? `${esc(name)} left a message on cethos.com` : `${esc(name)} started a chat on cethos.com`),
      lead(
        kind === "offline"
          ? "No agent was online. Reply from Cethos Chat — the reply is emailed to the visitor."
          : "No agent was online when this chat started. Open Cethos Chat to answer — the visitor gets your reply live, or by email if they left an address.",
      ),
      detailsTable([
        ["Name", esc(v.name || "—")],
        ["Email", esc(v.email || "—")],
        ["Phone", esc(v.phone || "—")],
        ["Page", esc(v.current_url || "—")],
        ["Location", esc(v.country || "—")],
      ]),
      messageBlock(esc(text).replace(/\n/g, "<br />")),
      ctaButton({ label: "Open in Cethos Chat", url: `${PORTAL_URL}/chat/c/${chatId}` }),
    ].join(""),
    { replyTo: REPLY.ops, template: STAFF_TEMPLATE, preheader: `Website chat from ${esc(name)}` },
  );
  await sendBrevo({
    sender: { name: "Cethos Website Chat", email: "donotreply@cethos.com" },
    to: [{ email: to, name: "Cethos Support" }],
    ...(v.email ? { replyTo: { email: v.email, name } } : {}),
    subject: kind === "offline" ? `Website chat message: ${name}` : `Website chat (nobody online): ${name}`,
    htmlContent: html,
    tags: ["webchat-staff-notify"],
  });
}

// ── actions ─────────────────────────────────────────────────────────────────

async function actionHello(body: Record<string, unknown>, req: Request) {
  let v = await findVisitor(body.token);
  let newToken: string | undefined;
  const url = cleanUrl(body.url);
  const pageTitle = clean(body.title, 200);
  const geo = (body.geo && typeof body.geo === "object" ? body.geo : {}) as Record<string, unknown>;

  if (!v) {
    newToken = randomToken(32);
    const { data, error } = await admin()
      .from("webchat_visitors")
      .insert({
        token_hash: await sha256(newToken),
        topic: randomHex(16),
        current_url: url,
        current_title: pageTitle || null,
        referrer: cleanUrl(body.referrer),
        locale: clean(body.locale, 10) || null,
        user_agent: (req.headers.get("user-agent") || "").slice(0, 300) || null,
        country: clean(geo.country, 80) || null,
        region: clean(geo.region, 80) || null,
        city: clean(geo.city, 80) || null,
      })
      .select(VISITOR_COLUMNS)
      .single();
    if (error) throw error;
    v = data as Visitor;
    if (url) await admin().from("webchat_page_views").insert({ visitor_id: v.id, url, title: pageTitle || null });
  } else {
    await touch(v, url, pageTitle);
    const patch: Record<string, unknown> = {};
    if (clean(geo.country, 80)) {
      patch.country = clean(geo.country, 80);
      patch.region = clean(geo.region, 80) || null;
      patch.city = clean(geo.city, 80) || null;
    }
    if (clean(body.locale, 10)) patch.locale = clean(body.locale, 10);
    const ua = (req.headers.get("user-agent") || "").slice(0, 300);
    if (ua) patch.user_agent = ua;
    const ref = cleanUrl(body.referrer);
    if (ref && !ref.includes("cethos.com")) patch.referrer = ref;
    if (Object.keys(patch).length) await admin().from("webchat_visitors").update(patch).eq("id", v.id);
  }

  if (v.banned_at) return { banned: true };

  const { data: settings } = await admin()
    .from("webchat_settings")
    .select("greeting_enabled, greeting_delay_s, greeting_en, greeting_fr")
    .eq("id", 1)
    .maybeSingle();
  const fr = (clean(body.locale, 10) || v.locale || "").startsWith("fr");
  const chat = await currentChat(v.id);

  return {
    ...(newToken ? { token: newToken } : {}),
    topic: v.topic,
    visitor: { name: v.name, email: v.email, phone: v.phone },
    team: await team(),
    settings: {
      greeting_enabled: settings?.greeting_enabled ?? false,
      greeting_delay_s: settings?.greeting_delay_s ?? 20,
      greeting: (fr ? settings?.greeting_fr : settings?.greeting_en) ?? "",
    },
    chat: await chatOut(chat),
    messages: chat ? await loadMessages(chat.id) : [],
  };
}

async function actionPing(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  await touch(v, cleanUrl(body.url), clean(body.title, 200));
  const chat = await currentChat(v.id);
  return {
    team: await team(),
    chat_id: chat?.id ?? null,
    chat_status: chat?.status ?? null,
    unread: chat?.unread_visitor ?? 0,
  };
}

async function actionSend(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const text = clean(body.body, MAX_MESSAGE_LEN);
  if (!text) throw new HttpError(400, "empty_message");
  await requireDetailsAfterFirst(v);
  await checkRate(v);
  const chat = await openOrCreateChat(v);
  const { data, error } = await admin()
    .from("webchat_messages")
    .insert({ chat_id: chat.id, sender_type: "visitor", body: text })
    .select(MESSAGE_COLUMNS)
    .single();
  if (error) throw error;
  await admin().from("webchat_visitors").update({ last_seen_at: new Date().toISOString() }).eq("id", v.id);
  if (chat.created && !(await team()).online) {
    await notifyTeam(v, chat.id, text, "new_chat").catch((e) => console.error("notifyTeam", e));
  }
  const [message] = await decorateMessages([data as any]);
  return { chat_id: chat.id, message };
}

async function actionUpload(req: Request) {
  const form = await req.formData();
  const v = await requireVisitor(form.get("token"));
  const file = form.get("file");
  if (!(file instanceof File)) throw new HttpError(400, "file_required");
  await requireDetailsAfterFirst(v);
  await checkRate(v);
  const chat = await openOrCreateChat(v);
  const att = await storeAttachment(chat.id, file);
  const { data, error } = await admin()
    .from("webchat_messages")
    .insert({
      chat_id: chat.id,
      sender_type: "visitor",
      body: clean(form.get("body"), MAX_MESSAGE_LEN),
      attachments: [att],
    })
    .select(MESSAGE_COLUMNS)
    .single();
  if (error) throw error;
  if (chat.created && !(await team()).online) {
    await notifyTeam(v, chat.id, `📎 ${att.name}`, "new_chat").catch((e) => console.error("notifyTeam", e));
  }
  const [message] = await decorateMessages([data as any]);
  return { chat_id: chat.id, message };
}

async function actionHistory(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const chat = await chatForVisitor(v.id, body.chat_id);
  const since = typeof body.since === "string" ? body.since : undefined;
  const messages = await loadMessages(chat.id, since);
  if (body.mark_read && chat.unread_visitor > 0) {
    await admin().from("webchat_chats").update({ unread_visitor: 0 }).eq("id", chat.id);
    await admin().from("webchat_messages").update({ read_at: new Date().toISOString() })
      .eq("chat_id", chat.id).eq("sender_type", "staff").is("read_at", null);
  }
  return { chat: await chatOut(chat), messages };
}

async function actionIdentify(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40);
  // All three are required (name, email, phone).
  if (name.length < 2) throw new HttpError(400, "invalid_name");
  if (!EMAIL_RE.test(email)) throw new HttpError(400, "invalid_email");
  if (!validPhone(phone)) throw new HttpError(400, "invalid_phone");

  const patch: Record<string, unknown> = {};
  if (name) patch.name = name;
  if (phone) patch.phone = phone;
  if (email) {
    patch.email = email;
    patch.customer_id = await customerIdForEmail(email);
  }
  await admin().from("webchat_visitors").update(patch).eq("id", v.id);
  if (email) {
    await admin().from("webchat_chats").update({ customer_id: patch.customer_id ?? null })
      .eq("visitor_id", v.id).neq("status", "closed");
  }
  return { visitor: { name: name || v.name, email: email || v.email, phone: phone || v.phone } };
}

async function actionEnd(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const chat = await chatForVisitor(v.id, body.chat_id);
  if (chat.status !== "closed") {
    await admin().from("webchat_chats")
      .update({ status: "closed", closed_at: new Date().toISOString() })
      .eq("id", chat.id);
    await admin().from("webchat_messages").insert({ chat_id: chat.id, sender_type: "system", body: "Visitor ended the chat" });
  }
  return { ok: true };
}

async function actionRate(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const chat = await chatForVisitor(v.id, body.chat_id);
  const rating = body.rating === "up" || body.rating === "down" ? body.rating : null;
  if (!rating) throw new HttpError(400, "invalid_rating");
  await admin().from("webchat_chats")
    .update({ rating, rating_comment: clean(body.comment, 1000) || null })
    .eq("id", chat.id);
  return { ok: true };
}

async function actionTranscript(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const chat = await chatForVisitor(v.id, body.chat_id);
  let email = clean(body.email, 200).toLowerCase() || v.email || "";
  if (!EMAIL_RE.test(email)) throw new HttpError(400, "invalid_email");
  if (email !== v.email) {
    const customerId = await customerIdForEmail(email);
    await admin().from("webchat_visitors").update({ email, customer_id: customerId }).eq("id", v.id);
  }

  // One transcript per chat every 2 minutes.
  const { count } = await admin()
    .from("webchat_messages")
    .select("id", { count: "exact", head: true })
    .eq("chat_id", chat.id)
    .eq("sender_type", "system")
    .like("body", "Transcript emailed%")
    .gt("created_at", new Date(Date.now() - 2 * 60_000).toISOString());
  if ((count ?? 0) > 0) throw new HttpError(429, "slow_down");

  const { data: rows } = await admin().from("webchat_messages").select(MESSAGE_COLUMNS)
    .eq("chat_id", chat.id).neq("sender_type", "system").order("created_at", { ascending: true }).limit(500);
  const msgs = await decorateMessages((rows ?? []) as any);
  const fr = (v.locale || "").startsWith("fr");
  const lines = msgs.map((m) => {
    const who = m.sender_type === "visitor" ? (fr ? "Vous" : "You") : m.sender_name || "Cethos";
    const when = new Date(m.created_at).toLocaleString(fr ? "fr-CA" : "en-CA", { timeZone: "America/Edmonton" });
    const files = m.attachments.map((a) => `📎 ${esc(a.name)}`).join("<br />");
    return `<p style="margin:0 0 12px"><strong>${esc(who)}</strong> <span style="color:#6b7280;font-size:12px">${esc(when)}</span><br />${esc(m.body).replace(/\n/g, "<br />")}${files ? "<br />" + files : ""}</p>`;
  });
  const html = emailShell(
    [
      title(fr ? "Transcription de votre clavardage" : "Your chat transcript"),
      lead(fr ? "Voici votre conversation avec l’équipe Cethos sur cethos.com." : "Here is your conversation with the Cethos team on cethos.com."),
      messageBlock(lines.join("") || "—"),
    ].join(""),
    { replyTo: REPLY.customer, template: TRANSCRIPT_TEMPLATE, preheader: fr ? "Votre clavardage Cethos" : "Your Cethos chat" },
  );
  await sendBrevo({
    sender: { name: "Cethos Translation Services", email: "donotreply@cethos.com" },
    to: [{ email, name: v.name || email }],
    replyTo: { email: REPLY.customer },
    subject: fr ? "Votre clavardage avec Cethos" : "Your chat with Cethos",
    htmlContent: html,
    tags: ["webchat-transcript"],
  });
  await admin().from("webchat_messages").insert({ chat_id: chat.id, sender_type: "system", body: `Transcript emailed to ${email}` });
  return { ok: true };
}

async function actionOffline(body: Record<string, unknown>) {
  const v = await requireVisitor(body.token);
  const name = clean(body.name, 120);
  const email = clean(body.email, 200).toLowerCase();
  const phone = clean(body.phone, 40);
  const text = clean(body.message, MAX_MESSAGE_LEN);
  if (name.length < 2) throw new HttpError(400, "invalid_name");
  if (!EMAIL_RE.test(email)) throw new HttpError(400, "invalid_email");
  if (!validPhone(phone)) throw new HttpError(400, "invalid_phone");
  if (!text) throw new HttpError(400, "empty_message");

  const { count } = await admin()
    .from("webchat_chats")
    .select("id", { count: "exact", head: true })
    .eq("visitor_id", v.id)
    .eq("status", "offline")
    .gt("created_at", new Date(Date.now() - 3600_000).toISOString());
  if ((count ?? 0) >= MAX_OFFLINE_PER_HOUR) throw new HttpError(429, "too_many");

  const customerId = await customerIdForEmail(email);
  await admin().from("webchat_visitors")
    .update({ name, email, phone: phone || v.phone, customer_id: customerId })
    .eq("id", v.id);
  const { data: chat, error } = await admin()
    .from("webchat_chats")
    .insert({ visitor_id: v.id, customer_id: customerId, started_url: v.current_url, status: "offline" })
    .select("id")
    .single();
  if (error) throw error;
  await admin().from("webchat_messages").insert({ chat_id: chat.id, sender_type: "visitor", body: text });
  await notifyTeam({ ...v, name, email, phone: phone || v.phone }, chat.id, text, "offline")
    .catch((e) => console.error("notifyTeam", e));
  return { chat_id: chat.id };
}

// ── entry ───────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    if ((req.headers.get("content-type") || "").includes("multipart/form-data")) {
      return json(await actionUpload(req));
    }
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "invalid_json" }, 400);
    }
    switch (body.action) {
      case "hello":
        return json(await actionHello(body, req));
      case "ping":
        return json(await actionPing(body));
      case "send":
        return json(await actionSend(body));
      case "history":
        return json(await actionHistory(body));
      case "identify":
        return json(await actionIdentify(body));
      case "end":
        return json(await actionEnd(body));
      case "rate":
        return json(await actionRate(body));
      case "transcript":
        return json(await actionTranscript(body));
      case "offline":
        return json(await actionOffline(body));
      default:
        return json({ error: "unknown_action" }, 400);
    }
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.code }, e.status);
    console.error("webchat-visitor error", e);
    return json({ error: "server_error" }, 500);
  }
});
