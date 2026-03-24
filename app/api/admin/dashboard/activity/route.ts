import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'audit_log', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data } = await supabase
    .from('cethosweb_audit_log')
    .select('id, user_name, action, entity_type, entity_name, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  return NextResponse.json({ entries: data || [] });
}
