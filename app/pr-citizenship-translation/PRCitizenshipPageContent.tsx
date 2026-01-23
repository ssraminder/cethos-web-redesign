'use client'

import { Check, FileText, Users, Clock, DollarSign, ArrowRight, Phone } from 'lucide-react'
import Link from 'next/link'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: 'All PR & Citizenship Documents' },
  { text: '100% IRCC Acceptance' },
  { text: 'Same-Day Service' },
  { text: 'Translation + Notary Same Visit' },
]

const prDocuments = [
  'Birth certificates',
  'Marriage/divorce certificates',
  'Police clearance certificates',
  'Educational credentials (diplomas, transcripts)',
  'Employment reference letters',
  'Bank statements and financial documents',
  'Medical exam results (if applicable)',
  'Travel history documents',
  'Identity documents (passports, ID cards)',
  'Military service records',
  'Name change documents',
]

const citizenshipDocuments = [
  'Birth certificates',
  'Marriage/divorce certificates',
  'Passport pages and travel documents',
  'PR card copies',
  'Name change documents',
  'Adoption papers',
  'Court documents',
  'Military service records',
  'Educational certificates',
  'Foreign citizenship renunciation documents',
]

const whyOneProvider = [
  {
    icon: FileText,
    title: 'Consistency',
    description: 'All your translations use the same formatting and certification style—exactly what IRCC expects.',
  },
  {
    icon: Clock,
    title: 'Efficiency',
    description: 'Submit all documents at once. No waiting for multiple providers.',
  },
  {
    icon: DollarSign,
    title: 'Cost Savings',
    description: 'Bundle pricing available for multiple documents.',
  },
  {
    icon: Users,
    title: 'Single Point of Contact',
    description: 'Questions? Updates? One team handles everything.',
  },
]

const pricingData = [
  { document: 'Birth/Marriage Certificate', price: 'Starting at $65' },
  { document: 'Police Clearance', price: 'Starting at $45' },
  { document: 'Diploma/Degree', price: 'Starting at $65' },
  { document: 'Transcript (per page)', price: 'Starting at $35' },
  { document: 'Employment Letter', price: 'Starting at $45' },
  { document: 'Bank Statement (per page)', price: 'Starting at $35' },
  { document: 'Passport Pages', price: 'Starting at $25' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Same-Day Rush', price: '+$25' },
]

const packages = [
  {
    name: 'Basic Package',
    price: '$180',
    features: [
      '2 birth certificates',
      '1 marriage certificate',
      'Commissioner certification',
      'Digital delivery',
    ],
  },
  {
    name: 'Standard Package',
    price: '$350',
    features: [
      '2 birth certificates',
      '1 marriage certificate',
      '2 police clearances',
      '1 diploma',
      'Commissioner certification',
      'Digital + physical delivery',
    ],
    popular: true,
  },
  {
    name: 'Complete Package',
    price: 'Custom Quote',
    features: [
      'All documents for your application',
      'Priority processing',
      'Commissioner certification',
      'Digital + physical delivery',
    ],
  },
]

const processSteps = [
  {
    step: 1,
    title: 'Send All Documents',
    description: 'Email or upload all your documents at once. We review and quote the complete package.',
  },
  {
    step: 2,
    title: 'Single Quote',
    description: 'Receive one quote for all documents. No surprises.',
  },
  {
    step: 3,
    title: 'We Translate Everything',
    description: 'All documents translated by our certified team. Consistent formatting throughout.',
  },
  {
    step: 4,
    title: 'Receive Complete Package',
    description: 'All translations delivered together—ready for your IRCC submission.',
  },
]

const faqs: FAQItem[] = [
  {
    question: 'Can you translate all my documents?',
    answer: 'Yes. We handle every document type required for PR and citizenship applications.',
  },
  {
    question: 'Is there a discount for multiple documents?',
    answer: 'Yes. Our packages offer savings compared to individual document pricing.',
  },
  {
    question: 'How long for multiple documents?',
    answer: 'Standard is 2-3 business days for complete packages. Rush available.',
  },
  {
    question: 'Do you translate documents in different languages?',
    answer: 'Yes. If your documents are in multiple languages, we translate all of them.',
  },
]

export default function PRCitizenshipPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="PR & Citizenship Translation Services Calgary"
        description="Complete translation services for permanent residence and Canadian citizenship applications. Every document IRCC requires."
        url="https://cethos.com/pr-citizenship-translation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="PR & Citizenship Translation Services"
        subheadline="Complete translation services for your permanent residence and Canadian citizenship applications. Every document IRCC requires—translated, certified, and ready to submit."
        trustItems={trustItems}
      />

      {/* PR Documents Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0C2340] mb-6">
                Permanent Residence Application Documents
              </h2>
              <p className="text-[#4B5563] mb-6">We translate all documents required for your PR application:</p>
              <ul className="space-y-2">
                {prDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0891B2] mt-1 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[#4B5563]">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-[28px] sm:text-[32px] font-bold text-[#0C2340] mb-6">
                Canadian Citizenship Application Documents
              </h2>
              <p className="text-[#4B5563] mb-6">We translate all documents for your citizenship application:</p>
              <ul className="space-y-2">
                {citizenshipDocuments.map((doc, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#0891B2] mt-1 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[#4B5563]">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why One Provider Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Why Use One Provider for All Documents?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyOneProvider.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center">
                <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-[#4B5563] text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Quote Form Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                PR & Citizenship Translation Pricing
              </h2>

              <div className="bg-[#F8FAFC] rounded-xl overflow-hidden border border-slate-200 mb-8">
                <table className="w-full">
                  <tbody>
                    {pricingData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 sm:px-6 py-3 text-[#0C2340] text-sm">{item.document}</td>
                        <td className="px-4 sm:px-6 py-3 text-[#0891B2] font-semibold text-right text-sm">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quote Form */}
            <QuoteForm defaultPurpose="pr-application" />
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Translation Packages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl p-6 border-2 ${
                  pkg.popular ? 'border-[#0891B2]' : 'border-slate-200'
                } relative`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0891B2] text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-[#0C2340] mb-2">{pkg.name}</h3>
                <p className="text-2xl font-bold text-[#0891B2] mb-6">{pkg.price}</p>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-[#0891B2] mt-1 flex-shrink-0" strokeWidth={2} />
                      <span className="text-[#4B5563] text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="#quote-form"
                  className="block w-full py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors text-center"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          <p className="text-center text-[#4B5563] mt-8">
            Contact us for a custom package based on your documents.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-bold">
                    {step.step}
                  </div>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block flex-1 h-px bg-[#0891B2]/30" />
                  )}
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-[#4B5563]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LandingFAQ title="PR & Citizenship Translation FAQ" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Start Your PR or Citizenship Translation"
        subheadline="Get all your documents translated by one trusted provider."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
