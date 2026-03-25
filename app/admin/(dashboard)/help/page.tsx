'use client';

import { HelpCircle, BookOpen, MessageCircle, Mail } from 'lucide-react';

export default function HelpPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0f172a]">Help & Documentation</h1>
        <p className="text-sm text-[#64748b] mt-1">Get help with the Cethos admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
          <BookOpen className="w-8 h-8 text-[#0d9488] mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Documentation</h3>
          <p className="text-sm text-gray-500">Learn how to use the admin panel effectively.</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
          <MessageCircle className="w-8 h-8 text-[#2563eb] mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Support</h3>
          <p className="text-sm text-gray-500">Contact our team for technical support.</p>
        </div>
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-6">
          <Mail className="w-8 h-8 text-[#d97706] mb-3" />
          <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
          <p className="text-sm text-gray-500">Reach out to us at support@cethos.com</p>
        </div>
      </div>
    </div>
  );
}
