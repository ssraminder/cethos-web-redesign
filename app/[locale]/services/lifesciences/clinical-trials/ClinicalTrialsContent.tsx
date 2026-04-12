'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const HeroBadgeIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const ChevronIcon = () => (
  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

export default function ClinicalTrialsContent() {
  const t = useTranslations('lifesciences.clinical-trials')

  const stats = [
    { stat: t('stats.studies'), label: t('stats.studies_label') },
    { stat: t('stats.languages'), label: t('stats.languages_label') },
    { stat: t('stats.turnaround'), label: t('stats.turnaround_label') },
    { stat: t('stats.ontime'), label: t('stats.ontime_label') },
  ]

  const protocolDocs = [
    t('docs.protocol.item1'),
    t('docs.protocol.item2'),
    t('docs.protocol.item3'),
    t('docs.protocol.item4'),
    t('docs.protocol.item5'),
  ]

  const patientDocs = [
    t('docs.patient.item1'),
    t('docs.patient.item2'),
    t('docs.patient.item3'),
    t('docs.patient.item4'),
    t('docs.patient.item5'),
  ]

  const siteDocs = [
    t('docs.site.item1'),
    t('docs.site.item2'),
    t('docs.site.item3'),
    t('docs.site.item4'),
    t('docs.site.item5'),
  ]

  const processSteps = [
    { step: '1', title: t('process.step1_title'), desc: t('process.step1_desc') },
    { step: '2', title: t('process.step2_title'), desc: t('process.step2_desc') },
    { step: '3', title: t('process.step3_title'), desc: t('process.step3_desc') },
    { step: '4', title: t('process.step4_title'), desc: t('process.step4_desc') },
  ]

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b pt-20" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.home')}</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.services')}</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services/lifesciences" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.lifesciences')}</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-[#0C2340] font-medium">{t('breadcrumb.current')}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0C2340] to-[#1a3a5c] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-[#0891B2]/20 text-[#06B6D4] text-sm font-medium px-3 py-1 rounded-full mb-4">
              {t('hero.badge')}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_quote')}
              </a>
              <a href="#documents" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_documents')}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_gcp')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_iso')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_languages')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_support')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('intro.title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t('intro.p1')}</p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t.rich('intro.p2', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((item) => (
              <div key={item.label} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-[#0891B2]">{item.stat}</div>
                <div className="text-gray-600 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Types */}
      <section id="documents" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('docs.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('docs.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">{t('docs.protocol.title')}</h3>
              <ul className="space-y-3 text-gray-600">
                {protocolDocs.map((item) => (
                  <li key={item} className="flex items-start gap-2"><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">{t('docs.patient.title')}</h3>
              <ul className="space-y-3 text-gray-600">
                {patientDocs.map((item) => (
                  <li key={item} className="flex items-start gap-2"><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">{t('docs.site.title')}</h3>
              <ul className="space-y-3 text-gray-600">
                {siteDocs.map((item) => (
                  <li key={item} className="flex items-start gap-2"><CheckIcon />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('process.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('process.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#0891B2] text-white rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mt-4 text-[#0C2340]">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('faq.title')}</h2>
          <div className="mt-10 space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-white rounded-xl group">
                <summary className="p-5 font-semibold text-[#0C2340] cursor-pointer hover:text-[#0891B2] list-none flex justify-between items-center">
                  {faq.question}
                  <ChevronIcon />
                </summary>
                <p className="px-5 pb-5 text-gray-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('quote.title')}</h2>
              <p className="text-lg text-gray-600 mt-4">{t('quote.subtitle')}</p>
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <LifeSciencesQuoteForm
                variant="general"
                defaultServiceType="clinical-translation"
                hideServiceSelector={true}
                formLocation="clinical-trials"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">{t('cta.title')}</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">{t('cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              {t('cta.button_quote')}
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              {t('cta.button_contact')}
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">{t('cta.tagline')}</p>
        </div>
      </section>
    </>
  )
}
