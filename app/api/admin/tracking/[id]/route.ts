import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'tracking_pixels', 'update')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString(), updated_by: admin.id };
  const allowedFields = ['name', 'type', 'pixel_id', 'custom_head_code', 'custom_body_code', 'placement', 'is_active', 'description', 'sort_order'];
  for (const field of allowedFields) {
    if (field in body) updateData[field] = body[field];
  }

  const { data, error } = await supabase
    .from('cethosweb_tracking_pixels')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'update', entityType: 'tracking_pixel', entityId: params.id,
    entityName: data.name, newValue: updateData, request,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'tracking_pixels', 'delete')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();

  const { data: pixel } = await supabase
    .from('cethosweb_tracking_pixels')
    .select('name')
    .eq('id', params.id)
    .single();

  const { error } = await supabase
    .from('cethosweb_tracking_pixels')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'delete', entityType: 'tracking_pixel', entityId: params.id,
    entityName: pixel?.name || 'Unknown', request,
  });

  return NextResponse.json({ success: true });
}
