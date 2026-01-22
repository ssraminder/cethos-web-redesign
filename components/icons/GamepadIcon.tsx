interface IconProps {
  className?: string
  size?: number
}

export function GamepadIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Controller body */}
      <path
        d="M6 9H4C2.89543 9 2 9.89543 2 11V15C2 16.1046 2.89543 17 4 17H6L8 19H16L18 17H20C21.1046 17 22 16.1046 22 15V11C22 9.89543 21.1046 9 20 9H18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Top bar */}
      <path
        d="M6 9V7C6 5.89543 6.89543 5 8 5H16C17.1046 5 18 5.89543 18 7V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* D-pad */}
      <path d="M7 12H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 11V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Buttons */}
      <circle cx="16" cy="11" r="1" fill="currentColor" />
      <circle cx="16" cy="14" r="1" fill="currentColor" />
    </svg>
  )
}
