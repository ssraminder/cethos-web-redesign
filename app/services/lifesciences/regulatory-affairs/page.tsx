import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'Regulatory Affairs Translation | CTD, SmPC, PIL Translation | Cethos',
  description: 'Expert regulatory translation for CTD Modules 1-5, SmPCs, PILs, and IMP labels. FDA, EMA, PMDA, Health Canada submissions. ISO 17100 certified.',
  keywords: ['regulatory translation', 'CTD translation', 'SmPC translation', 'PIL translation', 'FDA submission', 'EMA submission', 'regulatory affairs'],
  openGraph: {
    title: 'Regulatory Affairs Translation | Cethos',
    description: 'Expert translation for global regulatory submissions to FDA, EMA, PMDA, and other agencies.',
    url: 'https://cethos.com/services/lifesciences/regulatory-affairs',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/regulatory-affairs',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Regulatory Affairs Translation Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Professional translation of regulatory documentation for global drug, biologic, and medical device submissions.",
  "areaServed": "Worldwide",
  "serviceType": "Regulatory Translation"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Regulatory Affairs", "item": "https://cethos.com/services/lifesciences/regulatory-affairs" }
  ]
}

export default function RegulatoryAffairsPage() {
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
            <li className="text-[#0C2340] font-medium">Regulatory Affairs</li>
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
              Regulatory Affairs Translation
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              Expert translation for global regulatory submissions. CTD modules, product labeling,
              and compliance documentation for FDA, EMA, and worldwide agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Quote
              </a>
              <a href="#ctd" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                CTD Translation
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                ISO 17100 Certified
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                8+ Regulatory Agencies
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                CTD Modules 1-5
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                150+ Languages
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Global Regulatory Submission Support</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Regulatory translation requires precision, consistency, and deep expertise in pharmaceutical
              and medical device terminology. Our specialized regulatory translators have extensive experience
              with <strong>FDA</strong>, <strong>EMA</strong>, <strong>PMDA</strong>, <strong>Health Canada</strong>,
              and other regulatory agency requirements.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              From CTD dossiers to product labeling, we provide accurate translations that meet the specific
              formatting and content requirements of each target market.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { stat: '3,000+', label: 'Submissions Supported' },
              { stat: '8+', label: 'Regulatory Agencies' },
              { stat: '100%', label: 'Acceptance Rate' },
              { stat: '48hr', label: 'Urgent Available' },
            ].map((item) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">CTD Module Translation</h2>
            <p className="mt-4 text-lg text-gray-600">Complete translation support for all Common Technical Document modules.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {[
              { module: 'Module 1', title: 'Regional Administrative Information', items: ['Cover letters', 'Application forms', 'Product information', 'Labeling'] },
              { module: 'Module 2', title: 'CTD Summaries', items: ['Quality Overall Summary', 'Nonclinical Overview', 'Clinical Overview', 'Nonclinical & Clinical Summaries'] },
              { module: 'Module 3', title: 'Quality Documentation', items: ['Drug substance info', 'Drug product info', 'Manufacturing process', 'Control of excipients'] },
              { module: 'Module 4', title: 'Nonclinical Study Reports', items: ['Pharmacology studies', 'Pharmacokinetics', 'Toxicology studies', 'Study reports'] },
              { module: 'Module 5', title: 'Clinical Study Reports', items: ['Clinical study reports', 'Tabular listings', 'Case report forms', 'Literature references'] },
              { module: 'Variations', title: 'Post-Approval Changes', items: ['Type IA/IB variations', 'Type II variations', 'Extensions', 'Renewals'] },
            ].map((ctd) => (
              <div key={ctd.module} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-[#0891B2] text-white text-sm font-semibold rounded">{ctd.module}</span>
                </div>
                <h3 className="font-semibold text-lg text-[#0C2340]">{ctd.title}</h3>
                <ul className="mt-4 space-y-2 text-gray-600 text-sm">
                  {ctd.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#0891B2] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Product Labeling Translation</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">Accurate translation of product labeling documents that meet local regulatory requirements and language conventions.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-[#0C2340] mb-4">SmPC (Summary of Product Characteristics)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Full SmPC translation</li>
                <li>Section-specific updates</li>
                <li>QRD template compliance</li>
                <li>Consistency with approved text</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-[#0C2340] mb-4">PILs (Patient Information Leaflets)</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Clear, patient-friendly language</li>
                <li>Readability testing support</li>
                <li>User testing documentation</li>
                <li>Layout and formatting</li>
              </ul>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-[#0C2340] mb-4">IMP Labels</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Primary container labels</li>
                <li>Secondary packaging</li>
                <li>Blinding labels</li>
                <li>Multi-language labels</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Agencies */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] text-center">Regulatory Agencies Supported</h2>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-3xl mx-auto">Our translations are accepted by major regulatory agencies worldwide.</p>

          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              { agency: 'FDA', country: 'USA' },
              { agency: 'EMA', country: 'European Union' },
              { agency: 'PMDA', country: 'Japan' },
              { agency: 'NMPA', country: 'China' },
              { agency: 'Health Canada', country: 'Canada' },
              { agency: 'MHRA', country: 'United Kingdom' },
              { agency: 'Swissmedic', country: 'Switzerland' },
              { agency: 'TGA', country: 'Australia' },
            ].map((reg) => (
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
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Frequently Asked Questions</h2>
          <div className="mt-10 space-y-4 max-w-3xl">
            {[
              { q: 'Do you translate full CTD dossiers?', a: 'Yes, we translate complete CTD dossiers including all five modules. We also handle partial translations, updates, and variations. Our translators have extensive experience with the technical and scientific content in each module.' },
              { q: 'How do you ensure regulatory compliance in translations?', a: 'Our regulatory translators are trained in the specific requirements of each target agency. We use agency-specific terminology databases, adhere to QRD templates where applicable, and maintain consistency with previously approved texts.' },
              { q: 'Can you handle urgent regulatory submissions?', a: 'Yes, we offer expedited services for urgent regulatory submissions with turnaround as fast as 48 hours depending on document length and complexity. Our 24/7 project management ensures continuous progress on critical timelines.' },
              { q: 'Do you provide certified translations for regulatory submissions?', a: 'Yes, all regulatory translations include translation certificates suitable for submission to FDA, EMA, and other regulatory agencies. We maintain complete audit trails and documentation as required.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request a Regulatory Translation Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 2 hours during business hours. Our team will assess your requirements and provide a detailed proposal.</p>
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
          <h2 className="text-3xl md:text-4xl font-bold">Ready for Your Next Regulatory Submission?</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for expert regulatory translation that meets global agency requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Get Your Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">Response within 2 hours - 8+ agencies supported - ISO 17100 certified</p>
        </div>
      </section>
    </>
  )
}
