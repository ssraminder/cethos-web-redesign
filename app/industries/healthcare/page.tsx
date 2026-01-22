import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Shield, Users, CheckCircle, ArrowRight, FileText, Clock, Globe } from 'lucide-react'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Healthcare Translation Services | Medical & Patient Materials',
  description: 'Expert healthcare translation for patient materials, medical records, telehealth & clinical content. HIPAA compliant. Culturally sensitive. 100+ languages.',
  keywords: ['healthcare translation', 'medical translation', 'patient material translation', 'HIPAA translation', 'telehealth localization', 'medical record translation'],
  alternates: {
    canonical: 'https://cethos.com/industries/healthcare',
  },
  openGraph: {
    title: 'Healthcare Translation Services | Cethos',
    description: 'Expert healthcare translation for patient materials, medical records, and telehealth platforms.',
    url: 'https://cethos.com/industries/healthcare',
  },
}

const challenges = [
  {
    title: 'Patient Safety',
    description: 'Ensure accurate translation of medical information to protect patient health and safety.',
  },
  {
    title: 'HIPAA Compliance',
    description: 'Maintain strict HIPAA compliance for protected health information (PHI) handling.',
  },
  {
    title: 'Cultural Sensitivity',
    description: 'Adapt health content for diverse cultural backgrounds and health literacy levels.',
  },
  {
    title: 'Accessibility',
    description: 'Provide translations that meet accessibility standards for all patient populations.',
  },
]

const services = [
  'Patient Education Materials',
  'Informed Consent Forms',
  'Medical Records & Charts',
  'Telehealth Platform Content',
  'Health Insurance Documents',
  'Public Health Communications',
  'Hospital & Clinic Signage',
  'Mobile Health App Localization',
]

const stats = [
  { value: '60+', label: 'Healthcare Clients' },
  { value: '100+', label: 'Languages' },
  { value: '100%', label: 'HIPAA Compliant' },
  { value: '24/7', label: 'Support Available' },
]

const faqs = [
  {
    question: 'Are your healthcare translations HIPAA compliant?',
    answer: 'Yes, we maintain full HIPAA compliance for all healthcare translations. This includes secure handling of PHI, BAAs with clients, encrypted file transfer, and HIPAA-trained translators.',
  },
  {
    question: 'What healthcare documents do you translate?',
    answer: 'We translate patient education materials, consent forms, medical records, discharge instructions, insurance documents, telehealth content, public health materials, and healthcare app interfaces.',
  },
  {
    question: 'Do you offer culturally adapted health content?',
    answer: 'Yes, we go beyond translation to culturally adapt health content for different populations. This includes considering health beliefs, literacy levels, and cultural sensitivities around health topics.',
  },
  {
    question: 'Can you handle urgent medical translation requests?',
    answer: 'Yes, we offer 24/7 support for urgent healthcare translations. We understand that medical situations often require immediate communication across language barriers.',
  },
  {
    question: 'Do you provide medical interpreter services?',
    answer: 'While we specialize in written translation, we can connect you with qualified medical interpreters for in-person or telehealth appointments through our partner network.',
  },
]

export default function HealthcarePage() {
  return (
    <>
      <ServiceJsonLd
        name="Healthcare Translation Services"
        description="Expert healthcare translation for patient materials, medical records, and telehealth platforms."
        url="https://cethos.com/industries/healthcare"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                HEALTHCARE & PATIENT CARE
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Healthcare Translation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                HIPAA-compliant translations for patient care, health education,
                and telehealth platforms. Helping healthcare providers communicate
                effectively with diverse patient populations.
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
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  100+ Languages
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0891B2]" />
                  24/7 Support
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Heart className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              Healthcare Translation Challenges We Solve
            </h2>
            <p className="text-lg text-[#4B5563] max-w-[600px] mx-auto">
              We understand the critical importance of healthcare communication
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
                Healthcare Content We Translate
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                Comprehensive healthcare translation services to improve
                patient outcomes and health equity.
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
                Why Choose Cethos for Healthcare
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Medical Experts</div>
                    <div className="text-sm text-[#4B5563]">Healthcare professionals in our network</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">Full Compliance</div>
                    <div className="text-sm text-[#4B5563]">HIPAA, Section 1557, ACA compliant</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-[#0891B2] flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-[#0C2340]">24/7 Availability</div>
                    <div className="text-sm text-[#4B5563]">Urgent requests handled anytime</div>
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
            Ready to Improve Patient Communication?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Get a free quote for your healthcare translation project
          </p>
          <Link href="/get-quote" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#0C2340] rounded-lg hover:bg-gray-100 transition-colors text-base font-semibold">
            Get Your Free Quote <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
