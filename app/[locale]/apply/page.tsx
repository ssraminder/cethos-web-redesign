import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Apply to join the CETHOS vendor network',
  description: 'Join CETHOS as a freelance translator, interpreter, transcriber, clinician reviewer, or cognitive debriefing consultant.',
  alternates: { canonical: 'https://cethos.com/apply' },
}

// /{locale}/apply → redirect to recruitment subdomain.
export default function ApplyRedirect() {
  redirect('https://join.cethos.com/apply')
}
