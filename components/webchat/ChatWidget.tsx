'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useWebchatCopy } from './useWebchatCopy'
import { useWebchat } from './useWebchat'
import { readFlag, writeFlag } from './api'
import { AgentAvatar } from './AgentAvatar'

// The panel UI only loads once a visitor opens the chat.
const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false })

const GREETED_KEY = 'cethos_webchat_greeted'

/**
 * Site-wide live chat for cethos.com (Tawk.to-style, website chat v2).
 * Mounted in app/[locale]/layout.tsx inside NextIntlClientProvider. Chats are
 * answered in the Cethos Chat app (portal.cethos.com/chat).
 */
export default function ChatWidget() {
  const copy = useWebchatCopy()
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [greeting, setGreeting] = useState(false)
  const chat = useWebchat(open)

  const openChat = useCallback(() => {
    setLoaded(true)
    setOpen(true)
    setGreeting(false)
  }, [])
  const closeChat = useCallback(() => setOpen(false), [])

  // Proactive greeting: once per browser session, after N seconds on the
  // site, only if there's no chat yet (settings in Cethos Chat).
  useEffect(() => {
    const s = chat.settings
    if (!chat.ready || !s?.greeting_enabled || !s.greeting || chat.chat || open) return
    if (readFlag(GREETED_KEY, true)) return
    const t = window.setTimeout(() => {
      setGreeting(true)
      writeFlag(GREETED_KEY, '1', true)
    }, Math.max(3, s.greeting_delay_s) * 1000)
    return () => window.clearTimeout(t)
  }, [chat.ready, chat.settings, chat.chat, open])

  useEffect(() => {
    if (open || chat.chat) setGreeting(false)
  }, [open, chat.chat])

  if (!chat.ready || chat.banned) return null

  const bubbleText = !open && chat.previewText ? chat.previewText : greeting ? chat.settings?.greeting : null
  const bubbleAgent = chat.chat?.agent ?? chat.team.agents[0] ?? null

  return (
    <>
      {loaded && <ChatPanel open={open} onClose={closeChat} chat={chat} />}

      {bubbleText && !open && (
        <div className="fixed right-4 bottom-[160px] md:right-6 md:bottom-[96px] z-[60] flex max-w-[300px] items-start gap-2">
          <button
            type="button"
            onClick={openChat}
            className="flex items-start gap-2.5 rounded-2xl rounded-br-sm border border-cethos-border bg-white px-3.5 py-3 text-left shadow-medium transition hover:shadow-lg"
          >
            <AgentAvatar agent={bubbleAgent} size={32} />
            <span className="min-w-0">
              <span className="block text-[12px] font-semibold text-cethos-navy">
                {bubbleAgent?.name || copy('staff_label')}
              </span>
              <span className="mt-0.5 line-clamp-3 block text-[14px] leading-snug text-cethos-gray">{bubbleText}</span>
            </span>
          </button>
          {greeting && !chat.previewText && (
            <button
              type="button"
              onClick={() => setGreeting(false)}
              aria-label={copy('greeting_close')}
              className="-ml-1 mt-1 rounded-full bg-white p-1 text-slate-400 shadow hover:text-slate-600"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={open ? closeChat : openChat}
        aria-label={open ? copy('launcher_close') : copy('launcher_open')}
        aria-expanded={open}
        className={`fixed right-4 bottom-[88px] md:right-6 md:bottom-6 z-[60] items-center justify-center gap-2 rounded-full bg-cethos-teal text-white shadow-medium transition hover:bg-teal-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-200 h-14 min-w-14 px-4 md:px-5 ${
          open ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6" aria-hidden="true" />
            <span className="hidden md:inline text-[15px] font-semibold">{copy('launcher_open')}</span>
          </>
        )}
        {!open && chat.team.online && chat.unread === 0 && (
          <span className="absolute right-0.5 top-0.5 h-3.5 w-3.5 rounded-full bg-green-400 ring-2 ring-white" aria-hidden="true" />
        )}
        {!open && chat.unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
            {chat.unread > 9 ? '9+' : chat.unread}
          </span>
        )}
      </button>
    </>
  )
}
