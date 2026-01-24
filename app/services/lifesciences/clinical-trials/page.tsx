import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'Clinical Trial Translation Services | Protocols, ICFs, CRFs | Cethos',
  description: 'Specialized clinical trial document translation including protocols, ICFs, CRFs, patient materials, and site documentation. GCP-compliant with ISO 17100 certification.',
  keywords: ['clinical trial translation', 'protocol translation', 'ICF translation', 'informed consent translation', 'CRF translation', 'GCP compliant'],
  openGraph: {
    title: 'Clinical Trial Translation Services | Cethos',
    description: 'GCP-compliant clinical trial document translation for global studies across 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/clinical-trials',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/clinical-trials',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clinical Trial Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "GCP-compliant translation of clinical trial documentation including protocols, informed consent forms, and patient-facing materials.",
  "areaServed": "Worldwide",
  "serviceType": "Clinical Trial Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Clinical Trials", "item": "https://cethos.com/services/lifesciences/clinical-trials" }
  ]
}

export default function ClinicalTrialsPage() {
  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />

      {/* Breadcrumb */}
      <nav className="bg-gray-50 py-3 border-b pt-20" aria-label="Breadcrumb">
        <div className="container mx-auto px-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li><Link href="/" className="text-gray-500 hover:text-[#0891B2]">Home</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services" className="text-gray-500 hover:text-[#0891B2]">Services</Link></li>
            <li className="text-gray-400">/</li>
            <li><Link href="/services/lifesciences" className="text-gray-500 hover:text-[#0891B2]">Life Sciences</Link></li>
            <li className="text-gray-400">/</li>
            <li className="text-[#0C2340] font-medium">Clinical Trials</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0C2340] to-[#1a3a5c] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="inline-block bg-[#0891B2]/20 text-[#06B6D4] text-sm font-medium px-3 py-1 rounded-full mb-4">
              Life Sciences Translation
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Clinical Trial Translation Services
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              Comprehensive translation of clinical trial documentation for global studies.
              Protocols, ICFs, CRFs, and patient materials across 150+ languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Quote
              </a>
              <a href="#documents" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Document Types
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                GCP Compliant
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ISO 17100 Certified
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                150+ Languages
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Supporting Global Clinical Development</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Global clinical trials require accurate, consistent translation of critical documentation across all study sites.
              Our experienced team of medical translators and project managers ensures your clinical trial documents
              meet local regulatory requirements while maintaining consistency across all languages.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              From Phase I through post-marketing studies, we provide end-to-end translation support with
              <strong> GCP-compliant workflows</strong> and <strong>ISO 17100 certification</strong>.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { stat: '5,000+', label: 'Studies Supported' },
              { stat: '150+', label: 'Languages' },
              { stat: '24hr', label: 'Turnaround Available' },
              { stat: '99.9%', label: 'On-Time Delivery' },
            ].map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Documents We Translate</h2>
            <p className="mt-4 text-lg text-gray-600">Comprehensive translation support for all clinical trial documentation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Protocol-Related Documents</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Clinical Trial Protocols
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Protocol Amendments
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Investigator Brochures (IBs)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Case Report Forms (CRFs/eCRFs)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Study Manuals
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Patient-Facing Documents</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Informed Consent Forms (ICFs)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Assent Forms (Pediatric)
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Patient Information Sheets
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Patient Diaries
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Recruitment Materials
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Site Documentation</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Investigator Meeting Decks
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Site Initiation Materials
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  E-Learning Modules
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Operations Manuals
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  Training Certificates
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Our Clinical Translation Process</h2>
            <p className="mt-4 text-lg text-gray-600">A GCP-compliant workflow designed for accuracy, consistency, and speed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { step: '1', title: 'Project Setup', desc: 'Glossary development, style guide creation, and translation memory setup for your study.' },
              { step: '2', title: 'Translation', desc: 'Professional medical translators with therapeutic area expertise translate your documents.' },
              { step: '3', title: 'Review', desc: 'Independent medical review and quality assurance by a second qualified linguist.' },
              { step: '4', title: 'Delivery', desc: 'Formatted deliverables with translation certificates and comprehensive audit trail.' },
            ].map((item) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4 max-w-3xl">
            {[
              { q: 'What is the typical turnaround time for ICF translation?', a: 'Standard turnaround for informed consent form translation is 5-7 business days per language. We offer expedited services with 24-48 hour turnaround for urgent needs. Turnaround depends on document length and language pair.' },
              { q: 'Do you provide back translation for clinical trial documents?', a: 'Yes, we provide certified back translation services for all clinical trial documents when required by your sponsor or ethics committee. Back translations are performed by independent translators who have not seen the source text.' },
              { q: 'How do you ensure consistency across multiple study amendments?', a: 'We maintain dedicated translation memories and glossaries for each study. All amendments reference the existing TM to ensure consistent terminology and phrasing across document versions and languages.' },
              { q: 'Can you handle urgent protocol amendments?', a: 'Yes, we have 24/7 project management support and can accommodate urgent protocol amendments with expedited turnaround. Contact us to discuss your specific timeline requirements.' },
              { q: 'Do you provide regulatory submission support?', a: 'Yes, we provide translation certificates and documentation suitable for regulatory submission to FDA, EMA, and other regulatory agencies. All translations are performed in compliance with GCP guidelines.' },
            ].map((faq, i) => (
              <details key={i} className="bg-white rounded-xl group">
                <summary className="p-5 font-semibold text-[#0C2340] cursor-pointer hover:text-[#0891B2] list-none flex justify-between items-center">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-gray-600">{faq.a}</p>
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request a Clinical Trial Translation Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 2 hours during business hours. Our team will assess your requirements and provide a detailed proposal.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Launch Your Global Study?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for GCP-compliant clinical trial translation that meets regulatory requirements worldwide.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Get Your Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Response within 2 hours - 150+ languages - 24/7 support available</p>
        </div>
      </section>
    </>
  )
}
