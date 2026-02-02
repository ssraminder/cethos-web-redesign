'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Phone, CheckCircle, Shield, Clock, Award, FileText, Globe } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const whatsIncluded = [
  'Certified translation by native Hindi translator',
  'Signed certificate of accuracy',
  'Commissioner certification (notarization equivalent)',
  'Digital copy via email',
  'Physical copy available for pickup or delivery',
  'Lifetime accuracy guarantee',
  'Free revisions if needed',
]

const documentTypes = [
  'Birth Certificates',
  'Marriage Certificates',
  'Divorce Decrees',
  'Academic Transcripts',
  'Diplomas & Degrees',
  'Police Clearance Certificates',
  'Employment Letters',
  'Affidavits',
  'Aadhaar Cards',
  'PAN Cards',
  'Medical Records',
  'Driver\'s Licenses',
]

const pricingTable = [
  { service: 'Single Document (1 page)', price: 'Starting at $65' },
  { service: 'Per Additional Page', price: '$35/page' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25' },
]

const howItWorks = [
  { step: 1, title: 'Upload Your Document', description: 'Take a clear photo or scan of your Hindi document and upload it through our secure form.' },
  { step: 2, title: 'Get Your Quote', description: 'Receive an exact quote within 2 hours. No hidden fees, no surprises.' },
  { step: 3, title: 'We Translate', description: 'Our native Hindi translator completes your translation with 100% accuracy.' },
  { step: 4, title: 'Receive Your Translation', description: 'Pick up in downtown Calgary or receive via email/courier.' },
]

const faqs = [
  {
    question: 'Do you translate documents in Devanagari script?',
    answer: 'Yes, we specialize in translating documents written in Devanagari script, the traditional script used for Hindi and many other Indian languages. Our native Hindi translators are fully proficient in reading and translating Devanagari text.',
  },
  {
    question: 'Can you translate official Indian government documents?',
    answer: 'Yes, we regularly translate Indian government documents including birth certificates, marriage certificates, educational documents, Aadhaar cards, PAN cards, and police clearance certificates. All translations are certified for IRCC acceptance.',
  },
  {
    question: 'How much does Hindi translation cost?',
    answer: 'Hindi translation starts at $65 for a single-page document like a birth certificate, which includes certified translation and commissioner certification. Multi-page documents are priced at $35 per additional page.',
  },
  {
    question: 'What Hindi documents do you translate most often?',
    answer: 'We frequently translate birth certificates, marriage certificates, academic transcripts, and degrees from India. We also translate employment letters, police clearance certificates, and various government-issued identity documents.',
  },
  {
    question: 'Are your Hindi translations accepted by IRCC?',
    answer: 'Yes, all our Hindi translations are certified and 100% accepted by IRCC. We provide a signed certificate of accuracy with every translation, which meets IRCC requirements for immigration applications.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Hindi Translation Calgary', url: '/services/certified/hindi-translation-calgary' },
]

export default function HindiTranslationContent() {
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
                Hindi Translation Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-[#4B5563] leading-relaxed mb-6"
              >
                IRCC-certified Hindi translations by native translators. Devanagari script expertise. Same-day service available with on-site notarization.
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
                <TrustBar items={['Starting at $65', 'Same-Day Available', '100% IRCC Acceptance Guarantee', 'Native Hindi Translators']} />
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
              <h2 className="text-2xl font-bold text-[#0C2340] mb-6">Get Your Free Quote</h2>
              <EmbeddedCertifiedQuoteForm
                formLocation="hindi-translation-calgary"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Native Translators */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why Choose Native Hindi Translators</h2>
            <p className="text-slate-600">
              Our Hindi translators are native speakers with deep understanding of Devanagari script and the various document formats used across India.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Native Speakers</h3>
              <p className="text-sm text-slate-600">Our translators are native Hindi speakers from India with cultural expertise.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Devanagari Experts</h3>
              <p className="text-sm text-slate-600">Expert translation of traditional Devanagari script documents.</p>
            </Card>
            <Card className="p-6 text-center">
              <Award className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">IRCC Certified</h3>
              <p className="text-sm text-slate-600">All translations are certified and accepted by IRCC.</p>
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

      {/* Document Types */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Hindi Documents We Translate</h2>
          <p className="text-center text-slate-600 mb-8">Common documents from India:</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {documentTypes.map((doc) => (
              <span key={doc} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                {doc}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">Don&apos;t see your document type? Contact us—we translate all Hindi documents.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Hindi Documents Translated Today</h2>
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
            <Link href="/services/certified/punjabi-translation-calgary" className="text-[#0891B2] hover:underline">
              Punjabi Translation Calgary
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
