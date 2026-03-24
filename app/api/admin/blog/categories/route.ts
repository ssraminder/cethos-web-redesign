import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_categories', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get post counts per category
  const { data: posts } = await supabase
    .from('cethosweb_blog_posts')
    .select('category_id');

  const postCounts: Record<string, number> = {};
  posts?.forEach((p) => {
    if (p.category_id) postCounts[p.category_id] = (postCounts[p.category_id] || 0) + 1;
  });

  const categories = (data || []).map((cat) => ({
    ...cat,
    post_count: postCounts[cat.id] || 0,
  }));

  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_categories', 'create')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .insert({
      name: body.name,
      slug: body.slug,
      description: body.description || null,
      sort_order: body.sort_order || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'create', entityType: 'blog_category', entityId: data.id,
    entityName: body.name, newValue: body, request,
  });

  return NextResponse.json(data, { status: 201 });
}
