import { NextResponse } from 'next/server';
import { getAdminUserFromToken } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/**
 * POST /api/admin/translations/import
 *
 * Imports translations from JSON or CSV.
 * Expected JSON format: [{ namespace, key, segment_index, <locale>: "value" }]
 * Expected CSV format: namespace,key,segment_index,english,<locale>,status
 */
export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const contentType = request.headers.get('content-type') || '';
  let rows: Array<{
    namespace: string;
    key: string;
    segment_index: number;
    locale: string;
    value: string;
  }> = [];

  if (contentType.includes('application/json')) {
    const body = await request.json();
    const locale = body.locale;
    if (!locale || !body.rows) {
      return NextResponse.json({ error: 'Missing locale or rows' }, { status: 400 });
    }

    rows = body.rows
      .filter((r: Record<string, unknown>) => r[locale] && (r[locale] as string).trim() !== '')
      .map((r: Record<string, unknown>) => ({
        namespace: r.namespace as string,
        key: r.key as string,
        segment_index: Number(r.segment_index) || 0,
        locale,
        value: r[locale] as string,
      }));
  } else {
    return NextResponse.json({ error: 'Unsupported content type. Use application/json.' }, { status: 400 });
  }

  if (rows.length === 0) {
    return NextResponse.json({ error: 'No translations to import' }, { status: 400 });
  }

  // Fetch namespace IDs
  const nsNames = Array.from(new Set(rows.map((r) => r.namespace)));
  const { data: namespaces } = await supabase
    .from('cethosweb_i18n_namespaces')
    .select('id, name')
    .in('name', nsNames);

  if (!namespaces) {
    return NextResponse.json({ error: 'Failed to fetch namespaces' }, { status: 500 });
  }

  const nsMap = new Map(namespaces.map((ns) => [ns.name, ns.id]));

  let imported = 0;
  let skipped = 0;
  const errors: string[] = [];

  // Process in batches of 50
  const batchSize = 50;
  for (let i = 0; i < rows.length; i += batchSize) {
    const batch = rows.slice(i, i + batchSize);
    const upserts = batch
      .filter((r) => {
        const nsId = nsMap.get(r.namespace);
        if (!nsId) {
          errors.push(`Namespace not found: ${r.namespace}`);
          skipped++;
          return false;
        }
        return true;
      })
      .map((r) => ({
        namespace_id: nsMap.get(r.namespace)!,
        key: r.key,
        segment_index: r.segment_index,
        locale: r.locale,
        value: r.value,
        status: 'draft' as const,
      }));

    if (upserts.length > 0) {
      const { error } = await supabase
        .from('cethosweb_i18n_translations')
        .upsert(upserts, {
          onConflict: 'namespace_id,key,segment_index,locale',
          ignoreDuplicates: false,
        });

      if (error) {
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        imported += upserts.length;
      }
    }
  }

  return NextResponse.json({
    imported,
    skipped,
    total: rows.length,
    errors: errors.length > 0 ? errors.slice(0, 10) : undefined,
  });
}
