'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Sidebar from './Sidebar';
import { useAdmin } from './AdminContext';
import { Menu, HelpCircle, Bell, ChevronRight, LogOut, Settings, User } from 'lucide-react';
import { useRef } from 'react';

function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname.replace('/admin', '').split('/').filter(Boolean);

  const breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Admin', href: '/admin' },
  ];

  const labelMap: Record<string, string> = {
    blog: 'Blog',
    categories: 'Categories',
    authors: 'Authors',
    new: 'New Post',
    edit: 'Edit Post',
    tracking: 'Tracking Pixels',
    seo: 'SEO Settings',
    calendar: 'Calendar',
    media: 'Media Library',
    redirects: 'Redirects',
    translations: 'Translations',
    help: 'Help',
  };

  let currentPath = '/admin';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const label = labelMap[segment] || segment;
    if (index < segments.length - 1) {
      breadcrumbs.push({ label, href: currentPath });
    } else {
      breadcrumbs.push({ label });
    }
  });

  if (breadcrumbs.length === 1) {
    breadcrumbs[0] = { label: 'Dashboard' };
  }

  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
          {crumb.href ? (
            <Link href={crumb.href} className="text-gray-500 hover:text-gray-900 transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const { adminUser, logout } = useAdmin();

  // Load collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed');
    if (saved === 'true') setCollapsed(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem('admin-sidebar-collapsed', String(next));
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = adminUser?.name
    ?.split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      {/* Main content */}
      <div className={`transition-all duration-300 ${collapsed ? 'lg:ml-16' : 'lg:ml-[260px]'}`}>
        {/* Top header bar */}
        <header className="sticky top-0 z-30 h-14 bg-white border-b border-[#e2e8f0] flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <Breadcrumbs />
          </div>

          <div className="flex items-center gap-1">
            <Link
              href="/admin/help"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Help"
            >
              <HelpCircle className="w-5 h-5" />
            </Link>
            <button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
            </button>
            <div className="relative ml-1" ref={avatarRef}>
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center text-white text-xs font-bold hover:ring-2 hover:ring-[#0d9488]/30 transition-all"
              >
                {initials}
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[180px] z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{adminUser?.name}</p>
                    <p className="text-xs text-gray-500">{adminUser?.email}</p>
                  </div>
                  <Link
                    href="/admin/help"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <Link
                    href="/admin/help"
                    onClick={() => setAvatarOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setAvatarOpen(false); logout(); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
