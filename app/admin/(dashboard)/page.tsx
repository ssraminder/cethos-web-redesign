'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import {
  FileText, FolderOpen, Eye, Plus, ExternalLink, Clock, ArrowUpRight,
  BarChart3, TrendingUp, MousePointerClick, Search, Globe, Megaphone,
  CheckCircle2,
} from 'lucide-react';
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

interface TrackingPixel {
  id: string;
  name: string;
  type: string;
  pixel_id: string | null;
  is_active: boolean;
}

// Section heading component for consistent sizing
function SectionHeading({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-[#0f172a]">{children}</h2>
      {icon}
    </div>
  );
}

export default function AdminDashboardPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<AuditEntry[]>([]);
  const [drafts, setDrafts] = useState<DraftPost[]>([]);
  const [pixels, setPixels] = useState<TrackingPixel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      // Fetch each independently so one failure doesn't block others
      const results = await Promise.allSettled([
        adminFetch('/api/admin/dashboard/stats'),
        hasPermission(adminUser!.role, 'audit_log', 'read')
          ? adminFetch('/api/admin/dashboard/activity')
          : Promise.resolve(null),
        adminFetch('/api/admin/blog/posts?status=draft&limit=5'),
        adminFetch('/api/admin/tracking'),
      ]);

      // Stats
      if (results[0].status === 'fulfilled' && results[0].value?.ok) {
        setStats(await results[0].value.json());
      }
      // Activity
      if (results[1].status === 'fulfilled' && results[1].value?.ok) {
        const data = await results[1].value.json();
        setRecentActivity(data.entries || []);
      }
      // Drafts
      if (results[2].status === 'fulfilled' && results[2].value?.ok) {
        const data = await results[2].value.json();
        setDrafts(data.posts || []);
      }
      // Tracking pixels
      if (results[3].status === 'fulfilled' && results[3].value?.ok) {
        const data = await results[3].value.json();
        setPixels(Array.isArray(data) ? data : []);
      }

      setLoading(false);
    }
    fetchAll();
  }, [adminFetch, adminUser]);

  // Find connected pixels by type
  function findPixel(...types: string[]): TrackingPixel | undefined {
    return pixels.find(p => types.includes(p.type) && p.is_active);
  }

  const gaPixel = findPixel('google_analytics');
  const gtmPixel = findPixel('google_tag_manager');
  const adsPixel = findPixel('google_ads');

  // GA is connected if either GA4 or GTM is active
  const gaConnected = !!(gaPixel || gtmPixel);
  // Search Console — connected if GA or GTM is set up (GSC data flows via same property)
  const gscConnected = gaConnected;
  // Ads — only if an explicit google_ads pixel exists, or GTM is active (ads often fires through GTM)
  const adsConnected = !!(adsPixel || gtmPixel);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[1,2,3,4].map(i => (
            <div key={i} className="bg-white rounded-lg border border-[#e2e8f0] p-5 border-l-4 border-l-gray-200">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
              <div className="h-8 w-12 bg-gray-200 rounded animate-pulse mt-2" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {[1,2,3].map(i => (
            <div key={i} className="bg-white rounded-lg border border-[#e2e8f0] p-5 border-l-4 border-l-gray-200">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[1,2,3,4].map(j => (
                  <div key={j}>
                    <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                    <div className="h-5 w-10 bg-gray-200 rounded animate-pulse mt-1" />
                  </div>
                ))}
              </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`bg-white rounded-lg border border-[#e2e8f0] p-5 border-l-4 ${card.borderColor} hover:shadow-md transition-shadow cursor-pointer group`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#64748b] uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-[#0f172a] mt-1">{card.value}</p>
                <p className="text-xs text-[#64748b] mt-1">+0 this week</p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 group-hover:text-[#0d9488] transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Analytics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <AnalyticsCard
          title="Google Analytics"
          icon={<BarChart3 className="w-4 h-4 text-[#e37400]" />}
          connected={gaConnected}
          pixelName={gaPixel?.name || gtmPixel?.name}
          pixelId={gaPixel?.pixel_id || gtmPixel?.pixel_id}
          metrics={[
            { label: 'Sessions (30d)', value: gaConnected ? 'See GA4' : '--' },
            { label: 'Page Views', value: gaConnected ? 'See GA4' : '--' },
            { label: 'Avg. Duration', value: gaConnected ? 'See GA4' : '--' },
            { label: 'Bounce Rate', value: gaConnected ? 'See GA4' : '--' },
          ]}
          color="border-l-[#e37400]"
          connectLabel="Add GA4 Tracking"
          connectHref="/admin/tracking"
          note={gaConnected ? 'View detailed analytics in your Google Analytics dashboard.' : undefined}
        />
        <AnalyticsCard
          title="Search Console"
          icon={<Search className="w-4 h-4 text-[#4285f4]" />}
          connected={gscConnected}
          pixelName={gscConnected ? 'Linked via GA4 / GTM' : undefined}
          metrics={[
            { label: 'Impressions (30d)', value: gscConnected ? 'See GSC' : '--' },
            { label: 'Clicks', value: gscConnected ? 'See GSC' : '--' },
            { label: 'Avg. CTR', value: gscConnected ? 'See GSC' : '--' },
            { label: 'Avg. Position', value: gscConnected ? 'See GSC' : '--' },
          ]}
          color="border-l-[#4285f4]"
          connectLabel="Set up Search Console"
          connectHref="/admin/seo"
          note={gscConnected ? 'View search performance in Google Search Console.' : undefined}
        />
        <AnalyticsCard
          title="Google Ads"
          icon={<Megaphone className="w-4 h-4 text-[#34a853]" />}
          connected={adsConnected}
          pixelName={adsPixel?.name || (adsConnected ? 'Linked via GTM' : undefined)}
          pixelId={adsPixel?.pixel_id}
          metrics={[
            { label: 'Impressions (30d)', value: adsConnected ? 'See Ads' : '--' },
            { label: 'Clicks', value: adsConnected ? 'See Ads' : '--' },
            { label: 'Conversions', value: adsConnected ? 'See Ads' : '--' },
            { label: 'Spend', value: adsConnected ? 'See Ads' : '--' },
          ]}
          color="border-l-[#34a853]"
          connectLabel="Add Google Ads Tag"
          connectHref="/admin/tracking"
          note={adsConnected ? 'View campaign performance in Google Ads dashboard.' : undefined}
        />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity - 65% */}
        <div className="lg:col-span-3">
          {hasPermission(adminUser!.role, 'audit_log', 'read') && (
            <div className="bg-white rounded-lg border border-[#e2e8f0]">
              <SectionHeading icon={<Clock className="w-4 h-4 text-gray-400" />}>
                Recent Activity
              </SectionHeading>
              <div className="divide-y divide-gray-50">
                {recentActivity.length === 0 ? (
                  <div className="px-5 py-10 text-center">
                    <Clock className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                    <p className="text-xs font-medium text-gray-500">No recent activity yet</p>
                    <p className="text-xs text-gray-400 mt-0.5">Activity will appear here as you manage content</p>
                  </div>
                ) : (
                  <>
                    {recentActivity.slice(0, 10).map((entry) => (
                      <div key={entry.id} className="px-5 py-2.5 flex items-center justify-between hover:bg-gray-50/50">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-[#0d9488]/10 flex items-center justify-center text-[10px] font-bold text-[#0d9488] flex-shrink-0">
                            {entry.user_name?.charAt(0) || '?'}
                          </div>
                          <p className="text-xs text-gray-700 truncate">
                            <span className="font-medium text-gray-900">{entry.user_name}</span>{' '}
                            {entry.action}d {entry.entity_type.replace('_', ' ')}{' '}
                            &ldquo;{entry.entity_name}&rdquo;
                          </p>
                        </div>
                        <span className="text-[10px] text-gray-400 flex-shrink-0 ml-3">
                          {timeAgo(entry.created_at)}
                        </span>
                      </div>
                    ))}
                    <div className="px-5 py-2.5 text-center">
                      <button className="text-xs text-[#0d9488] hover:text-[#0f766e] font-medium">
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
        <div className="lg:col-span-2 space-y-4">
          {/* Drafts Needing Review */}
          <div className="bg-white rounded-lg border border-[#e2e8f0]">
            <SectionHeading
              icon={
                <span className="text-[10px] font-medium bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded-full border border-amber-200">
                  {drafts.length}
                </span>
              }
            >
              Drafts Needing Review
            </SectionHeading>
            <div className="divide-y divide-gray-50">
              {drafts.length === 0 ? (
                <div className="px-5 py-6 text-center">
                  <p className="text-xs text-gray-400">No drafts pending review</p>
                </div>
              ) : (
                drafts.map((draft) => (
                  <Link
                    key={draft.id}
                    href={`/admin/blog/${draft.id}/edit`}
                    className="flex items-center justify-between px-5 py-2 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xs text-gray-700 truncate">{draft.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Top Posts */}
          <div className="bg-white rounded-lg border border-[#e2e8f0]">
            <SectionHeading icon={<TrendingUp className="w-4 h-4 text-gray-400" />}>
              Top Posts This Month
            </SectionHeading>
            <div className="px-5 py-6 text-center">
              <Globe className="w-6 h-6 text-gray-200 mx-auto mb-1.5" />
              <p className="text-xs text-gray-400">
                {gaConnected
                  ? 'View top pages in your Google Analytics dashboard'
                  : 'Connect Google Analytics to see top posts'}
              </p>
            </div>
          </div>

          {/* Search Performance */}
          <div className="bg-white rounded-lg border border-[#e2e8f0]">
            <SectionHeading icon={<Search className="w-4 h-4 text-gray-400" />}>
              Top Search Queries
            </SectionHeading>
            <div className="px-5 py-6 text-center">
              <Search className="w-6 h-6 text-gray-200 mx-auto mb-1.5" />
              <p className="text-xs text-gray-400">
                {gscConnected
                  ? 'View queries in Google Search Console'
                  : 'Connect Search Console to see top queries'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Analytics Card component
function AnalyticsCard({
  title,
  icon,
  connected,
  pixelName,
  pixelId,
  metrics,
  color,
  connectLabel,
  connectHref,
  note,
}: {
  title: string;
  icon: React.ReactNode;
  connected: boolean;
  pixelName?: string;
  pixelId?: string | null;
  metrics: { label: string; value: string }[];
  color: string;
  connectLabel: string;
  connectHref: string;
  note?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border border-[#e2e8f0] border-l-4 ${color}`}>
      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-sm font-semibold text-[#0f172a]">{title}</h3>
        </div>
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${
          connected
            ? 'bg-green-50 text-green-700 border border-green-200'
            : 'bg-gray-50 text-gray-500 border border-gray-200'
        }`}>
          {connected ? 'Connected' : 'Not connected'}
        </span>
      </div>
      <div className="p-4">
        {connected ? (
          <div>
            {/* Show which pixel is providing the connection */}
            <div className="flex items-center gap-1.5 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span className="text-xs text-gray-600">
                {pixelName}
                {pixelId && (
                  <code className="ml-1 text-[10px] bg-gray-100 px-1 py-0.5 rounded">{pixelId}</code>
                )}
              </span>
            </div>
            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-2">
              {metrics.map((m) => (
                <div key={m.label} className="bg-gray-50 rounded px-2.5 py-2">
                  <p className="text-[10px] text-[#64748b] uppercase tracking-wide">{m.label}</p>
                  <p className="text-sm font-semibold text-[#0f172a] mt-0.5">{m.value}</p>
                </div>
              ))}
            </div>
            {note && (
              <p className="text-[10px] text-gray-400 mt-2">{note}</p>
            )}
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-xs text-gray-400 mb-2">No tracking pixel detected</p>
            <Link
              href={connectHref}
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0d9488] hover:text-[#0f766e]"
            >
              <MousePointerClick className="w-3 h-3" />
              {connectLabel}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
