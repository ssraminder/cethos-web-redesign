'use client';

import { createBrowserSupabaseClient } from '@/lib/supabase';
import { AdminUser } from './permissions';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();

    async function checkAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/admin/login');
          return;
        }

        setToken(session.access_token);

        // Fetch admin user record using service-level API
        const res = await fetch('/api/admin/auth', {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });

        if (!res.ok) {
          router.push('/admin/login');
          return;
        }

        const data = await res.json();
        setAdminUser(data.user);
      } catch {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setAdminUser(null);
        setToken(null);
        router.push('/admin/login');
      } else {
        setToken(session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const logout = useCallback(async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }, [router]);

  // Helper for authenticated API calls
  const adminFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    if (!token) throw new Error('Not authenticated');
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }, [token]);

  return { adminUser, loading, token, logout, adminFetch };
}
