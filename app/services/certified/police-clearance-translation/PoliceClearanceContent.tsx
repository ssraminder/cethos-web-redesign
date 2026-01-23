'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, CheckCircle, Shield, Clock, Award, FileText, Globe } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { CertifiedQuoteForm } from '@/components/forms/CertifiedQuoteForm'

const whatsIncluded = [
  'Certified translation by IRCC-compliant translator',
  'Signed certificate of accuracy',
  'Commissioner certification (notarization equivalent)',
  'Digital copy via email',
  'Physical copy available for pickup or delivery',
  'Lifetime accuracy guarantee',
  'Free revisions if needed',
]

const topLanguages = [
  'Punjabi', 'Hindi', 'Urdu', 'Mandarin', 'Cantonese', 'Arabic', 'Tagalog', 'Spanish',
  'French', 'Vietnamese', 'Korean', 'Japanese', 'Farsi', 'Russian', 'Portuguese', 'German',
  'Italian', 'Polish', 'Ukrainian', 'Turkish', 'Tamil', 'Telugu', 'Bengali', 'Gujarati'
]

const pricingTable = [
  { service: 'Police Clearance Translation', price: 'Starting at $65' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25' },
  { service: 'Courier Delivery (Calgary)', price: '+$15' },
]

const howItWorks = [
  { step: 1, title: 'Upload Your Document', description: 'Take a clear photo or scan of your police clearance certificate and upload it through our secure form.' },
  { step: 2, title: 'Get Your Quote', description: 'Receive an exact quote within 2 hours. No hidden fees, no surprises.' },
  { step: 3, title: 'We Translate', description: 'Our IRCC-certified translator completes your translation with 100% accuracy.' },
  { step: 4, title: 'Receive Your Translation', description: 'Pick up in downtown Calgary or receive via email/courier.' },
]

const faqs = [
  {
    question: 'What types of police clearance documents do you translate?',
    answer: 'We translate all types of police clearance documents including RCMP criminal record checks, FBI background checks, national police certificates from any country, and state/provincial police clearances. All translations are certified for IRCC acceptance.',
  },
  {
    question: 'Why does IRCC require police clearance certificate translation?',
    answer: 'IRCC requires certified translations of police clearance certificates to verify that applicants have no criminal history that would make them inadmissible to Canada. This is a mandatory requirement for most immigration applications including PR, citizenship, and work permits.',
  },
  {
    question: 'How much does police clearance translation cost?',
    answer: 'Police clearance certificate translation starts at $65, which includes the certified translation and commissioner certification. Same-day rush service is available for an additional $25.',
  },
  {
    question: 'Do I need to translate police clearances from every country I lived in?',
    answer: 'Generally, IRCC requires police clearance certificates from every country where you lived for 6 months or more since turning 18. Each certificate in a foreign language needs certified translation.',
  },
  {
    question: 'What if my police clearance has stamps or seals in a different language?',
    answer: 'We translate all text on the document including stamps, seals, and annotations. Our translators are experienced with police documents from around the world and understand the various formats used by different countries.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Police Clearance Translation', url: '/services/certified/police-clearance-translation' },
]

export default function PoliceClearanceContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Calgary', 'Edmonton', 'Alberta', 'Canada']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[36px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
              >
                Police Clearance Translation Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-[#4B5563] leading-relaxed mb-6"
              >
                IRCC-certified translations for RCMP, FBI, and international police clearance certificates. Same-day service available with on-site notarization.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 mb-6"
              >
                <a
                  href="tel:5876000786"
                  className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TrustBar items={['Starting at $65', 'Same-Day Available', '100% IRCC Acceptance Guarantee', 'Translation + Notary Same Visit']} />
              </motion.div>
            </div>

            {/* Quote Form */}
            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Get a Free Quote</h2>
              <p className="text-slate-600 mb-6">Upload your police clearance certificate for a quick quote.</p>
              <CertifiedQuoteForm
                defaultDocumentType="police-clearance"
                formLocation="police-clearance-translation"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why IRCC Requires Translation */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why IRCC Requires Police Clearance Translation</h2>
            <p className="text-slate-600">
              Immigration, Refugees and Citizenship Canada requires certified translation of all foreign-language police clearance documents. This ensures officers can verify your criminal background for immigration eligibility.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Shield className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Admissibility Check</h3>
              <p className="text-sm text-slate-600">Police clearances verify you have no criminal history affecting your eligibility.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Legal Requirement</h3>
              <p className="text-sm text-slate-600">IRCC only accepts translations with a signed certificate of accuracy.</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">All Countries Accepted</h3>
              <p className="text-sm text-slate-600">We translate police certificates from any country in any language.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">What&apos;s Included</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <div className="space-y-4">
                {whatsIncluded.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Languages */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Languages We Translate</h2>
          <p className="text-center text-slate-600 mb-8">95+ languages supported. Here are our most requested:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {topLanguages.map((lang) => (
              <span key={lang} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                {lang}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">Don&apos;t see your language? Contact us—we likely support it.</p>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="max-w-md mx-auto bg-white rounded-2xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {pricingTable.map((row, index) => (
                  <tr key={index} className={index > 0 ? 'border-t border-slate-200' : ''}>
                    <td className="px-6 py-4 text-slate-700">{row.service}</td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-[#0891B2]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Police Clearance Translated Today</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Starting at $65. Same-day service available.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-white text-[#0891B2] rounded-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">
              PR & Citizenship Packages
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
