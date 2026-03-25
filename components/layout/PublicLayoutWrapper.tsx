'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PublicLayoutWrapper({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  // Hide Tawk.to chat widget on admin pages
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Tawk_API) {
      if (isAdmin) {
        (window as any).Tawk_API.hideWidget?.();
      } else {
        (window as any).Tawk_API.showWidget?.();
      }
    }
  }, [isAdmin]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
