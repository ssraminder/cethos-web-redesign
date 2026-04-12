'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
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

// Language names, city names, and URLs are kept hardcoded per requirements
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

export default function InterpretationPageContent() {
  const [activeIndustry, setActiveIndustry] = useState('healthcare')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const tHero = useTranslations('interpretation.hero')
  const tTypes = useTranslations('interpretation.types')
  const tIndustries = useTranslations('interpretation.industries')
  const tProcess = useTranslations('interpretation.process')
  const tWhy = useTranslations('interpretation.whychoose')
  const tModes = useTranslations('interpretation.modes')
  const tLangs = useTranslations('interpretation.languages')
  const tEquip = useTranslations('interpretation.equipment')
  const tFaq = useTranslations('interpretation.faq')
  const tCta = useTranslations('interpretation.cta')

  // Service Types Data - inside component to access translations
  const serviceTypePrefixes = ['onsite', 'opi', 'vri', 'simul', 'consec', 'asl'] as const
  const serviceTypeIcons = [Users, Phone, Video, Headphones, MessageSquare, HandMetal]
  const serviceTypeColors = ['teal', 'blue', 'purple', 'orange', 'green', 'pink']

  const serviceTypes = serviceTypePrefixes.map((prefix, i) => ({
    icon: serviceTypeIcons[i],
    title: tTypes(`${prefix}_title`),
    description: tTypes(`${prefix}_desc`),
    bestFor: [tTypes(`${prefix}_f1`), tTypes(`${prefix}_f2`), tTypes(`${prefix}_f3`), tTypes(`${prefix}_f4`)],
    color: serviceTypeColors[i],
  }))

  // Industries Data
  const industryPrefixes = ['health', 'legal', 'business', 'govt', 'conf', 'edu'] as const
  const industryIds = ['healthcare', 'legal', 'business', 'government', 'conferences', 'education']
  const industryIcons = [Stethoscope, Scale, Briefcase, Building2, Mic, GraduationCap]

  const industries = industryPrefixes.map((prefix, i) => ({
    id: industryIds[i],
    icon: industryIcons[i],
    title: tIndustries(`${prefix}_title`),
    description: tIndustries(`${prefix}_desc`),
    features: [
      tIndustries(`${prefix}_f1`), tIndustries(`${prefix}_f2`),
      tIndustries(`${prefix}_f3`), tIndustries(`${prefix}_f4`),
    ],
    useCases: [
      tIndustries(`${prefix}_u1`), tIndustries(`${prefix}_u2`),
      tIndustries(`${prefix}_u3`), tIndustries(`${prefix}_u4`),
      tIndustries(`${prefix}_u5`),
    ],
  }))

  // How It Works Steps
  const howItWorksSteps = [
    { step: 1, title: tProcess('step1_title'), description: tProcess('step1_desc'), icon: MessageSquare },
    { step: 2, title: tProcess('step2_title'), description: tProcess('step2_desc'), icon: Users },
    { step: 3, title: tProcess('step3_title'), description: tProcess('step3_desc'), icon: CheckCircle },
    { step: 4, title: tProcess('step4_title'), description: tProcess('step4_desc'), icon: Headphones },
  ]

  // Why Choose Cethos Features
  const whyChooseFeatures = [
    { icon: Globe, title: tWhy('f1_title'), description: tWhy('f1_desc') },
    { icon: Clock, title: tWhy('f2_title'), description: tWhy('f2_desc') },
    { icon: Zap, title: tWhy('f3_title'), description: tWhy('f3_desc') },
    { icon: Shield, title: tWhy('f4_title'), description: tWhy('f4_desc') },
    { icon: Award, title: tWhy('f5_title'), description: tWhy('f5_desc') },
    { icon: Languages, title: tWhy('f6_title'), description: tWhy('f6_desc') },
  ]

  const stats = [
    { value: tHero('stat1_value'), label: tHero('stat1_label') },
    { value: tHero('stat2_value'), label: tHero('stat2_label') },
    { value: tHero('stat3_value'), label: tHero('stat3_label') },
    { value: tHero('stat4_value'), label: tHero('stat4_label') },
  ]

  // Interpretation Modes Comparison
  const interpretationModes = [
    {
      mode: tModes('simul_name'),
      description: tModes('simul_desc'),
      speed: tModes('simul_speed'),
      equipment: tModes('simul_equip'),
      bestFor: tModes('simul_best'),
      teamSize: tModes('simul_staff'),
    },
    {
      mode: tModes('consec_name'),
      description: tModes('consec_desc'),
      speed: tModes('consec_speed'),
      equipment: tModes('consec_equip'),
      bestFor: tModes('consec_best'),
      teamSize: tModes('consec_staff'),
    },
    {
      mode: tModes('whisper_name'),
      description: tModes('whisper_desc'),
      speed: tModes('simul_speed'),
      equipment: tModes('consec_equip'),
      bestFor: tModes('whisper_best'),
      teamSize: tModes('consec_staff'),
    },
    {
      mode: tModes('relay_name'),
      description: tModes('relay_desc'),
      speed: tModes('relay_speed'),
      equipment: tModes('relay_equip'),
      bestFor: tModes('relay_best'),
      teamSize: tModes('simul_staff'),
    },
  ]

  // Equipment & Technology
  const equipmentCategories = [
    {
      icon: HeadphonesIcon,
      title: tEquip('audio_title'),
      items: [tEquip('audio_1'), tEquip('audio_2'), tEquip('audio_3'), tEquip('audio_4')],
    },
    {
      icon: Monitor,
      title: tEquip('video_title'),
      items: [tEquip('video_1'), tEquip('video_2'), tEquip('video_3'), tEquip('video_4')],
    },
    {
      icon: Wifi,
      title: tEquip('remote_title'),
      items: [tEquip('remote_1'), tEquip('remote_2'), tEquip('remote_3'), tEquip('remote_4')],
    },
  ]

  // FAQs
  const faqs = Array.from({ length: 13 }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }))

  const selectedIndustry = industries.find((ind) => ind.id === activeIndustry)

  return (
    <>
      <ServiceJsonLd
        name={tHero('jsonld_name')}
        description={tHero('jsonld_desc')}
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
                  {tHero('eyebrow')}
                </div>
                <h1 className="text-[36px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                  {tHero('heading')}
                </h1>
                <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                  {tHero('description')}
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-[#4B5563]">
                  <span className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#0891B2]" />
                    {tHero('badge_247')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#0891B2]" />
                    {tHero('badge_languages')}
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-[#0891B2]" />
                    {tHero('badge_hipaa')}
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
              <h2 className="text-2xl font-bold text-[#0C2340] mb-2">{tHero('form_heading')}</h2>
              <p className="text-slate-600 mb-6">{tHero('form_subheading')}</p>
              <InterpretationQuoteForm formLocation="interpretation-hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title={tTypes('heading')}
            subtitle={tTypes('description')}
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
                    <p className="text-sm font-semibold text-[#0C2340] mb-2">{tTypes('best_for_label')}</p>
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
            title={tIndustries('heading')}
            subtitle={tIndustries('description')}
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
                      <h4 className="font-semibold text-[#0C2340] mb-3">{tIndustries('features_label')}</h4>
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
                      <h4 className="font-semibold text-[#0C2340] mb-4">{tIndustries('usecases_label')}</h4>
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
                          {tIndustries('cta_template', { industry: selectedIndustry.title.split(' / ')[0] })}
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
            title={tProcess('heading')}
            subtitle={tProcess('description')}
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
                  {tWhy('heading')}
                </h2>
                <p className="text-white/80 text-lg mb-10">
                  {tWhy('description')}
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
            title={tModes('heading')}
            subtitle={tModes('description')}
            className="mb-12"
          />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-slate-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{tModes('col_mode')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{tModes('col_desc')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{tModes('col_speed')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{tModes('col_equipment')}</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-[#0C2340]">{tModes('col_bestfor')}</th>
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
                        mode.speed === tModes('simul_speed') ? 'bg-green-100 text-green-700' :
                        mode.speed === tModes('consec_speed') ? 'bg-yellow-100 text-yellow-700' :
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
            title={tLangs('heading')}
            subtitle={tLangs('description')}
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Popular Languages */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#0891B2]" />
                {tLangs('popular_heading')}
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
                {tLangs('indigenous_heading')}
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
                {tLangs('sign_heading')}
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
            {tLangs('footer')}
          </p>
        </Container>
      </section>

      {/* Equipment & Technology */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title={tEquip('heading')}
            subtitle={tEquip('description')}
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
            title={tFaq('heading')}
            subtitle={tFaq('description')}
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

      {/* Interpretation Across Canada */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <Container>
          <h3 className="text-xl font-bold text-[#0C2340] mb-2 text-center">{tCta('canada_heading')}</h3>
          <p className="text-slate-600 text-center mb-6">{tCta('canada_desc')}</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { label: 'Calgary', href: '/locations/calgary' },
              { label: 'Edmonton', href: '/locations/edmonton' },
              { label: 'Toronto', href: '/locations/toronto' },
              { label: 'Vancouver', href: '/locations/vancouver' },
              { label: 'Ottawa', href: '/locations/ottawa' },
              { label: 'Montreal', href: '/locations/montreal' },
              { label: 'Winnipeg', href: '/locations/winnipeg' },
              { label: 'Halifax', href: '/locations/halifax' },
              { label: 'Saskatoon', href: '/locations/saskatoon' },
            ].map((location) => (
              <Link
                key={location.href}
                href={location.href}
                className="bg-white px-5 py-2.5 rounded-lg text-gray-800 font-medium hover:bg-[#0891B2] hover:text-white transition-colors shadow-sm text-sm"
              >
                {location.label}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Related Services */}
      <section className="py-12 bg-white border-t border-slate-200">
        <Container>
          <h3 className="text-lg font-semibold text-[#0C2340] mb-4">{tCta('related_heading')}</h3>
          <div className="flex flex-wrap gap-3">
            <Link href="/services/certified" className="text-[#0891B2] hover:underline">
              {tCta('related_certified')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/services/languages" className="text-[#0891B2] hover:underline">
              {tCta('related_languages')}
            </Link>
            <span className="text-slate-300">&bull;</span>
            <Link href="/get-quote" className="text-[#0891B2] hover:underline">
              {tCta('related_quote')}
            </Link>
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
              {tCta('heading')}
            </h2>
            <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
              {tCta('description')}
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
                {tCta('cta_primary')}
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <a
                href="tel:5876000786"
                className="px-6 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                {tCta('cta_phone')}
              </a>
            </div>
            <p className="mt-8 text-white/60 text-sm">
              {tCta('footer_text')}
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
            {tCta('mobile_call')}
          </a>
          <Link
            href="#quote-form"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#quote-form')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="flex-1 px-4 py-3 bg-[#0891B2] text-white rounded-lg font-semibold text-center"
          >
            {tCta('mobile_quote')}
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
