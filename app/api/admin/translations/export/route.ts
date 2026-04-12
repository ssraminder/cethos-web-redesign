import { NextResponse } from 'next/server';
import { getAdminUserFromToken } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * GET /api/admin/translations/export?locale=fr&format=csv|json
 *
 * Exports all English translations (with optional target locale columns)
 * for sending to translators.
 */
export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const targetLocale = searchParams.get('locale') || 'fr';
  const format = searchParams.get('format') || 'csv';

  // Fetch all namespaces
  const { data: namespaces } = await supabase
    .from('cethosweb_i18n_namespaces')
    .select('id, name')
    .order('name');

  if (!namespaces) {
    return NextResponse.json({ error: 'Failed to fetch namespaces' }, { status: 500 });
  }

  const nsMap = new Map(namespaces.map((ns) => [ns.id, ns.name]));

  // Fetch all English translations
  const { data: enRows } = await supabase
    .from('cethosweb_i18n_translations')
    .select('namespace_id, key, segment_index, value')
    .eq('locale', 'en')
    .eq('status', 'published')
    .order('namespace_id')
    .order('key')
    .order('segment_index');

  // Fetch target locale translations
  const { data: targetRows } = await supabase
    .from('cethosweb_i18n_translations')
    .select('namespace_id, key, segment_index, value, status')
    .eq('locale', targetLocale)
    .order('namespace_id')
    .order('key')
    .order('segment_index');

  const targetMap = new Map<string, { value: string; status: string }>();
  if (targetRows) {
    for (const r of targetRows) {
      targetMap.set(`${r.namespace_id}:${r.key}:${r.segment_index}`, {
        value: r.value,
        status: r.status,
      });
    }
  }

  // Build export data
  const rows = (enRows || []).map((en) => {
    const nsName = nsMap.get(en.namespace_id) || '';
    const targetKey = `${en.namespace_id}:${en.key}:${en.segment_index}`;
    const target = targetMap.get(targetKey);
    return {
      namespace: nsName,
      key: en.key,
      segment_index: en.segment_index,
      english: en.value,
      [targetLocale]: target?.value || '',
      status: target?.status || 'untranslated',
    };
  });

  if (format === 'json') {
    return new NextResponse(JSON.stringify(rows, null, 2), {
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="translations-${targetLocale}-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  }

  // CSV format
  const csvHeader = `namespace,key,segment_index,english,${targetLocale},status`;
  const csvRows = rows.map((r) =>
    [
      csvEscape(r.namespace),
      csvEscape(r.key),
      r.segment_index,
      csvEscape(r.english),
      csvEscape(r[targetLocale] as string),
      r.status,
    ].join(',')
  );

  const csv = [csvHeader, ...csvRows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="translations-${targetLocale}-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}

function csvEscape(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
