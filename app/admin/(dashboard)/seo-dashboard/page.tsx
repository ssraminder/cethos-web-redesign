'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import {
  TrendingUp, TrendingDown, Minus, ArrowUp, ArrowDown,
  RefreshCw, Calendar, Loader2, BarChart3, Globe, MousePointerClick,
  DollarSign, Eye, Phone, Users, Target,
} from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ─── Types ─────────────────────────────────────────────

interface DailySnapshot {
  snapshot_date: string;
  ga_sessions: number | null;
  ga_organic_sessions: number | null;
  ga_cpc_sessions: number | null;
  ga_phone_clicks: number | null;
  ga_generate_lead: number | null;
  gsc_total_clicks: number | null;
  gsc_total_impressions: number | null;
  ads_cost_micros: number | null;
  ads_conversions: number | null;
  ads_campaigns: Campaign[] | null;
}

interface Campaign {
  name: string;
  clicks: number;
  cost_micros: number;
  conversions: number;
  impressions: number;
}

interface KeywordRow {
  query: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  prev_position: number | null;
  improvement: number | null;
}

interface PageRow {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

interface DashboardData {
  dailySnapshots: DailySnapshot[];
  keywords: KeywordRow[];
  pages: PageRow[];
}

type DateRange = '7' | '14' | '30';

// ─── Helpers ───────────────────────────────────────────

function fmt(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toLocaleString('en-CA');
}

function fmtMoney(micros: number | null | undefined): string {
  if (micros == null) return '—';
  return `$${(micros / 1_000_000).toFixed(2)}`;
}

function fmtPct(n: number | null | undefined): string {
  if (n == null) return '—';
  return `${(n * 100).toFixed(1)}%`;
}

function fmtPos(n: number | null | undefined): string {
  if (n == null) return '—';
  return n.toFixed(1);
}

function fmtDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-CA', { month: 'short', day: 'numeric' });
}

// ─── Components ────────────────────────────────────────

function MetricCard({
  label, value, prev, icon: Icon, format = 'number', invertColor = false,
}: {
  label: string;
  value: number | null | undefined;
  prev: number | null | undefined;
  icon: typeof TrendingUp;
  format?: 'number' | 'money' | 'percent';
  invertColor?: boolean;
}) {
  const formatted = format === 'money' ? fmtMoney(value) : format === 'percent' ? fmtPct(value) : fmt(value);
  const diff = (value != null && prev != null) ? value - prev : null;
  const isUp = diff != null && diff > 0;
  const isDown = diff != null && diff < 0;
  const isGood = invertColor ? isDown : isUp;
  const isBad = invertColor ? isUp : isDown;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900">{formatted}</span>
        {diff != null && diff !== 0 ? (
          <span className={`flex items-center text-xs font-medium mb-0.5 ${isGood ? 'text-emerald-600' : isBad ? 'text-red-500' : 'text-gray-400'}`}>
            {isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {format === 'money' ? fmtMoney(Math.abs(diff) * 1_000_000) : Math.abs(diff).toLocaleString('en-CA')}
          </span>
        ) : (
          <span className="flex items-center text-xs text-gray-400 mb-0.5">
            <Minus className="w-3 h-3" /> —
          </span>
        )}
      </div>
    </div>
  );
}

function ChangeIndicator({ value }: { value: number | null }) {
  if (value == null || value === 0) return <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500">—</span>;
  const isPositive = value > 0;
  return (
    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${
      isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
    }`}>
      {isPositive ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
      {Math.abs(value).toFixed(1)}
    </span>
  );
}

// ─── Main Page ─────────────────────────────────────────

export default function SeoDashboardPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<DateRange>('30');

  const canView = hasPermission(adminUser!.role, 'seo_dashboard', 'read');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await adminFetch(`/api/admin/seo-dashboard?days=${range}`);
      if (!res.ok) throw new Error('Failed to fetch');
      setData(await res.json());
    } catch {
      toast.error('Failed to load SEO dashboard data');
    } finally {
      setLoading(false);
    }
  }, [adminFetch, range]);

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!canView) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">You don&apos;t have permission to view this page.</p>
      </div>
    );
  }

  const snapshots = data?.dailySnapshots || [];
  const latest = snapshots[snapshots.length - 1] || null;
  const previous = snapshots[snapshots.length - 2] || null;
  const keywords = data?.keywords || [];
  const pages = data?.pages || [];

  // Parse campaigns from latest snapshot
  const campaigns: Campaign[] = latest?.ads_campaigns
    ? (Array.isArray(latest.ads_campaigns) ? latest.ads_campaigns : [])
        .filter((c: Campaign) => c.clicks > 0)
    : [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">SEO Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {latest ? `Latest data: ${fmtDate(latest.snapshot_date)}` : 'No data available'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Date range selector */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
            {(['7', '14', '30'] as DateRange[]).map((d) => (
              <button
                key={d}
                onClick={() => setRange(d)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  range === d ? 'bg-[#0d9488] text-white' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {d}d
              </button>
            ))}
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </div>
      ) : (
        <>
          {/* Section 1: Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard label="Sessions" value={latest?.ga_sessions} prev={previous?.ga_sessions} icon={Users} />
            <MetricCard label="Organic" value={latest?.ga_organic_sessions} prev={previous?.ga_organic_sessions} icon={Globe} />
            <MetricCard label="Ads Spend" value={latest?.ads_cost_micros} prev={previous?.ads_cost_micros} format="money" icon={DollarSign} invertColor />
            <MetricCard label="Ads Conversions" value={latest?.ads_conversions} prev={previous?.ads_conversions} icon={Target} />
            <MetricCard label="GSC Clicks" value={latest?.gsc_total_clicks} prev={previous?.gsc_total_clicks} icon={MousePointerClick} />
            <MetricCard label="GSC Impressions" value={latest?.gsc_total_impressions} prev={previous?.gsc_total_impressions} icon={Eye} />
            <MetricCard label="Phone Clicks" value={latest?.ga_phone_clicks} prev={previous?.ga_phone_clicks} icon={Phone} />
            <MetricCard label="Leads" value={latest?.ga_generate_lead} prev={previous?.ga_generate_lead} icon={BarChart3} />
          </div>

          {/* Section 2: Traffic Trends Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Traffic Trends (Last {range} Days)</h2>
            {snapshots.length > 1 ? (
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={snapshots} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="snapshot_date"
                    tickFormatter={fmtDate}
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    stroke="#e2e8f0"
                  />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} stroke="#e2e8f0" />
                  <Tooltip
                    labelFormatter={(label) => fmtDate(label as string)}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="ga_sessions" name="Total Sessions" stroke="#0d9488" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ga_organic_sessions" name="Organic" stroke="#6366f1" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="ga_cpc_sessions" name="Paid (CPC)" stroke="#f59e0b" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
                Not enough data to show trends. Check back after a few days of data collection.
              </div>
            )}
          </div>

          {/* Section 3: Top Keywords Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Top Keywords</h2>
              <p className="text-xs text-gray-500 mt-0.5">Latest Search Console data, sorted by impressions</p>
            </div>
            {keywords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Keyword</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Position</th>
                      <th className="text-center px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Change</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Clicks</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Impressions</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {keywords.map((kw, i) => (
                      <tr key={kw.query} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-2.5 text-gray-900 font-medium max-w-[300px] truncate">{kw.query}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmtPos(kw.position)}</td>
                        <td className="px-4 py-2.5 text-center"><ChangeIndicator value={kw.improvement} /></td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(kw.clicks)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(kw.impressions)}</td>
                        <td className="px-6 py-2.5 text-right text-gray-700 tabular-nums">{fmtPct(kw.ctr)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">No keyword data available yet.</div>
            )}
          </div>

          {/* Section 4: Google Ads Campaigns */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Google Ads Campaigns</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {latest ? `Data from ${fmtDate(latest.snapshot_date)}` : 'Latest snapshot'}
              </p>
            </div>
            {campaigns.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Campaign</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Clicks</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Spend</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Conversions</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Cost/Conv</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((c, i) => (
                      <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-2.5 text-gray-900 font-medium max-w-[300px] truncate">{c.name}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(c.clicks)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmtMoney(c.cost_micros)}</td>
                        <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(c.conversions)}</td>
                        <td className="px-6 py-2.5 text-right text-gray-700 tabular-nums">
                          {c.conversions > 0 ? fmtMoney(c.cost_micros / c.conversions) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">No active ad campaigns with clicks today.</div>
            )}
          </div>

          {/* Section 5: Top Pages */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">Top Pages</h2>
              <p className="text-xs text-gray-500 mt-0.5">Search Console page-level performance</p>
            </div>
            {pages.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Page</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Clicks</th>
                      <th className="text-right px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Impressions</th>
                      <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide">Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((p, i) => {
                      // Show just the path part if it's a full URL
                      const displayUrl = p.query.startsWith('http') ? new URL(p.query).pathname : p.query;
                      return (
                        <tr key={p.query} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                          <td className="px-6 py-2.5 text-gray-900 font-medium max-w-[400px] truncate" title={p.query}>
                            {displayUrl}
                          </td>
                          <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(p.clicks)}</td>
                          <td className="px-4 py-2.5 text-right text-gray-700 tabular-nums">{fmt(p.impressions)}</td>
                          <td className="px-6 py-2.5 text-right text-gray-700 tabular-nums">{fmtPos(p.position)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="px-6 py-12 text-center text-gray-400 text-sm">No page-level data available yet.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
