'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function DualCTA() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#0C2340]">
            Get Your Translation Project Started Today
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col"
          >
            <h3 className="text-xl font-bold text-[#0C2340] mb-3">
              For Businesses
            </h3>
            <p className="text-slate-600 mb-8 flex-1">
              Enterprise &amp; Life Sciences translation services with dedicated project management.
            </p>
            <Link
              href="/services/lifesciences"
              className="min-h-[48px] px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 w-full"
            >
              Request Enterprise Quote
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 flex flex-col"
          >
            <h3 className="text-xl font-bold text-[#0C2340] mb-3">
              For Individuals
            </h3>
            <p className="text-slate-600 mb-8 flex-1">
              Certified translations starting at $65. Government-approved for IRCC submissions.
            </p>
            <Link
              href="/get-quote"
              className="min-h-[48px] px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 w-full"
            >
              Get Certified Quote
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
