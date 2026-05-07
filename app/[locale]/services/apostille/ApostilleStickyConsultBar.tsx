'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { trackConsultEvent } from '@/lib/tracking'

interface ApostilleStickyConsultBarProps {
  onConsultClick: () => void
  onQuoteClick: () => void
}

const SESSION_DISMISSED_KEY = 'cethos_apostille_sticky_dismissed'

export function ApostilleStickyConsultBar({
  onConsultClick,
  onQuoteClick,
}: ApostilleStickyConsultBarProps) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (sessionStorage.getItem(SESSION_DISMISSED_KEY) === '1') {
      setDismissed(true)
      return
    }

    function onScroll() {
      const inForm = document.activeElement?.closest('#quote-form, #apostille-consult-section')
      if (inForm) {
        setVisible(false)
        return
      }
      const heroBottom = document.getElementById('quote-form')?.getBoundingClientRect().bottom ?? 0
      setVisible(heroBottom < 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (dismissed || !visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-3 md:hidden z-50 shadow-[0_-4px_12px_rgba(0,0,0,0.08)]"
      role="region"
      aria-label="Apostille actions"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onQuoteClick}
          className="flex-1 px-3 py-2.5 rounded-lg bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold text-sm transition-colors"
        >
          Get Quote
        </button>
        <button
          type="button"
          onClick={() => {
            trackConsultEvent('free_consult_cta_clicked', { placement: 'sticky' })
            onConsultClick()
          }}
          className="flex-1 px-3 py-2.5 rounded-lg border-2 border-[#0891B2] text-[#0891B2] hover:bg-[#E0F2FE] font-semibold text-sm transition-colors"
        >
          Free Consult
        </button>
        <button
          type="button"
          onClick={() => {
            sessionStorage.setItem(SESSION_DISMISSED_KEY, '1')
            setDismissed(true)
          }}
          className="p-2 text-slate-400 hover:text-slate-600"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default ApostilleStickyConsultBar
