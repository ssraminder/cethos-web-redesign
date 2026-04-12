'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight, Phone, CheckCircle, Shield, Clock, Award, FileText,
  Users, CreditCard, GraduationCap, Briefcase, Heart, Star, BadgeCheck
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'
import { useTranslations } from 'next-intl'

export default function ImmigrationTranslationContent() {
  const t = useTranslations('certified.immigration')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: 'Immigration Translation', url: '/services/certified/immigration-translation-services' },
  ]

  const whyChooseUs = [
    { icon: Shield, title: t('why1_title'), description: t('why1_desc') },
    { icon: Clock, title: t('why2_title'), description: t('why2_desc') },
    { icon: Award, title: t('why3_title'), description: t('why3_desc') },
    { icon: Users, title: t('why4_title'), description: t('why4_desc') },
  ]

  const immigrationPrograms = [
    {
      icon: FileText, title: t('prog1_title'),
      items: [t('prog1_item1'), t('prog1_item2'), t('prog1_item3'), t('prog1_item4')],
    },
    {
      icon: Heart, title: t('prog2_title'),
      items: [t('prog2_item1'), t('prog2_item2'), t('prog2_item3'), t('prog2_item4')],
    },
    {
      icon: Briefcase, title: t('prog3_title'),
      items: [t('prog3_item1'), t('prog3_item2'), t('prog3_item3'), t('prog3_item4')],
    },
    {
      icon: GraduationCap, title: t('prog4_title'),
      items: [t('prog4_item1'), t('prog4_item2'), t('prog4_item3'), t('prog4_item4')],
    },
  ]

  const documentCategories = [
    {
      title: t('doccat1_title'),
      items: [t('doccat1_item1'), t('doccat1_item2'), t('doccat1_item3'), t('doccat1_item4'), t('doccat1_item5')],
    },
    {
      title: t('doccat2_title'),
      items: [t('doccat2_item1'), t('doccat2_item2'), t('doccat2_item3'), t('doccat2_item4')],
    },
    {
      title: t('doccat3_title'),
      items: [t('doccat3_item1'), t('doccat3_item2'), t('doccat3_item3'), t('doccat3_item4'), t('doccat3_item5')],
    },
    {
      title: t('doccat4_title'),
      items: [t('doccat4_item1'), t('doccat4_item2'), t('doccat4_item3'), t('doccat4_item4'), t('doccat4_item5')],
    },
  ]

  const pricingTable = [
    { document: t('pricing_doc_1'), price: t('pricing_price_1') },
    { document: t('pricing_doc_2'), price: t('pricing_price_2') },
    { document: t('pricing_doc_3'), price: t('pricing_price_3') },
    { document: t('pricing_doc_4'), price: t('pricing_price_4') },
    { document: t('pricing_doc_5'), price: t('pricing_price_5') },
    { document: t('pricing_doc_6'), price: t('pricing_price_6') },
    { document: t('pricing_doc_7'), price: t('pricing_price_7') },
    { document: t('pricing_doc_8'), price: t('pricing_price_8') },
  ]

  const howItWorks = [
    { step: 1, title: t('step1_title'), description: t('step1_desc') },
    { step: 2, title: t('step2_title'), description: t('step2_desc') },
    { step: 3, title: t('step3_title'), description: t('step3_desc') },
    { step: 4, title: t('step4_title'), description: t('step4_desc') },
  ]

  const faqs = [
    { question: t('faq_q1'), answer: t('faq_a1') },
    { question: t('faq_q2'), answer: t('faq_a2') },
    { question: t('faq_q3'), answer: t('faq_a3') },
    { question: t('faq_q4'), answer: t('faq_a4') },
    { question: t('faq_q5'), answer: t('faq_a5') },
  ]

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
                {t('hero_heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                {t('hero_desc')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                {t('hero_desc2')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">{t('price_badge')}</span>
                <span className="text-slate-600">{t('price_unit')}</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a href="tel:5876000786" className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2">
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
                <a href="mailto:info@cethos.com" className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                  {t('cta_email')}
                </a>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2"><Shield className="w-5 h-5 text-[#0891B2]" />{t('trust_ircc')}</span>
                  <span className="flex items-center gap-2"><BadgeCheck className="w-5 h-5 text-[#0891B2]" />{t('trust_gov')}</span>
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-[#0891B2]" />{t('trust_sameday')}</span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2"><Award className="w-5 h-5 text-[#0891B2]" />{t('trust_notary')}</span>
                  <span className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />{t('trust_reviews')}</span>
                </div>
              </motion.div>
            </div>

            <motion.div id="quote-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <EmbeddedCertifiedQuoteForm formLocation="immigration-translation-services" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('why_heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('programs_heading')}</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">{t('programs_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {immigrationPrograms.map((program, index) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('docs_heading')}</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">{t('docs_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
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
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t('pricing_heading')}</h2>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">{t('pricing_desc')}</p>
          <div className="max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-6 py-4 text-left font-semibold text-[#0C2340]">{t('pricing_col_doc')}</th>
                  <th className="px-6 py-4 text-right font-semibold text-[#0C2340]">{t('pricing_col_price')}</th>
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
          <p className="text-center text-white/60 text-sm mt-6">{t('pricing_footer')}</p>
        </Container>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('how_heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div key={step.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
                <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">{step.step}</div>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('faq_heading')}</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
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
            <h2 className="text-3xl font-bold text-white mb-4">{t('cta_heading')}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t('cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:5876000786" className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
              <a href="mailto:info@cethos.com" className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors">
                {t('cta_email_quote')}
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">{t('cta_footer')}</p>
          </div>
        </Container>
      </section>

      {/* Serving Across Canada */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('canada_heading')}</h2>
          <p className="text-slate-600 text-center mb-8">{t('canada_desc')}</p>
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
              <Link key={location.href} href={location.href} className="bg-white px-6 py-3 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors shadow-sm">
                {location.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('related_heading')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">{t('related_birth')}</Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">{t('related_marriage')}</Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/academic-transcript-translation" className="text-[#0891B2] hover:underline">{t('related_academic')}</Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">{t('related_pr')}</Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
