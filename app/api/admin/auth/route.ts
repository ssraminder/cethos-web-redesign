import { NextResponse } from 'next/server';
import { getAdminUserFromToken } from '@/lib/admin/auth';

export async function GET(request: Request) {
  const admin = await getAdminUserFromToken(request.headers.get('authorization'));
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ user: admin });
}
