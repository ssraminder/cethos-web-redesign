import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()
  const { error } = await supabase
    .from('recommendations')
    .update({
      status: 'rejected',
      reviewed_at: new Date().toISOString(),
      reviewed_by: 'admin', // TODO: real admin identity
    })
    .eq('id', params.id)
    .in('status', ['pending'])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}
