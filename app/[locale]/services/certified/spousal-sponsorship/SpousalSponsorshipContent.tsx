'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Shield, Clock, Award, FileText, Globe, Star, BadgeCheck, Heart, Users } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'
import { useTranslations } from 'next-intl'

const topLanguages = [
  'Punjabi', 'Hindi', 'Urdu', 'Mandarin', 'Cantonese', 'Arabic', 'Tagalog', 'Spanish',
  'French', 'Vietnamese', 'Korean', 'Japanese', 'Farsi', 'Russian', 'Portuguese', 'German',
  'Italian', 'Polish', 'Ukrainian', 'Turkish', 'Tamil', 'Telugu', 'Bengali', 'Gujarati'
]

export default function SpousalSponsorshipContent() {
  const t = useTranslations('certified.spousal')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: 'Spousal Sponsorship', url: '/services/certified/spousal-sponsorship' },
  ]

  const whatsIncluded = [
    t('included_1'), t('included_2'), t('included_3'), t('included_4'),
    t('included_5'), t('included_6'), t('included_7'),
  ]

  const pricingTable = [
    { service: t('pricing_service_1'), price: t('pricing_price_1') },
    { service: t('pricing_service_2'), price: t('pricing_price_2') },
    { service: t('pricing_service_3'), price: t('pricing_price_3') },
    { service: t('pricing_service_4'), price: t('pricing_price_4') },
    { service: t('pricing_service_5'), price: t('pricing_price_5') },
    { service: t('pricing_service_6'), price: t('pricing_price_6') },
  ]

  const howItWorks = [
    { step: 1, title: t('step1_title'), description: t('step1_desc') },
    { step: 2, title: t('step2_title'), description: t('step2_desc') },
    { step: 3, title: t('step3_title'), description: t('step3_desc') },
    { step: 4, title: t('step4_title'), description: t('step4_desc') },
  ]

  const sponsorshipDocuments = [
    t('spdoc_1'), t('spdoc_2'), t('spdoc_3'), t('spdoc_4'),
    t('spdoc_5'), t('spdoc_6'), t('spdoc_7'), t('spdoc_8'),
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
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4">
                {t('hero_heading')}
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-lg text-[#4B5563] leading-relaxed mb-4">
                {t('hero_desc')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="text-lg text-[#4B5563] leading-relaxed mb-6">
                {t('hero_desc2')}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6">
                <span className="text-[#0891B2] font-bold text-lg">{t('price_badge')}</span>
                <span className="text-slate-600">{t('price_unit')}</span>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="flex flex-wrap gap-3 mb-8">
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
              <EmbeddedCertifiedQuoteForm defaultDocumentType="marriage-certificate" formLocation="spousal-sponsorship" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Translation Matters for Sponsorship */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('section1_heading')}</h2>
            <p className="text-slate-600">{t('section1_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Heart className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('section1_card1_title')}</h3>
              <p className="text-sm text-slate-600">{t('section1_card1_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <FileText className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('section1_card2_title')}</h3>
              <p className="text-sm text-slate-600">{t('section1_card2_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <Users className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('section1_card3_title')}</h3>
              <p className="text-sm text-slate-600">{t('section1_card3_desc')}</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Document Checklist */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('checklist_heading')}</h2>
          <div className="max-w-2xl mx-auto">
            <Card className="p-8">
              <h3 className="font-semibold text-[#0C2340] mb-4">{t('checklist_list_heading')}</h3>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('included_heading')}</h2>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('languages_heading')}</h2>
          <p className="text-center text-slate-600 mb-8">{t('languages_desc')}</p>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {topLanguages.map((lang) => (
              <span key={lang} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">{lang}</span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-500 mt-4">{t('languages_cta')}</p>
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('pricing_heading')}</h2>
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

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('faq_heading')}</h2>
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

      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('related_heading')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">{t('related_marriage')}</Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">{t('related_birth')}</Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">{t('related_immigration')}</Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
