'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Card, SectionHeading } from '@/components/ui'
import {
  MoleculeIcon,
  DocumentCheckIcon,
  BuildingIcon,
  CodeIcon,
  PlayIcon,
  GlobeNetworkIcon,
  ArrowRightIcon,
} from '@/components/icons'

const services = [
  {
    title: 'Life Sciences Translation',
    description: 'Regulatory documents, clinical trials, medical devices, and pharmaceutical content translated with precision.',
    icon: MoleculeIcon,
    href: '/services/lifesciences',
    color: 'teal',
  },
  {
    title: 'Certified Translation',
    description: 'Official documents with certified accuracy for legal, immigration, and government purposes.',
    icon: DocumentCheckIcon,
    href: '/services/certified',
    color: 'teal',
  },
  {
    title: 'Business Translation',
    description: 'Corporate communications, marketing materials, and financial documents for global markets.',
    icon: BuildingIcon,
    href: '/services/business',
    color: 'teal',
  },
  {
    title: 'Software Localization',
    description: 'UI/UX, help documentation, and software strings adapted for international users.',
    icon: CodeIcon,
    href: '/services/software',
    color: 'teal',
  },
  {
    title: 'Multimedia Translation',
    description: 'Video subtitling, voiceover, and dubbing services for global content reach.',
    icon: PlayIcon,
    href: '/services/multimedia',
    color: 'teal',
  },
  {
    title: 'Website Localization',
    description: 'Full website adaptation including content, SEO, and cultural optimization.',
    icon: GlobeNetworkIcon,
    href: '/services/website',
    color: 'teal',
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
    <section className="section-padding bg-slate-50">
      <Container>
        <SectionHeading
          title="Translation Services"
          subtitle="Comprehensive language solutions for every industry and document type. Expert linguists, rigorous quality assurance, and fast turnaround."
          className="mb-16"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <Link href={service.href} className="block h-full group">
                <Card hover className="h-full flex flex-col">
                  <div className="icon-container-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={32} />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 flex-grow">{service.description}</p>
                  <div className="flex items-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all">
                    <span>Learn More</span>
                    <ArrowRightIcon size={16} />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
