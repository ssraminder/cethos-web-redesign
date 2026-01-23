'use client'

import { Shield, Clock, Building2, Globe, FileText, Users, GraduationCap, Briefcase, Check, ArrowRight, Phone } from 'lucide-react'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd, LocalBusinessJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: '100% IRCC Acceptance Guarantee' },
  { text: 'Same-Day Service' },
  { text: 'Translation + Notary Same Visit' },
  { text: '139 Five-Star Reviews' },
]

const features = [
  {
    icon: Shield,
    title: '100% IRCC Acceptance Guarantee',
    text: 'Every translation meets IRCC requirements. If your application is rejected due to our translation, we revise it free.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service Available',
    text: 'Urgent deadline? Most immigration documents translated and certified the same day. Walk-ins welcome.',
  },
  {
    icon: Building2,
    title: 'Translation + Notary in One Visit',
    text: 'Our on-site Commissioner of Oaths certifies your translations immediately. Everything done under one roof.',
  },
  {
    icon: Globe,
    title: '95+ Languages Supported',
    text: 'Punjabi, Mandarin, Arabic, Tagalog, Spanish, Urdu, and 90+ more languages translated into English.',
  },
]

const immigrationPrograms = [
  {
    title: 'Express Entry',
    items: ['Federal Skilled Worker (FSW)', 'Canadian Experience Class (CEC)', 'Federal Skilled Trades (FST)'],
  },
  {
    title: 'Provincial Nominee Programs',
    items: ['Alberta Immigrant Nominee Program (AINP)', 'Saskatchewan (SINP)', 'Ontario (OINP)', 'British Columbia (BC PNP)'],
  },
  {
    title: 'Family Sponsorship',
    items: ['Spousal Sponsorship', 'Common-Law Partner Sponsorship', 'Parent & Grandparent Sponsorship', 'Dependent Child Sponsorship'],
  },
  {
    title: 'Other Programs',
    items: ['Canadian Citizenship', 'Study Permits', 'Work Permits', 'Super Visa'],
  },
]

const documentCategories = [
  {
    title: 'Personal Documents',
    icon: FileText,
    items: ['Birth certificates', 'Marriage certificates', 'Divorce decrees', 'Death certificates', 'Adoption papers', 'Name change documents', 'Police clearance certificates'],
  },
  {
    title: 'Identity Documents',
    icon: Users,
    items: ['Passports', 'National ID cards', 'Driver\'s licenses', 'Military service records'],
  },
  {
    title: 'Educational Documents',
    icon: GraduationCap,
    items: ['Diplomas and degrees', 'Academic transcripts', 'Course completion certificates', 'Professional certifications'],
  },
  {
    title: 'Employment & Financial',
    icon: Briefcase,
    items: ['Employment letters', 'Reference letters', 'Tax documents', 'Bank statements'],
  },
]

const pricingData = [
  { document: 'Birth Certificate', price: 'Starting at $65' },
  { document: 'Marriage/Divorce Certificate', price: 'Starting at $65' },
  { document: 'Diploma or Degree', price: 'Starting at $65' },
  { document: 'Transcript (per page)', price: 'Starting at $35' },
  { document: 'Police Clearance', price: 'Starting at $45' },
  { document: 'Bank Statement (per page)', price: 'Starting at $35' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Rush Same-Day Service', price: '+$25' },
]

const processSteps = [
  {
    step: 1,
    title: 'Submit Documents',
    description: 'Email your documents, upload online, or visit our downtown Calgary office. Clear photos or scans accepted.',
  },
  {
    step: 2,
    title: 'Receive Your Quote',
    description: 'We review and send a detailed quote within 2 hours. No hidden fees.',
  },
  {
    step: 3,
    title: 'Translation & Certification',
    description: 'Our certified translators complete your documents. Same-day rush available.',
  },
  {
    step: 4,
    title: 'Pick Up or Delivery',
    description: 'Collect in person or receive by email/courier. Ready for IRCC submission.',
  },
]

const faqs: FAQItem[] = [
  {
    question: 'Are your translations accepted by IRCC?',
    answer: 'Yes. All translations meet IRCC requirements and include a certified translator\'s declaration. We offer a 100% acceptance guarantee.',
  },
  {
    question: 'How long does translation take?',
    answer: 'Standard is 1-2 business days. Same-day rush available for most documents (+$25).',
  },
  {
    question: 'Do I need the original document?',
    answer: 'No. Clear photos or scans work. For commissioner certification, bring the original to our office.',
  },
  {
    question: 'What languages do you translate?',
    answer: '95+ languages including Punjabi, Hindi, Mandarin, Arabic, Tagalog, Spanish, French, Urdu, Vietnamese, Korean, and more.',
  },
  {
    question: 'Do you provide notarization?',
    answer: 'Yes. Our on-site Commissioner of Oaths certifies translations immediately.',
  },
]

export default function ImmigrationPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Immigration Translation Services Calgary"
        description="IRCC-certified immigration translations in Calgary. Birth certificates, marriage docs, diplomas for PR, citizenship, Express Entry."
        url="https://cethos.com/immigration-translation-services"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="IRCC Immigration Translation Services"
        subheadline="Certified translations accepted by Immigration, Refugees and Citizenship Canada. Birth certificates, marriage documents, academic credentials, and more—translated and notarized same-day in downtown Calgary."
        trustItems={trustItems}
      />

      {/* Why Choose Us Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Why Calgary Trusts Cethos for Immigration Translations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-xl p-6 sm:p-8">
                <div className="w-12 h-12 rounded-lg bg-[#E0F2FE] flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-[#0891B2]" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-2">{feature.title}</h3>
                <p className="text-[#4B5563]">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Immigration Programs Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            We Support All Immigration Programs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {immigrationPrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-xl p-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{program.title}</h3>
                <ul className="space-y-2">
                  {program.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2 text-[#4B5563]">
                      <Check className="w-4 h-4 text-[#0891B2] mt-1 flex-shrink-0" strokeWidth={2} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Documents We Translate for IRCC
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
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-6">
                Transparent Pricing
              </h2>

              <div className="bg-white rounded-xl overflow-hidden border border-slate-200">
                <table className="w-full">
                  <tbody>
                    {pricingData.map((item, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-4 sm:px-6 py-4 text-[#0C2340]">{item.document}</td>
                        <td className="px-4 sm:px-6 py-4 text-[#0891B2] font-semibold text-right">{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-[#4B5563] mt-4">
                * Final pricing depends on document length and complexity. Contact us for an exact quote.
              </p>
            </div>

            {/* Quote Form */}
            <QuoteForm />
          </div>
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
      <LandingFAQ title="Frequently Asked Questions" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Start Your Immigration Translation Today"
        subheadline="Get a free quote within 2 hours. Same-day service available."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
