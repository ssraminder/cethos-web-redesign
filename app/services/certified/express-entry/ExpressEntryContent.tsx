'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Shield, Clock, Award, FileText, Globe, Star, BadgeCheck, Plane } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const whatsIncluded = [
  'Certified translation by IRCC-compliant translator',
  'Signed certificate of accuracy',
  'Commissioner certification (notarization equivalent)',
  'Translations formatted for IRCC online portal upload',
  'Digital copy via email',
  'Physical copy available for pickup or delivery',
  'Free revisions if needed',
]

const topLanguages = [
  'Punjabi', 'Hindi', 'Urdu', 'Mandarin', 'Cantonese', 'Arabic', 'Tagalog', 'Spanish',
  'French', 'Vietnamese', 'Korean', 'Japanese', 'Farsi', 'Russian', 'Portuguese', 'German',
  'Italian', 'Polish', 'Ukrainian', 'Turkish', 'Tamil', 'Telugu', 'Bengali', 'Gujarati'
]

const pricingTable = [
  { service: 'Single Document Translation', price: 'Starting at $65' },
  { service: 'Express Entry Package (3-5 docs)', price: 'Starting at $175' },
  { service: 'Complete Package (6+ docs)', price: 'Custom Quote' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25/doc' },
]

const howItWorks = [
  { step: 1, title: 'Upload Your Documents', description: 'Upload scans or photos of all documents that need translation through our secure form.' },
  { step: 2, title: 'Get Your Quote', description: 'Receive a detailed quote within 2 hours with bundle pricing for multiple documents.' },
  { step: 3, title: 'We Translate', description: 'Our IRCC-certified translators complete all your documents with 100% accuracy.' },
  { step: 4, title: 'Receive & Submit', description: 'Get your certified translations via email—ready to upload to your IRCC Express Entry profile.' },
]

const documentChecklist = [
  'Birth certificate',
  'Marriage certificate (if applicable)',
  'Police clearance certificates',
  'Academic transcripts & diplomas',
  'Employment reference letters',
  'Name change documents (if applicable)',
  'Divorce certificate (if applicable)',
  'Military service records (if applicable)',
]

const faqs = [
  {
    question: 'What documents do I need translated for Express Entry?',
    answer: 'For Express Entry, IRCC requires certified translation of any document not in English or French. Common documents include birth certificates, marriage certificates, police clearance certificates, academic transcripts, diplomas, and employment reference letters. The exact documents depend on your program (FSW, CEC, or FSTP).',
  },
  {
    question: 'Do I need an ECA for Express Entry?',
    answer: 'Yes, if you are applying under the Federal Skilled Worker (FSW) program, you must have an Educational Credential Assessment (ECA) from a designated organization like WES. Your academic documents will need certified translation for the ECA application. CEC applicants with Canadian education may not need an ECA.',
  },
  {
    question: 'How fast can I get my Express Entry documents translated?',
    answer: 'Standard turnaround is 2-3 business days per document. Same-day rush service is available for an additional $25 per document. For complete Express Entry packages with multiple documents, we recommend allowing 3-5 business days.',
  },
  {
    question: 'Are your translations accepted by IRCC for Express Entry?',
    answer: 'Yes, 100% guaranteed. Our certified translations meet all IRCC requirements for Express Entry applications, including the signed certificate of accuracy and commissioner certification. We have translated thousands of Express Entry documents with a perfect acceptance record.',
  },
  {
    question: 'Can you translate documents from any country?',
    answer: 'Yes, we translate documents from every country in 95+ languages. Whether your documents are from India, China, the Philippines, the Middle East, Africa, or anywhere else, our native-speaking translators ensure accurate, certified translations.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Express Entry', url: '/services/certified/express-entry' },
]

export default function ExpressEntryContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Canada']} />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                Express Entry Document Translation
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Get all your Express Entry documents translated by IRCC-certified translators. Birth certificates, police clearances, academic credentials, and more—everything you need for your application.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                100% IRCC acceptance guarantee. Bundle pricing available for complete Express Entry packages.
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">From $65</span>
                <span className="text-slate-600">per document</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
                <a
                  href="mailto:info@cethos.com"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors"
                >
                  Email Us
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0891B2]" />
                    100% IRCC Accepted
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                    Gov&apos;t of Alberta Approved
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    Same-Day Available
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0891B2]" />
                    Notarization Included
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    139 Five-Star Reviews
                  </span>
                </div>
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
              <EmbeddedCertifiedQuoteForm
                defaultDocumentType="immigration"
                formLocation="express-entry"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Express Entry Document Checklist */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Express Entry Document Checklist</h2>
            <p className="text-slate-600">
              Express Entry applications require several supporting documents. If any of these are not in English or French, IRCC requires certified translation from a qualified translator.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Plane className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Identity Documents</h3>
              <p className="text-sm text-slate-600">Birth certificates, passports, and name change documents proving your identity.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Education & Work</h3>
              <p className="text-sm text-slate-600">Academic transcripts, diplomas, and employment reference letters for CRS points.</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Background & Status</h3>
              <p className="text-sm text-slate-600">Police clearances, marriage/divorce certificates, and military records.</p>
            </Card>
          </div>

          {/* Checklist */}
          <div className="max-w-2xl mx-auto mt-12">
            <Card className="p-8">
              <h3 className="font-semibold text-[#0C2340] mb-4">Common Documents Requiring Translation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {documentChecklist.map((item, index) => (
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
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Express Entry Documents Translated</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Complete Express Entry translation packages from $175. Individual documents from $65. 100% IRCC acceptance guarantee.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <a
                href="mailto:info@cethos.com"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                Email for Quote
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">
              From $65 per document • Bundle pricing available • Same-day service
            </p>
          </div>
        </Container>
      </section>

      {/* Serving Across Canada */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Certified Translation Across Canada</h2>
          <p className="text-slate-600 text-center mb-8">Serving clients from coast to coast with fast delivery and 100% IRCC acceptance.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Calgary', href: '/locations/calgary' },
              { label: 'Edmonton', href: '/locations/edmonton' },
              { label: 'Toronto', href: '/locations/toronto' },
              { label: 'Vancouver', href: '/locations/vancouver' },
              { label: 'Ottawa', href: '/locations/ottawa' },
              { label: 'Montreal', href: '/locations/montreal' },
              { label: 'Winnipeg', href: '/locations/winnipeg' },
              { label: 'Halifax', href: '/locations/halifax' },
              { label: 'Saskatoon', href: '/locations/saskatoon' },
            ].map((location) => (
              <Link
                key={location.href}
                href={location.href}
                className="bg-white px-6 py-3 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors shadow-sm"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/wes-evaluation" className="text-[#0891B2] hover:underline">
              WES Evaluation Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">
              PR & Citizenship Packages
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
