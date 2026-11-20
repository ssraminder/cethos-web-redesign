// ============================================================================
// webchat v1.0 — backend for the cethos.com live-chat widget
//
// Website chats land in the EXISTING portal inbox: a visitor becomes (or is
// matched to) a `customers` row, chats in that customer's single
// `customer_conversations` row, and messages are `conversation_messages`
// with source='webchat'. Staff reply from /admin/messages with the existing
// send-staff-message; trg_webchat_on_message (migration 017) Broadcasts the
// reply to the widget on topic `webchat:<session.topic>`.
//
// POST JSON { action, ... }:
//   start   { name, email, phone, page_url?, locale?, website? }
//             → { status: 'active', token, topic, messages }   (new email)
//             → { status: 'verify', token, email_hint }        (existing customer)
//   verify  { token, code }       → { status: 'active', topic, messages }
//   resend  { token }             → { status: 'verify' }
//   send    { token, message }    → { message }
//   history { token, since? }     → { messages }
//
// Auth: the browser calls with the publishable/anon key (deploy with
// --no-verify-jwt). Everything after `start` is gated by an opaque bearer
// token (stored as sha256). An email that already belongs to a customer must
// pass a 6-digit email code before the session is verified — otherwise anyone
// could type a customer's email and read/impersonate their conversation.
// ============================================================================

import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";
import {
  codeBlock,
  ctaButton,
  detailsTable,
  emailShell,
  esc,
  hint,
  lead,
  messageBlock,
  REPLY,
  statusBadge,
  title,
  type TemplateMeta,
} from "../_shared/email-shell.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") ?? "";
const PORTAL_URL = Deno.env.get("FRONTEND_URL") || "https://portal.cethos.com";
const STAFF_NOTIFY_EMAIL = Deno.env.get("WEBCHAT_NOTIFY_EMAIL") || "support@cethos.com";

const OTP_TTL_MIN = 10;
const OTP_MAX_ATTEMPTS = 5;
const OTP_RESEND_COOLDOWN_S = 60;
const MAX_STARTS_PER_EMAIL_PER_HOUR = 5;
const MAX_MESSAGES_PER_MINUTE = 15;
const MAX_MESSAGE_LEN = 2000;
const HISTORY_LIMIT = 50;

const OTP_TEMPLATE: TemplateMeta = {
  name: "Customer — Website Chat Verification Code",
  version: "1.0",
  updatedAt: "2026-11-20",
};
const STAFF_TEMPLATE: TemplateMeta = {
  name: "Admin — Website Chat Started",
  version: "1.0",
  updatedAt: "2026-11-20",
};

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

class HttpError extends Error {
  constructor(public status: number, public code: string, message?: string) {
    super(message ?? code);
  }
}

let _admin: SupabaseClient | null = null;
function admin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _admin;
}

// ── helpers ─────────────────────────────────────────────────────────────────

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function randomToken(bytes: number): string {
  const b = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function randomHex(bytes: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

function randomOtp(): string {
  // Uniform 6-digit code via rejection sampling.
  const buf = new Uint32Array(1);
  while (true) {
    crypto.getRandomValues(buf);
    if (buf[0] < 4_294_000_000) return String(buf[0] % 1_000_000).padStart(6, "0");
  }
}

async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d)).map((x) => x.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// No `*`: PostgREST treats it as a LIKE wildcard and it can't be escaped.
const EMAIL_RE = /^[^\s@*]+@[^\s@*]+\.[^\s@*]{2,}$/;
const PHONE_RE = /^[+()\-.\s\d]{7,25}$/;

function clean(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

// Escape LIKE wildcards so an email containing `_` can't match another row.
function likeExact(s: string): string {
  return s.replace(/[\\%_]/g, (m) => "\\" + m);
}

function emailHint(email: string): string {
  const [user, domain] = email.split("@");
  const u = user.length <= 2 ? user[0] + "*" : user[0] + "*".repeat(Math.min(user.length - 2, 6)) + user.slice(-1);
  return `${u}@${domain}`;
}

async function sendBrevo(payload: Record<string, unknown>): Promise<void> {
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not set — email skipped");
    return;
  }
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
    body: JSON.stringify(payload),
  });
  if (!r.ok) console.error("Brevo error", r.status, await r.text());
}

interface SessionRow {
  id: string;
  customer_id: string;
  conversation_id: string | null;
  topic: string;
  verified_at: string | null;
  is_new_customer: boolean;
  otp_hash: string | null;
  otp_expires_at: string | null;
  otp_attempts: number;
  otp_sent_at: string | null;
  first_message_at: string | null;
  visitor_name: string | null;
  visitor_phone: string | null;
  page_url: string | null;
  expires_at: string;
}

async function loadSession(token: unknown): Promise<SessionRow> {
  if (typeof token !== "string" || token.length < 20 || token.length > 200) {
    throw new HttpError(401, "invalid_session");
  }
  const { data, error } = await admin()
    .from("webchat_sessions")
    .select("*")
    .eq("token_hash", await sha256(token))
    .maybeSingle();
  if (error) throw error;
  if (!data) throw new HttpError(401, "invalid_session");
  if (new Date(data.expires_at).getTime() < Date.now()) throw new HttpError(401, "session_expired");
  return data as SessionRow;
}

function requireVerified(s: SessionRow): asserts s is SessionRow & { conversation_id: string } {
  if (!s.verified_at || !s.conversation_id) throw new HttpError(403, "not_verified");
}

interface WidgetMessage {
  id: string;
  sender_type: "customer" | "staff" | "system";
  sender_name: string | null;
  message_type: string | null;
  message_text: string | null;
  created_at: string;
}

async function fetchMessages(conversationId: string, since?: string): Promise<WidgetMessage[]> {
  const base = admin()
    .from("conversation_messages")
    .select("id, sender_type, sender_staff_id, message_type, message_text, created_at")
    .eq("conversation_id", conversationId);
  // Incremental (since cursor): oldest-first. Initial load: newest N, reversed below.
  const { data, error } = since
    ? await base.gt("created_at", since).order("created_at", { ascending: true }).limit(HISTORY_LIMIT)
    : await base.order("created_at", { ascending: false }).limit(HISTORY_LIMIT);
  if (error) throw error;
  const rows = since ? data ?? [] : (data ?? []).reverse();

  const staffIds = [...new Set(rows.map((r) => r.sender_staff_id).filter(Boolean))] as string[];
  const names = new Map<string, string>();
  if (staffIds.length) {
    const { data: staff } = await admin().from("staff_users").select("id, full_name").in("id", staffIds);
    for (const s of staff ?? []) names.set(s.id, (s.full_name || "").trim().split(/\s+/)[0] || "");
  }

  return rows.map((r) => ({
    id: r.id,
    sender_type: r.sender_type,
    sender_name: r.sender_staff_id ? names.get(r.sender_staff_id) || null : null,
    message_type: r.message_type,
    message_text: r.message_text,
    created_at: r.created_at,
  }));
}

async function findOrCreateConversation(customerId: string, name: string): Promise<string> {
  const db = admin();
  const { data: existing } = await db
    .from("customer_conversations")
    .select("id")
    .eq("customer_id", customerId)
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await db
    .from("customer_conversations")
    .insert({ customer_id: customerId, subject: `Website chat — ${name}`.slice(0, 200), status: "active", channel: "webchat" })
    .select("id")
    .single();
  if (created) return created.id;

  // Lost a race against UNIQUE(customer_id) — read the winner.
  const { data: again } = await db
    .from("customer_conversations")
    .select("id")
    .eq("customer_id", customerId)
    .maybeSingle();
  if (again) return again.id;
  throw error ?? new Error("conversation_create_failed");
}

async function issueOtp(session: SessionRow, email: string, name: string): Promise<void> {
  const code = randomOtp();
  const now = new Date();
  await admin()
    .from("webchat_sessions")
    .update({
      otp_hash: await sha256(`${session.id}:${code}`),
      otp_expires_at: new Date(now.getTime() + OTP_TTL_MIN * 60_000).toISOString(),
      otp_attempts: 0,
      otp_sent_at: now.toISOString(),
    })
    .eq("id", session.id);

  const first = (name || "").split(/\s+/)[0] || "there";
  const html = emailShell(
    [
      title("Your chat verification code"),
      lead(`Hi ${esc(first)}, enter this code in the chat window on cethos.com to continue your conversation with our team.`),
      codeBlock({ code, expiresIn: `${OTP_TTL_MIN} minutes` }),
      hint("We ask for this because your email is already linked to a Cethos account. If you didn't start a chat on cethos.com, you can ignore this email."),
    ].join(""),
    { replyTo: REPLY.customer, template: OTP_TEMPLATE, preheader: `Your Cethos chat code is ${code}` },
  );
  await sendBrevo({
    sender: { name: "Cethos Translation Services", email: "donotreply@cethos.com" },
    to: [{ email, name: name || email }],
    replyTo: { email: REPLY.customer },
    subject: `${code} is your Cethos chat code`,
    htmlContent: html,
    tags: ["webchat-otp"],
  });
}

async function notifyStaffNewChat(
  session: SessionRow,
  customer: { email: string; full_name: string | null; phone: string | null },
  firstMessage: string,
): Promise<void> {
  const name = customer.full_name || session.visitor_name || customer.email;
  const html = emailShell(
    [
      statusBadge("info", session.is_new_customer ? "New lead · website chat" : "Existing customer · website chat"),
      title(`${esc(name)} started a chat on cethos.com`),
      lead("Reply from the portal inbox — the visitor sees your reply live in the chat window, and by email if they've left the site."),
      detailsTable([
        ["Name", esc(name)],
        ["Email", esc(customer.email)],
        ["Phone", esc(session.visitor_phone || customer.phone || "—")],
        ["Page", esc(session.page_url || "—")],
      ]),
      messageBlock(esc(firstMessage).replace(/\n/g, "<br />")),
      ctaButton({ label: "Open inbox", url: `${PORTAL_URL}/admin/messages` }),
    ].join(""),
    { replyTo: REPLY.ops, template: STAFF_TEMPLATE, preheader: `Website chat from ${esc(name)}` },
  );
  await sendBrevo({
    sender: { name: "Cethos Website Chat", email: "donotreply@cethos.com" },
    to: [{ email: STAFF_NOTIFY_EMAIL, name: "Cethos Support" }],
    replyTo: { email: customer.email, name },
    subject: `Website chat: ${name}`,
    htmlContent: html,
    tags: ["webchat-staff-notify"],
  });
}

// ── actions ─────────────────────────────────────────────────────────────────

async function actionStart(body: Record<string, unknown>, req: Request) {
  // Honeypot: real users never fill the hidden `website` field.
  if (clean(body.website, 200)) throw new HttpError(400, "rejected");

  const name = clean(body.name, 100);
  const email = clean(body.email, 254).toLowerCase();
  const phone = clean(body.phone, 25);
  if (name.length < 2) throw new HttpError(400, "invalid_name");
  if (!EMAIL_RE.test(email)) throw new HttpError(400, "invalid_email");
  if (!PHONE_RE.test(phone) || phone.replace(/\D/g, "").length < 7) throw new HttpError(400, "invalid_phone");

  const db = admin();

  // Existing customer? (case-insensitive exact match; 15 legacy rows are mixed-case)
  const { data: existing, error: lookupErr } = await db
    .from("customers")
    .select("id, email, full_name, phone")
    .ilike("email", likeExact(email))
    .limit(1)
    .maybeSingle();
  if (lookupErr) throw lookupErr;

  let customerId: string;
  let isNew = false;
  if (existing) {
    customerId = existing.id;
    const { count } = await db
      .from("webchat_sessions")
      .select("id", { count: "exact", head: true })
      .eq("customer_id", customerId)
      .gt("created_at", new Date(Date.now() - 3600_000).toISOString());
    if ((count ?? 0) >= MAX_STARTS_PER_EMAIL_PER_HOUR) throw new HttpError(429, "too_many_attempts");
  } else {
    const { data: created, error } = await db
      .from("customers")
      .insert({ email, full_name: name, phone, customer_type: "individual" })
      .select("id")
      .single();
    if (created) {
      customerId = created.id;
      isNew = true;
    } else {
      // UNIQUE(email) race — someone created it between lookup and insert.
      // Treat as existing so it still goes through email verification.
      const { data: again } = await db.from("customers").select("id").ilike("email", likeExact(email)).maybeSingle();
      if (!again) throw error ?? new Error("customer_create_failed");
      customerId = again.id;
    }
  }

  const token = randomToken(32);
  const topic = randomHex(16);
  const conversationId = isNew ? await findOrCreateConversation(customerId, name) : null;

  const { data: session, error: sErr } = await db
    .from("webchat_sessions")
    .insert({
      customer_id: customerId,
      conversation_id: conversationId,
      token_hash: await sha256(token),
      topic,
      verified_at: isNew ? new Date().toISOString() : null,
      is_new_customer: isNew,
      visitor_name: name,
      visitor_phone: phone,
      page_url: clean(body.page_url, 500) || null,
      locale: clean(body.locale, 10) || null,
      user_agent: (req.headers.get("user-agent") || "").slice(0, 300) || null,
    })
    .select("*")
    .single();
  if (sErr || !session) throw sErr ?? new Error("session_create_failed");

  if (isNew) {
    return { status: "active", token, topic, messages: [] };
  }

  await issueOtp(session as SessionRow, existing?.email || email, name);
  return { status: "verify", token, email_hint: emailHint(email) };
}

async function actionVerify(body: Record<string, unknown>) {
  const s = await loadSession(body.token);
  if (s.verified_at && s.conversation_id) {
    return { status: "active", topic: s.topic, messages: await fetchMessages(s.conversation_id) };
  }
  const code = clean(body.code, 10).replace(/\D/g, "");
  if (code.length !== 6) throw new HttpError(400, "invalid_code");
  if (!s.otp_hash || !s.otp_expires_at) throw new HttpError(400, "no_code_issued");
  if (s.otp_attempts >= OTP_MAX_ATTEMPTS) throw new HttpError(429, "too_many_attempts");
  if (new Date(s.otp_expires_at).getTime() < Date.now()) throw new HttpError(400, "code_expired");

  const db = admin();
  const ok = timingSafeEqual(await sha256(`${s.id}:${code}`), s.otp_hash);
  if (!ok) {
    await db.from("webchat_sessions").update({ otp_attempts: s.otp_attempts + 1 }).eq("id", s.id);
    throw new HttpError(400, "wrong_code");
  }

  // Backfill name/phone on the customer only where empty — never overwrite.
  const { data: cust } = await db.from("customers").select("full_name, phone").eq("id", s.customer_id).single();
  const patch: Record<string, string> = {};
  if (!cust?.full_name && s.visitor_name) patch.full_name = s.visitor_name;
  if (!cust?.phone && s.visitor_phone) patch.phone = s.visitor_phone;
  if (Object.keys(patch).length) await db.from("customers").update(patch).eq("id", s.customer_id);

  const conversationId = await findOrCreateConversation(s.customer_id, s.visitor_name || cust?.full_name || "Customer");
  await db
    .from("webchat_sessions")
    .update({
      verified_at: new Date().toISOString(),
      conversation_id: conversationId,
      otp_hash: null,
      otp_expires_at: null,
      last_seen_at: new Date().toISOString(),
    })
    .eq("id", s.id);

  return { status: "active", topic: s.topic, messages: await fetchMessages(conversationId) };
}

async function actionResend(body: Record<string, unknown>) {
  const s = await loadSession(body.token);
  if (s.verified_at) return { status: "active" };
  if (s.otp_sent_at && Date.now() - new Date(s.otp_sent_at).getTime() < OTP_RESEND_COOLDOWN_S * 1000) {
    throw new HttpError(429, "resend_cooldown");
  }
  const { data: cust } = await admin().from("customers").select("email, full_name").eq("id", s.customer_id).single();
  if (!cust) throw new HttpError(404, "customer_not_found");
  await issueOtp(s, cust.email, s.visitor_name || cust.full_name || "");
  return { status: "verify" };
}

async function actionSend(body: Record<string, unknown>) {
  const s = await loadSession(body.token);
  requireVerified(s);
  const text = typeof body.message === "string" ? body.message.trim() : "";
  if (!text) throw new HttpError(400, "empty_message");
  if (text.length > MAX_MESSAGE_LEN) throw new HttpError(400, "message_too_long");

  const db = admin();
  const { count } = await db
    .from("conversation_messages")
    .select("id", { count: "exact", head: true })
    .eq("conversation_id", s.conversation_id)
    .eq("source", "webchat")
    .gt("created_at", new Date(Date.now() - 60_000).toISOString());
  if ((count ?? 0) >= MAX_MESSAGES_PER_MINUTE) throw new HttpError(429, "slow_down");

  // unread_count_staff / preview / last_message_at are maintained by the
  // existing trg_update_conversation_on_message; channel + Broadcast + push by
  // trg_webchat_on_message. Nothing else to bump here.
  const { data: msg, error } = await db
    .from("conversation_messages")
    .insert({
      conversation_id: s.conversation_id,
      sender_type: "customer",
      sender_customer_id: s.customer_id,
      message_type: "text",
      message_text: text,
      source: "webchat",
      metadata: { webchat_session_id: s.id, page_url: s.page_url },
    })
    .select("id, sender_type, message_type, message_text, created_at")
    .single();
  if (error || !msg) throw error ?? new Error("message_insert_failed");

  const now = new Date().toISOString();
  const isFirst = !s.first_message_at;
  await db
    .from("webchat_sessions")
    .update({ last_seen_at: now, ...(isFirst ? { first_message_at: now } : {}) })
    .eq("id", s.id);

  // Email support once per chat session (live chat is noisy; per-message
  // alerts go out as in-app + Web Push instead).
  if (isFirst) {
    try {
      const { data: cust } = await db.from("customers").select("email, full_name, phone").eq("id", s.customer_id).single();
      if (cust) await notifyStaffNewChat(s, cust, text);
    } catch (e) {
      console.error("staff notify failed", e);
    }
  }

  return { message: { ...msg, sender_name: null } };
}

async function actionHistory(body: Record<string, unknown>) {
  const s = await loadSession(body.token);
  requireVerified(s);
  const since = typeof body.since === "string" && !Number.isNaN(Date.parse(body.since)) ? body.since : undefined;
  await admin().from("webchat_sessions").update({ last_seen_at: new Date().toISOString() }).eq("id", s.id);
  return { messages: await fetchMessages(s.conversation_id, since) };
}

// ── entry ───────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  try {
    switch (body.action) {
      case "start":
        return json(await actionStart(body, req));
      case "verify":
        return json(await actionVerify(body));
      case "resend":
        return json(await actionResend(body));
      case "send":
        return json(await actionSend(body));
      case "history":
        return json(await actionHistory(body));
      default:
        return json({ error: "unknown_action" }, 400);
    }
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.code }, e.status);
    console.error("webchat error", e);
    return json({ error: "server_error" }, 500);
  }
});
