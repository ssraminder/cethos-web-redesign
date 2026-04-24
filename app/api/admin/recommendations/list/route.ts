import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Netlify's Next.js adapter was edge-caching this route even with
// dynamic = 'force-dynamic', so approved / executed recs kept showing as
// pending in the admin UI until a hard refresh. The explicit Cache-Control
// header on every response blocks that edge cache tier.
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0, must-revalidate',
  'CDN-Cache-Control': 'no-store',
  'Netlify-CDN-Cache-Control': 'no-store',
}

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
    return NextResponse.json({ error: error.message }, { status: 500, headers: NO_STORE_HEADERS })
  }
  return NextResponse.json({ recommendations: data || [] }, { headers: NO_STORE_HEADERS })
}
