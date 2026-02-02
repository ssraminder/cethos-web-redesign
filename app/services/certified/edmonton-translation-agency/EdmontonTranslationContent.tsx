'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, MapPin, Mail, Truck, Clock, Globe, Shield, Star, BadgeCheck, Award } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const serviceAreas = [
  'Downtown Edmonton',
  'West Edmonton',
  'South Edmonton',
  'North Edmonton',
  'Sherwood Park',
  'St. Albert',
  'Spruce Grove',
  'Leduc',
  'Fort Saskatchewan',
  'Beaumont',
  'Devon',
  'Stony Plain',
]

const deliveryOptions = [
  { method: 'Email (Digital Copy)', price: 'Free', description: 'Receive your certified translation via email' },
  { method: 'Standard Courier to Edmonton', price: '+$25', description: '2-3 business day delivery' },
  { method: 'Express Courier (Next Day)', price: '+$45', description: 'Next business day delivery' },
]

const howItWorks = [
  { step: 1, title: 'Upload Documents', description: 'Send us photos or scans through our secure form—no need to mail originals.' },
  { step: 2, title: 'Receive Quote', description: 'Get an exact quote within 2 hours. Pay online securely.' },
  { step: 3, title: 'We Translate', description: 'IRCC-certified translator completes your translation.' },
  { step: 4, title: 'Delivery', description: 'Receive by email instantly, or by courier to your Edmonton address.' },
]

const documents = [
  'Birth Certificates',
  'Marriage Certificates',
  'Divorce Decrees',
  'Academic Transcripts',
  'Diplomas & Degrees',
  'Police Clearances',
  'Employment Letters',
  'Bank Statements',
  'Passports & IDs',
  'Medical Records',
]

const faqs = [
  {
    question: 'Do I need to visit Calgary for my translation?',
    answer: 'No, our remote service means you can complete everything online. Upload your documents, pay securely, and receive your certified translation by email or courier—all without leaving Edmonton.',
  },
  {
    question: 'How do I send my documents from Edmonton?',
    answer: 'Simply take clear photos or scan your documents and upload them through our website or email them to info@cethos.com. We don\'t need your original documents.',
  },
  {
    question: 'How quickly can I receive my translation in Edmonton?',
    answer: 'Digital copies are delivered instantly by email once completed. For physical copies, standard courier takes 2-3 business days, and express courier delivers next business day.',
  },
  {
    question: 'Are your translations accepted by Edmonton IRCC offices?',
    answer: 'Yes, our IRCC-certified translations are accepted at all immigration offices across Canada, including Edmonton. We provide the same certified translations whether you\'re in Edmonton, Calgary, or anywhere in Alberta.',
  },
  {
    question: 'What if I have urgent documents that need same-day translation?',
    answer: 'We offer same-day rush translation for an additional $25. Combined with express courier, you can have physical copies in Edmonton the next business day. For the fastest option, digital copies are delivered instantly.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Edmonton Translation', url: '/services/certified/edmonton-translation-agency' },
]

export default function EdmontonTranslationContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Edmonton', 'Sherwood Park', 'St. Albert', 'Spruce Grove', 'Leduc', 'Alberta']} />
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
                Edmonton Translation Services
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                IRCC-certified translations delivered to Edmonton. Upload your documents online, receive certified translations by email or courier. No need to travel to Calgary.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Same quality, same IRCC acceptance—delivered directly to your Edmonton address. Government of Alberta approved translator.
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

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-6">Get Your Free Quote</h2>
              <EmbeddedCertifiedQuoteForm formLocation="edmonton-translation-agency" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Remote Service Works */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">How Our Edmonton Remote Service Works</h2>
            <p className="text-slate-600">
              No need to drive to Calgary. Complete your entire translation from Edmonton in 4 simple steps.
            </p>
          </div>
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
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Delivery Options */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Delivery Options to Edmonton</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {deliveryOptions.map((option, index) => (
              <motion.div
                key={option.method}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    {index === 0 ? <Mail className="w-6 h-6 text-teal-600" /> :
                     index === 1 ? <Truck className="w-6 h-6 text-teal-600" /> :
                     <Clock className="w-6 h-6 text-teal-600" />}
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-1">{option.method}</h3>
                  <div className="text-2xl font-bold text-teal-600 mb-2">{option.price}</div>
                  <p className="text-sm text-slate-600">{option.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">Edmonton Areas We Serve</h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">
            We deliver certified translations to all Edmonton neighborhoods and surrounding communities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {serviceAreas.map((area) => (
              <span key={area} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full flex items-center gap-2">
                <MapPin className="w-4 h-4 text-teal-600" />
                {area}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Documents */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">Documents We Translate</h2>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
            All your immigration documents, certified and delivered to Edmonton.
          </p>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {documents.map((doc) => (
              <span key={doc} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                {doc}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Remote */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Why Edmonton Clients Choose Our Remote Service</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Clock className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Save Time</h3>
              <p className="text-sm text-slate-600">No 3-hour round trip to Calgary. Complete everything from your home or office.</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Same Quality</h3>
              <p className="text-sm text-slate-600">Identical IRCC-certified translations, accepted at all Edmonton immigration offices.</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Secure Process</h3>
              <p className="text-sm text-slate-600">Encrypted uploads, secure payment, and confidential handling of your documents.</p>
            </Card>
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
            <h2 className="text-3xl font-bold text-white mb-4">Edmonton Translation Services – No Travel Required</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              IRCC-certified translations delivered by email or courier. From $65 with same-day service available.
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

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Document Translation Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              Immigration Translation
            </Link>
            <span className="text-slate-300">•</span>
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
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
