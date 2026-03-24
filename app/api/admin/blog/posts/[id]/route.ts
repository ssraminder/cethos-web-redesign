import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_posts', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(id, name, slug),
      author:cethosweb_blog_authors(id, name, slug)
    `)
    .eq('id', params.id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_posts', 'update')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  // Fetch old value for audit
  const { data: oldPost } = await supabase
    .from('cethosweb_blog_posts')
    .select('*')
    .eq('id', params.id)
    .single();

  const updateData: Record<string, unknown> = { updated_at: new Date().toISOString() };
  const allowedFields = [
    'title', 'slug', 'description', 'content', 'featured_image', 'featured_image_alt',
    'category_id', 'author_id', 'tags', 'read_time', 'status', 'published_at',
    'meta_title', 'meta_description', 'canonical_url',
  ];

  for (const field of allowedFields) {
    if (field in body) updateData[field] = body[field];
  }

  // Auto-set published_at when publishing
  if (body.status === 'published' && !oldPost?.published_at && !body.published_at) {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .update(updateData)
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id,
    userEmail: admin.email,
    userName: admin.name,
    action: 'update',
    entityType: 'blog_post',
    entityId: params.id,
    entityName: data.title,
    oldValue: oldPost,
    newValue: updateData,
    request,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_posts', 'delete')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();

  const { data: post } = await supabase
    .from('cethosweb_blog_posts')
    .select('title')
    .eq('id', params.id)
    .single();

  const { error } = await supabase
    .from('cethosweb_blog_posts')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id,
    userEmail: admin.email,
    userName: admin.name,
    action: 'delete',
    entityType: 'blog_post',
    entityId: params.id,
    entityName: post?.title || 'Unknown',
    request,
  });

  return NextResponse.json({ success: true });
}
