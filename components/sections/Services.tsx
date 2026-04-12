'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FlaskConical,
  FileCheck,
  Building2,
  Code2,
  Play,
  Globe,
  Mic,
  Languages,
  ArrowRight,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function Services() {
  const t = useTranslations('homepage.services')

  const services = [
    { titleKey: 'lifesciences_title', descKey: 'lifesciences_desc', icon: FlaskConical, href: '/services/lifesciences' },
    { titleKey: 'certified_title', descKey: 'certified_desc', icon: FileCheck, href: '/services/certified' },
    { titleKey: 'interpretation_title', descKey: 'interpretation_desc', icon: Mic, href: '/services/interpretation' },
    { titleKey: 'languages_title', descKey: 'languages_desc', icon: Languages, href: '/services/languages' },
    { titleKey: 'business_title', descKey: 'business_desc', icon: Building2, href: '/services/business' },
    { titleKey: 'software_title', descKey: 'software_desc', icon: Code2, href: '/services/software' },
    { titleKey: 'multimedia_title', descKey: 'multimedia_desc', icon: Play, href: '/services/multimedia' },
    { titleKey: 'website_title', descKey: 'website_desc', icon: Globe, href: '/services/website' },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0C2340] leading-tight mb-4">
            {t('heading')}
          </h2>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div key={service.titleKey} variants={itemVariants}>
                <Link href={service.href} className="block h-full group">
                  <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Icon */}
                    <div className="w-12 h-12 text-[#0891B2] mb-6">
                      <Icon className="w-12 h-12" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                      {t(service.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="text-[#4B5563] mb-6 flex-grow">
                      {t(service.descKey)}
                    </p>

                    {/* Learn More link */}
                    <div className="flex items-center gap-1 text-sm text-[#0891B2] font-medium group-hover:gap-2 transition-all">
                      <span>{t('learn_more')}</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
