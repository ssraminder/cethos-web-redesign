'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui'

// Placeholder logos - these would be replaced with actual client logos
const clients = [
  { name: 'Acme Corp', id: 1 },
  { name: 'GlobalTech', id: 2 },
  { name: 'MediPharm', id: 3 },
  { name: 'LegalFirst', id: 4 },
  { name: 'FinanceHub', id: 5 },
  { name: 'TechVentures', id: 6 },
]

function PlaceholderLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center h-12 px-6 text-slate-400 font-semibold text-lg opacity-60 hover:opacity-100 transition-opacity duration-300">
      {name}
    </div>
  )
}

export function ClientLogos() {
  return (
    <section className="py-16 border-y border-slate-100">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-slate-500 text-sm font-medium uppercase tracking-wider mb-10">
            Trusted by leading companies worldwide
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {clients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PlaceholderLogo name={client.name} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
