'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield } from 'lucide-react'

// Globe SVG with language bubbles - Figma matched
function GlobeIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full max-w-[500px] aspect-square"
    >
      {/* Main globe */}
      <svg viewBox="0 0 400 400" className="w-full h-full">
        {/* Globe base */}
        <defs>
          <linearGradient id="globeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
          <linearGradient id="globeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891B2" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>

        {/* Globe circle */}
        <circle cx="200" cy="200" r="140" fill="url(#globeGradient)" stroke="url(#globeStroke)" strokeWidth="2" />

        {/* Globe lines - latitude */}
        <ellipse cx="200" cy="200" rx="140" ry="50" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.3" />
        <ellipse cx="200" cy="200" rx="140" ry="100" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.3" />

        {/* Globe lines - longitude */}
        <ellipse cx="200" cy="200" rx="50" ry="140" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.3" />
        <ellipse cx="200" cy="200" rx="100" ry="140" fill="none" stroke="#0891B2" strokeWidth="1" opacity="0.3" />

        {/* Center line */}
        <line x1="60" y1="200" x2="340" y2="200" stroke="#0891B2" strokeWidth="1" opacity="0.3" />
        <line x1="200" y1="60" x2="200" y2="340" stroke="#0891B2" strokeWidth="1" opacity="0.3" />

        {/* Connection dots on globe */}
        <circle cx="150" cy="150" r="6" fill="#0891B2" />
        <circle cx="250" cy="130" r="6" fill="#0891B2" />
        <circle cx="280" cy="200" r="6" fill="#0891B2" />
        <circle cx="230" cy="270" r="6" fill="#0891B2" />
        <circle cx="140" cy="230" r="6" fill="#0891B2" />
        <circle cx="180" cy="180" r="6" fill="#0891B2" />

        {/* Connection lines */}
        <path d="M150 150 L180 180 L250 130" stroke="#0891B2" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M180 180 L140 230 L230 270" stroke="#0891B2" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M250 130 L280 200 L230 270" stroke="#0891B2" strokeWidth="1.5" fill="none" opacity="0.5" />
      </svg>

      {/* Language bubbles */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="absolute top-[10%] left-[5%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">EN</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="absolute top-[5%] right-[15%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">中文</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute top-[35%] right-[0%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">ES</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="absolute bottom-[25%] right-[5%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">عربي</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="absolute bottom-[20%] left-[0%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">FR</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        className="absolute top-[45%] left-[0%] px-4 py-2 bg-white rounded-lg shadow-card border border-[#E5E7EB]"
      >
        <span className="text-[#0C2340] font-semibold">日本語</span>
      </motion.div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-[600px] pt-32 pb-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content - 55% */}
          <div className="lg:pr-8">
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
            >
              Professional Translation Services
            </motion.p>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] md:text-[56px] font-bold text-[#0C2340] leading-[1.1] mb-6"
            >
              Global Communication.{' '}
              <span className="text-[#0891B2]">Local Precision.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[#4B5563] leading-relaxed mb-8 max-w-xl"
            >
              Expert translation services in 200+ languages. We combine human expertise with advanced technology to deliver precise, culturally-adapted content for your global audience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link
                href="/get-quote"
                className="px-6 py-4 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center gap-2"
              >
                Get a Quote
                <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
              </Link>
              <Link
                href="/services"
                className="px-6 py-4 bg-white text-[#0C2340] border-2 border-[#0C2340] rounded-lg font-semibold hover:bg-[#F8FAFC] transition-colors"
              >
                Our Services
              </Link>
            </motion.div>

            {/* Trust text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-2 text-sm text-[#717182]"
            >
              <Shield className="w-4 h-4 text-[#0891B2]" strokeWidth={1.5} />
              <span>ISO 17100 & ISO 9001 Compliant • Trusted by 500+ Global Enterprises</span>
            </motion.div>
          </div>

          {/* Right content - Globe illustration - 45% */}
          <div className="flex justify-center lg:justify-end">
            <GlobeIllustration />
          </div>
        </div>
      </div>
    </section>
  )
}
