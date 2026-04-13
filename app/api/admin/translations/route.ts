import { NextResponse } from 'next/server';
import { getAdminUserFromToken } from '@/lib/admin/auth';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY!
);

/**
 * GET /api/admin/translations?locale=fr
 *
 * Returns namespaces and translations (all statuses) for the admin panel.
 * Uses service_role to bypass RLS so admins can see draft translations.
 */
export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const targetLocale = searchParams.get('locale') || 'fr';

  // Fetch namespaces and translations in parallel
  const [nsRes, enRes, localeRes] = await Promise.all([
    supabase
      .from('cethosweb_i18n_namespaces')
      .select('id, name, description, page_path')
      .order('name'),
    fetchAllRows('cethosweb_i18n_translations', 'en'),
    fetchAllRows('cethosweb_i18n_translations', targetLocale),
  ]);

  if (nsRes.error) {
    return NextResponse.json({ error: 'Failed to fetch namespaces' }, { status: 500 });
  }

  return NextResponse.json({
    namespaces: nsRes.data,
    translations: [...(enRes || []), ...(localeRes || [])],
  });
}

async function fetchAllRows(table: string, locale: string) {
  const allRows: Record<string, unknown>[] = [];
  const pageSize = 1000;
  let offset = 0;

  while (true) {
    const { data } = await supabase
      .from(table)
      .select('id, namespace_id, key, segment_index, locale, value, status')
      .eq('locale', locale)
      .range(offset, offset + pageSize - 1);

    if (!data || data.length === 0) break;
    allRows.push(...data);
    if (data.length < pageSize) break;
    offset += pageSize;
  }

  return allRows;
}
