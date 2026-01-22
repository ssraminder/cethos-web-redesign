'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Button, Card, SectionHeading } from '@/components/ui'
import {
  CheckIcon,
  MoleculeIcon,
  DocumentCheckIcon,
  BuildingIcon,
  CodeIcon,
  PlayIcon,
} from '@/components/icons'
import { CTA } from '@/components/sections'
import type { ServiceData, IconName } from '@/lib/services-data'

const iconMap: Record<IconName, React.ComponentType<{ size?: number; className?: string }>> = {
  molecule: MoleculeIcon,
  'document-check': DocumentCheckIcon,
  building: BuildingIcon,
  code: CodeIcon,
  play: PlayIcon,
}

interface Props {
  service: ServiceData
}

export function ServicePageContent({ service }: Props) {
  const Icon = iconMap[service.iconName]

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-hero-mesh">
        {/* Background decorations */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-600/15 rounded-full blur-[80px]" />

        <Container className="relative z-10">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-white/60 text-sm mb-6"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">Services</Link>
              <span>/</span>
              <span className="text-white">{service.shortTitle}</span>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 text-teal-400 mb-8"
            >
              <Icon size={40} />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {service.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-white/80 mb-8 max-w-2xl"
            >
              {service.longDescription}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button href="/get-quote" size="lg" showArrow>
                Get a Quote
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="What We Offer"
            subtitle="Comprehensive solutions tailored to your specific needs and industry requirements."
            className="mb-16"
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {service.features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full">
                  <h3 className="text-lg font-semibold text-navy mb-3">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Our Process"
            subtitle="A proven methodology that ensures quality, accuracy, and on-time delivery."
            className="mb-16"
          />

          <div className="max-w-4xl mx-auto">
            {service.process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-12 last:pb-0"
              >
                {/* Timeline line */}
                {index < service.process.length - 1 && (
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-teal-200" />
                )}

                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-grow pt-2">
                  <h3 className="text-xl font-semibold text-navy mb-2">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-heading-xl md:text-display text-navy mb-6">
                Why Choose Us for {service.shortTitle}
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                We combine industry expertise, advanced technology, and rigorous quality processes to deliver exceptional results for your {service.shortTitle.toLowerCase()} translation needs.
              </p>
              <Button href="/get-quote" showArrow>
                Start Your Project
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card variant="outline" padding="lg">
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckIcon size={14} className="text-teal-600" />
                      </div>
                      <span className="text-slate-700">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-navy mb-2">Industries We Serve</h3>
            <p className="text-slate-600">Specialized expertise for your sector</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {service.industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-2 bg-white rounded-full text-navy font-medium border border-slate-200"
              >
                {industry}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  )
}
