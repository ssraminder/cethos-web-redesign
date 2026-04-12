'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

function CountUp({ value, suffix, duration = 2 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(value)
  const ref = useRef<HTMLDivElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true

          setCount(0)
          const startTime = performance.now()
          const durationMs = duration * 1000

          const tick = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(1, elapsed / durationMs)
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)

            setCount(value * easeOutQuart)

            if (progress < 1) {
              requestAnimationFrame(tick)
            } else {
              setCount(value)
            }
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  const isInteger = value % 1 === 0
  const displayValue = isInteger ? Math.floor(count).toLocaleString() : count.toFixed(1)

  return (
    <div ref={ref} data-target={value}>
      {displayValue}{suffix}
    </div>
  )
}

export function Stats() {
  const t = useTranslations('homepage.stats')

  const stats = [
    { value: 200, suffix: '+', label: t('languages_label') },
    { value: 5000, suffix: '+', label: t('specialists_label') },
    { value: 99.8, suffix: '%', label: t('accuracy_label') },
    { value: 24, suffix: '/7', label: t('support_label') },
  ]

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
