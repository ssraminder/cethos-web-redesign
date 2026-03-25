import { Toaster } from 'sonner';

export const metadata = {
  title: 'Cethos Admin',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Toaster position="top-right" richColors closeButton />
      {children}
    </div>
  );
}
