'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  {
    value: 200,
    suffix: '+',
    label: 'Languages',
  },
  {
    value: 5000,
    suffix: '+',
    label: 'Specialists',
  },
  {
    value: 99.7,
    suffix: '%',
    label: 'Accuracy',
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support',
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
    <section className="bg-[#0C2340] py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`text-center py-6 px-4 ${
                index < stats.length - 1 ? 'lg:border-r lg:border-white/20' : ''
              }`}
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
