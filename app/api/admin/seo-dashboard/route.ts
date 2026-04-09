import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'seo_dashboard', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const url = new URL(request.url);
  const days = parseInt(url.searchParams.get('days') || '30', 10);

  const [dailyRes, keywordsRes, pagesRes] = await Promise.all([
    // Daily audit snapshots (last N days)
    supabase
      .from('daily_audit_snapshots')
      .select('*')
      .eq('site', 'cethos')
      .order('snapshot_date', { ascending: false })
      .limit(days),

    // Latest keyword snapshots with previous comparison
    supabase.rpc('get_keyword_comparison', { site_param: 'cethos', result_limit: 25 }).then(res => {
      // If RPC doesn't exist, fallback to direct query
      if (res.error) {
        return supabase
          .from('seo_keyword_snapshots')
          .select('*')
          .eq('site', 'cethos')
          .order('snapshot_date', { ascending: false })
          .limit(50);
      }
      return res;
    }),

    // Top pages
    supabase
      .from('seo_keyword_snapshots')
      .select('query, clicks, impressions, position')
      .eq('site', 'cethos_pages')
      .order('snapshot_date', { ascending: false })
      .limit(100),
  ]);

  // Process daily data
  const dailySnapshots = (dailyRes.data || []).reverse(); // chronological order

  // Process keywords — deduplicate to latest snapshot only
  let keywords = keywordsRes.data || [];
  if (!keywords.length || keywords[0]?.improvement === undefined) {
    // Fallback: manual comparison from raw snapshots
    const raw = keywordsRes.data || [];
    const dateGroups = new Map<string, typeof raw>();
    for (const row of raw) {
      const existing = dateGroups.get(row.snapshot_date) || [];
      existing.push(row);
      dateGroups.set(row.snapshot_date, existing);
    }
    const dates = Array.from(dateGroups.keys()).sort().reverse();
    const latest = dates[0] ? dateGroups.get(dates[0]) || [] : [];
    const previous = dates[1] ? dateGroups.get(dates[1]) || [] : [];
    const prevMap = new Map(previous.map((p: { query: string; position: number }) => [p.query, p.position]));

    keywords = latest
      .map((k: { query: string; position: number; clicks: number; impressions: number; ctr: number }) => ({
        query: k.query,
        position: k.position,
        clicks: k.clicks,
        impressions: k.impressions,
        ctr: k.ctr,
        prev_position: prevMap.get(k.query) ?? null,
        improvement: prevMap.has(k.query) ? Math.round(((prevMap.get(k.query) as number) - k.position) * 100) / 100 : null,
      }))
      .sort((a: { impressions: number }, b: { impressions: number }) => b.impressions - a.impressions)
      .slice(0, 25);
  }

  // Process pages — deduplicate to latest snapshot
  const pagesRaw = pagesRes.data || [];
  const seenPages = new Set<string>();
  const pages = pagesRaw
    .filter((p: { query: string }) => {
      if (seenPages.has(p.query)) return false;
      seenPages.add(p.query);
      return true;
    })
    .sort((a: { impressions: number }, b: { impressions: number }) => b.impressions - a.impressions)
    .slice(0, 15);

  return NextResponse.json({
    dailySnapshots,
    keywords,
    pages,
  });
}
