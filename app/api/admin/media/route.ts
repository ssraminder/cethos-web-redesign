import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminSupabaseClient();

  // List files from Supabase Storage
  const { data: files, error } = await supabase.storage
    .from('uploads')
    .list('', { limit: 500, sortBy: { column: 'created_at', order: 'desc' } });

  if (error) {
    return NextResponse.json({ assets: [] });
  }

  const { data: { publicUrl: baseUrl } } = supabase.storage.from('uploads').getPublicUrl('');

  const assets = (files || [])
    .filter(f => !f.name.startsWith('.'))
    .map(f => ({
      name: f.name,
      url: `${baseUrl}${f.name}`,
      size: f.metadata?.size || 0,
      created_at: f.created_at || '',
    }));

  return NextResponse.json({ assets });
}
