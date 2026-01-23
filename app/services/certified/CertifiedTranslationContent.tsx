'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowRight,
  Phone,
  CheckCircle,
  Shield,
  Clock,
  Award,
  FileText,
  GraduationCap,
  Heart,
  Users,
  MapPin,
  Scale
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const specializedServices = [
  {
    icon: Users,
    title: 'Immigration Translation Services',
    description: 'Complete translation services for IRCC applications including Express Entry, PNP, and family sponsorship.',
    href: '/services/certified/immigration-translation-services',
    price: 'Starting at $35/page',
  },
  {
    icon: FileText,
    title: 'Birth Certificate Translation',
    description: 'IRCC-certified birth certificate translations for PR, citizenship, and sponsorship applications.',
    href: '/services/certified/birth-certificate-translation',
    price: 'Starting at $65',
  },
  {
    icon: Heart,
    title: 'Marriage Certificate Translation',
    description: 'Certified translations for marriage certificates and divorce decrees for spousal sponsorship.',
    href: '/services/certified/marriage-certificate-translation',
    price: 'Starting at $65',
  },
  {
    icon: GraduationCap,
    title: 'Academic Transcript Translation',
    description: 'WES, IQAS, and Express Entry certified translations for diplomas, degrees, and transcripts.',
    href: '/services/certified/academic-transcript-translation',
    price: 'Starting at $35/page',
  },
  {
    icon: Award,
    title: 'PR & Citizenship Packages',
    description: 'Complete document packages for permanent residence and citizenship applications with bundle pricing.',
    href: '/services/certified/pr-citizenship-translation',
    price: 'Packages from $120',
  },
  {
    icon: MapPin,
    title: 'Edmonton Translation Services',
    description: 'IRCC-certified translations delivered to Edmonton by email or courier. No travel required.',
    href: '/services/certified/edmonton-translation-agency',
    price: 'Free email delivery',
  },
]

const features = [
  {
    icon: Shield,
    title: '100% IRCC Acceptance Guarantee',
    description: 'All translations accepted by IRCC. Money-back guarantee if rejected.',
  },
  {
    icon: Clock,
    title: 'Same-Day Service Available',
    description: 'Need it today? Rush service delivers certified translations within hours.',
  },
  {
    icon: Award,
    title: 'Translation + Notary Same Visit',
    description: 'Commissioner certification included with every translation.',
  },
  {
    icon: Scale,
    title: 'Court-Accepted Translations',
    description: 'Legal translations accepted by courts across Canada.',
  },
]

const documentCategories = [
  {
    title: 'Personal Documents',
    items: ['Birth Certificates', 'Marriage Certificates', 'Divorce Decrees', 'Death Certificates', 'Name Change Documents'],
  },
  {
    title: 'Academic Documents',
    items: ['Diplomas & Degrees', 'Academic Transcripts', 'Course Descriptions', 'Professional Certificates', 'Letters of Recommendation'],
  },
  {
    title: 'Legal Documents',
    items: ['Contracts & Agreements', 'Court Documents', 'Powers of Attorney', 'Affidavits', 'Corporate Documents'],
  },
  {
    title: 'Immigration Documents',
    items: ['Police Clearances', 'Employment Letters', 'Bank Statements', 'Reference Letters', 'Medical Records'],
  },
]

const faqs = [
  {
    question: 'What is a certified translation?',
    answer: 'A certified translation includes a signed statement from the translator attesting to the accuracy and completeness of the translation. This certification is required by IRCC, courts, and government agencies.',
  },
  {
    question: 'Are your translations accepted by IRCC?',
    answer: 'Yes, all our translations are 100% accepted by Immigration, Refugees and Citizenship Canada. We provide a money-back guarantee if IRCC ever rejects our translation.',
  },
  {
    question: 'How fast can I get a certified translation?',
    answer: 'Standard service is 2-3 business days. Same-day rush service is available for an additional $25. Call us for urgent deadlines.',
  },
  {
    question: 'Do you provide notarization?',
    answer: 'Yes, commissioner certification (equivalent to notarization for IRCC purposes) is included free with every translation. Additional notarization is available upon request.',
  },
  {
    question: 'What languages do you translate?',
    answer: 'We translate from 95+ languages including Punjabi, Hindi, Mandarin, Arabic, Spanish, French, Urdu, Vietnamese, Korean, Japanese, Farsi, and many more.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Certified Translation', url: '/services/certified' },
]

export default function CertifiedTranslationContent() {
  return (
    <>
      <ServiceJsonLd
        name="Certified Translation Services"
        description="IRCC-certified translation services for immigration, legal, and academic documents. 100% acceptance guarantee."
        url="https://cethos.com/services/certified"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
              >
                CERTIFIED TRANSLATION SERVICES
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
              >
                IRCC-Certified Translation Services Calgary
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-[#4B5563] leading-relaxed mb-8"
              >
                Official document translations accepted by IRCC, courts, government agencies, and academic institutions. Same-day service available with 100% acceptance guarantee.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-8"
              >
                <Link
                  href="/get-quote"
                  className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
                >
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="tel:5876000786"
                  className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" /> (587) 600-0786
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]"
              >
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  100% IRCC Accepted
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0891B2]" />
                  Same-Day Available
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#0891B2]" />
                  Notarization Included
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <FileText className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center p-6">
                  <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-[#0C2340] mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Specialized Services */}
      <section className="py-16 bg-slate-50">
        <Container>
          <SectionHeading
            title="Specialized Translation Services"
            subtitle="Choose the service that fits your needs."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={service.href}>
                  <Card hover className="h-full p-6 group">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4 group-hover:bg-teal-600 transition-colors">
                      <service.icon className="w-6 h-6 text-teal-600 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-[#0C2340] mb-2 group-hover:text-teal-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-teal-600">{service.price}</span>
                      <ArrowRight className="w-5 h-5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Document Categories */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Documents We Translate"
            subtitle="Comprehensive certified translation for all document types."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {documentCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <h3 className="font-semibold text-[#0C2340] mb-4 pb-2 border-b border-slate-200">
                    {category.title}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-16 bg-[#0C2340]">
        <Container>
          <h2 className="text-3xl font-bold text-white text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Submit Document', description: 'Upload a photo or scan through our secure form.' },
              { step: 2, title: 'Receive Quote', description: 'Get an exact quote within 2 hours.' },
              { step: 3, title: 'We Translate', description: 'Certified translator completes your translation.' },
              { step: 4, title: 'Pick Up or Delivery', description: 'Collect downtown or receive by email/courier.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our certified translation services."
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                  <p className="text-slate-600">{faq.answer}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
