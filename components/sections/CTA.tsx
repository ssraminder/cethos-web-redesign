'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAProps {
  headline?: string
  subtext?: string
}

export function CTA({
  headline = "Ready to Go Global?",
  subtext = "Get a free quote for your translation project. Our team is ready to help you reach new markets with precision and speed."
}: CTAProps) {
  return (
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
            {headline}
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            {subtext}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="px-6 py-4 bg-white text-[#0C2340] rounded-lg font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="/contact"
              className="px-6 py-4 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            No commitment required • Response within 2 hours • 200+ languages
          </p>
        </motion.div>
      </div>
    </section>
  )
}
