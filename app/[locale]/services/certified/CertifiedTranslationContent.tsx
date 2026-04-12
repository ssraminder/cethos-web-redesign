'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import {
  ArrowRight,
  Phone,
  Mail,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  GraduationCap,
  Heart,
  Users,
  Scale,
  Globe,
  BadgeCheck,
  Star,
  Building,
  Languages,
  Car,
} from 'lucide-react'

import { Container, Card, SectionHeading } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { EmbeddedCertifiedQuoteForm } from '@/components/forms/EmbeddedCertifiedQuoteForm'

// =============================================================================
// STATIC DATA (no translations needed)
// =============================================================================

const languages = [
  'Punjabi',
  'Hindi',
  'Urdu',
  'Gujarati',
  'Tamil',
  'Arabic',
  'Farsi',
  'Dari',
  'Pashto',
  'Mandarin',
  'Cantonese',
  'Vietnamese',
  'Korean',
  'Japanese',
  'Tagalog',
  'Spanish',
  'Portuguese',
  'French',
  'Italian',
  'German',
  'Russian',
  'Ukrainian',
  'Polish',
  'Romanian',
  'Amharic',
  'Tigrinya',
  'Somali',
  'Swahili',
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function CertifiedTranslationContent() {
  const tHero = useTranslations('certified.hero')
  const tServices = useTranslations('certified.services')
  const tFeatures = useTranslations('certified.features')
  const tStats = useTranslations('certified.stats')
  const tDocs = useTranslations('certified.documents')
  const tLangs = useTranslations('certified.languages')
  const tProcess = useTranslations('certified.process')
  const tFaq = useTranslations('certified.faq')
  const tCta = useTranslations('certified.cta')

  // Data arrays that use translations — defined inside the component
  const specializedServices = [
    {
      icon: Car,
      titleKey: 'drivers_title' as const,
      descKey: 'drivers_desc' as const,
      priceKey: 'drivers_price' as const,
      href: '/services/certified/drivers-license-translation',
      popular: true,
    },
    {
      icon: Users,
      titleKey: 'immigration_title' as const,
      descKey: 'immigration_desc' as const,
      priceKey: 'immigration_price' as const,
      href: '/services/certified/immigration-translation-services',
      popular: true,
    },
    {
      icon: FileText,
      titleKey: 'birth_title' as const,
      descKey: 'birth_desc' as const,
      priceKey: 'birth_price' as const,
      href: '/services/certified/birth-certificate-translation',
      popular: false,
    },
    {
      icon: Heart,
      titleKey: 'marriage_title' as const,
      descKey: 'marriage_desc' as const,
      priceKey: 'marriage_price' as const,
      href: '/services/certified/marriage-certificate-translation',
      popular: false,
    },
    {
      icon: GraduationCap,
      titleKey: 'academic_title' as const,
      descKey: 'academic_desc' as const,
      priceKey: 'academic_price' as const,
      href: '/services/certified/academic-transcript-translation',
      popular: false,
    },
    {
      icon: Award,
      titleKey: 'pr_title' as const,
      descKey: 'pr_desc' as const,
      priceKey: 'pr_price' as const,
      href: '/services/certified/pr-citizenship-translation',
      popular: true,
    },
  ]

  const features = [
    {
      icon: Shield,
      titleKey: 'ircc_title' as const,
      descKey: 'ircc_desc' as const,
    },
    {
      icon: BadgeCheck,
      titleKey: 'gov_title' as const,
      descKey: 'gov_desc' as const,
    },
    {
      icon: Clock,
      titleKey: 'sameday_title' as const,
      descKey: 'sameday_desc' as const,
    },
    {
      icon: Award,
      titleKey: 'notary_title' as const,
      descKey: 'notary_desc' as const,
    },
  ]

  const documentCategories = [
    {
      titleKey: 'personal_title' as const,
      icon: FileText,
      items: ['personal_1', 'personal_2', 'personal_3', 'personal_4', 'personal_5', 'personal_6'] as const,
    },
    {
      titleKey: 'academic_title' as const,
      icon: GraduationCap,
      items: ['academic_1', 'academic_2', 'academic_3', 'academic_4', 'academic_5', 'academic_6'] as const,
    },
    {
      titleKey: 'legal_title' as const,
      icon: Scale,
      items: ['legal_1', 'legal_2', 'legal_3', 'legal_4', 'legal_5', 'legal_6'] as const,
    },
    {
      titleKey: 'immigration_title' as const,
      icon: Globe,
      items: ['immigration_1', 'immigration_2', 'immigration_3', 'immigration_4', 'immigration_5', 'immigration_6'] as const,
    },
  ]

  const processSteps = [
    { step: 1, titleKey: 'step1_title' as const, descKey: 'step1_desc' as const },
    { step: 2, titleKey: 'step2_title' as const, descKey: 'step2_desc' as const },
    { step: 3, titleKey: 'step3_title' as const, descKey: 'step3_desc' as const },
    { step: 4, titleKey: 'step4_title' as const, descKey: 'step4_desc' as const },
  ]

  const stats = [
    { valueKey: 'reviews_value' as const, labelKey: 'reviews_label' as const, icon: Star },
    { valueKey: 'languages_value' as const, labelKey: 'languages_label' as const, icon: Languages },
    { valueKey: 'experience_value' as const, labelKey: 'experience_label' as const, icon: Building },
    { valueKey: 'documents_value' as const, labelKey: 'documents_label' as const, icon: FileText },
  ]

  const faqs = Array.from({ length: 10 }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const breadcrumbItems = [
    { name: tHero('breadcrumb_services'), url: '/services' },
    { name: tHero('breadcrumb_certified'), url: '/services/certified' },
  ]

  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name={tHero('jsonld_name')}
        description={tHero('jsonld_desc')}
        url="https://cethos.com/services/certified"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      {/* LocalBusiness schema rendered only on /locations/calgary — not on this national service page */}

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Column */}
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
              >
                {tHero('eyebrow')}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-6"
              >
                {tHero('heading')}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-4"
              >
                {tHero('description1')}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="text-lg text-[#4B5563] leading-relaxed mb-6"
              >
                {tHero('description2')}
              </motion.p>

              {/* Price Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#0891B2]/10 rounded-full mb-6"
              >
                <span className="text-[#0891B2] font-bold text-lg">{tHero('price_value')}</span>
                <span className="text-slate-600">{tHero('price_label')}</span>
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <a
                  href="tel:5876000786"
                  className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> {tHero('cta_phone')}
                </a>

                <a
                  href="mailto:info@cethos.com?subject=Certified Translation Quote"
                  className="px-6 py-3 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" /> {tHero('cta_email')}
                </a>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-3"
              >
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0891B2]" />
                    {tHero('trust_ircc')}
                  </span>
                  <span className="flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                    {tHero('trust_gov')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    {tHero('trust_sameday')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#0891B2]" />
                    {tHero('trust_notary')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    {tHero('trust_reviews')}
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
              <EmbeddedCertifiedQuoteForm formLocation="certified-translation-main" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* STATS BAR */}
      {/* ===================================================================== */}
      <section className="bg-[#0C2340] py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-6 h-6 text-[#0891B2]" />
                  <span className="text-3xl font-bold text-white">{tStats(stat.valueKey)}</span>
                </div>
                <div className="text-sm text-white/70">{tStats(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FEATURES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6 hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-[#0891B2]" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{tFeatures(feature.titleKey)}</h3>
                  <p className="text-sm text-slate-600">{tFeatures(feature.descKey)}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* SPECIALIZED SERVICES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title={tServices('heading')}
            subtitle={tServices('description')}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card hover className="h-full p-6 group relative">
                    {service.popular && (
                      <div className="absolute -top-3 right-4 px-3 py-1 bg-[#0891B2] text-white text-xs font-semibold rounded-full">
                        {tServices('badge_popular')}
                      </div>
                    )}

                    <div className="w-12 h-12 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2] transition-colors">
                      <service.icon className="w-6 h-6 text-[#0891B2] group-hover:text-white transition-colors" />
                    </div>

                    <h3 className="font-semibold text-[#0C2340] mb-2 group-hover:text-[#0891B2] transition-colors">
                      {tServices(service.titleKey)}
                    </h3>

                    <p className="text-sm text-slate-600 mb-4">{tServices(service.descKey)}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#0891B2]">{tServices(service.priceKey)}</span>
                      <span className="flex items-center gap-1 text-sm text-[#0891B2] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        {tServices('learn_more')} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* DOCUMENT CATEGORIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title={tDocs('heading')}
            subtitle={tDocs('description')}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <motion.div
                key={category.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-200">
                    <div className="w-10 h-10 rounded-lg bg-[#0891B2]/10 flex items-center justify-center">
                      <category.icon className="w-5 h-5 text-[#0891B2]" />
                    </div>
                    <h3 className="font-semibold text-[#0C2340]">{tDocs(category.titleKey)}</h3>
                  </div>

                  <ul className="space-y-2">
                    {category.items.map((itemKey, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                        {tDocs(itemKey)}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* LANGUAGES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title={tLangs('heading')}
            subtitle={tLangs('description')}
            className="mb-12"
          />

          <div className="flex flex-wrap justify-center gap-3">
            {languages.map((lang, index) => (
              <motion.span
                key={lang}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#0C2340] border border-slate-200 hover:border-[#0891B2] hover:text-[#0891B2] transition-colors"
              >
                {lang}
              </motion.span>
            ))}
            <span className="px-4 py-2 bg-[#0891B2] text-white rounded-full text-sm font-medium">
              {tLangs('overflow')}
            </span>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW IT WORKS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">{tProcess('heading')}</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            {tProcess('description')}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[60%] w-[80%] h-0.5 bg-[#0891B2]/30" />
                )}

                <div className="w-14 h-14 rounded-full bg-[#0891B2] text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold relative z-10">
                  {item.step}
                </div>

                <h3 className="font-semibold text-white mb-2">{tProcess(item.titleKey)}</h3>
                <p className="text-white/70 text-sm">{tProcess(item.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title={tFaq('heading')}
            subtitle={tFaq('description')}
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-4">
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

      {/* ===================================================================== */}
      {/* POPULAR LANGUAGE SERVICES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title={tLangs('popular_heading')}
            subtitle={tLangs('popular_desc')}
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Arabic Translation', href: '/services/certified/arabic-translation' },
              { label: 'French Translation', href: '/services/certified/french-translation' },
              { label: 'Hindi Translation', href: '/services/certified/hindi-translation' },
              { label: 'Mandarin (Chinese) Translation', href: '/services/certified/mandarin-translation' },
              { label: 'Punjabi Translation', href: '/services/certified/punjabi-translation' },
              { label: 'Spanish Translation', href: '/services/certified/spanish-translation' },
            ].map((lang) => (
              <Link
                key={lang.href}
                href={lang.href}
                className="bg-slate-100 px-5 py-3 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors"
              >
                {lang.label}
              </Link>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/services/languages" className="text-[#0891B2] font-medium hover:underline">
              {tLangs('view_all')}
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* RELATED SERVICES */}
      {/* ===================================================================== */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link href="/services/interpretation" className="text-[#0891B2] font-medium hover:underline">
              {tCta('related_interpreter')}
            </Link>
            <span className="text-slate-300 hidden md:inline">|</span>
            <Link href="/contact" className="text-[#0891B2] font-medium hover:underline">
              {tCta('related_office')}
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* SERVING ACROSS CANADA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title={tCta('canada_heading')}
            subtitle={tCta('canada_desc')}
            className="mb-12"
          />

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

      {/* ===================================================================== */}
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">{tCta('heading')}</h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {tCta('description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> {tCta('cta_phone')}
              </a>

              <a
                href="mailto:info@cethos.com?subject=Certified Translation Quote"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Mail className="w-5 h-5" /> {tCta('cta_email')}
              </a>
            </div>

            <p className="text-white/60 text-sm mt-6">
              {tCta('footer_text')}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
