'use client'

import { motion } from 'framer-motion'
import { Container, SectionHeading } from '@/components/ui'
import { ShieldCheckIcon, ClockIcon, UsersIcon, CheckIcon } from '@/components/icons'

const features = [
  {
    title: 'Quality Assurance',
    description: 'ISO 17100 and ISO 9001 certified processes ensure every translation meets the highest standards. Our multi-step QA process includes translation, editing, and proofreading.',
    icon: ShieldCheckIcon,
    highlights: [
      'ISO 17100 & ISO 9001 Certified',
      'Native-speaking linguists only',
      'Subject matter experts',
      'Multi-step review process',
    ],
  },
  {
    title: 'Fast Turnaround',
    description: 'Meet your deadlines with our efficient workflows and global team. Rush services available for urgent projects without compromising quality.',
    icon: ClockIcon,
    highlights: [
      '24/7 project support',
      'Rush delivery available',
      'Real-time project tracking',
      'Scalable capacity',
    ],
  },
  {
    title: 'Subject Matter Experts',
    description: 'Our translators are specialists in their fields. From medical professionals to legal experts, we match the right linguist to your content.',
    icon: UsersIcon,
    highlights: [
      '5,000+ specialized linguists',
      'Industry-specific expertise',
      'Continuous training',
      'Terminology management',
    ],
  },
]

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
  return (
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading
          title="Why Choose Cethos"
          subtitle="We combine industry expertise, advanced technology, and rigorous quality processes to deliver translations you can trust."
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
              key={feature.title}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-soft hover:shadow-medium transition-shadow duration-300"
            >
              <div className="icon-container-lg mb-6">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-semibold text-navy mb-4">{feature.title}</h3>
              <p className="text-slate-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-center gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <CheckIcon size={12} className="text-teal-600" />
                    </div>
                    <span className="text-slate-700">{highlight}</span>
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
