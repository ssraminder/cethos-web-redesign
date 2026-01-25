'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Shield,
  GraduationCap,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Mic,
  Monitor,
  Wifi,
  HeadphonesIcon,
  Languages,
  Award,
  Zap,
  HandMetal,
  MapPin
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { InterpretationQuoteForm } from '@/components/forms/InterpretationQuoteForm'

// Service Types Data
const serviceTypes = [
  {
    icon: Users,
    title: 'On-Site Interpretation',
    description: 'Professional interpreters physically present at your location for meetings, events, and appointments.',
    bestFor: ['Medical appointments', 'Legal proceedings', 'Business meetings', 'Factory tours'],
    color: 'teal',
  },
  {
    icon: Phone,
    title: 'Over-the-Phone (OPI)',
    description: 'Instant phone-based interpretation available 24/7 in 200+ languages with connection in under 60 seconds.',
    bestFor: ['Emergency calls', 'Customer service', 'Quick consultations', 'After-hours support'],
    color: 'blue',
  },
  {
    icon: Video,
    title: 'Video Remote (VRI)',
    description: 'Video-based interpretation adding visual communication for enhanced understanding and sign language support.',
    bestFor: ['Telehealth', 'Sign language', 'Immigration interviews', 'Virtual meetings'],
    color: 'purple',
  },
  {
    icon: Headphones,
    title: 'Simultaneous/Conference',
    description: 'Real-time interpretation where interpreters speak at the same time as presenters using specialized equipment.',
    bestFor: ['Large conferences', 'Shareholder meetings', 'UN-style events', 'Webinars'],
    color: 'orange',
  },
  {
    icon: MessageSquare,
    title: 'Consecutive Interpretation',
    description: 'Interpreter speaks after the speaker pauses, ideal for smaller settings requiring precision.',
    bestFor: ['Depositions', 'Negotiations', 'Interviews', 'Training sessions'],
    color: 'green',
  },
  {
    icon: HandMetal,
    title: 'ASL / Sign Language',
    description: 'Certified deaf interpreters and ASL specialists for accessibility and ADA compliance.',
    bestFor: ['ADA compliance', 'Educational settings', 'Healthcare', 'Public events'],
    color: 'pink',
  },
]

// Industries Data
const industries = [
  {
    id: 'healthcare',
    icon: Stethoscope,
    title: 'Healthcare / Medical',
    description: 'HIPAA-compliant medical interpretation for patient care, clinical trials, and healthcare settings.',
    features: [
      'HIPAA & HITECH compliant',
      'Medical terminology expertise',
      'Patient confidentiality',
      'EMR documentation support',
    ],
    useCases: ['Patient consultations', 'Clinical trials', 'Telehealth appointments', 'Mental health sessions', 'Surgical consultations'],
  },
  {
    id: 'legal',
    icon: Scale,
    title: 'Legal / Court',
    description: 'Certified court interpreters for legal proceedings, depositions, and attorney-client communications.',
    features: [
      'Court-certified interpreters',
      'Legal terminology expertise',
      'Confidentiality protocols',
      'Witness preparation support',
    ],
    useCases: ['Court proceedings', 'Depositions', 'Attorney-client meetings', 'Arbitration', 'Immigration hearings'],
  },
  {
    id: 'business',
    icon: Briefcase,
    title: 'Business / Corporate',
    description: 'Professional interpretation for international business, negotiations, and corporate events.',
    features: [
      'Industry-specific expertise',
      'Cultural consulting',
      'Executive-level interpreters',
      'NDA compliance',
    ],
    useCases: ['Board meetings', 'M&A negotiations', 'Product launches', 'Investor calls', 'Trade shows'],
  },
  {
    id: 'government',
    icon: Building2,
    title: 'Government',
    description: 'Security-cleared interpreters for government agencies, diplomatic meetings, and public services.',
    features: [
      'Security clearance available',
      'Protocol expertise',
      'Multi-agency experience',
      'Compliance certified',
    ],
    useCases: ['Diplomatic meetings', 'Public hearings', 'Citizen services', 'Law enforcement', 'Social services'],
  },
  {
    id: 'conferences',
    icon: Mic,
    title: 'Conferences / Events',
    description: 'Full-service event interpretation with equipment, booth setup, and multi-language support.',
    features: [
      'Simultaneous equipment',
      'Multi-language booths',
      'Technical support',
      'Event coordination',
    ],
    useCases: ['International conferences', 'Trade shows', 'Webinars', 'Press conferences', 'Award ceremonies'],
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education',
    description: 'Educational interpretation for schools, universities, and parent-teacher communications.',
    features: [
      'K-12 certified',
      'Higher ed experience',
      'IEP meeting support',
      'Academic terminology',
    ],
    useCases: ['Parent-teacher conferences', 'IEP meetings', 'University lectures', 'Graduation ceremonies', 'Orientation events'],
  },
]

// How It Works Steps
const howItWorksSteps = [
  {
    step: 1,
    title: 'Request a Quote',
    description: 'Fill out our form with your event details, language needs, and preferred service type.',
    icon: MessageSquare,
  },
  {
    step: 2,
    title: 'Get Matched',
    description: 'We match you with qualified interpreters based on language, industry expertise, and availability.',
    icon: Users,
  },
  {
    step: 3,
    title: 'Confirm Details',
    description: 'Review interpreter credentials, confirm logistics, and receive preparation materials.',
    icon: CheckCircle,
  },
  {
    step: 4,
    title: 'Professional Service',
    description: 'Your interpreter delivers seamless communication, ensuring nothing is lost in translation.',
    icon: Headphones,
  },
]

// Why Choose Cethos Features
const whyChooseFeatures = [
  {
    icon: Globe,
    title: '200+ Languages',
    description: 'Comprehensive coverage including rare and indigenous languages',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock access to interpretation services',
  },
  {
    icon: Zap,
    title: '<60 Second Connection',
    description: 'Rapid OPI connection for urgent needs',
  },
  {
    icon: Shield,
    title: 'HIPAA & SOC 2',
    description: 'Enterprise-grade security and compliance',
  },
  {
    icon: Award,
    title: 'Certified Interpreters',
    description: 'Court-certified and industry-specialized professionals',
  },
  {
    icon: Languages,
    title: 'Subject Matter Experts',
    description: 'Medical, legal, technical, and business specialists',
  },
]

const stats = [
  { value: '5,000+', label: 'Interpreters' },
  { value: '200+', label: 'Languages' },
  { value: '99.9%', label: 'Uptime' },
  { value: '<60s', label: 'OPI Connect' },
]

// Interpretation Modes Comparison
const interpretationModes = [
  {
    mode: 'Simultaneous',
    description: 'Real-time interpretation while speaker talks',
    speed: 'Immediate',
    equipment: 'Required (booths, headsets)',
    bestFor: 'Large conferences, UN-style meetings',
    teamSize: '2+ interpreters',
  },
  {
    mode: 'Consecutive',
    description: 'Interpreter speaks after speaker pauses',
    speed: 'Slight delay',
    equipment: 'None required',
    bestFor: 'Small meetings, depositions, interviews',
    teamSize: '1 interpreter',
  },
  {
    mode: 'Whispered (Chuchotage)',
    description: 'Interpreter whispers to 1-2 listeners',
    speed: 'Immediate',
    equipment: 'None required',
    bestFor: 'VIP accompaniment, small groups',
    teamSize: '1 interpreter',
  },
  {
    mode: 'Relay',
    description: 'Multi-language chain interpretation',
    speed: 'Moderate delay',
    equipment: 'Varies',
    bestFor: 'Rare language combinations',
    teamSize: '2+ interpreters',
  },
]

// Languages
const popularLanguages = [
  'Spanish', 'Mandarin Chinese', 'French', 'Arabic', 'Portuguese', 'Russian',
  'German', 'Japanese', 'Korean', 'Vietnamese', 'Hindi', 'Italian',
]

const indigenousLanguages = [
  'Navajo', 'Cherokee', 'Lakota', 'Ojibwe', 'Cree', 'Inuktitut',
  'Hawaiian', 'Yupik', 'Tlingit', 'Apache',
]

const signLanguages = [
  'American Sign Language (ASL)', 'British Sign Language (BSL)', 'International Sign',
  'Certified Deaf Interpreters (CDI)', 'Tactile Sign Language',
]

// Equipment & Technology
const equipmentCategories = [
  {
    icon: HeadphonesIcon,
    title: 'Audio Equipment',
    items: ['Wireless receiver headsets', 'Interpretation booths', 'Portable tour guide systems', 'Microphone systems'],
  },
  {
    icon: Monitor,
    title: 'Video & Display',
    items: ['Video conferencing integration', 'Large display screens', 'Webcam setups for VRI', 'Recording equipment'],
  },
  {
    icon: Wifi,
    title: 'Remote Platforms',
    items: ['Zoom interpretation channels', 'Microsoft Teams integration', 'Webex language support', 'Custom RSI platforms'],
  },
]

// FAQs
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
  {
    question: 'What equipment do you provide for conference interpretation?',
    answer: 'We provide full equipment packages including interpretation booths, wireless receiver headsets, microphone systems, and technical support. We can also integrate with virtual platforms like Zoom and Teams for hybrid events.',
  },
  {
    question: 'Are your interpreters HIPAA compliant?',
    answer: 'Yes, all our healthcare interpreters are HIPAA trained and certified. We also maintain SOC 2 compliance for data security and sign Business Associate Agreements (BAAs) when required.',
  },
  {
    question: 'How do you match interpreters to my specific needs?',
    answer: 'We consider multiple factors including language pair, subject matter expertise (medical, legal, technical), certifications required, location, and availability. For specialized fields, we match interpreters with relevant industry experience.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'Cancellation policies vary by service type. For scheduled on-site interpretation, we typically require 48-72 hours notice. OPI and VRI services are on-demand with no cancellation needed. Contact us for specific terms based on your booking.',
  },
]

export default function InterpretationPageContent() {
  const [activeIndustry, setActiveIndustry] = useState('healthcare')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const selectedIndustry = industries.find((ind) => ind.id === activeIndustry)

  return (
    <>
      <ServiceJsonLd
        name="Interpretation Services"
        description="Professional interpretation services in 200+ languages including simultaneous, consecutive, over-the-phone, and video remote interpretation. 24/7 availability with certified interpreters."
        url="https://cethos.com/services/interpretation"
      />
      <FAQJsonLd faqs={faqs} />

      {/* Hero Section with Form */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left - Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                  INTERPRETATION SERVICES
                </div>
                <h1 className="text-[36px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                  Professional Interpretation in 200+ Languages
                </h1>
                <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                  Real-time language support for conferences, meetings, healthcare, legal proceedings, and more. Connect with certified interpreters 24/7 with on-demand OPI in under 60 seconds.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#4B5563]">
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

                {/* Trust indicators */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="text-2xl font-bold text-[#0891B2]">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">Request an Interpreter</h2>
              <p className="text-slate-600 mb-6">Get a free quote within 2 hours</p>
              <InterpretationQuoteForm formLocation="interpretation-hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Interpretation Services"
            subtitle="Choose the right interpretation mode for your specific needs"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceTypes.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-14 h-14 rounded-xl bg-${service.color}-100 flex items-center justify-center mb-4`}>
                    <service.icon className={`w-7 h-7 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C2340] mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-4">{service.description}</p>
                  <div>
                    <p className="text-sm font-semibold text-[#0C2340] mb-2">Best For:</p>
                    <ul className="space-y-1">
                      {service.bestFor.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Industries Section - Tabbed Interface */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Industries We Serve"
            subtitle="Specialized interpretation for regulated and complex industries"
            className="mb-12"
          />

          {/* Industry Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveIndustry(industry.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeIndustry === industry.id
                    ? 'bg-[#0891B2] text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                <industry.icon className="w-4 h-4 inline mr-2" />
                {industry.title.split(' / ')[0]}
              </button>
            ))}
          </div>

          {/* Industry Content */}
          <AnimatePresence mode="wait">
            {selectedIndustry && (
              <motion.div
                key={selectedIndustry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center">
                          <selectedIndustry.icon className="w-7 h-7 text-teal-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#0C2340]">{selectedIndustry.title}</h3>
                      </div>
                      <p className="text-slate-600 mb-6">{selectedIndustry.description}</p>
                      <h4 className="font-semibold text-[#0C2340] mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {selectedIndustry.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-600">
                            <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0C2340] mb-4">Common Use Cases:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedIndustry.useCases.map((useCase, i) => (
                          <span
                            key={i}
                            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm"
                          >
                            {useCase}
                          </span>
                        ))}
                      </div>
                      <div className="mt-8">
                        <Link
                          href="#quote-form"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
                        >
                          Get {selectedIndustry.title.split(' / ')[0]} Interpreters
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* How It Works */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="How It Works"
            subtitle="Get connected with professional interpreters in four simple steps"
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-16 h-16 rounded-full bg-[#0891B2] flex items-center justify-center mx-auto">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#0C2340] text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#0C2340] mb-3">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Cethos */}
      <section className="section-padding bg-[#0C2340]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Why Choose Cethos for Interpretation?
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  With over a decade of experience, Cethos delivers reliable, professional interpretation services backed by technology and a global network of certified interpreters.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whyChooseFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-[#0891B2]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Column */}
            <div className="space-y-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 rounded-xl p-6 text-center"
                >
                  <div className="text-4xl font-bold text-[#0891B2] mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Interpretation Modes Comparison */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Interpretation Modes Compared"
            subtitle="Understanding the different approaches to professional interpretation"
            className="mb-12"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Mode</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Speed</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Equipment</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">Best For</th>
                </tr>
              </thead>
              <tbody>
                {interpretationModes.map((mode, index) => (
                  <motion.tr
                    key={mode.mode}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-slate-200 hover:bg-slate-50"
                  >
                    <td className="px-6 py-4">
                      <span className="font-semibold text-[#0C2340]">{mode.mode}</span>
                      <br />
                      <span className="text-xs text-slate-500">{mode.teamSize}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        mode.speed === 'Immediate' ? 'bg-green-100 text-green-700' :
                        mode.speed === 'Slight delay' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {mode.speed}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.equipment}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.bestFor}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Languages Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Languages We Support"
            subtitle="Access interpreters in over 200 languages including rare and indigenous languages"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Popular Languages */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#0891B2]" />
                Popular Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Card>

            {/* Indigenous Languages */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0891B2]" />
                Indigenous Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {indigenousLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Card>

            {/* Sign Languages */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <HandMetal className="w-5 h-5 text-[#0891B2]" />
                Sign Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {signLanguages.map((lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </Card>
          </div>

          <p className="text-center text-slate-600 mt-8">
            Don&apos;t see your language? <Link href="/contact" className="text-[#0891B2] font-semibold hover:underline">Contact us</Link> - we likely have interpreters available.
          </p>
        </Container>
      </section>

      {/* Equipment & Technology */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Equipment & Technology"
            subtitle="Full-service interpretation support including equipment rental and technical support"
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipmentCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full p-6">
                  <div className="w-14 h-14 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                    <category.icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0C2340] mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-600">
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

      {/* FAQ Section with Accordion */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our interpretation services"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-semibold text-[#0C2340] pr-4">{faq.question}</h3>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#0891B2] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-4 text-slate-600">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#0C2340] via-[#1A365D] to-[#0891B2]">
        <div className="max-w-[1200px] mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white mb-6">
              Ready to Break Language Barriers?
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              Connect with professional interpreters in 200+ languages. Get a free quote within 2 hours or call for immediate OPI access.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="#quote-form"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-6 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
              >
                Request an Interpreter
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                (587) 600-0786
              </a>
            </div>
            <p className="mt-8 text-white/60 text-sm">
              24/7 OPI Available | Response within 2 hours | No commitment required
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:hidden z-40">
        <div className="flex gap-3">
          <a
            href="tel:5876000786"
            className="flex-1 px-4 py-3 bg-[#0C2340] text-white rounded-lg font-semibold text-center flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <Link
            href="#quote-form"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex-1 px-4 py-3 bg-[#0891B2] text-white rounded-lg font-semibold text-center"
          >
            Get Quote
          </Link>
        </div>
      </div>

      {/* Spacer for sticky CTA on mobile */}
      <div className="h-20 md:hidden" />

      {/* Hidden anchor for quote form */}
      <div id="quote-form" className="absolute top-0" style={{ marginTop: '-100px' }} />
    </>
  )
}
