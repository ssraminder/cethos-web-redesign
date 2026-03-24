import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'tracking_pixels', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_tracking_pixels')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'tracking_pixels', 'create')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_tracking_pixels')
    .insert({
      name: body.name,
      type: body.type,
      pixel_id: body.pixel_id || null,
      custom_head_code: body.custom_head_code || null,
      custom_body_code: body.custom_body_code || null,
      placement: body.placement || 'head',
      is_active: body.is_active ?? true,
      description: body.description || null,
      sort_order: body.sort_order || 0,
      created_by: admin.id,
      updated_by: admin.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'create', entityType: 'tracking_pixel', entityId: data.id,
    entityName: body.name, newValue: body, request,
  });

  return NextResponse.json(data, { status: 201 });
}
