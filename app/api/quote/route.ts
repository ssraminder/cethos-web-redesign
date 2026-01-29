import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { lifeSciencesQuoteSchema } from '@/lib/validations/life-sciences-quote'

const Brevo = require('@getbrevo/brevo')

// Helper function to get service label
function getServiceLabel(serviceType: string): string {
  const labels: Record<string, string> = {
    'life-sciences': 'Life Sciences',
    'lifesciences': 'Life Sciences',
    'certified': 'Certified Translation',
    'certified-translation': 'Certified Translation',
    'business': 'Business Translation',
    'legal': 'Legal Translation',
    'software': 'Software Localization',
    'multimedia': 'Multimedia',
    'interpretation': 'Interpretation',
    'transcription': 'Transcription',
    'transcription-translation': 'Transcription + Translation',
    'cognitive-debriefing': 'Cognitive Debriefing',
    'clinician-review': 'Clinician Review',
    'linguistic-validation': 'Linguistic Validation',
    'regulatory': 'Regulatory Translation',
    'pharmacovigilance': 'Pharmacovigilance',
    'ecoa-migration': 'eCOA Migration',
    'medical-device': 'Medical Device Translation',
  };
  return labels[serviceType] || serviceType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

// Helper function to get file icon based on type
function getFileIcon(mimeType: string): string {
  if (!mimeType) return '📄';
  if (mimeType.includes('pdf')) return '📕';
  if (mimeType.includes('word') || mimeType.includes('document')) return '📘';
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📗';
  if (mimeType.includes('image')) return '🖼️';
  if (mimeType.includes('video')) return '🎬';
  if (mimeType.includes('audio')) return '🎵';
  if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦';
  return '📄';
}

// Helper function to format field names
function formatFieldName(fieldName: string): string {
  return fieldName
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

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
    const fileUrls: Array<{
      name: string;
      path: string;
      url: string;
      size: number;
      type: string;
    }> = []
    console.log('[API Quote] Files to upload:', files.length)

    for (const file of files) {
      if (file.size > 0) {
        const timestamp = Date.now()
        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const filePath = `life-sciences/${timestamp}-${safeFileName}`

        const arrayBuffer = await file.arrayBuffer()
        const fileBuffer = new Uint8Array(arrayBuffer)

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('cethosweb-quote-files')
          .upload(filePath, fileBuffer, {
            contentType: file.type,
            cacheControl: '3600',
          })

        if (!uploadError && uploadData) {
          // Generate public URL for the uploaded file
          const { data: urlData } = supabase.storage
            .from('cethosweb-quote-files')
            .getPublicUrl(filePath)

          fileUrls.push({
            name: file.name,
            path: filePath,
            url: urlData.publicUrl,
            size: file.size,
            type: file.type
          })
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
        file_urls: fileUrls.map(f => f.url), // Store public URLs
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
      const fileRecords = fileUrls.map(file => ({
        quote_id: quote.id,
        file_name: file.name,
        file_size: file.size,
        file_type: file.type,
        storage_path: file.path,
        public_url: file.url
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
<body style="margin: 0; padding: 0; font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse;">

          <!-- Header with Logo -->
          <tr>
            <td style="background-color: #0C2340; padding: 30px 40px; border-radius: 12px 12px 0 0; text-align: center;">
              <img src="https://lmzoyezvsjgsxveoakdr.supabase.co/storage/v1/object/public/web-assets/png_logo_cethos_light_bg.png"
                   alt="Cethos Solutions Inc."
                   style="max-width: 180px; height: auto; margin-bottom: 15px;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 600;">
                New Quote Request
              </h1>
              <p style="color: #94a3b8; margin: 10px 0 0 0; font-size: 14px;">
                ${getServiceLabel(validatedData.serviceType)} Services
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">

              <!-- Contact Information -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 2px solid #0891B2;">
                    <h2 style="color: #0C2340; margin: 0; font-size: 18px; font-weight: 600;">
                      📋 Contact Information
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top;">Name:</td>
                        <td style="padding: 8px 0; color: #111827; font-weight: 500;">${validatedData.fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Email:</td>
                        <td style="padding: 8px 0;">
                          <a href="mailto:${validatedData.email}" style="color: #0891B2; text-decoration: none;">${validatedData.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Phone:</td>
                        <td style="padding: 8px 0;">
                          <a href="tel:${validatedData.phone}" style="color: #0891B2; text-decoration: none;">${validatedData.phone}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Company:</td>
                        <td style="padding: 8px 0; color: #111827; font-weight: 500;">${validatedData.companyName}</td>
                      </tr>
                      ${validatedData.jobTitle ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Job Title:</td>
                        <td style="padding: 8px 0; color: #111827;">${validatedData.jobTitle}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Project Details -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 2px solid #0891B2;">
                    <h2 style="color: #0C2340; margin: 0; font-size: 18px; font-weight: 600;">
                      📁 Project Details
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; width: 140px; vertical-align: top;">Service Type:</td>
                        <td style="padding: 8px 0;">
                          <span style="background-color: #0891B2; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">
                            ${getServiceLabel(validatedData.serviceType)}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Source Language:</td>
                        <td style="padding: 8px 0; color: #111827;">${validatedData.sourceLanguage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Target Languages:</td>
                        <td style="padding: 8px 0; color: #111827;">${validatedData.targetLanguages.join(', ')}</td>
                      </tr>
                      ${validatedData.wordCount ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Word Count:</td>
                        <td style="padding: 8px 0; color: #111827;">${Number(validatedData.wordCount).toLocaleString()} words</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Timeline:</td>
                        <td style="padding: 8px 0;">
                          <span style="background-color: ${validatedData.timeline === 'urgent' ? '#fef3c7' : '#e0f2fe'}; color: ${validatedData.timeline === 'urgent' ? '#92400e' : '#0C2340'}; padding: 4px 12px; border-radius: 20px; font-size: 13px;">
                            ${timelineLabels[validatedData.timeline] || validatedData.timeline}
                          </span>
                        </td>
                      </tr>
                      ${validatedData.therapeuticArea ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Therapeutic Area:</td>
                        <td style="padding: 8px 0; color: #111827;">${therapeuticLabels[validatedData.therapeuticArea] || validatedData.therapeuticArea}</td>
                      </tr>
                      ` : ''}
                      ${validatedData.studyPhase ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Study Phase:</td>
                        <td style="padding: 8px 0; color: #111827;">${phaseLabels[validatedData.studyPhase] || validatedData.studyPhase}</td>
                      </tr>
                      ` : ''}
                      ${validatedData.instrumentType ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Instrument Type:</td>
                        <td style="padding: 8px 0; color: #111827;">${validatedData.instrumentType.toUpperCase()}</td>
                      </tr>
                      ` : ''}
                      ${validatedData.regulatoryPathway ? `
                      <tr>
                        <td style="padding: 8px 0; color: #6b7280; vertical-align: top;">Regulatory Pathway:</td>
                        <td style="padding: 8px 0; color: #111827;">${regulatoryLabels[validatedData.regulatoryPathway] || validatedData.regulatoryPathway}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Uploaded Files Section -->
              ${fileUrls.length > 0 ? `
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 2px solid #0891B2;">
                    <h2 style="color: #0C2340; margin: 0; font-size: 18px; font-weight: 600;">
                      📎 Uploaded Files (${fileUrls.length})
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                      ${fileUrls.map((file, index) => `
                      <tr>
                        <td style="padding: 12px 15px; background-color: ${index % 2 === 0 ? '#f8fafc' : '#ffffff'}; border-radius: 6px; margin-bottom: 8px;">
                          <table role="presentation" style="width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="width: 40px; vertical-align: middle;">
                                <span style="font-size: 24px;">${getFileIcon(file.type)}</span>
                              </td>
                              <td style="vertical-align: middle;">
                                <a href="${file.url}"
                                   style="color: #0891B2; text-decoration: none; font-weight: 500; font-size: 14px;"
                                   target="_blank">
                                  ${file.name}
                                </a>
                                <br>
                                <span style="color: #6b7280; font-size: 12px;">
                                  ${formatFileSize(file.size)} · ${file.type || 'Unknown type'}
                                </span>
                              </td>
                              <td style="width: 100px; text-align: right; vertical-align: middle;">
                                <a href="${file.url}"
                                   style="display: inline-block; background-color: #0891B2; color: white; padding: 6px 12px; border-radius: 6px; text-decoration: none; font-size: 12px; font-weight: 500;"
                                   target="_blank">
                                  Download
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      `).join('')}
                    </table>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Project Description -->
              ${validatedData.projectDescription ? `
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding-bottom: 15px; border-bottom: 2px solid #0891B2;">
                    <h2 style="color: #0C2340; margin: 0; font-size: 18px; font-weight: 600;">
                      💬 Project Description
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid #0891B2;">
                      <p style="margin: 0; color: #374151; line-height: 1.6; white-space: pre-wrap;">${validatedData.projectDescription}</p>
                    </div>
                  </td>
                </tr>
              </table>
              ` : ''}

              <!-- Quick Actions -->
              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="text-align: center; padding-top: 20px;">
                    <a href="mailto:${validatedData.email}?subject=Re: Your Quote Request - ${getServiceLabel(validatedData.serviceType)}"
                       style="display: inline-block; background-color: #0891B2; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-right: 10px;">
                      Reply to Customer
                    </a>
                    <a href="tel:${validatedData.phone}"
                       style="display: inline-block; background-color: #0C2340; color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                      Call Customer
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0C2340; padding: 30px 40px; border-radius: 0 0 12px 12px; text-align: center;">
              <p style="color: #94a3b8; margin: 0 0 10px 0; font-size: 14px;">
                Quote ID: ${quote.id}
              </p>
              <p style="color: #ffffff; margin: 0 0 15px 0; font-size: 14px; font-weight: 500;">
                Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/Edmonton' })}
              </p>
              <p style="color: #64748b; margin: 0; font-size: 12px;">
                Cethos Solutions Inc. · Calgary, AB · Dubai, UAE · Patiala, India
              </p>
              <p style="color: #64748b; margin: 10px 0 0 0; font-size: 12px;">
                <a href="https://cethos.com" style="color: #0891B2; text-decoration: none;">cethos.com</a> ·
                <a href="tel:+15876000786" style="color: #0891B2; text-decoration: none;">(587) 600-0786</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `

      const sendSmtpEmail = new Brevo.SendSmtpEmail()
      sendSmtpEmail.subject = `New ${getServiceLabel(validatedData.serviceType)} Quote - ${validatedData.companyName || validatedData.fullName}`
      sendSmtpEmail.sender = {
        name: 'Cethos Solutions Inc.',
        email: 'quotes@cethos.com'
      }
      sendSmtpEmail.to = emailRecipients.map((email: string) => ({ email: email.trim() }))
      sendSmtpEmail.replyTo = {
        name: validatedData.fullName,
        email: validatedData.email
      }
      sendSmtpEmail.htmlContent = htmlContent

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
