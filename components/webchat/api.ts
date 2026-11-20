// Thin client for the `webchat` Supabase edge function.
// Same call pattern as EmbeddedCertifiedQuoteForm: publishable/anon key as
// bearer + apikey; the function does its own auth via the session token.

export interface ChatMessage {
  id: string
  sender_type: 'customer' | 'staff' | 'system'
  sender_name: string | null
  message_type: string | null
  message_text: string | null
  created_at: string
  /** client-only: optimistic message not yet confirmed by the server */
  pending?: boolean
}

export type StartResult =
  | { status: 'active'; token: string; topic: string; messages: ChatMessage[] }
  | { status: 'verify'; token: string; email_hint: string }

export class WebchatError extends Error {
  constructor(public code: string, public status: number) {
    super(code)
  }
}

async function call<T>(action: string, payload: Record<string, unknown>): Promise<T> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) throw new WebchatError('not_configured', 0)

  let res: Response
  try {
    res = await fetch(`${url}/functions/v1/webchat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      body: JSON.stringify({ action, ...payload }),
    })
  } catch {
    throw new WebchatError('network', 0)
  }

  let data: any = null
  try {
    data = await res.json()
  } catch {
    /* non-JSON error body */
  }
  if (!res.ok) throw new WebchatError(data?.error || 'server_error', res.status)
  return data as T
}

export const webchatApi = {
  start: (p: { name: string; email: string; phone: string; website: string; page_url: string; locale: string }) =>
    call<StartResult>('start', p),
  verify: (token: string, code: string) =>
    call<{ status: 'active'; topic: string; messages: ChatMessage[] }>('verify', { token, code }),
  resend: (token: string) => call<{ status: string }>('resend', { token }),
  send: (token: string, message: string) => call<{ message: ChatMessage }>('send', { token, message }),
  history: (token: string, since?: string) => call<{ messages: ChatMessage[] }>('history', { token, since }),
}

// ── local session persistence ──────────────────────────────────────────────

const STORAGE_KEY = 'cethos_webchat_v1'

export interface StoredSession {
  token: string
  status: 'verify' | 'active'
  topic?: string
  name: string
  email: string
  emailHint?: string
}

export function loadStoredSession(): StoredSession | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as StoredSession
    return s && typeof s.token === 'string' ? s : null
  } catch {
    return null
  }
}

export function saveStoredSession(s: StoredSession | null): void {
  try {
    if (s) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
    else window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* storage blocked (private mode) — session lives in memory only */
  }
}

/** Merge server messages into a list: dedupe by id, keep chronological order. */
export function mergeMessages(current: ChatMessage[], incoming: ChatMessage[]): ChatMessage[] {
  if (!incoming.length) return current
  const byId = new Map(current.map((m) => [m.id, m]))
  for (const m of incoming) byId.set(m.id, { ...m, pending: false })
  return Array.from(byId.values()).sort((a, b) => a.created_at.localeCompare(b.created_at))
}
