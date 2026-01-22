'use client'

import { motion } from 'framer-motion'
import { Button, Container } from '@/components/ui'

// Abstract connection lines SVG component
function ConnectionLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-20"
      viewBox="0 0 1200 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Connection nodes */}
      <circle cx="100" cy="200" r="4" fill="white" opacity="0.6" />
      <circle cx="300" cy="100" r="3" fill="white" opacity="0.4" />
      <circle cx="500" cy="300" r="5" fill="white" opacity="0.5" />
      <circle cx="700" cy="150" r="4" fill="white" opacity="0.6" />
      <circle cx="900" cy="250" r="3" fill="white" opacity="0.4" />
      <circle cx="1100" cy="180" r="4" fill="white" opacity="0.5" />
      <circle cx="200" cy="450" r="3" fill="white" opacity="0.4" />
      <circle cx="400" cy="500" r="4" fill="white" opacity="0.6" />
      <circle cx="600" cy="550" r="5" fill="white" opacity="0.5" />
      <circle cx="800" cy="480" r="3" fill="white" opacity="0.4" />
      <circle cx="1000" cy="520" r="4" fill="white" opacity="0.6" />
      <circle cx="150" cy="650" r="3" fill="white" opacity="0.3" />
      <circle cx="450" cy="700" r="4" fill="white" opacity="0.5" />
      <circle cx="750" cy="680" r="3" fill="white" opacity="0.4" />
      <circle cx="1050" cy="720" r="4" fill="white" opacity="0.5" />

      {/* Connection lines */}
      <path d="M100 200 L300 100 L500 300" stroke="white" strokeWidth="1" opacity="0.2" />
      <path d="M500 300 L700 150 L900 250" stroke="white" strokeWidth="1" opacity="0.2" />
      <path d="M900 250 L1100 180" stroke="white" strokeWidth="1" opacity="0.2" />
      <path d="M200 450 L400 500 L600 550" stroke="white" strokeWidth="1" opacity="0.2" />
      <path d="M600 550 L800 480 L1000 520" stroke="white" strokeWidth="1" opacity="0.2" />
      <path d="M150 650 L450 700 L750 680 L1050 720" stroke="white" strokeWidth="1" opacity="0.15" />
      <path d="M100 200 L200 450" stroke="white" strokeWidth="1" opacity="0.15" />
      <path d="M300 100 L400 500" stroke="white" strokeWidth="1" opacity="0.1" />
      <path d="M500 300 L600 550" stroke="white" strokeWidth="1" opacity="0.15" />
      <path d="M700 150 L800 480" stroke="white" strokeWidth="1" opacity="0.1" />
      <path d="M900 250 L1000 520" stroke="white" strokeWidth="1" opacity="0.15" />
    </svg>
  )
}

// Gradient orb decorations
function GradientOrbs() {
  return (
    <>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-600/15 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-400/10 rounded-full blur-[120px]" />
    </>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-mesh">
      {/* Background decorations */}
      <ConnectionLines />
      <GradientOrbs />

      {/* Content */}
      <Container className="relative z-10 py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Trusted by 500+ Global Enterprises
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
          >
            Global Communication.{' '}
            <span className="bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent">
              Local Precision.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
          >
            Expert translation services in 200+ languages. We combine human expertise with advanced technology to deliver precise, culturally-adapted content for your global audience.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button href="/get-quote" size="lg" showArrow>
              Get a Quote
            </Button>
            <Button href="/services" variant="outline" size="lg">
              Our Services
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <p className="text-white/60 text-sm mb-6">Certified and trusted worldwide</p>
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/40">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="16" y="20" textAnchor="middle" fontSize="10" fill="currentColor">ISO</text>
                </svg>
                <span className="text-sm">ISO 17100</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="16" y="20" textAnchor="middle" fontSize="10" fill="currentColor">ISO</text>
                </svg>
                <span className="text-sm">ISO 9001</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none" />
                  <text x="16" y="19" textAnchor="middle" fontSize="8" fill="currentColor">ATA</text>
                </svg>
                <span className="text-sm">ATA Member</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 4L4 10v12l12 6 12-6V10L16 4z" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <span className="text-sm">GDPR Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  )
}
