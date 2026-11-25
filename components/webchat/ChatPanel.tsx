'use client'

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { useLocale } from 'next-intl'
import {
  CheckCircle2,
  FileText,
  Loader2,
  Paperclip,
  Send,
  ThumbsDown,
  ThumbsUp,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import { useWebchatCopy } from './useWebchatCopy'
import { AgentAvatar } from './AgentAvatar'
import type { Agent, ChatMessage } from './api'
import type { Webchat } from './useWebchat'

const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]'"])/g
const EMAIL_RE = /^[^\s@*]+@[^\s@*]+\.[^\s@*]{2,}$/
const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,.gif,.heic,.heif,.doc,.docx,.xls,.xlsx,.txt'

interface Props {
  open: boolean
  onClose: () => void
  chat: Webchat
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

function fileSize(n: number): string {
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

const inputCls =
  'w-full rounded-lg border border-cethos-border bg-white px-3 py-2 text-[14.5px] text-cethos-navy placeholder:text-slate-400 focus:border-cethos-teal focus:outline-none focus:ring-2 focus:ring-teal-100'
const primaryBtn =
  'flex items-center justify-center gap-2 rounded-lg bg-cethos-teal px-4 py-2.5 text-[14.5px] font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60'

export default function ChatPanel({ open, onClose, chat }: Props) {
  const copy = useWebchatCopy()
  const locale = useLocale()
  const [draft, setDraft] = useState('')
  const [dragging, setDragging] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat(locale === 'fr' ? 'fr-CA' : 'en-CA', { hour: 'numeric', minute: '2-digit' }),
    [locale],
  )

  const c = chat.chat
  const closed = c?.status === 'closed'
  const showOffline = !c && !chat.team.online
  const visitorSent = chat.messages.some((m) => m.sender_type === 'visitor' && !m.pending)
  const askIdentify = !!c && !closed && visitorSent && !chat.visitor.email && !chat.identifySkipped

  // Keep the newest message in view.
  useEffect(() => {
    if (open && listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight
  }, [chat.messages, chat.agentTyping, askIdentify, closed, open])

  // Focus, Escape to close, lock page scroll on phones (full-screen panel).
  useEffect(() => {
    if (!open) return
    const id = window.setTimeout(() => composerRef.current?.focus(), 50)
    const onKey = (e: globalThis.KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    const lock = window.matchMedia('(max-width: 639px)').matches
    const prev = document.body.style.overflow
    if (lock) document.body.style.overflow = 'hidden'
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('keydown', onKey)
      if (lock) document.body.style.overflow = prev
    }
  }, [open, onClose])

  async function submit() {
    const text = draft
    if (!text.trim()) return
    setDraft('')
    if (composerRef.current) composerRef.current.style.height = ''
    const ok = await chat.send(text)
    if (!ok) setDraft(text)
  }

  function onComposerKey(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      void submit()
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault()
    setDragging(false)
    if (closed || showOffline) return
    const files = Array.from(e.dataTransfer.files || [])
    if (files.length) void chat.uploadFiles(files)
  }

  const headerAgents = c?.agent ? [c.agent] : chat.team.agents

  return (
    <div
      role="dialog"
      aria-label={copy('header_title')}
      aria-hidden={!open}
      onDragOver={(e) => {
        e.preventDefault()
        if (!closed && !showOffline) setDragging(true)
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragging(false)
      }}
      onDrop={onDrop}
      // z above <cethos-header> (fixed, z-index 9999; its mobile menu is 10000)
      className={`${open ? 'flex' : 'hidden'} fixed z-[10001] flex-col overflow-hidden bg-white inset-0 sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[620px] sm:max-h-[calc(100vh-8rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-cethos-border sm:shadow-medium`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 bg-cethos-navy px-4 py-3.5 text-white">
        <div className="flex -space-x-2">
          {(headerAgents.length ? headerAgents : [null]).slice(0, 3).map((a, i) => (
            <AgentAvatar key={i} agent={a} size={36} />
          ))}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-semibold leading-tight text-white">
            {c?.agent?.name || copy('header_title')}
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12px] leading-snug text-slate-300">
            <span
              className={`inline-block h-2 w-2 shrink-0 rounded-full ${chat.team.online ? 'bg-green-400' : 'bg-slate-400'}`}
              aria-hidden="true"
            />
            <span className="truncate">{chat.team.online ? copy('status_online') : copy('status_away')}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={chat.toggleMute}
          aria-label={chat.muted ? copy('unmute') : copy('mute')}
          title={chat.muted ? copy('unmute') : copy('mute')}
          className="shrink-0 rounded-md p-1.5 text-slate-300 hover:bg-white/10 hover:text-white"
        >
          {chat.muted ? <VolumeX className="h-4 w-4" aria-hidden="true" /> : <Volume2 className="h-4 w-4" aria-hidden="true" />}
        </button>
        {c && !closed && (
          <button
            type="button"
            onClick={() => void chat.endChat()}
            className="shrink-0 rounded-md px-2 py-1 text-[12px] font-medium text-slate-300 hover:bg-white/10 hover:text-white"
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

      {showOffline ? (
        <OfflineForm chat={chat} />
      ) : (
        <>
          <div ref={listRef} className="relative flex-1 space-y-3 overflow-y-auto bg-cethos-bg-light px-4 py-4" aria-live="polite">
            {/* Welcome from the team */}
            <StaffBubble agent={c?.agent ?? chat.team.agents[0] ?? null} label={copy('staff_label')}>
              {copy('welcome')}
            </StaffBubble>

            {chat.messages.map((m) => (
              <MessageRow key={m.id} m={m} time={timeFmt.format(new Date(m.created_at))} copy={copy} />
            ))}

            {chat.agentTyping !== null && (
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <span className="flex gap-0.5" aria-hidden="true">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
                {copy('typing', { name: chat.agentTyping || copy('staff_label') })}
              </div>
            )}

            {askIdentify && <IdentifyCard chat={chat} />}
            {closed && <EndedCard chat={chat} />}

            {dragging && (
              <div className="pointer-events-none absolute inset-2 flex items-center justify-center rounded-xl border-2 border-dashed border-cethos-teal bg-white/90 text-[14px] font-semibold text-cethos-teal">
                {copy('drop_files')}
              </div>
            )}
          </div>

          {chat.error && (
            <p role="alert" className="flex items-start gap-2 border-t border-red-100 bg-red-50 px-4 py-2 text-[13px] text-red-700">
              <span className="flex-1">{copy(chat.error)}</span>
              <button type="button" onClick={() => chat.setError(null)} aria-label="×" className="text-red-400 hover:text-red-600">
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </p>
          )}

          {!closed && (
            <div className="flex items-end gap-1.5 border-t border-cethos-border bg-white p-3">
              <input
                ref={fileRef}
                type="file"
                multiple
                accept={ACCEPT}
                className="hidden"
                onChange={(e) => {
                  const files = Array.from(e.target.files || [])
                  e.target.value = ''
                  if (files.length) void chat.uploadFiles(files)
                }}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                aria-label={copy('attach_file')}
                title={copy('attach_file')}
                className="flex h-11 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-cethos-navy"
              >
                <Paperclip className="h-5 w-5" aria-hidden="true" />
              </button>
              <textarea
                ref={composerRef}
                value={draft}
                onChange={(e) => {
                  setDraft(e.target.value)
                  chat.sendTyping(e.target.value)
                  e.target.style.height = 'auto'
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 128)}px`
                }}
                onKeyDown={onComposerKey}
                placeholder={copy('composer_placeholder')}
                aria-label={copy('composer_placeholder')}
                rows={1}
                maxLength={2000}
                className="max-h-32 min-h-[44px] flex-1 resize-none rounded-xl border border-cethos-border px-3 py-2.5 text-[15px] text-cethos-navy placeholder:text-slate-400 focus:border-cethos-teal focus:outline-none focus:ring-2 focus:ring-teal-100"
              />
              <button
                type="button"
                onClick={() => void submit()}
                disabled={!draft.trim()}
                aria-label={copy('send_button')}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cethos-teal text-white transition hover:bg-teal-700 disabled:opacity-40"
              >
                <Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// ── pieces ──────────────────────────────────────────────────────────────────

type Copy = ReturnType<typeof useWebchatCopy>

function StaffBubble({ agent, label, children }: { agent: Agent | null; label: string; children: ReactNode }) {
  return (
    <div className="flex items-end gap-2">
      <AgentAvatar agent={agent} size={28} />
      <div className="max-w-[80%]">
        <p className="mb-1 text-[11px] font-medium text-slate-500">{agent?.name ? `${agent.name} · ${label}` : label}</p>
        <div className="rounded-2xl rounded-bl-sm border border-cethos-border bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-cethos-navy">
          {children}
        </div>
      </div>
    </div>
  )
}

function Attachments({ m, mine }: { m: ChatMessage; mine: boolean }) {
  if (!m.attachments.length) return null
  return (
    <div className="mt-1 space-y-1.5">
      {m.attachments.map((a, i) =>
        a.mime.startsWith('image/') && a.url ? (
          <a key={i} href={a.url} target="_blank" rel="noopener noreferrer" className="block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.url} alt={a.name} className="max-h-48 max-w-[220px] rounded-xl border border-cethos-border object-cover" />
          </a>
        ) : (
          <a
            key={i}
            href={a.url || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex max-w-[240px] items-center gap-2 rounded-xl px-3 py-2 text-[13px] ${
              mine ? 'bg-teal-700/90 text-white' : 'border border-cethos-border bg-white text-cethos-navy'
            } ${a.url ? 'hover:underline' : 'pointer-events-none'}`}
          >
            {m.pending ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" /> : <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />}
            <span className="min-w-0 flex-1 truncate">{a.name}</span>
            <span className="shrink-0 text-[11px] opacity-70">{fileSize(a.size)}</span>
          </a>
        ),
      )}
    </div>
  )
}

function MessageRow({ m, time, copy }: { m: ChatMessage; time: string; copy: Copy }) {
  if (m.sender_type === 'system') {
    if (m.body.startsWith('Transcript emailed')) return null
    return <p className="text-center text-[11.5px] text-slate-400">{m.body}</p>
  }
  const mine = m.sender_type === 'visitor'
  const pendingLabel = m.attachments.length ? copy('uploading') : copy('sending')
  if (!mine) {
    return (
      <div className="flex items-end gap-2">
        <AgentAvatar agent={{ name: m.sender_name, avatar: m.sender_avatar }} size={28} />
        <div className="max-w-[80%]">
          <p className="mb-1 text-[11px] font-medium text-slate-500">
            {m.sender_name ? `${m.sender_name} · ${copy('staff_label')}` : copy('staff_label')}
          </p>
          {m.body && (
            <div className="whitespace-pre-wrap break-words rounded-2xl rounded-bl-sm border border-cethos-border bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-cethos-navy">
              {linkify(m.body)}
            </div>
          )}
          <Attachments m={m} mine={false} />
          <p className="mt-1 text-[11px] text-slate-400">{time}</p>
        </div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-end">
      {m.body && (
        <div
          className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-sm bg-cethos-teal px-3.5 py-2.5 text-[14.5px] leading-relaxed text-white ${
            m.pending ? 'opacity-60' : ''
          }`}
        >
          {linkify(m.body)}
        </div>
      )}
      <Attachments m={m} mine />
      <p className="mt-1 text-[11px] text-slate-400">{m.pending ? pendingLabel : time}</p>
    </div>
  )
}

function IdentifyCard({ chat }: { chat: Webchat }) {
  const copy = useWebchatCopy()
  const [name, setName] = useState(chat.visitor.name || '')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)

  async function save(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) return chat.setError('error_invalid_email')
    setBusy(true)
    await chat.identify({ name: name.trim() || undefined, email: email.trim(), phone: phone.trim() || undefined })
    setBusy(false)
  }

  return (
    <form onSubmit={save} className="space-y-2 rounded-xl border border-teal-200 bg-white p-3.5 shadow-sm">
      <p className="text-[14px] font-semibold text-cethos-navy">{copy('identify_title')}</p>
      <p className="text-[12.5px] leading-snug text-cethos-gray">{copy('identify_body')}</p>
      <input className={inputCls} placeholder={copy('field_name')} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} />
      <input className={inputCls} placeholder={copy('field_email')} type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={200} required />
      <input className={inputCls} placeholder={copy('field_phone_optional')} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" maxLength={25} />
      <div className="flex items-center gap-2 pt-1">
        <button type="submit" disabled={busy} className={`${primaryBtn} flex-1`}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {copy('identify_save')}
        </button>
        <button type="button" onClick={chat.skipIdentify} className="rounded-lg px-3 py-2.5 text-[13.5px] font-medium text-slate-500 hover:bg-slate-100">
          {copy('identify_skip')}
        </button>
      </div>
      <p className="text-[11.5px] text-slate-400">{copy('privacy_note')}</p>
    </form>
  )
}

function EndedCard({ chat }: { chat: Webchat }) {
  const copy = useWebchatCopy()
  const [rating, setRating] = useState<'up' | 'down' | null>(chat.chat?.rating ?? null)
  const [comment, setComment] = useState('')
  const [rated, setRated] = useState(!!chat.chat?.rating)
  const [email, setEmail] = useState(chat.visitor.email || '')
  const [sentTo, setSentTo] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  async function sendRating() {
    if (!rating) return
    setBusy(true)
    if (await chat.rate(rating, comment.trim())) setRated(true)
    setBusy(false)
  }

  async function sendTranscript(e: FormEvent) {
    e.preventDefault()
    if (!EMAIL_RE.test(email.trim())) return chat.setError('error_invalid_email')
    setBusy(true)
    if (await chat.transcript(email.trim())) setSentTo(email.trim())
    setBusy(false)
  }

  return (
    <div className="space-y-3 rounded-xl border border-cethos-border bg-white p-3.5">
      <p className="text-center text-[12.5px] text-slate-500">{copy('chat_ended')}</p>

      {rated ? (
        <p className="flex items-center justify-center gap-1.5 text-[13.5px] font-medium text-teal-700">
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> {copy('rate_thanks')}
        </p>
      ) : (
        <div className="space-y-2">
          <p className="text-center text-[14px] font-semibold text-cethos-navy">{copy('rate_title')}</p>
          <div className="flex justify-center gap-3">
            {(['up', 'down'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                aria-pressed={rating === r}
                aria-label={r === 'up' ? copy('rate_good') : copy('rate_bad')}
                className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition ${
                  rating === r
                    ? r === 'up'
                      ? 'border-green-500 bg-green-50 text-green-600'
                      : 'border-red-400 bg-red-50 text-red-500'
                    : 'border-cethos-border text-slate-400 hover:text-cethos-navy'
                }`}
              >
                {r === 'up' ? <ThumbsUp className="h-5 w-5" aria-hidden="true" /> : <ThumbsDown className="h-5 w-5" aria-hidden="true" />}
              </button>
            ))}
          </div>
          {rating && (
            <>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={copy('rate_comment')}
                rows={2}
                maxLength={1000}
                className={`${inputCls} resize-none`}
              />
              <button type="button" onClick={() => void sendRating()} disabled={busy} className={`${primaryBtn} w-full`}>
                {copy('rate_submit')}
              </button>
            </>
          )}
        </div>
      )}

      <div className="border-t border-cethos-border pt-3">
        {sentTo ? (
          <p className="text-center text-[13px] text-teal-700">{copy('transcript_sent', { email: sentTo })}</p>
        ) : (
          <form onSubmit={sendTranscript} className="space-y-2">
            <p className="text-[13px] font-medium text-cethos-navy">{copy('transcript_title')}</p>
            <div className="flex gap-2">
              <input className={inputCls} type="email" inputMode="email" placeholder={copy('field_email')} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={200} />
              <button type="submit" disabled={busy} className="shrink-0 rounded-lg border border-cethos-teal px-3 text-[13.5px] font-semibold text-cethos-teal hover:bg-teal-50 disabled:opacity-60">
                {copy('transcript_send')}
              </button>
            </div>
          </form>
        )}
      </div>

      <button type="button" onClick={chat.newChat} className={`${primaryBtn} w-full`}>
        {copy('new_chat')}
      </button>
    </div>
  )
}

function OfflineForm({ chat }: { chat: Webchat }) {
  const copy = useWebchatCopy()
  const [name, setName] = useState(chat.visitor.name || '')
  const [email, setEmail] = useState(chat.visitor.email || '')
  const [phone, setPhone] = useState(chat.visitor.phone || '')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [sent, setSent] = useState<string | null>(null)

  async function submit(e: FormEvent) {
    e.preventDefault()
    chat.setError(null)
    if (name.trim().length < 2) return chat.setError('error_invalid_name')
    if (!EMAIL_RE.test(email.trim())) return chat.setError('error_invalid_email')
    if (!message.trim()) return
    setBusy(true)
    const ok = await chat.leaveMessage({ name: name.trim(), email: email.trim(), phone: phone.trim(), message: message.trim() })
    setBusy(false)
    if (ok) setSent(email.trim())
  }

  if (sent) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6 text-center">
        <CheckCircle2 className="h-10 w-10 text-teal-600" aria-hidden="true" />
        <p className="text-[17px] font-semibold text-cethos-navy">{copy('offline_sent_title')}</p>
        <p className="text-[14px] text-cethos-gray">{copy('offline_sent_body', { email: sent })}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-1 flex-col gap-2.5 overflow-y-auto p-5" noValidate>
      <p className="text-[16px] font-semibold text-cethos-navy">{copy('offline_title')}</p>
      <p className="text-[13.5px] leading-relaxed text-cethos-gray">{copy('offline_body')}</p>
      <input className={inputCls} placeholder={copy('field_name')} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" maxLength={120} />
      <input className={inputCls} placeholder={copy('field_email')} type="email" inputMode="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" maxLength={200} />
      <input className={inputCls} placeholder={copy('field_phone_optional')} type="tel" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" maxLength={25} />
      <textarea className={`${inputCls} min-h-[110px] resize-y`} placeholder={copy('field_message')} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} />
      {chat.error && (
        <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] text-red-700">
          {copy(chat.error)}
        </p>
      )}
      <button type="submit" disabled={busy || !message.trim()} className={`${primaryBtn} mt-1`}>
        {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
        {copy('offline_send')}
      </button>
      <p className="text-center text-[11.5px] text-slate-400">{copy('privacy_note')}</p>
    </form>
  )
}
