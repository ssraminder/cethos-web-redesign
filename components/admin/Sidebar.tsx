'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from './AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import {
  LayoutDashboard, FileText, FolderOpen, Users, Code2,
  Search, LogOut, ChevronDown, ChevronRight, ChevronLeft,
  X, ExternalLink, CalendarDays, Image, ArrowLeftRight,
  Settings, User, BarChart3, Globe,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { CETHOS_LOGO_DARK_BG, CETHOS_FAVICON } from '@/lib/admin/brand';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({ open, onClose, collapsed, onToggleCollapse }: SidebarProps) {
  const pathname = usePathname();
  const { adminUser, logout } = useAdmin();
  const [blogOpen, setBlogOpen] = useState(pathname.startsWith('/admin/blog'));
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!adminUser) return null;

  const navItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      active: pathname === '/admin',
    },
    ...(hasPermission(adminUser.role, 'blog_posts', 'read')
      ? [{
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
        }]
      : []),
    ...(adminUser.role !== 'translator'
      ? [{
          label: 'Calendar',
          href: '/admin/calendar',
          icon: CalendarDays,
          active: pathname.startsWith('/admin/calendar'),
        }]
      : []),
    ...(hasPermission(adminUser.role, 'tracking_pixels', 'read')
      ? [{
          label: 'Tracking Pixels',
          href: '/admin/tracking',
          icon: Code2,
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
    ...(adminUser.role !== 'translator'
      ? [{
          label: 'Media Library',
          href: '/admin/media',
          icon: Image,
          active: pathname.startsWith('/admin/media'),
        },
        {
          label: 'Redirects',
          href: '/admin/redirects',
          icon: ArrowLeftRight,
          active: pathname.startsWith('/admin/redirects'),
        }]
      : []),
    ...(hasPermission(adminUser.role, 'seo_dashboard', 'read')
      ? [{
          label: 'SEO Dashboard',
          href: '/admin/seo-dashboard',
          icon: BarChart3,
          active: pathname.startsWith('/admin/seo-dashboard'),
        }]
      : []),
    ...(hasPermission(adminUser.role, 'translations', 'read')
      ? [{
          label: 'Translations',
          href: '/admin/translations',
          icon: Globe,
          active: pathname.startsWith('/admin/translations'),
        }]
      : []),
  ];

  const roleLabels: Record<string, string> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    editor: 'Editor',
    author: 'Author',
    viewer: 'Viewer',
    translator: 'Translator',
  };

  const initials = adminUser.name
    .split(' ')
    .map((n) => n.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-[#0f172a] text-white z-50 flex flex-col transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-[260px]'
        } ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-white/10 flex-shrink-0">
          <Link href="/admin" className="flex items-center min-w-0" onClick={onClose}>
            {collapsed ? (
              <img
                src={CETHOS_FAVICON}
                alt="Cethos"
                className="w-8 h-8 flex-shrink-0"
              />
            ) : (
              <img
                src={CETHOS_LOGO_DARK_BG}
                alt="Cethos Solutions Inc."
                className="h-7 w-auto"
              />
            )}
          </Link>
          <button onClick={onClose} className="lg:hidden ml-auto p-1 hover:bg-white/10 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-3 overflow-y-auto">
          {navItems.map((item) => {
            if ('children' in item && item.children) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => setBlogOpen(!blogOpen)}
                    title={collapsed ? item.label : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-[13px] transition-colors hover:bg-[#1e293b] ${
                      item.active
                        ? 'text-white font-semibold border-l-[3px] border-[#0d9488] bg-[#1e293b]'
                        : 'text-white/70 border-l-[3px] border-transparent'
                    }`}
                  >
                    {item.icon && <item.icon className="w-[18px] h-[18px] flex-shrink-0" />}
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.label}</span>
                        {blogOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </>
                    )}
                  </button>
                  {blogOpen && !collapsed && (
                    <div className="ml-[27px] pl-3 border-l border-white/10">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href || (child.href === '/admin/blog' && pathname.startsWith('/admin/blog/') && !pathname.includes('categories') && !pathname.includes('authors'));
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className={`block py-1.5 pl-3 text-[13px] transition-colors rounded-r ${
                              isActive
                                ? 'text-[#5eead4] font-medium'
                                : 'text-white/50 hover:text-white/80'
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
                title={collapsed ? navItem.label : undefined}
                className={`flex items-center gap-3 px-4 py-2 text-[13px] transition-colors hover:bg-[#1e293b] ${
                  navItem.active
                    ? 'text-white font-semibold border-l-[3px] border-[#0d9488] bg-[#1e293b]'
                    : 'text-white/70 border-l-[3px] border-transparent'
                }`}
              >
                <navItem.icon className="w-[18px] h-[18px] flex-shrink-0" />
                {!collapsed && <span>{navItem.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-white/10 flex-shrink-0">
          {/* User section */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#1e293b] transition-colors"
              title={collapsed ? adminUser.name : undefined}
            >
              <div className="w-8 h-8 rounded-full bg-[#0d9488] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              {!collapsed && (
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-sm font-medium truncate">{adminUser.name}</p>
                  <p className="text-[11px] text-white/50">{roleLabels[adminUser.role]}</p>
                </div>
              )}
            </button>

            {/* User dropdown */}
            {userMenuOpen && (
              <div className={`absolute bottom-full mb-1 bg-[#1e293b] rounded-lg border border-white/10 shadow-xl py-1 min-w-[180px] ${
                collapsed ? 'left-full ml-2' : 'left-4 right-4'
              }`}>
                <Link
                  href="/admin/help"
                  onClick={() => { setUserMenuOpen(false); onClose(); }}
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <a
                  href="https://cethos.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Site
                </a>
                <div className="border-t border-white/10 my-1" />
                <button
                  onClick={() => { setUserMenuOpen(false); logout(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Collapse toggle - desktop only */}
          <button
            onClick={onToggleCollapse}
            className="hidden lg:flex w-full items-center justify-center py-2 text-white/40 hover:text-white/70 hover:bg-[#1e293b] transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>
    </>
  );
}
