interface IconProps {
  className?: string
  size?: number
}

export function UsersIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Main person */}
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 21V18C3 16.3431 4.34315 15 6 15H12C13.6569 15 15 16.3431 15 18V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Second person */}
      <circle cx="17" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M17 12C19.2091 12 21 13.7909 21 16V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Connection line */}
      <path
        d="M12 7H14"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 2"
      />
    </svg>
  )
}
