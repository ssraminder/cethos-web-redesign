import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import {
  publicUploadSchema,
  MAX_FILES,
  MAX_FILE_SIZE,
  ACCEPTED_MIME_TYPES,
  matchesMagicBytes,
  sanitizeFilename,
} from '@/lib/validations/publicUpload'

export const maxDuration = 60
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const BUCKET = 'public-submissions'

type UploadedFileMeta = {
  path: string
  originalName: string
  size: number
  mimeType: string
  scanStatus: 'scan_pending'
}

function genericError(message = 'Something went wrong. Please try again.') {
  return NextResponse.json({ error: message }, { status: 500 })
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || ''
    if (!contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Expected multipart/form-data' },
        { status: 400 },
      )
    }

    const formData = await req.formData()

    // Parse fields
    const raw = {
      fullName: (formData.get('fullName') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
      orderOrQuoteId: (formData.get('orderOrQuoteId') as string) || '',
      message: (formData.get('message') as string) || '',
      companyWebsite: (formData.get('companyWebsite') as string) || '',
    }

    const parsed = publicUploadSchema.safeParse(raw)
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]
      return NextResponse.json(
        { error: firstError?.message || 'Invalid form data' },
        { status: 400 },
      )
    }
    const data = parsed.data

    // Honeypot — bots fill hidden fields. Return 200 silently; do not insert.
    if (data.companyWebsite && data.companyWebsite.length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 })
    }

    // Parse files
    const files = formData.getAll('files').filter((v): v is File => v instanceof File)
    if (files.length === 0) {
      return NextResponse.json(
        { error: 'Please attach at least one document' },
        { status: 400 },
      )
    }
    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `You can upload at most ${MAX_FILES} files per submission` },
        { status: 400 },
      )
    }

    // Validate each file: size, declared MIME, magic bytes
    for (const file of files) {
      if (file.size === 0) {
        return NextResponse.json(
          { error: `${file.name}: empty file` },
          { status: 400 },
        )
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `${file.name}: exceeds 50 MB limit` },
          { status: 400 },
        )
      }
      if (!ACCEPTED_MIME_TYPES.has(file.type)) {
        return NextResponse.json(
          { error: `${file.name}: file type not allowed` },
          { status: 400 },
        )
      }
      // Magic-byte sniff — first 16 bytes cover every signature we care about
      const head = new Uint8Array(await file.slice(0, 16).arrayBuffer())
      if (!matchesMagicBytes(head, file.type)) {
        return NextResponse.json(
          { error: `${file.name}: file content does not match its extension` },
          { status: 400 },
        )
      }
    }

    // Connect to Supabase
    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (err) {
      console.error('[public-upload] Supabase init failed:', err)
      return genericError()
    }

    // Create submission row (scan_pending) first, then use its id as the storage folder
    const ipHeader =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.headers.get('x-real-ip') ||
      null
    const userAgent = req.headers.get('user-agent') || null

    const { data: inserted, error: insertError } = await supabase
      .from('public_submissions')
      .insert({
        full_name: data.fullName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        order_or_quote_id: data.orderOrQuoteId?.trim() || null,
        message: data.message?.trim() || null,
        file_paths: [],
        submitted_from: 'main_web',
        ip_address: ipHeader,
        user_agent: userAgent,
        scan_status: 'scan_pending',
      })
      .select('id')
      .single()

    if (insertError || !inserted) {
      console.error('[public-upload] Insert failed:', insertError)
      return genericError()
    }

    const submissionId = inserted.id as string

    // Upload files
    const uploadedMeta: UploadedFileMeta[] = []
    for (const file of files) {
      const safeName = sanitizeFilename(file.name)
      const path = `${submissionId}/${Date.now()}-${safeName}`
      const arrayBuffer = await file.arrayBuffer()
      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(path, new Uint8Array(arrayBuffer), {
          contentType: file.type,
          upsert: false,
        })

      if (uploadError) {
        console.error('[public-upload] File upload failed:', uploadError)
        // Roll back: delete row + any already-uploaded files
        await supabase.storage
          .from(BUCKET)
          .remove(uploadedMeta.map((m) => m.path))
          .catch(() => {})
        await supabase
          .from('public_submissions')
          .delete()
          .eq('id', submissionId)
          .catch?.(() => {})
        return genericError('File upload failed. Please try again.')
      }

      uploadedMeta.push({
        path,
        originalName: file.name.slice(0, 200),
        size: file.size,
        mimeType: file.type,
        scanStatus: 'scan_pending',
      })
    }

    // Persist file paths onto the row
    const { error: updateError } = await supabase
      .from('public_submissions')
      .update({ file_paths: uploadedMeta })
      .eq('id', submissionId)

    if (updateError) {
      console.error('[public-upload] Update file_paths failed:', updateError)
      // Non-fatal — files are in storage, row exists. Still return success.
    }

    // Fire-and-forget: invoke virus scan edge function (don't await)
    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey =
      process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
    if (supabaseUrl && serviceKey) {
      fetch(`${supabaseUrl}/functions/v1/scan-public-submission`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${serviceKey}`,
        },
        body: JSON.stringify({ submissionId }),
      }).catch(() => {})
    }

    return NextResponse.json({
      ok: true,
      submissionId,
      message:
        'Thanks — we received your submission. Our team will reach out shortly.',
    })
  } catch (err) {
    console.error('[public-upload] Unhandled error:', err)
    return genericError()
  }
}
