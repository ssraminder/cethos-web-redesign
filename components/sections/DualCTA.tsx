'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function DualCTA() {
  const t = useTranslations('homepage.dualcta')

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
            {t('heading')}
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
              {t('business_label')}
            </h3>
            <p className="text-slate-600 mb-8 flex-1">
              {t('business_desc')}
            </p>
            <Link
              href="/services/lifesciences"
              className="min-h-[48px] px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 w-full"
            >
              {t('business_cta')}
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
              {t('individual_label')}
            </h3>
            <p className="text-slate-600 mb-8 flex-1">
              {t('individual_desc')}
            </p>
            <Link
              href="/get-quote"
              className="min-h-[48px] px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors inline-flex items-center justify-center gap-2 w-full"
            >
              {t('individual_cta')}
              <ArrowRight className="w-5 h-5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
