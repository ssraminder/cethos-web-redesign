'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import { FileText, FolderOpen, Eye, Plus, ExternalLink, Clock, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  categories: number;
}

interface AuditEntry {
  id: string;
  user_name: string;
  action: string;
  entity_type: string;
  entity_name: string;
  created_at: string;
}

interface DraftPost {
  id: string;
  title: string;
}

export default function AdminDashboardPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<AuditEntry[]>([]);
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, activityRes, draftsRes] = await Promise.all([
          adminFetch('/api/admin/dashboard/stats'),
          hasPermission(adminUser!.role, 'audit_log', 'read')
            ? adminFetch('/api/admin/dashboard/activity')
            : Promise.resolve(null),
          adminFetch('/api/admin/blog/posts?status=draft&limit=5'),
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (activityRes?.ok) {
          const data = await activityRes.json();
          setRecentActivity(data.entries || []);
        }
        if (draftsRes.ok) {
          const data = await draftsRes.json();
          setDrafts(data.posts || []);
        }
      } catch {
        // Dashboard data is non-critical
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [adminFetch, adminUser]);

  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const statCards = [
    { label: 'Total Posts', value: stats?.totalPosts ?? '-', icon: FileText, borderColor: 'border-l-blue-500', href: '/admin/blog' },
    { label: 'Published', value: stats?.publishedPosts ?? '-', icon: Eye, borderColor: 'border-l-green-500', href: '/admin/blog?status=published' },
    { label: 'Drafts', value: stats?.draftPosts ?? '-', icon: FileText, borderColor: 'border-l-amber-500', href: '/admin/blog?status=draft' },
    { label: 'Categories', value: stats?.categories ?? '-', icon: FolderOpen, borderColor: 'border-l-purple-500', href: '/admin/blog/categories' },
  ];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  // Skeleton loader
  if (loading) {
    return (
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-7 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-40 bg-gray-100 rounded animate-pulse mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-lg border border-[#e2e8f0] p-5 border-l-4 border-l-gray-200">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">
            {greeting}, {adminUser?.name.split(' ')[0]}
          </h1>
          <p className="text-[#64748b] text-sm mt-1">{dateStr}</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
          <a
            href="https://cethos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-[#e2e8f0] hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-white rounded-lg border border-[#e2e8f0] p-5 border-l-4 ${card.borderColor} hover:shadow-md transition-shadow cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#64748b]">{card.label}</p>
                <p className="text-2xl font-bold text-[#0f172a] mt-1">{card.value}</p>
                <p className="text-xs text-[#64748b] mt-1">+0 this week</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#0d9488] transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity - 65% */}
        <div className="lg:col-span-3">
          {hasPermission(adminUser!.role, 'audit_log', 'read') && (
            <div className="bg-white rounded-lg border border-[#e2e8f0]">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-[#0f172a]">Recent Activity</h2>
                <Clock className="w-4 h-4 text-gray-400" />
              </div>
              <div className="divide-y divide-gray-50">
                {recentActivity.length === 0 ? (
                  <div className="px-5 py-12 text-center">
                    <Clock className="w-10 h-10 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500">No recent activity yet</p>
                    <p className="text-xs text-gray-400 mt-1">Activity will appear here as you manage content</p>
                  </div>
                ) : (
                  <>
                    {recentActivity.slice(0, 15).map((entry) => (
                      <div key={entry.id} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50/50">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#0d9488]/10 flex items-center justify-center text-xs font-bold text-[#0d9488] flex-shrink-0">
                            {entry.user_name?.charAt(0) || '?'}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-900 truncate">
                              <span className="font-medium">{entry.user_name}</span>{' '}
                              {entry.action}d{' '}
                              <span className="text-gray-600">{entry.entity_type.replace('_', ' ')}</span>{' '}
                              &ldquo;{entry.entity_name}&rdquo;
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400 flex-shrink-0 ml-4">
                          {timeAgo(entry.created_at)}
                        </span>
                      </div>
                    ))}
                    <div className="px-5 py-3 text-center">
                      <button className="text-sm text-[#0d9488] hover:text-[#0f766e] font-medium">
                        View all activity
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Stats Panel - 35% */}
        <div className="lg:col-span-2 space-y-6">
          {/* Drafts Needing Review */}
          <div className="bg-white rounded-lg border border-[#e2e8f0]">
            <div className="px-5 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[#0f172a]">Drafts Needing Review</h2>
                <span className="text-xs font-medium bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                  {drafts.length}
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-50">
              {drafts.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm text-gray-400">No drafts pending review</p>
                </div>
              ) : (
                drafts.map((draft) => (
                  <Link
                    key={draft.id}
                    href={`/admin/blog/${draft.id}/edit`}
                    className="flex items-center justify-between px-5 py-2.5 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm text-gray-700 truncate">{draft.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Top Posts placeholder */}
          <div className="bg-white rounded-lg border border-[#e2e8f0]">
            <div className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#0f172a]">Top Posts This Month</h2>
            </div>
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-gray-400">Analytics data coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
