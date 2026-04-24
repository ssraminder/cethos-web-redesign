import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerSupabaseClient()
  const now = new Date().toISOString()

  // Mark approved (audit trail)
  const { error: updateErr } = await supabase
    .from('recommendations')
    .update({
      status: 'approved',
      reviewed_at: now,
      reviewed_by: 'admin', // TODO: wire real admin identity when admin auth is finalized
    })
    .eq('id', params.id)
    .in('status', ['pending'])

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 })
  }

  // Invoke execute-recommendation edge function
  const res = await fetch(`${SUPABASE_URL}/functions/v1/execute-recommendation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ id: params.id, invoked_by: 'admin-approve' }),
  })

  const data = await res.json().catch(() => ({}))
  return NextResponse.json(data, { status: res.status })
}
