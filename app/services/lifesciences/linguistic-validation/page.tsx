import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'Linguistic Validation Services | ISPOR-Compliant COA Translation | Cethos',
  description: 'Expert linguistic validation services following ISPOR 9-step methodology. PRO, ClinRO, ObsRO, and PerfO instrument translation for 25+ therapeutic areas. FDA & EMA compliant.',
  keywords: ['linguistic validation', 'ISPOR guidelines', 'PRO translation', 'ClinRO validation', 'COA translation', 'clinical outcome assessment', 'back translation'],
  openGraph: {
    title: 'Linguistic Validation Services | Cethos',
    description: 'ISPOR-compliant linguistic validation with 5,000+ specialized linguists across 150+ languages.',
    url: 'https://cethos.com/services/lifesciences/linguistic-validation',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/linguistic-validation',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Linguistic Validation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "ISPOR-compliant linguistic validation services for clinical outcome assessments used in clinical trials and regulatory submissions.",
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
    { "@type": "ListItem", "position": 4, "name": "Linguistic Validation", "item": "https://cethos.com/services/lifesciences/linguistic-validation" }
  ]
}

export default function LinguisticValidationPage() {
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
            <li className="text-[#0C2340] font-medium">Linguistic Validation</li>
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
              Linguistic Validation Services
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              Gold-standard ISPOR 9-step methodology for translating Clinical Outcome Assessments.
              Ensuring conceptual equivalence across all target languages.
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
                5,000+ Specialized Linguists
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                25+ Therapeutic Areas
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

      {/* What is Linguistic Validation */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">What is Linguistic Validation?</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Linguistic validation is the gold standard methodology for translating Clinical Outcome Assessments (COAs)
              used in clinical trials. Unlike standard translation, linguistic validation ensures <strong>conceptual equivalence</strong> across
              all target languages while maintaining the psychometric properties of the original instrument.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Regulatory agencies including the <strong>FDA</strong>, <strong>EMA</strong>, and <strong>PMDA</strong> require
              linguistic validation for all patient-reported outcome instruments used in clinical trials to support
              labeling claims.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { stat: '5,000+', label: 'Specialized Linguists' },
              { stat: '150+', label: 'Languages' },
              { stat: '25+', label: 'Therapeutic Areas' },
              { stat: '10,000+', label: 'Instruments Validated' },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-[#0891B2]">{item.stat}</div>
                <div className="text-gray-600 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ISPOR 9-Step Process */}
      <section id="process" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">ISPOR 9-Step Linguistic Validation Process</h2>
            <p className="mt-4 text-lg text-gray-600">Our methodology follows ISPOR Task Force recommendations for the translation and cultural adaptation of PRO measures.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { step: '1', title: 'Forward Translation', desc: 'Two independent native-speaking translators produce separate translations of the source instrument.' },
              { step: '2', title: 'Reconciliation', desc: 'Translations are compared and synthesized into a single reconciled version by a third linguist.' },
              { step: '3', title: 'Back Translation', desc: 'Reconciled version is translated back to the source language by an independent translator.' },
              { step: '4', title: 'Back Translation Review', desc: 'Comparison of back translation to source to identify conceptual discrepancies.' },
              { step: '5', title: 'Cognitive Debriefing', desc: '5-8 patient interviews per language to assess comprehension and cultural appropriateness.' },
              { step: '6', title: 'CD Review', desc: 'Analysis of cognitive debriefing findings and implementation of necessary modifications.' },
              { step: '7', title: 'Harmonization', desc: 'Final review meeting with all stakeholders to achieve cross-cultural consensus.' },
              { step: '8', title: 'Proofreading', desc: 'Final linguistic quality check for grammar, spelling, and formatting.' },
              { step: '9', title: 'Final Report', desc: 'Comprehensive documentation with full audit trail for regulatory submission.' },
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
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">We have extensive experience validating all types of Clinical Outcome Assessments (COAs) across therapeutic areas.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { code: 'PRO', name: 'Patient-Reported Outcomes', desc: 'Self-reported health status, symptoms, quality of life, functioning, and treatment satisfaction.' },
              { code: 'ClinRO', name: 'Clinician-Reported Outcomes', desc: 'Healthcare provider assessments of observable signs, symptoms, and behaviors.' },
              { code: 'ObsRO', name: 'Observer-Reported Outcomes', desc: 'Caregiver or family member observations of patient health status.' },
              { code: 'PerfO', name: 'Performance Outcomes', desc: 'Standardized tests measuring physical or cognitive function.' },
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

      {/* Therapeutic Areas */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Therapeutic Areas</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">Our linguists have deep expertise across 25+ therapeutic areas, ensuring accurate translation of specialized medical terminology.</p>

          <div className="flex flex-wrap gap-3 mt-10">
            {[
              'Oncology & Hematology', 'Central Nervous System', 'Cardiology', 'Dermatology',
              'Endocrinology & Diabetes', 'Gastroenterology', 'Respiratory', 'Rheumatology',
              'Ophthalmology', 'Rare Diseases', 'Pediatrics', 'Psychiatry & Mental Health',
              'Immunology', 'Nephrology', 'Infectious Disease', 'Womens Health',
              'Urology', 'Orthopedics', 'Pain Management', 'Hematology'
            ].map((area) => (
              <span key={area} className="px-4 py-2 bg-white text-gray-700 rounded-lg text-sm border border-gray-200">
                {area}
              </span>
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
              { q: 'What is the difference between linguistic validation and standard translation?', a: 'Linguistic validation follows a rigorous multi-step process (ISPOR 9-step methodology) that includes dual forward translation, back translation, cognitive debriefing with patients, and harmonization review. Standard translation lacks these quality controls and patient input, making it unsuitable for clinical outcome assessments.' },
              { q: 'Which regulatory agencies require linguistic validation?', a: 'FDA, EMA, PMDA, Health Canada, MHRA, and other major regulatory agencies require linguistic validation for PRO instruments used to support labeling claims in clinical trials. This includes all patient-reported outcome measures used as primary or secondary endpoints.' },
              { q: 'How long does a full linguistic validation project take?', a: 'A typical linguistic validation project takes 6-12 weeks depending on the number of languages, instrument complexity, and cognitive debriefing requirements. We can accommodate accelerated timelines when needed.' },
              { q: 'Do you provide licensing support for validated instruments?', a: 'Yes, we work with instrument developers and copyright holders to ensure proper licensing agreements are in place before beginning translation. We can also advise on public domain instruments and help navigate licensing requirements.' },
              { q: 'What documentation do you provide for regulatory submissions?', a: 'We provide comprehensive linguistic validation reports including translation certificates, back translation certificates, cognitive debriefing reports, harmonization meeting minutes, and a complete audit trail suitable for regulatory submission.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request a Linguistic Validation Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 24 hours. Our team will assess your requirements and provide a detailed proposal.</p>
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <LifeSciencesQuoteForm
                variant="linguistic-validation"
                hideServiceSelector={true}
                formLocation="linguistic-validation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Validate Your COA Instruments?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for ISPOR-compliant linguistic validation that meets FDA and EMA requirements.</p>
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
