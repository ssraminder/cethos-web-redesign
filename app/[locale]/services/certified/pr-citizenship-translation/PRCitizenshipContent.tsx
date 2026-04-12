'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone, CheckCircle, Package, Star, Shield, Users, Clock, Award, BadgeCheck } from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { TrustBar, StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'
import { useTranslations } from 'next-intl'

export default function PRCitizenshipContent() {
  const t = useTranslations('certified.pr-citizenship')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: 'PR & Citizenship Translation', url: '/services/certified/pr-citizenship-translation' },
  ]

  const packages = [
    { name: t('pkg1_name'), price: t('pkg1_price'), documents: [t('pkg1_doc1'), t('pkg1_doc2')], popular: false },
    { name: t('pkg2_name'), price: t('pkg2_price'), documents: [t('pkg2_doc1'), t('pkg2_doc2'), t('pkg2_doc3')], popular: true },
    { name: t('pkg3_name'), price: t('pkg3_price'), documents: [t('pkg3_doc1'), t('pkg3_doc2'), t('pkg3_doc3'), t('pkg3_doc4'), t('pkg3_doc5')], popular: false },
    { name: t('pkg4_name'), price: t('pkg4_price'), documents: [t('pkg4_doc1'), t('pkg4_doc2')], popular: false },
  ]

  const includedFeatures = [
    t('feature_1'), t('feature_2'), t('feature_3'), t('feature_4'),
    t('feature_5'), t('feature_6'), t('feature_7'), t('feature_8'),
  ]

  const applicationTypes = [
    { title: t('apptype1_title'), description: t('apptype1_desc') },
    { title: t('apptype2_title'), description: t('apptype2_desc') },
    { title: t('apptype3_title'), description: t('apptype3_desc') },
    { title: t('apptype4_title'), description: t('apptype4_desc') },
    { title: t('apptype5_title'), description: t('apptype5_desc') },
    { title: t('apptype6_title'), description: t('apptype6_desc') },
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
              <EmbeddedCertifiedQuoteForm formLocation="pr-citizenship-translation" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('packages_heading')}</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">{t('packages_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <motion.div key={pkg.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="relative">
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-teal-600 text-white text-xs font-semibold rounded-full">
                    {t('most_popular')}
                  </div>
                )}
                <Card className={`h-full p-6 ${pkg.popular ? 'border-2 border-teal-600 ring-2 ring-teal-100' : ''}`}>
                  <h3 className="font-bold text-[#0C2340] mb-2">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-teal-600 mb-4">{pkg.price}</div>
                  <ul className="space-y-2 mb-6">
                    {pkg.documents.map((doc, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                  <Link href="#quote-form" className={`block w-full py-2 rounded-lg font-medium text-center transition-colors ${pkg.popular ? 'bg-teal-600 text-white hover:bg-teal-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {t('select_package')}
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* What's Included */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('included_heading')}</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {includedFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Application Types */}
      <section className="py-16 bg-white">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-4">{t('apptypes_heading')}</h2>
          <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">{t('apptypes_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {applicationTypes.map((type, index) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.05 }}>
                <Card className="p-4">
                  <h3 className="font-semibold text-[#0C2340] mb-1">{type.title}</h3>
                  <p className="text-sm text-slate-600">{type.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Packages */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">{t('whypkg_heading')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4"><Package className="w-7 h-7 text-teal-400" /></div>
              <h3 className="font-semibold text-white mb-2">{t('whypkg1_title')}</h3>
              <p className="text-white/70 text-sm">{t('whypkg1_desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4"><Users className="w-7 h-7 text-teal-400" /></div>
              <h3 className="font-semibold text-white mb-2">{t('whypkg2_title')}</h3>
              <p className="text-white/70 text-sm">{t('whypkg2_desc')}</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-4"><Shield className="w-7 h-7 text-teal-400" /></div>
              <h3 className="font-semibold text-white mb-2">{t('whypkg3_title')}</h3>
              <p className="text-white/70 text-sm">{t('whypkg3_desc')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
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

      {/* Related Links */}
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
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">{t('related_immigration')}</Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
