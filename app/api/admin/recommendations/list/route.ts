import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const supabase = createServerSupabaseClient()
  const url = new URL(req.url)
  const status = url.searchParams.get('status') || 'active'

  let query = supabase
    .from('recommendations')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(200)

  if (status === 'active') {
    query = query.eq('status', 'pending')
  } else if (status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ recommendations: data || [] })
}
