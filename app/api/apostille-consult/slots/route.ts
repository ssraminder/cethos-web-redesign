import { NextResponse } from 'next/server'
import { CalApiError, listSlots } from '../_cal'

export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const startTime = url.searchParams.get('start_time')
    const endTime = url.searchParams.get('end_time')
    const timeZone = url.searchParams.get('time_zone') || 'America/Edmonton'
    if (!startTime || !endTime) {
      return NextResponse.json(
        { ok: false, error: 'start_time and end_time required' },
        { status: 400 },
      )
    }

    const { slotsByDay, eventTypeId } = await listSlots({ startTime, endTime, timeZone })

    return NextResponse.json({
      ok: true,
      event_type_id: eventTypeId,
      time_zone: timeZone,
      slots_by_day: slotsByDay,
    })
  } catch (err) {
    if (err instanceof CalApiError) {
      return NextResponse.json(
        { ok: false, error: err.message },
        { status: err.status >= 400 && err.status < 500 ? err.status : 500 },
      )
    }
    return NextResponse.json(
      { ok: false, error: (err as Error).message },
      { status: 500 },
    )
  }
}
