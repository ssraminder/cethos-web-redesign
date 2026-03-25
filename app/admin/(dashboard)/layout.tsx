'use client';

import { AdminProvider } from '@/components/admin/AdminContext';
import AdminShell from '@/components/admin/AdminShell';
import ErrorBoundary from '@/components/admin/ErrorBoundary';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function KeyboardShortcuts({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Only trigger when not in an input/textarea
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      // Escape = close modals (handled by individual modals)
      if (e.key === 'Escape') return;

      // N = New Post (when not typing)
      if (e.key === 'n' && !isInput && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        router.push('/admin/blog/new');
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  return <>{children}</>;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <KeyboardShortcuts>
        <AdminShell>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </AdminShell>
      </KeyboardShortcuts>
    </AdminProvider>
  );
}
