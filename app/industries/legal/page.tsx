import { Metadata } from 'next'
import Link from 'next/link'
import { Scale, Shield, Lock, Users, CheckCircle, ArrowRight, FileText, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Legal Translation Services | Certified Court-Ready Translations',
  description: 'Certified legal translation for contracts, court documents, patents, depositions & litigation. ATA-certified translators. Notarization available. Confidential & secure.',
  keywords: ['legal translation', 'certified legal translation', 'court document translation', 'contract translation', 'patent translation', 'litigation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/legal',
  },
  openGraph: {
    title: 'Legal Translation Services | Cethos',
    description: 'Certified legal translation for contracts, court documents, patents, and litigation materials.',
    url: 'https://cethos.com/industries/legal',
  },
}

const challenges = [
  {
    title: 'Legal Precision',
    description: 'Every word matters in legal documents. Our translators understand legal terminology and implications in both source and target languages.',
  },
  {
    title: 'Court Certification',
    description: 'Provide certified translations with certificates of accuracy accepted by courts and government agencies worldwide.',
  },
  {
    title: 'Confidentiality',
    description: 'Maintain attorney-client privilege and strict confidentiality protocols for sensitive legal matters.',
  },
  {
    title: 'Jurisdiction Expertise',
    description: 'Navigate different legal systems and adapt terminology for specific jurisdictions and legal traditions.',
  },
]

const services = [
  'Contracts & Agreements',
  'Court Documents & Depositions',
  'Patents & Intellectual Property',
  'Corporate Documents & Filings',
  'Immigration Documents',
  'Litigation & Arbitration Materials',
  'Wills, Trusts & Estate Documents',
  'Notarization & Apostille Services',
]

const stats = [
  { value: '100+', label: 'Law Firm Clients' },
  { value: '50+', label: 'Languages' },
  { value: '24hr', label: 'Rush Available' },
  { value: '100%', label: 'Court Acceptance' },
]

const faqs = [
  {
    question: 'Are your legal translations court-certified?',
    answer: 'Yes, all our legal translations come with a certificate of accuracy and can be notarized upon request. Our translations are accepted by courts, government agencies, and legal institutions worldwide.',
  },
  {
    question: 'What legal documents do you translate?',
    answer: 'We translate contracts, court documents, depositions, patents, trademarks, corporate documents, litigation materials, immigration documents, wills, trusts, and all other legal documentation.',
  },
  {
    question: 'How do you ensure confidentiality?',
    answer: 'All our translators sign NDAs. We use encrypted file transfer, secure project management systems, and comply with attorney-client privilege requirements. We are GDPR compliant.',
  },
  {
    question: 'Do you provide translations for international arbitration?',
    answer: 'Yes, we have extensive experience with international arbitration cases, providing certified translations for ICC, LCIA, AAA, and other arbitration proceedings.',
  },
  {
    question: 'Can you handle urgent legal translation requests?',
    answer: 'Yes, we offer rush services for urgent legal matters with 24-hour turnaround available. We understand that legal deadlines are non-negotiable.',
  },
]

export default function LegalPage() {
  return (
    <>
      <ServiceJsonLd
        name="Legal Translation Services"
        description="Certified legal translation for contracts, court documents, patents, and litigation materials."
        url="https://cethos.com/industries/legal"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                LEGAL SERVICES
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Legal Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Certified, court-ready translations for contracts, litigation,
                patents, and corporate documents. Trusted by 100+ law firms
                and corporate legal departments worldwide.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              {/* Trust Badges */}
              <div className="flex items-center gap-6 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  ATA Certified
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#0891B2]" />
                  NDA Protected
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0891B2]" />
                  Notarization Available
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Scale className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              Legal Translation Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the critical nature of legal documentation
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
                Legal Documents We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Comprehensive legal translation services for law firms,
                corporate legal departments, and individuals.
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
                Why Choose Cethos for Legal
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Legal Experts</div>
                    <div className="text-sm text-[#4B5563]">Translators with legal backgrounds and certifications</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Strict Confidentiality</div>
                    <div className="text-sm text-[#4B5563]">NDAs, encryption, and secure handling</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Rush Services</div>
                    <div className="text-sm text-[#4B5563]">24-hour turnaround for urgent matters</div>
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
            Need Certified Legal Translations?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your legal translation project today
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
