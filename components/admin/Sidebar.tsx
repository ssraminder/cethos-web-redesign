'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from './AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import {
  LayoutDashboard, FileText, FolderOpen, Users, MapPin,
  Search, LogOut, ChevronDown, ChevronRight, X, ExternalLink,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { adminUser, logout } = useAdmin();
  const [blogOpen, setBlogOpen] = useState(pathname.startsWith('/admin/blog'));

  if (!adminUser) return null;

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    {
      label: 'Blog',
      icon: FileText,
      active: pathname.startsWith('/admin/blog'),
      children: [
        { label: 'Posts', href: '/admin/blog' },
        { label: 'Categories', href: '/admin/blog/categories' },
        ...(hasPermission(adminUser.role, 'blog_authors', 'read')
          ? [{ label: 'Authors', href: '/admin/blog/authors' }]
          : []),
      ],
    },
    ...(hasPermission(adminUser.role, 'tracking_pixels', 'read')
      ? [{
          label: 'Tracking Pixels',
          href: '/admin/tracking',
          icon: MapPin,
          active: pathname.startsWith('/admin/tracking'),
        }]
      : []),
    ...(hasPermission(adminUser.role, 'seo_settings', 'read')
      ? [{
          label: 'SEO Settings',
          href: '/admin/seo',
          icon: Search,
          active: pathname.startsWith('/admin/seo'),
        }]
      : []),
  ];

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    editor: 'Editor',
    author: 'Author',
    viewer: 'Viewer',
  };

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-cethos-navy text-white z-50 flex flex-col transition-transform lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold tracking-wide">CETHOS ADMIN</h1>
            <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/10 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cethos-teal flex items-center justify-center text-sm font-bold">
              {adminUser.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{adminUser.name}</p>
              <p className="text-xs text-white/60">{roleLabels[adminUser.role]}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            if ('children' in item && item.children) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setBlogOpen(!blogOpen)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                      item.active ? 'text-white' : 'text-white/70'
                    }`}
                  >
                    {item.icon && <item.icon className="w-5 h-5 flex-shrink-0" />}
                    <span className="flex-1 text-left">{item.label}</span>
                    {blogOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                  {blogOpen && (
                    <div className="ml-8 border-l border-white/10">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`block px-4 py-2 text-sm transition-colors ${
                              isActive
                                ? 'text-cethos-teal-light border-l-2 border-cethos-teal-light -ml-px bg-white/5'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const navItem = item as { label: string; href: string; icon: typeof LayoutDashboard; active: boolean };
            return (
              <Link
                key={navItem.href}
                href={navItem.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  navItem.active
                    ? 'text-white bg-white/10 border-l-3 border-cethos-teal-light'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <navItem.icon className="w-5 h-5 flex-shrink-0" />
                <span>{navItem.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 space-y-1">
          <a
            href="https://cethos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Back to Website
          </a>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-white/60 hover:text-red-400 hover:bg-white/5 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
