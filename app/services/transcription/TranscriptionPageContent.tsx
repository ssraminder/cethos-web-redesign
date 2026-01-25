'use client';

import { useState } from 'react';
import Link from 'next/link';
import TranscriptionQuoteForm from '@/components/forms/TranscriptionQuoteForm';

// Service type data
const SERVICE_TYPES = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    title: 'Legal Transcription',
    description: 'Court-certified transcripts for depositions, hearings, trials, arbitration, witness statements, and legal dictation. Verbatim accuracy with legal formatting.',
    features: ['Court hearings & trials', 'Depositions & examinations', 'Arbitration & mediation', 'Witness statements', 'Surveillance audio'],
    badge: 'Most Popular',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Medical Transcription',
    description: 'HIPAA-compliant transcription for clinical notes, IME reports, medical-legal documentation, operative notes, and psychiatric evaluations.',
    features: ['Clinical notes & dictation', 'IME & medical-legal reports', 'Operative notes', 'Radiology & pathology', 'Mental health records'],
    badge: null,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Business & Corporate',
    description: 'Professional transcription for board meetings, earnings calls, executive interviews, training sessions, and corporate communications.',
    features: ['Board meetings', 'Conference calls', 'Focus groups', 'Executive interviews', 'Training sessions'],
    badge: null,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Academic & Research',
    description: 'Accurate transcription for research interviews, focus groups, dissertations, oral histories, and qualitative research with speaker identification.',
    features: ['Research interviews', 'Focus groups', 'Dissertation materials', 'Lectures & seminars', 'Oral histories'],
    badge: null,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    title: 'Media & Podcast',
    description: 'Transform audio content into searchable text for podcasts, YouTube videos, documentaries, webinars, and marketing content.',
    features: ['Podcast episodes', 'YouTube videos', 'Documentaries', 'Webinars', 'Marketing content'],
    badge: null,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Insurance & Claims',
    description: 'Detailed transcription for recorded statements, examinations under oath, claims interviews, and SIU investigations.',
    features: ['Recorded statements', 'Examinations under oath', 'Claims interviews', 'SIU investigations', 'Fraud investigations'],
    badge: null,
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
      </svg>
    ),
    title: 'Transcription + Translation',
    description: 'Complete solution: transcribe audio/video in the source language, then translate the transcript into your target language(s).',
    features: ['Transcription in any language', 'Translation to 200+ languages', 'Certified translations available', 'Multilingual speakers', 'Global content creation'],
    badge: 'Bundle & Save',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'AI-Powered Transcription',
    description: 'Fast, affordable AI transcription with human quality review. Perfect for high-volume projects with quick turnaround needs.',
    features: ['Automated speech recognition', 'Human quality review', '50% faster turnaround', 'Cost-effective pricing', 'Scalable for volume'],
    badge: 'Coming Soon',
    comingSoon: true,
  },
];

// Legal transcription services detail
const LEGAL_SERVICES = [
  { name: 'Depositions & Examinations', description: 'Verbatim transcripts with speaker identification and legal formatting' },
  { name: 'Court Hearings & Trials', description: 'Official transcripts with timestamps, line numbers, and case information' },
  { name: 'Arbitration & Mediation', description: 'Complete records of ADR proceedings for legal reference' },
  { name: 'Witness Statements & Interviews', description: 'Police statements, investigative interviews, and sworn testimony' },
  { name: 'Legal Dictation', description: 'Attorney memos, letters, briefs, pleadings, and case notes' },
  { name: 'Surveillance & Wiretaps', description: 'Audio evidence transcription for legal proceedings' },
  { name: 'Administrative Hearings', description: 'Regulatory hearings, government agencies, and tribunals' },
  { name: 'Workers\' Compensation', description: 'Medical-legal transcription, IME reports, and disability hearings' },
];

// Transcription styles
const TRANSCRIPTION_STYLES = [
  {
    style: 'Verbatim',
    description: 'Every word transcribed exactly as spoken, including fillers (um, uh), false starts, stutters, and non-verbal sounds.',
    bestFor: 'Legal depositions, research interviews, psychological evaluations',
    rate: 'Standard',
  },
  {
    style: 'Clean Verbatim',
    description: 'Edited for readability—removes fillers, corrects false starts, but maintains the speaker\'s intent and meaning.',
    bestFor: 'Business meetings, podcasts, marketing content',
    rate: 'Standard',
  },
  {
    style: 'Intelligent Verbatim',
    description: 'Summarized with key points, action items, and organized by topic. A polished, concise version of the content.',
    bestFor: 'Meeting minutes, executive briefings',
    rate: 'Premium',
  },
];

// Industry data
const INDUSTRIES = [
  {
    id: 'legal',
    title: 'Legal & Law Enforcement',
    description: 'Court-certified transcription for the legal profession with verbatim accuracy and proper formatting.',
    services: [
      'Depositions & examinations',
      'Court hearings & trials',
      'Arbitration & mediation',
      'Witness interviews & statements',
      '911 calls & emergency recordings',
      'Body camera footage',
      'Wiretap & surveillance audio',
      'Administrative hearings',
    ],
    compliance: 'Court-certified transcripts, verbatim accuracy, legal terminology expertise, chain of custody documentation.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    description: 'HIPAA-compliant medical transcription with specialized terminology knowledge.',
    services: [
      'Clinical notes & dictation',
      'Independent Medical Examinations (IME)',
      'Medical-legal reports',
      'Psychiatric evaluations',
      'Operative notes',
      'Radiology & pathology reports',
      'Medical conferences',
      'Telemedicine recordings',
    ],
    compliance: 'HIPAA-compliant, medical terminology expertise, BAA available, secure file handling.',
  },
  {
    id: 'business',
    title: 'Business & Corporate',
    description: 'Professional transcription for corporate communications and documentation.',
    services: [
      'Board meetings',
      'Shareholder meetings',
      'Earnings calls',
      'Focus groups',
      'Executive interviews',
      'Training sessions',
      'HR investigations',
      'Compliance recordings',
    ],
    compliance: 'Regulatory compliance support, searchable archives, confidentiality agreements.',
  },
  {
    id: 'academic',
    title: 'Academic & Research',
    description: 'Accurate transcription supporting qualitative research and academic work.',
    services: [
      'Research interviews',
      'Focus groups',
      'Oral history projects',
      'Dissertation research',
      'Lecture recordings',
      'Conference presentations',
      'Ethnographic fieldwork',
      'Survey responses',
    ],
    compliance: 'Speaker identification, timestamps for coding software, confidential handling of research data.',
  },
  {
    id: 'media',
    title: 'Media & Entertainment',
    description: 'Transform audio and video content into searchable, repurposable text.',
    services: [
      'Podcast episodes',
      'YouTube videos',
      'Documentary interviews',
      'Broadcast news',
      'Film & TV production',
      'Webinars',
      'Social media content',
      'Marketing materials',
    ],
    compliance: 'SEO optimization, captions/subtitles, content repurposing support.',
  },
  {
    id: 'insurance',
    title: 'Insurance & Financial',
    description: 'Detailed transcription for claims processing and investigations.',
    services: [
      'Recorded statements',
      'Examinations Under Oath (EUO)',
      'Claims interviews',
      'SIU investigations',
      'Earnings calls',
      'Compliance recordings',
      'Customer service calls',
      'Fraud investigations',
    ],
    compliance: 'Claims processing support, audit-ready records, confidentiality compliance.',
  },
];

// Pricing data
const PRICING = [
  { level: 'Standard', turnaround: '3-5 business days', price: 'Starting at $1.50/min' },
  { level: 'Rush', turnaround: '24-48 hours', price: 'Starting at $2.25/min' },
  { level: 'Same-Day', turnaround: 'By end of day (submit before 10 AM MST)', price: 'Starting at $3.00/min' },
  { level: 'Overnight', turnaround: 'Next morning', price: 'Starting at $2.75/min' },
];

const PRICING_EXTRAS = [
  { name: 'Verbatim transcription', price: 'Included' },
  { name: 'Time-stamping', price: '+$0.25/min' },
  { name: 'Speaker identification', price: 'Included' },
  { name: 'Difficult audio quality', price: '+$0.50/min' },
  { name: 'Legal formatting', price: '+$0.25/min' },
  { name: 'Transcription + Translation bundle', price: 'From $3.50/min*' },
  { name: 'Certified translation (if needed)', price: '+$0.065/word' },
];

const VOLUME_DISCOUNTS = [
  { volume: '10+ hours', discount: '10% off' },
  { volume: '50+ hours', discount: '15% off' },
  { volume: '100+ hours', discount: '20% off' },
  { volume: 'Ongoing contracts', discount: 'Custom pricing' },
];

// FAQ data
const FAQS = [
  {
    question: "What's the difference between transcription and court reporting?",
    answer: "Court reporters create real-time transcripts during live proceedings using stenography equipment, while transcriptionists work from audio or video recordings after the fact. Transcription is typically more cost-effective (25-50% less than live court reporters) and offers greater flexibility, though it requires recordings to be made separately. We provide court-certified transcripts that are accepted by courts.",
  },
  {
    question: "Are your transcripts court-certified?",
    answer: "Yes. Our legal transcriptionists provide court-certified transcripts that are accepted by courts across Canada and the United States. Each transcript includes a certification statement attesting to its accuracy and completeness.",
  },
  {
    question: "What accuracy rate do you guarantee?",
    answer: "We guarantee 99%+ accuracy for all transcripts. Our human transcriptionists (not AI) undergo rigorous training and quality checks. Each transcript goes through a multi-step QC process including proofreading and accuracy verification.",
  },
  {
    question: "What if the audio quality is poor?",
    answer: "We can work with difficult audio, though poor quality may affect turnaround time and cost. We use professional audio enhancement tools and experienced transcriptionists who specialize in challenging recordings. We'll let you know if any portions are inaudible and mark them accordingly.",
  },
  {
    question: "How do I send my files?",
    answer: "You can upload files directly through our secure portal (up to 500MB), share via Dropbox or Google Drive links, use SFTP for large files, or mail physical media (cassettes, DVDs). All transfers are encrypted and secure.",
  },
  {
    question: "Do you transcribe languages other than English?",
    answer: "Yes, we offer transcription in 200+ languages. We also offer a Transcription + Translation bundle—transcribe your audio in the source language, then translate the transcript to your target language(s). This is ideal for international depositions, multilingual research, and global content. Bundle pricing starts at $3.50/min depending on language pair.",
  },
  {
    question: "What is the Transcription + Translation bundle?",
    answer: "Our bundle service transcribes your audio/video in the original language and then translates the transcript into one or more target languages. Perfect for: international legal depositions, multilingual research interviews, global podcast distribution, and immigration documentation. You get both the source-language transcript and translated versions. Pricing varies by language pair—common languages start at $3.50/min; rare languages may cost more.",
  },
  {
    question: "Do you offer AI-powered transcription?",
    answer: "We are launching an AI-powered transcription service soon. It will combine automated speech recognition with human quality review for fast, affordable transcription—ideal for high-volume projects with quick turnaround needs. Contact us to be notified when this service launches or to discuss your volume needs.",
  },
  {
    question: "How do you handle confidentiality?",
    answer: "All transcriptionists sign NDAs and undergo background checks. We use 256-bit SSL encryption for file transfers, secure access-controlled storage, and strict data retention policies. For medical transcription, we are HIPAA-compliant and can execute a BAA.",
  },
  {
    question: "What turnaround options are available?",
    answer: "Standard: 3-5 business days. Rush: 24-48 hours. Same-day: submit before 10 AM MST. Overnight: next morning. Turnaround depends on audio length and quality. We'll confirm delivery time with your quote.",
  },
  {
    question: "Do you offer volume discounts?",
    answer: "Yes. 10+ hours: 10% off. 50+ hours: 15% off. 100+ hours: 20% off. For ongoing contracts and high-volume clients, we offer custom pricing. Contact us to discuss your needs.",
  },
  {
    question: "Can you sync transcripts to video for trial software?",
    answer: "Yes. We can provide transcripts synced to video for use with trial presentation software like Trial Director, Sanction, and others. We also offer condensed transcripts, keyword indexes, and exhibit linking.",
  },
];

export default function TranscriptionPageContent() {
  const [activeIndustry, setActiveIndustry] = useState('legal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const activeIndustryData = INDUSTRIES.find(ind => ind.id === activeIndustry);

  return (
    <main>
      {/* HERO SECTION */}
      <section id="top" className="relative bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2] min-h-[750px] lg:min-h-[700px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-white">Transcription Services</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                <svg className="w-4 h-4 mr-2 text-[#06B6D4]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Legal Transcription Specialists
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Professional Transcription Services
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                99%+ accuracy transcription for legal, medical, business, and academic needs.
                Court-certified transcripts from human transcriptionists—not AI. Available in 200+ languages.
              </p>

              {/* Key Benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {[
                  '99%+ Accuracy',
                  'Court-Certified',
                  '24-Hour Rush',
                  'HIPAA Compliant',
                  'ISO 17100',
                  '200+ Languages',
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#06B6D4] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Trust Bar */}
              <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-300">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-white">25-50%</span> Less Than Court Reporters
                </span>
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-white">50+</span> File Formats
                </span>
              </div>

              {/* Phone CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="tel:+15876000786"
                  className="inline-flex items-center gap-2 text-white hover:text-[#06B6D4] transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-lg font-semibold">(587) 600-0786</span>
                </a>
                <span className="text-gray-400 text-sm">Most quotes delivered within 1 hour</span>
              </div>
            </div>

            {/* Right Column - Quote Form */}
            <div className="lg:sticky lg:top-24">
              <TranscriptionQuoteForm />
            </div>
          </div>
        </div>
      </section>

      {/* LEGAL TRANSCRIPTION HIGHLIGHT SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#0C2340]/5 to-transparent border-l-4 border-[#0891B2] rounded-r-2xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <div className="inline-flex items-center px-3 py-1 bg-[#0891B2] text-white text-sm font-medium rounded-full mb-4">
                  Our Specialty
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Legal Transcription Services</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Court-certified transcripts trusted by law firms, courts, and government agencies across North America.
                  Our legal transcriptionists deliver verbatim accuracy with proper legal formatting.
                </p>

                <div className="space-y-3">
                  {LEGAL_SERVICES.map((service, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-[#0891B2] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <span className="font-semibold text-[#0C2340]">{service.name}:</span>{' '}
                        <span className="text-gray-600">{service.description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">Why Law Firms Choose Cethos</h3>
                <ul className="space-y-3">
                  {[
                    'Court-certified transcripts accepted by all courts',
                    '99.5% verbatim accuracy guaranteed',
                    'Legal terminology expertise',
                    'Strict confidentiality—NDA-bound transcriptionists',
                    'Rush turnaround available (24hr, same-day)',
                    'Multiple output formats (Word, PDF, ASCII)',
                    'Timestamping & video sync for trial software',
                    '25-50% less than live court reporters',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALL TRANSCRIPTION SERVICES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">All Transcription Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From legal depositions to podcast episodes, we deliver accurate transcription
              tailored to your industry&apos;s specific requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_TYPES.map((service, index) => (
              <div
                key={index}
                className={`bg-white border rounded-xl p-6 relative ${
                  service.comingSoon
                    ? 'border-gray-300 opacity-75'
                    : service.title === 'Legal Transcription'
                    ? 'border-[#0891B2] ring-2 ring-[#0891B2] hover:shadow-lg transition-shadow'
                    : 'border-gray-200 hover:shadow-lg transition-shadow'
                }`}
              >
                {service.badge && (
                  <div className={`absolute -top-3 right-4 px-3 py-1 text-white text-xs font-semibold rounded-full ${
                    service.badge === 'Coming Soon' ? 'bg-gray-500' : 'bg-[#0891B2]'
                  }`}>
                    {service.badge}
                  </div>
                )}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                  service.comingSoon ? 'bg-gray-100 text-gray-400' : 'bg-[#0891B2]/10 text-[#0891B2]'
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${service.comingSoon ? 'text-gray-500' : 'text-[#0C2340]'}`}>
                  {service.title}
                </h3>
                <p className={`mb-4 ${service.comingSoon ? 'text-gray-400' : 'text-gray-600'}`}>{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className={`text-sm flex items-start gap-2 ${service.comingSoon ? 'text-gray-400' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.comingSoon ? 'text-gray-300' : 'text-[#0891B2]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.comingSoon && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400 text-center">
                      Contact us to be notified when this service launches
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Four simple steps to professional transcripts</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Upload', description: 'Send your audio or video files through our secure portal, Dropbox, or other methods.', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg> },
              { step: '02', title: 'Quote', description: 'Receive a detailed quote within 1 hour with pricing, turnaround, and specifications.', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
              { step: '03', title: 'Transcribe', description: 'Our human transcriptionists create your transcript with 99%+ accuracy and QC review.', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
              { step: '04', title: 'Deliver', description: 'Download your completed transcript from our secure portal in your preferred format.', icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#0891B2]/10 rounded-2xl flex items-center justify-center text-[#0891B2] mx-auto mb-4">{item.icon}</div>
                <div className="text-sm font-bold text-[#0891B2] mb-2">Step {item.step}</div>
                <h3 className="text-xl font-bold text-[#0C2340] mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRANSCRIPTION STYLES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Transcription Styles Explained</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Choose the transcription style that best fits your needs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TRANSCRIPTION_STYLES.map((style, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#0C2340] mb-3">{style.style}</h3>
                <p className="text-gray-600 mb-4">{style.description}</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-[#0C2340]">Best for:</span> <span className="text-gray-600">{style.bestFor}</span></p>
                  <p><span className="font-semibold text-[#0C2340]">Rate:</span> <span className={`${style.rate === 'Premium' ? 'text-[#0891B2]' : 'text-gray-600'}`}>{style.rate}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE CETHOS SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Why Choose Cethos</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Partner with a trusted transcription provider that delivers accuracy, confidentiality, and expertise.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                { title: '99%+ Accuracy Guaranteed', description: 'Human transcriptionists—not AI. Every transcript goes through multi-step quality control.' },
                { title: 'Certified Transcriptionists', description: 'Court-certified legal transcriptionists, medical terminology experts, and industry specialists.' },
                { title: 'Strict Confidentiality', description: 'All transcriptionists sign NDAs. 256-bit encryption and HIPAA compliance for medical.' },
                { title: 'Fast Turnaround', description: '3-5 day standard, 24-48 hour rush, and same-day options available.' },
                { title: 'Competitive Pricing', description: '25-50% less than live court reporters. Volume discounts available.' },
                { title: '200+ Languages', description: 'Transcription in virtually any language. Combined transcription + translation available.' },
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#0C2340] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {[
                { value: '99.5%', label: 'Accuracy Rate' },
                { value: '24hr', label: 'Rush Available' },
                { value: '200+', label: 'Languages' },
                { value: '50+', label: 'File Formats' },
                { value: '25-50%', label: 'Cost Savings' },
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-5 text-center">
                  <div className="text-3xl font-bold text-[#0891B2]">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Industries We Serve</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Specialized transcription services for every industry.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {INDUSTRIES.map((industry) => (
              <button key={industry.id} onClick={() => setActiveIndustry(industry.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeIndustry === industry.id ? 'bg-[#0891B2] text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}>{industry.title}</button>
            ))}
          </div>
          {activeIndustryData && (
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-[#0C2340] mb-4">{activeIndustryData.title}</h3>
              <p className="text-gray-600 mb-6">{activeIndustryData.description}</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-[#0C2340] mb-4">Services Include:</h4>
                  <ul className="grid grid-cols-1 gap-2">
                    {activeIndustryData.services.map((service, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <svg className="w-5 h-5 text-[#0891B2] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0891B2]/5 rounded-xl p-6">
                  <h4 className="font-semibold text-[#0C2340] mb-3">Compliance & Features</h4>
                  <p className="text-gray-600">{activeIndustryData.compliance}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Pricing & Turnaround</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Transparent pricing with no hidden fees. Volume discounts available.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead className="bg-[#0C2340] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Service Level</th>
                      <th className="px-6 py-4 text-left font-semibold">Turnaround</th>
                      <th className="px-6 py-4 text-left font-semibold">Price</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {PRICING.map((tier, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold text-[#0C2340]">{tier.level}</td>
                        <td className="px-6 py-4 text-gray-600">{tier.turnaround}</td>
                        <td className="px-6 py-4 text-[#0891B2] font-semibold">{tier.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-[#0C2340] mb-4">Additional Options</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {PRICING_EXTRAS.map((extra, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{extra.name}</span>
                      <span className="font-medium text-[#0C2340]">{extra.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-[#0891B2]/5 rounded-xl p-6">
              <h4 className="font-bold text-[#0C2340] mb-4">Volume Discounts</h4>
              <div className="space-y-4">
                {VOLUME_DISCOUNTS.map((discount, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{discount.volume}</span>
                    <span className="font-semibold text-[#0891B2]">{discount.discount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#0891B2]/20">
                <p className="text-sm text-gray-600">Have a large project? <Link href="/contact" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">Contact us for custom pricing →</Link></p>
              </div>

              {/* AI-Powered Coming Soon Notice */}
              <div className="mt-6 pt-6 border-t border-[#0891B2]/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-500">AI-Powered Transcription</span>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">Coming Soon</span>
                </div>
                <p className="text-xs text-gray-500">Fast, affordable AI transcription with human QC. Up to 50% lower cost for high-volume projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <span className="font-semibold text-[#0C2340]">{faq.question}</span>
                  <svg className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {openFaq === index && <div className="px-6 pb-4"><p className="text-gray-600">{faq.answer}</p></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-200 mb-8">Upload your files and receive a detailed quote within 1 hour. Court-certified transcripts with 99%+ accuracy.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="#top" className="inline-flex items-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">Get a Free Quote</a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0C2340] font-semibold rounded-lg transition-colors">Contact Our Team</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
            <a href="tel:+15876000786" className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              (587) 600-0786
            </a>
            <a href="mailto:info@cethos.com" className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              info@cethos.com
            </a>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0891B2] p-4 lg:hidden z-50 shadow-lg">
        <div className="flex gap-3 max-w-md mx-auto">
          <a href="tel:+15876000786" className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0891B2] py-3 px-4 rounded-lg font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            Call Now
          </a>
          <a href="#top" className="flex-1 flex items-center justify-center gap-2 bg-[#0C2340] text-white py-3 px-4 rounded-lg font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            Get Quote
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  );
}
