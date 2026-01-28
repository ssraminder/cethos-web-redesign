'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import {
  FlaskConical,
  FileCheck,
  Globe,
  Mic,
  FileText,
  Code2,
  CheckCircle,
  ArrowRight,
  Languages,
  Users,
  Award,
  Clock
} from 'lucide-react'

// =============================================================================
// DATA
// =============================================================================

const services = [
  {
    slug: 'lifesciences',
    title: 'Life Sciences Translation',
    description: 'Clinical trial documentation, regulatory translations, linguistic validation, and cognitive debriefing for pharmaceutical and biotech companies.',
    icon: FlaskConical,
    price: 'Custom pricing',
    features: ['Linguistic Validation', 'Cognitive Debriefing', 'Regulatory Affairs', 'Pharmacovigilance'],
  },
  {
    slug: 'certified',
    title: 'Certified Translation',
    description: 'IRCC-approved certified translations for immigration documents. Government of Alberta approved. Same-day service available.',
    icon: FileCheck,
    price: 'From $65',
    features: ['IRCC Approved', 'Same-Day Service', '100% Acceptance', 'Notarization Available'],
  },
  {
    slug: 'website',
    title: 'Website Localization',
    description: 'E-commerce, SaaS, and corporate website translation with international SEO optimization. CMS integration included.',
    icon: Globe,
    price: 'From $0.12/word',
    features: ['SEO Optimization', 'CMS Integration', 'Technical QA', 'Multilingual Support'],
  },
  {
    slug: 'interpretation',
    title: 'Interpretation Services',
    description: 'Consecutive, simultaneous, and remote interpretation for conferences, legal proceedings, medical appointments, and business meetings.',
    icon: Mic,
    price: 'From $85/hour',
    features: ['On-Site & Remote', 'Legal & Medical', 'Conference Support', 'Equipment Rental'],
  },
  {
    slug: 'transcription',
    title: 'Transcription Services',
    description: 'Legal, medical, business, and academic transcription services. Verbatim and clean read formats. Translation available.',
    icon: FileText,
    price: 'From $1.50/minute',
    features: ['Medical & Legal', 'Verbatim & Clean Read', 'Time-Stamped', 'Translation Add-On'],
  },
  {
    slug: 'software',
    title: 'Software Localization',
    description: 'Mobile apps, web applications, and software UI translation. String extraction, QA testing, and ongoing updates.',
    icon: Code2,
    price: 'Custom pricing',
    features: ['UI/UX Strings', 'API Integration', 'QA Testing', 'Continuous Updates'],
  },
]

const stats = [
  { value: '200+', label: 'Languages', description: 'From major European languages to rare indigenous dialects' },
  { value: '5,000+', label: 'Specialists', description: 'Native-speaking linguists and subject matter experts' },
  { value: 'ISO 17100', label: 'Compliant', description: 'Quality management systems for translation services' },
  { value: '24/7', label: 'Support', description: 'Project managers available around the clock' },
]

const industries = [
  { column: 'left', items: ['Life Sciences & Pharmaceuticals', 'Healthcare & Medical Devices', 'Legal & Immigration', 'Technology & Software', 'E-commerce & Retail'] },
  { column: 'right', items: ['Financial Services', 'Manufacturing & Engineering', 'Marketing & Advertising', 'Government & Public Sector', 'Education & Training'] },
]

const processSteps = [
  {
    step: 1,
    title: 'Request a Quote',
    description: 'Choose your service type, upload documents (optional), and get an instant estimate.',
  },
  {
    step: 2,
    title: 'Review & Confirm',
    description: 'Receive a detailed quote, confirm the timeline, and your project kicks off.',
  },
  {
    step: 3,
    title: 'Receive & Review',
    description: 'Delivery in your format, free revision round, and quality guaranteed.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function ServicesPageContent() {
  return (
    <>
      {/* Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6 text-white/60" />

          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6"
            >
              Professional Translation Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-200 leading-relaxed max-w-3xl"
            >
              From life sciences to certified immigration documents, we deliver accurate,
              culturally-adapted translations in 200+ languages. ISO 17100 compliant with
              specialized expertise across industries.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SERVICES GRID */}
      {/* ===================================================================== */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive translation and localization solutions for every need."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/services/${service.slug}`} className="block group h-full">
                  <Card className="p-6 h-full border-2 border-transparent hover:border-[#0891B2] transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-4 group-hover:bg-[#0891B2]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#0891B2]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-2 group-hover:text-[#0891B2] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">{service.description}</p>
                    <div className="text-sm font-semibold text-[#0891B2] mb-4">{service.price}</div>
                    <ul className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-[#0891B2] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-2 text-[#0891B2] font-medium text-sm group-hover:gap-3 transition-all mt-auto">
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* WHY CHOOSE CETHOS */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title="Why Choose Cethos"
            subtitle="The expertise and infrastructure to support your global communication needs."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6 text-center h-full">
                  <div className="text-3xl font-bold text-[#0891B2] mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-[#0C2340] mb-2">{stat.label}</div>
                  <p className="text-sm text-slate-600">{stat.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* INDUSTRIES WE SERVE */}
      {/* ===================================================================== */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Industries We Serve"
            subtitle="Specialized expertise across diverse sectors and domains."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {industries.map((column, colIndex) => (
              <motion.div
                key={column.column}
                initial={{ opacity: 0, x: colIndex === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <ul className="space-y-4">
                  {column.items.map((industry, index) => (
                    <li key={index} className="flex items-center gap-3 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                      <span>{industry}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW TO GET STARTED */}
      {/* ===================================================================== */}
      <section className="py-20 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-4">How to Get Started</h2>
          <p className="text-white/70 text-center mb-12 max-w-2xl mx-auto">
            Three simple steps to launch your translation project.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#0891B2] to-transparent z-0" />
                )}
                <div className="relative z-10 text-center">
                  <div className="w-24 h-24 rounded-2xl bg-[#0891B2] flex items-center justify-center mb-6 mx-auto">
                    <span className="text-3xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* CTA */}
      {/* ===================================================================== */}
      <section className="py-16 bg-white">
        <Container>
          <div className="bg-gradient-to-r from-[#0891B2] to-[#06B6D4] rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Our language experts can help you choose the right solution for your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Free Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                View All Services
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
