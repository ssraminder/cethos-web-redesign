'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'glass' | 'outline'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const variants = {
  default: 'bg-white shadow-soft',
  glass: 'bg-white/80 backdrop-blur-lg border border-white/20',
  outline: 'bg-white border border-slate-200',
}

export function Card({ children, className = '', hover = false, padding = 'md', variant = 'default' }: CardProps) {
  const baseStyles = 'rounded-2xl'
  const hoverStyles = hover ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-medium' : ''
  const classes = `${baseStyles} ${paddings[padding]} ${variants[variant]} ${hoverStyles} ${className}`

  if (hover) {
    return (
      <motion.div
        className={classes}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={classes}>{children}</div>
}
