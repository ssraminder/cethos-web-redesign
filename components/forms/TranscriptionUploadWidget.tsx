'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

const ALLOWED_EXTS = ['mp3', 'wav', 'm4a', 'mp4', 'mov', 'webm', 'ogg', 'flac', 'aac'];
const MAX_FILE_SIZE = 500 * 1024 * 1024;

type Step = 'upload' | 'otp-send' | 'otp-verify' | 'processing' | 'result' | 'error';

interface PricingInfo {
  price_per_minute: number;
  ai_translation_price: number;
}

export default function TranscriptionUploadWidget() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [freeRemaining, setFreeRemaining] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(5);
  const [sourceLang, setSourceLang] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [deliveryFormats, setDeliveryFormats] = useState<string[]>(['txt']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobId, setJobId] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [otpExpiry, setOtpExpiry] = useState(0);
  const [languages, setLanguages] = useState<{ id: string; name: string; code: string }[]>([]);

  const fileRef = useRef<HTMLInputElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetch(`${SUPABASE_URL}/rest/v1/languages?select=id,name,code&order=name`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! },
    })
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLanguages(data.map((l: any) => ({ id: l.id, name: l.name, code: l.code })).filter((l: any) => l.code));
        }
      })
      .catch(() => {});
  }, []);

  const isFree = duration > 0 && duration <= 60;
  const pricePerMin = 0.15;
  const translationPrice = 0.25;
  const durationMinutes = Math.ceil(duration / 60);
  const transcriptionCost = isFree ? 0 : durationMinutes * pricePerMin;
  const translationCost = targetLang ? durationMinutes * translationPrice : 0;
  const totalCost = transcriptionCost + translationCost;

  const handleFileSelect = useCallback((f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!ALLOWED_EXTS.includes(ext)) {
      setError(`Unsupported format (.${ext}). Supported: ${ALLOWED_EXTS.join(', ')}`);
      return;
    }
    if (f.size > MAX_FILE_SIZE) {
      setError(`File too large (${(f.size / 1024 / 1024).toFixed(0)}MB). Max 500MB.`);
      return;
    }
    setError('');
    setFile(f);

    const url = URL.createObjectURL(f);
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      if (isFinite(audio.duration)) {
        setDuration(Math.round(audio.duration));
      }
      URL.revokeObjectURL(url);
    });
    audio.addEventListener('error', () => {
      URL.revokeObjectURL(url);
    });
    audioRef.current = audio;
  }, []);

  const sendOtp = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/transcription-send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await resp.json();
      if (!data.success) throw new Error(data.error);
      setOtpExpiry(data.expires_in_seconds ?? 300);
      setStep('otp-verify');
    } catch (e: any) {
      setError(e.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || otp.length < 6) {
      setError('Please enter the 6-digit code');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const resp = await fetch(`${SUPABASE_URL}/functions/v1/transcription-verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      const data = await resp.json();
      if (!data.success) throw new Error(data.error);
      setSessionToken(data.session_token);
      setFreeRemaining(data.free_remaining ?? 0);
      setDailyLimit(data.daily_limit ?? 5);
      await uploadFile(data.session_token);
    } catch (e: any) {
      setError(e.message || 'Verification failed');
      setLoading(false);
    }
  };

  const uploadFile = async (token: string) => {
    if (!file) return;
    setStep('processing');
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('session_token', token);
      formData.append('duration_seconds', String(duration));
      if (sourceLang) formData.append('source_language', sourceLang);
      if (targetLang) formData.append('translation_target', targetLang);
      formData.append('delivery_formats', deliveryFormats.join(','));

      const resp = await fetch(`${SUPABASE_URL}/functions/v1/transcription-upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await resp.json();

      if (!data.success) {
        if (data.free_remaining === 0) {
          setError(`Daily free limit reached (${dailyLimit}/day). Try again tomorrow or upload a paid file.`);
          setStep('error');
          setLoading(false);
          return;
        }
        throw new Error(data.error);
      }

      setJobId(data.job_id);

      if (data.requires_payment && data.checkout_url) {
        setCheckoutUrl(data.checkout_url);
        setStep('result');
      } else {
        setStep('result');
      }
    } catch (e: any) {
      setError(e.message || 'Upload failed');
      setStep('error');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep('upload');
    setFile(null);
    setDuration(0);
    setOtp('');
    setError('');
    setJobId('');
    setCheckoutUrl('');
    setSessionToken('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0C2340] to-[#1a3a5c] px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0891B2]/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Transcription</h3>
            <p className="text-gray-300 text-sm">Free for files up to 1 minute</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Step: Upload */}
        {step === 'upload' && (
          <div className="space-y-5">
            {/* Drop zone */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                file ? 'border-[#0891B2] bg-cyan-50/30' : 'border-gray-200 hover:border-[#0891B2]/50'
              }`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) handleFileSelect(f);
              }}
            >
              <input
                ref={fileRef}
                type="file"
                className="hidden"
                accept={ALLOWED_EXTS.map((e) => `.${e}`).join(',')}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileSelect(f);
                }}
              />
              {file ? (
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-900 truncate">{file.name}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {(file.size / 1024 / 1024).toFixed(1)} MB
                    {duration > 0 && ` · ${Math.floor(duration / 60)}m ${duration % 60}s`}
                  </p>
                  <button
                    onClick={(e) => { e.stopPropagation(); setFile(null); setDuration(0); }}
                    className="text-xs text-red-500 hover:text-red-700 mt-2"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Drop your audio/video file here</p>
                  <p className="text-sm text-gray-400 mt-1">MP3, WAV, M4A, MP4, MOV, WEBM, OGG, FLAC · Max 500MB</p>
                </div>
              )}
            </div>

            {/* Duration warning for manual entry */}
            {file && duration === 0 && (
              <div className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <svg className="w-4 h-4 text-yellow-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-yellow-800">Could not detect duration automatically.</p>
                  <input
                    type="number"
                    placeholder="Enter duration in seconds"
                    className="mt-2 w-full px-3 py-1.5 border border-yellow-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#0891B2]"
                    onChange={(e) => setDuration(parseInt(e.target.value, 10) || 0)}
                  />
                </div>
              </div>
            )}

            {/* Options */}
            {file && duration > 0 && (
              <>
                {/* Language */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Source Language</label>
                    <select
                      value={sourceLang}
                      onChange={(e) => setSourceLang(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                    >
                      <option value="">Auto-detect</option>
                      {languages.map((l) => (
                        <option key={l.id} value={l.code}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Translate to <span className="text-gray-400">(optional)</span>
                    </label>
                    <select
                      value={targetLang}
                      onChange={(e) => setTargetLang(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                    >
                      <option value="">No translation</option>
                      {languages.map((l) => (
                        <option key={l.id} value={l.code}>{l.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Delivery formats */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-2">Delivery Formats</label>
                  <div className="flex gap-3">
                    {['txt', 'docx', 'pdf'].map((fmt) => (
                      <label key={fmt} className="flex items-center gap-1.5 text-sm cursor-pointer">
                        <input
                          type="checkbox"
                          checked={deliveryFormats.includes(fmt)}
                          onChange={(e) => {
                            if (e.target.checked) setDeliveryFormats([...deliveryFormats, fmt]);
                            else setDeliveryFormats(deliveryFormats.filter((f) => f !== fmt));
                          }}
                          className="rounded text-[#0891B2] focus:ring-[#0891B2]"
                        />
                        {fmt.toUpperCase()}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pricing summary */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{Math.floor(duration / 60)}m {duration % 60}s ({durationMinutes} min billed)</span>
                  </div>
                  {isFree ? (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Transcription</span>
                      <span className="font-bold text-green-600">FREE</span>
                    </div>
                  ) : (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transcription ({durationMinutes} min × $0.15)</span>
                      <span className="font-medium">${transcriptionCost.toFixed(2)} CAD</span>
                    </div>
                  )}
                  {targetLang && (
                    <div className="flex justify-between mt-1">
                      <span className="text-gray-600">AI Translation ({durationMinutes} min × $0.25)</span>
                      <span className="font-medium">${translationCost.toFixed(2)} CAD</span>
                    </div>
                  )}
                  {totalCost > 0 && (
                    <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-bold text-[#0C2340]">${totalCost.toFixed(2)} CAD</span>
                    </div>
                  )}
                </div>

                {/* Email + submit */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Email Address</label>
                  <p className="text-xs text-gray-400 mb-2">We&apos;ll send a verification code and deliver your transcript here</p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                  />
                </div>

                <button
                  onClick={() => {
                    setStep('otp-send');
                    sendOtp();
                  }}
                  disabled={!email || !file || duration <= 0 || loading}
                  className="w-full py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#0891B2]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {totalCost > 0 ? `Continue — $${totalCost.toFixed(2)} CAD` : 'Transcribe for Free'}
                </button>
              </>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}
          </div>
        )}

        {/* Step: OTP Send (loading) */}
        {step === 'otp-send' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0891B2] mx-auto mb-4" />
            <p className="text-gray-600">Sending verification code to <strong>{email}</strong>...</p>
          </div>
        )}

        {/* Step: OTP Verify */}
        {step === 'otp-verify' && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-[#0891B2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Check your email</h4>
              <p className="text-sm text-gray-500 mt-1">We sent a 6-digit code to <strong>{email}</strong></p>
            </div>

            <div>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="000000"
                className="w-full text-center text-2xl tracking-[0.5em] font-mono px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0891B2]"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              onClick={verifyOtp}
              disabled={otp.length < 6 || loading}
              className="w-full py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#0891B2]/90 transition-colors disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Upload'}
            </button>

            <div className="flex items-center justify-between text-xs text-gray-400">
              <button onClick={sendOtp} className="hover:text-[#0891B2]">Resend code</button>
              <button onClick={reset} className="hover:text-gray-600">Start over</button>
            </div>
          </div>
        )}

        {/* Step: Processing */}
        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0891B2] mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Uploading your file...</p>
            <p className="text-sm text-gray-500 mt-2">{file?.name}</p>
          </div>
        )}

        {/* Step: Result */}
        {step === 'result' && (
          <div className="space-y-5">
            {checkoutUrl ? (
              <>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Payment Required</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Your file has been uploaded. Complete payment to start transcription.
                  </p>
                  <p className="text-2xl font-bold text-[#0C2340] mt-3">${totalCost.toFixed(2)} CAD</p>
                </div>
                <a
                  href={checkoutUrl}
                  className="block w-full py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#0891B2]/90 transition-colors text-center"
                >
                  Pay with Stripe
                </a>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Transcription Started!</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Your file is being transcribed. We&apos;ll email the results to <strong>{email}</strong> when ready.
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Typically takes 1-3 minutes. Check your spam folder if you don&apos;t see it.
                  </p>
                </div>
              </>
            )}

            <button
              onClick={reset}
              className="w-full py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              Transcribe Another File
            </button>
          </div>
        )}

        {/* Step: Error */}
        {step === 'error' && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 text-lg">Something went wrong</h4>
              <p className="text-sm text-red-600 mt-2">{error}</p>
            </div>
            <button
              onClick={reset}
              className="w-full py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#0891B2]/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <span>Powered by Cethos AI</span>
        <span>Files auto-deleted after {isFree ? '7' : '30'} days</span>
      </div>
    </div>
  );
}
