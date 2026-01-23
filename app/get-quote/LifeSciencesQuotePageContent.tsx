'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'
import LifeSciencesQuoteForm from '@/components/forms/LifeSciencesQuoteForm'
import { Shield } from 'lucide-react'

export default function LifeSciencesQuotePageContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-semibold text-[#0891B2] uppercase tracking-widest mb-4"
            >
              LIFE SCIENCES SERVICES
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
            >
              Request a Life Sciences Quote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[#4B5563] leading-relaxed mb-6"
            >
              Tell us about your linguistic validation, cognitive debriefing, or clinical translation project and receive a detailed quote within 2 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center items-center gap-4 text-sm text-[#4B5563]"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0891B2]" />
                ISO 17100 Compliant
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0891B2]" />
                ISPOR Guidelines
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#0891B2]" />
                GCP Compliant
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 bg-white">
        <Container size="md">
          <LifeSciencesQuoteForm />
        </Container>
      </section>
    </>
  )
}
