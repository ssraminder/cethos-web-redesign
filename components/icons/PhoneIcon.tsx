interface IconProps {
  className?: string
  size?: number
}

export function PhoneIcon({ className = '', size = 24 }: IconProps) {
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
        d="M22 16.92V19.92C22 20.4704 21.7893 20.9991 21.4142 21.3743C21.0391 21.7494 20.5104 21.9601 19.96 21.96C16.4289 21.5856 13.033 20.3407 10.07 18.34C7.31957 16.5135 4.99638 14.1903 3.17 11.44C1.16276 8.46444 -0.0821839 5.05382 0.00000165779 1.51C0.000161654 0.960856 0.211089 0.433083 0.585786 0.0576446C0.960482 -0.317794 1.48813 -0.528721 2.04 -0.528721H5.04C6.04 -0.528721 6.89 0.23128 7 1.23C7.1 2.07 7.3 2.89 7.6 3.68C7.86 4.34 7.69 5.08 7.2 5.58L5.91 6.87C7.59001 9.82941 10.0206 12.26 12.98 13.94L14.27 12.65C14.77 12.16 15.51 11.99 16.17 12.25C16.96 12.55 17.78 12.75 18.62 12.85C19.6296 12.96 20.39 13.82 20.39 14.82V16.92H22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(1, 1)"
      />
    </svg>
  )
}
