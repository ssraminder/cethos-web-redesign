interface IconProps {
  className?: string
  size?: number
}

export function ClockIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Clock face */}
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Hour hand */}
      <path
        d="M12 6V12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Minute hand */}
      <path
        d="M12 12L16 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Speed lines */}
      <path
        d="M3 8L1 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M3 16L1 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
