'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Shield, Clock, Award, FileText, Globe, Star, BadgeCheck, GraduationCap, MapPin } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

const whatsIncluded = [
  'Certified translation accepted by IQAS',
  'Signed certificate of accuracy',
  'Commissioner certification (notarization equivalent)',
  'Format matching for IQAS submission requirements',
  'Digital copy via email for online submission',
  'Physical copy available for pickup at our Calgary office',
  'Free revisions if needed',
]

const topLanguages = [
  'Punjabi', 'Hindi', 'Urdu', 'Mandarin', 'Cantonese', 'Arabic', 'Tagalog', 'Spanish',
  'French', 'Vietnamese', 'Korean', 'Japanese', 'Farsi', 'Russian', 'Portuguese', 'German',
  'Italian', 'Polish', 'Ukrainian', 'Turkish', 'Tamil', 'Telugu', 'Bengali', 'Gujarati'
]

const pricingTable = [
  { service: 'Academic Transcript Translation', price: 'Starting at $65' },
  { service: 'Diploma / Degree Certificate', price: 'Starting at $65' },
  { service: 'IQAS Bundle (Transcript + Diploma)', price: 'Starting at $120' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25' },
]

const howItWorks = [
  { step: 1, title: 'Upload Your Documents', description: 'Scan or photograph your academic transcripts and diplomas. Upload through our secure form.' },
  { step: 2, title: 'Get Your Quote', description: 'Receive an exact quote within 2 hours. Bundle pricing available for multiple documents.' },
  { step: 3, title: 'We Translate', description: 'Our certified translator completes your translation in the format IQAS requires.' },
  { step: 4, title: 'Submit to IQAS', description: 'Receive your certified translation—ready for IQAS submission online or by mail.' },
]

const faqs = [
  {
    question: 'What is IQAS and how is it different from WES?',
    answer: 'IQAS (International Qualifications Assessment Service) is Alberta\'s official credential assessment body, operated by the Government of Alberta. While WES is a national organization, IQAS is specifically designed for Alberta applicants and is accepted by the Alberta Advantage Immigration Program (AINP), Alberta employers, and professional regulatory bodies. IQAS assessments are also accepted by IRCC for Express Entry.',
  },
  {
    question: 'Does IQAS accept your translations?',
    answer: 'Yes. Our certified translations meet all IQAS requirements. Each translation includes a signed certificate of accuracy and commissioner certification. We are a Government of Alberta approved translator located in Calgary, making us an ideal choice for IQAS applicants in Alberta.',
  },
  {
    question: 'What documents does IQAS require to be translated?',
    answer: 'IQAS requires certified English translations of all academic documents not originally in English. This includes transcripts, diplomas, degree certificates, mark sheets, and course descriptions. IQAS may also require translated syllabi or course outlines for certain professional assessments.',
  },
  {
    question: 'Do I need IQAS for the Alberta Advantage Immigration Program (AINP)?',
    answer: 'Yes, most AINP streams require an educational credential assessment. IQAS is the recommended assessment body for Alberta applicants. Your foreign academic documents will need certified translation before IQAS can evaluate them.',
  },
  {
    question: 'How long does IQAS translation take?',
    answer: 'Standard turnaround is 2-3 business days. Same-day rush service is available for an additional $25 per document. Since we are based in Calgary, you can also pick up your translations in person for immediate IQAS submission.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'IQAS Alberta', url: '/services/certified/iqas-alberta' },
]

export default function IqasAlbertaContent() {
  return (
    <>
      <LandingLocalBusinessJsonLd areaServed={['Alberta', 'Canada']} />
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
                IQAS Certified Translation Services in Alberta
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                Certified translation of academic documents for IQAS credential assessment. Accepted by the Alberta Advantage Immigration Program (AINP), Alberta employers, and professional regulatory bodies.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                Government of Alberta approved translator based in Calgary. Same-day service and in-person pickup available.
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
                    IQAS Accepted
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
                    <MapPin className="w-5 h-5 text-[#0891B2]" />
                    Calgary Office — In-Person Pickup
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
                defaultDocumentType="academic-transcript"
                formLocation="iqas-alberta"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why IQAS */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why You Need IQAS Translation</h2>
            <p className="text-slate-600">
              IQAS (International Qualifications Assessment Service) is Alberta&apos;s official credential assessment body. If your academic documents are not in English, you need certified translation before IQAS can evaluate your credentials.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <GraduationCap className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Alberta Immigration (AINP)</h3>
              <p className="text-sm text-slate-600">Most AINP streams require IQAS assessment of your foreign education credentials.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Express Entry ECA</h3>
              <p className="text-sm text-slate-600">IQAS is a designated organization for Educational Credential Assessments accepted by IRCC.</p>
            </Card>
            <Card className="p-6 text-center">
              <Award className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Professional Licensing</h3>
              <p className="text-sm text-slate-600">Alberta professional bodies often require IQAS assessment for foreign-trained professionals.</p>
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
            <h2 className="text-3xl font-bold text-white mb-4">Get Your IQAS Translation Started Today</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Certified academic translations from $65. Accepted by IQAS, AINP, and all Alberta regulatory bodies. Calgary office with in-person pickup.
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

      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">Related Services</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/wes-evaluation" className="text-[#0891B2] hover:underline">
              WES Evaluation Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/academic-transcript-translation" className="text-[#0891B2] hover:underline">
              Academic Transcript Translation
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/express-entry" className="text-[#0891B2] hover:underline">
              Express Entry Translation
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
