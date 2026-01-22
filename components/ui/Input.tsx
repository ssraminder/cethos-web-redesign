'use client'

import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  helperText?: string
  options: { value: string; label: string }[]
}

const baseInputStyles = `
  w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-navy
  placeholder:text-slate-400 transition-colors duration-200
  focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:outline-none
  disabled:bg-slate-50 disabled:cursor-not-allowed
`

const errorStyles = 'border-red-500 focus:border-red-500 focus:ring-red-500/20'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} ${error ? errorStyles : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} min-h-[120px] resize-y ${error ? errorStyles : ''} ${className}`}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-navy">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={`${baseInputStyles} ${error ? errorStyles : ''} ${className}`}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="text-sm text-slate-500">{helperText}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
