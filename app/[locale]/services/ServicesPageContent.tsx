'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Microscope,
  FileCheck,
  Globe,
  Mic,
  FileText,
  Code,
  Languages,
  Users,
  Award,
  Clock,
  Check,
  ChevronRight,
  Phone,
  MessageSquare,
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { useTranslations } from 'next-intl'

// =============================================================================
// DATA (no translations needed)
// =============================================================================

const industriesLeft = [
  'Life Sciences & Pharmaceuticals',
  'Healthcare & Medical Devices',
  'Legal & Immigration',
  'Technology & Software',
  'E-commerce & Retail',
]

const industriesRight = [
  'Financial Services',
  'Manufacturing & Engineering',
  'Marketing & Advertising',
  'Government & Public Sector',
  'Education & Training',
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function ServicesPageContent() {
  const tHero = useTranslations('services.hero')
  const tList = useTranslations('services.list')
  const tWhy = useTranslations('services.whychoose')
  const tProcess = useTranslations('services.process')
  const tLang = useTranslations('services.languages')
  const tCta = useTranslations('services.cta')

  const services = [
    { titleKey: 'lifesciences_title', descKey: 'lifesciences_desc', priceKey: 'lifesciences_price', href: '/services/lifesciences', icon: Microscope },
    { titleKey: 'certified_title', descKey: 'certified_desc', priceKey: 'certified_price', href: '/services/certified', icon: FileCheck },
    { titleKey: 'website_title', descKey: 'website_desc', priceKey: 'website_price', href: '/services/software', icon: Globe },
    { titleKey: 'interpretation_title', descKey: 'interpretation_desc', priceKey: 'interpretation_price', href: '/services/interpretation', icon: Mic },
    { titleKey: 'transcription_title', descKey: 'transcription_desc', priceKey: 'transcription_price', href: '/services/transcription', icon: FileText },
    { titleKey: 'software_title', descKey: 'software_desc', priceKey: 'lifesciences_price', href: '/services/software', icon: Code },
  ]

  const stats = [
    { valueKey: 'languages_value', labelKey: 'languages_label', descKey: 'languages_desc' },
    { valueKey: 'specialists_value', labelKey: 'specialists_label', descKey: 'specialists_desc' },
    { valueKey: 'iso_value', labelKey: 'iso_label', descKey: 'iso_desc' },
    { valueKey: 'support_value', labelKey: 'support_label', descKey: 'support_desc' },
  ]

  const steps = [
    { step: 1, titleKey: 'step1_title', descKey: 'step1_desc' },
    { step: 2, titleKey: 'step2_title', descKey: 'step2_desc' },
    { step: 3, titleKey: 'step3_title', descKey: 'step3_desc' },
  ]

  return (
    <>
      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="relative bg-[#0C2340] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">{tHero('breadcrumb_home')}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{tHero('breadcrumb_services')}</span>
          </nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {tHero('heading')}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-200 max-w-3xl"
          >
            {tHero('description')}
          </motion.p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SERVICES GRID */}
      {/* ===================================================================== */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title={tList('heading')}
            subtitle={tList('description')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block group h-full">
                  <Card className="h-full p-6 border-2 border-transparent hover:border-[#0891B2] transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-5 group-hover:bg-[#0891B2]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#0891B2]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-3 group-hover:text-[#0891B2] transition-colors">
                      {tList(service.titleKey)}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {tList(service.descKey)}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-sm font-medium text-slate-500">
                        {tList(service.priceKey)}
                      </span>
                      <span className="flex items-center gap-1 text-[#0891B2] font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
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
      {/* WHY CHOOSE CETHOS */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title={tWhy('heading')}
            subtitle={tWhy('description')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#0891B2] mb-2">{tWhy(stat.valueKey)}</div>
                <div className="text-lg font-semibold text-[#0C2340] mb-2">{tWhy(stat.labelKey)}</div>
                <p className="text-sm text-slate-600">{tWhy(stat.descKey)}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* INDUSTRIES WE SERVE */}
      {/* ===================================================================== */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title={tList('industries_heading')}
            subtitle={tList('industries_desc')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto">
            <div className="space-y-4">
              {industriesLeft.map((industry, index) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                  <span className="text-slate-700">{industry}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {industriesRight.map((industry, index) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                  <span className="text-slate-700">{industry}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW TO GET STARTED */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title={tProcess('heading')}
            subtitle={tProcess('description')}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0891B2] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0C2340] mb-3">{tProcess(item.titleKey)}</h3>
                  <p className="text-slate-600">{tProcess(item.descKey)}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200">
                    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* TRANSLATION BY LANGUAGE */}
      {/* ===================================================================== */}
      <section className="py-12 bg-white border-t border-slate-200">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0C2340] mb-3">{tLang('heading')}</h2>
            <p className="text-slate-600 mb-6">
              {tLang('description')}
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {[
                { label: 'Arabic', href: '/services/certified/arabic-translation' },
                { label: 'French', href: '/services/certified/french-translation' },
                { label: 'Hindi', href: '/services/certified/hindi-translation' },
                { label: 'Mandarin', href: '/services/certified/mandarin-translation' },
                { label: 'Punjabi', href: '/services/certified/punjabi-translation' },
                { label: 'Spanish', href: '/services/certified/spanish-translation' },
              ].map((lang) => (
                <Link
                  key={lang.href}
                  href={lang.href}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium hover:bg-[#0891B2] hover:text-white transition-colors"
                >
                  {lang.label}
                </Link>
              ))}
            </div>
            <Link href="/services/languages" className="text-[#0891B2] font-medium hover:underline text-sm">
              {tLang('view_all')}
            </Link>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* CTA SECTION */}
      {/* ===================================================================== */}
      <section className="py-20 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              {tCta('heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80 mb-8"
            >
              {tCta('description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" /> {tCta('cta_primary')}
              </Link>
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> {tCta('cta_phone')}
              </a>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
