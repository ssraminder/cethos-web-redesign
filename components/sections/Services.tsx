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
  ArrowRight,
} from 'lucide-react'

const services = [
  {
    title: 'Life Sciences Translation',
    description: 'Regulatory documents, clinical trials, medical devices, and pharmaceutical content translated with precision.',
    icon: FlaskConical,
    href: '/services/lifesciences',
  },
  {
    title: 'Certified Translation',
    description: 'Official documents with certified accuracy for legal, immigration, and government purposes.',
    icon: FileCheck,
    href: '/services/certified',
  },
  {
    title: 'Business Translation',
    description: 'Corporate communications, marketing materials, and financial documents for global markets.',
    icon: Building2,
    href: '/services/business',
  },
  {
    title: 'Software Localization',
    description: 'UI/UX, help documentation, and software strings adapted for international users.',
    icon: Code2,
    href: '/services/software',
  },
  {
    title: 'Multimedia Translation',
    description: 'Video subtitling, voiceover, and dubbing services for global content reach.',
    icon: Play,
    href: '/services/multimedia',
  },
  {
    title: 'Website Localization',
    description: 'Full website adaptation including content, SEO, and cultural optimization.',
    icon: Globe,
    href: '/services/website',
  },
]

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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
            Our Services
          </p>
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#0C2340] leading-tight mb-4">
            Translation Services
          </h2>
          <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
            Comprehensive language solutions for every industry and document type.
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
              <motion.div key={service.title} variants={itemVariants}>
                <Link href={service.href} className="block h-full group">
                  <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col cursor-pointer">
                    {/* Icon */}
                    <div className="w-12 h-12 text-[#0891B2] mb-6">
                      <Icon className="w-12 h-12" strokeWidth={1.5} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[#4B5563] mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Learn More link */}
                    <div className="flex items-center gap-1 text-sm text-[#0891B2] font-medium group-hover:gap-2 transition-all">
                      <span>Learn More</span>
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
