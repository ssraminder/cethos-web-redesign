'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FlaskConical,
  FileCheck,
  Building2,
  Code2,
  Play,
  Check,
  ArrowRight,
} from 'lucide-react'
import { CTA } from '@/components/sections'
import type { LucideIcon } from 'lucide-react'
import type { ServiceData, IconName } from '@/lib/services-data'

const iconMap: Record<IconName, LucideIcon> = {
  molecule: FlaskConical,
  'document-check': FileCheck,
  building: Building2,
  code: Code2,
  play: Play,
}

interface Props {
  service: ServiceData
}

export function ServicePageContent({ service }: Props) {
  const Icon = iconMap[service.iconName]

  return (
    <>
      {/* Hero Section - Light background with dark text */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-[800px]">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 text-sm text-[#717182] mb-6"
            >
              <Link href="/" className="hover:text-[#0891B2] transition-colors">Home</Link>
              <span>/</span>
              <Link href="/services" className="hover:text-[#0891B2] transition-colors">Services</Link>
              <span>/</span>
              <span className="text-[#0C2340]">{service.shortTitle}</span>
            </motion.div>

            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="w-16 h-16 mb-6"
            >
              <Icon className="w-16 h-16 text-[#0891B2]" strokeWidth={1.5} />
            </motion.div>

            {/* Title - DARK TEXT */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
            >
              {service.title}
            </motion.h1>

            {/* Description - DARK GRAY TEXT */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl text-[#4B5563] leading-relaxed mb-8 max-w-[600px]"
            >
              {service.longDescription}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0C2340] mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
              Comprehensive solutions tailored to your specific needs and industry requirements.
            </p>
          </div>

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
                <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 h-full">
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{feature.title}</h3>
                  <p className="text-[#4B5563]">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0C2340] mb-4">
              Our Process
            </h2>
            <p className="text-xl text-[#4B5563] max-w-2xl mx-auto">
              A proven methodology that ensures quality, accuracy, and on-time delivery.
            </p>
          </div>

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
                  <div className="absolute left-6 top-14 bottom-0 w-px bg-[#0891B2]/30" />
                )}

                {/* Step number */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#0891B2] text-white flex items-center justify-center font-bold text-lg">
                  {step.step}
                </div>

                {/* Content */}
                <div className="flex-grow pt-2">
                  <h3 className="text-xl font-semibold text-[#0C2340] mb-2">{step.title}</h3>
                  <p className="text-[#4B5563]">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-[32px] md:text-[40px] font-bold text-[#0C2340] mb-6">
                Why Choose Us for {service.shortTitle}
              </h2>
              <p className="text-lg text-[#4B5563] mb-8">
                We combine industry expertise, advanced technology, and rigorous quality processes to deliver exceptional results for your {service.shortTitle.toLowerCase()} translation needs.
              </p>
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold inline-flex items-center gap-2"
              >
                Start Your Project
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-lg p-8 border border-[#E5E7EB] shadow-[0_4px_6px_rgba(0,0,0,0.05)]">
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
                      <div className="w-6 h-6 rounded-full bg-[#E0F2FE] flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-[#0891B2]" strokeWidth={2} />
                      </div>
                      <span className="text-[#4B5563]">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-10">
            <h3 className="text-xl font-semibold text-[#0C2340] mb-2">Industries We Serve</h3>
            <p className="text-[#4B5563]">Specialized expertise for your sector</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {service.industries.map((industry) => (
              <span
                key={industry}
                className="px-4 py-2 bg-white rounded-full text-[#0C2340] font-medium border border-[#E5E7EB]"
              >
                {industry}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTA />
    </>
  )
}
