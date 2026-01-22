interface IconProps {
  className?: string
  size?: number
}

export function ScaleIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Center pillar */}
      <path
        d="M12 3V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Base */}
      <path
        d="M8 21H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Top */}
      <circle cx="12" cy="3" r="1.5" fill="currentColor" />
      {/* Crossbar */}
      <path
        d="M4 7H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left pan */}
      <path
        d="M4 7L3 11H7L6 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 11C2 11 2.5 14 5 14C7.5 14 8 11 8 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right pan */}
      <path
        d="M20 7L21 11H17L18 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 11C16 11 16.5 14 19 14C21.5 14 22 11 22 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
