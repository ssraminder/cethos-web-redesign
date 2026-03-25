import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserFromToken, createAdminSupabaseClient } from '@/lib/admin/auth';

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_redirects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ redirects: [] });
  }

  return NextResponse.json({ redirects: data || [] });
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { from_path, to_path, type } = body;

  if (!from_path || !to_path) {
    return NextResponse.json({ error: 'From and To paths are required' }, { status: 400 });
  }

  const supabase = createAdminSupabaseClient();
  const { data, error } = await supabase
    .from('cethosweb_redirects')
    .insert({ from_path, to_path, type: type || '301' })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
