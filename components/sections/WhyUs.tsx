'use client'

import { motion } from 'framer-motion'
import { Container, SectionHeading } from '@/components/ui'
import { ShieldCheckIcon, ClockIcon, UsersIcon, CheckIcon } from '@/components/icons'
import { useTranslations } from 'next-intl'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function WhyUs() {
  const t = useTranslations('homepage.whyus')

  const features = [
    {
      titleKey: 'qa_title',
      descKey: 'qa_desc',
      icon: ShieldCheckIcon,
      highlightKeys: ['qa_highlight1', 'qa_highlight2', 'qa_highlight3', 'qa_highlight4'],
    },
    {
      titleKey: 'speed_title',
      descKey: 'speed_desc',
      icon: ClockIcon,
      highlightKeys: ['speed_highlight1', 'speed_highlight2', 'speed_highlight3', 'speed_highlight4'],
    },
    {
      titleKey: 'experts_title',
      descKey: 'experts_desc',
      icon: UsersIcon,
      highlightKeys: ['experts_highlight1', 'experts_highlight2', 'experts_highlight3', 'experts_highlight4'],
    },
  ]

  return (
    <section className="section-padding bg-slate-50">
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
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.titleKey}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="icon-container-lg mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-4">{t(feature.titleKey)}</h3>
              <p className="text-slate-600 mb-6">{t(feature.descKey)}</p>
              <ul className="space-y-3">
                {feature.highlightKeys.map((key) => (
                  <li key={key} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={12} className="text-teal-600" />
                    </div>
                    <span className="text-slate-700">{t(key)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
