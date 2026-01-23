'use client'

import { Check, GraduationCap, Award, Globe, Briefcase } from 'lucide-react'
import { LandingHero, QuoteForm, StickyMobileCTA, LandingFAQ, LandingCTA, FAQItem } from '@/components/landing'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const trustItems = [
  { text: 'WES & IQAS Accepted' },
  { text: 'Express Entry Ready' },
  { text: 'Same-Day Available' },
  { text: '100% Acceptance Guarantee' },
]

const credentialOrgs = [
  {
    name: 'WES (World Education Services)',
    requiredFor: 'Express Entry, many Provincial Nominee Programs',
    status: 'Accepted',
  },
  {
    name: 'IQAS (International Qualifications Assessment Service)',
    requiredFor: 'Alberta PNP, some regulated professions',
    status: 'Accepted',
  },
  {
    name: 'IRCC (Immigration, Refugees and Citizenship Canada)',
    requiredFor: 'All immigration applications',
    status: '100% Acceptance Guarantee',
  },
]

const otherOrgs = [
  'Comparative Education Service (CES)',
  'International Credential Evaluation Service (ICES)',
  'University-specific evaluations',
]

const documents = [
  'University diplomas and degrees',
  'College diplomas and certificates',
  'High school diplomas',
  'Academic transcripts (all levels)',
  'Course completion certificates',
  'Professional certifications',
  'Grading scale explanations',
  'Medium of instruction letters',
  'Professional licenses',
]

const whoNeedsThis = [
  {
    icon: Globe,
    title: 'Express Entry Applicants',
    description: 'Educational Credential Assessment (ECA) is mandatory for Express Entry. WES and IQAS require certified translations of foreign credentials.',
  },
  {
    icon: Award,
    title: 'Provincial Nominee Programs',
    description: 'Many PNPs require credential evaluation. Your translated academic documents support your application.',
  },
  {
    icon: GraduationCap,
    title: 'Study Permit Applicants',
    description: 'Canadian universities and colleges may require translated transcripts for admission decisions.',
  },
  {
    icon: Briefcase,
    title: 'Professional License Transfers',
    description: 'Regulated professions (engineers, nurses, accountants) require translated credentials for licensing in Canada.',
  },
]

const pricingData = [
  { document: 'Diploma or Degree (1 page)', price: 'Starting at $65' },
  { document: 'Academic Transcript (per page)', price: 'Starting at $35' },
  { document: 'Course Completion Certificate', price: 'Starting at $45' },
  { document: 'Professional Certification', price: 'Starting at $65' },
  { document: 'Grading Scale / Legend', price: 'Starting at $25' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Same-Day Rush', price: '+$25' },
]

const processSteps = [
  {
    step: 1,
    title: 'Order Translation',
    description: 'Send us your diploma and transcripts. We provide certified translations accepted by WES and IQAS.',
  },
  {
    step: 2,
    title: 'Request Your Documents',
    description: 'Contact your university to send official documents directly to WES/IQAS (or arrange sealed copies).',
  },
  {
    step: 3,
    title: 'Submit to WES/IQAS',
    description: 'Include our certified translation with your application.',
  },
  {
    step: 4,
    title: 'Receive ECA Report',
    description: 'Use your Educational Credential Assessment for Express Entry or other immigration programs.',
  },
]

const faqs: FAQItem[] = [
  {
    question: 'Will WES accept your translation?',
    answer: 'Yes. Our translations meet WES requirements and are regularly accepted. We include complete translation, translator\'s declaration, and credentials.',
  },
  {
    question: 'Do you translate grading scales?',
    answer: 'Yes. We translate the grading scale/legend so evaluators understand your academic performance.',
  },
  {
    question: 'How should I send my transcripts?',
    answer: 'Email a clear scan or photo. For commissioner certification, bring the original or notarized copy to our office.',
  },
  {
    question: 'Can you translate multi-page transcripts?',
    answer: 'Yes. We translate transcripts of any length. Pricing is $35/page for standard transcripts.',
  },
  {
    question: 'How long does it take?',
    answer: 'Standard is 1-2 business days. Same-day rush available for +$25.',
  },
]

export default function AcademicTranscriptPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Academic Diploma & Transcript Translation Calgary"
        description="Certified translations accepted by WES, IQAS, and IRCC for Express Entry, PR applications, and credential evaluations."
        url="https://cethos.com/academic-transcript-translation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <LandingHero
        headline="Academic Diploma & Transcript Translation"
        subheadline="Certified translations accepted by WES, IQAS, and IRCC. Get your educational credentials translated for Express Entry, PR applications, and credential evaluations. Same-day service available."
        trustItems={trustItems}
      />

      {/* Credential Organizations Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Accepted by All Major Evaluation Organizations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {credentialOrgs.map((org, index) => (
              <div key={index} className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-200">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{org.name}</h3>
                <p className="text-sm text-[#4B5563] mb-4">
                  <span className="font-medium">Required for:</span> {org.requiredFor}
                </p>
                <div className="flex items-center gap-2 text-[#0891B2] font-semibold">
                  <Check className="w-5 h-5" strokeWidth={2} />
                  {org.status}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Other Organizations</h3>
            <div className="flex flex-wrap gap-3">
              {otherOrgs.map((org, index) => (
                <span key={index} className="px-4 py-2 bg-[#F8FAFC] text-[#4B5563] rounded-full text-sm">
                  {org}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] mb-8">
                Academic Documents We Translate
              </h2>

              <ul className="space-y-3">
                {documents.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" strokeWidth={2} />
                    <span className="text-[#4B5563]">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quote Form */}
            <QuoteForm defaultDocumentType="academic-transcript" defaultPurpose="wes-iqas" />
          </div>
        </div>
      </section>

      {/* Who Needs This Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            Who Needs Academic Translation?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whoNeedsThis.map((item, index) => (
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

      {/* Pricing Section */}
      <section className="py-16 sm:py-20 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-10">
            Academic Translation Pricing
          </h2>

          <div className="bg-white rounded-xl overflow-hidden border border-slate-200 mb-6">
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

          <p className="text-sm text-[#4B5563] text-center">
            * Multi-page transcripts quoted based on total pages. Contact us for an exact quote.
          </p>
        </div>
      </section>

      {/* WES/IQAS Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#0C2340] text-center mb-12">
            How WES & IQAS Evaluation Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          <div className="bg-[#E0F2FE] rounded-xl p-6 text-center">
            <p className="text-[#0C2340]">
              <span className="font-semibold">Tip:</span> Some countries allow self-submission of documents. Others require documents sent directly from institutions. Check WES/IQAS requirements for your country.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <LandingFAQ title="Academic Translation FAQ" faqs={faqs} />

      {/* Final CTA Section */}
      <LandingCTA
        headline="Get Your Academic Credentials Translated"
        subheadline="WES and IQAS accepted. Express Entry ready."
      />

      {/* Sticky Mobile CTA */}
      <StickyMobileCTA />

      {/* Bottom padding for sticky CTA on mobile */}
      <div className="h-20 lg:hidden" />
    </>
  )
}
