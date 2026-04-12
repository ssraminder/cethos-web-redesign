'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Phone, CheckCircle, Shield, Clock, Award, FileText, Globe } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

export default function SpanishTranslationContent() {
  const t = useTranslations('certified.spanish')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: 'Spanish Translation', url: '/services/certified/spanish-translation' },
  ]

  const whatsIncluded = [
    t('included.item1'), t('included.item2'), t('included.item3'), t('included.item4'),
    t('included.item5'), t('included.item6'), t('included.item7'),
  ]

  const documentTypes = [
    t('doctypes.doc1'), t('doctypes.doc2'), t('doctypes.doc3'), t('doctypes.doc4'),
    t('doctypes.doc5'), t('doctypes.doc6'), t('doctypes.doc7'), t('doctypes.doc8'),
    t('doctypes.doc9'), t('doctypes.doc10'), t('doctypes.doc11'), t('doctypes.doc12'),
  ]

  const pricingTable = [
    { service: t('pricing.row1_service'), price: t('pricing.row1_price') },
    { service: t('pricing.row2_service'), price: t('pricing.row2_price') },
    { service: t('pricing.row3_service'), price: t('pricing.row3_price') },
    { service: t('pricing.row4_service'), price: t('pricing.row4_price') },
  ]

  const howItWorks = [
    { step: 1, title: t('steps.step1_title'), description: t('steps.step1_desc') },
    { step: 2, title: t('steps.step2_title'), description: t('steps.step2_desc') },
    { step: 3, title: t('steps.step3_title'), description: t('steps.step3_desc') },
    { step: 4, title: t('steps.step4_title'), description: t('steps.step4_desc') },
  ]

  const faqs = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ]

  return (
    <>
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
                {t('hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-[#4B5563] leading-relaxed mb-6"
              >
                {t('hero.subtitle')}
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
                <TrustBar items={[t('hero.trust1'), t('hero.trust2'), t('hero.trust3'), t('hero.trust4')]} />
              </motion.div>
            </div>

            <motion.div
              id="quote-form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <EmbeddedCertifiedQuoteForm formLocation="spanish-translation" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Native Translators */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('why.title')}</h2>
            <p className="text-slate-600">{t('why.description')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card1_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card1_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card2_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card2_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <Award className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card3_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card3_desc')}</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('included.title')}</h2>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('doctypes.title')}</h2>
          <p className="text-center text-slate-600 mb-8">{t('doctypes.subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {documentTypes.map((doc) => (
              <span key={doc} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                {doc}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">{t('doctypes.contact')}</p>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('pricing.title')}</h2>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('steps.title')}</h2>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('faq.title')}</h2>
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
            <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">{t('cta.description')}</p>
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
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('related.title')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/hindi-translation" className="text-[#0891B2] hover:underline">
              {t('related.hindi')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/punjabi-translation" className="text-[#0891B2] hover:underline">
              {t('related.punjabi')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/arabic-translation" className="text-[#0891B2] hover:underline">
              {t('related.arabic')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/french-translation" className="text-[#0891B2] hover:underline">
              {t('related.french')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/mandarin-translation" className="text-[#0891B2] hover:underline">
              {t('related.mandarin')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              {t('related.immigration')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              {t('related.birth')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified" className="text-[#0891B2] hover:underline">
              {t('related.certified')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/get-quote" className="text-[#0891B2] hover:underline">
              {t('related.quote')}
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
