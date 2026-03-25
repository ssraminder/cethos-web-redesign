import { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Subtitles,
  Mic,
  Video,
  GraduationCap,
  FileAudio,
  CheckSquare,
  BadgeCheck,
  Globe,
  Languages,
  CheckCircle,
} from 'lucide-react'
import TrustedByLogos from '@/components/TrustedByLogos'
import { ServiceJsonLd } from '@/components/JsonLd'
import { BreadcrumbJsonLd } from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Multimedia Translation Services | Cethos Solutions Inc.',
  description:
    'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
  alternates: {
    canonical: 'https://cethos.com/services/multimedia',
  },
  openGraph: {
    title: 'Multimedia Translation Services | Cethos Solutions Inc.',
    description:
      'Video subtitling, voiceover, dubbing, and multimedia adaptation services for global content reach. Professional multimedia localization in 200+ languages.',
    url: 'https://cethos.com/services/multimedia',
    siteName: 'Cethos Solutions Inc.',
    locale: 'en_CA',
    type: 'website',
  },
}

const services = [
  {
    icon: Subtitles,
    title: 'Subtitling & Captioning',
    description:
      'Professional subtitling and closed captioning in 200+ languages. SRT, VTT, and broadcast-format delivery with precise timing and readability standards.',
  },
  {
    icon: Mic,
    title: 'Voiceover & Dubbing',
    description:
      'Native-speaking voice talent for dubbing, voiceover, and narration. Lip-sync dubbing, UN-style voiceover, and creative adaptation for any content type.',
  },
  {
    icon: Video,
    title: 'Video Localization',
    description:
      'End-to-end video localization including on-screen text translation, graphics adaptation, and cultural customization for global audiences.',
  },
  {
    icon: GraduationCap,
    title: 'eLearning Localization',
    description:
      'Localize training videos, interactive modules, and educational content. SCORM-compliant delivery with multimedia adaptation for global learners.',
  },
  {
    icon: FileAudio,
    title: 'Audio Transcription & Translation',
    description:
      'Accurate transcription of audio and video content followed by professional translation. Meeting recordings, podcasts, interviews, and more.',
  },
  {
    icon: CheckSquare,
    title: 'Multimedia QA',
    description:
      'Comprehensive quality assurance for all multimedia deliverables. Timing validation, linguistic review, and technical compliance checks.',
  },
]

const trustSignals = [
  { icon: Languages, label: '200+ Languages' },
  { icon: Globe, label: 'Global Voice Talent' },
  { icon: BadgeCheck, label: 'Broadcast Quality' },
]

export default function MultimediaTranslationPage() {
  return (
    <>
      <ServiceJsonLd
        name="Multimedia Translation Services"
        description="Video subtitling, voiceover, dubbing, eLearning localization, and multimedia adaptation services in 200+ languages."
        url="https://cethos.com/services/multimedia"
      />
      <BreadcrumbJsonLd items={[
        { name: 'Services', url: 'https://cethos.com/services' },
        { name: 'Multimedia Translation', url: 'https://cethos.com/services/multimedia' },
      ]} />
      {/* HERO SECTION */}
      <section className="pt-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-4xl">
            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4">
              MULTIMEDIA TRANSLATION
            </div>

            <h1 className="text-[40px] md:text-[52px] font-bold text-white leading-[1.1] mb-6">
              Multimedia Translation & Localization
            </h1>

            <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl">
              Video subtitling, voiceover, dubbing, and multimedia adaptation
              services for global content reach.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors flex items-center gap-2"
              >
                Get a Multimedia Quote <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm text-white/70">
              {trustSignals.map((signal) => (
                <span key={signal.label} className="flex items-center gap-2">
                  <signal.icon className="w-5 h-5 text-[#0891B2]" />
                  {signal.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Our Multimedia Localization Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive multimedia translation and adaptation for video,
              audio, eLearning, and interactive content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="p-6 bg-slate-50 rounded-xl border border-slate-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-[#0891B2]/10 flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-[#0891B2]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">
              Why Choose Cethos for Multimedia Localization
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We combine linguistic expertise with multimedia production
              capabilities for seamless localized content.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Native Voice Talent Network',
                description:
                  'Access our global network of professional voice actors and narrators who deliver authentic, culturally appropriate performances in every language.',
              },
              {
                title: 'Broadcast-Quality Output',
                description:
                  'All deliverables meet broadcast and streaming platform standards. We handle format conversion, encoding, and platform-specific requirements.',
              },
              {
                title: 'End-to-End Production',
                description:
                  'From script translation to final mastering, we manage the complete multimedia localization workflow so you receive ready-to-publish content.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-[#0891B2] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED BY LOGOS */}
      <TrustedByLogos />

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#164e63]">
        <div className="max-w-[1200px] mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Localize Your Multimedia Content?
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Get a free quote for your video, audio, or eLearning localization
            project. We deliver broadcast-quality results in 200+ languages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#0891B2] text-white rounded-lg font-semibold text-lg hover:bg-[#06B6D4] transition-colors"
            >
              Get a Multimedia Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
