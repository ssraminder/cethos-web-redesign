import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_posts', 'read')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const author = searchParams.get('author') || '';
  const status = searchParams.get('status') || '';
  const sortBy = searchParams.get('sortBy') || 'created_at';
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? true : false;

  const offset = (page - 1) * limit;
  const supabase = createAdminSupabaseClient();

  let query = supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(id, name, slug),
      author:cethosweb_blog_authors(id, name, slug)
    `, { count: 'exact' });

  if (search) {
    query = query.or(`title.ilike.%${search}%,content.ilike.%${search}%`);
  }
  if (category) query = query.eq('category_id', category);
  if (author) query = query.eq('author_id', author);
  if (status) query = query.eq('status', status);

  query = query.order(sortBy, { ascending: sortOrder }).range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    posts: data || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  });
}

export async function POST(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_posts', 'create')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const postData = {
    title: body.title,
    slug: body.slug,
    description: body.description || null,
    content: body.content || '',
    featured_image: body.featured_image || null,
    featured_image_alt: body.featured_image_alt || null,
    category_id: body.category_id || null,
    author_id: body.author_id || null,
    tags: body.tags || [],
    read_time: body.read_time || null,
    status: body.status || 'draft',
    published_at: body.status === 'published' ? (body.published_at || new Date().toISOString()) : body.published_at || null,
    meta_title: body.meta_title || null,
    meta_description: body.meta_description || null,
    canonical_url: body.canonical_url || null,
  };

  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .insert(postData)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  await logAuditAction({
    userId: admin.id,
    userEmail: admin.email,
    userName: admin.name,
    action: 'create',
    entityType: 'blog_post',
    entityId: data.id,
    entityName: body.title,
    newValue: postData,
    request,
  });

  return NextResponse.json(data, { status: 201 });
}
