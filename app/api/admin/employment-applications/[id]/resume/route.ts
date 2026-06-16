import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

// GET /api/admin/employment-applications/[id]/resume
// Returns a short-lived signed URL to download an applicant's CV from the
// private `careers-applications` bucket. Super-admin only.
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  if (!hasPermission(user.role, 'employment_applications', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data: app, error } = await supabase
    .from('fulltime_applications')
    .select('resume_bucket, resume_path')
    .eq('id', params.id)
    .single();

  if (error || !app) {
    return NextResponse.json({ error: 'Application not found' }, { status: 404 });
  }
  if (!app.resume_path) {
    return NextResponse.json({ error: 'No resume on file' }, { status: 404 });
  }

  const { data: signed, error: signErr } = await supabase.storage
    .from(app.resume_bucket || 'careers-applications')
    .createSignedUrl(app.resume_path, 60 * 5); // 5 minutes

  if (signErr || !signed) {
    return NextResponse.json({ error: signErr?.message || 'Could not sign URL' }, { status: 500 });
  }

  return NextResponse.json({ url: signed.signedUrl });
}
