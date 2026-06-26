import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Options for the /secure-upload "new quote" path: source/target languages and
// intended uses, pulled from the SAME portal tables the quote pipeline uses so
// the ids map straight onto quotes.source_language_id / target_language_id /
// intended_use_id. Cached briefly — these lists change rarely.
export const revalidate = 600

interface LanguageOption {
  id: string
  name: string
  native_name: string | null
}
interface IntendedUseOption {
  id: string
  name: string
  subcategory: string | null
}

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const [srcRes, tgtRes, useRes] = await Promise.all([
      supabase
        .from('languages')
        .select('id, name, native_name, sort_order')
        .eq('is_active', true)
        .eq('is_source_available', true)
        .order('sort_order'),
      supabase
        .from('languages')
        .select('id, name, native_name, sort_order')
        .eq('is_active', true)
        .eq('is_target_available', true)
        .order('sort_order'),
      supabase
        .from('intended_uses')
        .select('id, name, subcategory')
        .eq('is_active', true)
        .order('name'),
    ])

    if (srcRes.error || tgtRes.error || useRes.error) {
      console.error('[API/secure-upload-options] query error:', {
        src: srcRes.error?.message,
        tgt: tgtRes.error?.message,
        use: useRes.error?.message,
      })
      return NextResponse.json(
        { error: 'Failed to load options' },
        { status: 500 },
      )
    }

    const mapLang = (rows: unknown): LanguageOption[] =>
      ((rows as Array<Record<string, unknown>>) || []).map((r) => ({
        id: String(r.id),
        name: String(r.name),
        native_name: (r.native_name as string | null) ?? null,
      }))

    const intendedUses: IntendedUseOption[] = (
      (useRes.data as Array<Record<string, unknown>>) || []
    ).map((r) => ({
      id: String(r.id),
      name: String(r.name),
      subcategory: (r.subcategory as string | null) ?? null,
    }))

    return NextResponse.json({
      sourceLanguages: mapLang(srcRes.data),
      targetLanguages: mapLang(tgtRes.data),
      intendedUses,
    })
  } catch (error) {
    console.error('[API/secure-upload-options] unexpected error:', error)
    return NextResponse.json({ error: 'Failed to load options' }, { status: 500 })
  }
}
