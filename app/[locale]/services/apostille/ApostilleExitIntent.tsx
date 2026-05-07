'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { trackConsultEvent } from '@/lib/tracking'

interface ApostilleExitIntentProps {
  onConsultClick: () => void
  hasInteracted: boolean
}

const SESSION_FIRED_KEY = 'cethos_apostille_exit_intent_fired'
const MIN_TIME_ON_PAGE_MS = 30_000

export function ApostilleExitIntent({ onConsultClick, hasInteracted }: ApostilleExitIntentProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(max-width: 768px)').matches) return
    if (sessionStorage.getItem(SESSION_FIRED_KEY) === '1') return

    const startedAt = Date.now()

    function onMouseLeave(e: MouseEvent) {
      if (e.clientY > 0) return
      if (Date.now() - startedAt < MIN_TIME_ON_PAGE_MS) return
      if (hasInteracted) return
      if (sessionStorage.getItem(SESSION_FIRED_KEY) === '1') return

      sessionStorage.setItem(SESSION_FIRED_KEY, '1')
      setOpen(true)
    }

    document.addEventListener('mouseleave', onMouseLeave)
    return () => document.removeEventListener('mouseleave', onMouseLeave)
  }, [hasInteracted])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(12, 35, 64, 0.7)' }}
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-heading"
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 rounded-full"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 id="exit-intent-heading" className="text-2xl font-bold text-[#0C2340] mb-3">
          Before you go — quick question?
        </h3>
        <p className="text-slate-600 mb-6">
          If you&apos;re not sure your situation fits the standard quote flow, a free 15-minute call with a specialist usually clears it up.
        </p>
        <button
          type="button"
          onClick={() => {
            trackConsultEvent('free_consult_cta_clicked', { placement: 'exit_intent' })
            setOpen(false)
            onConsultClick()
          }}
          className="w-full px-6 py-3 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold transition-colors mb-3"
        >
          Book a Free 15-Min Call
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="w-full px-6 py-2.5 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          No thanks, I&apos;ll figure it out
        </button>
      </div>
    </div>
  )
}

export default ApostilleExitIntent
