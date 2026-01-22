interface IconProps {
  className?: string
  size?: number
}

export function ShoppingCartIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1 1H5L7.68 14.39C7.77 14.83 8.02 15.22 8.38 15.49C8.74 15.76 9.19 15.89 9.64 15.86H19.36C19.81 15.89 20.26 15.76 20.62 15.49C20.98 15.22 21.23 14.83 21.32 14.39L23 6H6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="19" cy="20" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
