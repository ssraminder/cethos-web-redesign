import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminSupabaseClient();

  const [totalRes, publishedRes, draftRes, catRes] = await Promise.all([
    supabase.from('cethosweb_blog_posts').select('*', { count: 'exact', head: true }),
    supabase.from('cethosweb_blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published'),
    supabase.from('cethosweb_blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'draft'),
    supabase.from('cethosweb_blog_categories').select('*', { count: 'exact', head: true }),
  ]);

  return NextResponse.json({
    totalPosts: totalRes.count || 0,
    publishedPosts: publishedRes.count || 0,
    draftPosts: draftRes.count || 0,
    categories: catRes.count || 0,
  });
}
