'use client'

import { useEffect, useRef, useState } from 'react'
import { UploadCloud, Video, Circle, Square, RotateCcw } from 'lucide-react'

const MAX_VIDEO_BYTES = 50 * 1024 * 1024 // 50 MB
const MAX_RECORD_SECONDS = 120 // hard stop at 2 minutes
const VIDEO_TYPES = ['video/mp4', 'video/quicktime', 'video/webm']

interface Props {
  /** Reports the chosen video File (or null when cleared). */
  onSelect: (file: File | null) => void
}

function pickMime(): string {
  if (typeof MediaRecorder === 'undefined') return ''
  const candidates = [
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
    'video/mp4',
  ]
  return candidates.find((c) => MediaRecorder.isTypeSupported(c)) || ''
}

function humanSize(bytes: number): string {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export default function VideoField({ onSelect }: Props) {
  const [mode, setMode] = useState<'upload' | 'record'>('upload')
  const [error, setError] = useState<string | null>(null)
  const [chosen, setChosen] = useState<{ name: string; size: number } | null>(null)

  // Recording state
  const canRecord =
    typeof navigator !== 'undefined' &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== 'undefined'
  const [recState, setRecState] = useState<'idle' | 'previewing' | 'recording' | 'recorded'>('idle')
  const [seconds, setSeconds] = useState(0)
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null)

  const liveRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  function stopStream() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
  }

  // Cleanup on unmount.
  useEffect(() => () => {
    stopStream()
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
  }, [recordedUrl])

  function validateAndSelect(file: File) {
    const okType = VIDEO_TYPES.includes(file.type) || /\.(mp4|mov|webm)$/i.test(file.name)
    if (!okType) {
      setError('Video must be MP4, MOV, or WEBM.')
      onSelect(null)
      setChosen(null)
      return false
    }
    if (file.size > MAX_VIDEO_BYTES) {
      setError('Video must be 50 MB or smaller. Keep it short (~1 minute).')
      onSelect(null)
      setChosen(null)
      return false
    }
    setError(null)
    setChosen({ name: file.name, size: file.size })
    onSelect(file)
    return true
  }

  function onUploadChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) {
      onSelect(null)
      setChosen(null)
      return
    }
    if (!validateAndSelect(f)) e.target.value = ''
  }

  async function startCamera() {
    setError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      })
      streamRef.current = stream
      if (liveRef.current) {
        liveRef.current.srcObject = stream
        liveRef.current.muted = true
        await liveRef.current.play().catch(() => {})
      }
      setRecState('previewing')
    } catch {
      setError('Could not access your camera/microphone. Check browser permissions, or upload a file instead.')
    }
  }

  function startRecording() {
    const stream = streamRef.current
    if (!stream) return
    const mimeType = pickMime()
    chunksRef.current = []
    const rec = new MediaRecorder(stream, mimeType ? { mimeType } : undefined)
    recorderRef.current = rec
    rec.ondataavailable = (ev) => {
      if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data)
    }
    rec.onstop = () => {
      const type = mimeType.startsWith('video/mp4') ? 'video/mp4' : 'video/webm'
      const ext = type === 'video/mp4' ? 'mp4' : 'webm'
      const blob = new Blob(chunksRef.current, { type })
      const file = new File([blob], `intro-recording.${ext}`, { type })
      const url = URL.createObjectURL(blob)
      setRecordedUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
      stopStream()
      setRecState('recorded')
      validateAndSelect(file)
    }
    rec.start()
    setSeconds(0)
    setRecState('recording')
    timerRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= MAX_RECORD_SECONDS) stopRecording()
        return s + 1
      })
    }, 1000)
  }

  function stopRecording() {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    recorderRef.current?.state !== 'inactive' && recorderRef.current?.stop()
  }

  function reRecord() {
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedUrl(null)
    setChosen(null)
    onSelect(null)
    setRecState('idle')
  }

  function switchMode(next: 'upload' | 'record') {
    if (next === mode) return
    stopStream()
    if (recordedUrl) URL.revokeObjectURL(recordedUrl)
    setRecordedUrl(null)
    setRecState('idle')
    setChosen(null)
    setError(null)
    onSelect(null)
    setMode(next)
  }

  const tab = (m: 'upload' | 'record', label: string) => (
    <button
      type="button"
      onClick={() => switchMode(m)}
      className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
        mode === m ? 'bg-white text-[#0C2340] shadow-sm' : 'text-[#4B5563] hover:text-[#0C2340]'
      }`}
    >
      {label}
    </button>
  )

  const mm = String(Math.floor(seconds / 60)).padStart(1, '0')
  const ss = String(seconds % 60).padStart(2, '0')

  return (
    <div>
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg mb-3 max-w-xs">
        {tab('upload', 'Upload a file')}
        {canRecord && tab('record', 'Record now')}
      </div>

      {mode === 'upload' && (
        <>
          <label
            htmlFor="video"
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-dashed border-gray-300 cursor-pointer hover:border-[#0891B2] transition-colors"
          >
            <UploadCloud className="w-5 h-5 text-[#0891B2]" />
            <span className="text-sm text-[#4B5563] truncate">
              {chosen?.name || 'Upload a short intro video'}
            </span>
          </label>
          <input
            id="video"
            type="file"
            accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
            onChange={onUploadChange}
            className="sr-only"
          />
        </>
      )}

      {mode === 'record' && (
        <div className="rounded-lg border border-gray-200 p-3">
          {recState !== 'recorded' && (
            <video
              ref={liveRef}
              playsInline
              muted
              className="w-full max-h-64 rounded-md bg-black/90 object-contain"
            />
          )}
          {recState === 'recorded' && recordedUrl && (
            <video src={recordedUrl} controls playsInline className="w-full max-h-64 rounded-md bg-black/90 object-contain" />
          )}

          <div className="flex items-center gap-3 mt-3">
            {recState === 'idle' && (
              <button type="button" onClick={startCamera} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#0C2340] text-white hover:bg-[#1a3a5c]">
                <Video className="w-4 h-4" /> Start camera
              </button>
            )}
            {recState === 'previewing' && (
              <button type="button" onClick={startRecording} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-red-600 text-white hover:bg-red-700">
                <Circle className="w-4 h-4 fill-current" /> Record
              </button>
            )}
            {recState === 'recording' && (
              <>
                <button type="button" onClick={stopRecording} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-[#0C2340] text-white hover:bg-[#1a3a5c]">
                  <Square className="w-4 h-4 fill-current" /> Stop
                </button>
                <span className="inline-flex items-center gap-1.5 text-sm text-red-600 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> {mm}:{ss} / 2:00
                </span>
              </>
            )}
            {recState === 'recorded' && (
              <button type="button" onClick={reRecord} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg border border-gray-300 text-[#0C2340] hover:bg-gray-50">
                <RotateCcw className="w-4 h-4" /> Re-record
              </button>
            )}
          </div>
        </div>
      )}

      {error ? (
        <p className="text-sm text-red-600 mt-1.5">{error}</p>
      ) : chosen ? (
        <p className="text-xs text-[#6B7280] mt-1.5">Selected: {chosen.name} · {humanSize(chosen.size)}</p>
      ) : (
        <p className="text-xs text-[#6B7280] mt-1.5">Record or upload a ~1-minute intro telling us about yourself. Max 50 MB.</p>
      )}
    </div>
  )
}
