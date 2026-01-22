interface IconProps {
  className?: string
  size?: number
}

export function BuildingIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main building */}
      <path
        d="M3 21H21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M5 21V7L13 3V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Side building */}
      <path
        d="M13 21V10H19V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Windows - main building */}
      <rect x="7" y="9" width="2" height="2" fill="currentColor" rx="0.5" />
      <rect x="7" y="13" width="2" height="2" fill="currentColor" rx="0.5" />
      <rect x="7" y="17" width="2" height="2" fill="currentColor" rx="0.5" />
      {/* Windows - side building */}
      <rect x="15" y="13" width="2" height="2" fill="currentColor" rx="0.5" />
      <rect x="15" y="17" width="2" height="2" fill="currentColor" rx="0.5" />
    </svg>
  )
}
