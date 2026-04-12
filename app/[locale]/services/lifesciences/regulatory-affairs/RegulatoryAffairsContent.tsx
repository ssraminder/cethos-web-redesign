'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
)

const SmallCheckIcon = () => (
  <svg className="w-4 h-4 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
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

export default function RegulatoryAffairsContent() {
  const t = useTranslations('lifesciences.regulatory-affairs')

  const stats = [
    { stat: t('stats.submissions'), label: t('stats.submissions_label') },
    { stat: t('stats.agencies'), label: t('stats.agencies_label') },
    { stat: t('stats.acceptance'), label: t('stats.acceptance_label') },
    { stat: t('stats.urgent'), label: t('stats.urgent_label') },
  ]

  const ctdModules = [
    { module: t('ctd.mod1_label'), title: t('ctd.mod1_title'), items: [t('ctd.mod1_item1'), t('ctd.mod1_item2'), t('ctd.mod1_item3'), t('ctd.mod1_item4')] },
    { module: t('ctd.mod2_label'), title: t('ctd.mod2_title'), items: [t('ctd.mod2_item1'), t('ctd.mod2_item2'), t('ctd.mod2_item3'), t('ctd.mod2_item4')] },
    { module: t('ctd.mod3_label'), title: t('ctd.mod3_title'), items: [t('ctd.mod3_item1'), t('ctd.mod3_item2'), t('ctd.mod3_item3'), t('ctd.mod3_item4')] },
    { module: t('ctd.mod4_label'), title: t('ctd.mod4_title'), items: [t('ctd.mod4_item1'), t('ctd.mod4_item2'), t('ctd.mod4_item3'), t('ctd.mod4_item4')] },
    { module: t('ctd.mod5_label'), title: t('ctd.mod5_title'), items: [t('ctd.mod5_item1'), t('ctd.mod5_item2'), t('ctd.mod5_item3'), t('ctd.mod5_item4')] },
    { module: t('ctd.variations_label'), title: t('ctd.variations_title'), items: [t('ctd.variations_item1'), t('ctd.variations_item2'), t('ctd.variations_item3'), t('ctd.variations_item4')] },
  ]

  const labelingTypes = [
    {
      title: t('labeling.smpc_title'),
      items: [t('labeling.smpc_item1'), t('labeling.smpc_item2'), t('labeling.smpc_item3'), t('labeling.smpc_item4')],
    },
    {
      title: t('labeling.pil_title'),
      items: [t('labeling.pil_item1'), t('labeling.pil_item2'), t('labeling.pil_item3'), t('labeling.pil_item4')],
    },
    {
      title: t('labeling.imp_title'),
      items: [t('labeling.imp_item1'), t('labeling.imp_item2'), t('labeling.imp_item3'), t('labeling.imp_item4')],
    },
  ]

  const agencies = [
    { agency: t('agencies.fda'), country: t('agencies.fda_country') },
    { agency: t('agencies.ema'), country: t('agencies.ema_country') },
    { agency: t('agencies.pmda'), country: t('agencies.pmda_country') },
    { agency: t('agencies.nmpa'), country: t('agencies.nmpa_country') },
    { agency: t('agencies.hc'), country: t('agencies.hc_country') },
    { agency: t('agencies.mhra'), country: t('agencies.mhra_country') },
    { agency: t('agencies.swissmedic'), country: t('agencies.swissmedic_country') },
    { agency: t('agencies.tga'), country: t('agencies.tga_country') },
  ]

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{t('hero.title')}</h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">{t('hero.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_quote')}
              </a>
              <a href="#ctd" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                {t('hero.cta_ctd')}
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_iso')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_agencies')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_ctd')}</span>
              <span className="flex items-center gap-2"><HeroBadgeIcon />{t('hero.badge_languages')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('intro.title')}</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              {t.rich('intro.p1', { strong: (chunks) => <strong>{chunks}</strong> })}
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">{t('intro.p2')}</p>
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

      {/* CTD Modules */}
      <section id="ctd" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('ctd.title')}</h2>
            <p className="mt-4 text-lg text-gray-600">{t('ctd.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {ctdModules.map((ctd) => (
              <div key={ctd.module} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#0891B2] text-white text-sm font-semibold rounded">{ctd.module}</span>
                </div>
                <h3 className="font-semibold text-lg text-[#0C2340]">{ctd.title}</h3>
                <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                  {ctd.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2"><SmallCheckIcon />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Labeling */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">{t('labeling.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">{t('labeling.subtitle')}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {labelingTypes.map((type) => (
              <div key={type.title} className="border border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-lg text-[#0C2340] mb-4">{type.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {type.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Agencies */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center">{t('agencies.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">{t('agencies.subtitle')}</p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {agencies.map((reg) => (
              <div key={reg.agency} className="bg-white px-6 py-4 rounded-xl shadow-sm text-center min-w-[160px]">
                <div className="font-bold text-[#0891B2] text-lg">{reg.agency}</div>
                <div className="text-gray-500 text-sm">{reg.country}</div>
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
                variant="general"
                defaultServiceType="regulatory"
                hideServiceSelector={true}
                formLocation="regulatory-affairs"
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
