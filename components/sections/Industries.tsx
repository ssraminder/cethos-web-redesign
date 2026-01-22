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

const industries = [
  {
    name: 'Pharmaceutical',
    description: 'Clinical trials, regulatory submissions, and medical documentation.',
    icon: MoleculeIcon,
  },
  {
    name: 'Legal',
    description: 'Contracts, court documents, patents, and legal proceedings.',
    icon: ScaleIcon,
  },
  {
    name: 'Technology',
    description: 'Software, hardware documentation, and technical manuals.',
    icon: CodeIcon,
  },
  {
    name: 'Finance',
    description: 'Banking, insurance, investment, and financial reports.',
    icon: BankIcon,
  },
  {
    name: 'Gaming',
    description: 'Video games, mobile apps, and interactive entertainment.',
    icon: GamepadIcon,
  },
  {
    name: 'E-commerce',
    description: 'Product listings, customer support, and marketing content.',
    icon: ShoppingCartIcon,
  },
]

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
  return (
    <section className="section-padding">
      <Container>
        <SectionHeading
          title="Industries We Serve"
          subtitle="Specialized translation services tailored to the unique terminology and requirements of your industry."
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
              key={industry.name}
              variants={itemVariants}
              className="group cursor-pointer"
            >
              <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-slate-100 hover:border-teal-200 hover:shadow-soft transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 mb-4 group-hover:scale-110 group-hover:bg-teal-100 transition-all duration-300">
                  <industry.icon size={32} />
                </div>
                <h3 className="font-semibold text-navy mb-2">{industry.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{industry.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
