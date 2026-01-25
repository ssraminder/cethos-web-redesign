'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import TrustedByLogos from '@/components/TrustedByLogos'

// FAQ Accordion Item Component
function FAQItem({ question, answer, isOpen, onClick }: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center"
        onClick={onClick}
      >
        <span className="font-semibold text-[#0C2340]">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-600">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function AboutPageContent() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const faqItems = [
    {
      question: "Where is Cethos located?",
      answer: "Our corporate headquarters is in Calgary, Canada, with additional offices in Dubai, UAE and Patiala, India. This three-continent presence enables 24/7 operations and local expertise worldwide."
    },
    {
      question: "Are your translations accepted by IRCC?",
      answer: "Yes. We are approved by the Government of Alberta and our certified translations are accepted by IRCC, Service Alberta, universities, and legal institutions across Canada."
    },
    {
      question: "Do you use machine translation?",
      answer: "No. All translations are performed by professional human linguists. We use technology for consistency and quality assurance, but never for the translation itself."
    },
    {
      question: "Do you work with clients outside of Canada?",
      answer: "Absolutely. We serve clients in 50+ countries across six continents, including the US, UK, EU, Middle East, and Asia-Pacific regions."
    },
    {
      question: "What industries do you specialize in?",
      answer: "Life sciences (pharmaceutical, biotech, medical devices), oil & gas, legal, immigration, technology, and finance. We have deep expertise in regulated industries."
    },
    {
      question: "How quickly can you deliver?",
      answer: "Standard certified translations are completed in 1-2 business days. Rush service (same-day or 24-hour) is available. Enterprise project timelines are based on scope."
    }
  ]

  return (
    <main className="min-h-screen bg-white">
      {/* Section 1: Hero */}
      <section className="min-h-[400px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center">
        <div className="container mx-auto px-4 text-center">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">About</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Global Communication. Local Precision.
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8">
            Cethos Solutions Inc. is a Canadian translation company with offices across
            three continents—serving life sciences enterprises and individuals worldwide
            in 200+ languages.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="bg-[#0C2340] border-t border-white/10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm text-gray-300">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Founded 2015
            </span>
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
              Offices in Canada, UAE & India
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              ISO 17100 Compliant
            </span>
          </div>
        </div>
      </div>

      {/* Section 2: Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Text Content - 3 columns */}
            <div className="lg:col-span-3">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-6">
                Our Story
              </h2>

              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Founded in 2015, Cethos Solutions Inc. has grown from a Canadian translation
                  agency into a global language services provider with operations spanning
                  three continents.
                </p>
                <p>
                  What started as a mission to bridge language barriers has evolved into an
                  international operation trusted by Fortune 500 pharmaceutical companies,
                  multinational energy corporations, and government agencies worldwide—alongside
                  thousands of individuals and families navigating immigration processes.
                </p>
                <p>
                  Today, our team of 5,000+ linguists serves clients in over 50 countries,
                  delivering translations in 200+ languages with offices strategically
                  positioned across North America, the Middle East, and Asia-Pacific.
                </p>
                <p>
                  Our name &ldquo;Cethos&rdquo; reflects our commitment to bridging cultures—connecting
                  people, businesses, and ideas across linguistic boundaries.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-6 mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span>Canadian-Owned<br/>& Operated</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span>BBB A+<br/>Accredited</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <span>AILIA Corporate<br/>Member</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <span>Government of Alberta<br/>Approved</span>
                </div>
              </div>
            </div>

            {/* Image - 2 columns */}
            <div className="lg:col-span-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0891B2]/20 to-[#0C2340]/20 rounded-2xl transform rotate-3"></div>
                <div className="relative rounded-2xl shadow-xl overflow-hidden aspect-[4/5] bg-gradient-to-br from-[#0C2340] to-[#0891B2] flex items-center justify-center">
                  <div className="text-center p-8">
                    <svg className="w-24 h-24 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-white/50 text-sm">Global Team</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Global Operations, Canadian Roots */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Global Operations. Canadian Roots.
            </h2>
            <p className="text-lg text-gray-600">
              Headquartered in Canada with strategic offices in the UAE and India, Cethos serves
              clients across six continents. Our distributed model isn&apos;t just about time zones—it&apos;s
              about having local expertise where our clients and their audiences are.
            </p>
          </div>

          {/* Location Highlights */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Calgary */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                <Image
                  src="https://flagcdn.com/w40/ca.png"
                  alt="Canada"
                  width={28}
                  height={21}
                  className="rounded-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-2">Calgary, Canada</h3>
              <p className="text-sm text-[#0891B2] font-medium mb-3">Corporate Headquarters</p>
              <p className="text-gray-600 text-sm">
                Home to our executive team, life sciences division, and enterprise client management.
                As a Canadian company, we bring North American business standards, data privacy
                compliance (PIPEDA), and direct access to Government of Alberta approved certified translations.
              </p>
            </div>

            {/* Dubai */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Image
                  src="https://flagcdn.com/w40/ae.png"
                  alt="UAE"
                  width={28}
                  height={21}
                  className="rounded-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-2">Dubai, UAE</h3>
              <p className="text-sm text-[#0891B2] font-medium mb-3">EMEA Hub</p>
              <p className="text-gray-600 text-sm">
                Our Middle East office coordinates European, Middle Eastern, and African language projects.
                Strategically positioned for regulatory submissions to EMA and support for Arabic, Farsi,
                Turkish, and African language translations.
              </p>
            </div>

            {/* India */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <Image
                  src="https://flagcdn.com/w40/in.png"
                  alt="India"
                  width={28}
                  height={21}
                  className="rounded-sm"
                />
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-2">Patiala, India</h3>
              <p className="text-sm text-[#0891B2] font-medium mb-3">Asia-Pacific Production Center</p>
              <p className="text-gray-600 text-sm">
                Our largest production facility powers translations across South Asian, Southeast Asian,
                and East Asian languages. Home to our 24/7 support operations and linguist network management.
              </p>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0C2340] mb-1">50+ Countries</h4>
              <p className="text-sm text-gray-500">Clients across six continents</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0C2340] mb-1">24/7 Operations</h4>
              <p className="text-sm text-gray-500">Follow-the-sun coverage</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0C2340] mb-1">Native Speakers</h4>
              <p className="text-sm text-gray-500">Local expertise worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-[#0C2340] mb-1">Multi-Jurisdictional</h4>
              <p className="text-sm text-gray-500">FDA, EMA, Health Canada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Global Presence (Detailed Office Cards) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Local Expertise. Global Scale.
            </h2>
            <p className="text-lg text-gray-600">
              Three offices across three time zones ensure your projects move forward 24 hours a day.
            </p>
          </div>

          {/* Office Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calgary Office */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-[#0C2340] p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://flagcdn.com/w40/ca.png"
                    alt="Canada"
                    width={32}
                    height={24}
                    className="rounded"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">North America</h3>
                    <p className="text-[#0891B2] text-sm">Calgary, Canada</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#0891B2]/10 text-[#0891B2] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  CORPORATE HEADQUARTERS
                </span>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <p className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>421 7 Avenue SW, Floor 30<br/>Calgary, AB T2P 4K9, Canada</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mon–Fri, 9:00 AM – 5:00 PM MST</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span>(587) 600-0786</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">SERVICES</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Executive Leadership</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Life Sciences Division</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Enterprise Sales</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Quality Assurance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dubai Office */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-[#0C2340] p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://flagcdn.com/w40/ae.png"
                    alt="UAE"
                    width={32}
                    height={24}
                    className="rounded"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">EMEA</h3>
                    <p className="text-[#0891B2] text-sm">Dubai, UAE</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#0891B2]/10 text-[#0891B2] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  EUROPE, MIDDLE EAST & AFRICA HUB
                </span>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <p className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Building A1, Dubai Digital Park<br/>Dubai Silicon Oasis, Dubai, UAE</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Sun–Thu, 9:00 AM – 6:00 PM GST</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">SERVICES</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">European Coordination</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">EMA Submissions</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Arabic Languages</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">EMEA Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* India Office */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-[#0C2340] p-6">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://flagcdn.com/w40/in.png"
                    alt="India"
                    width={32}
                    height={24}
                    className="rounded"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">Asia-Pacific</h3>
                    <p className="text-[#0891B2] text-sm">Patiala, India</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="inline-block bg-[#0891B2]/10 text-[#0891B2] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  PRODUCTION CENTER
                </span>

                <div className="space-y-3 text-sm text-gray-600 mb-6">
                  <p className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>158/3, Dharampura Bazaar<br/>Patiala 147001, Punjab, India</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Mon–Fri, 9:00 AM – 6:00 PM IST</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-2">SERVICES</p>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">24/7 Support</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Production Operations</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Asian Languages</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">Linguist Network</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Zone Visualization */}
          <div className="mt-12 bg-[#0C2340] rounded-2xl p-8 text-center">
            <p className="text-[#0891B2] font-medium mb-2">FOLLOW-THE-SUN OPERATIONS</p>
            <p className="text-white text-lg">
              &ldquo;When Calgary sleeps, Dubai works. When Dubai rests, India delivers.<br/>
              <span className="text-gray-300">Your projects move forward 24 hours a day.&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: By The Numbers */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              By The Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">200+</div>
              <div className="text-sm text-gray-600">Languages Supported</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">50+</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">5,000+</div>
              <div className="text-sm text-gray-600">Professional Linguists</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">1,000+</div>
              <div className="text-sm text-gray-600">Debriefing Moderators</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">25+</div>
              <div className="text-sm text-gray-600">Therapeutic Areas</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-4xl font-bold text-[#0891B2] mb-2">4.9</div>
              <div className="text-sm text-gray-600">Google Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: What We Do (Service Pillars) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Expert Translation Across Industries
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Life Sciences */}
            <div className="bg-gradient-to-br from-[#0C2340] to-[#0F3A5C] rounded-2xl p-8 text-white">
              <div className="w-14 h-14 bg-[#0891B2] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Life Sciences Translation</h3>
              <p className="text-gray-300 mb-6">
                For pharmaceutical, biotech, and medical device companies conducting
                global clinical trials and regulatory submissions.
              </p>

              <ul className="space-y-2 mb-8">
                {[
                  'Linguistic Validation (ISPOR methodology)',
                  'Cognitive Debriefing',
                  'Clinician Review',
                  'Clinical Trial Documentation',
                  'Regulatory Affairs Translation',
                  'Pharmacovigilance & Safety',
                  'eCOA/ePRO Migration',
                  'Medical Device IFUs'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-200">
                    <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href="/services/lifesciences"
                className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold"
              >
                Learn More
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Certified Translation */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <div className="w-14 h-14 bg-[#0C2340] rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-4">Certified Translation</h3>
              <p className="text-gray-600 mb-6">
                For individuals and businesses needing official document translation
                accepted by IRCC, Government of Alberta, and institutions worldwide.
              </p>

              <ul className="space-y-2 mb-8">
                {[
                  'Immigration Documents (IRCC approved)',
                  'Birth & Marriage Certificates',
                  'Academic Transcripts & Diplomas',
                  "Driver's License Translation",
                  'Legal Documents & Contracts',
                  'Business Documents'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Government of Alberta Approved
                </span>
                <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Same-day service available
                </span>
              </div>

              <Link
                href="/services/certified"
                className="inline-flex items-center gap-2 text-[#0891B2] hover:text-[#06B6D4] font-semibold"
              >
                Get a Quote
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Industries We Serve */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Industries We Serve
            </h2>
            <p className="text-lg text-gray-600">
              Deep expertise across regulated industries worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Pharmaceutical & Biotech', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z', href: '/industries/pharmaceutical' },
              { name: 'Medical Devices', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
              { name: 'Oil & Gas', icon: 'M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z', href: '/industries/energy-mining' },
              { name: 'Healthcare', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', href: '/industries/healthcare' },
              { name: 'Legal', icon: 'M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3', href: '/industries/legal' },
              { name: 'Immigration', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2' },
              { name: 'Technology', icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4', href: '/industries/technology' },
              { name: 'Finance & Banking', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', href: '/industries/finance' },
              { name: 'Energy & Mining', icon: 'M13 10V3L4 14h7v7l9-11h-7z', href: '/industries/energy-mining' },
              { name: 'Government', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' }
            ].map((industry) => {
              const content = (
                <>
                  <div className="w-12 h-12 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={industry.icon} />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-[#0C2340] text-sm">{industry.name}</h3>
                </>
              )

              return industry.href ? (
                <Link
                  key={industry.name}
                  href={industry.href}
                  className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100 block"
                >
                  {content}
                </Link>
              ) : (
                <div key={industry.name} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow border border-gray-100">
                  {content}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 8: Our Approach (Differentiators) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              The Cethos Difference
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Human Translations',
                description: "Every translation is performed by professional human linguists—never raw machine translation. We use technology to enhance consistency and efficiency, but human expertise drives quality.",
                icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
              },
              {
                title: 'Subject Matter Expertise',
                description: "Our translators aren't just language experts—they're specialists in their fields. Medical translators with PhDs. Legal translators who are practicing lawyers. Real expertise matters.",
                icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
              },
              {
                title: 'Rigorous Quality Control',
                description: 'Multi-step review process including translation, editing, proofreading, and specialized review (clinician review for medical, legal review for contracts). Nothing ships without multiple expert eyes.',
                icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
              },
              {
                title: 'Flexible & Fast',
                description: 'From same-day certified translations to year-long clinical trial programs, we scale to your needs. Rush delivery available without compromising quality.',
                icon: 'M13 10V3L4 14h7v7l9-11h-7z'
              },
              {
                title: 'Transparent Communication',
                description: 'Clear, upfront quotes with no hidden fees. Dedicated project managers. Real-time status updates. Enterprise projects receive detailed quotes within 24 hours.',
                icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
              },
              {
                title: 'Secure & Confidential',
                description: 'Bank-level encryption, secure file transfer, NDA protection, and compliance with global data protection regulations. Your data stays safe.',
                icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z'
              }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-16 h-16 bg-[#0891B2]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#0C2340] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Quality & Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Quality Without Compromise
            </h2>
            <p className="text-lg text-gray-600">
              Our processes align with international standards for translation quality,
              data security, and regulatory compliance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { name: 'ISO 17100', status: 'Compliant', description: 'Translation services quality standard' },
              { name: 'ISO 9001', status: 'Compliant', description: 'Quality management systems' },
              { name: 'GCP', status: 'Compliant', description: 'Good Clinical Practice' },
              { name: 'ISPOR Guidelines', status: 'Followed', description: 'Linguistic validation standards' }
            ].map((standard) => (
              <div key={standard.name} className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <div className="w-14 h-14 bg-[#0C2340] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-sm">{standard.name.includes('ISO') ? 'ISO' : standard.name.split(' ')[0]}</span>
                </div>
                <h3 className="font-bold text-[#0C2340] mb-1">{standard.name}</h3>
                <p className="text-sm text-[#0891B2] font-medium mb-2">{standard.status}</p>
                <p className="text-xs text-gray-500">{standard.description}</p>
              </div>
            ))}
          </div>

          {/* Data Privacy */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { name: 'GDPR', description: 'European data protection' },
              { name: 'PIPEDA', description: 'Canadian privacy legislation' },
              { name: 'HIPAA', description: 'US healthcare data protection' }
            ].map((privacy) => (
              <div key={privacy.name} className="bg-white rounded-xl p-6 text-center border border-gray-100">
                <h3 className="font-bold text-[#0C2340] mb-1">{privacy.name}</h3>
                <p className="text-sm text-gray-500">{privacy.description}</p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-gray-200">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0C2340]">BBB A+</div>
              <div className="text-sm text-gray-500">Accredited Business</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0C2340]">AILIA</div>
              <div className="text-sm text-gray-500">Corporate Member</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0C2340]">Gov. of Alberta</div>
              <div className="text-sm text-gray-500">Approved Provider</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Client Logos */}
      <TrustedByLogos
        title="Trusted by Leading Organizations"
        subtitle="From Fortune 500 pharmaceutical companies to government agencies and individuals worldwide"
        displayCount={12}
        bgClass="bg-white"
      />

      {/* Section 11: FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 12: CTA */}
      <section className="bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2] py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Whether you need a single document translated or a global clinical trial supported,
            we&apos;re here to help.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/30 transition-colors"
            >
              Contact Our Team
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
    </main>
  )
}
