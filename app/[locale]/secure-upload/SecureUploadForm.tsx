'use client'

import { useCallback, useRef, useState } from 'react'
import {
  Upload,
  X,
  CheckCircle,
  Loader2,
  XCircle,
  ShieldCheck,
} from 'lucide-react'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const MAX_FILES = 25
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100 MB
const ACCEPTED_EXTENSIONS =
  '.pdf,.jpg,.jpeg,.png,.webp,.tif,.tiff,.heic,.heif,.doc,.docx'
const ACCEPTED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/tiff',
  'image/heic',
  'image/heif',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
])

type UploadStatus = 'pending' | 'uploading' | 'success' | 'error'

interface LocalFile {
  id: string
  file: File
  status: UploadStatus
  progress: number
  storagePath?: string
  error?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function SecureUploadForm() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('') // honeypot

  const [files, setFiles] = useState<LocalFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [phase, setPhase] = useState<
    'idle' | 'starting' | 'uploading' | 'finalizing' | 'success' | 'error'
  >('idle')
  const [successId, setSuccessId] = useState<string | null>(null)

  const supabaseRef = useRef(createBrowserSupabaseClient())
  const supabase = supabaseRef.current

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_MIME_TYPES.has(file.type))
      return `${file.name}: file type not allowed`
    if (file.size > MAX_FILE_SIZE) return `${file.name}: exceeds 100 MB`
    if (file.size === 0) return `${file.name}: empty file`
    return null
  }

  const addFiles = useCallback(
    (incoming: File[]) => {
      const next: LocalFile[] = []
      const errs: string[] = []
      for (const f of incoming) {
        if (
          files.some((x) => x.file.name === f.name && x.file.size === f.size)
        )
          continue
        const err = validateFile(f)
        if (err) {
          errs.push(err)
          continue
        }
        next.push({
          id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file: f,
          status: 'pending',
          progress: 0,
        })
      }
      if (files.length + next.length > MAX_FILES) {
        errs.push(`At most ${MAX_FILES} files per submission`)
      }
      if (errs.length > 0) {
        setErrors((p) => ({ ...p, files: errs.join(' \u00b7 ') }))
      } else {
        setErrors((p) => {
          const n = { ...p }
          delete n.files
          delete n.noFiles
          return n
        })
      }
      if (next.length > 0) {
        setFiles((prev) => [...prev, ...next].slice(0, MAX_FILES))
      }
    },
    [files],
  )

  const removeFile = (id: string) =>
    setFiles((prev) => prev.filter((f) => f.id !== id))

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles],
  )

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Name is required'
    if (!email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email'
    if (!phone.trim()) next.phone = 'Phone number is required'
    if (files.length === 0) next.noFiles = 'Please attach at least one document'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (phase === 'starting' || phase === 'uploading' || phase === 'finalizing')
      return
    if (!validate()) return
    if (!supabase) {
      setErrors({ submit: 'Service unavailable — please try again later.' })
      return
    }

    setPhase('starting')
    setErrors({})

    try {
      // 1. upload-start: validate manifest, get one signed URL per file
      const startBody = {
        files: files.map((f) => ({
          name: f.file.name,
          size: f.file.size,
          type: f.file.type,
        })),
      }
      const startRes = await supabase.functions.invoke('upload-start', {
        body: startBody,
      })
      if (startRes.error || !startRes.data?.success) {
        throw new Error(
          startRes.data?.error ||
            startRes.error?.message ||
            'Could not start upload',
        )
      }
      const { submissionId, bucket, uploads } = startRes.data as {
        submissionId: string
        bucket: string
        uploads: Array<{
          index: number
          originalName: string
          path: string
          signedUrl: string
          token: string
        }>
      }

      // 2. Upload each file directly to Supabase via the signed URL
      setPhase('uploading')
      for (let i = 0; i < uploads.length; i++) {
        const u = uploads[i]
        const localFile = files.find((f) => f.file.name === u.originalName)
        if (!localFile) continue

        setFiles((prev) =>
          prev.map((f) =>
            f.id === localFile.id
              ? { ...f, status: 'uploading' as const, progress: 0 }
              : f,
          ),
        )

        try {
          await uploadWithProgress({
            url: u.signedUrl,
            file: localFile.file,
            onProgress: (p) =>
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === localFile.id ? { ...f, progress: p } : f,
                ),
              ),
          })
          setFiles((prev) =>
            prev.map((f) =>
              f.id === localFile.id
                ? {
                    ...f,
                    status: 'success' as const,
                    progress: 100,
                    storagePath: u.path,
                  }
                : f,
            ),
          )
        } catch (err) {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === localFile.id
                ? {
                    ...f,
                    status: 'error' as const,
                    error: (err as Error)?.message || 'Upload failed',
                  }
                : f,
            ),
          )
          throw err
        }
      }

      // 3. upload-complete: register submission, trigger scan
      setPhase('finalizing')
      const completePayload = {
        submissionId,
        bucket,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        orderOrQuoteId: orderId.trim() || undefined,
        message: message.trim() || undefined,
        companyWebsite, // honeypot
        submittedFrom: 'main_web',
        files: uploads.map((u) => {
          const lf = files.find((f) => f.file.name === u.originalName)
          return {
            path: u.path,
            originalName: u.originalName,
            size: lf?.file.size ?? 0,
            mimeType: lf?.file.type ?? 'application/octet-stream',
          }
        }),
      }
      const completeRes = await supabase.functions.invoke(
        'upload-complete',
        { body: completePayload },
      )
      if (completeRes.error || !completeRes.data?.success) {
        throw new Error(
          completeRes.data?.error ||
            completeRes.error?.message ||
            'Could not finalize submission',
        )
      }

      setPhase('success')
      setSuccessId(submissionId)
    } catch (err) {
      console.error('secure-upload submit error:', err)
      setErrors({
        submit:
          (err as Error)?.message ||
          'Network error. Please check your connection and try again.',
      })
      setPhase('error')
    }
  }

  if (phase === 'success' && successId) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-navy mb-2">
          Thanks — we got it.
        </h2>
        <p className="text-slate-600 mb-4">
          Your documents have been uploaded securely. Our team will review your
          submission and reach out to you at <strong>{email}</strong> shortly.
        </p>
        <p className="text-xs text-slate-500">
          Reference ID: <code className="font-mono">{successId}</code>
        </p>
      </div>
    )
  }

  const submitting =
    phase === 'starting' || phase === 'uploading' || phase === 'finalizing'

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — off-screen */}
      <div
        aria-hidden="true"
        className="absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden"
      >
        <label>
          Company website (leave blank)
          <input
            type="text"
            name="companyWebsite"
            tabIndex={-1}
            autoComplete="off"
            value={companyWebsite}
            onChange={(e) => setCompanyWebsite(e.target.value)}
          />
        </label>
      </div>

      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          autoComplete="name"
          disabled={submitting}
        />
        <Input
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          disabled={submitting}
        />
        <Input
          label="Phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          autoComplete="tel"
          disabled={submitting}
        />
        <Input
          label="Order or Quote ID (optional)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="If you already have one"
          disabled={submitting}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything we should know — source/target languages, deadlines, special instructions…"
          rows={4}
          disabled={submitting}
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-navy mb-1.5">
          Documents <span className="text-red-500">*</span>
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(true)
          }}
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(true)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsDragging(false)
          }}
          onDrop={onDrop}
          onClick={() => !submitting && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-teal-500 bg-teal-50'
              : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50'
          } ${submitting ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            multiple
            onChange={(e) => {
              if (e.target.files) addFiles(Array.from(e.target.files))
              e.target.value = ''
            }}
            className="hidden"
            disabled={submitting}
          />
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-700 mb-1">
            <span className="font-semibold text-teal-600">Click to upload</span>{' '}
            or drag and drop
          </p>
          <p className="text-sm text-slate-500">
            PDF, images, Word documents · max 100 MB each · up to {MAX_FILES}{' '}
            files
          </p>
        </div>
        {errors.files && (
          <p className="text-sm text-red-600 mt-2">{errors.files}</p>
        )}
        {errors.noFiles && (
          <p className="text-sm text-red-600 mt-2">{errors.noFiles}</p>
        )}

        {files.length > 0 && (
          <ul className="mt-3 space-y-2">
            {files.map((f) => (
              <li
                key={f.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
              >
                <StatusIcon status={f.status} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy truncate">
                    {f.file.name}
                  </p>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span>{formatBytes(f.file.size)}</span>
                    {f.status === 'uploading' && <span>{f.progress}%</span>}
                    {f.status === 'error' && f.error && (
                      <span className="text-red-500 truncate">{f.error}</span>
                    )}
                  </div>
                  {f.status === 'uploading' && (
                    <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                      <div
                        className="bg-teal-500 h-1 rounded-full transition-all duration-200"
                        style={{ width: `${f.progress}%` }}
                      />
                    </div>
                  )}
                </div>
                {!submitting && (
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="p-1 hover:bg-slate-200 rounded"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
        <ShieldCheck className="w-4 h-4 text-green-600" />
        <span>
          Encrypted transit · malware scanned · stored in a private
          access-controlled bucket
        </span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={submitting}
        disabled={submitting}
        className="w-full mt-6"
      >
        {phase === 'starting' && 'Preparing upload…'}
        {phase === 'uploading' && 'Uploading documents…'}
        {phase === 'finalizing' && 'Finalizing…'}
        {(phase === 'idle' || phase === 'error') && 'Send securely'}
      </Button>

      {phase === 'uploading' && files.length > 3 && (
        <p className="text-xs text-slate-500 text-center mt-2">
          Don&apos;t close this tab — large uploads may take several minutes.
        </p>
      )}
    </form>
  )
}

function StatusIcon({ status }: { status: UploadStatus }) {
  switch (status) {
    case 'pending':
      return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
    case 'uploading':
      return <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-500" />
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />
  }
}

function uploadWithProgress(args: {
  url: string
  file: File
  onProgress: (percent: number) => void
}): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('PUT', args.url)
    xhr.setRequestHeader(
      'Content-Type',
      args.file.type || 'application/octet-stream',
    )
    xhr.upload.onprogress = (evt) => {
      if (evt.lengthComputable) {
        args.onProgress(Math.round((evt.loaded / evt.total) * 100))
      }
    }
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve()
      else reject(new Error(`Upload failed (${xhr.status})`))
    }
    xhr.onerror = () => reject(new Error('Network error during upload'))
    xhr.onabort = () => reject(new Error('Upload aborted'))
    xhr.send(args.file)
  })
}

export default SecureUploadForm
