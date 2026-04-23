import { NextResponse } from 'next/server'
import { createCethosAutomationsClient } from '@/lib/cethos-automations'

export const dynamic = 'force-dynamic'

export async function GET() {
  const env = {
    CETHOS_AUTOMATIONS_URL: !!process.env.CETHOS_AUTOMATIONS_URL,
    CETHOS_AUTOMATIONS_SERVICE_ROLE_KEY: !!process.env.CETHOS_AUTOMATIONS_SERVICE_ROLE_KEY,
  }

  try {
    const supabase = createCethosAutomationsClient()
    const { data, error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 })

    if (error) {
      return NextResponse.json(
        { ok: false, env, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({
      ok: true,
      env,
      userCount: data?.users?.length ?? 0,
    })
  } catch (err) {
    return NextResponse.json(
      { ok: false, env, error: err instanceof Error ? err.message : 'unknown_error' },
      { status: 500 }
    )
  }
}
