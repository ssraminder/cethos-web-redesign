'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui'
import { LanguagesIcon, ChartIcon, AwardIcon, HeadphonesIcon } from '@/components/icons'

const stats = [
  {
    value: 200,
    suffix: '+',
    label: 'Languages',
    icon: LanguagesIcon,
  },
  {
    value: 10000,
    suffix: '+',
    label: 'Projects Completed',
    icon: ChartIcon,
  },
  {
    value: 99.7,
    suffix: '%',
    label: 'Accuracy Rate',
    icon: AwardIcon,
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
    icon: HeadphonesIcon,
  },
]

function CountUp({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const endTime = startTime + duration * 1000

    const tick = () => {
      const now = Date.now()
      const progress = Math.min(1, (now - startTime) / (duration * 1000))
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)

      setCount(Math.floor(value * easeOutQuart))

      if (now < endTime) {
        requestAnimationFrame(tick)
      } else {
        setCount(value)
      }
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration])

  const displayValue = value % 1 === 0 ? count.toLocaleString() : count.toFixed(1)

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export function Stats() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy-600 to-navy" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-600/10 rounded-full blur-[80px]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 text-teal-400 mb-4">
                <stat.icon size={28} />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}
