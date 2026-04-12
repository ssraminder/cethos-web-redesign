'use client'

import { motion } from 'framer-motion'
import { Container, SectionHeading } from '@/components/ui'
import {
  MoleculeIcon,
  ScaleIcon,
  CodeIcon,
  BankIcon,
  GamepadIcon,
  ShoppingCartIcon,
} from '@/components/icons'
import { useTranslations } from 'next-intl'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

export function Industries() {
  const t = useTranslations('homepage.industries')

  const industries = [
    { nameKey: 'pharma_title', descKey: 'pharma_desc', icon: MoleculeIcon },
    { nameKey: 'legal_title', descKey: 'legal_desc', icon: ScaleIcon },
    { nameKey: 'tech_title', descKey: 'tech_desc', icon: CodeIcon },
    { nameKey: 'finance_title', descKey: 'finance_desc', icon: BankIcon },
    { nameKey: 'gaming_title', descKey: 'gaming_desc', icon: GamepadIcon },
    { nameKey: 'ecommerce_title', descKey: 'ecommerce_desc', icon: ShoppingCartIcon },
  ]

  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          title={t('heading')}
          subtitle={t('description')}
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.nameKey}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-soft transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-300">
                  <industry.icon size={32} />
                </div>
                <h3 className="font-semibold text-navy mb-2">{t(industry.nameKey)}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{t(industry.descKey)}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
