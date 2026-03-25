'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { CETHOS_LOGO_DARK_BG, CETHOS_LOGO_LIGHT_BG } from '@/lib/admin/brand';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createBrowserSupabaseClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      const res = await fetch('/api/admin/auth', {
        headers: { Authorization: `Bearer ${data.session?.access_token}` },
      });

      if (!res.ok) {
        await supabase.auth.signOut();
        setError("You don't have admin access. Contact your administrator.");
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex font-sans">
      {/* Left panel - branding */}
      <div className="hidden lg:flex lg:w-[40%] bg-gradient-to-br from-[#0d9488] to-[#0f766e] relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full border border-white/10" />
          <div className="absolute bottom-32 right-10 w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-white/5" />
          <div className="absolute top-10 right-20 w-20 h-20 rotate-45 border border-white/10 rounded-lg" />
          <div className="absolute bottom-20 left-20 w-16 h-16 rotate-12 border border-white/10 rounded-lg" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-10 w-full">
          {/* Logo */}
          <div>
            <img
              src={CETHOS_LOGO_DARK_BG}
              alt="Cethos Solutions Inc."
              className="h-9 w-auto"
            />
          </div>

          {/* Center content */}
          <div className="max-w-sm">
            <h2 className="text-3xl font-bold text-white leading-tight">
              Manage your content with confidence
            </h2>
            <p className="mt-4 text-white/80 text-base leading-relaxed">
              The Cethos marketing hub — blog, SEO, and analytics in one place.
            </p>
          </div>

          {/* Footer */}
          <p className="text-white/50 text-sm">
            &copy; 2026 Cethos Solutions Inc.
          </p>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex items-center justify-center bg-white px-6">
        <div className="w-full max-w-md">
          {/* Logo for mobile / color version */}
          <div className="mb-8">
            <img
              src={CETHOS_LOGO_LIGHT_BG}
              alt="Cethos Solutions Inc."
              className="h-9 w-auto"
            />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-1 mb-8">Sign in to your admin account</p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none transition-colors text-sm"
                placeholder="you@cethos.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none transition-colors text-sm"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <Link href="/admin/forgot-password" className="text-sm text-[#0d9488] hover:text-[#0f766e] transition-colors">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white font-semibold py-2.5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-8">
            <a href="https://cethos.com" className="hover:text-[#0d9488] transition-colors">
              &larr; Back to cethos.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
