interface IconProps {
  className?: string
  size?: number
}

export function HeadphonesIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Headband */}
      <path
        d="M4 15V12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12V15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Left ear cup */}
      <rect x="2" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Right ear cup */}
      <rect x="18" y="13" width="4" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      {/* Microphone */}
      <path
        d="M6 18H8C9.10457 18 10 18.8954 10 20V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
