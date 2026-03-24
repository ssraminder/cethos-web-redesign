'use client';

import { AdminProvider } from '@/components/admin/AdminContext';
import AdminShell from '@/components/admin/AdminShell';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  );
}
