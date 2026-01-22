'use client'

import { motion } from 'framer-motion'
import { Container, Button } from '@/components/ui'
import { GlobeNetworkIcon } from '@/components/icons'

export function CTA() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-600 to-teal-900" />

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-white/10" />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-600/15 rounded-full blur-[80px]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 text-teal-400 mb-8">
            <GlobeNetworkIcon size={40} />
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Go Global?
          </h2>

          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Get a free quote for your translation project. Our team is ready to help you reach new markets with precision and speed.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              href="/get-quote"
              size="lg"
              className="bg-white text-navy hover:bg-white/90"
              showArrow
            >
              Get Your Free Quote
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>

          <p className="mt-8 text-white/60 text-sm">
            No commitment required • Response within 2 hours • 200+ languages
          </p>
        </motion.div>
      </Container>
    </section>
  )
}
