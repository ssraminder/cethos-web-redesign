'use client'

import Link from 'next/link'
import { Phone, ArrowRight, Check } from 'lucide-react'

interface TrustItem {
  text: string
}

interface LandingHeroProps {
  headline: string
  subheadline: string
  trustItems: TrustItem[]
  ctaText?: string
  ctaHref?: string
}

export function LandingHero({
  headline,
  subheadline,
  trustItems,
  ctaText = 'Get a Free Quote',
  ctaHref = '#quote-form',
}: LandingHeroProps) {
  return (
    <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="max-w-3xl">
          {/* Headline */}
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#4B5563] leading-relaxed mb-8">
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href={ctaHref}
              className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2"
            >
              {ctaText}
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <a
              href="tel:+15876000786"
              className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              Call (587) 600-0786
            </a>
          </div>

          {/* Trust Bar */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#4B5563]">
            {trustItems.map((item, index) => (
              <span key={index} className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#0891B2]" strokeWidth={2} />
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
