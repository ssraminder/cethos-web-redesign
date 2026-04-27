'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Upload,
  X,
  CheckCircle,
  Loader2,
  XCircle,
  ShieldCheck,
  Mail,
  Phone as PhoneIcon,
  ArrowLeft,
  FolderPlus,
  Folder,
  Trash2,
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

type Channel = 'email' | 'phone'
type UploadStatus = 'pending' | 'uploading' | 'success' | 'error'

interface LocalFile {
  id: string
  file: File
  status: UploadStatus
  progress: number
  storagePath?: string
  error?: string
}

interface FolderGroup {
  id: string
  name: string
  files: LocalFile[]
}

type Step = 'identity' | 'otp' | 'docs' | 'success'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function newGroupId(): string {
  return `g-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function inferMimeOk(name: string): boolean {
  const ext = name.split('.').pop()?.toLowerCase()
  return [
    'pdf',
    'jpg',
    'jpeg',
    'png',
    'webp',
    'tif',
    'tiff',
    'heic',
    'heif',
    'doc',
    'docx',
  ].includes(ext || '')
}

export function SecureUploadForm() {
  // Step 1: identity
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('') // honeypot

  // Step 2: OTP
  const [otpChannel, setOtpChannel] = useState<Channel>('email')
  const [otpId, setOtpId] = useState<string | null>(null)
  const [otpCode, setOtpCode] = useState('')
  const [otpMaskedContact, setOtpMaskedContact] = useState('')
  const [otpResendCountdown, setOtpResendCountdown] = useState(0)
  const [verificationToken, setVerificationToken] = useState<string | null>(null)
  const [otpSending, setOtpSending] = useState(false)
  const [otpVerifying, setOtpVerifying] = useState(false)

  // Step 3: docs (with folder grouping)
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState('')
  const [groups, setGroups] = useState<FolderGroup[]>([
    { id: newGroupId(), name: '', files: [] },
  ])
  const [phase, setPhase] = useState<
    'idle' | 'starting' | 'uploading' | 'finalizing' | 'error'
  >('idle')

  // Shared
  const [step, setStep] = useState<Step>('identity')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successId, setSuccessId] = useState<string | null>(null)

  const supabaseRef = useRef(createBrowserSupabaseClient())
  const supabase = supabaseRef.current

  useEffect(() => {
    if (otpResendCountdown <= 0) return
    const t = setTimeout(() => setOtpResendCountdown((v) => v - 1), 1000)
    return () => clearTimeout(t)
  }, [otpResendCountdown])

  // ── Identity / OTP step handlers ───────────────────────────────────────────

  const validateIdentity = (): boolean => {
    const next: Record<string, string> = {}
    if (!fullName.trim()) next.fullName = 'Name is required'
    if (!email.trim()) next.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email'
    if (!phone.trim()) next.phone = 'Phone number is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const requestOtp = async (channel: Channel) => {
    if (!validateIdentity()) return
    if (companyWebsite) {
      setStep('success')
      setSuccessId('hp-dropped')
      return
    }
    if (!supabase) {
      setErrors({ submit: 'Service unavailable — please try again later.' })
      return
    }
    setOtpSending(true)
    setErrors({})
    try {
      const contact = channel === 'email' ? email.trim() : phone.trim()
      const res = await supabase.functions.invoke('secure-upload-otp-send', {
        body: { channel, contact, fullName: fullName.trim() },
      })
      if (res.error || !res.data?.success) {
        throw new Error((await readFunctionError(res)) || 'Could not send code')
      }
      setOtpChannel(channel)
      setOtpId(res.data.otpId as string)
      setOtpMaskedContact(res.data.contact as string)
      setOtpCode('')
      setOtpResendCountdown(30)
      setStep('otp')
    } catch (err) {
      setErrors({ otp: (err as Error)?.message || 'Could not send code' })
    } finally {
      setOtpSending(false)
    }
  }

  const resendOtp = async () => {
    if (otpResendCountdown > 0) return
    await requestOtp(otpChannel)
  }

  const verifyOtp = async () => {
    if (!otpId) {
      setErrors({ otp: 'No code requested. Please go back and request one.' })
      return
    }
    if (!/^\d{6}$/.test(otpCode.trim())) {
      setErrors({ otp: 'Enter the 6-digit code' })
      return
    }
    if (!supabase) return
    setOtpVerifying(true)
    setErrors({})
    try {
      const res = await supabase.functions.invoke('secure-upload-otp-verify', {
        body: { otpId, code: otpCode.trim() },
      })
      if (res.error || !res.data?.success) {
        throw new Error((await readFunctionError(res)) || 'Code is incorrect')
      }
      setVerificationToken(res.data.verificationToken as string)
      setStep('docs')
    } catch (err) {
      setErrors({ otp: (err as Error)?.message || 'Code is incorrect' })
    } finally {
      setOtpVerifying(false)
    }
  }

  // ── Folder + file handlers ─────────────────────────────────────────────────

  const totalFiles = useMemo(
    () => groups.reduce((sum, g) => sum + g.files.length, 0),
    [groups],
  )

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_MIME_TYPES.has(file.type) && !inferMimeOk(file.name))
      return `${file.name}: file type not allowed`
    if (file.size > MAX_FILE_SIZE) return `${file.name}: exceeds 100 MB`
    if (file.size === 0) return `${file.name}: empty file`
    return null
  }

  const addFilesTo = useCallback(
    (groupId: string, incoming: File[]) => {
      const errs: string[] = []
      const newFiles: LocalFile[] = []
      // Build a global de-dup set across all groups
      const allFiles = groups.flatMap((g) => g.files)
      for (const f of incoming) {
        if (allFiles.some((x) => x.file.name === f.name && x.file.size === f.size))
          continue
        const err = validateFile(f)
        if (err) {
          errs.push(err)
          continue
        }
        newFiles.push({
          id: `${f.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file: f,
          status: 'pending',
          progress: 0,
        })
      }
      if (totalFiles + newFiles.length > MAX_FILES) {
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
      if (newFiles.length > 0) {
        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupId
              ? { ...g, files: [...g.files, ...newFiles].slice(0, MAX_FILES) }
              : g,
          ),
        )
      }
    },
    [groups, totalFiles],
  )

  const removeFile = (groupId: string, fileId: string) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, files: g.files.filter((f) => f.id !== fileId) } : g,
      ),
    )
  }

  const addFolder = () => {
    setGroups((prev) => [...prev, { id: newGroupId(), name: '', files: [] }])
  }

  const renameFolder = (groupId: string, name: string) => {
    setGroups((prev) => prev.map((g) => (g.id === groupId ? { ...g, name } : g)))
  }

  const removeFolder = (groupId: string) => {
    setGroups((prev) => {
      // Always keep at least one group
      if (prev.length <= 1) return prev.map((g) => ({ ...g, name: '', files: [] }))
      return prev.filter((g) => g.id !== groupId)
    })
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  const submitDocs = async (e: React.FormEvent) => {
    e.preventDefault()
    if (
      phase === 'starting' ||
      phase === 'uploading' ||
      phase === 'finalizing'
    )
      return
    const allFiles = groups.flatMap((g) => g.files)
    if (allFiles.length === 0) {
      setErrors({ noFiles: 'Please attach at least one document' })
      return
    }
    if (!verificationToken) {
      setErrors({ submit: 'Verification expired — please go back and request a new code.' })
      return
    }
    if (!supabase) {
      setErrors({ submit: 'Service unavailable — please try again later.' })
      return
    }

    setPhase('starting')
    setErrors({})

    try {
      const startRes = await supabase.functions.invoke('upload-start', {
        body: {
          verificationToken,
          files: allFiles.map((f) => ({
            name: f.file.name,
            size: f.file.size,
            type: f.file.type,
          })),
        },
      })
      if (startRes.error || !startRes.data?.success) {
        throw new Error((await readFunctionError(startRes)) || 'Could not start upload')
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

      // Build a name → folder lookup so the per-file folder labels stick
      // through the path-based round trip. originalName is unique inside one
      // submission because addFilesTo dedupes by (name+size).
      const folderByName = new Map<string, string>()
      for (const g of groups) {
        for (const f of g.files) {
          folderByName.set(f.file.name, g.name.trim())
        }
      }

      setPhase('uploading')
      for (const u of uploads) {
        let localFile: LocalFile | undefined
        let groupId: string | undefined
        for (const g of groups) {
          const found = g.files.find((f) => f.file.name === u.originalName)
          if (found) {
            localFile = found
            groupId = g.id
            break
          }
        }
        if (!localFile || !groupId) continue

        // Mark uploading on the right group
        setGroups((prev) =>
          prev.map((g) =>
            g.id === groupId
              ? {
                  ...g,
                  files: g.files.map((f) =>
                    f.id === localFile!.id
                      ? { ...f, status: 'uploading' as const, progress: 0 }
                      : f,
                  ),
                }
              : g,
          ),
        )

        try {
          await uploadWithProgress({
            url: u.signedUrl,
            file: localFile.file,
            onProgress: (p) =>
              setGroups((prev) =>
                prev.map((g) =>
                  g.id === groupId
                    ? {
                        ...g,
                        files: g.files.map((f) =>
                          f.id === localFile!.id ? { ...f, progress: p } : f,
                        ),
                      }
                    : g,
                ),
              ),
          })
          setGroups((prev) =>
            prev.map((g) =>
              g.id === groupId
                ? {
                    ...g,
                    files: g.files.map((f) =>
                      f.id === localFile!.id
                        ? {
                            ...f,
                            status: 'success' as const,
                            progress: 100,
                            storagePath: u.path,
                          }
                        : f,
                    ),
                  }
                : g,
            ),
          )
        } catch (err) {
          setGroups((prev) =>
            prev.map((g) =>
              g.id === groupId
                ? {
                    ...g,
                    files: g.files.map((f) =>
                      f.id === localFile!.id
                        ? {
                            ...f,
                            status: 'error' as const,
                            error: (err as Error)?.message || 'Upload failed',
                          }
                        : f,
                    ),
                  }
                : g,
            ),
          )
          throw err
        }
      }

      setPhase('finalizing')
      const completeRes = await supabase.functions.invoke('upload-complete', {
        body: {
          submissionId,
          bucket,
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          orderOrQuoteId: orderId.trim() || undefined,
          message: message.trim() || undefined,
          companyWebsite,
          submittedFrom: 'main_web',
          files: uploads.map((u) => {
            // find the original local file for size/mime + the folder it was in
            let lf: LocalFile | undefined
            let folder = ''
            for (const g of groups) {
              const found = g.files.find((f) => f.file.name === u.originalName)
              if (found) {
                lf = found
                folder = g.name.trim()
                break
              }
            }
            return {
              path: u.path,
              originalName: u.originalName,
              size: lf?.file.size ?? 0,
              mimeType: lf?.file.type ?? 'application/octet-stream',
              folder: folder || undefined,
            }
          }),
        },
      })
      if (completeRes.error || !completeRes.data?.success) {
        throw new Error(
          (await readFunctionError(completeRes)) ||
            'Could not finalize submission',
        )
      }

      setSuccessId(submissionId)
      setStep('success')
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

  // ── Render ─────────────────────────────────────────────────────────────────

  if (step === 'success' && successId) {
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
        {successId !== 'hp-dropped' && (
          <p className="text-xs text-slate-500">
            Reference ID: <code className="font-mono">{successId}</code>
          </p>
        )}
      </div>
    )
  }

  return (
    <div>
      <Stepper step={step} />

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

      {step === 'identity' && (
        <IdentityStep
          fullName={fullName}
          email={email}
          phone={phone}
          errors={errors}
          otpSending={otpSending}
          onChange={{ setFullName, setEmail, setPhone }}
          onSendEmail={() => requestOtp('email')}
          onSendPhone={() => requestOtp('phone')}
        />
      )}

      {step === 'otp' && (
        <OtpStep
          channel={otpChannel}
          maskedContact={otpMaskedContact}
          code={otpCode}
          errors={errors}
          verifying={otpVerifying}
          resendCountdown={otpResendCountdown}
          onChangeCode={setOtpCode}
          onVerify={verifyOtp}
          onResend={resendOtp}
          onChangeContact={() => {
            setStep('identity')
            setOtpId(null)
            setOtpCode('')
            setErrors({})
          }}
        />
      )}

      {step === 'docs' && (
        <DocsStep
          orderId={orderId}
          message={message}
          groups={groups}
          totalFiles={totalFiles}
          phase={phase}
          errors={errors}
          onChange={{ setOrderId, setMessage }}
          onAddFolder={addFolder}
          onRenameFolder={renameFolder}
          onRemoveFolder={removeFolder}
          onAddFilesTo={addFilesTo}
          onRemoveFile={removeFile}
          onSubmit={submitDocs}
        />
      )}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Stepper
// ───────────────────────────────────────────────────────────────────────────

function Stepper({ step }: { step: Step }) {
  const items: Array<{ key: Step; label: string }> = [
    { key: 'identity', label: 'Your details' },
    { key: 'otp', label: 'Verify' },
    { key: 'docs', label: 'Upload' },
  ]
  const idx = items.findIndex((i) => i.key === step)
  return (
    <div className="flex items-center justify-center gap-2 mb-6 text-xs">
      {items.map((it, i) => {
        const active = i === idx
        const done = i < idx
        return (
          <div key={it.key} className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold ${
                active
                  ? 'bg-teal-600 text-white'
                  : done
                    ? 'bg-green-100 text-green-700'
                    : 'bg-slate-100 text-slate-400'
              }`}
            >
              {done ? '\u2713' : i + 1}
            </span>
            <span
              className={
                active
                  ? 'font-semibold text-navy'
                  : done
                    ? 'text-slate-600'
                    : 'text-slate-400'
              }
            >
              {it.label}
            </span>
            {i < items.length - 1 && (
              <span className="w-8 h-px bg-slate-200" aria-hidden="true" />
            )}
          </div>
        )
      })}
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 1: Identity
// ───────────────────────────────────────────────────────────────────────────

function IdentityStep(props: {
  fullName: string
  email: string
  phone: string
  errors: Record<string, string>
  otpSending: boolean
  onChange: {
    setFullName: (v: string) => void
    setEmail: (v: string) => void
    setPhone: (v: string) => void
  }
  onSendEmail: () => void
  onSendPhone: () => void
}) {
  const { fullName, email, phone, errors, otpSending, onChange } = props
  return (
    <div>
      {errors.otp && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.otp}
        </div>
      )}
      <Input
        label="Full name"
        required
        value={fullName}
        onChange={(e) => onChange.setFullName(e.target.value)}
        error={errors.fullName}
        autoComplete="name"
        disabled={otpSending}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
        <Input
          label="Email"
          required
          type="email"
          value={email}
          onChange={(e) => onChange.setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
          disabled={otpSending}
          helperText="Used for the verification code (option 1)"
        />
        <Input
          label="Phone"
          required
          type="tel"
          value={phone}
          onChange={(e) => onChange.setPhone(e.target.value)}
          error={errors.phone}
          autoComplete="tel"
          disabled={otpSending}
          helperText="International format works best (e.g. +1...)"
        />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button
          type="button"
          variant="primary"
          size="md"
          isLoading={otpSending}
          disabled={otpSending}
          icon={<Mail className="w-4 h-4" />}
          onClick={props.onSendEmail}
          className="w-full"
        >
          Send code by email
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="md"
          isLoading={otpSending}
          disabled={otpSending}
          icon={<PhoneIcon className="w-4 h-4" />}
          onClick={props.onSendPhone}
          className="w-full"
        >
          Send code by SMS
        </Button>
      </div>

      <p className="text-xs text-slate-500 mt-3">
        We&apos;ll send a 6-digit code to verify it&apos;s really you before you
        upload anything.
      </p>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 2: OTP
// ───────────────────────────────────────────────────────────────────────────

function OtpStep(props: {
  channel: Channel
  maskedContact: string
  code: string
  errors: Record<string, string>
  verifying: boolean
  resendCountdown: number
  onChangeCode: (v: string) => void
  onVerify: () => void
  onResend: () => void
  onChangeContact: () => void
}) {
  const {
    channel,
    maskedContact,
    code,
    errors,
    verifying,
    resendCountdown,
    onChangeCode,
    onVerify,
    onResend,
    onChangeContact,
  } = props
  return (
    <div>
      <button
        type="button"
        onClick={onChangeContact}
        className="text-sm text-slate-500 hover:text-navy inline-flex items-center gap-1 mb-3"
      >
        <ArrowLeft className="w-4 h-4" />
        Change contact details
      </button>

      <p className="text-sm text-navy">
        We sent a 6-digit code to <strong>{maskedContact}</strong>
        {channel === 'email' ? ' by email.' : ' by SMS.'}
      </p>
      <p className="text-xs text-slate-500 mt-1 mb-5">
        It expires in 10 minutes. Check your spam folder if you don&apos;t see
        it.
      </p>

      {errors.otp && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.otp}
        </div>
      )}

      <Input
        label="6-digit code"
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={6}
        value={code}
        onChange={(e) => onChangeCode(e.target.value.replace(/\D/g, ''))}
        placeholder="000000"
        disabled={verifying}
      />

      <Button
        type="button"
        variant="primary"
        size="lg"
        isLoading={verifying}
        disabled={verifying || code.length !== 6}
        onClick={onVerify}
        className="w-full mt-4"
      >
        Verify and continue
      </Button>

      <div className="mt-3 text-center">
        <button
          type="button"
          onClick={onResend}
          disabled={resendCountdown > 0 || verifying}
          className="text-sm text-teal-600 hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed"
        >
          {resendCountdown > 0
            ? `Resend code in ${resendCountdown}s`
            : 'Resend code'}
        </button>
      </div>
    </div>
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Step 3: Docs (with folder grouping)
// ───────────────────────────────────────────────────────────────────────────

function DocsStep(props: {
  orderId: string
  message: string
  groups: FolderGroup[]
  totalFiles: number
  phase: 'idle' | 'starting' | 'uploading' | 'finalizing' | 'error'
  errors: Record<string, string>
  onChange: {
    setOrderId: (v: string) => void
    setMessage: (v: string) => void
  }
  onAddFolder: () => void
  onRenameFolder: (groupId: string, name: string) => void
  onRemoveFolder: (groupId: string) => void
  onAddFilesTo: (groupId: string, files: File[]) => void
  onRemoveFile: (groupId: string, fileId: string) => void
  onSubmit: (e: React.FormEvent) => void
}) {
  const {
    orderId,
    message,
    groups,
    totalFiles,
    phase,
    errors,
    onChange,
    onAddFolder,
    onRenameFolder,
    onRemoveFolder,
    onAddFilesTo,
    onRemoveFile,
    onSubmit,
  } = props
  const submitting =
    phase === 'starting' || phase === 'uploading' || phase === 'finalizing'

  return (
    <form onSubmit={onSubmit} noValidate>
      {errors.submit && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          {errors.submit}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Order or Quote ID (optional)"
          value={orderId}
          onChange={(e) => onChange.setOrderId(e.target.value)}
          placeholder="If you already have one"
          disabled={submitting}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Message (optional)"
          value={message}
          onChange={(e) => onChange.setMessage(e.target.value)}
          placeholder="Anything we should know — source/target languages, deadlines, special instructions…"
          rows={3}
          disabled={submitting}
        />
      </div>

      {/* Folders */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-navy">
            Documents <span className="text-red-500">*</span>
          </label>
          <span className="text-xs text-slate-500">
            {totalFiles}/{MAX_FILES} files · 100 MB each max
          </span>
        </div>
        {errors.files && (
          <p className="text-sm text-red-600 mb-2">{errors.files}</p>
        )}
        {errors.noFiles && (
          <p className="text-sm text-red-600 mb-2">{errors.noFiles}</p>
        )}

        <div className="space-y-3">
          {groups.map((g, i) => (
            <FolderCard
              key={g.id}
              group={g}
              index={i}
              isOnly={groups.length === 1}
              submitting={submitting}
              onRename={(name) => onRenameFolder(g.id, name)}
              onRemove={() => onRemoveFolder(g.id)}
              onAddFiles={(files) => onAddFilesTo(g.id, files)}
              onRemoveFile={(fileId) => onRemoveFile(g.id, fileId)}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={onAddFolder}
          disabled={submitting}
          className="mt-3 inline-flex items-center gap-2 px-3 py-2 text-sm text-teal-700 border border-dashed border-teal-300 rounded-lg hover:bg-teal-50 disabled:opacity-50"
        >
          <FolderPlus className="w-4 h-4" />
          Add another folder
        </button>
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

      {phase === 'uploading' && totalFiles > 3 && (
        <p className="text-xs text-slate-500 text-center mt-2">
          Don&apos;t close this tab — large uploads may take several minutes.
        </p>
      )}
    </form>
  )
}

function FolderCard(props: {
  group: FolderGroup
  index: number
  isOnly: boolean
  submitting: boolean
  onRename: (name: string) => void
  onRemove: () => void
  onAddFiles: (files: File[]) => void
  onRemoveFile: (fileId: string) => void
}) {
  const { group, index, isOnly, submitting, onRename, onRemove, onAddFiles, onRemoveFile } =
    props
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const showRemove = !isOnly && !submitting

  return (
    <div className="border border-slate-200 rounded-lg p-3 bg-white">
      <div className="flex items-center gap-2 mb-2">
        <Folder className="w-4 h-4 text-slate-400 flex-shrink-0" />
        <input
          type="text"
          value={group.name}
          onChange={(e) => onRename(e.target.value)}
          placeholder={index === 0 ? 'Folder name (optional, e.g. Project 1)' : `Folder ${index + 1} name`}
          disabled={submitting}
          maxLength={80}
          className="flex-1 px-2 py-1 text-sm border-0 border-b border-transparent focus:border-teal-500 focus:outline-none bg-transparent"
        />
        <span className="text-xs text-slate-400 flex-shrink-0">
          {group.files.length} file{group.files.length === 1 ? '' : 's'}
        </span>
        {showRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-red-500"
            title="Remove this folder and its files"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

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
        onDrop={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsDragging(false)
          if (e.dataTransfer.files) onAddFiles(Array.from(e.dataTransfer.files))
        }}
        onClick={() => !submitting && inputRef.current?.click()}
        className={`border-2 border-dashed rounded-md p-5 text-center cursor-pointer transition-all ${
          isDragging
            ? 'border-teal-500 bg-teal-50'
            : 'border-slate-300 hover:border-teal-500 hover:bg-slate-50'
        } ${submitting ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={(e) => {
            if (e.target.files) onAddFiles(Array.from(e.target.files))
            e.target.value = ''
          }}
          className="hidden"
          disabled={submitting}
        />
        <Upload className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
        <p className="text-sm text-slate-700">
          <span className="font-semibold text-teal-600">Click to upload</span>{' '}
          or drag and drop
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          PDF, images, Word documents
        </p>
      </div>

      {group.files.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {group.files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 p-2 bg-slate-50 rounded-md text-sm"
            >
              <StatusIcon status={f.status} />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-navy truncate">{f.file.name}</p>
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
                  onClick={() => onRemoveFile(f.id)}
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
  )
}

// ───────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────

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

async function readFunctionError(res: {
  error?: { message?: string; context?: Response } | null
  data?: { error?: string } | null
}): Promise<string | null> {
  if (res?.data?.error) return res.data.error
  const ctx = res?.error?.context
  if (ctx && typeof (ctx as Response).json === 'function') {
    try {
      const body = await (ctx as Response).clone().json()
      if (body?.error) return body.error
    } catch {
      try {
        const txt = await (ctx as Response).clone().text()
        if (txt) return txt.slice(0, 300)
      } catch {}
    }
  }
  return res?.error?.message || null
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
