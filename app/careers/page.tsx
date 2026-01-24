import { Metadata } from 'next'
import Link from 'next/link'
import { Briefcase, Globe, TrendingUp, Heart, Layers, MapPin, Clock, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Careers | Cethos',
  description: 'Join our global team of language professionals. Explore career opportunities at Cethos Solutions Inc. in translation, project management, quality assurance, and more.',
  keywords: ['translation careers', 'language jobs', 'translator positions', 'localization careers', 'remote translation jobs'],
  alternates: {
    canonical: 'https://cethos.com/careers',
  },
  openGraph: {
    title: 'Careers | Cethos',
    description: 'Join our global team of language professionals. Explore career opportunities at Cethos Solutions Inc.',
    url: 'https://cethos.com/careers',
    siteName: 'Cethos Solutions Inc.',
    type: 'website',
  },
}

const benefits = [
  {
    icon: Globe,
    title: 'Remote Flexibility',
    description: 'Work from anywhere in the world. We embrace remote work and flexible schedules to support your work-life balance.',
  },
  {
    icon: TrendingUp,
    title: 'Professional Growth',
    description: 'Access continuous learning opportunities, certifications, and career advancement paths in the language industry.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health benefits, wellness programs, and mental health support for full-time employees.',
  },
  {
    icon: Layers,
    title: 'Diverse Projects',
    description: 'Work on exciting projects across industries including life sciences, legal, technology, and more.',
  },
]

const positions = [
  {
    title: 'Senior Medical Translator (German)',
    department: 'Life Sciences',
    location: 'Remote',
    type: 'Contract',
  },
  {
    title: 'Project Manager',
    department: 'Operations',
    location: 'Calgary, AB',
    type: 'Full-time',
  },
  {
    title: 'Linguistic Validator (Spanish)',
    department: 'Life Sciences',
    location: 'Remote',
    type: 'Contract',
  },
  {
    title: 'Quality Assurance Specialist',
    department: 'Quality',
    location: 'Dubai, UAE',
    type: 'Full-time',
  },
]

export default function CareersPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-[#06B6D4] text-sm font-semibold uppercase tracking-widest mb-4">
              Careers
            </p>
            <h1 className="text-[48px] font-bold text-white leading-[1.1] mb-6">
              Join Our Global Team
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Be part of a team that bridges languages and cultures. At Cethos, we connect the world through expert translation and localization services.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#positions"
                className="inline-flex items-center justify-center px-6 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                View Open Positions
              </a>
              <a
                href="#freelance"
                className="inline-flex items-center justify-center px-6 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Freelance Opportunities
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
              Why Work With Us
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              We offer more than just jobs—we offer careers built on growth, flexibility, and meaningful work.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-[#F8FAFC] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-[#0891B2]/10 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
                  {benefit.title}
                </h3>
                <p className="text-[#4B5563]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-[#4B5563] max-w-2xl mx-auto">
              Explore our current openings and find the perfect opportunity to advance your career.
            </p>
          </div>
          <div className="space-y-4">
            {positions.map((position) => (
              <div
                key={position.title}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-[#0C2340] mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-[#4B5563]">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {position.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {position.type}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@cethos.com?subject=Application: ${position.title}`}
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors whitespace-nowrap"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Freelance Linguists Section */}
      <section id="freelance" className="py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="bg-gradient-to-br from-[#0C2340] to-[#1a3a5c] rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-8 h-8 text-[#06B6D4]" />
            </div>
            <h2 className="text-[36px] font-bold text-white mb-4">
              Freelance Linguists
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Are you a professional translator, interpreter, or language specialist? Join our network of freelance linguists and work on diverse projects from clients around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:linguists@cethos.com?subject=Freelance Linguist Application"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                Join Our Network
              </a>
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Send your CV and language combinations to linguists@cethos.com
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <h2 className="text-[36px] font-bold text-[#0C2340] mb-4">
            Have Questions?
          </h2>
          <p className="text-lg text-[#4B5563] mb-8">
            Our HR team is here to help you with any questions about careers at Cethos.
          </p>
          <div className="bg-gray-50 rounded-xl p-8 inline-block">
            <p className="text-[#4B5563] mb-2">Contact our careers team:</p>
            <a
              href="mailto:careers@cethos.com"
              className="text-xl font-semibold text-[#0891B2] hover:text-[#06B6D4] transition-colors"
            >
              careers@cethos.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
