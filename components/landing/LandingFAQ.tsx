'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface FAQItem {
  question: string
  answer: string
}

interface LandingFAQProps {
  title: string
  faqs: FAQItem[]
}

export function LandingFAQ({ title, faqs }: LandingFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-4 sm:px-8">
        <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-10">
          {title}
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-[#0C2340] pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#0891B2] flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-[#4B5563] leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
