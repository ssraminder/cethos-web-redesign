import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'eCOA Migration Services | ePRO Platform Translation | Cethos',
  description: 'Expert eCOA migration and ePRO platform translation services. Screenshot review, audio recording, IVRS localization, and format adaptation for clinical trials.',
  keywords: ['eCOA migration', 'ePRO translation', 'electronic COA', 'IVRS translation', 'screenshot review', 'clinical trial technology'],
  openGraph: {
    title: 'eCOA Migration Services | Cethos',
    description: 'Professional eCOA migration and ePRO platform translation for clinical outcome assessment digitization.',
    url: 'https://cethos.com/services/lifesciences/ecoa-migration',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/ecoa-migration',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "eCOA Migration Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Professional eCOA migration services for adapting paper-based clinical outcome assessments to electronic platforms.",
  "areaServed": "Worldwide",
  "serviceType": "eCOA Migration"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "eCOA Migration", "item": "https://cethos.com/services/lifesciences/ecoa-migration" }
  ]
}

export default function EcoaMigrationPage() {
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
            <li className="text-[#0C2340] font-medium">eCOA Migration</li>
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
              eCOA Migration Services
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              Adapt paper-based instruments for electronic administration.
              Platform translation, screenshot review, and audio recording across 150+ languages.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Quote
              </a>
              <a href="#services" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Our Services
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                All eCOA Platforms
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Screenshot Review
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                Audio Recording
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                IVRS/IVR Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">What is eCOA Migration?</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Electronic Clinical Outcome Assessment (eCOA) migration adapts paper-based instruments
              for electronic administration on tablets, smartphones, and web-based platforms. This process
              ensures translations display correctly on digital devices while maintaining equivalence
              with validated paper versions.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our eCOA migration services cover the complete localization workflow from platform
              translation through <strong>screenshot review</strong>, <strong>audio recording</strong>,
              and <strong>format adaptation</strong> for all target languages.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { stat: '500+', label: 'eCOA Projects' },
              { stat: '150+', label: 'Languages' },
              { stat: '20+', label: 'Platform Partners' },
              { stat: '100%', label: 'QC Coverage' },
            ].map((item) => (
              <div key={item.label} className="text-center p-6 bg-gray-50 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-[#0891B2]">{item.stat}</div>
                <div className="text-gray-600 mt-2">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Our eCOA Migration Services</h2>
            <p className="mt-4 text-lg text-gray-600">End-to-end localization support for electronic clinical outcome assessments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              {
                title: 'Platform Translation',
                desc: 'Translation of UI strings, navigation elements, error messages, and system prompts for eCOA platforms.',
                icon: (
                  <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Screenshot Review',
                desc: 'Verification that translations display correctly on all target devices without truncation or formatting issues.',
                icon: (
                  <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )
              },
              {
                title: 'Audio Recording',
                desc: 'Professional voice recording for IVRS systems and audio-assisted ePRO applications in native voices.',
                icon: (
                  <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                )
              },
              {
                title: 'Format Localization',
                desc: 'Adaptation of date, time, number formats, and measurement units for each target locale.',
                icon: (
                  <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                )
              },
            ].map((service) => (
              <div key={service.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-14 h-14 bg-[#0891B2]/10 rounded-xl flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-lg text-[#0C2340]">{service.title}</h3>
                <p className="text-gray-600 mt-2">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">eCOA Migration Process</h2>
            <p className="mt-4 text-lg text-gray-600">A systematic approach to ensure accurate display and functionality across all devices.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { step: '1', title: 'Source Review', desc: 'Review of paper instrument and platform specifications to identify migration requirements.' },
              { step: '2', title: 'Translation', desc: 'Translation of instrument content with consideration for character limits and display constraints.' },
              { step: '3', title: 'Integration', desc: 'Upload of translations to eCOA platform and initial testing in development environment.' },
              { step: '4', title: 'QC & Review', desc: 'Screenshot review, audio recording QC, and final validation across all target devices.' },
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

      {/* Platforms */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center">eCOA Platforms We Support</h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">We have experience with all major eCOA/ePRO platform providers.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              'Medidata Rave eCOA',
              'IQVIA eCOA',
              'YPrime',
              'Signant Health',
              'Clario (ERT)',
              'Medable',
              'Science 37',
              'THREAD',
              'Oracle Health Sciences',
              'Veeva Vault eCOA',
              'CRF Health',
              'And many more...'
            ].map((platform) => (
              <div key={platform} className="bg-white px-4 py-3 rounded-lg text-center text-gray-700 text-sm">
                {platform}
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
              { q: 'What is the difference between eCOA migration and standard translation?', a: 'eCOA migration involves additional steps beyond translation including character count optimization, screenshot review to verify proper display, and format localization for dates, times, and numbers. Standard translation does not account for the technical constraints of electronic platforms.' },
              { q: 'Do you provide audio recording for IVRS systems?', a: 'Yes, we provide professional audio recording services for Interactive Voice Response Systems (IVRS) and audio-assisted ePRO applications. All recordings are performed by native speakers with clear diction and appropriate pacing for patient comprehension.' },
              { q: 'How do you handle character limits in eCOA platforms?', a: 'We work within specified character limits during the translation process. When translations naturally exceed limits, we provide alternative phrasings that preserve meaning while fitting the display constraints. All solutions are documented in our deliverables.' },
              { q: 'Can you work directly with our eCOA vendor?', a: 'Yes, we have established workflows with all major eCOA platform providers. We can receive files directly from your vendor, upload translations to their systems, and coordinate screenshot review and audio recording deliverables.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request an eCOA Migration Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 24 hours. Our team will assess your platform requirements and provide a detailed proposal.</p>
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <LifeSciencesQuoteForm
                variant="general"
                defaultServiceType="ecoa"
                hideServiceSelector={true}
                formLocation="ecoa-migration"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to Migrate Your COA Instruments?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for expert eCOA migration that ensures accurate display across all devices and languages.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Get Your Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Response within 24 hours - All platforms supported - 150+ languages</p>
        </div>
      </section>
    </>
  )
}
