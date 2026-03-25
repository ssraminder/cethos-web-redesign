import { Toaster } from 'sonner';
import { CETHOS_FAVICON } from '@/lib/admin/brand';

export const metadata = {
  title: 'Cethos Admin',
  icons: {
    icon: CETHOS_FAVICON,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Toaster position="top-right" richColors closeButton />
      {children}
    </div>
  );
}
