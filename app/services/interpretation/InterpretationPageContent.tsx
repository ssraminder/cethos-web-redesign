'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  Headphones,
  MessageSquare,
  Phone,
  Video,
  Users,
  Stethoscope,
  Scale,
  Building2,
  Clock,
  Globe,
  Shield
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'

const interpretationTypes = [
  {
    icon: Headphones,
    title: 'Simultaneous Interpretation',
    description: 'Real-time interpretation where the interpreter speaks at the same time as the speaker.',
    ideal: 'Conferences, shareholder meetings, large events, UN-style meetings',
    features: ['Real-time delivery', 'Specialized equipment', 'Team of interpreters', 'Multiple language booths'],
  },
  {
    icon: MessageSquare,
    title: 'Consecutive Interpretation',
    description: 'The interpreter speaks after the speaker pauses, ideal for smaller settings.',
    ideal: 'Business meetings, negotiations, depositions, interviews',
    features: ['No equipment needed', 'Personal setting', 'Note-taking technique', 'Two-way communication'],
  },
  {
    icon: Phone,
    title: 'Over-the-Phone Interpretation (OPI)',
    description: 'Remote phone-based interpretation connecting parties across distances.',
    ideal: 'Customer service, healthcare calls, emergency services, quick consultations',
    features: ['24/7 availability', 'Rapid connection times', '200+ languages', 'No advance scheduling'],
  },
  {
    icon: Video,
    title: 'Video Remote Interpretation (VRI)',
    description: 'Video-based interpretation adding visual communication to remote services.',
    ideal: 'Medical appointments, sign language, virtual meetings, immigration interviews',
    features: ['Visual communication', 'Sign language support', 'Flexible scheduling', 'HIPAA compliant'],
  },
  {
    icon: Users,
    title: 'Escort/Liaison Interpretation',
    description: 'An interpreter accompanies clients providing real-time language support.',
    ideal: 'Site visits, factory tours, trade shows, business travel',
    features: ['Full-day availability', 'Cultural guidance', 'Flexible schedule', 'Travel accompaniment'],
  },
]

const specializedServices = [
  {
    icon: Stethoscope,
    title: 'Medical Interpretation',
    description: 'HIPAA-compliant medical interpretation for clinical trials, patient visits, and healthcare settings.',
    applications: ['Clinical trial patient visits', 'Cognitive debriefing interviews', 'Medical consultations', 'Telehealth appointments'],
  },
  {
    icon: Scale,
    title: 'Legal/Court Interpretation',
    description: 'Certified court interpreters for legal proceedings, depositions, and attorney-client meetings.',
    applications: ['Court proceedings', 'Depositions', 'Attorney-client meetings', 'Arbitration hearings'],
  },
  {
    icon: Shield,
    title: 'Regulatory Inspection Interpretation',
    description: 'Support for FDA, EMA, and other regulatory agency inspections and audits.',
    applications: ['FDA inspections', 'EMA audits', 'ISO audits', 'Quality system inspections'],
  },
  {
    icon: Building2,
    title: 'Technical/Scientific Interpretation',
    description: 'Subject matter expert interpreters for technical discussions and scientific meetings.',
    applications: ['Scientific advisory boards', 'Technical presentations', 'R&D meetings', 'Patent discussions'],
  },
]

const opiFeatures = [
  { feature: '24/7 Availability', description: 'Round-the-clock access to interpreters' },
  { feature: 'Rapid Connection', description: 'Connect to an interpreter in under 60 seconds' },
  { feature: '200+ Languages', description: 'Comprehensive language coverage' },
  { feature: 'No Scheduling Required', description: 'On-demand access when you need it' },
  { feature: 'Call Recording Available', description: 'Documentation for compliance needs' },
  { feature: 'Secure & Confidential', description: 'HIPAA and GDPR compliant' },
]

const vriFeatures = [
  { feature: 'Face-to-Face Communication', description: 'Visual cues enhance understanding' },
  { feature: 'Sign Language Support', description: 'ASL and international sign languages' },
  { feature: 'Platform Agnostic', description: 'Works with Zoom, Teams, Webex, and more' },
  { feature: 'Medical Appointments', description: 'Ideal for telehealth and in-person visits' },
  { feature: 'Immigration Services', description: 'USCIS interview support' },
  { feature: 'Educational Settings', description: 'Parent-teacher conferences, IEP meetings' },
]

const faqs = [
  {
    question: 'What is the difference between simultaneous and consecutive interpretation?',
    answer: 'Simultaneous interpretation happens in real-time as the speaker talks, typically using specialized equipment and headsets. Consecutive interpretation involves the interpreter speaking after the speaker pauses, which requires no equipment but takes longer. Simultaneous is ideal for conferences; consecutive is better for smaller meetings and negotiations.',
  },
  {
    question: 'How quickly can you connect me with an over-the-phone interpreter?',
    answer: 'Our OPI service typically connects you with a qualified interpreter in under 60 seconds for major languages. Less common languages may take slightly longer, but we maintain 24/7 availability for over 200 languages.',
  },
  {
    question: 'Do you provide certified court interpreters?',
    answer: 'Yes, we maintain a network of certified court interpreters who meet federal and state certification requirements. Our legal interpreters are experienced in court proceedings, depositions, arbitrations, and attorney-client communications.',
  },
  {
    question: 'Can interpreters support clinical trial patient visits?',
    answer: 'Yes, we specialize in medical interpretation for clinical trials. Our interpreters are trained in clinical trial terminology, HIPAA compliance, and patient confidentiality requirements. We can support cognitive debriefing interviews, informed consent discussions, and patient visits.',
  },
]

export default function InterpretationPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Interpretation Services"
        description="Professional interpretation services in 200+ languages including simultaneous, consecutive, over-the-phone, and video remote interpretation."
        url="https://cethos.com/services/interpretation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                INTERPRETATION SERVICES
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                Professional Interpretation Services
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                Real-time language support for conferences, meetings, healthcare, legal proceedings, and more. Available in 200+ languages with 24/7 on-demand access.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <Link href="/get-quote" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Request Interpreter <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0891B2]" />
                  24/7 Availability
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#0891B2]" />
                  200+ Languages
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  HIPAA Compliant
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <Headphones className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0C2340] py-12">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '200+', label: 'Languages' },
              { value: '24/7', label: 'Availability' },
              { value: '<60s', label: 'OPI Connection' },
              { value: '5,000+', label: 'Interpreters' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interpretation Types */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Interpretation Services"
            subtitle="Choose the right interpretation mode for your needs."
            className="mb-16"
          />

          <div className="space-y-8">
            {interpretationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    <div className="lg:col-span-1">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <type.icon className="w-7 h-7 text-teal-600" />
                        </div>
                        <h3 className="text-xl font-bold text-[#0C2340] lg:hidden">{type.title}</h3>
                      </div>
                      <h3 className="text-xl font-bold text-[#0C2340] mt-4 hidden lg:block">{type.title}</h3>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-slate-600 mb-3">{type.description}</p>
                      <p className="text-sm text-teal-600 font-medium">
                        <strong>Ideal for:</strong> {type.ideal}
                      </p>
                    </div>
                    <div className="lg:col-span-1">
                      <ul className="space-y-2">
                        {type.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                            <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* OPI & VRI Details */}
      <section className="section-padding bg-slate-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* OPI */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Phone className="w-7 h-7 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0C2340]">Over-the-Phone Interpretation</h2>
              </div>
              <div className="space-y-3">
                {opiFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-[#0C2340]">{item.feature}</span>
                      <span className="text-slate-600"> - {item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VRI */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Video className="w-7 h-7 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-[#0C2340]">Video Remote Interpretation</h2>
              </div>
              <div className="space-y-3">
                {vriFeatures.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-[#0C2340]">{item.feature}</span>
                      <span className="text-slate-600"> - {item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specialized Interpretation */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Specialized Interpretation"
            subtitle="Expert interpreters for complex, regulated industries."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specializedServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0C2340]">{service.title}</h3>
                  </div>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.applications.map((app, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">
                        {app}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our interpretation services."
            className="mb-12"
          />
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-[#0C2340] mb-3">{faq.question}</h3>
                <p className="text-slate-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CTA />
    </>
  )
}
