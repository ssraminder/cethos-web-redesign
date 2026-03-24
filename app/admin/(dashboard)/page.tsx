'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import { FileText, FolderOpen, Users, Eye, Plus, ExternalLink } from 'lucide-react';
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

export default function AdminDashboardPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<AuditEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, activityRes] = await Promise.all([
          adminFetch('/api/admin/dashboard/stats'),
          hasPermission(adminUser!.role, 'audit_log', 'read')
            ? adminFetch('/api/admin/dashboard/activity')
            : Promise.resolve(null),
        ]);

        if (statsRes.ok) {
          setStats(await statsRes.json());
        }
        if (activityRes?.ok) {
          const data = await activityRes.json();
          setRecentActivity(data.entries || []);
        }
      } catch {
        // Dashboard data is non-critical
      }
    }
    fetchData();
  }, [adminFetch, adminUser]);

  const statCards = [
    { label: 'Total Posts', value: stats?.totalPosts ?? '-', icon: FileText, color: 'bg-blue-50 text-blue-600' },
    { label: 'Published', value: stats?.publishedPosts ?? '-', icon: Eye, color: 'bg-green-50 text-green-600' },
    { label: 'Drafts', value: stats?.draftPosts ?? '-', icon: FileText, color: 'bg-yellow-50 text-yellow-600' },
    { label: 'Categories', value: stats?.categories ?? '-', icon: FolderOpen, color: 'bg-purple-50 text-purple-600' },
  ];

  function timeAgo(dateStr: string) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {adminUser?.name.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">Here&apos;s what&apos;s happening with your site.</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 bg-cethos-teal hover:bg-cethos-teal-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
          <a
            href="https://cethos.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            View Site
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {hasPermission(adminUser!.role, 'audit_log', 'read') && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-5 py-4 border-b border-gray-100">
            <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.length === 0 ? (
              <p className="px-5 py-8 text-center text-gray-400 text-sm">No recent activity</p>
            ) : (
              recentActivity.map((entry) => (
                <div key={entry.id} className="px-5 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-600 flex-shrink-0">
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
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
