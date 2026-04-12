'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  Users,
  Microscope,
  Pill,
  ClipboardList,
  Stethoscope,
  Activity,
  Monitor,
  Heart,
  FlaskConical,
  BadgeCheck,
  Globe
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import ClientTestimonials from '@/components/ClientTestimonials'

// =============================================================================
// SERVICE ICON MAP
// =============================================================================

const serviceIconMap = {
  lv: ClipboardList,
  cd: Users,
  cr: Stethoscope,
  ct: FlaskConical,
  ra: Shield,
  pv: Activity,
  ecoa: Monitor,
  md: Heart,
} as const

const servicePrefixes = ['lv', 'cd', 'cr', 'ct', 'ra', 'pv', 'ecoa', 'md'] as const

const serviceIds = [
  'linguistic-validation',
  'cognitive-debriefing',
  'clinician-review',
  'clinical-trials',
  'regulatory-affairs',
  'pharmacovigilance',
  'ecoa-migration',
  'medical-devices',
] as const

const serviceHrefs = [
  '/services/lifesciences/linguistic-validation',
  '/services/lifesciences/cognitive-debriefing',
  '/services/lifesciences/clinician-review',
  '/services/lifesciences/clinical-trials',
  '/services/lifesciences/regulatory-affairs',
  '/services/lifesciences/pharmacovigilance',
  '/services/lifesciences/ecoa-migration',
  '/services/lifesciences/medical-devices',
] as const

const regulatoryKeys = ['fda', 'ema', 'hc', 'mhra', 'pmda', 'nmpa', 'swiss', 'tga'] as const

// =============================================================================
// COMPONENT
// =============================================================================

export default function LifeSciencesPageContent() {
  const [activeTab, setActiveTab] = useState('linguistic-validation')

  const t = useTranslations('lifesciences.index')

  const stats = [
    { value: t('hero_stat1_value'), label: t('hero_stat1_label') },
    { value: t('hero_stat2_value'), label: t('hero_stat2_label') },
    { value: t('hero_stat3_value'), label: t('hero_stat3_label') },
    { value: t('hero_stat4_value'), label: t('hero_stat4_label') },
  ]

  const services = servicePrefixes.map((prefix, i) => ({
    id: serviceIds[i],
    icon: serviceIconMap[prefix],
    title: t(`services_${prefix}_title`),
    description: t(`services_${prefix}_desc`),
    href: serviceHrefs[i],
    features: [
      t(`services_${prefix}_f1`),
      t(`services_${prefix}_f2`),
      t(`services_${prefix}_f3`),
      t(`services_${prefix}_f4`),
    ],
  }))

  const therapeuticAreas = Array.from({ length: 15 }, (_, i) =>
    t(`therapeutic_area_${i + 1}`)
  )

  const regulatoryAgencies = regulatoryKeys.map((key) => ({
    name: t(`regulatory_${key}`),
    country: t(`regulatory_${key}_country`),
  }))

  const complianceStandards = Array.from({ length: 7 }, (_, i) =>
    t(`compliance_std_${i + 1}`)
  )

  const faqs = Array.from({ length: 5 }, (_, i) => ({
    question: t(`faq_q${i + 1}`),
    answer: t(`faq_a${i + 1}`),
  }))

  const breadcrumbItems = [
    { name: t('hero_breadcrumb_services'), url: '/services' },
    { name: t('hero_breadcrumb_lifesciences'), url: '/services/lifesciences' },
  ]

  return (
    <>
      {/* Structured Data */}
      <ServiceJsonLd
        name={t('hero_jsonld_name')}
        description={t('hero_jsonld_desc')}
        url="https://cethos.com/services/lifesciences"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6 text-white/60" />

          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
            >
              {t('hero_eyebrow')}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6"
            >
              {t('hero_heading')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl"
            >
              {t('hero_description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link
                href="#quote-form"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                {t('hero_cta_quote')} <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> {t('hero_cta_phone')}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-6 text-sm text-white/70"
            >
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                {t('hero_badge_iso')}
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                {t('hero_badge_ispor')}
              </span>
              <span className="flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                {t('hero_badge_gcp')}
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* STATS BAR */}
      {/* ===================================================================== */}
      <section className="bg-white border-b">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-[#0891B2] mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* STICKY NAVIGATION TABS */}
      {/* ===================================================================== */}
      <section className="py-6 bg-slate-50 border-b lg:sticky lg:top-20 z-40">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {services.map((service) => (
              <a
                key={service.id}
                href={`#${service.id}`}
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === service.id
                    ? 'bg-[#0891B2] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {service.title.replace(' Services', '').replace(' Translation', '')}
              </a>
            ))}
            <a
              href="#quote-form"
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#0C2340] text-white hover:bg-[#1a3a5c] transition-colors"
            >
              {t('services_get_quote')}
            </a>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* SERVICE SECTIONS (8 sections) */}
      {/* ===================================================================== */}
      {services.map((service, index) => (
        <section
          key={service.id}
          id={service.id}
          className={`py-20 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={index % 2 === 1 ? 'lg:order-2' : ''}
              >
                <div className="w-16 h-16 rounded-2xl bg-[#0891B2]/10 flex items-center justify-center mb-6">
                  <service.icon className="w-8 h-8 text-[#0891B2]" />
                </div>
                <h2 className="text-3xl font-bold text-[#0C2340] mb-4">{service.title}</h2>
                <p className="text-lg text-slate-600 mb-6">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                >
                  {t('services_learn_more')} <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={index % 2 === 1 ? 'lg:order-1' : ''}
              >
                <div className="aspect-square max-w-[400px] mx-auto bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                  <service.icon className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
      ))}

      {/* ===================================================================== */}
      {/* TRUSTED BY LOGOS */}
      {/* ===================================================================== */}
      <ClientTestimonials />

      {/* ===================================================================== */}
      {/* THERAPEUTIC AREAS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">{t('therapeutic_heading')}</h2>
          <p className="text-white/70 text-center mb-10 max-w-2xl mx-auto">
            {t('therapeutic_description')}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {therapeuticAreas.map((area, index) => (
              <motion.span
                key={area}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="px-4 py-2 bg-white/10 rounded-full text-sm text-white border border-white/20 hover:bg-white/20 transition-colors"
              >
                {area}
              </motion.span>
            ))}
            <span className="px-4 py-2 bg-[#0891B2] text-white rounded-full text-sm font-medium">
              {t('therapeutic_overflow')}
            </span>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* REGULATORY AGENCIES */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title={t('regulatory_heading')}
            subtitle={t('regulatory_description')}
            className="mb-12"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {regulatoryAgencies.map((agency, index) => (
              <motion.div
                key={agency.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card className="p-6 text-center hover:shadow-md transition-shadow">
                  <div className="text-xl font-bold text-[#0C2340] mb-1">{agency.name}</div>
                  <div className="text-sm text-slate-500">{agency.country}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* COMPLIANCE STANDARDS */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title={t('compliance_heading')}
            subtitle={t('compliance_description')}
            className="mb-12"
          />
          <div className="flex flex-wrap justify-center gap-4">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-5 py-3 bg-white rounded-lg border border-slate-200 shadow-sm"
              >
                <BadgeCheck className="w-5 h-5 text-[#0891B2]" />
                <span className="font-medium text-[#0C2340]">{standard}</span>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* QUOTE FORM SECTION */}
      {/* ===================================================================== */}
      <section id="quote-form" className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title={t('quote_heading')}
              subtitle={t('quote_description')}
              className="mb-10"
            />
            <Card className="p-8 border-2 border-slate-100">
              <div className="text-center mb-8">
                <p className="text-slate-600">
                  {t('quote_body')}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:5876000786"
                  className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" /> {t('quote_cta_phone')}
                </a>
                <a
                  href="mailto:lifesciences@cethos.com?subject=Life Sciences Translation Quote Request"
                  className="px-8 py-4 bg-[#0C2340] text-white rounded-lg font-semibold hover:bg-[#1a3a5c] transition-colors flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" /> {t('quote_cta_email')}
                </a>
              </div>
              <p className="text-center text-sm text-slate-500 mt-6">
                {t('quote_email_prefix')} <a href="mailto:lifesciences@cethos.com" className="text-[#0891B2] hover:underline">{t('quote_email_address')}</a>
              </p>
            </Card>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* FAQ */}
      {/* ===================================================================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title={t('faq_heading')}
            subtitle={t('faq_description')}
            className="mb-12"
          />
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

      {/* ===================================================================== */}
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t('cta_heading')}
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              {t('cta_description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> {t('cta_cta_phone')}
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                {t('cta_cta_contact')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-white/60 text-sm mt-6">
              {t('cta_footer_text')}
            </p>
          </div>
        </Container>
      </section>
    </>
  )
}
