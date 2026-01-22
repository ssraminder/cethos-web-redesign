import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, Shield, Clock, Users, CheckCircle, ArrowRight } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Pharmaceutical Translation Services | Clinical & Regulatory',
  description: 'FDA, EMA & PMDA compliant pharmaceutical translation. Clinical trials, IFUs, SPCs, PILs, regulatory submissions. ISO 17100 Compliant. 50+ pharma clients worldwide.',
  keywords: ['pharmaceutical translation', 'clinical trial translation', 'FDA translation', 'regulatory translation', 'medical translation', 'pharma localization'],
  alternates: {
    canonical: 'https://cethos.com/industries/pharmaceutical',
  },
  openGraph: {
    title: 'Pharmaceutical Translation Services | Cethos',
    description: 'FDA, EMA & PMDA compliant pharmaceutical translation services for global clinical trials and regulatory submissions.',
    url: 'https://cethos.com/industries/pharmaceutical',
  },
}

const challenges = [
  {
    title: 'Regulatory Compliance',
    description: 'Navigate complex FDA, EMA, PMDA, and NMPA requirements with translations that meet all regulatory standards.',
  },
  {
    title: 'Technical Accuracy',
    description: 'Ensure precise translation of complex medical terminology, drug mechanisms, and clinical data.',
  },
  {
    title: 'Tight Timelines',
    description: 'Meet aggressive submission deadlines without compromising quality or compliance.',
  },
  {
    title: 'Multi-Country Submissions',
    description: 'Coordinate simultaneous submissions across multiple regulatory agencies and languages.',
  },
]

const services = [
  'Clinical Trial Documentation (Protocols, ICFs, CRFs)',
  'Regulatory Submissions (CTD, NDA, MAA, ANDA)',
  'Product Labeling (SPCs, PILs, IFUs)',
  'Pharmacovigilance & Safety Reports',
  'Medical Device Documentation',
  'Marketing & Commercial Content',
]

const stats = [
  { value: '50+', label: 'Pharma Clients' },
  { value: '500+', label: 'Clinical Trials Supported' },
  { value: '100%', label: 'Regulatory Acceptance Rate' },
  { value: '40+', label: 'Therapeutic Areas' },
]

const faqs = [
  {
    question: 'What pharmaceutical documents do you translate?',
    answer: 'We translate all pharmaceutical documentation including clinical trial protocols, informed consent forms, investigator brochures, regulatory submissions (CTD, NDA, MAA), product labeling (SPCs, PILs, IFUs), pharmacovigilance reports, CMC documentation, and marketing materials.',
  },
  {
    question: 'Are your translations FDA and EMA compliant?',
    answer: 'Yes, all our pharmaceutical translations comply with FDA, EMA, PMDA, NMPA, and other regulatory requirements. We follow ICH guidelines and are ISO 17100 and ISO 9001 compliant. Our linguists are trained in regulatory requirements specific to each market.',
  },
  {
    question: 'Do you have experience with clinical trial translations?',
    answer: 'Yes, we have supported over 500 clinical trials across 40+ therapeutic areas. Our services include translation of protocols, ICFs, CRFs, patient diaries, and all trial-related documentation. We offer back-translation and reconciliation services as required.',
  },
  {
    question: 'What is your turnaround time for regulatory submissions?',
    answer: 'Standard turnaround is 2,000-3,000 words per day. For urgent submissions, we offer rush services with 24-hour and 48-hour turnaround options. We can scale teams for large volume submissions to meet your regulatory deadlines.',
  },
  {
    question: 'How do you ensure terminology consistency across documents?',
    answer: 'We use translation memory (TM) technology and maintain client-specific terminology databases. Each project has a dedicated terminology manager who ensures consistency across all documents and languages throughout the product lifecycle.',
  },
]

export default function PharmaceuticalPage() {
  return (
    <>
      <ServiceJsonLd
        name="Pharmaceutical Translation Services"
        description="FDA, EMA & PMDA compliant pharmaceutical translation for clinical trials and regulatory submissions."
        url="https://cethos.com/industries/pharmaceutical"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                PHARMACEUTICAL & LIFE SCIENCES
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Pharmaceutical Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                FDA, EMA, and PMDA compliant translations for clinical trials,
                regulatory submissions, and product labeling. Trusted by 50+
                pharmaceutical companies worldwide.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              {/* Compliance Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  ISO 17100
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  ISO 9001
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  HIPAA Compliant
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0C2340] py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges Section */}
      <section className="bg-white py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Pharmaceutical Translation Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the unique complexities of pharmaceutical translation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-lg p-8">
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {challenge.title}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {challenge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-[#F8FAFC] py-24">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[40px] font-bold text-[#0C2340] mb-6">
                Pharmaceutical Documents We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Comprehensive translation services for the entire pharmaceutical
                product lifecycle, from R&D to commercialization.
              </p>
              <ul className="space-y-4">
                {services.map((service, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-0.5" />
                    <span className="text-base text-[#4B5563]">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <h3 className="text-xl font-semibold text-[#0C2340] mb-6">
                Why Choose Cethos for Pharma
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Expert Linguists</div>
                    <div className="text-sm text-[#4B5563]">MDs, PharmDs, and PhDs in our linguist network</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Regulatory Expertise</div>
                    <div className="text-sm text-[#4B5563]">100% acceptance rate for regulatory submissions</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Fast Turnaround</div>
                    <div className="text-sm text-[#4B5563]">Rush services for urgent submissions</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24">
        <div className="max-w-[800px] mx-auto px-8">
          <h2 className="text-[40px] font-bold text-[#0C2340] text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-[#E5E7EB] pb-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">
                  {faq.question}
                </h3>
                <p className="text-base text-[#4B5563] leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2] py-24">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[40px] font-bold text-white mb-4">
            Ready to Accelerate Your Global Clinical Program?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your pharmaceutical translation project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
