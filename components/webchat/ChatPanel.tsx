'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import { useLocale } from 'next-intl'
import { Loader2, Send, X } from 'lucide-react'
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'
import { useWebchatCopy } from './useWebchatCopy'
import { errorKey, type WebchatKey } from './strings'
import {
  loadStoredSession,
  mergeMessages,
  saveStoredSession,
  webchatApi,
  WebchatError,
  type ChatMessage,
  type StoredSession,
} from './api'

const POLL_MS = 12_000
const SESSION_ERRORS = new Set(['invalid_session', 'session_expired', 'not_verified'])
const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g

interface Props {
  open: boolean
  onClose: () => void
  onUnread: () => void
}

// window.dataLayer is declared globally in lib/tracking.ts.
function track(event: string, data: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...data })
  } catch {
    /* analytics must never break chat */
  }
}

function linkify(text: string): ReactNode[] {
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} target="_blank" rel="noopener noreferrer" className="underline break-all">
        {part}
      </a>
    ) : (
      part
    ),
  )
}

export default function ChatPanel({ open, onClose, onUnread }: Props) {
  const copy = useWebchatCopy()
  const locale = useLocale()

  const [session, setSession] = useState<StoredSession | null>(null)
  const [hydrated, setHydrated] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [error, setError] = useState<WebchatKey | null>(null)
  const [notice, setNotice] = useState<WebchatKey | null>(null)
  const [busy, setBusy] = useState(false)
  const [realtimeOk, setRealtimeOk] = useState(false)

  // pre-chat form
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [honeypot, setHoneypot] = useState('')
  // verify
  const [code, setCode] = useState('')
  // composer
  const [draft, setDraft] = useState('')

  const openRef = useRef(open)
  openRef.current = open
  const onUnreadRef = useRef(onUnread)
  onUnreadRef.current = onUnread
  const listRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null)

  const phase: 'prechat' | 'verify' | 'chat' = !session ? 'prechat' : session.status === 'verify' ? 'verify' : 'chat'
  const token = session?.token
  const topic = session?.status === 'active' ? session.topic : undefined

  // ── session lifecycle ────────────────────────────────────────────────────

  const persist = useCallback((s: StoredSession | null) => {
    saveStoredSession(s)
    setSession(s)
  }, [])

  const resetToPrechat = useCallback(
    (err?: WebchatKey) => {
      persist(null)
      setMessages([])
      setCode('')
      setDraft('')
      setError(err ?? null)
      setNotice(null)
    },
    [persist],
  )

  const handleError = useCallback(
    (e: unknown) => {
      const code = e instanceof WebchatError ? e.code : 'server_error'
      if (SESSION_ERRORS.has(code)) resetToPrechat('error_session')
      else setError(errorKey(code))
    },
    [resetToPrechat],
  )

  useEffect(() => {
    const s = loadStoredSession()
    if (s) {
      setSession(s)
      setName(s.name)
      setEmail(s.email)
    }
    setHydrated(true)
  }, [])

  // Load history whenever a session becomes active.
  useEffect(() => {
    if (!token || phase !== 'chat') return
    let cancelled = false
    webchatApi
      .history(token)
      .then((r) => !cancelled && setMessages((cur) => mergeMessages(cur, r.messages)))
      .catch((e) => !cancelled && handleError(e))
    return () => {
      cancelled = true
    }
  }, [token, phase, handleError])

  // ── incoming messages ────────────────────────────────────────────────────

  const ingest = useCallback((incoming: ChatMessage[]) => {
    if (!incoming.length) return
    setMessages((cur) => {
      const known = new Set(cur.map((m) => m.id))
      const fresh = incoming.filter((m) => !known.has(m.id) && m.sender_type !== 'customer')
      if (fresh.length && !openRef.current) fresh.forEach(() => onUnreadRef.current())
      return mergeMessages(cur, incoming)
    })
  }, [])

  // Realtime Broadcast on the per-session secret topic (see migration 017).
  useEffect(() => {
    if (!topic) return
    let client: SupabaseClient | null = null
    let channel: RealtimeChannel | null = null
    let disposed = false

    import('@/lib/supabase').then(({ createBrowserSupabaseClient }) => {
      if (disposed) return
      client = createBrowserSupabaseClient()
      if (!client) return
      channel = client
        .channel(`webchat:${topic}`)
        .on('broadcast', { event: 'message' }, ({ payload }) => ingest([payload as ChatMessage]))
        .subscribe((status) => setRealtimeOk(status === 'SUBSCRIBED'))
    })

    return () => {
      disposed = true
      setRealtimeOk(false)
      if (client && channel) client.removeChannel(channel)
    }
  }, [topic, ingest])

  // Polling fallback: while the panel is open, or whenever Realtime is down.
  const lastServerTs = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) if (!messages[i].pending) return messages[i].created_at
    return undefined
  }, [messages])
  const lastServerTsRef = useRef(lastServerTs)
  lastServerTsRef.current = lastServerTs

  useEffect(() => {
    if (!token || phase !== 'chat') return
    if (!open && realtimeOk) return
    const tick = () =>
      webchatApi
        .history(token, lastServerTsRef.current)
        .then((r) => ingest(r.messages))
        .catch((e) => {
          if (e instanceof WebchatError && SESSION_ERRORS.has(e.code)) handleError(e)
        })
    const id = window.setInterval(tick, POLL_MS)
    const onVisible = () => document.visibilityState === 'visible' && tick()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [token, phase, open, realtimeOk, ingest, handleError])

  // ── UI effects ───────────────────────────────────────────────────────────

  useEffect(() => {
    if (open && phase === 'chat' && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, open, phase])

  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => firstFieldRef.current?.focus(), 50)
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    // Full-screen on phones: stop the page behind from scrolling.
    const lock = window.matchMedia('(max-width: 639px)').matches
    const prevOverflow = document.body.style.overflow
    if (lock) document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKey)
      if (lock) document.body.style.overflow = prevOverflow
    }
  }, [open, phase, onClose])

  // ── actions ──────────────────────────────────────────────────────────────

  async function startChat(e: FormEvent) {
    e.preventDefault()
    setError(null)
    if (name.trim().length < 2) return setError('error_invalid_name')
    if (!/^[^\s@*]+@[^\s@*]+\.[^\s@*]{2,}$/.test(email.trim())) return setError('error_invalid_email')
    if (phone.replace(/\D/g, '').length < 7) return setError('error_invalid_phone')

    setBusy(true)
    try {
      const r = await webchatApi.start({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        website: honeypot,
        page_url: window.location.href.slice(0, 500),
        locale,
      })
      const base = { token: r.token, name: name.trim(), email: email.trim() }
      if (r.status === 'active') {
        persist({ ...base, status: 'active', topic: r.topic })
        setMessages(r.messages)
      } else {
        persist({ ...base, status: 'verify', emailHint: r.email_hint })
      }
      track('webchat_started', { webchat_customer: r.status === 'active' ? 'new' : 'existing' })
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault()
    if (!session) return
    setError(null)
    setNotice(null)
    setBusy(true)
    try {
      const r = await webchatApi.verify(session.token, code)
      persist({ ...session, status: 'active', topic: r.topic })
      setMessages(r.messages)
      setCode('')
      track('webchat_verified')
    } catch (err) {
      handleError(err)
    } finally {
      setBusy(false)
    }
  }

  async function resend() {
    if (!session) return
    setError(null)
    setNotice(null)
    try {
      await webchatApi.resend(session.token)
      setNotice('verify_resent')
    } catch (err) {
      handleError(err)
    }
  }

  async function send() {
    const text = draft.trim()
    if (!text || !session) return
    setError(null)
    const tempId = `tmp-${Date.now()}`
    setMessages((cur) => [
      ...cur,
      {
        id: tempId,
        sender_type: 'customer',
        sender_name: null,
        message_type: 'text',
        message_text: text,
        created_at: new Date().toISOString(),
        pending: true,
      },
    ])
    setDraft('')
    try {
      const { message } = await webchatApi.send(session.token, text)
      // Realtime may have delivered the echo already — drop the temp either way.
      setMessages((cur) => mergeMessages(cur.filter((m) => m.id !== tempId), [message]))
      if (messages.filter((m) => m.sender_type === 'customer').length === 0) track('webchat_first_message')
    } catch (err) {
      setMessages((cur) => cur.filter((m) => m.id !== tempId))
      setDraft(text)
      handleError(err)
    }
  }

  function onComposerKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void send()
    }
  }

  // ── render ───────────────────────────────────────────────────────────────

  const firstName = (session?.name || name).trim().split(/\s+/)[0] || ''
  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', { hour: 'numeric', minute: '2-digit' }),
    [locale],
  )

  const inputCls =
    'w-full rounded-lg border border-cethos-border bg-white px-3 py-2.5 text-[15px] text-cethos-navy placeholder:text-slate-400 focus:border-cethos-teal focus:outline-none focus:ring-2 focus:ring-teal-100'

  return (
    <div
      role="dialog"
      aria-label={copy('header_title')}
      aria-hidden={!open}
      // z above <cethos-header> (fixed, z-index 9999; its mobile menu is 10000)
      className={`${open ? 'flex' : 'hidden'} fixed z-[10001] flex-col overflow-hidden bg-white inset-0 sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[600px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-cethos-border sm:shadow-medium`}
    >
      {/* Header */}
      <div className="flex items-start gap-3 bg-cethos-navy px-5 py-4 text-white">
        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold leading-tight text-white">{copy('header_title')}</p>
          <p className="mt-1 text-[12.5px] leading-snug text-slate-300">{copy('header_subtitle')}</p>
        </div>
        {phase === 'chat' && (
          <button
            type="button"
            onClick={() => resetToPrechat()}
            className="mt-0.5 shrink-0 rounded-md px-2 py-1 text-[12px] font-medium text-slate-300 hover:bg-white/10 hover:text-white"
          >
            {copy('end_chat')}
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={copy('launcher_close')}
          className="-mr-1 shrink-0 rounded-md p-1 text-slate-300 hover:bg-white/10 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {!hydrated ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-cethos-teal" aria-hidden="true" />
        </div>
      ) : phase === 'prechat' ? (
        /* ── Pre-chat form ─────────────────────────────────────────────── */
        <form onSubmit={startChat} className="flex flex-1 flex-col gap-3 overflow-y-auto p-5" noValidate>
          <p className="text-[14px] leading-relaxed text-cethos-gray">{copy('prechat_intro')}</p>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-cethos-navy">{copy('field_name')}</span>
            <input
              ref={(el) => {
                firstFieldRef.current = el
              }}
              className={inputCls}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              maxLength={100}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-cethos-navy">{copy('field_email')}</span>
            <input
              className={inputCls}
              type="email"
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              maxLength={254}
              required
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-cethos-navy">{copy('field_phone')}</span>
            <input
              className={inputCls}
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              maxLength={25}
              required
            />
          </label>
          {/* Honeypot — hidden from people, filled by bots. */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {copy(error)}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-cethos-teal px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {busy ? copy('starting') : copy('start_button')}
          </button>
          <p className="text-center text-[12px] text-slate-400">{copy('privacy_note')}</p>
        </form>
      ) : phase === 'verify' ? (
        /* ── Email code (existing customers) ───────────────────────────── */
        <form onSubmit={verify} className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">
          <p className="text-[17px] font-semibold text-cethos-navy">{copy('verify_title')}</p>
          <p className="text-[14px] leading-relaxed text-cethos-gray">
            {copy('verify_body', { email: session?.emailHint || session?.email || '' })}
          </p>
          <label className="block">
            <span className="mb-1 block text-[13px] font-medium text-cethos-navy">{copy('verify_code_label')}</span>
            <input
              ref={(el) => {
                firstFieldRef.current = el
              }}
              className={`${inputCls} text-center font-mono text-[22px] tracking-[0.4em]`}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
            />
          </label>
          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">
              {copy(error)}
            </p>
          )}
          {notice && <p className="rounded-lg bg-teal-50 px-3 py-2 text-[13px] text-teal-800">{copy(notice)}</p>}
          <button
            type="submit"
            disabled={busy || code.length !== 6}
            className="flex items-center justify-center gap-2 rounded-lg bg-cethos-teal px-4 py-3 text-[15px] font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {copy('verify_button')}
          </button>
          <div className="flex items-center justify-between text-[13px]">
            <button type="button" onClick={resend} className="font-medium text-cethos-teal hover:underline">
              {copy('verify_resend')}
            </button>
            <button type="button" onClick={() => resetToPrechat()} className="text-slate-500 hover:underline">
              {copy('verify_change_email')}
            </button>
          </div>
        </form>
      ) : (
        /* ── Chat ─────────────────────────────────────────────────────── */
        <>
          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-cethos-bg-light px-4 py-4" aria-live="polite">
            <div className="max-w-[85%]">
              <p className="mb-1 text-[11px] font-medium text-slate-500">{copy('staff_label')}</p>
              <div className="rounded-2xl rounded-tl-sm border border-cethos-border bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-cethos-navy">
                {copy('welcome_message', { name: firstName })}
              </div>
              <p className="mt-1.5 text-[11.5px] text-slate-400">
                {copy('offline_note', { email: session?.email || '' })}
              </p>
            </div>

            {messages.map((m) => {
              const mine = m.sender_type === 'customer'
              if (m.sender_type === 'system') {
                return (
                  <p key={m.id} className="text-center text-[12px] text-slate-500">
                    {m.message_text}
                  </p>
                )
              }
              return (
                <div key={m.id} className={`flex flex-col ${mine ? 'items-end' : 'items-start'}`}>
                  {!mine && (
                    <p className="mb-1 text-[11px] font-medium text-slate-500">
                      {m.sender_name ? `${m.sender_name} · ${copy('staff_label')}` : copy('staff_label')}
                    </p>
                  )}
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words px-3.5 py-2.5 text-[14.5px] leading-relaxed ${
                      mine
                        ? 'rounded-2xl rounded-tr-sm bg-cethos-teal text-white'
                        : 'rounded-2xl rounded-tl-sm border border-cethos-border bg-white text-cethos-navy'
                    } ${m.pending ? 'opacity-60' : ''}`}
                  >
                    {linkify(m.message_text || '')}
                  </div>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {m.pending ? copy('sending') : timeFmt.format(new Date(m.created_at))}
                  </p>
                </div>
              )
            })}
          </div>

          {error && (
            <p role="alert" className="border-t border-red-100 bg-red-50 px-4 py-2 text-[13px] text-red-700">
              {copy(error)}
            </p>
          )}

          <div className="flex items-end gap-2 border-t border-cethos-border bg-white p-3">
            <textarea
              ref={(el) => {
                firstFieldRef.current = el
              }}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onComposerKey}
              placeholder={copy('composer_placeholder')}
              aria-label={copy('composer_placeholder')}
              rows={1}
              maxLength={2000}
              className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-cethos-border px-3 py-2.5 text-[15px] text-cethos-navy placeholder:text-slate-400 focus:border-cethos-teal focus:outline-none focus:ring-2 focus:ring-teal-100"
            />
            <button
              type="button"
              onClick={() => void send()}
              disabled={!draft.trim()}
              aria-label={copy('send_button')}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cethos-teal text-white transition hover:bg-teal-700 disabled:opacity-40"
            >
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
