import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Apply to join the CETHOS vendor network',
  description: 'Join CETHOS as a freelance translator, interpreter, transcriber, clinician reviewer, or cognitive debriefing consultant.',
  alternates: { canonical: 'https://cethos.com/join' },
}

// /{locale}/join short-link → redirects straight to the applicant intake form.
// The apply form lives on the recruitment subdomain (join.cethos.com) and is
// a standalone Vite + React + Supabase app.
export default function JoinRedirect() {
  redirect('https://join.cethos.com/apply')
}
