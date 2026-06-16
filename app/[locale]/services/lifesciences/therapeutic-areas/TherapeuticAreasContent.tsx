'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesRelated from '@/components/lifesciences/LifeSciencesRelated'

const AREA_GROUPS: { group: string; areas: string[] }[] = [
  { group: 'Oncology & Hematology', areas: ['Oncology', 'Hematology', 'Immuno-Oncology'] },
  { group: 'Cardiovascular & Metabolic', areas: ['Cardiology', 'Endocrinology & Diabetes', 'Nephrology', 'Metabolic Disorders'] },
  { group: 'Neuroscience & CNS', areas: ['Neurology', 'Psychiatry & Mental Health', 'Pain Management'] },
  { group: 'Immunology & Inflammation', areas: ['Rheumatology', 'Dermatology', 'Immunology & Allergy'] },
  { group: 'Infectious Disease & Vaccines', areas: ['Infectious Diseases', 'Vaccines', 'Hepatology'] },
  { group: 'Respiratory', areas: ['Respiratory & Pulmonology', 'Critical Care'] },
  { group: 'Specialty & Emerging', areas: ['Ophthalmology', 'Gastroenterology', 'Urology', "Women's Health & OB-GYN", 'Rare & Orphan Diseases', 'Pediatrics', 'Gene & Cell Therapy', 'Medical Devices & Diagnostics'] },
]

export default function TherapeuticAreasContent() {
  const t = useTranslations('lifesciences.therapeutic-areas')

  const stats = [1, 2, 3, 4].map((i) => ({ value: t(`stat${i}_value`), label: t(`stat${i}_label`) }))

  return (
    <>
      {/* Hero */}
      <section className="min-h-[420px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/services/lifesciences" className="hover:text-white transition-colors">Life Sciences</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{t('hero_breadcrumb_current')}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {t('hero_badge')}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">{t('hero_heading')}</h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">{t('hero_description')}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote" className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">
                {t('hero_cta_primary')}
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors">
                {t('hero_cta_secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-6">{t('intro_heading')}</h2>
            <div className="prose prose-lg text-gray-600 space-y-4">
              <p>{t('intro_p1')}</p>
              <p>{t('intro_p2')}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-gray-200 pt-10">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-[#0891B2]">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{t('areas_heading')}</h2>
            <p className="text-lg text-gray-600">{t('areas_description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AREA_GROUPS.map((g) => (
              <div key={g.group} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">{g.group}</h3>
                <ul className="space-y-3 text-gray-600">
                  {g.areas.map((a) => (
                    <li key={a} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0891B2] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <LifeSciencesRelated current="therapeutic-areas" />

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta_heading')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">{t('cta_description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-quote" className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">
              {t('cta_primary')}
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors">
              {t('cta_secondary')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
