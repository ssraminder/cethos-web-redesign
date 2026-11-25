// Shared helpers for the website chat v2 functions (webchat-visitor,
// webchat-agent). Tables: migration 019_webchat_v2.

import { createClient, type SupabaseClient } from "jsr:@supabase/supabase-js@2";

export const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
export const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY") ?? "";
export const PORTAL_URL = Deno.env.get("FRONTEND_URL") || "https://portal.cethos.com";

export const ATTACHMENT_BUCKET = "message-attachments";
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_MESSAGE_LEN = 2000;
export const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
]);

export const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export class HttpError extends Error {
  constructor(public status: number, public code: string, message?: string) {
    super(message ?? code);
  }
}

let _admin: SupabaseClient | null = null;
export function admin(): SupabaseClient {
  if (!_admin) {
    _admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _admin;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

export function randomToken(bytes: number): string {
  const b = crypto.getRandomValues(new Uint8Array(bytes));
  return btoa(String.fromCharCode(...b)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function randomHex(bytes: number): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(bytes)))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

export async function sha256(s: string): Promise<string> {
  const d = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(d)).map((x) => x.toString(16).padStart(2, "0")).join("");
}

// No `*`: PostgREST treats it as a LIKE wildcard.
export const EMAIL_RE = /^[^\s@*]+@[^\s@*]+\.[^\s@*]{2,}$/;
export const PHONE_RE = /^[+()\-.\s\d]{7,25}$/;

export function clean(s: unknown, max: number): string {
  return typeof s === "string" ? s.trim().slice(0, max) : "";
}

export function firstName(full: string | null | undefined): string {
  return (full || "").trim().split(/\s+/)[0] || "";
}

export async function sendBrevo(payload: Record<string, unknown>): Promise<boolean> {
  if (!BREVO_API_KEY) {
    console.warn("BREVO_API_KEY not set — email skipped");
    return false;
  }
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY },
    body: JSON.stringify(payload),
  });
  if (!r.ok) console.error("Brevo error", r.status, await r.text());
  return r.ok;
}

/** Find the customers row for an email (exact, case-insensitive). */
export async function customerIdForEmail(email: string | null): Promise<string | null> {
  if (!email) return null;
  const { data } = await admin()
    .from("customers")
    .select("id")
    .ilike("email", email.replace(/[\\%_]/g, (m) => "\\" + m))
    .limit(1)
    .maybeSingle();
  return data?.id ?? null;
}

export interface Attachment {
  path: string;
  name: string;
  mime: string;
  size: number;
}

export function safeFileName(name: string): string {
  const base = name.normalize("NFKD").replace(/[^\w.\- ]+/g, "").replace(/\s+/g, "_").slice(-120);
  return base || "file";
}

/** Store an uploaded file under webchat/<chat_id>/ in the private bucket. */
export async function storeAttachment(chatId: string, file: File): Promise<Attachment> {
  if (file.size <= 0) throw new HttpError(400, "empty_file");
  if (file.size > MAX_FILE_BYTES) throw new HttpError(413, "file_too_large");
  const mime = file.type || "application/octet-stream";
  if (!ALLOWED_MIME.has(mime)) throw new HttpError(415, "file_type_not_allowed");
  const path = `webchat/${chatId}/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  const { error } = await admin().storage.from(ATTACHMENT_BUCKET).upload(path, file, {
    contentType: mime,
    upsert: false,
  });
  if (error) throw error;
  return { path, name: file.name.slice(0, 200) || "file", mime, size: file.size };
}

export interface OutMessage {
  id: string;
  chat_id: string;
  sender_type: "visitor" | "staff" | "system";
  sender_name: string | null;
  sender_avatar: string | null;
  body: string;
  attachments: { name: string; mime: string; size: number; url: string | null }[];
  created_at: string;
}

interface MessageRow {
  id: string;
  chat_id: string;
  sender_type: "visitor" | "staff" | "system";
  staff_id: string | null;
  body: string;
  attachments: Attachment[] | null;
  created_at: string;
}

/** Messages with staff first names/avatars and 1-hour signed file URLs. */
export async function decorateMessages(rows: MessageRow[]): Promise<OutMessage[]> {
  const staffIds = [...new Set(rows.map((r) => r.staff_id).filter(Boolean))] as string[];
  const staff = new Map<string, { name: string; avatar: string | null }>();
  if (staffIds.length) {
    const { data } = await admin().from("staff_users").select("id, full_name, avatar_url").in("id", staffIds);
    for (const s of data ?? []) staff.set(s.id, { name: firstName(s.full_name), avatar: s.avatar_url ?? null });
  }
  const paths = rows.flatMap((r) => (r.attachments ?? []).map((a) => a.path));
  const urls = new Map<string, string>();
  if (paths.length) {
    const { data } = await admin().storage.from(ATTACHMENT_BUCKET).createSignedUrls(paths, 3600);
    for (const s of data ?? []) if (s.path && s.signedUrl) urls.set(s.path, s.signedUrl);
  }
  return rows.map((r) => ({
    id: r.id,
    chat_id: r.chat_id,
    sender_type: r.sender_type,
    sender_name: r.staff_id ? staff.get(r.staff_id)?.name || null : null,
    sender_avatar: r.staff_id ? staff.get(r.staff_id)?.avatar ?? null : null,
    body: r.body,
    attachments: (r.attachments ?? []).map((a) => ({
      name: a.name,
      mime: a.mime,
      size: a.size,
      url: urls.get(a.path) ?? null,
    })),
    created_at: r.created_at,
  }));
}

export const MESSAGE_COLUMNS = "id, chat_id, sender_type, staff_id, body, attachments, created_at";

/** Agents who are Online with a heartbeat in the last 2 minutes. */
export async function onlineAgents(): Promise<{ name: string; avatar: string | null }[]> {
  const since = new Date(Date.now() - 2 * 60_000).toISOString();
  const { data } = await admin()
    .from("webchat_agent_status")
    .select("staff_id, staff_users!inner(full_name, avatar_url, is_active)")
    .eq("status", "online")
    .gt("heartbeat_at", since)
    .eq("staff_users.is_active", true);
  return (data ?? []).map((r: any) => ({
    name: firstName(r.staff_users?.full_name),
    avatar: r.staff_users?.avatar_url ?? null,
  }));
}
