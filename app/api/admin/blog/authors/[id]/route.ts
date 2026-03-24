import { NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient, logAuditAction } from '@/lib/admin/auth';
import { hasPermission } from '@/lib/admin/permissions';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_authors', 'update')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const supabase = createAdminSupabaseClient();

  const { data, error } = await supabase
    .from('cethosweb_blog_authors')
    .update({
      name: body.name,
      slug: body.slug,
      title: body.title,
      bio: body.bio,
      avatar_url: body.avatar_url,
      email: body.email,
      linkedin_url: body.linkedin_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'update', entityType: 'blog_author', entityId: params.id,
    entityName: data.name, newValue: body, request,
  });

  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(admin.role, 'blog_authors', 'delete')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminSupabaseClient();

  const { data: author } = await supabase
    .from('cethosweb_blog_authors')
    .select('name')
    .eq('id', params.id)
    .single();

  const { error } = await supabase
    .from('cethosweb_blog_authors')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    userId: admin.id, userEmail: admin.email, userName: admin.name,
    action: 'delete', entityType: 'blog_author', entityId: params.id,
    entityName: author?.name || 'Unknown', request,
  });

  return NextResponse.json({ success: true });
}
