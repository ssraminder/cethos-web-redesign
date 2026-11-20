'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { useWebchatCopy } from './useWebchatCopy'
import { loadStoredSession } from './api'

// The panel (and supabase-js for Realtime) only loads once a visitor opens
// the chat or already has a session — keeps it off every page's critical path.
const ChatPanel = dynamic(() => import('./ChatPanel'), { ssr: false })

/**
 * Site-wide live-chat launcher for cethos.com. Mounted in
 * app/[locale]/layout.tsx inside NextIntlClientProvider. Replaces Tawk.to;
 * chats land in the portal inbox at /admin/messages.
 */
export default function ChatWidget() {
  const copy = useWebchatCopy()
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    // Returning visitor with a live chat: load the panel in the background so
    // staff replies arrive (and badge the launcher) even before they open it.
    if (loadStoredSession()?.status === 'active') setLoaded(true)
  }, [])

  const openChat = useCallback(() => {
    setLoaded(true)
    setOpen(true)
    setUnread(0)
  }, [])

  const closeChat = useCallback(() => setOpen(false), [])
  const bumpUnread = useCallback(() => setUnread((n) => n + 1), [])

  return (
    <>
      {loaded && <ChatPanel open={open} onClose={closeChat} onUnread={bumpUnread} />}

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
        {!open && unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>
    </>
  )
}
