// ============================================================================
// webchat-agent v1.0 — Cethos Chat (portal.cethos.com/chat) agent actions
//
// Auth: the caller's Supabase JWT (supabase.functions.invoke from the portal).
// The user must be an active staff member with website-chat access (admin,
// super_admin or permissions.webchat) — same rule as staff_has_webchat_access().
// Deploy with --no-verify-jwt; the JWT is checked here.
//
// JSON { action, ... } or multipart/form-data (send with files, avatar):
//   messages { chat_id, since? }          → { messages }   (signed file URLs)
//   send     form: chat_id, body, file*   → { message }
//            JSON: { chat_id, body }
//   start    { visitor_id, body }         → { chat_id }    (proactive chat)
//   avatar   form: file                   → { avatar_url }
//   avatar_remove                         → { ok }
//
// A reply auto-claims an unassigned chat. If the visitor left the site and
// gave an email, the reply is emailed (at most once per 10 min per chat).
// ============================================================================

import {
  admin,
  clean,
  CORS,
  decorateMessages,
  firstName,
  HttpError,
  json,
  MAX_MESSAGE_LEN,
  MESSAGE_COLUMNS,
  sendBrevo,
  storeAttachment,
  SUPABASE_URL,
  type Attachment,
} from "../_shared/webchat-common.ts";
import { emailShell, esc, lead, messageBlock, REPLY, title, type TemplateMeta } from "../_shared/email-shell.ts";

const REPLY_TEMPLATE: TemplateMeta = { name: "Customer — Website Chat Reply", version: "1.0", updatedAt: "2026-11-24" };
const EMAIL_IF_AWAY_MS = 2 * 60_000;
const EMAIL_DEBOUNCE_MS = 10 * 60_000;
const MAX_FILES = 5;
const AVATAR_MAX = 2 * 1024 * 1024;

interface Agent {
  id: string;
  full_name: string;
}

async function requireAgent(req: Request): Promise<Agent> {
  const token = (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) throw new HttpError(401, "unauthorized");
  const { data: u, error } = await admin().auth.getUser(token);
  if (error || !u?.user) throw new HttpError(401, "unauthorized");
  const { data: s } = await admin()
    .from("staff_users")
    .select("id, full_name, role, permissions, is_active")
    .eq("auth_user_id", u.user.id)
    .maybeSingle();
  if (!s || !s.is_active) throw new HttpError(403, "not_staff");
  const ok = s.role === "admin" || s.role === "super_admin" || s.permissions?.webchat === true;
  if (!ok) throw new HttpError(403, "webchat_access_required");
  return { id: s.id, full_name: s.full_name };
}

async function loadChat(chatId: unknown) {
  if (typeof chatId !== "string") throw new HttpError(400, "chat_required");
  const { data } = await admin()
    .from("webchat_chats")
    .select("id, visitor_id, status, assigned_staff_id, emailed_at")
    .eq("id", chatId)
    .maybeSingle();
  if (!data) throw new HttpError(404, "chat_not_found");
  return data;
}

async function claimIfUnassigned(chat: { id: string; assigned_staff_id: string | null; status: string }, agent: Agent) {
  const patch: Record<string, unknown> = {};
  if (!chat.assigned_staff_id) patch.assigned_staff_id = agent.id;
  if (chat.status !== "open") patch.status = "open";
  if (patch.status === "open" && chat.status === "closed") patch.closed_at = null;
  if (!Object.keys(patch).length) return;
  await admin().from("webchat_chats").update(patch).eq("id", chat.id);
  if (!chat.assigned_staff_id) {
    await admin().from("webchat_messages").insert({
      chat_id: chat.id,
      sender_type: "system",
      body: `${firstName(agent.full_name) || "An agent"} joined the chat`,
    });
  }
}

/** Email the reply if the visitor has left the site and gave an email. */
async function maybeEmailVisitor(
  chat: { id: string; visitor_id: string; emailed_at: string | null },
  agent: Agent,
  text: string,
  files: Attachment[],
) {
  const { data: v } = await admin()
    .from("webchat_visitors")
    .select("email, name, last_seen_at, locale")
    .eq("id", chat.visitor_id)
    .maybeSingle();
  if (!v?.email) return;
  if (Date.now() - new Date(v.last_seen_at).getTime() < EMAIL_IF_AWAY_MS) return;
  if (chat.emailed_at && Date.now() - new Date(chat.emailed_at).getTime() < EMAIL_DEBOUNCE_MS) return;

  const fr = (v.locale || "").startsWith("fr");
  const who = firstName(agent.full_name) || "Cethos";
  const filesNote = files.length
    ? `<br /><br />${files.map((f) => `📎 ${esc(f.name)}`).join("<br />")}<br /><em>${fr ? "Les fichiers sont dans le clavardage sur cethos.com." : "Files are in the chat on cethos.com."}</em>`
    : "";
  const html = emailShell(
    [
      title(fr ? `${esc(who)} vous a répondu` : `${esc(who)} replied to your chat`),
      lead(
        fr
          ? "Vous avez quitté cethos.com avant notre réponse. Répondez à ce courriel ou rouvrez le clavardage sur cethos.com."
          : "You left cethos.com before we replied. Reply to this email, or open the chat on cethos.com to continue.",
      ),
      messageBlock(esc(text).replace(/\n/g, "<br />") + filesNote),
    ].join(""),
    { replyTo: REPLY.customer, template: REPLY_TEMPLATE, preheader: text.slice(0, 90) },
  );
  const sent = await sendBrevo({
    sender: { name: `${who} at Cethos`, email: "donotreply@cethos.com" },
    to: [{ email: v.email, name: v.name || v.email }],
    replyTo: { email: REPLY.customer },
    subject: fr ? "Réponse de Cethos à votre clavardage" : "Cethos replied to your chat",
    htmlContent: html,
    tags: ["webchat-reply"],
  });
  if (sent) await admin().from("webchat_chats").update({ emailed_at: new Date().toISOString() }).eq("id", chat.id);
}

// ── actions ─────────────────────────────────────────────────────────────────

async function actionMessages(body: Record<string, unknown>) {
  const chat = await loadChat(body.chat_id);
  const since = typeof body.since === "string" ? body.since : null;
  const q = admin().from("webchat_messages").select(MESSAGE_COLUMNS).eq("chat_id", chat.id);
  const { data, error } = since
    ? await q.gt("created_at", since).order("created_at", { ascending: true }).limit(200)
    : await q.order("created_at", { ascending: true }).limit(500);
  if (error) throw error;
  return { messages: await decorateMessages((data ?? []) as any) };
}

async function doSend(agent: Agent, chatId: unknown, text: string, files: File[]) {
  const chat = await loadChat(chatId);
  if (!text && !files.length) throw new HttpError(400, "empty_message");
  if (files.length > MAX_FILES) throw new HttpError(400, "too_many_files");
  await claimIfUnassigned(chat, agent);
  const atts: Attachment[] = [];
  for (const f of files) atts.push(await storeAttachment(chat.id, f));
  const { data, error } = await admin()
    .from("webchat_messages")
    .insert({ chat_id: chat.id, sender_type: "staff", staff_id: agent.id, body: text, attachments: atts })
    .select(MESSAGE_COLUMNS)
    .single();
  if (error) throw error;
  await maybeEmailVisitor(chat, agent, text, atts).catch((e) => console.error("reply email", e));
  const [message] = await decorateMessages([data as any]);
  return { message };
}

async function actionStart(agent: Agent, body: Record<string, unknown>) {
  const visitorId = typeof body.visitor_id === "string" ? body.visitor_id : "";
  const text = clean(body.body, MAX_MESSAGE_LEN);
  if (!visitorId || !text) throw new HttpError(400, "visitor_and_message_required");
  const { data: v } = await admin()
    .from("webchat_visitors")
    .select("id, customer_id, current_url, banned_at")
    .eq("id", visitorId)
    .maybeSingle();
  if (!v || v.banned_at) throw new HttpError(404, "visitor_not_found");

  const { data: open } = await admin()
    .from("webchat_chats")
    .select("id")
    .eq("visitor_id", v.id)
    .neq("status", "closed")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  let chatId = open?.id as string | undefined;
  if (!chatId) {
    const { data: c, error } = await admin()
      .from("webchat_chats")
      .insert({
        visitor_id: v.id,
        customer_id: v.customer_id,
        started_url: v.current_url,
        status: "open",
        started_by: "staff",
        assigned_staff_id: agent.id,
      })
      .select("id")
      .single();
    if (error) throw error;
    chatId = c.id;
  }
  await doSend(agent, chatId, text, []);
  return { chat_id: chatId };
}

async function actionAvatar(agent: Agent, file: File | null) {
  if (!file) throw new HttpError(400, "file_required");
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new HttpError(415, "image_required");
  if (file.size > AVATAR_MAX) throw new HttpError(413, "file_too_large");
  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const path = `${agent.id}/${crypto.randomUUID()}.${ext}`;
  const { error } = await admin().storage.from("staff-avatars").upload(path, file, { contentType: file.type });
  if (error) throw error;
  const avatarUrl = `${SUPABASE_URL}/storage/v1/object/public/staff-avatars/${path}`;
  await admin().from("staff_users").update({ avatar_url: avatarUrl }).eq("id", agent.id);
  return { avatar_url: avatarUrl };
}

// ── entry ───────────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  try {
    const agent = await requireAgent(req);

    if ((req.headers.get("content-type") || "").includes("multipart/form-data")) {
      const form = await req.formData();
      const action = form.get("action");
      if (action === "avatar") {
        const f = form.get("file");
        return json(await actionAvatar(agent, f instanceof File ? f : null));
      }
      if (action === "send") {
        const files = form.getAll("file").filter((f): f is File => f instanceof File);
        return json(await doSend(agent, form.get("chat_id"), clean(form.get("body"), MAX_MESSAGE_LEN), files));
      }
      return json({ error: "unknown_action" }, 400);
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return json({ error: "invalid_json" }, 400);
    }
    switch (body.action) {
      case "messages":
        return json(await actionMessages(body));
      case "send":
        return json(await doSend(agent, body.chat_id, clean(body.body, MAX_MESSAGE_LEN), []));
      case "start":
        return json(await actionStart(agent, body));
      case "avatar_remove":
        await admin().from("staff_users").update({ avatar_url: null }).eq("id", agent.id);
        return json({ ok: true });
      default:
        return json({ error: "unknown_action" }, 400);
    }
  } catch (e) {
    if (e instanceof HttpError) return json({ error: e.code }, e.status);
    console.error("webchat-agent error", e);
    return json({ error: "server_error" }, 500);
  }
});
