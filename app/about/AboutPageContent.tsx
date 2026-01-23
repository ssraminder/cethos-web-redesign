'use client'

import { motion } from 'framer-motion'
import { Container, Card, SectionHeading } from '@/components/ui'
import { CTA } from '@/components/sections'
import {
  GlobeNetworkIcon,
  ShieldCheckIcon,
  UsersIcon,
  AwardIcon,
  CheckIcon,
} from '@/components/icons'
import { Shield, FileCheck, Globe, Award, Users, Building } from 'lucide-react'

const values = [
  {
    title: 'Quality First',
    description: 'We never compromise on accuracy. Every translation undergoes rigorous quality assurance through our 15 core SOPs.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Global Reach',
    description: 'With linguists in 150+ countries, we deliver locally relevant translations worldwide.',
    icon: GlobeNetworkIcon,
  },
  {
    title: 'Expert Team',
    description: 'Our translators are subject matter experts with years of industry experience in life sciences and clinical research.',
    icon: UsersIcon,
  },
  {
    title: 'Regulatory Compliance',
    description: 'ISO 17100, ISO 9001, GCP, and ISPOR compliant processes ensure regulatory acceptance.',
    icon: AwardIcon,
  },
]

const timeline = [
  { year: '2015', event: 'Founded in Calgary, Canada with a focus on life sciences translation and linguistic validation.' },
  { year: '2017', event: 'Expanded services to include certified translation and cognitive debriefing services.' },
  { year: '2019', event: 'Opened Dubai, UAE office to serve Middle East and APAC markets.' },
  { year: '2021', event: 'Achieved ISO 17100 and ISO 9001 compliance. Launched comprehensive regulatory translation services.' },
  { year: '2023', event: 'Expanded cognitive debriefing network to 1,000+ moderators across 150+ languages.' },
  { year: '2024', event: 'Expanded to India with Patiala office opening. Launched eCOA migration services.' },
]

const complianceStandards = [
  { name: 'ISO 17100', description: 'Translation Services Requirements' },
  { name: 'ISO 9001', description: 'Quality Management Systems' },
  { name: 'GCP Compliant', description: 'Good Clinical Practice' },
  { name: 'ISPOR Guidelines', description: 'Linguistic Validation Standards' },
  { name: '21 CFR Part 11', description: 'Electronic Records Awareness' },
  { name: 'GDPR & PIPEDA', description: 'Data Protection Compliance' },
]

export default function AboutPageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
            >
              About Cethos
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-semibold text-[#0891B2] mb-4"
            >
              Global Communication. Local Precision.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[#4B5563] leading-relaxed"
            >
              Calgary-based language services company specializing in linguistic validation, clinical translation, and comprehensive language solutions for the life sciences industry.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Overview Section */}
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
                Who We Are
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Cethos Solutions Inc. is a Calgary-based language services company specializing in linguistic validation, clinical translation, and comprehensive language solutions for the pharmaceutical, biotechnology, and medical device industries.
                </p>
                <p>
                  Founded in 2015, we operate through a unique partnership structure delivering end-to-end language services that support global clinical trials and product commercialization.
                </p>
                <p>
                  Our expertise spans the entire clinical development lifecycle—from early-phase trials requiring linguistic validation of patient-reported outcomes to post-market regulatory submissions and pharmacovigilance documentation.
                </p>
                <p>
                  Today, we combine the expertise of 5,000+ specialized linguists, 1,000+ cognitive debriefing moderators, and 300+ medical professionals to deliver translations that meet the highest regulatory standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <GlobeNetworkIcon size={64} className="mx-auto text-teal-600/30 mb-4" />
                  <p className="text-slate-400 text-sm">
                    [Company Image Placeholder]
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Leadership Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Leadership"
            subtitle="Meet the team driving our mission forward."
            className="mb-16"
          />

          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <Users className="w-16 h-16 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">Raminder Shah</h3>
              <p className="text-teal-600 font-medium mb-4">Founder & CEO</p>
              <p className="text-slate-600">
                With extensive experience in the language services industry, Raminder founded Cethos to address the specialized translation needs of the life sciences sector, bringing a commitment to quality and regulatory compliance.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Quality & Compliance Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Quality & Compliance"
            subtitle="Rigorous standards compliant with international requirements."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={standard.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{standard.name}</h3>
                      <p className="text-sm text-slate-600">{standard.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#0C2340] rounded-2xl p-8 text-center"
          >
            <FileCheck className="w-12 h-12 text-teal-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">15 Core Standard Operating Procedures</h3>
            <p className="text-white/70 max-w-2xl mx-auto">
              Quality is maintained through comprehensive SOPs covering all aspects of service delivery, from project intake and translator qualification to quality assurance and final delivery.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Our Values"
            subtitle="The principles that guide everything we do."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="h-full text-center">
                  <div className="icon-container-lg mx-auto mb-6">
                    <value.icon size={32} />
                  </div>
                  <h3 className="text-lg font-semibold text-navy mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline Section */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Our Journey"
            subtitle="Key milestones in our growth story."
            className="mb-16"
          />

          <div className="max-w-3xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6 pb-8 last:pb-0"
              >
                {index < timeline.length - 1 && (
                  <div className="absolute left-[39px] top-10 bottom-0 w-px bg-teal-200" />
                )}

                <div className="flex-shrink-0 w-20 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-sm">
                  {item.year}
                </div>

                <div className="flex-grow pt-1">
                  <p className="text-slate-700">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-navy">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,000+', label: 'Expert Linguists' },
              { value: '1,000+', label: 'CD Moderators' },
              { value: '300+', label: 'Medical Professionals' },
              { value: '200+', label: 'Languages' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Global Presence */}
      <section className="section-padding">
        <Container>
          <SectionHeading
            title="Global Presence"
            subtitle="Offices strategically located to serve clients worldwide."
            className="mb-16"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                city: 'Calgary, Canada',
                type: 'Headquarters',
                address: '421 7 Avenue SW, Floor 30\nCalgary, AB T2P 4K9',
              },
              {
                city: 'Dubai, UAE',
                type: 'Middle East Office',
                address: 'Building A1, Dubai Digital Park\nDubai Silicon Oasis',
              },
              {
                city: 'Patiala, India',
                type: 'Asia Office',
                address: '158/3, Dharampura Bazaar\nPatiala 147001, Punjab',
              },
            ].map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <Building className="w-10 h-10 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-navy text-lg mb-1">{office.city}</h3>
                  <p className="text-teal-600 text-sm font-medium mb-3">{office.type}</p>
                  <p className="text-slate-600 text-sm whitespace-pre-line">{office.address}</p>
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
