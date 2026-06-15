'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ClientTestimonials from '@/components/ClientTestimonials'

/**
 * Reusable industry landing-page template.
 *
 * Renders the standard 10-section industry layout (hero, trust bar, challenge,
 * services, documents, why-Calgary, languages, quality, success, CTA) driven
 * entirely by i18n namespaces of the form `industry.<base>.<section>`.
 *
 * Mirrors the structure of the original per-industry page components
 * (e.g. EnergyMiningPageContent) so new industry verticals stay visually and
 * structurally consistent without duplicating ~1,000 lines of JSX.
 */
export default function IndustryPageTemplate({ base }: { base: string }) {
  const tHero = useTranslations(`industry.${base}.hero`)
  const tTrust = useTranslations(`industry.${base}.trust`)
  const tChallenge = useTranslations(`industry.${base}.challenge`)
  const tServices = useTranslations(`industry.${base}.services`)
  const tDocuments = useTranslations(`industry.${base}.documents`)
  const tWhyCalgary = useTranslations(`industry.${base}.why-calgary`)
  const tLanguages = useTranslations(`industry.${base}.languages`)
  const tQuality = useTranslations(`industry.${base}.quality`)
  const tSuccess = useTranslations(`industry.${base}.success`)
  const tCta = useTranslations(`industry.${base}.cta`)

  const checkPath = "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
  const chevronPath = "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
  const arrowPath = "M17 8l4 4m0 0l-4 4m4-4H3"

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[450px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 border border-white/10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <nav className="text-sm text-gray-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">{tHero('breadcrumb_home')}</Link>
              <span className="mx-2">/</span>
              <Link href="/industries" className="hover:text-white transition-colors">{tHero('breadcrumb_industries')}</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{tHero('breadcrumb_current')}</span>
            </nav>

            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tHero('badge')}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {tHero('heading_line1')}<br />
              <span className="text-[#0891B2]">{tHero('heading_line2')}</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-2xl mb-8">{tHero('description')}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/get-quote" className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">
                {tHero('cta_primary')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPath} />
                </svg>
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors">
                {tHero('cta_secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-gray-600">
            {['item_1', 'item_2', 'item_3', 'item_4'].map((k) => (
              <span key={k} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tTrust(k)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Industry Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-6">{tChallenge('heading')}</h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>{tChallenge('p1')}</p>
                <p>{tChallenge('p2')}</p>
                <p>{tChallenge('p3')}</p>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="text-3xl font-bold text-[#0891B2]">{tChallenge(`stat${i}_value`)}</div>
                    <div className="text-sm text-gray-500">{tChallenge(`stat${i}_label`)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                      <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                        <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="font-semibold text-[#0C2340]">{tChallenge(`card${i}_title`)}</h3>
                      <p className="text-sm text-gray-500">{tChallenge(`card${i}_desc`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tServices('heading')}</h2>
            <p className="text-lg text-gray-600">{tServices('description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices(`svc${i}_title`)}</h3>
                <p className="text-gray-600 mb-4">{tServices(`svc${i}_desc`)}</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  {[1, 2, 3].map((j) => (
                    <li key={j} className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={checkPath} clipRule="evenodd" />
                      </svg>
                      {tServices(`svc${i}_item${j}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tDocuments('heading')}</h2>
            <p className="text-lg text-gray-600">{tDocuments('description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((c) => (
              <div key={c} className="space-y-4">
                <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">{tDocuments(`col${c}_title`)}</h3>
                <ul className="space-y-3 text-gray-600">
                  {[1, 2, 3, 4, 5, 6].map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={chevronPath} clipRule="evenodd" />
                      </svg>
                      {tDocuments(`col${c}_item${it}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Calgary Section */}
      <section className="py-20 bg-[#0C2340]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-[#0891B2] font-medium mb-4">{tWhyCalgary('eyebrow')}</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{tWhyCalgary('heading')}</h2>

              <div className="space-y-6 text-gray-300">
                <p>{tWhyCalgary('intro')}</p>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{tWhyCalgary(`feature${i}_title`)}</h3>
                        <p className="text-sm text-gray-400">{tWhyCalgary(`feature${i}_desc`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Image src="https://flagcdn.com/w40/ca.png" alt="Canada" width={32} height={24} className="rounded" />
                <div>
                  <h3 className="text-xl font-bold text-white">{tWhyCalgary('location_title')}</h3>
                  <p className="text-gray-400 text-sm">{tWhyCalgary('location_subtitle')}</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 mb-8">
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: tWhyCalgary('location_address') }} />
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{tWhyCalgary('location_phone')}</span>
                </p>
              </div>

              <Link href="/contact" className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors">
                {tWhyCalgary('location_link')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPath} />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tLanguages('heading')}</h2>
            <p className="text-lg text-gray-600">{tLanguages('description')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2"><span className="text-xl">🌍</span>{tLanguages('region1_title')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Arabic (Modern Standard, Gulf, Egyptian)</li>
                <li>Farsi (Persian)</li>
                <li>Turkish</li>
                <li>Hebrew</li>
                <li>Swahili</li>
                <li>Amharic</li>
                <li>French (African)</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2"><span className="text-xl">🌎</span>{tLanguages('region2_title')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Spanish (Latin American variants)</li>
                <li>Portuguese (Brazilian)</li>
                <li>French (Canadian)</li>
                <li>Indigenous Languages</li>
                <li className="text-xs text-gray-400 ml-4">Cree, Ojibwe, Inuktitut, Dene</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2"><span className="text-xl">🌏</span>{tLanguages('region3_title')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Chinese (Simplified & Traditional)</li>
                <li>Japanese</li>
                <li>Korean</li>
                <li>Indonesian / Bahasa</li>
                <li>Vietnamese</li>
                <li>Thai</li>
                <li>Malay</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2"><span className="text-xl">🌐</span>{tLanguages('region4_title')}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Russian</li>
                <li>Norwegian</li>
                <li>German</li>
                <li>Dutch</li>
                <li>Polish</li>
                <li>Romanian</li>
                <li>Kazakh</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">{tLanguages('footer_text')}</p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold">
              {tLanguages('footer_link')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPath} />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tQuality('heading')}</h2>
            <p className="text-lg text-gray-600">{tQuality('description')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((c) => (
              <div key={c} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                <h3 className="font-bold text-[#0C2340] mb-4">{tQuality(`card${c}_title`)}</h3>
                <ul className="space-y-3">
                  {[1, 2, 3].map((it) => (
                    <li key={it} className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d={checkPath} clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-600">{tQuality(`card${c}_item${it}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#0C2340] to-[#0F3A5C] rounded-2xl p-8 md:p-12">
              <span className="inline-block text-[#0891B2] font-medium text-sm mb-4">{tSuccess('eyebrow')}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">{tSuccess('heading')}</h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/10 rounded-xl p-4 text-center">
                    <div className="text-3xl font-bold text-[#0891B2] mb-1">{tSuccess(`stat${i}_value`)}</div>
                    <div className="text-sm text-gray-300">{tSuccess(`stat${i}_label`)}</div>
                  </div>
                ))}
              </div>

              <p className="text-gray-300 mb-6">{tSuccess('description')}</p>

              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <span key={i} className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tSuccess(`tag${i}`)}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientTestimonials />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tCta('heading')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">{tCta('description')}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/get-quote" className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">
              {tCta('cta_primary')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={arrowPath} />
              </svg>
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors">
              {tCta('cta_secondary')}
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <a href="tel:+15876000786" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {tCta('phone')}
            </a>
            <a href="mailto:info@cethos.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {tCta('email')}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
