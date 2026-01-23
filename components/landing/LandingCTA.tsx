'use client'

import Link from 'next/link'
import { Phone, ArrowRight } from 'lucide-react'

interface LandingCTAProps {
  headline: string
  subheadline: string
}

export function LandingCTA({ headline, subheadline }: LandingCTAProps) {
  return (
    <section className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2] py-16 sm:py-20">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8 text-center">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-white mb-4">
          {headline}
        </h2>
        <p className="text-lg sm:text-xl text-white/80 mb-8">
          {subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="#quote-form"
            className="px-6 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get a Free Quote
            <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
          </Link>
          <a
            href="tel:+15876000786"
            className="px-6 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 hover:border-white/50 transition-colors inline-flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" strokeWidth={1.5} />
            Call (587) 600-0786
          </a>
        </div>
      </div>
    </section>
  )
}
