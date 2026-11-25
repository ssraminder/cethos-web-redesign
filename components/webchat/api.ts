// Thin client for the `webchat-visitor` Supabase edge function (website chat
// v2, migration 019). Publishable/anon key as bearer + apikey; the function
// identifies the visitor by an opaque token kept in localStorage.

export interface ChatAttachment {
  name: string
  mime: string
  size: number
  url: string | null
}

export interface ChatMessage {
  id: string
  chat_id: string
  sender_type: 'visitor' | 'staff' | 'system'
  sender_name: string | null
  sender_avatar: string | null
  body: string
  attachments: ChatAttachment[]
  created_at: string
  /** client-only: optimistic message not yet confirmed by the server */
  pending?: boolean
}

export interface Agent {
  name: string | null
  avatar: string | null
}

export interface ChatInfo {
  id: string
  status: 'open' | 'offline' | 'closed'
  rating: 'up' | 'down' | null
  agent: Agent | null
}

export interface Team {
  online: boolean
  agents: Agent[]
}

export interface VisitorInfo {
  name: string | null
  email: string | null
  phone: string | null
}

export interface HelloResult {
  banned?: boolean
  token?: string
  topic: string
  visitor: VisitorInfo
  team: Team
  settings: { greeting_enabled: boolean; greeting_delay_s: number; greeting: string }
  chat: ChatInfo | null
  messages: ChatMessage[]
}

export class WebchatError extends Error {
  constructor(public code: string, public status: number) {
    super(code)
  }
}

function endpoint(): { url: string; key: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new WebchatError('not_configured', 0)
  return { url: `${url}/functions/v1/webchat-visitor`, key }
}

async function parse<T>(res: Response): Promise<T> {
  let data: any = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON error body */
  }
  if (!res.ok) throw new WebchatError(data?.error || 'server_error', res.status)
  return data as T
}

async function call<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  const { url, key } = endpoint()
  let res: Response
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}`, apikey: key },
      body: JSON.stringify({ action, ...payload }),
      keepalive: action === 'ping',
    })
  } catch {
    throw new WebchatError('network', 0)
  }
  return parse<T>(res)
}

async function upload(token: string, file: File, body: string) {
  const { url, key } = endpoint()
  const form = new FormData()
  form.append('token', token)
  form.append('file', file)
  if (body) form.append('body', body)
  let res: Response
  try {
    res = await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${key}`, apikey: key }, body: form })
  } catch {
    throw new WebchatError('network', 0)
  }
  return parse<{ chat_id: string; message: ChatMessage }>(res)
}

export const webchatApi = {
  hello: (p: {
    token: string | null
    url: string
    title: string
    referrer: string
    locale: string
    geo: Record<string, string> | null
  }) => call<HelloResult>('hello', p),
  ping: (token: string, url: string, title: string) =>
    call<{ team: Team; chat_id: string | null; chat_status: ChatInfo['status'] | null; unread: number }>('ping', {
      token,
      url,
      title,
    }),
  send: (token: string, body: string) => call<{ chat_id: string; message: ChatMessage }>('send', { token, body }),
  upload,
  history: (token: string, chat_id: string, since?: string, mark_read?: boolean) =>
    call<{ chat: ChatInfo; messages: ChatMessage[] }>('history', { token, chat_id, since, mark_read }),
  identify: (token: string, p: { name?: string; email?: string; phone?: string }) =>
    call<{ visitor: VisitorInfo }>('identify', { token, ...p }),
  end: (token: string, chat_id: string) => call<{ ok: true }>('end', { token, chat_id }),
  rate: (token: string, chat_id: string, rating: 'up' | 'down', comment: string) =>
    call<{ ok: true }>('rate', { token, chat_id, rating, comment }),
  transcript: (token: string, chat_id: string, email: string) =>
    call<{ ok: true }>('transcript', { token, chat_id, email }),
  offline: (token: string, p: { name: string; email: string; phone: string; message: string }) =>
    call<{ chat_id: string }>('offline', { token, ...p }),
}

// ── browser storage (all wrapped: private mode / blocked storage) ──────────

const TOKEN_KEY = 'cethos_webchat_v2'

export function loadToken(): string | null {
  try {
    window.localStorage.removeItem('cethos_webchat_v1') // v1 form-first widget
    return window.localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function saveToken(token: string | null): void {
  try {
    if (token) window.localStorage.setItem(TOKEN_KEY, token)
    else window.localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* memory only */
  }
}

export function readFlag(key: string, session = false): string | null {
  try {
    return (session ? window.sessionStorage : window.localStorage).getItem(key)
  } catch {
    return null
  }
}

export function writeFlag(key: string, value: string | null, session = false): void {
  try {
    const s = session ? window.sessionStorage : window.localStorage
    if (value === null) s.removeItem(key)
    else s.setItem(key, value)
  } catch {
    /* ignore */
  }
}

/** Merge server messages into a list: dedupe by id, keep chronological order. */
export function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] {
  if (!incoming.length) return current
  const byId = new Map(current.map((m) => [m.id, m]))
  for (const m of incoming) {
    const prev = byId.get(m.id)
    // Broadcast copies carry no signed file URLs — keep the URLs we already have.
    const attachments =
      prev && m.attachments.some((a) => !a.url) && prev.attachments.some((a) => a.url) ? prev.attachments : m.attachments
    byId.set(m.id, { ...m, attachments, pending: false })
  }
  return Array.from(byId.values()).sort((a, b) => a.created_at.localeCompare(b.created_at))
}

/** Short two-note chime (Web Audio — no sound file to load). */
export function playDing(): void {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext
    if (!Ctx) return
    const ctx: AudioContext = (playDing as any)._ctx || new Ctx()
    ;(playDing as any)._ctx = ctx
    const now = ctx.currentTime
    ;[880, 1318.5].forEach((freq, i) => {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.0001, now + i * 0.12)
      gain.gain.exponentialRampToValueAtTime(0.18, now + i * 0.12 + 0.02)
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.12 + 0.35)
      osc.connect(gain).connect(ctx.destination)
      osc.start(now + i * 0.12)
      osc.stop(now + i * 0.12 + 0.4)
    })
  } catch {
    /* sound is optional */
  }
}
