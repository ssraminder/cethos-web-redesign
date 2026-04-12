'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import ClientTestimonials from '@/components/ClientTestimonials'

export default function EnergyMiningPageContent() {
  const tHero = useTranslations('industry.energy-mining.hero')
  const tTrust = useTranslations('industry.energy-mining.trust')
  const tChallenge = useTranslations('industry.energy-mining.challenge')
  const tServices = useTranslations('industry.energy-mining.services')
  const tDocuments = useTranslations('industry.energy-mining.documents')
  const tWhyCalgary = useTranslations('industry.energy-mining.why-calgary')
  const tLanguages = useTranslations('industry.energy-mining.languages')
  const tQuality = useTranslations('industry.energy-mining.quality')
  const tSuccess = useTranslations('industry.energy-mining.success')
  const tCta = useTranslations('industry.energy-mining.cta')

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-[450px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 border border-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 border border-white/10 rounded-full"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumbs */}
            <nav className="text-sm text-gray-300 mb-6">
              <Link href="/" className="hover:text-white transition-colors">
                {tHero('breadcrumb_home')}
              </Link>
              <span className="mx-2">/</span>
              <Link href="/industries" className="hover:text-white transition-colors">
                {tHero('breadcrumb_industries')}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{tHero('breadcrumb_current')}</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tHero('badge')}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {tHero('heading_line1')}<br />
              <span className="text-[#0891B2]">{tHero('heading_line2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              {tHero('description')}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
              >
                {tHero('cta_primary')}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
              >
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
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tTrust('item_1')}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tTrust('item_2')}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tTrust('item_3')}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {tTrust('item_4')}
            </span>
          </div>
        </div>
      </div>

      {/* Industry Challenge Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-6">
                {tChallenge('heading')}
              </h2>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>{tChallenge('p1')}</p>
                <p>{tChallenge('p2')}</p>
                <p>{tChallenge('p3')}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">{tChallenge('stat1_value')}</div>
                  <div className="text-sm text-gray-500">{tChallenge('stat1_label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">{tChallenge('stat2_value')}</div>
                  <div className="text-sm text-gray-500">{tChallenge('stat2_label')}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">{tChallenge('stat3_value')}</div>
                  <div className="text-sm text-gray-500">{tChallenge('stat3_label')}</div>
                </div>
              </div>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-gray-100 rounded-2xl p-8">
                {/* Industry Icons Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{tChallenge('card1_title')}</h3>
                    <p className="text-sm text-gray-500">{tChallenge('card1_desc')}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{tChallenge('card2_title')}</h3>
                    <p className="text-sm text-gray-500">{tChallenge('card2_desc')}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{tChallenge('card3_title')}</h3>
                    <p className="text-sm text-gray-500">{tChallenge('card3_desc')}</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{tChallenge('card4_title')}</h3>
                    <p className="text-sm text-gray-500">{tChallenge('card4_desc')}</p>
                  </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              {tServices('heading')}
            </h2>
            <p className="text-lg text-gray-600">
              {tServices('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Technical Translation */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc1_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc1_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc1_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc1_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc1_item3')}
                </li>
              </ul>
            </div>

            {/* HSE Documentation */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc2_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc2_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc2_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc2_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc2_item3')}
                </li>
              </ul>
            </div>

            {/* Regulatory & Compliance */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc3_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc3_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc3_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc3_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc3_item3')}
                </li>
              </ul>
            </div>

            {/* Legal & Contracts */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc4_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc4_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc4_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc4_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc4_item3')}
                </li>
              </ul>
            </div>

            {/* Training Materials */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc5_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc5_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc5_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc5_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc5_item3')}
                </li>
              </ul>
            </div>

            {/* Corporate Communications */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">{tServices('svc6_title')}</h3>
              <p className="text-gray-600 mb-4">
                {tServices('svc6_desc')}
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc6_item1')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc6_item2')}
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {tServices('svc6_item3')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Document Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              {tDocuments('heading')}
            </h2>
            <p className="text-lg text-gray-600">
              {tDocuments('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1: Technical */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                {tDocuments('col1_title')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item1')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item2')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item3')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item4')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item5')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col1_item6')}
                </li>
              </ul>
            </div>

            {/* Column 2: HSE */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                {tDocuments('col2_title')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item1')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item2')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item3')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item4')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item5')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col2_item6')}
                </li>
              </ul>
            </div>

            {/* Column 3: Regulatory */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                {tDocuments('col3_title')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item1')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item2')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item3')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item4')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item5')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col3_item6')}
                </li>
              </ul>
            </div>

            {/* Column 4: Business */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                {tDocuments('col4_title')}
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item1')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item2')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item3')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item4')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item5')}
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  {tDocuments('col4_item6')}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Calgary Section */}
      <section className="py-20 bg-[#0C2340]">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <span className="inline-block text-[#0891B2] font-medium mb-4">
                {tWhyCalgary('eyebrow')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {tWhyCalgary('heading')}
              </h2>

              <div className="space-y-6 text-gray-300">
                <p>{tWhyCalgary('intro')}</p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{tWhyCalgary('feature1_title')}</h3>
                      <p className="text-sm text-gray-400">{tWhyCalgary('feature1_desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{tWhyCalgary('feature2_title')}</h3>
                      <p className="text-sm text-gray-400">{tWhyCalgary('feature2_desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{tWhyCalgary('feature3_title')}</h3>
                      <p className="text-sm text-gray-400">{tWhyCalgary('feature3_desc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{tWhyCalgary('feature4_title')}</h3>
                      <p className="text-sm text-gray-400">{tWhyCalgary('feature4_desc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="https://flagcdn.com/w40/ca.png"
                  alt="Canada"
                  width={32}
                  height={24}
                  className="rounded"
                />
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

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
              >
                {tWhyCalgary('location_link')}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              {tLanguages('heading')}
            </h2>
            <p className="text-lg text-gray-600">
              {tLanguages('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Middle East & Africa */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                {tLanguages('region1_title')}
              </h3>
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

            {/* Americas */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <span className="text-xl">🌎</span>
                {tLanguages('region2_title')}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>Spanish (Latin American variants)</li>
                <li>Portuguese (Brazilian)</li>
                <li>French (Canadian)</li>
                <li>Indigenous Languages</li>
                <li className="text-xs text-gray-400 ml-4">Cree, Ojibwe, Inuktitut, Dene</li>
              </ul>
            </div>

            {/* Asia */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <span className="text-xl">🌏</span>
                {tLanguages('region3_title')}
              </h3>
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

            {/* Europe & Russia */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <span className="text-xl">🌐</span>
                {tLanguages('region4_title')}
              </h3>
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
            <p className="text-gray-600 mb-4">
              {tLanguages('footer_text')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold"
            >
              {tLanguages('footer_link')}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              {tQuality('heading')}
            </h2>
            <p className="text-lg text-gray-600">
              {tQuality('description')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Standards */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">{tQuality('card1_title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card1_item1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card1_item2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card1_item3')}</span>
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">{tQuality('card2_title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card2_item1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card2_item2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card2_item3')}</span>
                </li>
              </ul>
            </div>

            {/* Technical Expertise */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">{tQuality('card3_title')}</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card3_item1')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card3_item2')}</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">{tQuality('card3_item3')}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#0C2340] to-[#0F3A5C] rounded-2xl p-8 md:p-12">
              <span className="inline-block text-[#0891B2] font-medium text-sm mb-4">
                {tSuccess('eyebrow')}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                {tSuccess('heading')}
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">{tSuccess('stat1_value')}</div>
                  <div className="text-sm text-gray-300">{tSuccess('stat1_label')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">{tSuccess('stat2_value')}</div>
                  <div className="text-sm text-gray-300">{tSuccess('stat2_label')}</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">{tSuccess('stat3_value')}</div>
                  <div className="text-sm text-gray-300">{tSuccess('stat3_label')}</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                {tSuccess('description')}
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tSuccess('tag1')}</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tSuccess('tag2')}</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tSuccess('tag3')}</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">{tSuccess('tag4')}</span>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {tCta('heading')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            {tCta('description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
            >
              {tCta('cta_primary')}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
            >
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
