'use client'

import { Check, Heart, Users, FileText, Scale, Home, Globe } from 'lucide-react'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: 'Starting at $65' },
  { text: 'Spousal Sponsorship Ready' },
  { text: 'Same-Day Service' },
  { text: 'Translation + Notary Same Visit' },
]

const documents = [
  'Marriage certificates',
  'Divorce certificates and decrees',
  'Divorce judgments',
  'Annulment documents',
  'Marriage contracts / prenuptial agreements',
  'Death certificates (for widow/widower applications)',
  'Relationship statutory declarations',
]

const whoNeedsThis = [
  {
    icon: Heart,
    title: 'Spousal Sponsorship',
    description: 'Sponsor your spouse for permanent residence in Canada. Marriage certificate translation is required.',
  },
  {
    icon: Users,
    title: 'Common-Law Sponsorship',
    description: 'Supporting evidence for common-law partner applications including relationship documentation.',
  },
  {
    icon: Home,
    title: 'Family Class Immigration',
    description: 'Parent, grandparent, and dependent child sponsorship applications.',
  },
  {
    icon: FileText,
    title: 'PR Applications',
    description: 'Proof of marital status required for Express Entry and Provincial Nominee Programs.',
  },
  {
    icon: Globe,
    title: 'Citizenship Applications',
    description: 'Document your family history for Canadian citizenship.',
  },
  {
    icon: Scale,
    title: 'Divorce for Remarriage',
    description: 'Prove dissolution of previous marriage for new marriage registration.',
  },
]

const whatsIncluded = [
  'Complete certified translation',
  'Translator\'s declaration with credentials',
  'Commissioner of Oaths certification (included)',
  'IRCC-compliant formatting',
  'Digital and physical copies available',
  '100% acceptance guarantee',
]

const pricingData = [
  { document: 'Marriage Certificate', price: 'Starting at $65' },
  { document: 'Divorce Certificate/Decree', price: 'Starting at $65' },
  { document: 'Divorce Judgment (multi-page)', price: 'Starting at $95' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Same-Day Rush', price: '+$25' },
]

const faqs: FAQItem[] = [
  {
    question: 'Do you translate divorce documents?',
    answer: 'Yes. We translate divorce certificates, divorce decrees, divorce judgments, and annulment papers. All certified for IRCC.',
  },
  {
    question: 'My marriage certificate is in multiple languages. Can you translate it?',
    answer: 'Yes. We handle multilingual documents and translate all text into English.',
  },
  {
    question: 'How long does translation take?',
    answer: 'Standard is 1-2 business days. Same-day rush available for +$25.',
  },
  {
    question: 'Can both spouses use the same translation?',
    answer: 'Yes. Additional certified copies are $15 each.',
  },
  {
    question: 'Is notarization included?',
    answer: 'Yes. Commissioner of Oaths certification is included at no extra charge.',
  },
]

export default function MarriageCertificatePageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Marriage Certificate Translation Calgary"
        description="IRCC-certified translations for marriage and divorce certificates. Spousal sponsorship, family class, and PR applications."
        url="https://cethos.com/marriage-certificate-translation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="Marriage Certificate Translation Calgary"
        subheadline="IRCC-certified translations for marriage and divorce certificates. Spousal sponsorship, family class, and PR applications. Same-day service with on-site notarization."
        trustItems={trustItems}
      />

      {/* Documents Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                Marriage & Family Documents We Translate
              </h2>

              <ul className="space-y-4">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-lg text-[#4B5563]">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Form */}
            <QuoteForm defaultDocumentType="marriage-certificate" defaultPurpose="spousal-sponsorship" />
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Who Needs Marriage Certificate Translation?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoNeedsThis.map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-[#4B5563]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                What&apos;s Included
              </h2>

              <ul className="space-y-4">
                {whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-lg text-[#4B5563]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing */}
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                Marriage Certificate Translation Pricing
              </h2>

              <div className="bg-[#F8FAFC] rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full">
                  <tbody>
                    {pricingData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-6 py-4 text-[#0C2340]">{item.document}</td>
                        <td className="px-6 py-4 text-[#0891B2] font-semibold text-right">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LandingFAQ title="Frequently Asked Questions" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Get Your Marriage Documents Translated"
        subheadline="Spousal sponsorship ready. Same-day service available."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
