interface IconProps {
  className?: string
  size?: number
}

export function ChartIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Bars */}
      <rect x="4" y="13" width="4" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="10" y="8" width="4" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="16" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      {/* Fill indicators */}
      <rect x="5" y="14" width="2" height="6" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="11" y="9" width="2" height="11" rx="0.5" fill="currentColor" fillOpacity="0.3" />
      <rect x="17" y="4" width="2" height="16" rx="0.5" fill="currentColor" fillOpacity="0.3" />
    </svg>
  )
}
