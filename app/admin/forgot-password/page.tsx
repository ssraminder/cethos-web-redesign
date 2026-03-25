'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-6">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="w-12 h-12 rounded-lg bg-[#0d9488] flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Reset your password</h1>
          <p className="text-sm text-gray-500 mb-6">
            Please contact your administrator to reset your password.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-sm text-[#0d9488] hover:text-[#0f766e] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
