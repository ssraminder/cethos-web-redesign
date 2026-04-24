'use client'

import { useCallback, useRef, useState } from 'react'
import { Upload, X, CheckCircle, Loader2, XCircle, ShieldCheck } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

const MAX_FILES = 10
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50 MB
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png,.webp,.tif,.tiff,.heic,.heif,.doc,.docx'
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

type LocalFile = {
  id: string
  file: File
}

function formatFileSize(bytes: number): string {
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
  // Honeypot — real users never touch this
  const [companyWebsite, setCompanyWebsite] = useState('')

  const [files, setFiles] = useState<LocalFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successId, setSuccessId] = useState<string | null>(null)

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_MIME_TYPES.has(file.type)) {
      return `${file.name}: file type not allowed`
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: exceeds 50 MB`
    }
    if (file.size === 0) {
      return `${file.name}: empty file`
    }
    return null
  }

  const addFiles = useCallback(
    (incoming: File[]) => {
      const next: LocalFile[] = []
      const fileErrs: string[] = []
      for (const f of incoming) {
        if (files.some((x) => x.file.name === f.name && x.file.size === f.size)) continue
        const err = validateFile(f)
        if (err) {
          fileErrs.push(err)
          continue
        }
        next.push({ id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`, file: f })
      }
      if (files.length + next.length > MAX_FILES) {
        fileErrs.push(`At most ${MAX_FILES} files per submission`)
      }
      if (fileErrs.length > 0) {
        setErrors((p) => ({ ...p, files: fileErrs.join(' · ') }))
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

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      if (e.dataTransfer.files) addFiles(Array.from(e.dataTransfer.files))
    },
    [addFiles],
  )

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) addFiles(Array.from(e.target.files))
    e.target.value = ''
  }

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Name is required'
    if (!email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'Please enter a valid email'
    }
    if (!phone.trim()) next.phone = 'Phone number is required'
    if (files.length === 0) next.noFiles = 'Please attach at least one document'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isSubmitting) return
    if (!validate()) return

    setIsSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('fullName', fullName.trim())
      fd.append('email', email.trim())
      fd.append('phone', phone.trim())
      if (orderId.trim()) fd.append('orderOrQuoteId', orderId.trim())
      if (message.trim()) fd.append('message', message.trim())
      fd.append('companyWebsite', companyWebsite) // honeypot

      for (const { file } of files) {
        fd.append('files', file)
      }

      const res = await fetch('/api/public-upload', {
        method: 'POST',
        body: fd,
      })
      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        setErrors({ submit: body?.error || 'Submission failed. Please try again.' })
        setIsSubmitting(false)
        return
      }

      setSuccessId(body?.submissionId || 'submitted')
    } catch (err) {
      setErrors({ submit: 'Network error. Please check your connection and try again.' })
      setIsSubmitting(false)
    }
  }

  if (successId) {
    return (
      <div className="text-center py-8">
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-navy mb-2">Thanks — we got it.</h2>
        <p className="text-slate-600 mb-4">
          Your documents have been uploaded securely. Our team will review your
          submission and reach out to you at <strong>{email}</strong> shortly.
        </p>
        {successId !== 'submitted' && (
          <p className="text-xs text-slate-500">
            Reference ID: <code className="font-mono">{successId}</code>
          </p>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot — off-screen, not hidden (some bots skip hidden="hidden") */}
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

      {/* Submit-level error */}
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.submit}
        </div>
      )}

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Full name"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          error={errors.fullName}
          autoComplete="name"
          disabled={isSubmitting}
        />
        <Input
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          disabled={isSubmitting}
        />
        <Input
          label="Phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          autoComplete="tel"
          disabled={isSubmitting}
        />
        <Input
          label="Order or Quote ID (optional)"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="If you already have one"
          disabled={isSubmitting}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Anything we should know — source/target languages, deadlines, special instructions…"
          rows={4}
          disabled={isSubmitting}
        />
      </div>

      {/* File dropzone */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-navy mb-1.5">
          Documents <span className="text-red-500">*</span>
        </label>
        <div
          onDragOver={onDragOver}
          onDragEnter={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => !isSubmitting && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? 'border-teal-500 bg-teal-50'
              : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50'
          } ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXTENSIONS}
            multiple
            onChange={onFileInputChange}
            className="hidden"
            disabled={isSubmitting}
          />
          <Upload className="w-10 h-10 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-700 mb-1">
            <span className="font-semibold text-teal-600">Click to upload</span>{' '}
            or drag and drop
          </p>
          <p className="text-sm text-slate-500">
            PDF, images, Word documents · max 50 MB each · up to {MAX_FILES} files
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
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-navy truncate">
                    {f.file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(f.file.size)}
                  </p>
                </div>
                {!isSubmitting && (
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
          Encrypted transit · malware scanned · stored in a private access-controlled
          bucket
        </span>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full mt-6"
      >
        {isSubmitting ? 'Uploading…' : 'Send securely'}
      </Button>
    </form>
  )
}

export default SecureUploadForm
