import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'Cognitive Debriefing Services | ISPOR-Compliant Patient Interviews | Cethos',
  description: 'Professional cognitive debriefing services with 1,000+ trained moderators in 150+ languages. ISPOR-compliant patient interviews for PRO, ClinRO, ObsRO validation. FDA & EMA accepted.',
  keywords: ['cognitive debriefing', 'linguistic validation', 'PRO validation', 'patient interviews', 'ISPOR guidelines', 'clinical outcome assessment'],
  openGraph: {
    title: 'Cognitive Debriefing Services | Cethos',
    description: 'ISPOR-compliant cognitive debriefing with 1,000+ trained moderators in 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/cognitive-debriefing',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/cognitive-debriefing',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cognitive Debriefing Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "ISPOR-compliant cognitive debriefing services for linguistic validation of clinical outcome assessments.",
  "areaServed": "Worldwide",
  "serviceType": "Linguistic Validation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Cognitive Debriefing", "item": "https://cethos.com/services/lifesciences/cognitive-debriefing" }
  ]
}

export default function CognitiveDebriefingPage() {
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
            <li className="text-[#0C2340] font-medium">Cognitive Debriefing</li>
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
              Cognitive Debriefing Services
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              ISPOR-compliant patient interviews to validate translated clinical outcome assessments.
              1,000+ trained moderators across 150+ languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Quote
              </a>
              <a href="#process" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Our Process
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                1,000+ Trained Moderators
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                150+ Languages
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ISPOR Compliant
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                FDA & EMA Accepted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* What is Cognitive Debriefing */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">What is Cognitive Debriefing?</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Cognitive debriefing is a critical step in linguistic validation where native-speaking patients
              review translated clinical outcome assessments to ensure clarity, cultural relevance, and
              conceptual equivalence with the original instrument.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              The <strong>US FDA</strong> and <strong>EMA</strong> require cognitive debriefing to demonstrate
              content validity for translated instruments used in clinical trials and regulatory submissions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { stat: '1,000+', label: 'Trained Moderators' },
              { stat: '150+', label: 'Languages' },
              { stat: '25+', label: 'Therapeutic Areas' },
              { stat: '5,000+', label: 'Studies Completed' },
            ].map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Our Cognitive Debriefing Process</h2>
            <p className="mt-4 text-lg text-gray-600">A systematic approach aligned with ISPOR guidelines for maximum regulatory acceptance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { step: '1', title: 'Protocol Development', desc: 'Customized interview guides aligned with ISPOR best practices and your specific instrument.' },
              { step: '2', title: 'Participant Recruitment', desc: 'We recruit 5-8 qualified participants per language matching your target patient population.' },
              { step: '3', title: 'Interview Conduct', desc: 'Trained native-speaking moderators conduct structured interviews via video, phone, or in-person.' },
              { step: '4', title: 'Analysis & Reporting', desc: 'Comprehensive analysis of comprehension issues with actionable recommendations.' },
            ].map((item) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Instruments We Validate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { code: 'PRO', name: 'Patient-Reported Outcomes', desc: 'Self-reported health status, symptoms, quality of life' },
              { code: 'ClinRO', name: 'Clinician-Reported Outcomes', desc: 'Healthcare provider assessments and evaluations' },
              { code: 'ObsRO', name: 'Observer-Reported Outcomes', desc: 'Caregiver or family member observations' },
              { code: 'PerfO', name: 'Performance Outcomes', desc: 'Standardized tests and functional assessments' },
            ].map((instrument) => (
              <div key={instrument.code} className="border border-gray-200 rounded-xl p-6 hover:border-[#0891B2] transition-colors">
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Specialized Patient Populations</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">We have extensive experience recruiting and interviewing specialized populations that require adapted cognitive debriefing approaches.</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
            {[
              { name: 'Pediatric', detail: 'Ages 5-7, 8-12, 13-17' },
              { name: 'Geriatric', detail: 'Extended sessions, visual aids' },
              { name: 'Rare Disease', detail: 'Flexible recruitment' },
              { name: 'Cognitive Impairment', detail: 'Simplified probing' },
              { name: 'Caregiver/Observer', detail: 'Proxy respondents' },
            ].map((pop) => (
              <div key={pop.name} className="bg-white p-5 rounded-xl text-center">
                <h3 className="font-semibold text-[#0C2340]">{pop.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{pop.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4 max-w-3xl">
            {[
              { q: 'How many cognitive debriefing participants are needed per language?', a: 'ISPOR guidelines recommend 5-8 participants per language for cognitive debriefing interviews to ensure adequate assessment of patient comprehension and cultural appropriateness.' },
              { q: 'What interview formats are available for cognitive debriefing?', a: 'We offer video call, telephone, and in-person cognitive debriefing interviews depending on your study requirements, participant population, and geographic locations.' },
              { q: 'How long does cognitive debriefing take?', a: 'Cognitive debriefing typically takes 2-4 weeks depending on the number of languages, participant recruitment complexity, and interview scheduling requirements.' },
              { q: 'Can you recruit specialized patient populations?', a: 'Yes, we have extensive experience recruiting pediatric patients (ages 5-17), geriatric populations, rare disease patients, and individuals with cognitive impairment.' },
              { q: 'Is cognitive debriefing required by FDA and EMA?', a: 'Yes, both FDA and EMA require cognitive debriefing as part of linguistic validation to demonstrate content validity for translated clinical outcome assessments.' },
            ].map((faq, i) => (
              <details key={i} className="bg-gray-50 rounded-xl group">
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
      <section id="quote-form" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request a Cognitive Debriefing Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 24 hours. Our team will assess your requirements and provide a detailed proposal.</p>
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

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Validate Your Translations?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for ISPOR-compliant cognitive debriefing that meets FDA and EMA requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Get Your Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">No commitment required - Response within 24 hours - 150+ languages</p>
        </div>
      </section>
    </>
  )
}
