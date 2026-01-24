import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

// Fallback document types in case database fetch fails
const FALLBACK_DOCUMENT_TYPES = [
  { id: '1', code: 'birth-certificate', name: 'Birth Certificate' },
  { id: '2', code: 'marriage-certificate', name: 'Marriage Certificate' },
  { id: '3', code: 'divorce-certificate', name: 'Divorce Certificate' },
  { id: '4', code: 'diploma-degree', name: 'Diploma or Degree' },
  { id: '5', code: 'academic-transcript', name: 'Academic Transcript' },
  { id: '6', code: 'police-clearance', name: 'Police Clearance' },
  { id: '7', code: 'employment-letter', name: 'Employment Letter' },
  { id: '8', code: 'bank-statement', name: 'Bank Statement' },
  { id: '9', code: 'passport', name: 'Passport' },
  { id: '10', code: 'drivers-license', name: "Driver's License" },
  { id: '11', code: 'other', name: 'Other' },
]

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    const { data: documentTypes, error } = await supabase
      .from('document_types')
      .select('id, code, name')
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.error('[API/document-types] Supabase error:', error)

      const formattedFallback = FALLBACK_DOCUMENT_TYPES.map(dt => ({
        id: dt.id,
        value: dt.code,
        label: dt.name,
      }))

      return NextResponse.json({
        documentTypes: formattedFallback,
        source: 'fallback',
        reason: error.message,
      })
    }

    if (!documentTypes || documentTypes.length === 0) {
      console.warn('[API/document-types] No document types returned from database, using fallback')

      const formattedFallback = FALLBACK_DOCUMENT_TYPES.map(dt => ({
        id: dt.id,
        value: dt.code,
        label: dt.name,
      }))

      return NextResponse.json({
        documentTypes: formattedFallback,
        source: 'fallback',
        reason: 'no_data_returned',
      })
    }

    const formattedDocumentTypes = documentTypes.map(dt => ({
      id: dt.id,
      value: dt.code,
      label: dt.name,
    }))

    return NextResponse.json({
      documentTypes: formattedDocumentTypes,
      source: 'database',
      count: formattedDocumentTypes.length,
    })
  } catch (error) {
    console.error('[API/document-types] Unexpected error:', error)

    const formattedFallback = FALLBACK_DOCUMENT_TYPES.map(dt => ({
      id: dt.id,
      value: dt.code,
      label: dt.name,
    }))

    return NextResponse.json({
      documentTypes: formattedFallback,
      source: 'fallback',
      reason: error instanceof Error ? error.message : 'unknown_error',
    })
  }
}
