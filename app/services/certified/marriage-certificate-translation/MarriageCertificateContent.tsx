'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Heart, FileText, Users } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingQuoteForm, LandingLocalBusinessJsonLd } from '@/components/landing'

const documentTypes = [
  {
    title: 'Marriage Documents',
    items: ['Marriage Certificates', 'Marriage Registration', 'Religious Marriage Certificates', 'Civil Union Certificates'],
  },
  {
    title: 'Divorce Documents',
    items: ['Divorce Decrees', 'Divorce Certificates', 'Annulment Documents', 'Separation Agreements'],
  },
  {
    title: 'Supporting Documents',
    items: ['Spouse Birth Certificates', 'Name Change Documents', 'Affidavits of Marriage', 'Joint Declarations'],
  },
]

const whatsIncluded = [
  'Certified translation by IRCC-compliant translator',
  'Signed certificate of accuracy',
  'Commissioner certification included',
  'All names and dates accurately translated',
  'Official seals and stamps noted',
  'Digital and physical copies available',
  'Lifetime accuracy guarantee',
]

const pricingTable = [
  { service: 'Marriage Certificate Translation', price: 'Starting at $65' },
  { service: 'Divorce Decree Translation', price: 'Starting at $65' },
  { service: 'Commissioner Certification', price: 'Included' },
  { service: 'Same-Day Rush', price: '+$25' },
]

const faqs = [
  {
    question: 'Why is marriage certificate translation important for spousal sponsorship?',
    answer: 'For spousal sponsorship applications, IRCC requires proof of your genuine marriage. A certified translation of your marriage certificate provides official documentation of your marital status, marriage date, location, and the identity of both spouses.',
  },
  {
    question: 'Do you translate marriage certificates from religious ceremonies?',
    answer: 'Yes, we translate marriage certificates from all types of ceremonies—civil, religious, traditional, or customary marriages. This includes certificates from churches, mosques, temples, gurdwaras, and civil registries worldwide.',
  },
  {
    question: 'What if I\'ve been divorced and remarried?',
    answer: 'For immigration applications, you may need translations of both your divorce decree (proving the end of your previous marriage) and your new marriage certificate. We can translate both documents as a package.',
  },
  {
    question: 'Can you translate marriage certificates in scripts like Arabic or Chinese?',
    answer: 'Absolutely. We have native-speaking translators for all languages and scripts, including Arabic, Chinese, Hindi, Punjabi, Urdu, Korean, Japanese, Thai, and many more.',
  },
  {
    question: 'How fast can I get my marriage certificate translated?',
    answer: 'Standard service is 2-3 business days. Same-day rush service is available for $25 extra. Need it even faster? Call us at (587) 600-0786.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
  { name: 'Marriage Certificate Translation', url: '/services/certified/marriage-certificate-translation' },
]

export default function MarriageCertificateContent() {
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
                Marriage Certificate Translation Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-[#4B5563] leading-relaxed mb-6"
              >
                IRCC-certified marriage certificate translations for spousal sponsorship, PR, and citizenship applications. Divorce decrees also translated. Same-day available.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-4 mb-6"
              >
                <Link
                  href="#quote-form"
                  className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  Get a Free Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:5876000786"
                  className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <TrustBar items={['Starting at $65', 'Same-Day Available', 'Divorce Decrees Included', '100% IRCC Acceptance']} />
              </motion.div>
            </div>

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Get a Free Quote</h2>
              <p className="text-slate-600 mb-6">Upload your marriage certificate for a quick quote.</p>
              <LandingQuoteForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">Why Marriage Certificate Translation Matters</h2>
            <p className="text-slate-600">
              For spousal sponsorship and family immigration, your marriage certificate is one of the most critical documents. IRCC requires certified translation to verify the legitimacy of your marriage and relationship.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Heart className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Spousal Sponsorship</h3>
              <p className="text-sm text-slate-600">Required for sponsoring your spouse to Canada.</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">PR Applications</h3>
              <p className="text-sm text-slate-600">Prove marital status for permanent residence.</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">Citizenship</h3>
              <p className="text-sm text-slate-600">Document your marital status for citizenship applications.</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Documents We Translate */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">Documents We Translate</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {documentTypes.map((category, index) => (
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
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { step: 1, title: 'Upload Document', description: 'Send us a photo or scan of your certificate.' },
              { step: 2, title: 'Get Quote', description: 'Receive your quote within 2 hours.' },
              { step: 3, title: 'We Translate', description: 'Certified translation with accuracy guarantee.' },
              { step: 4, title: 'Receive Translation', description: 'Pick up or receive by email/courier.' },
            ].map((step, index) => (
              <div key={step.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {step.step}
                </div>
                <h3 className="font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </div>
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
            <h2 className="text-3xl font-bold text-white mb-4">Get Your Marriage Certificate Translated</h2>
            <p className="text-white/90 mb-8">Starting at $65. Same-day service available.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="#quote-form" className="px-8 py-4 bg-white text-[#0891B2] rounded-lg font-semibold hover:bg-slate-100 transition-colors">
                Get a Free Quote
              </Link>
              <a href="tel:5876000786" className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
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
