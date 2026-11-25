'use client'

// State + actions for the cethos.com chat bubble (website chat v2).
//
// Every page: `hello` once (creates/recognises the visitor), then a `ping`
// every 60 s while the tab is visible and on each route change — this feeds
// Live visitors in Cethos Chat and delivers proactive chats started by an
// agent. Only once the visitor has a chat do we open a Realtime channel
// (`webchat:<topic>`) for replies, status changes and typing indicators.

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import type { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js'
import {
  loadToken,
  mergeMessages,
  playDing,
  readFlag,
  saveToken,
  webchatApi,
  WebchatError,
  writeFlag,
  type ChatInfo,
  type ChatMessage,
  type HelloResult,
  type Team,
  type VisitorInfo,
} from './api'
import { errorKey, type WebchatKey } from './strings'

const PING_MS = 60_000
const FALLBACK_POLL_MS = 10_000
const MAX_FILE_BYTES = 10 * 1024 * 1024
const MUTE_KEY = 'cethos_webchat_muted'
const GEO_KEY = 'cethos_webchat_geo'

// window.dataLayer is declared globally in lib/tracking.ts.
function track(event: string, data: Record<string, unknown> = {}) {
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event, ...data })
  } catch {
    /* analytics must never break chat */
  }
}

async function getGeo(): Promise<Record<string, string> | null> {
  const cached = readFlag(GEO_KEY, true)
  if (cached) {
    try {
      return JSON.parse(cached)
    } catch {
      /* refetch */
    }
  }
  try {
    const ctl = new AbortController()
    const t = window.setTimeout(() => ctl.abort(), 1500)
    const r = await fetch('/api/webchat/geo', { signal: ctl.signal })
    window.clearTimeout(t)
    if (!r.ok) return null
    const geo = await r.json()
    writeFlag(GEO_KEY, JSON.stringify(geo), true)
    return geo
  } catch {
    return null
  }
}

function pageInfo() {
  return { url: window.location.href.slice(0, 500), title: document.title.slice(0, 200) }
}

function preview(m: ChatMessage): string {
  return m.body || (m.attachments[0] ? `📎 ${m.attachments[0].name}` : '')
}

export type Webchat = ReturnType<typeof useWebchat>

export function useWebchat(open: boolean) {
  const locale = useLocale()
  const pathname = usePathname()

  const [ready, setReady] = useState(false)
  const [banned, setBanned] = useState(false)
  const [topic, setTopic] = useState<string | null>(null)
  const [visitor, setVisitor] = useState<VisitorInfo>({ name: null, email: null, phone: null })
  const [team, setTeam] = useState<Team>({ online: false, agents: [] })
  const [settings, setSettings] = useState<HelloResult['settings'] | null>(null)
  const [chat, setChat] = useState<ChatInfo | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [unread, setUnread] = useState(0)
  const [previewText, setPreviewText] = useState<string | null>(null)
  const [agentTyping, setAgentTyping] = useState<string | null>(null)
  const [realtimeOk, setRealtimeOk] = useState(false)
  const [error, setError] = useState<WebchatKey | null>(null)
  const [muted, setMuted] = useState(false)

  const tokenRef = useRef<string | null>(null)
  const openRef = useRef(open)
  openRef.current = open
  const chatRef = useRef(chat)
  chatRef.current = chat
  const messagesRef = useRef(messages)
  messagesRef.current = messages
  const mutedRef = useRef(muted)
  mutedRef.current = muted
  const channelRef = useRef<RealtimeChannel | null>(null)
  const typingTimer = useRef<number | null>(null)
  const typingSendTimer = useRef<number | null>(null)

  const lastServerTs = useCallback(() => {
    const list = messagesRef.current
    for (let i = list.length - 1; i >= 0; i--) if (!list[i].pending) return list[i].created_at
    return undefined
  }, [])

  const fail = useCallback((e: unknown) => {
    setError(errorKey(e instanceof WebchatError ? e.code : undefined))
  }, [])

  // ── incoming ─────────────────────────────────────────────────────────────

  const onIncoming = useCallback((last: ChatMessage) => {
    if (!mutedRef.current && (!openRef.current || document.visibilityState !== 'visible')) playDing()
    if (!openRef.current) {
      setUnread((n) => n + 1)
      setPreviewText(preview(last))
    } else if (tokenRef.current && chatRef.current) {
      void webchatApi.history(tokenRef.current, chatRef.current.id, lastServerTs(), true).catch(() => undefined)
    }
  }, [lastServerTs])

  const ingest = useCallback(
    (incoming: ChatMessage[], notify: boolean) => {
      if (!incoming.length) return
      const known = new Set(messagesRef.current.map((m) => m.id))
      const fresh = incoming.filter((m) => !known.has(m.id) && m.sender_type === 'staff')
      setMessages((cur) => mergeMessages(cur, incoming))
      if (fresh.length) {
        setAgentTyping(null)
        if (notify) onIncoming(fresh[fresh.length - 1])
        // Broadcast copies have no signed file URLs — fetch them.
        if (fresh.some((m) => m.attachments.some((a) => !a.url)) && tokenRef.current && chatRef.current) {
          void webchatApi
            .history(tokenRef.current, chatRef.current.id)
            .then((r) => setMessages((cur) => mergeMessages(cur, r.messages)))
            .catch(() => undefined)
        }
      }
    },
    [onIncoming],
  )

  const loadChat = useCallback(
    async (chatId: string, notify: boolean) => {
      if (!tokenRef.current) return
      const r = await webchatApi.history(tokenRef.current, chatId, undefined, openRef.current)
      setChat(r.chat)
      const before = new Set(messagesRef.current.map((m) => m.id))
      setMessages(r.messages)
      const fresh = r.messages.filter((m) => m.sender_type === 'staff' && !before.has(m.id))
      if (notify && fresh.length) onIncoming(fresh[fresh.length - 1])
    },
    [onIncoming],
  )

  // ── hello (once) ─────────────────────────────────────────────────────────

  useEffect(() => {
    let cancelled = false
    setMuted(readFlag(MUTE_KEY) === '1')
    ;(async () => {
      const geo = await getGeo()
      const run = (token: string | null) =>
        webchatApi.hello({ token, ...pageInfo(), referrer: document.referrer.slice(0, 500), locale, geo })
      let r: HelloResult
      try {
        r = await run(loadToken())
      } catch {
        return // chat unavailable — the launcher stays hidden
      }
      if (cancelled) return
      if (r.banned) return setBanned(true)
      if (r.token) saveToken(r.token)
      // No new token means the stored one was recognised.
      tokenRef.current = r.token ?? loadToken()
      setTopic(r.topic)
      setVisitor(r.visitor)
      setTeam(r.team)
      setSettings(r.settings)
      setChat(r.chat)
      setMessages(r.messages)
      // Returning visitor with an open chat whose last word is from staff: badge it.
      const last = r.messages[r.messages.length - 1]
      if (r.chat && r.chat.status !== 'closed' && last?.sender_type === 'staff') {
        setUnread(1)
        setPreviewText(preview(last))
      }
      setReady(true)
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── ping: heartbeat, page tracking, proactive chats ──────────────────────

  const ping = useCallback(async () => {
    const token = tokenRef.current
    if (!token || document.visibilityState !== 'visible') return
    const { url, title } = pageInfo()
    try {
      const r = await webchatApi.ping(token, url, title)
      setTeam(r.team)
      const cur = chatRef.current
      if (r.chat_id && r.chat_id !== cur?.id) {
        await loadChat(r.chat_id, true) // new chat (e.g. an agent started one)
      } else if (cur && r.chat_id === cur.id && r.chat_status && r.chat_status !== cur.status) {
        setChat({ ...cur, status: r.chat_status })
      }
    } catch (e) {
      if (e instanceof WebchatError && e.code === 'banned') setBanned(true)
    }
  }, [loadChat])

  useEffect(() => {
    if (!ready) return
    const id = window.setInterval(ping, PING_MS)
    const onVisible = () => document.visibilityState === 'visible' && void ping()
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [ready, ping])

  // Route change → report the new page (after the title updates).
  const firstPath = useRef(true)
  useEffect(() => {
    if (!ready) return
    if (firstPath.current) {
      firstPath.current = false
      return
    }
    const t = window.setTimeout(ping, 800)
    return () => window.clearTimeout(t)
  }, [pathname, ready, ping])

  // ── Realtime (only once the visitor has a chat) ──────────────────────────

  const hasChat = !!chat
  useEffect(() => {
    if (!topic || !hasChat) return
    let client: SupabaseClient | null = null
    let channel: RealtimeChannel | null = null
    let disposed = false
    import('@/lib/supabase').then(({ createBrowserSupabaseClient }) => {
      if (disposed) return
      client = createBrowserSupabaseClient()
      if (!client) return
      channel = client
        .channel(`webchat:${topic}`, { config: { broadcast: { self: false } } })
        .on('broadcast', { event: 'message' }, ({ payload }) => {
          const m = payload as ChatMessage
          const cur = chatRef.current
          if (cur && m.chat_id !== cur.id) {
            void loadChat(m.chat_id, true)
            return
          }
          ingest([m], true)
        })
        .on('broadcast', { event: 'chat' }, ({ payload }) => {
          const p = payload as { chat_id: string; status: ChatInfo['status']; agent_name: string | null; agent_avatar: string | null }
          setChat((c) =>
            c && c.id === p.chat_id
              ? { ...c, status: p.status, agent: p.agent_name ? { name: p.agent_name, avatar: p.agent_avatar } : c.agent }
              : c,
          )
        })
        .on('broadcast', { event: 'typing' }, ({ payload }) => {
          const p = payload as { sender: string; name?: string; typing?: boolean }
          if (p.sender !== 'staff') return
          if (typingTimer.current) window.clearTimeout(typingTimer.current)
          if (p.typing === false) return setAgentTyping(null)
          setAgentTyping(p.name || '')
          typingTimer.current = window.setTimeout(() => setAgentTyping(null), 6000)
        })
        .subscribe((status) => setRealtimeOk(status === 'SUBSCRIBED'))
      channelRef.current = channel
    })
    return () => {
      disposed = true
      setRealtimeOk(false)
      channelRef.current = null
      if (client && channel) client.removeChannel(channel)
    }
  }, [topic, hasChat, ingest, loadChat])

  // Fallback polling while the panel is open and Realtime is down.
  useEffect(() => {
    if (!open || !chat || realtimeOk) return
    const id = window.setInterval(() => {
      if (!tokenRef.current || !chatRef.current) return
      webchatApi
        .history(tokenRef.current, chatRef.current.id, lastServerTs(), true)
        .then((r) => {
          ingest(r.messages, false)
          setChat(r.chat)
        })
        .catch(() => undefined)
    }, FALLBACK_POLL_MS)
    return () => window.clearInterval(id)
  }, [open, chat, realtimeOk, ingest, lastServerTs])

  // Opening the panel clears the badge and marks staff messages read.
  useEffect(() => {
    if (!open) return
    setUnread(0)
    setPreviewText(null)
    const c = chatRef.current
    if (c && tokenRef.current) {
      webchatApi
        .history(tokenRef.current, c.id, undefined, true)
        .then((r) => {
          setMessages((cur) => mergeMessages(cur, r.messages))
          setChat(r.chat)
        })
        .catch(() => undefined)
    }
  }, [open])

  // ── actions ──────────────────────────────────────────────────────────────

  const sendTyping = useCallback((draft: string) => {
    if (typingSendTimer.current) window.clearTimeout(typingSendTimer.current)
    typingSendTimer.current = window.setTimeout(() => {
      channelRef.current
        ?.send({ type: 'broadcast', event: 'typing', payload: { sender: 'visitor', draft: draft.slice(0, 500) } })
        .catch(() => undefined)
    }, 400)
  }, [])

  const send = useCallback(
    async (text: string) => {
      const token = tokenRef.current
      const body = text.trim()
      if (!token || !body) return false
      setError(null)
      const tempId = `tmp-${Date.now()}`
      setMessages((cur) => [
        ...cur,
        {
          id: tempId,
          chat_id: chatRef.current?.id ?? '',
          sender_type: 'visitor',
          sender_name: null,
          sender_avatar: null,
          body,
          attachments: [],
          created_at: new Date().toISOString(),
          pending: true,
        },
      ])
      try {
        const first = !chatRef.current
        const r = await webchatApi.send(token, body)
        if (first || chatRef.current?.id !== r.chat_id) {
          setChat({ id: r.chat_id, status: 'open', rating: null, agent: null })
          track('webchat_started')
        }
        setMessages((cur) => mergeMessages(cur.filter((m) => m.id !== tempId), [r.message]))
        sendTyping('')
        return true
      } catch (e) {
        setMessages((cur) => cur.filter((m) => m.id !== tempId))
        fail(e)
        return false
      }
    },
    [fail, sendTyping],
  )

  const uploadFiles = useCallback(
    async (files: File[]) => {
      const token = tokenRef.current
      if (!token) return
      setError(null)
      for (const file of files) {
        if (file.size > MAX_FILE_BYTES) {
          setError('error_file_too_large')
          continue
        }
        const tempId = `tmp-${Date.now()}-${file.name}`
        setMessages((cur) => [
          ...cur,
          {
            id: tempId,
            chat_id: chatRef.current?.id ?? '',
            sender_type: 'visitor',
            sender_name: null,
            sender_avatar: null,
            body: '',
            attachments: [{ name: file.name, mime: file.type, size: file.size, url: null }],
            created_at: new Date().toISOString(),
            pending: true,
          },
        ])
        try {
          const r = await webchatApi.upload(token, file, '')
          if (!chatRef.current || chatRef.current.id !== r.chat_id) {
            setChat({ id: r.chat_id, status: 'open', rating: null, agent: null })
          }
          setMessages((cur) => mergeMessages(cur.filter((m) => m.id !== tempId), [r.message]))
          track('webchat_file_sent')
        } catch (e) {
          setMessages((cur) => cur.filter((m) => m.id !== tempId))
          fail(e)
        }
      }
    },
    [fail],
  )

  const identify = useCallback(
    async (p: { name?: string; email?: string; phone?: string }) => {
      if (!tokenRef.current) return false
      setError(null)
      try {
        const r = await webchatApi.identify(tokenRef.current, p)
        setVisitor(r.visitor)
        track('webchat_identified')
        return true
      } catch (e) {
        fail(e)
        return false
      }
    },
    [fail],
  )

  const endChat = useCallback(async () => {
    const c = chatRef.current
    if (!tokenRef.current || !c) return
    try {
      await webchatApi.end(tokenRef.current, c.id)
      setChat({ ...c, status: 'closed' })
    } catch (e) {
      fail(e)
    }
  }, [fail])

  const rate = useCallback(
    async (rating: 'up' | 'down', comment: string) => {
      const c = chatRef.current
      if (!tokenRef.current || !c) return false
      try {
        await webchatApi.rate(tokenRef.current, c.id, rating, comment)
        setChat({ ...c, rating })
        track('webchat_rated', { webchat_rating: rating })
        return true
      } catch (e) {
        fail(e)
        return false
      }
    },
    [fail],
  )

  const transcript = useCallback(
    async (email: string) => {
      const c = chatRef.current
      if (!tokenRef.current || !c) return false
      setError(null)
      try {
        await webchatApi.transcript(tokenRef.current, c.id, email)
        setVisitor((v) => ({ ...v, email: email.trim().toLowerCase() }))
        return true
      } catch (e) {
        fail(e)
        return false
      }
    },
    [fail],
  )

  const leaveMessage = useCallback(
    async (p: { name: string; email: string; phone: string; message: string }) => {
      if (!tokenRef.current) return false
      setError(null)
      try {
        await webchatApi.offline(tokenRef.current, p)
        setVisitor({ name: p.name, email: p.email.trim().toLowerCase(), phone: p.phone || null })
        track('webchat_offline_message')
        return true
      } catch (e) {
        fail(e)
        return false
      }
    },
    [fail],
  )

  const newChat = useCallback(() => {
    setChat(null)
    setMessages([])
    setError(null)
  }, [])

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      writeFlag(MUTE_KEY, m ? null : '1')
      return !m
    })
  }, [])

  return {
    ready,
    banned,
    visitor,
    team,
    settings,
    chat,
    messages,
    unread,
    previewText,
    agentTyping,
    error,
    setError,
    muted,
    send,
    sendTyping,
    uploadFiles,
    identify,
    endChat,
    rate,
    transcript,
    leaveMessage,
    newChat,
    toggleMute,
  }
}
