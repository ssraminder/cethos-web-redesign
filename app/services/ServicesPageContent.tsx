'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Card, SectionHeading } from '@/components/ui'
import {
  ArrowRightIcon,
  MoleculeIcon,
  DocumentCheckIcon,
  BuildingIcon,
  CodeIcon,
  PlayIcon,
  MicrophoneIcon,
} from '@/components/icons'
import { CTA } from '@/components/sections'
import { servicesList, type IconName } from '@/lib/services-data'

const iconMap: Record<IconName, React.ComponentType<{ size?: number; className?: string }>> = {
  molecule: MoleculeIcon,
  'document-check': DocumentCheckIcon,
  building: BuildingIcon,
  code: CodeIcon,
  play: PlayIcon,
  microphone: MicrophoneIcon,
}

export default function ServicesPageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-hero-mesh">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-600/15 rounded-full blur-[80px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80"
            >
              Comprehensive translation and localization solutions for every industry and content type.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesList.map((service, index) => {
              const Icon = iconMap[service.iconName]
              return (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/services/${service.slug}`} className="block group">
                    <Card hover className="h-full">
                      <div className="flex items-start gap-6">
                        <div className="icon-container-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={32} />
                        </div>
                        <div className="flex-grow">
                          <h2 className="text-xl font-semibold text-navy mb-3 group-hover:text-teal-600 transition-colors">
                            {service.title}
                          </h2>
                          <p className="text-slate-600 mb-4">{service.description}</p>
                          <div className="flex items-center gap-2 text-teal-600 font-medium group-hover:gap-3 transition-all">
                            <span>Learn More</span>
                            <ArrowRightIcon size={16} />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
