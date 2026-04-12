'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import TranscriptionQuoteForm from '@/components/forms/TranscriptionQuoteForm';
import { FAQJsonLd } from '@/components/JsonLd';

// Legal transcription services detail (keep hardcoded - detailed data not fully in translations)
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

// Industry data (keep hardcoded - detailed data not fully in translations)
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

// Pricing extras (keep hardcoded)
const PRICING_EXTRAS = [
  { name: 'Verbatim transcription', price: 'Included' },
  { name: 'Time-stamping', price: '+$0.25/min' },
  { name: 'Speaker identification', price: 'Included' },
  { name: 'Difficult audio quality', price: '+$0.50/min' },
  { name: 'Legal formatting', price: '+$0.25/min' },
  { name: 'Transcription + Translation bundle', price: 'From $3.50/min*' },
  { name: 'Certified translation (if needed)', price: '+$0.065/word' },
];

// Volume discounts (keep hardcoded)
const VOLUME_DISCOUNTS = [
  { volume: '10+ hours', discount: '10% off' },
  { volume: '50+ hours', discount: '15% off' },
  { volume: '100+ hours', discount: '20% off' },
  { volume: 'Ongoing contracts', discount: 'Custom pricing' },
];

export default function TranscriptionPageContent() {
  const [activeIndustry, setActiveIndustry] = useState('legal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tHero = useTranslations('transcription.hero');
  const tTypes = useTranslations('transcription.types');
  const tLegal = useTranslations('transcription.legal');
  const tStyles = useTranslations('transcription.styles');
  const tProcess = useTranslations('transcription.process');
  const tWhy = useTranslations('transcription.whychoose');
  const tIndustries = useTranslations('transcription.industries');
  const tPricing = useTranslations('transcription.pricing');
  const tFaq = useTranslations('transcription.faq');
  const tCta = useTranslations('transcription.cta');

  const activeIndustryData = INDUSTRIES.find(ind => ind.id === activeIndustry);

  // Service type data (inside component to use translations)
  const SERVICE_TYPES = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
      title: tTypes('legal_title'),
      description: tTypes('legal_desc'),
      features: [tTypes('legal_f1'), tTypes('legal_f2'), tTypes('legal_f3'), tTypes('legal_f4'), tTypes('legal_f5')],
      badge: tTypes('legal_badge'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: tTypes('medical_title'),
      description: tTypes('medical_desc'),
      features: [tTypes('medical_f1'), tTypes('medical_f2'), tTypes('medical_f3'), tTypes('medical_f4'), tTypes('medical_f5')],
      badge: null,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: tTypes('business_title'),
      description: tTypes('business_desc'),
      features: [tTypes('business_f1'), tTypes('business_f2'), tTypes('business_f3'), tTypes('business_f4'), tTypes('business_f5')],
      badge: null,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: tTypes('academic_title'),
      description: tTypes('academic_desc'),
      features: [tTypes('academic_f1'), tTypes('academic_f2'), tTypes('academic_f3'), tTypes('academic_f4'), tTypes('academic_f5')],
      badge: null,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: tTypes('media_title'),
      description: tTypes('media_desc'),
      features: [tTypes('media_f1'), tTypes('media_f2'), tTypes('media_f3'), tTypes('media_f4'), tTypes('media_f5')],
      badge: null,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: tTypes('insurance_title'),
      description: tTypes('insurance_desc'),
      features: [tTypes('insurance_f1'), tTypes('insurance_f2'), tTypes('insurance_f3'), tTypes('insurance_f4'), tTypes('insurance_f5')],
      badge: null,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      title: tTypes('bundle_title'),
      description: tTypes('bundle_desc'),
      features: [tTypes('bundle_f1'), tTypes('bundle_f2'), tTypes('bundle_f3'), tTypes('bundle_f4'), tTypes('bundle_f5')],
      badge: tTypes('bundle_badge'),
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: tTypes('ai_title'),
      description: tTypes('ai_desc'),
      features: [tTypes('ai_f1'), tTypes('ai_f2'), tTypes('ai_f3'), tTypes('ai_f4'), tTypes('ai_f5')],
      badge: tTypes('ai_badge'),
      comingSoon: true,
    },
  ];

  // Transcription styles (inside component to use translations)
  const TRANSCRIPTION_STYLES = [
    {
      style: tStyles('verbatim_name'),
      description: tStyles('verbatim_desc'),
      bestFor: tStyles('verbatim_best'),
      rate: tStyles('verbatim_rate'),
    },
    {
      style: tStyles('clean_name'),
      description: tStyles('clean_desc'),
      bestFor: tStyles('clean_best'),
      rate: tStyles('clean_rate'),
    },
    {
      style: tStyles('intelligent_name'),
      description: tStyles('intelligent_desc'),
      bestFor: tStyles('intelligent_best'),
      rate: tStyles('intelligent_rate'),
    },
  ];

  // Pricing data (inside component to use translations)
  const PRICING = [
    { level: tPricing('standard_level'), turnaround: tPricing('standard_time'), price: tPricing('standard_price') },
    { level: tPricing('rush_level'), turnaround: tPricing('rush_time'), price: tPricing('rush_price') },
    { level: tPricing('sameday_level'), turnaround: tPricing('sameday_time'), price: tPricing('sameday_price') },
    { level: tPricing('overnight_level'), turnaround: tPricing('overnight_time'), price: tPricing('overnight_price') },
  ];

  // FAQ data (inside component to use translations)
  const FAQS = Array.from({ length: 12 }, (_, i) => ({
    question: tFaq(`q${i + 1}`),
    answer: tFaq(`a${i + 1}`),
  }));

  // Process steps (inside component to use translations)
  const PROCESS_STEPS = [
    { step: '01', title: tProcess('step1_title'), description: tProcess('step1_desc'), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg> },
    { step: '02', title: tProcess('step2_title'), description: tProcess('step2_desc'), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },
    { step: '03', title: tProcess('step3_title'), description: tProcess('step3_desc'), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> },
    { step: '04', title: tProcess('step4_title'), description: tProcess('step4_desc'), icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  ];

  // Why choose features (inside component to use translations)
  const WHY_FEATURES = Array.from({ length: 6 }, (_, i) => ({
    title: tWhy(`f${i + 1}_title`),
    description: tWhy(`f${i + 1}_desc`),
  }));

  // Why choose stats (inside component to use translations)
  const WHY_STATS = Array.from({ length: 5 }, (_, i) => ({
    value: tWhy(`stat${i + 1}_value`),
    label: tWhy(`stat${i + 1}_label`),
  }));

  return (
    <main>
      <FAQJsonLd faqs={FAQS} />
      {/* HERO SECTION */}
      <section id="top" className="relative bg-gradient-to-br from-[#0C2340] via-[#0F3A5C] to-[#0891B2] min-h-[750px] lg:min-h-[700px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Breadcrumbs */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">{tHero('breadcrumb_home')}</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white transition-colors">{tHero('breadcrumb_services')}</Link>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-white">{tHero('breadcrumb_transcription')}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1 bg-[#0891B2] text-white text-sm font-medium rounded-full mb-4">
                <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tHero('badge')}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-white">
                {tHero('heading')}
              </h1>
              <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-xl">
                {tHero('description')}
              </p>

              {/* Trust Badges - 2x3 Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  tHero('trust_accuracy'),
                  tHero('trust_certified'),
                  tHero('trust_rush'),
                  tHero('trust_languages'),
                  tHero('trust_hipaa'),
                  tHero('trust_iso'),
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="flex flex-wrap items-center gap-6 mb-8 py-4 border-t border-b border-white/20">
                <div>
                  <span className="text-2xl font-bold text-[#0891B2]">{tHero('stat1_value')}</span>
                  <p className="text-xs text-gray-300">{tHero('stat1_label')}</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#0891B2]">{tHero('stat2_value')}</span>
                  <p className="text-xs text-gray-300">{tHero('stat2_label')}</p>
                </div>
                <div>
                  <span className="text-2xl font-bold text-[#0891B2]">{tHero('stat3_value')}</span>
                  <p className="text-xs text-gray-300">{tHero('stat3_label')}</p>
                </div>
              </div>

              {/* Phone CTA */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="tel:+15876000786"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-5 py-3 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-semibold">{tHero('cta_phone')}</span>
                </a>
                <span className="text-sm text-gray-300">
                  {tHero('cta_phone_text')}
                </span>
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
                  {tLegal('badge')}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tLegal('heading')}</h2>
                <p className="text-lg text-gray-600 mb-6">
                  {tLegal('description')}
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
                <h3 className="text-xl font-bold text-[#0C2340] mb-4">{tLegal('why_heading')}</h3>
                <ul className="space-y-3">
                  {Array.from({ length: 8 }, (_, i) => tLegal(`why_${i + 1}`)).map((item, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tLegal('all_heading')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tLegal('all_desc')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_TYPES.map((service, index) => (
              <div
                key={index}
                className={`bg-white border rounded-xl p-6 relative ${
                  service.comingSoon
                    ? 'border-gray-300 opacity-75'
                    : service.title === tTypes('legal_title')
                    ? 'border-[#0891B2] ring-2 ring-[#0891B2] hover:shadow-lg transition-shadow'
                    : 'border-gray-200 hover:shadow-lg transition-shadow'
                }`}
              >
                {service.badge && (
                  <div className={`absolute -top-3 right-4 px-3 py-1 text-white text-xs font-semibold rounded-full ${
                    service.comingSoon ? 'bg-gray-500' : 'bg-[#0891B2]'
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
                      {tLegal('coming_soon')}
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tProcess('heading')}</h2>
            <p className="text-lg text-gray-600">{tProcess('description')}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((item, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tStyles('heading')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{tStyles('description')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TRANSCRIPTION_STYLES.map((style, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[#0C2340] mb-3">{style.style}</h3>
                <p className="text-gray-600 mb-4">{style.description}</p>
                <div className="space-y-2 text-sm">
                  <p><span className="font-semibold text-[#0C2340]">{tStyles('bestfor_label')}</span> <span className="text-gray-600">{style.bestFor}</span></p>
                  <p><span className="font-semibold text-[#0C2340]">{tStyles('rate_label')}</span> <span className={`${style.rate === tStyles('intelligent_rate') ? 'text-[#0891B2]' : 'text-gray-600'}`}>{style.rate}</span></p>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tWhy('heading')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{tWhy('description')}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {WHY_FEATURES.map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#0C2340] mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {WHY_STATS.map((stat, index) => (
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tIndustries('heading')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{tIndustries('description')}</p>
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
                  <h4 className="font-semibold text-[#0C2340] mb-4">{tIndustries('services_label')}</h4>
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
                  <h4 className="font-semibold text-[#0C2340] mb-3">{tIndustries('compliance_label')}</h4>
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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tPricing('heading')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{tPricing('description')}</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <table className="w-full">
                  <thead className="bg-[#0C2340] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">{tPricing('col_level')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{tPricing('col_turnaround')}</th>
                      <th className="px-6 py-4 text-left font-semibold">{tPricing('col_price')}</th>
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
                <h4 className="font-semibold text-[#0C2340] mb-4">{tPricing('extras_heading')}</h4>
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
              <h4 className="font-bold text-[#0C2340] mb-4">{tPricing('volume_heading')}</h4>
              <div className="space-y-4">
                {VOLUME_DISCOUNTS.map((discount, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-600">{discount.volume}</span>
                    <span className="font-semibold text-[#0891B2]">{discount.discount}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#0891B2]/20">
                <p className="text-sm text-gray-600">{tPricing('volume_cta')} <Link href="/contact" className="text-[#0891B2] hover:text-[#06B6D4] font-medium">{tPricing('volume_link')}</Link></p>
              </div>

              {/* AI-Powered Coming Soon Notice */}
              <div className="mt-6 pt-6 border-t border-[#0891B2]/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold text-gray-500">{tPricing('ai_heading')}</span>
                  <span className="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">{tPricing('ai_badge')}</span>
                </div>
                <p className="text-xs text-gray-500">{tPricing('ai_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0C2340] mb-4">{tFaq('heading')}</h2>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{tCta('heading')}</h2>
          <p className="text-xl text-gray-200 mb-8">{tCta('description')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a href="#top" className="inline-flex items-center px-8 py-4 bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold rounded-lg transition-colors">{tCta('cta_quote')}</a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#0C2340] font-semibold rounded-lg transition-colors">{tCta('cta_contact')}</Link>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
            <a href="tel:+15876000786" className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              {tCta('cta_phone')}
            </a>
            <a href="mailto:info@cethos.com" className="flex items-center gap-2 hover:text-[#06B6D4] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              {tCta('cta_email')}
            </a>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0891B2] p-4 lg:hidden z-50 shadow-lg">
        <div className="flex gap-3 max-w-md mx-auto">
          <a href="tel:+15876000786" className="flex-1 flex items-center justify-center gap-2 bg-white text-[#0891B2] py-3 px-4 rounded-lg font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            {tCta('mobile_call')}
          </a>
          <a href="#top" className="flex-1 flex items-center justify-center gap-2 bg-[#0C2340] text-white py-3 px-4 rounded-lg font-semibold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            {tCta('mobile_quote')}
          </a>
        </div>
      </div>
      <div className="h-20 lg:hidden" />
    </main>
  );
}
