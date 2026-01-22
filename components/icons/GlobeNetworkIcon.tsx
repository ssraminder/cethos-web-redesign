interface IconProps {
  className?: string
  size?: number
}

export function GlobeNetworkIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe */}
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      {/* Horizontal line */}
      <ellipse cx="12" cy="12" rx="9" ry="4" stroke="currentColor" strokeWidth="1.5" />
      {/* Vertical line */}
      <path d="M12 3C12 3 7 7 7 12C7 17 12 21 12 21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 3C12 3 17 7 17 12C17 17 12 21 12 21" stroke="currentColor" strokeWidth="1.5" />
      {/* Connection nodes */}
      <circle cx="5" cy="8" r="1.5" fill="currentColor" />
      <circle cx="19" cy="8" r="1.5" fill="currentColor" />
      <circle cx="5" cy="16" r="1.5" fill="currentColor" />
      <circle cx="19" cy="16" r="1.5" fill="currentColor" />
      {/* Connection lines */}
      <path d="M5 8L7 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 8L17 10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M5 16L7 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      <path d="M19 16L17 14" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  )
}
