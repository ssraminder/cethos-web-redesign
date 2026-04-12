'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { ArrowRight, Phone, CheckCircle, MapPin, Mail, Truck, Clock, Globe, Shield, Star, BadgeCheck, Award } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

export default function EdmontonTranslationContent() {
  const t = useTranslations('certified.edmonton')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: 'Edmonton Translation', url: '/services/certified/edmonton-translation-agency' },
  ]

  const serviceAreas = [
    t('areas.area1'), t('areas.area2'), t('areas.area3'), t('areas.area4'),
    t('areas.area5'), t('areas.area6'), t('areas.area7'), t('areas.area8'),
    t('areas.area9'), t('areas.area10'), t('areas.area11'), t('areas.area12'),
  ]

  const deliveryOptions = [
    { method: t('delivery.option1_method'), price: t('delivery.option1_price'), description: t('delivery.option1_desc') },
    { method: t('delivery.option2_method'), price: t('delivery.option2_price'), description: t('delivery.option2_desc') },
    { method: t('delivery.option3_method'), price: t('delivery.option3_price'), description: t('delivery.option3_desc') },
  ]

  const howItWorks = [
    { step: 1, title: t('steps.step1_title'), description: t('steps.step1_desc') },
    { step: 2, title: t('steps.step2_title'), description: t('steps.step2_desc') },
    { step: 3, title: t('steps.step3_title'), description: t('steps.step3_desc') },
    { step: 4, title: t('steps.step4_title'), description: t('steps.step4_desc') },
  ]

  const documents = [
    t('documents.doc1'), t('documents.doc2'), t('documents.doc3'), t('documents.doc4'),
    t('documents.doc5'), t('documents.doc6'), t('documents.doc7'), t('documents.doc8'),
    t('documents.doc9'), t('documents.doc10'),
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
                {t('hero.title')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                {t('hero.subtitle2')}
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">{t('hero.price_from')}</span>
                <span className="text-slate-600">{t('hero.per_document')}</span>
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
                  {t('hero.email_us')}
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
                    {t('hero.badge_ircc')}
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                    {t('hero.badge_gov')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    {t('hero.badge_sameday')}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0891B2]" />
                    {t('hero.badge_notarization')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    {t('hero.badge_reviews')}
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
              <EmbeddedCertifiedQuoteForm formLocation="edmonton-translation-agency" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Remote Service Works */}
      <section className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('remote.title')}</h2>
            <p className="text-slate-600">{t('remote.description')}</p>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('delivery.title')}</h2>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('areas.title')}</h2>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto">{t('areas.subtitle')}</p>
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
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t('documents.title')}</h2>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">{t('documents.subtitle')}</p>
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
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('why.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="p-6 text-center">
              <Clock className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card1_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card1_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <Globe className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card2_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card2_desc')}</p>
            </Card>
            <Card className="p-6 text-center">
              <Shield className="w-10 h-10 text-teal-600 mx-auto mb-4" />
              <h3 className="font-semibold text-[#0C2340] mb-2">{t('why.card3_title')}</h3>
              <p className="text-sm text-slate-600">{t('why.card3_desc')}</p>
            </Card>
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
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t('cta.title')}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
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
                {t('cta.email_quote')}
              </a>
            </div>
            <p className="text-white/60 text-sm mt-6">{t('cta.tagline')}</p>
          </div>
        </Container>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('related.title')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              {t('related.immigration')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              {t('related.birth')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/marriage-certificate-translation" className="text-[#0891B2] hover:underline">
              {t('related.marriage')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/certified/academic-transcript-translation" className="text-[#0891B2] hover:underline">
              {t('related.academic')}
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
