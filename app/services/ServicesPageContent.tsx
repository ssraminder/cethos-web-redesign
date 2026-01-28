'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Microscope,
  FileCheck,
  Globe,
  Mic,
  FileText,
  Code,
  Languages,
  Users,
  Award,
  Clock,
  Check,
  ChevronRight,
  Phone,
  MessageSquare,
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'

// =============================================================================
// DATA
// =============================================================================

const services = [
  {
    title: 'Life Sciences',
    href: '/services/lifesciences',
    icon: Microscope,
    description: 'Clinical trial documentation, regulatory translations, linguistic validation, and cognitive debriefing for pharmaceutical and biotech companies.',
    price: 'Custom pricing',
  },
  {
    title: 'Certified Translation',
    href: '/services/certified',
    icon: FileCheck,
    description: 'IRCC-approved certified translations for immigration documents. Government of Alberta approved. Same-day service available.',
    price: 'From $65',
  },
  {
    title: 'Website Localization',
    href: '/services/software',
    icon: Globe,
    description: 'E-commerce, SaaS, and corporate website translation with international SEO optimization. CMS integration included.',
    price: 'From $0.12/word',
  },
  {
    title: 'Interpretation',
    href: '/services/interpretation',
    icon: Mic,
    description: 'Consecutive, simultaneous, and remote interpretation for conferences, legal proceedings, medical appointments, and business meetings.',
    price: 'From $85/hour',
  },
  {
    title: 'Transcription',
    href: '/services/transcription',
    icon: FileText,
    description: 'Legal, medical, business, and academic transcription services. Verbatim and clean read formats. Translation available.',
    price: 'From $1.50/minute',
  },
  {
    title: 'Software Localization',
    href: '/services/software',
    icon: Code,
    description: 'Mobile apps, web applications, and software UI translation. String extraction, QA testing, and ongoing updates.',
    price: 'Custom pricing',
  },
]

const stats = [
  {
    value: '200+',
    label: 'Languages',
    description: 'From major European languages to rare indigenous dialects',
  },
  {
    value: '5,000+',
    label: 'Specialists',
    description: 'Native-speaking linguists and subject matter experts',
  },
  {
    value: 'ISO 17100',
    label: 'Compliant',
    description: 'Quality management systems for translation services',
  },
  {
    value: '24/7',
    label: 'Support',
    description: 'Project managers available around the clock',
  },
]

const industriesLeft = [
  'Life Sciences & Pharmaceuticals',
  'Healthcare & Medical Devices',
  'Legal & Immigration',
  'Technology & Software',
  'E-commerce & Retail',
]

const industriesRight = [
  'Financial Services',
  'Manufacturing & Engineering',
  'Marketing & Advertising',
  'Government & Public Sector',
  'Education & Training',
]

const steps = [
  {
    step: 1,
    title: 'Request a Quote',
    description: 'Choose your service type, upload documents (optional), and get an instant estimate.',
  },
  {
    step: 2,
    title: 'Review & Confirm',
    description: 'Receive a detailed quote, confirm timeline, and your project kicks off.',
  },
  {
    step: 3,
    title: 'Receive & Review',
    description: 'Delivery in your format, free revision round, quality guaranteed.',
  },
]

// =============================================================================
// COMPONENT
// =============================================================================

export default function ServicesPageContent() {
  return (
    <>
      {/* ===================================================================== */}
      {/* HERO SECTION */}
      {/* ===================================================================== */}
      <section className="relative bg-[#0C2340] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 text-sm text-gray-300">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">Services</span>
          </nav>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Professional Translation Services
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-200 max-w-3xl"
          >
            From life sciences to certified immigration documents, we deliver accurate,
            culturally-adapted translations in 200+ languages. ISO 17100 compliant with
            specialized expertise across industries.
          </motion.p>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* SERVICES GRID */}
      {/* ===================================================================== */}
      <section className="py-20 bg-white">
        <Container>
          <SectionHeading
            title="Our Services"
            subtitle="Comprehensive language solutions tailored to your industry and needs."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href} className="block group h-full">
                  <Card className="h-full p-6 border-2 border-transparent hover:border-[#0891B2] transition-all duration-300">
                    <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-5 group-hover:bg-[#0891B2]/20 transition-colors">
                      <service.icon className="w-7 h-7 text-[#0891B2]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-3 group-hover:text-[#0891B2] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-sm font-medium text-slate-500">
                        {service.price}
                      </span>
                      <span className="flex items-center gap-1 text-[#0891B2] font-medium text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
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
            subtitle="Industry-leading expertise backed by rigorous quality standards."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-[#0891B2] mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-[#0C2340] mb-2">{stat.label}</div>
                <p className="text-sm text-slate-600">{stat.description}</p>
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
            subtitle="Specialized expertise across diverse sectors."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-4xl mx-auto">
            <div className="space-y-4">
              {industriesLeft.map((industry, index) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                  <span className="text-slate-700">{industry}</span>
                </motion.div>
              ))}
            </div>
            <div className="space-y-4">
              {industriesRight.map((industry, index) => (
                <motion.div
                  key={industry}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  className="flex items-center gap-3"
                >
                  <Check className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                  <span className="text-slate-700">{industry}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* HOW TO GET STARTED */}
      {/* ===================================================================== */}
      <section className="py-20 bg-slate-50">
        <Container>
          <SectionHeading
            title="How to Get Started"
            subtitle="A simple process from quote to delivery."
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#0891B2] text-white text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-[#0C2340] mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-slate-200">
                    <ChevronRight className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===================================================================== */}
      {/* CTA SECTION */}
      {/* ===================================================================== */}
      <section className="py-20 bg-gradient-to-r from-[#0C2340] to-[#164e63]">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-white mb-4"
            >
              Not Sure Which Service You Need?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80 mb-8"
            >
              Our language experts can help you choose the right solution for your project.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" /> Get Free Consultation
              </Link>
              <a
                href="tel:5876000786"
                className="px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (587) 600-0786
              </a>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
