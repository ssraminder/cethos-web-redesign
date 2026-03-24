'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useAdminAuth } from '@/lib/admin/hooks';
import { AdminUser } from '@/lib/admin/permissions';

interface AdminContextType {
  adminUser: AdminUser | null;
  loading: boolean;
  token: string | null;
  logout: () => Promise<void>;
  adminFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const auth = useAdminAuth();

  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cethos-bg-light">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cethos-teal border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!auth.adminUser) return null;

  return (
    <AdminContext.Provider value={auth}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
