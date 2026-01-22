interface IconProps {
  className?: string
  size?: number
}

export function MoleculeIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* DNA Helix structure */}
      {/* Left strand */}
      <path
        d="M6 3C6 3 6 5 8 7C10 9 10 11 10 12C10 13 10 15 8 17C6 19 6 21 6 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Right strand */}
      <path
        d="M18 3C18 3 18 5 16 7C14 9 14 11 14 12C14 13 14 15 16 17C18 19 18 21 18 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Cross connections */}
      <path d="M7 5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 9H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 19H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nodes */}
      <circle cx="6" cy="3" r="1.5" fill="currentColor" />
      <circle cx="18" cy="3" r="1.5" fill="currentColor" />
      <circle cx="6" cy="21" r="1.5" fill="currentColor" />
      <circle cx="18" cy="21" r="1.5" fill="currentColor" />
    </svg>
  )
}
