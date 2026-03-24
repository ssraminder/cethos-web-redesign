import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_categories', 'update')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .update({
      name: body.name,
      slug: body.slug,
      description: body.description,
      sort_order: body.sort_order,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'update', entityType: 'blog_category', entityId: params.id,
    entityName: data.name, newValue: body, request,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_categories', 'delete')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();

  // Check if category has posts
  const { count } = await supabase
    .from('cethosweb_blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', params.id);

  if (count && count > 0) {
    return NextResponse.json(
      { error: `Cannot delete: ${count} posts use this category` },
      { status: 400 }
    );
  }

  const { data: cat } = await supabase
    .from('cethosweb_blog_categories')
    .select('name')
    .eq('id', params.id)
    .single();

  const { error } = await supabase
    .from('cethosweb_blog_categories')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'delete', entityType: 'blog_category', entityId: params.id,
    entityName: cat?.name || 'Unknown', request,
  });

  return NextResponse.json({ success: true });
}
