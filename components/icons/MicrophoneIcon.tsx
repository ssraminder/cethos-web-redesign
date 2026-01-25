interface IconProps {
  className?: string
  size?: number
}

export function MicrophoneIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Microphone body */}
      <rect x="9" y="2" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="1.5" />
      {/* Sound waves / pickup area */}
      <path
        d="M19 11C19 14.866 15.866 18 12 18C8.13401 18 5 14.866 5 11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Stand */}
      <path
        d="M12 18V22M8 22H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
