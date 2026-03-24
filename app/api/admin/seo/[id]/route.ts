import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'seo_settings', 'update')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
    updated_by: admin.id,
  };

  const allowedFields = [
    'page_path', 'page_name', 'meta_title', 'meta_description', 'og_title',
    'og_description', 'og_image', 'canonical_url', 'robots', 'schema_markup',
    'priority', 'change_frequency', 'exclude_from_sitemap',
  ];

  for (const field of allowedFields) {
    if (field in body) updateData[field] = body[field];
  }

  const { data, error } = await supabase
    .from('cethosweb_seo_settings')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'update', entityType: 'seo_setting', entityId: params.id,
    entityName: data.page_path, newValue: updateData, request,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'seo_settings', 'delete')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();

  const { data: seo } = await supabase
    .from('cethosweb_seo_settings')
    .select('page_path')
    .eq('id', params.id)
    .single();

  const { error } = await supabase
    .from('cethosweb_seo_settings')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'delete', entityType: 'seo_setting', entityId: params.id,
    entityName: seo?.page_path || 'Unknown', request,
  });

  return NextResponse.json({ success: true });
}
