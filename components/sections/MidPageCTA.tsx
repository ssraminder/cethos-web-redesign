'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export function MidPageCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-[#0C2340]">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-white mb-4">
            Ready to get started?
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Upload your documents and receive a free quote in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/get-quote"
              className="min-h-[48px] px-8 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              Get Your Free Quote
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
            <Link
              href="tel:+15876000786"
              className="min-h-[48px] px-8 py-3 bg-transparent text-white border-2 border-white/30 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" strokeWidth={1.5} />
              Call (587) 600-0786
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
