import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { lifeSciencesQuoteSchema } from '@/lib/validations/life-sciences-quote'

const Brevo = require('@getbrevo/brevo')

// Route segment config - increase body size limit for file uploads
export const maxDuration = 60 // Allow up to 60 seconds for file uploads
export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  console.log('[API Quote] Request received at:', new Date().toISOString())

  try {
    // Log environment check
    console.log('[API Quote] Env check:', {
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_KEY,
      hasBrevoKey: !!process.env.BREVO_API_KEY,
    })

    // Validate Supabase connection early
    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('[API Quote] Supabase client created')
    } catch (supabaseError) {
      console.error('[API Quote] Supabase init error:', supabaseError)
      return NextResponse.json(
        { error: 'Server configuration error. Please try again later.' },
        { status: 500 }
      )
    }

    // Parse formData with error handling
    let formData
    try {
      formData = await req.formData()
      console.log('[API Quote] FormData keys:', Array.from(formData.keys()))
    } catch (parseError) {
      console.error('[API Quote] FormData parse error:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse form data. Please ensure files are under 10MB.' },
        { status: 400 }
      )
    }

    // Parse form data
    const rawData = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      companyName: formData.get('companyName') as string,
      jobTitle: formData.get('jobTitle') as string || '',
      serviceType: formData.get('serviceType') as string,
      therapeuticArea: formData.get('therapeuticArea') as string || '',
      studyPhase: formData.get('studyPhase') as string || '',
      instrumentType: formData.get('instrumentType') as string || '',
      sourceLanguage: formData.get('sourceLanguage') as string,
      targetLanguages: JSON.parse(formData.get('targetLanguages') as string || '[]'),
      wordCount: formData.get('wordCount') ? parseInt(formData.get('wordCount') as string) : undefined,
      timeline: formData.get('timeline') as string,
      regulatoryPathway: formData.get('regulatoryPathway') as string || '',
      projectDescription: formData.get('projectDescription') as string,
    }

    console.log('[API Quote] Raw data parsed:', {
      fullName: rawData.fullName,
      email: rawData.email,
      serviceType: rawData.serviceType,
      targetLanguagesCount: rawData.targetLanguages?.length,
    })

    // Validate data with Zod
    const validationResult = lifeSciencesQuoteSchema.safeParse(rawData)
    console.log('[API Quote] Validation result:', validationResult.success)

    if (!validationResult.success) {
      console.log('[API Quote] Validation errors:', validationResult.error.flatten().fieldErrors)
      const errors = validationResult.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      )
    }

    const validatedData = validationResult.data

    // Prepare database record
    const dbData = {
      service_type: 'life-sciences',
      full_name: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      company_name: validatedData.companyName,
      job_title: validatedData.jobTitle || null,
      source_language: validatedData.sourceLanguage,
      target_languages: validatedData.targetLanguages,
      word_count: validatedData.wordCount && !isNaN(validatedData.wordCount) ? validatedData.wordCount : null,
      deadline: validatedData.timeline,
      additional_notes: validatedData.projectDescription,
      service_data: {
        serviceType: validatedData.serviceType,
        therapeuticArea: validatedData.therapeuticArea || null,
        studyPhase: validatedData.studyPhase || null,
        instrumentType: validatedData.instrumentType || null,
        regulatoryPathway: validatedData.regulatoryPathway || null,
      },
    }

    // Upload files to Supabase Storage
    const files = formData.getAll('files') as File[]
    const fileUrls: string[] = []
    console.log('[API Quote] Files to upload:', files.length)

    for (const file of files) {
      if (file.size > 0) {
        const timestamp = Date.now()
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `life-sciences/${timestamp}-${safeFileName}`

        const arrayBuffer = await file.arrayBuffer()
        const fileBuffer = new Uint8Array(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cethosweb-quote-files')
          .upload(fileName, fileBuffer, {
            contentType: file.type,
            cacheControl: '3600',
          })

        if (!uploadError && uploadData) {
          fileUrls.push(uploadData.path)
        } else {
          console.error('File upload error:', uploadError)
        }
      }
    }

    // Save to database
    console.log('[API Quote] Saving to database...')
    const { data: quote, error: dbError } = await supabase
      .from('cethosweb_quote_submissions')
      .insert({
        ...dbData,
        file_urls: fileUrls,
      })
      .select()
      .single()

    if (dbError) {
      console.error('[API Quote] Database error:', dbError)
      console.error('[API Quote] Database error code:', dbError.code)
      console.error('[API Quote] Database error details:', dbError.details)
      throw new Error(`Failed to save quote submission: ${dbError.message}`)
    }
    console.log('[API Quote] Quote saved with ID:', quote?.id)

    // Save file references
    if (quote && fileUrls.length > 0) {
      const fileRecords = fileUrls.map(path => ({
        quote_id: quote.id,
        file_name: path.split('/').pop() || '',
        storage_path: path,
      }))

      const { error: fileDbError } = await supabase
        .from('cethosweb_quote_files')
        .insert(fileRecords)

      if (fileDbError) {
        console.error('File record save error:', fileDbError)
      }
    }

    // Format labels for email
    const serviceLabels: Record<string, string> = {
      'linguistic-validation': 'Linguistic Validation',
      'cognitive-debriefing': 'Cognitive Debriefing',
      'clinical-translation': 'Clinical Translation',
      'regulatory': 'Regulatory Translation',
      'pharmacovigilance': 'Pharmacovigilance',
      'ecoa': 'eCOA/ePRO',
      'medical-device': 'Medical Device',
    }

    const therapeuticLabels: Record<string, string> = {
      'oncology': 'Oncology',
      'cns': 'CNS / Neurology',
      'cardiology': 'Cardiology',
      'respiratory': 'Respiratory',
      'immunology': 'Immunology',
      'rare-disease': 'Rare Disease',
      'dermatology': 'Dermatology',
      'gastroenterology': 'Gastroenterology',
      'endocrinology': 'Endocrinology',
      'infectious-disease': 'Infectious Disease',
      'other': 'Other',
    }

    const phaseLabels: Record<string, string> = {
      'phase-1': 'Phase 1',
      'phase-2': 'Phase 2',
      'phase-3': 'Phase 3',
      'phase-4': 'Phase 4',
      'post-market': 'Post-Market',
      'na': 'N/A',
    }

    const regulatoryLabels: Record<string, string> = {
      'fda': 'FDA (United States)',
      'ema': 'EMA (European Union)',
      'health-canada': 'Health Canada',
      'pmda': 'PMDA (Japan)',
      'nmpa': 'NMPA (China)',
      'mhra': 'MHRA (UK)',
      'multiple': 'Multiple Agencies',
      'other': 'Other',
    }

    const timelineLabels: Record<string, string> = {
      'urgent': 'Urgent (1-3 business days)',
      'standard': 'Standard (5-7 business days)',
      'flexible': 'Flexible (2+ weeks)',
    }

    // Send email notification using Brevo
    const emailRecipients = process.env.QUOTE_EMAIL_RECIPIENTS?.split(',') || ['info@cethos.com']
    console.log('[API Quote] Sending email to:', emailRecipients)

    try {
      const apiInstance = new Brevo.TransactionalEmailsApi()
      apiInstance.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Quote Request</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0C2340 0%, #1a3a5c 100%); padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">New Life Sciences Quote Request</h1>
          </div>

          <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Contact Information</h2>
              <p style="margin: 8px 0;"><strong>Name:</strong> ${validatedData.fullName}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${validatedData.email}" style="color: #0891B2;">${validatedData.email}</a></p>
              <p style="margin: 8px 0;"><strong>Phone:</strong> ${validatedData.phone}</p>
              <p style="margin: 8px 0;"><strong>Company:</strong> ${validatedData.companyName}</p>
              ${validatedData.jobTitle ? `<p style="margin: 8px 0;"><strong>Job Title:</strong> ${validatedData.jobTitle}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Service Details</h2>
              <p style="margin: 8px 0;"><strong>Service Type:</strong> ${serviceLabels[validatedData.serviceType] || validatedData.serviceType}</p>
              ${validatedData.therapeuticArea ? `<p style="margin: 8px 0;"><strong>Therapeutic Area:</strong> ${therapeuticLabels[validatedData.therapeuticArea] || validatedData.therapeuticArea}</p>` : ''}
              ${validatedData.studyPhase ? `<p style="margin: 8px 0;"><strong>Study Phase:</strong> ${phaseLabels[validatedData.studyPhase] || validatedData.studyPhase}</p>` : ''}
              ${validatedData.instrumentType ? `<p style="margin: 8px 0;"><strong>Instrument Type:</strong> ${validatedData.instrumentType.toUpperCase()}</p>` : ''}
              ${validatedData.regulatoryPathway ? `<p style="margin: 8px 0;"><strong>Regulatory Pathway:</strong> ${regulatoryLabels[validatedData.regulatoryPathway] || validatedData.regulatoryPathway}</p>` : ''}
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Language & Scope</h2>
              <p style="margin: 8px 0;"><strong>Source Language:</strong> ${validatedData.sourceLanguage}</p>
              <p style="margin: 8px 0;"><strong>Target Languages:</strong> ${validatedData.targetLanguages.join(', ')}</p>
              <p style="margin: 8px 0;"><strong>Word Count:</strong> ${validatedData.wordCount || 'TBD'}</p>
              <p style="margin: 8px 0;"><strong>Timeline:</strong> ${timelineLabels[validatedData.timeline] || validatedData.timeline}</p>
            </div>

            <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h2 style="color: #0C2340; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #0891B2; padding-bottom: 10px;">Project Description</h2>
              <p style="margin: 0; white-space: pre-wrap;">${validatedData.projectDescription}</p>
            </div>

            ${fileUrls.length > 0 ? `
            <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0; color: #0C2340;"><strong>📎 ${fileUrls.length} file(s) attached</strong></p>
              <p style="margin: 5px 0 0 0; font-size: 14px; color: #4b5563;">Files have been uploaded to the storage bucket.</p>
            </div>
            ` : ''}

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">Quote ID: ${quote.id}</p>
              <p style="color: #6b7280; font-size: 14px; margin: 5px 0 0 0;">Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Edmonton' })}</p>
            </div>
          </div>
        </body>
        </html>
      `

      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `New Life Sciences Quote - ${validatedData.companyName}`
      sendSmtpEmail.htmlContent = htmlContent
      sendSmtpEmail.sender = { name: 'Cethos Website', email: 'noreply@cethos.com' }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = { email: validatedData.email }

      await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('[API Quote] Email sent successfully')
    } catch (emailError: unknown) {
      const emailErr = emailError as Error
      console.error('[API Quote] Email send error:', emailErr.message)
      console.error('[API Quote] Email error stack:', emailErr.stack)
      // Don't fail the request if email fails - the quote was saved
    }

    console.log('[API Quote] Success! Returning response')
    return NextResponse.json({ success: true, id: quote.id })
  } catch (error: unknown) {
    const err = error as Error
    console.error('[API Quote] ERROR:', err.message)
    console.error('[API Quote] Stack:', err.stack)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit quote request. Please try again.',
        message: err.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
