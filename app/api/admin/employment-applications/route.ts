import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

// GET /api/admin/employment-applications
// Lists full-time ("Careers") applications. Super-admin only — enforced here
// server-side (do not rely on the UI alone). The table's RLS additionally
// restricts SELECT to the service role, so applicant PII is never publicly
// readable even if this route were bypassed.
export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!hasPermission(user.role, 'employment_applications', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('fulltime_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ applications: data || [] });
}
