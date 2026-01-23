'use client'

import { CheckCircle } from 'lucide-react'

interface TrustBarProps {
  items?: string[]
}

const defaultItems = [
  '100% IRCC Acceptance Guarantee',
  'Same-Day Service',
  'Translation + Notary Same Visit',
  '139 Five-Star Reviews'
]

export function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[#0C2340]">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
          {item}
        </span>
      ))}
    </div>
  )
}
