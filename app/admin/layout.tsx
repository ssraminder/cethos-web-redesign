import { Toaster } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" richColors closeButton />
      {children}
    </div>
  )
}
