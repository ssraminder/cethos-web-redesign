'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

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

export default function ClinicianReviewContent() {
  const t = useTranslations('lifesciences.clinician-review')

  const reviewers = [
    { title: t('reviewers.type1_title'), count: t('reviewers.type1_count'), desc: t('reviewers.type1_desc') },
    { title: t('reviewers.type2_title'), count: t('reviewers.type2_count'), desc: t('reviewers.type2_desc') },
    { title: t('reviewers.type3_title'), count: t('reviewers.type3_count'), desc: t('reviewers.type3_desc') },
    { title: t('reviewers.type4_title'), count: t('reviewers.type4_count'), desc: t('reviewers.type4_desc') },
  ]

  const documents = [
    t('documents.item1'), t('documents.item2'), t('documents.item3'),
    t('documents.item4'), t('documents.item5'), t('documents.item6'),
    t('documents.item7'), t('documents.item8'), t('documents.item9'),
  ]

  const therapeuticAreas = [
    t('therapeutic.area1'), t('therapeutic.area2'), t('therapeutic.area3'), t('therapeutic.area4'),
    t('therapeutic.area5'), t('therapeutic.area6'), t('therapeutic.area7'), t('therapeutic.area8'),
    t('therapeutic.area9'), t('therapeutic.area10'), t('therapeutic.area11'), t('therapeutic.area12'),
    t('therapeutic.area13'), t('therapeutic.area14'), t('therapeutic.area15'),
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
              <a href="#reviewers" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_reviewers')}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_professionals')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_therapeutic')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_urgent')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clinician Review */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('why.title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">{t('why.p1')}</p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              {t.rich('why.p2', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>
        </div>
      </section>

      {/* Reviewer Network */}
      <section id="reviewers" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('reviewers.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t('reviewers.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {reviewers.map((reviewer) => (
              <div key={reviewer.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-[#0891B2]">{reviewer.count}</div>
                <h3 className="font-semibold text-[#0C2340] mt-2">{reviewer.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{reviewer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents We Review */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('documents.title')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {documents.map((doc) => (
              <div key={doc} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <CheckIcon />
                <span className="text-[#0C2340]">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Areas */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('therapeutic.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t('therapeutic.subtitle')}</p>

          <div className="flex flex-wrap gap-3 mt-10">
            {therapeuticAreas.map((area) => (
              <span key={area} className="bg-white px-4 py-2 rounded-full text-[#0C2340] text-sm border border-gray-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('process.title')}</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {processSteps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[#0891B2] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
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
                variant="clinician-review"
                hideServiceSelector={true}
                formLocation="clinician-review"
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
