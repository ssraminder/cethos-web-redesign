import { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Shield, Lock, Users, CheckCircle, ArrowRight, FileText, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Financial Translation Services | Banking & Investment',
  description: 'Expert financial translation for banking, investment, insurance & fintech. SEC/FCA compliant. Annual reports, prospectuses, fund documents. Confidential & accurate.',
  keywords: ['financial translation', 'banking translation', 'investment translation', 'SEC translation', 'annual report translation', 'fund document translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/finance',
  },
  openGraph: {
    title: 'Financial Translation Services | Cethos',
    description: 'Expert financial translation for banking, investment, insurance, and fintech.',
    url: 'https://cethos.com/industries/finance',
  },
}

const challenges = [
  {
    title: 'Regulatory Compliance',
    description: 'Meet SEC, FCA, BaFin, and other financial regulatory requirements with accurate, compliant translations.',
  },
  {
    title: 'Financial Accuracy',
    description: 'Ensure precise translation of financial terminology, figures, and complex instruments.',
  },
  {
    title: 'Market Timing',
    description: 'Meet earnings release deadlines and time-sensitive financial communications.',
  },
  {
    title: 'Confidentiality',
    description: 'Protect sensitive financial information with strict security protocols and NDAs.',
  },
]

const services = [
  'Annual Reports & Quarterly Reports',
  'Fund Prospectuses & KIIDs',
  'SEC Filings (10-K, 10-Q, 8-K)',
  'Investment Research & Analysis',
  'M&A Documentation',
  'Banking & Loan Agreements',
  'Insurance Policies & Claims',
  'Fintech App Localization',
]

const stats = [
  { value: '75+', label: 'Financial Clients' },
  { value: '$50B+', label: 'AUM Translated' },
  { value: '100%', label: 'Deadline Met' },
  { value: '24hr', label: 'Rush Available' },
]

const faqs = [
  {
    question: 'Do you translate SEC filings and regulatory documents?',
    answer: 'Yes, we translate all SEC filings including 10-K, 10-Q, 8-K, prospectuses, and proxy statements. Our translators understand SEC disclosure requirements and financial reporting standards.',
  },
  {
    question: 'What financial documents do you specialize in?',
    answer: 'We translate annual reports, quarterly reports, fund prospectuses, KIIDs, investment research, M&A documents, loan agreements, insurance policies, and fintech applications.',
  },
  {
    question: 'How do you handle confidential financial information?',
    answer: 'We maintain strict confidentiality protocols including NDAs, encrypted communications, secure file handling, and compliance with financial industry regulations. All translators are vetted for financial work.',
  },
  {
    question: 'Can you meet tight earnings release deadlines?',
    answer: 'Yes, we offer rush services for time-sensitive financial communications. We can scale teams to handle large volume annual reports and meet your publication deadlines.',
  },
  {
    question: 'Do you have experience with cryptocurrency and fintech?',
    answer: 'Yes, we have translated content for leading fintech and cryptocurrency companies, including whitepapers, app interfaces, regulatory documents, and marketing materials.',
  },
]

export default function FinancePage() {
  return (
    <>
      <ServiceJsonLd
        name="Financial Translation Services"
        description="Expert financial translation for banking, investment, insurance, and fintech."
        url="https://cethos.com/industries/finance"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                FINANCIAL SERVICES
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Financial Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                SEC, FCA, and MiFID compliant translations for banking, investment,
                and insurance. Trusted by 75+ financial institutions worldwide
                for accurate, confidential translations.
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
                  SEC Compliant
                </span>
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-[#0891B2]" />
                  Confidential
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0891B2]" />
                  ISO 17100
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <TrendingUp className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              Financial Translation Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the high-stakes world of financial communication
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
                Financial Documents We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Comprehensive financial translation services for banks,
                asset managers, insurance companies, and fintech firms.
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
                Why Choose Cethos for Finance
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Financial Experts</div>
                    <div className="text-sm text-[#4B5563]">CFA, MBA, and finance professionals</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Lock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Strict Security</div>
                    <div className="text-sm text-[#4B5563]">SOC 2 compliant processes</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Deadline Guarantee</div>
                    <div className="text-sm text-[#4B5563]">Never miss an earnings release</div>
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
            Need Financial Translation Services?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your financial translation project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
