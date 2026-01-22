interface IconProps {
  className?: string
  size?: number
}

export function AwardIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Badge circle */}
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
      {/* Star in center */}
      <path
        d="M12 6L12.9 8.5H15.5L13.3 10L14.2 12.5L12 11L9.8 12.5L10.7 10L8.5 8.5H11.1L12 6Z"
        fill="currentColor"
      />
      {/* Ribbons */}
      <path
        d="M8 14.5L6 22L9 19.5L12 22L15 19.5L18 22L16 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
