'use client'

import { Check, Upload, Clock, Mail, Truck, Shield, Zap, FileText, GraduationCap, Briefcase, Scale } from 'lucide-react'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: 'Serving Edmonton & Area' },
  { text: 'Email or Courier Delivery' },
  { text: '100% IRCC Acceptance' },
  { text: 'Same-Day Available' },
]

const processSteps = [
  {
    step: 1,
    icon: Upload,
    title: 'Upload Your Documents',
    description: 'Email your documents or use our online form. Clear photos or scans work perfectly.',
  },
  {
    step: 2,
    icon: Clock,
    title: 'Receive Your Quote',
    description: 'We review and send you a quote within 2 hours. Same-day service available.',
  },
  {
    step: 3,
    icon: FileText,
    title: 'We Translate & Certify',
    description: 'Our Calgary-based certified translators complete your translation with all required certifications.',
  },
  {
    step: 4,
    icon: Truck,
    title: 'Delivery to Edmonton',
    description: 'Email: Digital copies sent immediately. Courier: Physical copies delivered to your Edmonton address (1-2 business days).',
  },
]

const serviceAreas = [
  'Downtown Edmonton',
  'West Edmonton',
  'South Edmonton',
  'North Edmonton',
  'Sherwood Park',
  'St. Albert',
  'Spruce Grove',
  'Leduc',
  'Fort Saskatchewan',
  'Beaumont',
  'Devon',
]

const documentCategories = [
  {
    title: 'Immigration Documents',
    icon: Shield,
    items: ['Birth certificates', 'Marriage/divorce certificates', 'Police clearances', 'Passports and ID cards'],
  },
  {
    title: 'Educational Documents',
    icon: GraduationCap,
    items: ['Diplomas and degrees', 'Academic transcripts', 'Professional certifications'],
  },
  {
    title: 'Employment & Financial',
    icon: Briefcase,
    items: ['Employment letters', 'Bank statements', 'Tax documents'],
  },
  {
    title: 'All Other Documents',
    icon: Scale,
    items: ['Legal documents', 'Medical records', 'Business documents'],
  },
]

const pricingData = [
  { document: 'Birth Certificate', price: 'Starting at $65' },
  { document: 'Marriage Certificate', price: 'Starting at $65' },
  { document: 'Diploma/Degree', price: 'Starting at $65' },
  { document: 'Transcript (per page)', price: 'Starting at $35' },
  { document: 'Police Clearance', price: 'Starting at $45' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Same-Day Rush', price: '+$25' },
]

const deliveryOptions = [
  { delivery: 'Email (digital copy)', price: 'Free' },
  { delivery: 'Standard Courier to Edmonton', price: '+$25' },
  { delivery: 'Express Courier (next day)', price: '+$45' },
]

const whyRemoteWorks = [
  {
    icon: Shield,
    title: 'Same Quality',
    description: 'Identical certified translations whether you\'re in Calgary or Edmonton. Same translators, same certifications.',
  },
  {
    icon: Check,
    title: 'IRCC Accepted',
    description: 'Our certified translator\'s declaration is valid for IRCC regardless of how documents are submitted to us.',
  },
  {
    icon: Zap,
    title: 'Faster Than Driving',
    description: 'Upload now, receive by email same-day. No 3-hour round trip to Calgary.',
  },
  {
    icon: Mail,
    title: 'Commissioner Options',
    description: 'We mail commissioner-certified copies, or email the translation for local commissioning in Edmonton.',
  },
]

const faqs: FAQItem[] = [
  {
    question: 'Do I need to visit Calgary?',
    answer: 'No. Our entire service works remotely. Upload documents, pay online, receive translations by email or courier.',
  },
  {
    question: 'How do you certify without seeing the original?',
    answer: 'Our certified translator\'s declaration is valid for IRCC when working from scans. For certification on originals, mail them to us or commission locally.',
  },
  {
    question: 'How fast is courier delivery?',
    answer: 'Standard courier to Edmonton is 1-2 business days. Express next-day available for +$45.',
  },
  {
    question: 'What if I need commissioner certification?',
    answer: 'Option 1: We mail commissioner-certified copies to you. Option 2: We email the translation and you commission locally in Edmonton.',
  },
  {
    question: 'Can I pick up in Calgary instead?',
    answer: 'Yes. If you\'re visiting Calgary, pickup at our downtown office is free.',
  },
]

export default function EdmontonPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Edmonton Translation Services"
        description="IRCC-certified translations delivered to Edmonton. Upload documents online, receive certified translations by email or courier."
        url="https://cethos.com/edmonton-translation-agency"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="Edmonton Translation Services"
        subheadline="IRCC-certified translations delivered to Edmonton. Upload your documents online, receive certified translations by email or courier. No need to travel to Calgary."
        trustItems={trustItems}
      />

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            How Our Edmonton Service Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="w-16 h-16 rounded-full bg-[#E0F2FE] flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-8 h-8 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <div className="absolute top-8 left-1/2 w-full h-px bg-[#0891B2]/20 -z-10 hidden lg:block" style={{ display: index === processSteps.length - 1 ? 'none' : undefined }} />
                <div className="w-6 h-6 rounded-full bg-[#0891B2] text-white text-sm font-bold flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-[#4B5563] text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-10">
            Serving All of Edmonton & Area
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <span key={index} className="px-4 py-2 bg-white text-[#0C2340] rounded-full text-sm font-medium border border-slate-200">
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Documents We Translate for Edmonton Clients
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <div key={index} className="border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[#E0F2FE] flex items-center justify-center mb-4">
                  <category.icon className="w-5 h-5 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{category.title}</h3>
                <ul className="space-y-1.5">
                  {category.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-sm text-[#4B5563]">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                Edmonton Translation Pricing
              </h2>

              <div className="bg-white rounded-xl overflow-hidden border border-slate-200 mb-8">
                <table className="w-full">
                  <tbody>
                    {pricingData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 sm:px-6 py-3 text-[#0C2340]">{item.document}</td>
                        <td className="px-4 sm:px-6 py-3 text-[#0891B2] font-semibold text-right">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">Delivery Options</h3>
              <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full">
                  <tbody>
                    {deliveryOptions.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 sm:px-6 py-3 text-[#0C2340]">{item.delivery}</td>
                        <td className="px-4 sm:px-6 py-3 text-[#0891B2] font-semibold text-right">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quote Form */}
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Why Remote Works Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Why Remote Translation Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyRemoteWorks.map((item, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-xl p-6 sm:p-8">
                <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-[#4B5563]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LandingFAQ title="Edmonton Service FAQ" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Get Started from Edmonton"
        subheadline="Upload your documents now. Certified translations delivered to your door."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
