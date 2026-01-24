import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Fallback intended uses in case database fetch fails
const FALLBACK_INTENDED_USES = [
  { id: '1', code: 'pr-application', name: 'PR Application' },
  { id: '2', code: 'citizenship', name: 'Citizenship' },
  { id: '3', code: 'spousal-sponsorship', name: 'Spousal Sponsorship' },
  { id: '4', code: 'express-entry', name: 'Express Entry' },
  { id: '5', code: 'wes-iqas', name: 'WES/IQAS Evaluation' },
  { id: '6', code: 'study-permit', name: 'Study Permit' },
  { id: '7', code: 'work-permit', name: 'Work Permit' },
  { id: '8', code: 'legal-court', name: 'Legal / Court' },
  { id: '9', code: 'personal', name: 'Personal Use' },
  { id: '10', code: 'other', name: 'Other' },
]

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data: intendedUses, error } = await supabase
      .from('intended_uses')
      .select('id, code, name')
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.error('[API/intended-uses] Supabase error:', error)

      const formattedFallback = FALLBACK_INTENDED_USES.map(iu => ({
        id: iu.id,
        value: iu.code,
        label: iu.name,
      }))

      return NextResponse.json({
        intendedUses: formattedFallback,
        source: 'fallback',
        reason: error.message,
      })
    }

    if (!intendedUses || intendedUses.length === 0) {
      console.warn('[API/intended-uses] No intended uses returned from database, using fallback')

      const formattedFallback = FALLBACK_INTENDED_USES.map(iu => ({
        id: iu.id,
        value: iu.code,
        label: iu.name,
      }))

      return NextResponse.json({
        intendedUses: formattedFallback,
        source: 'fallback',
        reason: 'no_data_returned',
      })
    }

    const formattedIntendedUses = intendedUses.map(iu => ({
      id: iu.id,
      value: iu.code,
      label: iu.name,
    }))

    return NextResponse.json({
      intendedUses: formattedIntendedUses,
      source: 'database',
      count: formattedIntendedUses.length,
    })
  } catch (error) {
    console.error('[API/intended-uses] Unexpected error:', error)

    const formattedFallback = FALLBACK_INTENDED_USES.map(iu => ({
      id: iu.id,
      value: iu.code,
      label: iu.name,
    }))

    return NextResponse.json({
      intendedUses: formattedFallback,
      source: 'fallback',
      reason: error instanceof Error ? error.message : 'unknown_error',
    })
  }
}
