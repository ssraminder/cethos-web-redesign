'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  Users,
  CreditCard,
  GraduationCap,
  Briefcase,
  Heart,
  Star,
  BadgeCheck
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const whyChooseUs = [
  {
    icon: Shield,
    title: '100% IRCC Acceptance Guarantee',
    description: 'All translations accepted by Immigration, Refugees and Citizenship Canada. Money-back guarantee if rejected.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service Available',
    description: 'Need it today? Our same-day rush service delivers certified translations within hours.',
  },
  {
    icon: Award,
    title: 'Translation + Notary Same Visit',
    description: 'Get your translation and commissioner certification in one convenient downtown Calgary visit.',
  },
  {
    icon: Users,
    title: '95+ Languages Supported',
    description: 'From Punjabi to Mandarin, Arabic to Tagalog—we translate documents from any language.',
  },
]

const immigrationPrograms = [
  {
    icon: FileText,
    title: 'Express Entry',
    items: ['Federal Skilled Worker', 'Canadian Experience Class', 'Federal Skilled Trades', 'Provincial Nominee Programs'],
  },
  {
    icon: Heart,
    title: 'Family Sponsorship',
    items: ['Spousal Sponsorship', 'Parent & Grandparent Sponsorship', 'Dependent Children', 'Super Visa Applications'],
  },
  {
    icon: Briefcase,
    title: 'Work & Study',
    items: ['Work Permits (LMIA)', 'Post-Graduation Work Permits', 'Study Permits', 'Co-op Work Permits'],
  },
  {
    icon: GraduationCap,
    title: 'Other Programs',
    items: ['Citizenship Applications', 'Refugee Claims', 'Humanitarian Applications', 'Appeals & Renewals'],
  },
]

const documentCategories = [
  {
    title: 'Personal Documents',
    items: ['Birth Certificates', 'Marriage Certificates', 'Divorce Decrees', 'Death Certificates', 'Name Change Documents'],
  },
  {
    title: 'Identity Documents',
    items: ['Passports', 'National ID Cards', 'Driver\'s Licenses', 'Military Service Records'],
  },
  {
    title: 'Educational Documents',
    items: ['Diplomas & Degrees', 'Academic Transcripts', 'Course Descriptions', 'Professional Certificates', 'Letters of Recommendation'],
  },
  {
    title: 'Employment & Financial',
    items: ['Employment Letters', 'Bank Statements', 'Tax Returns', 'Pay Stubs', 'Business Registration'],
  },
]

const pricingTable = [
  { document: 'Birth Certificate', price: 'Starting at $65' },
  { document: 'Marriage/Divorce Certificate', price: 'Starting at $65' },
  { document: 'Diploma or Degree', price: 'Starting at $65' },
  { document: 'Transcript (per page)', price: 'Starting at $35' },
  { document: 'Police Clearance', price: 'Starting at $45' },
  { document: 'Bank Statement (per page)', price: 'Starting at $35' },
  { document: 'Commissioner Certification', price: 'Included' },
  { document: 'Rush Same-Day Service', price: '+$25' },
]

const howItWorks = [
  { step: 1, title: 'Submit Your Document', description: 'Upload a photo or scan of your document through our secure form.' },
  { step: 2, title: 'Receive Your Quote', description: 'Get a detailed quote within 2 hours. No hidden fees.' },
  { step: 3, title: 'We Translate', description: 'IRCC-certified translator completes your translation with accuracy guarantee.' },
  { step: 4, title: 'Pick Up or Delivery', description: 'Collect in downtown Calgary or receive via email/courier.' },
]

const faqs = [
  {
    question: 'Will IRCC accept your certified translations?',
    answer: 'Yes, 100%. All our translations include a signed certificate of accuracy from an IRCC-compliant translator. We offer a money-back guarantee if IRCC ever rejects our translation—though in our 9+ years of business, this has never happened.',
  },
  {
    question: 'How fast can I get my translation?',
    answer: 'Standard service is 2-3 business days. Same-day rush service is available for an additional $25. For urgent deadlines, call us directly at (587) 600-0786.',
  },
  {
    question: 'Do I need to bring my original documents?',
    answer: 'No, we can work from clear photos or scans. You can upload your documents through our website or email them to info@cethos.com.',
  },
  {
    question: 'What languages do you translate?',
    answer: 'We translate from 95+ languages including Punjabi, Hindi, Mandarin, Cantonese, Arabic, Tagalog, Spanish, French, Urdu, Vietnamese, Korean, Japanese, Farsi, and many more.',
  },
  {
    question: 'Is notarization included?',
    answer: 'Commissioner certification (equivalent to notarization for IRCC purposes) is included free with every translation. If you need additional notarization, we can arrange that for an additional fee.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Immigration Translation', url: '/services/certified/immigration-translation-services' },
]

export default function ImmigrationTranslationContent() {
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
            <div className="max-w-xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                IRCC Immigration Translation Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Certified translations accepted by Immigration, Refugees and Citizenship Canada. Birth certificates, marriage documents, academic credentials, and more—translated and notarized same-day in downtown Calgary.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Government of Alberta approved translator. All documents include certification and are ready for submission.
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

              {/* Trust Badges - 2 rows */}
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
              <EmbeddedCertifiedQuoteForm formLocation="immigration-translation-services" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Why Choose Cethos for Immigration Translation?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Immigration Programs */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Immigration Programs Supported</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            We provide certified translations for all Canadian immigration programs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {immigrationPrograms.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                    <program.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-3">{program.title}</h3>
                  <ul className="space-y-2">
                    {program.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Documents We Translate */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Documents We Translate</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
            Comprehensive translation services for all immigration document types.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <h3 className="font-semibold text-[#0C2340] mb-4 pb-2 border-b border-slate-200">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing Table */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Transparent Pricing</h2>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
            No hidden fees. Commissioner certification included with every translation.
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-[#0C2340]">Document Type</th>
                  <th className="px-6 py-4 text-right font-semibold text-[#0C2340]">Price</th>
                </tr>
              </thead>
              <tbody>
                {pricingTable.map((row, index) => (
                  <tr key={index} className="border-t border-slate-200">
                    <td className="px-6 py-4 text-slate-700">{row.document}</td>
                    <td className="px-6 py-4 text-right font-semibold text-teal-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-white/60 text-sm mt-6">
            * Prices may vary based on document complexity and language. Contact us for an exact quote.
          </p>
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

      {/* FAQ Section */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Immigration Documents Translated Today</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              IRCC-accepted certified translations from $65. Same-day service available. Government of Alberta approved.
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
              From $65 • Same-day service • Government of Alberta approved
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

      {/* Related Services Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              Birth Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">
              Marriage Certificate Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/academic-transcript-translation" className="text-[#0891B2] hover:underline">
              Academic Transcript Translation
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
