interface IconProps {
  className?: string
  size?: number
}

export function BankIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Roof */}
      <path
        d="M3 10L12 3L21 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base line */}
      <path
        d="M3 10H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Pillars */}
      <path d="M5 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Foundation */}
      <path
        d="M2 18H22V21H2V18Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top element */}
      <circle cx="12" cy="7" r="1" fill="currentColor" />
    </svg>
  )
}
