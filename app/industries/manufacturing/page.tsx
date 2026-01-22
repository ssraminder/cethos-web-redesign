import { Metadata } from 'next'
import Link from 'next/link'
import { Factory, FileText, Shield, Users, CheckCircle, ArrowRight, Settings, Clock } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Manufacturing Translation Services | Technical & Industrial',
  description: 'Expert manufacturing translation for technical manuals, safety docs, quality systems & machinery documentation. ISO compliant. 50+ languages. Industry specialists.',
  keywords: ['manufacturing translation', 'technical manual translation', 'industrial translation', 'machinery documentation', 'ISO translation', 'quality documentation translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/manufacturing',
  },
  openGraph: {
    title: 'Manufacturing Translation Services | Cethos',
    description: 'Expert manufacturing translation for technical manuals, safety documentation, and quality systems.',
    url: 'https://cethos.com/industries/manufacturing',
  },
}

const challenges = [
  {
    title: 'Technical Precision',
    description: 'Accurately translate complex technical specifications, measurements, and engineering terminology.',
  },
  {
    title: 'Safety Compliance',
    description: 'Ensure safety-critical content meets local regulations and international standards.',
  },
  {
    title: 'ISO Documentation',
    description: 'Translate quality management documentation while maintaining ISO compliance.',
  },
  {
    title: 'Multi-Format Content',
    description: 'Handle CAD files, technical drawings, and multimedia training materials.',
  },
]

const services = [
  'Technical Manuals & User Guides',
  'Safety Documentation & MSDS',
  'Quality Management (ISO) Docs',
  'Training Materials & E-Learning',
  'Engineering Specifications',
  'Equipment & Machinery Docs',
  'Patents & Technical IP',
  'Supply Chain Documentation',
]

const stats = [
  { value: '80+', label: 'Manufacturing Clients' },
  { value: '50+', label: 'Languages' },
  { value: '100%', label: 'ISO Compliance' },
  { value: '25+', label: 'Years Experience' },
]

const faqs = [
  {
    question: 'What manufacturing documents do you translate?',
    answer: 'We translate technical manuals, user guides, safety documentation, MSDS sheets, ISO quality documents, training materials, engineering specifications, equipment documentation, and patents.',
  },
  {
    question: 'Do you work with CAD and technical drawings?',
    answer: 'Yes, we can extract and translate text from CAD files, technical drawings, and engineering diagrams. We work with common formats including AutoCAD, SolidWorks, and other CAD software.',
  },
  {
    question: 'Are your translations ISO compliant?',
    answer: 'Yes, our translations support ISO 9001, ISO 14001, and other quality management standards. We follow ISO 17100 translation quality standards and maintain full traceability.',
  },
  {
    question: 'Can you handle safety-critical content?',
    answer: 'Yes, we have extensive experience with safety documentation, warning labels, MSDS sheets, and compliance content. Our translators understand the critical nature of safety communications.',
  },
  {
    question: 'Do you support machine translation for technical content?',
    answer: 'We offer MT post-editing for appropriate content types, combined with human review to ensure technical accuracy. We can advise on the best approach for your content and quality requirements.',
  },
]

export default function ManufacturingPage() {
  return (
    <>
      <ServiceJsonLd
        name="Manufacturing Translation Services"
        description="Expert manufacturing translation for technical manuals, safety documentation, and quality systems."
        url="https://cethos.com/industries/manufacturing"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                MANUFACTURING & INDUSTRIAL
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Manufacturing Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                ISO-compliant translation for technical manuals, safety documentation,
                and quality systems. Trusted by 80+ manufacturers for precise,
                safety-critical translations.
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
                  <Settings className="w-5 h-5 text-[#0891B2]" />
                  CAD Support
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#0891B2]" />
                  MSDS Certified
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Factory className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              Manufacturing Translation Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the precision required in manufacturing documentation
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
                Manufacturing Content We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Comprehensive translation services for manufacturers,
                from technical documentation to training materials.
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
                Why Choose Cethos for Manufacturing
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Technical Experts</div>
                    <div className="text-sm text-[#4B5563]">Engineers and technical writers on staff</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">ISO Compliance</div>
                    <div className="text-sm text-[#4B5563]">Full quality management documentation</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">On-Time Delivery</div>
                    <div className="text-sm text-[#4B5563]">Meet production schedules</div>
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
            Need Manufacturing Translation Services?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your technical translation project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
