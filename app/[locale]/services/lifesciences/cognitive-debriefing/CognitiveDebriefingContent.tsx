'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'
import LifeSciencesRelated from '@/components/lifesciences/LifeSciencesRelated'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

const SvgIcon = ({ d }: { d: string }) => (
  <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
  </svg>
)

const ICON_INSTRUMENT = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
const ICON_PEOPLE = "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z"

export default function CognitiveDebriefingContent() {
  const t = useTranslations('lifesciences.cognitive-debriefing')

  const stats = [
    { stat: t('stats.moderators'), label: t('stats.moderators_label') },
    { stat: t('stats.languages'), label: t('stats.languages_label') },
    { stat: t('stats.therapeutic'), label: t('stats.therapeutic_label') },
    { stat: t('stats.studies'), label: t('stats.studies_label') },
  ]

  const processSteps = [
    { step: '1', title: t('process.step1_title'), desc: t('process.step1_desc') },
    { step: '2', title: t('process.step2_title'), desc: t('process.step2_desc') },
    { step: '3', title: t('process.step3_title'), desc: t('process.step3_desc') },
    { step: '4', title: t('process.step4_title'), desc: t('process.step4_desc') },
  ]

  const instruments = [
    { code: 'PRO', name: t('instruments.pro_name'), desc: t('instruments.pro_desc') },
    { code: 'ClinRO', name: t('instruments.clinro_name'), desc: t('instruments.clinro_desc') },
    { code: 'ObsRO', name: t('instruments.obsro_name'), desc: t('instruments.obsro_desc') },
    { code: 'PerfO', name: t('instruments.perfo_name'), desc: t('instruments.perfo_desc') },
  ]

  const populations = [
    { name: t('populations.pop1_name'), detail: t('populations.pop1_detail') },
    { name: t('populations.pop2_name'), detail: t('populations.pop2_detail') },
    { name: t('populations.pop3_name'), detail: t('populations.pop3_detail') },
    { name: t('populations.pop4_name'), detail: t('populations.pop4_detail') },
    { name: t('populations.pop5_name'), detail: t('populations.pop5_detail') },
  ]

  const deliverables = [
    { icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', title: t('deliverables.item1_title'), desc: t('deliverables.item1_desc') },
    { icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', title: t('deliverables.item2_title'), desc: t('deliverables.item2_desc') },
    { icon: ICON_PEOPLE, title: t('deliverables.item3_title'), desc: t('deliverables.item3_desc') },
    { icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', title: t('deliverables.item4_title'), desc: t('deliverables.item4_desc') },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_quote')}
              </a>
              <a href="#process" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_process')}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_moderators')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_languages')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_ispor')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_fda')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cognitive Debriefing */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('what.title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t('what.p1')}</p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t.rich('what.p2', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">{t('what.p3')}</p>
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

      {/* Process */}
      <section id="process" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('process.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('process.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-[#0891B2]/10 text-[#0891B2] rounded-full flex items-center justify-center font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mt-4 text-[#0C2340]">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instrument Types */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('instruments.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {instruments.map((instrument) => (
              <div key={instrument.code} className="border border-gray-200 rounded-xl p-6 hover:border-[#0891B2] transition-colors">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-4">
                  <SvgIcon d={ICON_INSTRUMENT} />
                </div>
                <div className="text-[#0891B2] font-bold text-lg">{instrument.code}</div>
                <h3 className="font-semibold text-[#0C2340] mt-2">{instrument.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{instrument.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specialized Populations */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('populations.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t('populations.subtitle')}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {populations.map((pop) => (
              <div key={pop.name} className="bg-white p-5 rounded-xl text-center">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <SvgIcon d={ICON_PEOPLE} />
                </div>
                <h3 className="font-semibold text-[#0C2340]">{pop.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{pop.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('deliverables.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('deliverables.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {deliverables.map((d) => (
              <div key={d.title} className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-4">
                  <SvgIcon d={d.icon} />
                </div>
                <h3 className="font-semibold text-[#0C2340]">{d.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{d.desc}</p>
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
              <details key={i} className="bg-gray-50 rounded-xl group">
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
      <section id="quote-form" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('quote.title')}</h2>
              <p className="text-lg text-gray-600 mt-4">{t('quote.subtitle')}</p>
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <LifeSciencesQuoteForm
                variant="cognitive-debriefing"
                hideServiceSelector={true}
                formLocation="cognitive-debriefing"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <LifeSciencesRelated current="cognitive-debriefing" />

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t('cta.title')}</h2>
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
