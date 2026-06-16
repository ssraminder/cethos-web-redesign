'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

const SLUGS = [
  'linguistic-validation',
  'cognitive-debriefing',
  'clinician-review',
  'clinical-trials',
  'regulatory-affairs',
  'pharmacovigilance',
  'ecoa-migration',
  'medical-devices',
  'therapeutic-areas',
] as const

type Slug = (typeof SLUGS)[number]

/**
 * Cross-link section listing sibling Life Sciences services.
 * Reused across all life-sciences subpages for internal linking (SEO + UX).
 * Pass the current page's slug to exclude it from the list.
 */
export default function LifeSciencesRelated({ current }: { current?: Slug }) {
  const t = useTranslations('lifesciences.related')
  const items = SLUGS.filter((s) => s !== current)

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('title')}</h2>
          <p className="mt-3 text-lg text-gray-600">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((slug) => (
            <Link
              key={slug}
              href={`/services/lifesciences/${slug}`}
              className="group flex items-center justify-between gap-3 p-5 rounded-xl border border-gray-200 hover:border-[#0891B2] hover:shadow-md transition-all"
            >
              <span className="font-semibold text-[#0C2340] group-hover:text-[#0891B2]">{t(slug)}</span>
              <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/services/lifesciences" className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold">
            {t('cta')}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
