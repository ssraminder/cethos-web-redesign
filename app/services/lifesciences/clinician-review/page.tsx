import { Metadata } from 'next'
import Link from 'next/link'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'

export const metadata: Metadata = {
  title: 'Clinician Review Services | Medical Expert Translation Review | Cethos',
  description: 'Expert clinical review by 300+ board-certified physicians, PharmDs, and specialist nurses. Medical accuracy verification for PRO instruments, protocols, ICFs, and regulatory documents.',
  keywords: ['clinician review', 'medical review', 'physician review', 'clinical translation review', 'PRO review', 'medical expert review'],
  openGraph: {
    title: 'Clinician Review Services | Cethos',
    description: 'Expert medical review by 300+ board-certified physicians and healthcare professionals.',
    url: 'https://cethos.com/services/lifesciences/clinician-review',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://cethos.com/services/lifesciences/clinician-review',
  },
}

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Clinician Review Services",
  "provider": {
    "@type": "Organization",
    "name": "Cethos Solutions Inc.",
    "url": "https://cethos.com"
  },
  "description": "Expert medical review by board-certified physicians, PharmDs, and specialist nurses to ensure clinical accuracy of translated documents.",
  "areaServed": "Worldwide",
  "serviceType": "Medical Translation Review"
}

const breadcrumbData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://cethos.com" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://cethos.com/services" },
    { "@type": "ListItem", "position": 3, "name": "Life Sciences", "item": "https://cethos.com/services/lifesciences" },
    { "@type": "ListItem", "position": 4, "name": "Clinician Review", "item": "https://cethos.com/services/lifesciences/clinician-review" }
  ]
}

export default function ClinicianReviewPage() {
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
            <li className="text-[#0C2340] font-medium">Clinician Review</li>
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              Clinician Review Services
            </h1>
            <p className="text-xl md:text-2xl mt-6 text-gray-300 max-w-3xl">
              Expert medical review by board-certified physicians and healthcare professionals
              to ensure clinical accuracy of your translated documents.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Get a Quote
              </a>
              <a href="#reviewers" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
                Our Reviewers
              </a>
            </div>
            <div className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                300+ Medical Professionals
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                25+ Therapeutic Areas
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                48-Hour Urgent Service
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Clinician Review */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Why Clinician Review?</h2>
            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Clinician review ensures that translated clinical documents maintain medical accuracy,
              use appropriate terminology, and are suitable for healthcare professionals and patients
              in the target market.
            </p>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Our network of <strong>300+ board-certified physicians, PharmDs, and specialist nurses</strong> provides
              expert review across <strong>25+ therapeutic areas</strong> to identify and correct clinical inaccuracies
              that may have been introduced during translation.
            </p>
          </div>
        </div>
      </section>

      {/* Reviewer Network */}
      <section id="reviewers" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Our Reviewer Network</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">All reviewers are licensed healthcare professionals with native-level language proficiency and relevant clinical experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            {[
              { title: 'Physicians (MD/DO)', count: '150+', desc: 'Board-certified across specialties' },
              { title: 'PharmDs', count: '80+', desc: 'Clinical pharmacy expertise' },
              { title: 'Specialist Nurses', count: '50+', desc: 'Oncology, cardiology, neurology' },
              { title: 'Subject Experts', count: '20+', desc: 'Regulatory, safety, medical writing' },
            ].map((reviewer) => (
              <div key={reviewer.title} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-4xl font-bold text-[#0891B2]">{reviewer.count}</div>
                <h3 className="font-semibold text-[#0C2340] mt-2">{reviewer.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{reviewer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents We Review */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Documents We Review</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {[
              'PRO Instruments',
              'ClinRO Instruments',
              'Clinical Protocols',
              'Informed Consent Forms',
              'Product Labeling (SmPC/PIL)',
              'Safety Documentation',
              'Patient Education Materials',
              'Medical Device IFUs',
              'Regulatory Submissions',
            ].map((doc) => (
              <div key={doc} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <svg className="w-5 h-5 text-[#0891B2] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-[#0C2340]">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Therapeutic Areas */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Therapeutic Areas</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl">We match clinician reviewers to your specific therapeutic area for maximum relevance and expertise.</p>

          <div className="flex flex-wrap gap-3 mt-10">
            {[
              'Oncology & Hematology', 'Central Nervous System', 'Cardiology', 'Dermatology',
              'Endocrinology & Diabetes', 'Gastroenterology', 'Respiratory', 'Rheumatology',
              'Ophthalmology', 'Rare Diseases', 'Pediatrics', 'Psychiatry',
              'Infectious Disease', 'Immunology', 'Nephrology',
            ].map((area) => (
              <span key={area} className="bg-white px-4 py-2 rounded-full text-[#0C2340] text-sm border border-gray-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Our Review Process</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
            {[
              { step: '1', title: 'Requirement Analysis', desc: 'We assess your document type, therapeutic area, and reviewer requirements.' },
              { step: '2', title: 'Reviewer Matching', desc: 'We match a qualified clinician with relevant expertise and language proficiency.' },
              { step: '3', title: 'Clinical Review', desc: 'Thorough review for medical accuracy, terminology, and clinical appropriateness.' },
              { step: '4', title: 'Report & Delivery', desc: 'Annotated document with tracked changes and summary report.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-[#0891B2] text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto">
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
              { q: 'What qualifications do your clinician reviewers have?', a: 'All our clinician reviewers are licensed healthcare professionals (MDs, DOs, PharmDs, or specialist nurses) with native-level language proficiency and relevant clinical experience in the therapeutic area.' },
              { q: 'How quickly can you complete a clinician review?', a: 'Standard turnaround is 5-7 business days. We offer urgent service (48-72 hours) for time-sensitive projects at an additional fee.' },
              { q: 'What does the review process include?', a: 'Our review includes verification of medical terminology accuracy, clinical appropriateness of translated content, dosing and unit conversions, and overall readability for the target audience.' },
              { q: 'Can you match reviewers to specific therapeutic areas?', a: 'Yes, we maintain a network of 300+ reviewers across 25+ therapeutic areas and will match the most qualified clinician to your specific project.' },
              { q: 'What deliverables are included?', a: 'You receive the annotated document with tracked changes, a summary report of findings, and recommendations for any necessary revisions.' },
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
              <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340]">Request a Clinician Review Quote</h2>
              <p className="text-lg text-gray-600 mt-4">Get a customized quote within 24 hours. Our team will match the right clinician reviewer to your project.</p>
            </div>
            <div className="mt-10 bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <LifeSciencesQuoteForm
                variant="clinician-review"
                hideServiceSelector={true}
                formLocation="clinician-review"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-[#0C2340] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">Ensure Medical Accuracy in Your Translations</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">Partner with Cethos for expert clinician review by board-certified healthcare professionals.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <a href="#quote-form" className="inline-flex items-center justify-center bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Get Your Free Quote
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center border border-white/30 hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-colors">
              Contact Us
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-400">No commitment required - Response within 24 hours - 300+ medical professionals</p>
        </div>
      </section>
    </>
  )
}
