'use client'

import { motion } from 'framer-motion'
import { Container, Button } from '@/components/ui'
import { GlobeNetworkIcon } from '@/components/icons'

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-mesh">
      <Container className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white/10 text-teal-400 mb-8">
            <GlobeNetworkIcon size={48} />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-white/70 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button href="/" className="bg-white text-navy hover:bg-white/90">
              Go to Homepage
            </Button>
            <Button href="/contact" variant="outline">
              Contact Support
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
