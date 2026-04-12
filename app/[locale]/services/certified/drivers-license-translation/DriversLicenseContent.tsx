'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Clock,
  Award,
  Star,
  BadgeCheck,
  Upload,
  FileText,
  Download,
  DollarSign,
  Car,
  CreditCard,
  Building2
} from 'lucide-react'
import { Container, Card } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd } from '@/components/JsonLd'
import { StickyMobileCTA, LandingLocalBusinessJsonLd } from '@/components/landing'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'
import { useTranslations } from 'next-intl'

export default function DriversLicenseContent() {
  const t = useTranslations('certified.drivers')

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: 'Certified Translation', url: '/services/certified' },
    { name: "Driver's License Translation", url: '/services/certified/drivers-license-translation' },
  ]

  const scrollToForm = () => {
    document.getElementById('quote-form')?.scrollIntoView({ behavior: 'smooth' })
  }

  const whyChooseUs = [
    { icon: Shield, title: t('why1_title'), description: t('why1_desc') },
    { icon: Clock, title: t('why2_title'), description: t('why2_desc') },
    { icon: Award, title: t('why3_title'), description: t('why3_desc') },
    { icon: DollarSign, title: t('why4_title'), description: t('why4_desc') },
  ]

  const driversLicenseDocuments = [
    t('dl_doc_1'), t('dl_doc_2'), t('dl_doc_3'), t('dl_doc_4'), t('dl_doc_5'),
  ]

  const vehicleDocuments = [
    t('veh_doc_1'), t('veh_doc_2'), t('veh_doc_3'), t('veh_doc_4'), t('veh_doc_5'),
  ]

  const acceptedByLocations = [
    { name: t('accepted_1'), icon: Building2 },
    { name: t('accepted_2'), icon: Building2 },
    { name: t('accepted_3'), icon: Car },
    { name: t('accepted_4'), icon: Building2 },
    { name: t('accepted_5'), icon: CreditCard },
  ]

  const howItWorks = [
    { step: 1, icon: Upload, title: t('step1_title'), description: t('step1_desc') },
    { step: 2, icon: FileText, title: t('step2_title'), description: t('step2_desc') },
    { step: 3, icon: Shield, title: t('step3_title'), description: t('step3_desc') },
    { step: 4, icon: Download, title: t('step4_title'), description: t('step4_desc') },
  ]

  const pricingTable = [
    { service: t('pricing_service_1'), price: t('pricing_price_1'), turnaround: t('pricing_turn_1') },
    { service: t('pricing_service_2'), price: t('pricing_price_2'), turnaround: t('pricing_turn_2') },
    { service: t('pricing_service_3'), price: t('pricing_price_3'), turnaround: t('pricing_turn_3') },
    { service: t('pricing_service_4'), price: t('pricing_price_4'), turnaround: t('pricing_turn_4') },
    { service: t('pricing_service_5'), price: t('pricing_price_5'), turnaround: t('pricing_turn_5') },
    { service: t('pricing_service_6'), price: t('pricing_price_6'), turnaround: t('pricing_turn_6') },
    { service: t('pricing_service_7'), price: t('pricing_price_7'), turnaround: t('pricing_turn_7') },
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

      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0891B2]/10 rounded-full mb-4"
              >
                <BadgeCheck className="w-4 h-4 text-[#0891B2]" />
                <span className="text-sm font-semibold text-[#0891B2]">{t('hero_badge')}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-4"
              >
                {t('hero_heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                {t('hero_desc')}
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
                <button
                  onClick={scrollToForm}
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  {t('cta_get_translation')}
                </button>
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    {t('trust_gov')}
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#0891B2]" />
                    {t('trust_guarantee')}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    {t('trust_reviews')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    {t('trust_sameday')}
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
              <EmbeddedCertifiedQuoteForm
                defaultDocumentType="drivers-license"
                formLocation="drivers-license-translation"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('why_heading')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">{t('why_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* DOCUMENTS WE TRANSLATE */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('docs_heading')}</h2>
            <p className="text-slate-600">{t('docs_desc')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340]">{t('docs_dl_title')}</h3>
                </div>
                <ul className="space-y-3">
                  {driversLicenseDocuments.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full p-6">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                  <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340]">{t('docs_veh_title')}</h3>
                </div>
                <ul className="space-y-3">
                  {vehicleDocuments.map((item, i) => (
                    <li key={i} className="text-slate-600 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ACCEPTED BY */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('accepted_heading')}</h2>
            <p className="text-slate-600">{t('accepted_desc')}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto mb-8">
            {acceptedByLocations.map((location, index) => (
              <motion.div
                key={location.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg"
              >
                <location.icon className="w-5 h-5 text-[#0891B2]" />
                <span className="font-medium text-[#0C2340]">{location.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-sm max-w-2xl mx-auto">{t('accepted_footer')}</p>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t('how_heading')}</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">{t('how_desc')}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-[#0891B2]/30" />
                )}
                <div className="w-14 h-14 rounded-full bg-[#0891B2] text-white flex items-center justify-center mx-auto mb-4 relative z-10">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* PRICING */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{t('pricing_heading')}</h2>
            <p className="text-slate-600">{t('pricing_desc')}</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{t('pricing_col_doc')}</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#0C2340]">{t('pricing_col_price')}</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-[#0C2340]">{t('pricing_col_turn')}</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingTable.map((row, index) => (
                    <tr key={index} className={index > 0 ? 'border-t border-slate-200' : ''}>
                      <td className="px-6 py-4 text-slate-700">{row.service}</td>
                      <td className="px-6 py-4 text-center font-semibold text-[#0891B2]">{row.price}</td>
                      <td className="px-6 py-4 text-right text-slate-600 text-sm">{row.turnaround}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <p className="text-center text-sm text-slate-500 mt-4">{t('pricing_footer')}</p>
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-slate-50">
        <Container>
          <h2 className="text-3xl font-bold text-[#0C2340] text-center mb-12">{t('faq_heading')}</h2>
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

      {/* FINAL CTA */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{t('cta_heading')}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">{t('cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={scrollToForm}
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
              >
                {t('cta_start')}
              </button>
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-transparent text-white border-2 border-white rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-white/70 text-sm">
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4" />
                {t('trust_gov')}
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {t('trust_guarantee')}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t('trust_sameday')}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* SERVING ACROSS CANADA */}
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

      {/* RELATED LINKS */}
      <section className="py-12 bg-white border-t">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{t('related_heading')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified/immigration-translation-services" className="text-[#0891B2] hover:underline">
              {t('related_immigration')}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/birth-certificate-translation" className="text-[#0891B2] hover:underline">
              {t('related_birth')}
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/services/certified/pr-citizenship-translation" className="text-[#0891B2] hover:underline">
              {t('related_pr')}
            </Link>
          </div>
        </Container>
      </section>

      <StickyMobileCTA />
    </>
  )
}
