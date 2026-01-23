'use client'

import { Check, ArrowRight } from 'lucide-react'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: 'Starting at $65' },
  { text: 'Same-Day Available' },
  { text: '100% IRCC Acceptance Guarantee' },
  { text: 'Translation + Notary Same Visit' },
]

const commonUses = [
  'Permanent Residence (PR) applications',
  'Canadian citizenship applications',
  'Spousal and family sponsorship',
  'Express Entry profiles',
  'Study permit applications',
  'Work permit applications',
]

const whatsIncluded = [
  'Complete certified translation of your birth certificate',
  'Certified translator\'s declaration with credentials',
  'Commissioner of Oaths certification (included)',
  'IRCC-compliant formatting',
  'Digital copy via email',
  'Physical copy available for pickup or courier',
  '100% IRCC acceptance guarantee',
]

const languages = [
  'Punjabi', 'Hindi', 'Mandarin', 'Cantonese', 'Arabic', 'Tagalog', 'Spanish', 'French', 'Urdu', 'Vietnamese',
  'Korean', 'Japanese', 'Persian/Farsi', 'Russian', 'Ukrainian', 'Polish', 'German', 'Portuguese', 'Italian', 'Turkish',
]

const pricingData = [
  { service: 'Birth Certificate Translation', price: 'Starting at $65' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25' },
  { service: 'Courier Delivery (Calgary)', price: '+$15' },
]

const processSteps = [
  {
    step: 1,
    title: 'Send Us Your Document',
    description: 'Upload a photo or scan through our quote form, email it, or bring the original to our downtown Calgary office.',
  },
  {
    step: 2,
    title: 'Receive Your Quote',
    description: 'We review and send a quote within 2 hours. No obligation.',
  },
  {
    step: 3,
    title: 'We Translate & Certify',
    description: 'Our certified translator completes your translation. Same-day service available.',
  },
  {
    step: 4,
    title: 'Receive Your Translation',
    description: 'Pick up at our Calgary office or receive by email/courier. Ready for IRCC.',
  },
]

const faqs: FAQItem[] = [
  {
    question: 'Will IRCC accept your translation?',
    answer: 'Yes. Our translations meet all IRCC requirements including translator\'s declaration and credentials. 100% acceptance guaranteed.',
  },
  {
    question: 'How fast can I get it translated?',
    answer: 'Standard is 1-2 business days. Same-day rush available for +$25.',
  },
  {
    question: 'Do I need the original birth certificate?',
    answer: 'For translation, a clear photo or scan works. For commissioner certification on the original, bring it to our office.',
  },
  {
    question: 'What if my birth certificate has handwritten text?',
    answer: 'We translate handwritten documents. Ensure the photo/scan is clear and legible.',
  },
  {
    question: 'Can I get multiple copies?',
    answer: 'Yes. Additional certified copies are $15 each.',
  },
]

export default function BirthCertificatePageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Birth Certificate Translation Calgary"
        description="IRCC-certified birth certificate translations for PR, citizenship, and spousal sponsorship. Same-day service available."
        url="https://cethos.com/birth-certificate-translation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="Birth Certificate Translation Calgary"
        subheadline="IRCC-certified birth certificate translations for PR, citizenship, and spousal sponsorship. Same-day service available with on-site notarization."
        trustItems={trustItems}
      />

      {/* Why You Need This Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-6">
                Why IRCC Requires Certified Birth Certificate Translation
              </h2>
              <p className="text-lg text-[#4B5563] leading-relaxed mb-8">
                Immigration, Refugees and Citizenship Canada (IRCC) requires all foreign-language documents to be translated by a certified translator. Your birth certificate proves identity, age, and family relationships—critical for any immigration application.
              </p>

              <h3 className="text-xl font-semibold text-[#0C2340] mb-4">Common Uses:</h3>
              <ul className="space-y-3">
                {commonUses.map((use, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[#4B5563]">{use}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Form */}
            <QuoteForm defaultDocumentType="birth-certificate" />
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            What&apos;s Included in Your Translation
          </h2>

          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 border border-slate-200">
            <ul className="space-y-4">
              {whatsIncluded.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-[#4B5563]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-4">
            Languages We Translate
          </h2>
          <p className="text-lg text-[#4B5563] text-center mb-10">
            We translate birth certificates from 95+ languages into English, including:
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {languages.map((lang, index) => (
              <span key={index} className="px-4 py-2 bg-[#F8FAFC] text-[#0C2340] rounded-full text-sm font-medium border border-slate-200">
                {lang}
              </span>
            ))}
          </div>

          <p className="text-center text-[#4B5563]">
            Don&apos;t see your language? Contact us—we likely support it.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-10">
            Birth Certificate Translation Pricing
          </h2>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 mb-6">
            <table className="w-full">
              <tbody>
                {pricingData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 text-[#0C2340]">{item.service}</td>
                    <td className="px-6 py-4 text-[#0891B2] font-semibold text-right">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-sm text-[#4B5563] text-center">
            * Price may vary for longer documents or rare languages.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            How to Get Your Birth Certificate Translated
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
      <LandingFAQ title="Birth Certificate Translation FAQ" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Get Your Birth Certificate Translated Today"
        subheadline="Same-day service available. 100% IRCC acceptance guaranteed."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
