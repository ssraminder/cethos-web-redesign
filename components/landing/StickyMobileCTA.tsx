'use client'

import { Phone } from 'lucide-react'

interface StickyMobileCTAProps {
  phone?: string
  displayPhone?: string
}

export function StickyMobileCTA({
  phone = '5876000786',
  displayPhone = '(587) 600-0786'
}: StickyMobileCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0891B2] p-4 md:hidden z-50 shadow-lg">
      <a
        href={`tel:${phone}`}
        className="flex items-center justify-center text-white font-semibold text-lg"
        aria-label={`Call ${displayPhone}`}
      >
        <Phone className="w-5 h-5 mr-2" />
        Call {displayPhone}
      </a>
    </div>
  )
}
