'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Shield, Clock, Award, FileText, Globe, Star, BadgeCheck, Heart, Users } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const whatsIncluded = [
  'Certified translation by IRCC-compliant translator',
  'Signed certificate of accuracy',
  'Commissioner certification (notarization equivalent)',
  'Translations formatted for IRCC portal upload',
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
  { service: 'Marriage Certificate Translation', price: 'Starting at $65' },
  { service: 'Birth Certificate Translation', price: 'Starting at $65' },
  { service: 'Police Clearance Translation', price: 'Starting at $65' },
  { service: 'Sponsorship Bundle (3-5 docs)', price: 'Starting at $175' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25/doc' },
]

const howItWorks = [
  { step: 1, title: 'Upload Your Documents', description: 'Upload scans or photos of your marriage certificate, identity documents, and supporting evidence.' },
  { step: 2, title: 'Get Your Quote', description: 'Receive a detailed quote within 2 hours. Bundle pricing for sponsorship packages.' },
  { step: 3, title: 'We Translate', description: 'Our IRCC-certified translators complete all your documents with 100% accuracy.' },
  { step: 4, title: 'Receive & Submit', description: 'Get your certified translations—ready to upload to your IRCC sponsorship application.' },
]

const sponsorshipDocuments = [
  'Marriage certificate',
  'Birth certificates (sponsor & applicant)',
  'Police clearance certificates',
  'Divorce or annulment certificates (if applicable)',
  'Relationship evidence (chat logs, letters)',
  'Identity documents (national ID, passport pages)',
  'Proof of cohabitation documents',
  'Medical examination results (if applicable)',
]

const faqs = [
  {
    question: 'What documents need translation for spousal sponsorship?',
    answer: 'For spousal sponsorship (IMM 1344), IRCC requires certified translation of all documents not in English or French. Common documents include marriage certificates, birth certificates, police clearance certificates, divorce certificates (if previously married), identity documents, and any relationship evidence submitted in another language.',
  },
  {
    question: 'Do relationship evidence documents need certified translation?',
    answer: 'Yes. If you are submitting chat transcripts, letters, cards, or other relationship evidence in a language other than English or French, IRCC requires certified translation. We can translate WhatsApp conversations, handwritten letters, and other relationship evidence used to prove the genuineness of your relationship.',
  },
  {
    question: 'How much does spousal sponsorship translation cost?',
    answer: 'Individual documents start at $65 each. We offer bundle pricing for complete sponsorship packages—3-5 documents from $175. The exact cost depends on the number and length of your documents. Contact us for a detailed quote based on your specific document list.',
  },
  {
    question: 'Can you translate documents for common-law partner sponsorship?',
    answer: 'Yes. We translate all documents needed for common-law partner sponsorship applications, including cohabitation proof, joint financial documents, statutory declarations, and relationship evidence. The translation requirements are the same as for spousal sponsorship.',
  },
  {
    question: 'How quickly can I get my sponsorship documents translated?',
    answer: 'Standard turnaround is 2-3 business days. Same-day rush service is available for an additional $25 per document. For complete sponsorship packages with multiple documents, we recommend allowing 3-5 business days to ensure everything is translated accurately.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Spousal Sponsorship', url: '/services/certified/spousal-sponsorship' },
]

export default function SpousalSponsorshipContent() {
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
                Spousal Sponsorship Translation Canada
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Certified translation of marriage certificates, identity documents, police clearances, and relationship evidence for IRCC spousal and common-law partner sponsorship applications.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                100% IRCC acceptance guarantee. Bundle pricing available for complete sponsorship packages.
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
                defaultDocumentType="marriage-certificate"
                formLocation="spousal-sponsorship"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Translation Matters for Sponsorship */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why Certified Translation Matters for Sponsorship</h2>
            <p className="text-slate-600">
              IRCC requires certified translation of all documents not in English or French for spousal and common-law partner sponsorship applications. Incomplete or uncertified translations are a common reason for application delays and refusals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Heart className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Prove Your Relationship</h3>
              <p className="text-sm text-slate-600">Marriage certificates and relationship evidence must be translated accurately to demonstrate genuineness.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Meet IRCC Requirements</h3>
              <p className="text-sm text-slate-600">IRCC only accepts translations with a signed certificate of accuracy from a certified translator.</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Avoid Application Delays</h3>
              <p className="text-sm text-slate-600">Incomplete translations are a top reason for sponsorship delays. Get it right the first time.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Document Checklist */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Sponsorship Document Checklist</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h3 className="font-semibold text-[#0C2340] mb-4">Common Documents Requiring Translation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sponsorshipDocuments.map((item, index) => (
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
      <section className="py-16 bg-white">
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
      <section className="py-16 bg-slate-50">
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
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Sponsorship Documents Translated</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Complete sponsorship translation packages from $175. Individual documents from $65. 100% IRCC acceptance guarantee.
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
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">
              Marriage Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation Services
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
