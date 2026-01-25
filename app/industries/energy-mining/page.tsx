import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import TrustedByLogos from '@/components/TrustedByLogos'

export const metadata: Metadata = {
  title: 'Energy & Mining Translation Services | Oil & Gas | Cethos',
  description: 'Technical translation services for oil & gas, mining, and renewable energy companies. HSE documentation, regulatory filings, and technical manuals in 200+ languages. Based in Calgary, Canada.',
  keywords: ['oil and gas translation', 'energy translation services', 'mining translation', 'HSE translation', 'technical translation Calgary', 'oilfield translation', 'petroleum translation', 'energy sector translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/energy-mining',
  },
  openGraph: {
    title: 'Energy & Mining Translation Services | Cethos Solutions',
    description: 'Technical translation for global energy operations. Based in Calgary, serving oil & gas, mining, and renewable energy companies worldwide.',
    type: 'website',
    url: 'https://cethos.com/industries/energy-mining',
  },
}

export default function EnergyMiningPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Energy & Mining Translation Services",
            "provider": {
              "@type": "Organization",
              "name": "Cethos Solutions Inc.",
              "url": "https://cethos.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "421 7 Avenue SW, Floor 30",
                "addressLocality": "Calgary",
                "addressRegion": "AB",
                "postalCode": "T2P 4K9",
                "addressCountry": "CA"
              }
            },
            "serviceType": "Translation Services",
            "areaServed": "Worldwide",
            "description": "Technical translation services for oil & gas, mining, and renewable energy companies. HSE documentation, regulatory filings, technical manuals, and legal contracts in 200+ languages."
          })
        }}
      />

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
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/industries" className="hover:text-white transition-colors">
                Industries
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">Energy & Mining</span>
            </nav>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-6">
              <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Based in Calgary — Canada&apos;s Energy Capital
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Translation Services for<br />
              <span className="text-[#0891B2]">Energy & Mining</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Technical translation, safety documentation, and multilingual communication
              for oil & gas, mining, and renewable energy companies operating globally.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
              >
                Get a Quote
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
              >
                Speak to a Specialist
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
              200+ Languages
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Technical Subject Matter Experts
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ISO 17100 Compliant
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              24/7 Global Operations
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
                Global Energy Operations Require Precise Communication
              </h2>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  The energy and mining sector operates across borders, languages, and cultures.
                  From drilling operations in the Middle East to mining projects in South America,
                  clear and accurate communication is critical for safety, compliance, and efficiency.
                </p>
                <p>
                  A mistranslated safety procedure can cost lives. An inaccurate technical manual
                  can cause equipment failure. A poorly localized contract can lead to costly disputes.
                </p>
                <p>
                  That&apos;s why energy companies trust Cethos. Based in Calgary—the heart of Canada&apos;s
                  energy industry—we understand the technical precision and regulatory complexity
                  your projects demand.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">50+</div>
                  <div className="text-sm text-gray-500">Energy clients served</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">1M+</div>
                  <div className="text-sm text-gray-500">Pages translated</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#0891B2]">100%</div>
                  <div className="text-sm text-gray-500">On-time delivery</div>
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
                    <h3 className="font-semibold text-[#0C2340]">Oil & Gas</h3>
                    <p className="text-sm text-gray-500">Upstream, midstream, downstream</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">Mining</h3>
                    <p className="text-sm text-gray-500">Extraction & processing</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">Renewable Energy</h3>
                    <p className="text-sm text-gray-500">Wind, solar, hydro</p>
                  </div>

                  <div className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-3">
                      <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">Utilities</h3>
                    <p className="text-sm text-gray-500">Power generation & distribution</p>
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
              Translation Services for Energy & Mining
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive language solutions for every aspect of energy operations.
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">Technical Translation</h3>
              <p className="text-gray-600 mb-4">
                Equipment manuals, engineering specifications, geological reports, and
                technical documentation translated by subject matter experts.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Equipment operation manuals
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Engineering specifications
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Geological & seismic reports
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">HSE & Safety Documentation</h3>
              <p className="text-gray-600 mb-4">
                Health, Safety, and Environmental documentation that protects your workforce
                across all operating locations and languages.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Safety procedures & protocols
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Emergency response plans
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  MSDS / SDS sheets
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">Regulatory & Compliance</h3>
              <p className="text-gray-600 mb-4">
                Permit applications, environmental assessments, and regulatory filings
                for jurisdictions worldwide.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Environmental impact assessments
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Permit applications
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Regulatory submissions
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">Legal & Contracts</h3>
              <p className="text-gray-600 mb-4">
                Joint venture agreements, service contracts, and legal documentation
                for international energy partnerships.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Joint venture agreements
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Service contracts
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Licensing agreements
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">Training & eLearning</h3>
              <p className="text-gray-600 mb-4">
                Multilingual training materials, eLearning courses, and competency
                assessments for global workforces.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Safety training modules
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Operational procedures
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Competency assessments
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
              <h3 className="text-xl font-bold text-[#0C2340] mb-3">Corporate Communications</h3>
              <p className="text-gray-600 mb-4">
                Investor communications, annual reports, and stakeholder updates
                for publicly traded energy companies.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Annual reports
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Investor presentations
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  ESG reports
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
              Document Types We Translate
            </h2>
            <p className="text-lg text-gray-600">
              From wellhead to boardroom—we translate every document your operations require.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1: Technical */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                Technical Documents
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Equipment operation manuals
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Engineering drawings & specs
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Geological reports
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Seismic data reports
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Maintenance procedures
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Process flow diagrams
                </li>
              </ul>
            </div>

            {/* Column 2: HSE */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                HSE & Safety
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Safety data sheets (SDS/MSDS)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Emergency response plans
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Work permits & procedures
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Hazard identification
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Incident reports
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  PPE guidelines
                </li>
              </ul>
            </div>

            {/* Column 3: Regulatory */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                Regulatory & Environmental
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Environmental impact assessments
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Permit applications
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Compliance reports
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Emissions monitoring
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Reclamation plans
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  ESG disclosures
                </li>
              </ul>
            </div>

            {/* Column 4: Business */}
            <div className="space-y-4">
              <h3 className="font-bold text-[#0891B2] text-sm uppercase tracking-wider mb-4">
                Business & Legal
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Joint venture agreements
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Production sharing contracts
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Service agreements
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Annual reports
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Investor presentations
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-gray-300 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  Board materials
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
                HEADQUARTERED IN CALGARY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Calgary Energy Companies Choose Cethos
              </h2>

              <div className="space-y-6 text-gray-300">
                <p>
                  We&apos;re not an offshore translation factory trying to understand your industry
                  from afar. We&apos;re based in the heart of Canada&apos;s energy sector—we know the
                  industry, the terminology, and the standards you operate under.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Local Understanding</h3>
                      <p className="text-sm text-gray-400">
                        We understand Canadian energy regulations, AER requirements, and the
                        unique challenges of operating in Alberta&apos;s oil sands and beyond.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Same Time Zone Service</h3>
                      <p className="text-sm text-gray-400">
                        When you need a rush translation for a rig in the Middle East, we&apos;re
                        available during your business hours—not sleeping on the other side of the world.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Industry Security Standards</h3>
                      <p className="text-sm text-gray-400">
                        We understand the confidentiality requirements for seismic data,
                        drilling plans, and proprietary technical information.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#0891B2] rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">Global Reach</h3>
                      <p className="text-sm text-gray-400">
                        With offices in Dubai and India, we provide 24/7 coverage for operations
                        in the Middle East, Africa, and Asia-Pacific.
                      </p>
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
                  <h3 className="text-xl font-bold text-white">Calgary Headquarters</h3>
                  <p className="text-gray-400 text-sm">Canada&apos;s Energy Capital</p>
                </div>
              </div>

              <div className="space-y-4 text-gray-300 mb-8">
                <p className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  <span>421 7 Avenue SW, Floor 30<br/>Calgary, AB T2P 4K9</span>
                </p>
                <p className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(587) 600-0786</span>
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold transition-colors"
              >
                Visit Our Office
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
              Languages for Global Energy Operations
            </h2>
            <p className="text-lg text-gray-600">
              From the oil fields of the Middle East to mining operations in South America,
              we speak the languages your global workforce needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Middle East & Africa */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <span className="text-xl">🌍</span>
                Middle East & Africa
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
                Americas
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
                Asia-Pacific
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
                Europe & CIS
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
              Don&apos;t see your language? We support <strong>200+ languages</strong> worldwide.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold"
            >
              Contact us for your specific language needs
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
              Quality & Security You Can Trust
            </h2>
            <p className="text-lg text-gray-600">
              Your technical data and proprietary information are protected by
              industry-leading security practices.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Quality Standards */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">Quality Standards</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">ISO 17100 Compliant</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">ISO 9001 Compliant</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">TEP Process (Translate-Edit-Proof)</span>
                </li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">Data Security</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Encrypted file transfer</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">NDA protection</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">PIPEDA & GDPR compliant</span>
                </li>
              </ul>
            </div>

            {/* Technical Expertise */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <h3 className="font-bold text-[#0C2340] mb-4">Technical Expertise</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Energy sector specialists</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Engineering terminology</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#0891B2]/10 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Terminology management</span>
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
                CLIENT SUCCESS
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Supporting Global Operations for a Calgary-Based Energy Company
              </h2>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">15,000+</div>
                  <div className="text-sm text-gray-300">Pages Translated</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">12</div>
                  <div className="text-sm text-gray-300">Languages</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-3xl font-bold text-[#0891B2] mb-1">100%</div>
                  <div className="text-sm text-gray-300">On-Time Delivery</div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                When a major Calgary-based energy company expanded operations into the Middle East
                and South America, they needed a translation partner who understood both the technical
                complexity and the urgency of energy operations. Over 18 months, we translated
                technical manuals, safety procedures, and regulatory documents across 12 languages—
                maintaining consistent terminology and meeting every deadline.
              </p>

              <div className="flex flex-wrap gap-3">
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">Technical Manuals</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">HSE Documentation</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">Regulatory Filings</span>
                <span className="text-xs bg-white/10 text-gray-300 px-3 py-1 rounded-full">Training Materials</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <TrustedByLogos
        title="Trusted by Energy & Mining Companies"
        subtitle="From majors to independents, we serve the energy sector's translation needs"
        displayCount={12}
        bgClass="bg-gray-50"
      />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you need a single safety manual translated or support for a
            multi-year global project, we&apos;re here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
            >
              Get a Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
            >
              Speak to a Specialist
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-300">
            <a href="tel:+15876000786" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              (587) 600-0786
            </a>
            <a href="mailto:info@cethos.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              info@cethos.com
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
