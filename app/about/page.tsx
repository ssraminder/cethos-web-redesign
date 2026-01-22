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

const values = [
  {
    title: 'Quality First',
    description: 'We never compromise on accuracy. Every translation undergoes rigorous quality assurance.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Global Reach',
    description: 'With linguists in 150+ countries, we deliver locally relevant translations worldwide.',
    icon: GlobeNetworkIcon,
  },
  {
    title: 'Expert Team',
    description: 'Our translators are subject matter experts with years of industry experience.',
    icon: UsersIcon,
  },
  {
    title: 'Certified Excellence',
    description: 'ISO 17100 and ISO 9001 certified processes ensure consistent, reliable results.',
    icon: AwardIcon,
  },
]

const timeline = [
  { year: '2008', event: 'Founded in New York City with a focus on life sciences translation.' },
  { year: '2012', event: 'Expanded services to include certified and legal translation.' },
  { year: '2015', event: 'Opened European headquarters in London.' },
  { year: '2018', event: 'Achieved ISO 17100 certification for translation services.' },
  { year: '2020', event: 'Launched software localization and multimedia services.' },
  { year: '2023', event: 'Expanded to Asia-Pacific with Tokyo office opening.' },
]

const team = [
  { name: 'Sarah Chen', role: 'CEO & Founder', image: null },
  { name: 'Michael Torres', role: 'Chief Operations Officer', image: null },
  { name: 'Elena Volkov', role: 'VP of Quality Assurance', image: null },
  { name: 'David Park', role: 'VP of Technology', image: null },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - Light background with dark text */}
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
              className="text-xl text-[#4B5563] leading-relaxed"
            >
              For over 15 years, we&apos;ve been helping businesses communicate across cultures with precision, quality, and speed.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
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
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  Cethos was founded in 2008 with a simple mission: to bridge language barriers with precision and cultural understanding. What started as a small team of passionate linguists has grown into a global translation company serving clients in over 100 countries.
                </p>
                <p>
                  Our name comes from the Greek word &quot;κῆθος&quot; (kethos), meaning care and diligence—qualities that define everything we do. We believe that great translation is more than converting words; it&apos;s about preserving meaning, intent, and cultural nuance.
                </p>
                <p>
                  Today, we combine the expertise of 5,000+ specialized linguists with advanced technology to deliver translations that help our clients succeed in global markets.
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
              {/* Placeholder for company image */}
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <GlobeNetworkIcon size={64} className="mx-auto text-teal-600/30 mb-4" />
                  <p className="text-slate-400 text-sm">
                    [AI Image Placeholder: Diverse team of professionals collaborating in modern office space]
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
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
                {/* Timeline line */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-[39px] top-10 bottom-0 w-px bg-teal-200" />
                )}

                {/* Year badge */}
                <div className="flex-shrink-0 w-20 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center font-semibold text-sm">
                  {item.year}
                </div>

                {/* Content */}
                <div className="flex-grow pt-1">
                  <p className="text-slate-700">{item.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <SectionHeading
            title="Leadership Team"
            subtitle="Meet the people driving our mission forward."
            className="mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                {/* Placeholder for team member image */}
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                  <UsersIcon size={40} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-navy">{member.name}</h3>
                <p className="text-slate-600">{member.role}</p>
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
              { value: '15+', label: 'Years in Business' },
              { value: '5,000+', label: 'Expert Linguists' },
              { value: '100+', label: 'Countries Served' },
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

      <CTA />
    </>
  )
}
