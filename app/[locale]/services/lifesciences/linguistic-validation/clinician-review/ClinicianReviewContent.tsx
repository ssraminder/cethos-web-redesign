'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'
import LifeSciencesRelated from '@/components/lifesciences/LifeSciencesRelated'

const HeroBadgeIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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

const ICON_CLIPBOARD_CHECK = "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
const ICON_DOC = "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
const ICON_BEAKER = "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
const ICON_SHIELD_CHECK = "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
const ICON_PEOPLE = "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4z"
const ICON_PENCIL = "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"

const INSTRUMENT_ICONS = [ICON_DOC, ICON_PEOPLE, ICON_BEAKER, ICON_CLIPBOARD_CHECK]

export default function ClinicianReviewContent() {
  const t = useTranslations('lifesciences.linguistic-validation-clinician-review')

  const stats = [
    { stat: t('stats.reviewers'), label: t('stats.reviewers_label') },
    { stat: t('stats.languages'), label: t('stats.languages_label') },
    { stat: t('stats.therapeutic'), label: t('stats.therapeutic_label') },
    { stat: t('stats.turnaround'), label: t('stats.turnaround_label') },
  ]

  const isporPoints = [
    t('methodology.ispor_point1'),
    t('methodology.ispor_point2'),
    t('methodology.ispor_point3'),
  ]

  const promisPoints = [
    t('methodology.promis_point1'),
    t('methodology.promis_point2'),
    t('methodology.promis_point3'),
  ]

  const processSteps = [
    { step: '1', title: t('process.step1_title'), desc: t('process.step1_desc') },
    { step: '2', title: t('process.step2_title'), desc: t('process.step2_desc') },
    { step: '3', title: t('process.step3_title'), desc: t('process.step3_desc') },
    { step: '4', title: t('process.step4_title'), desc: t('process.step4_desc') },
    { step: '5', title: t('process.step5_title'), desc: t('process.step5_desc') },
  ]

  const qualifications = [
    { icon: ICON_SHIELD_CHECK, title: t('qualifications.item1_title'), desc: t('qualifications.item1_desc') },
    { icon: ICON_PEOPLE, title: t('qualifications.item2_title'), desc: t('qualifications.item2_desc') },
    { icon: ICON_CLIPBOARD_CHECK, title: t('qualifications.item3_title'), desc: t('qualifications.item3_desc') },
    { icon: ICON_BEAKER, title: t('qualifications.item4_title'), desc: t('qualifications.item4_desc') },
  ]

  const instruments = [
    { code: 'ClinRO', name: t('instruments.clinro_name'), desc: t('instruments.clinro_desc'), icon: INSTRUMENT_ICONS[0] },
    { code: 'ObsRO', name: t('instruments.obsro_name'), desc: t('instruments.obsro_desc'), icon: INSTRUMENT_ICONS[1] },
    { code: 'PerfO', name: t('instruments.perfo_name'), desc: t('instruments.perfo_desc'), icon: INSTRUMENT_ICONS[2] },
    { code: 'PRO', name: t('instruments.pro_name'), desc: t('instruments.pro_desc'), icon: INSTRUMENT_ICONS[3] },
  ]

  const deliverables = [
    { icon: ICON_DOC, title: t('deliverables.item1_title'), desc: t('deliverables.item1_desc') },
    { icon: ICON_PENCIL, title: t('deliverables.item2_title'), desc: t('deliverables.item2_desc') },
    { icon: ICON_CLIPBOARD_CHECK, title: t('deliverables.item3_title'), desc: t('deliverables.item3_desc') },
    { icon: ICON_SHIELD_CHECK, title: t('deliverables.item4_title'), desc: t('deliverables.item4_desc') },
  ]

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ]

  return (
    <>
      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b pt-20" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.home')}</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.services')}</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services/lifesciences" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.lifesciences')}</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services/lifesciences/linguistic-validation" className="text-gray-500 hover:text-[#0891B2]">{t('breadcrumb.linguisticvalidation')}</Link></li>
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
              <a href="#methodology" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_methodology')}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_ispor')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_promis')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_incountry')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_iso')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Clinician Review */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('what.title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {t.rich('what.p1', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t.rich('what.p2', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t.rich('what.p3', {
                strong: (chunks) => <strong>{chunks}</strong>,
                lvlink: (chunks) => (
                  <Link href="/services/lifesciences/linguistic-validation" className="text-[#0891B2] hover:text-[#06B6D4] underline">{chunks}</Link>
                ),
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

      {/* Methodology alignment: ISPOR + PROMIS/FACIT */}
      <section id="methodology" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('methodology.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('methodology.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12">
            {/* ISPOR */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#0891B2] font-bold text-sm tracking-wide uppercase">{t('methodology.ispor_eyebrow')}</div>
              <h3 className="text-2xl font-bold text-[#0C2340] mt-2">{t('methodology.ispor_title')}</h3>
              <p className="text-gray-600 mt-3">{t('methodology.ispor_desc')}</p>
              <ul className="mt-6 space-y-3">
                {isporPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#0C2340]"><CheckIcon /><span className="text-gray-700">{point}</span></li>
                ))}
              </ul>
            </div>

            {/* PROMIS / FACIT */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-[#0891B2] font-bold text-sm tracking-wide uppercase">{t('methodology.promis_eyebrow')}</div>
              <h3 className="text-2xl font-bold text-[#0C2340] mt-2">{t('methodology.promis_title')}</h3>
              <p className="text-gray-600 mt-3">{t('methodology.promis_desc')}</p>
              <ul className="mt-6 space-y-3">
                {promisPoints.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-[#0C2340]"><CheckIcon /><span className="text-gray-700">{point}</span></li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-8 text-center text-gray-600 max-w-3xl mx-auto">
            {t.rich('methodology.note', { strong: (chunks) => <strong>{chunks}</strong> })}
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('process.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('process.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {processSteps.map((item) => (
              <div key={item.step} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
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

      {/* Reviewer Qualifications */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('qualifications.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('qualifications.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {qualifications.map((q) => (
              <div key={q.title} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-4">
                  <SvgIcon d={q.icon} />
                </div>
                <h3 className="font-semibold text-[#0C2340]">{q.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instrument Types */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('instruments.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t('instruments.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {instruments.map((instrument) => (
              <div key={instrument.code} className="border border-gray-200 rounded-xl p-6 hover:border-[#0891B2] transition-colors">
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-4">
                  <SvgIcon d={instrument.icon} />
                </div>
                <div className="text-[#0891B2] font-bold text-lg">{instrument.code}</div>
                <h3 className="font-semibold text-[#0C2340] mt-2">{instrument.name}</h3>
                <p className="text-gray-600 text-sm mt-2">{instrument.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Receive */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('deliverables.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('deliverables.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {deliverables.map((d) => (
              <div key={d.title} className="bg-white rounded-xl p-6">
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
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('faq.title')}</h2>
          <div className="mt-10 space-y-4 max-w-3xl">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl group">
                <summary className="p-5 font-semibold text-[#0C2340] cursor-pointer hover:text-[#0891B2] list-none flex justify-between items-center gap-4">
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
                variant="clinician-review"
                hideServiceSelector={true}
                formLocation="linguistic-validation-clinician-review"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <LifeSciencesRelated current="clinician-review" />

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
