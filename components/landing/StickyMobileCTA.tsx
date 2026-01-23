'use client'

import { Phone } from 'lucide-react'

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0C2340] p-4 flex items-center justify-between lg:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <span className="text-white font-medium">Need Translation?</span>
      <a
        href="tel:+15876000786"
        className="px-5 py-2.5 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center gap-2"
      >
        <Phone className="w-4 h-4" strokeWidth={2} />
        Call (587) 600-0786
      </a>
    </div>
  )
}
