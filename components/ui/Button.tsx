'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { ArrowRightIcon } from '@/components/icons'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  icon?: React.ReactNode
  showArrow?: boolean
  isLoading?: boolean
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 shadow-soft hover:shadow-medium',
  secondary: 'bg-white text-navy border-2 border-slate-200 hover:border-teal-500 hover:text-teal-600 focus-visible:ring-slate-400',
  outline: 'bg-transparent text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 focus-visible:ring-white/50',
  ghost: 'bg-transparent text-navy hover:bg-slate-100 focus-visible:ring-slate-400',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, icon, showArrow, isLoading, children, className = '', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    const content = (
      <>
        {isLoading ? (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : icon ? (
          icon
        ) : null}
        {children}
        {showArrow && <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-1" />}
      </>
    )

    if (href) {
      return (
        <Link href={href} className={`${classes} group`}>
          {content}
        </Link>
      )
    }

    return (
      <button ref={ref} className={`${classes} group`} disabled={disabled || isLoading} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
