import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_authors', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_blog_authors')
    .select('*')
    .order('name', { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Get post counts per author
  const { data: posts } = await supabase
    .from('cethosweb_blog_posts')
    .select('author_id');

  const postCounts: Record<string, number> = {};
  posts?.forEach((p) => {
    if (p.author_id) postCounts[p.author_id] = (postCounts[p.author_id] || 0) + 1;
  });

  const authors = (data || []).map((a) => ({
    ...a,
    post_count: postCounts[a.id] || 0,
  }));

  return NextResponse.json(authors);
}

export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_authors', 'create')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_blog_authors')
    .insert({
      name: body.name,
      slug: body.slug,
      title: body.title || null,
      bio: body.bio || null,
      avatar_url: body.avatar_url || null,
      email: body.email || null,
      linkedin_url: body.linkedin_url || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'create', entityType: 'blog_author', entityId: data.id,
    entityName: body.name, newValue: body, request,
  });

  return NextResponse.json(data, { status: 201 });
}
