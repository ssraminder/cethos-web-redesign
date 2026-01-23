'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  CheckCircle,
  ArrowRight,
  FileText,
  Users,
  Shield,
  Clock,
  Globe,
  Stethoscope,
  FlaskConical,
  Microscope,
  ClipboardCheck,
  FileCheck,
  MonitorPlay,
  Tablet,
  Building2,
  Video,
  Phone,
  HeartPulse
} from 'lucide-react'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'
import { FAQJsonLd, ServiceJsonLd } from '@/components/JsonLd'
import { Breadcrumbs, BreadcrumbJsonLd } from '@/components/Breadcrumbs'

const linguisticValidationSteps = [
  { step: 1, title: 'Forward Translation', description: 'Two independent native-speaking translators produce separate translations' },
  { step: 2, title: 'Reconciliation', description: 'Translations compared and synthesized into single reconciled version' },
  { step: 3, title: 'Back Translation', description: 'Reconciled version translated back to source language' },
  { step: 4, title: 'Back Translation Review', description: 'Comparison to identify conceptual discrepancies' },
  { step: 5, title: 'Cognitive Debriefing', description: 'Patient interviews to assess comprehension (5-8 per language)' },
  { step: 6, title: 'Cognitive Debriefing Review', description: 'Analysis of interview findings' },
  { step: 7, title: 'Harmonization', description: 'Final review meeting to achieve consensus' },
  { step: 8, title: 'Proofreading', description: 'Final linguistic quality check' },
  { step: 9, title: 'Final Report', description: 'Comprehensive documentation with audit trail' },
]

const instrumentTypes = [
  { name: 'PRO', full: 'Patient-Reported Outcomes', description: 'Self-reported health status, symptoms, quality of life' },
  { name: 'ClinRO', full: 'Clinician-Reported Outcomes', description: 'Healthcare provider assessments' },
  { name: 'ObsRO', full: 'Observer-Reported Outcomes', description: 'Caregiver or family member observations' },
  { name: 'PerfO', full: 'Performance Outcomes', description: 'Standardized tests and functional assessments' },
]

const therapeuticAreas = [
  'Oncology & Hematology', 'Central Nervous System', 'Cardiology', 'Dermatology',
  'Endocrinology & Diabetes', 'Gastroenterology', 'Respiratory', 'Rheumatology',
  'Ophthalmology', 'Rare Diseases', 'Pediatrics', 'Psychiatry'
]

const cdComponents = [
  'Interview Protocol Development - Customized guides aligned with ISPOR guidelines',
  'IRB/Ethics Submission Support - Documentation for regulatory approval',
  'Patient Recruitment & Screening - Qualification of patients meeting criteria',
  'Moderator Selection & Training - Native-speaking moderators with study-specific training',
  'Interview Conduct - Think-aloud or verbal probing techniques',
  'Audio/Video Recording - Complete documentation of all sessions',
  'Transcription & Translation - Verbatim transcription with English translation',
  'Systematic Analysis - Evaluation of comprehension and cultural appropriateness',
  'Comprehensive Reporting - Detailed findings and recommendations',
]

const interviewModalities = [
  { name: 'In-Person Interviews', description: 'Gold standard for complex instruments' },
  { name: 'Video Remote Interviews (VRI)', description: 'Videoconferencing for remote participants' },
  { name: 'Telephone Interviews', description: 'Cost-effective for straightforward instruments' },
]

const specializedPopulations = [
  { name: 'Pediatric (ages 5-7, 8-12, 13-17)', description: 'Age-appropriate techniques' },
  { name: 'Geriatric', description: 'Extended session times, visual accommodations' },
  { name: 'Cognitively Impaired', description: 'Simplified probing, caregiver involvement' },
  { name: 'Rare Disease', description: 'Flexible recruitment, remote options' },
  { name: 'Psychiatric & Mental Health', description: 'Crisis protocols, sensitive approaches' },
]

const clinicianServices = [
  { title: 'ClinRO Review', description: 'Clinical review of Clinician-Reported Outcome instruments' },
  { title: 'PRO Medical Review', description: 'Review of Patient-Reported Outcomes with medical terminology' },
  { title: 'Protocol & ICF Review', description: 'Medical expert review of protocols and informed consent' },
  { title: 'Regulatory Document Review', description: 'Clinical review of submissions and labeling' },
]

const clinicianQualifications = [
  'Board-certified physicians (MDs, DOs)',
  'Specialist physicians in relevant therapeutic areas',
  'Clinical researchers with trial experience',
  'Registered nurses with specialty certifications',
  'Clinical pharmacists (PharmDs)',
  'Psychologists and psychiatrists',
]

const ctdModules = [
  { module: 'Module 1', title: 'Regional Administrative Information' },
  { module: 'Module 2', title: 'Quality Overall Summary' },
  { module: 'Module 3', title: 'Quality Documentation' },
  { module: 'Module 4', title: 'Nonclinical Study Reports' },
  { module: 'Module 5', title: 'Clinical Study Reports' },
]

const regulatoryAgencies = ['FDA (USA)', 'EMA (EU)', 'Health Canada', 'MHRA (UK)', 'PMDA (Japan)', 'NMPA (China)', 'Swissmedic', 'TGA (Australia)']

const faqs = [
  {
    question: 'What is linguistic validation?',
    answer: 'Linguistic validation is the gold standard methodology for translating Clinical Outcome Assessments (COAs) used in clinical trials. It ensures conceptual equivalence across all target languages while maintaining the psychometric properties of the original instrument, following ISPOR guidelines.',
  },
  {
    question: 'How many cognitive debriefing interviews are required?',
    answer: 'ISPOR guidelines recommend 5-8 cognitive debriefing interviews per language to ensure adequate assessment of patient comprehension. For pediatric or complex populations, additional interviews may be recommended.',
  },
  {
    question: 'What regulatory agencies accept your translations?',
    answer: 'Our translations are accepted by FDA, EMA, PMDA, NMPA, Health Canada, MHRA, Swissmedic, TGA, and other regulatory agencies worldwide. We maintain ISO 17100 and ISO 9001 compliance and follow GCP guidelines.',
  },
  {
    question: 'Do you provide back translation services?',
    answer: 'Yes, back translation is a standard part of our linguistic validation process. Back translations are performed by independent translators who have not seen the original source text, ensuring an unbiased review of conceptual equivalence.',
  },
]

const breadcrumbItems = [
  { name: 'Services', url: '/services' },
  { name: 'Life Sciences', url: '/services/lifesciences' },
]

export default function LifeSciencesPageContent() {
  return (
    <>
      <ServiceJsonLd
        name="Life Sciences Translation Services"
        description="ISPOR-compliant linguistic validation, cognitive debriefing, and clinical translation services for pharmaceutical, biotech, and medical device companies."
        url="https://cethos.com/services/lifesciences"
      />
      <FAQJsonLd faqs={faqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <Breadcrumbs items={breadcrumbItems} className="mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
                LIFE SCIENCES TRANSLATION
              </div>
              <h1 className="text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6">
                End-to-End Language Services for Clinical Development
              </h1>
              <p className="text-xl text-[#4B5563] leading-relaxed mb-8">
                From linguistic validation of patient-reported outcomes to regulatory submissions and pharmacovigilance—comprehensive language solutions for the pharmaceutical, biotechnology, and medical device industries.
              </p>
              <div className="flex items-center gap-4 mb-8">
                <a href="#quote-form" className="px-6 py-4 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors text-base font-semibold flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </a>
                <Link href="/contact" className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg hover:bg-[#F8FAFC] transition-colors text-base font-semibold">
                  Contact Us
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  ISO 17100 Compliant
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  ISPOR Guidelines
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-[#0891B2]" />
                  GCP Compliant
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-[400px] h-[400px] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 rounded-2xl flex items-center justify-center">
                <FlaskConical className="w-32 h-32 text-[#0891B2]" strokeWidth={1} />
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
              { value: '5,000+', label: 'Specialized Linguists' },
              { value: '1,000+', label: 'CD Moderators' },
              { value: '300+', label: 'Medical Professionals' },
              { value: '25+', label: 'Therapeutic Areas' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Navigation */}
      <section className="py-12 bg-white border-b">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: 'Linguistic Validation', href: '#linguistic-validation' },
              { name: 'Cognitive Debriefing', href: '#cognitive-debriefing' },
              { name: 'Clinician Review', href: '#clinician-review' },
              { name: 'Clinical Trials', href: '#clinical-trials' },
              { name: 'Regulatory Affairs', href: '#regulatory-affairs' },
              { name: 'Pharmacovigilance', href: '#pharmacovigilance' },
              { name: 'eCOA Migration', href: '#ecoa' },
              { name: 'Medical Devices', href: '#medical-devices' },
              { name: 'Get a Quote', href: '#quote-form' },
            ].map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-700 rounded-lg text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* Linguistic Validation Section */}
      <section id="linguistic-validation" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <FileCheck className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Linguistic Validation Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Linguistic validation is the gold standard for translating Clinical Outcome Assessments (COAs) used in clinical trials. Our ISPOR-compliant methodology ensures conceptual equivalence across all target languages while maintaining the psychometric properties of the original instrument.
            </p>
          </div>

          <div className="mb-16">
            <h3 className="text-2xl font-bold text-[#0C2340] mb-8 text-center">Full Linguistic Validation Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {linguisticValidationSteps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white border border-slate-200 rounded-lg p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0C2340] mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Applicable Instruments</h3>
              <div className="space-y-4">
                {instrumentTypes.map((type) => (
                  <Card key={type.name} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-teal-600 font-bold text-sm">{type.name}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#0C2340]">{type.full}</h4>
                        <p className="text-sm text-slate-600">{type.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Therapeutic Areas Supported (25+)</h3>
              <div className="flex flex-wrap gap-2">
                {therapeuticAreas.map((area) => (
                  <span key={area} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm">
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500">And many more specialized therapeutic areas</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Cognitive Debriefing Section */}
      <section id="cognitive-debriefing" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Cognitive Debriefing Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              We maintain a global network of 1,000+ trained moderators across 150+ languages to deliver comprehensive cognitive debriefing services that protect clinical research data pools and ensure regulatory compliance.
            </p>
            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-amber-800 font-medium">
                The US FDA and EMA require cognitive debriefing to demonstrate content validity for submitted translations.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#0C2340] mb-8">Full Service Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cdComponents.map((component, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-slate-200">
                  <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700">{component}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Interview Modalities</h3>
              <div className="space-y-4">
                {interviewModalities.map((modality) => (
                  <Card key={modality.name} className="p-4">
                    <h4 className="font-semibold text-[#0C2340] mb-1">{modality.name}</h4>
                    <p className="text-sm text-slate-600">{modality.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Specialized Populations</h3>
              <div className="space-y-4">
                {specializedPopulations.map((pop) => (
                  <Card key={pop.name} className="p-4">
                    <h4 className="font-semibold text-[#0C2340] mb-1">{pop.name}</h4>
                    <p className="text-sm text-slate-600">{pop.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Clinician Review Section */}
      <section id="clinician-review" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <Stethoscope className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Clinician Review Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Our global network of 300+ medical professionals across 25+ therapeutic areas provides expert clinical review of translated content.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Services</h3>
              <div className="space-y-4">
                {clinicianServices.map((service) => (
                  <Card key={service.title} className="p-4">
                    <h4 className="font-semibold text-[#0C2340] mb-1">{service.title}</h4>
                    <p className="text-sm text-slate-600">{service.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Clinician Qualifications</h3>
              <div className="space-y-3">
                {clinicianQualifications.map((qual, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700">{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Clinical Trial Documentation Section */}
      <section id="clinical-trials" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Clinical Trial Documentation
            </h2>
            <p className="text-lg text-[#4B5563]">
              We translate the full spectrum of clinical trial documentation to support global studies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <FileText className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Protocol-Related Documents</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Clinical Trial Protocols - Study design, procedures, endpoints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Investigator Brochures - Drug/device information for investigators</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Case Report Forms - CRFs/eCRFs for data collection</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Users className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Patient-Facing Documents</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Informed Consent Forms (ICFs) - Main consent, assent forms, amendments</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Patient Information Materials - Information sheets, visit schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Patient Recruitment Materials - Advertisements, flyers, website content</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6">
              <Building2 className="w-10 h-10 text-teal-600 mb-4" />
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Site Documentation</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Investigator meeting presentations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Site initiation visit materials</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Protocol training decks & E-learning modules</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-1" />
                  <span>Site operations manuals</span>
                </li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Regulatory Affairs Section */}
      <section id="regulatory-affairs" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Regulatory Affairs Translation
            </h2>
            <p className="text-lg text-[#4B5563]">
              Regulatory translation for drug, biologic, and medical device submissions worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">CTD Module Translation</h3>
              <div className="space-y-3">
                {ctdModules.map((module) => (
                  <div key={module.module} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <span className="px-3 py-1 bg-teal-600 text-white text-sm font-semibold rounded">{module.module}</span>
                    <span className="text-slate-700">{module.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#0C2340] mb-6">Product Labeling</h3>
              <div className="space-y-4">
                <Card className="p-4">
                  <h4 className="font-semibold text-[#0C2340] mb-1">SmPC (Summary of Product Characteristics)</h4>
                  <p className="text-sm text-slate-600">EU market authorization documentation</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold text-[#0C2340] mb-1">PILs (Patient Information Leaflets)</h4>
                  <p className="text-sm text-slate-600">Accessible patient language</p>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold text-[#0C2340] mb-1">IMP Labels</h4>
                  <p className="text-sm text-slate-600">Investigational medicinal product labeling</p>
                </Card>
              </div>
            </div>
          </div>

          <div className="bg-[#0C2340] rounded-2xl p-8">
            <h3 className="text-xl font-bold text-white mb-6 text-center">Regulatory Agencies Supported</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {regulatoryAgencies.map((agency) => (
                <span key={agency} className="px-4 py-2 bg-white/10 text-white rounded-lg text-sm">
                  {agency}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Pharmacovigilance Section */}
      <section id="pharmacovigilance" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <HeartPulse className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Pharmacovigilance Translation
            </h2>
            <p className="text-lg text-[#4B5563]">
              Dedicated PV translation services with rapid turnaround and strict regulatory compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Adverse Event Reporting</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Individual Case Safety Reports (ICSRs)</li>
                <li>Serious Adverse Event (SAE) reports</li>
                <li>Follow-up reports</li>
                <li>Medical history summaries</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Aggregate Safety Reports</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Periodic Safety Update Reports (PSURs)</li>
                <li>Development Safety Update Reports (DSURs)</li>
                <li>Periodic Benefit-Risk Evaluation Reports (PBRERs)</li>
                <li>Risk Management Plans (RMPs)</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Additional Services</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Medical literature translation</li>
                <li>Dear Healthcare Provider letters</li>
                <li>Safety communication letters</li>
                <li>Signal detection reports</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* eCOA Migration Section */}
      <section id="ecoa" className="section-padding">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <Tablet className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              eCOA Migration Services
            </h2>
            <p className="text-lg text-[#4B5563]">
              Electronic Clinical Outcome Assessment migration adapts paper-based instruments for electronic administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Platform Translation', description: 'UI strings, navigation, error messages' },
              { title: 'Screenshot Review', description: 'Verify correct display across devices' },
              { title: 'Audio Recording', description: 'Professional recording for IVRS systems' },
              { title: 'Format Localization', description: 'Date, time, and number format adaptation' },
            ].map((service) => (
              <Card key={service.title} className="p-6 text-center">
                <MonitorPlay className="w-10 h-10 text-teal-600 mx-auto mb-4" />
                <h3 className="font-semibold text-[#0C2340] mb-2">{service.title}</h3>
                <p className="text-sm text-slate-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Medical Device Section */}
      <section id="medical-devices" className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <Microscope className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Medical Device & IVD Translation
            </h2>
            <p className="text-lg text-[#4B5563]">
              Specialized translation for EU MDR/IVDR compliance and global medical device markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Device Documentation</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Instructions for Use (IFUs)</li>
                <li>User manuals and operator guides</li>
                <li>Quick start guides</li>
                <li>Technical specifications</li>
                <li>Training materials</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Device Labeling</h3>
              <ul className="space-y-2 text-slate-600">
                <li>Primary device labels</li>
                <li>Secondary packaging</li>
                <li>UDI (Unique Device Identification) labels</li>
                <li>Warning and caution labels</li>
              </ul>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold text-[#0C2340] mb-4">Regulatory Compliance</h3>
              <ul className="space-y-2 text-slate-600">
                <li>EU MDR (Medical Device Regulation)</li>
                <li>EU IVDR (In Vitro Diagnostic Regulation)</li>
                <li>FDA 510(k) and PMA documentation</li>
                <li>Clinical evaluation reports</li>
              </ul>
            </Card>
          </div>
        </Container>
      </section>

      {/* Quote Request Form Section */}
      <section id="quote-form" className="section-padding bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <Container size="md">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-[40px] font-bold text-[#0C2340] mb-4">
              Request a Quote
            </h2>
            <p className="text-lg text-[#4B5563]">
              Tell us about your project and receive a detailed quote within 2 hours during business hours.
            </p>
          </div>
          <LifeSciencesQuoteForm />
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Common questions about our life sciences translation services."
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
