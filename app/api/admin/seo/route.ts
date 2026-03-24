import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'seo_settings', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_seo_settings')
    .select('*')
    .order('page_path', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data || []);
}

export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'seo_settings', 'create')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_seo_settings')
    .insert({
      page_path: body.page_path,
      page_name: body.page_name || null,
      meta_title: body.meta_title || null,
      meta_description: body.meta_description || null,
      og_title: body.og_title || null,
      og_description: body.og_description || null,
      og_image: body.og_image || null,
      canonical_url: body.canonical_url || null,
      robots: body.robots || 'index, follow',
      schema_markup: body.schema_markup || null,
      priority: body.priority ?? 0.5,
      change_frequency: body.change_frequency || 'weekly',
      exclude_from_sitemap: body.exclude_from_sitemap || false,
      updated_by: admin.id,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'create', entityType: 'seo_setting', entityId: data.id,
    entityName: body.page_path, newValue: body, request,
  });

  return NextResponse.json(data, { status: 201 });
}
