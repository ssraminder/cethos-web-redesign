'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle, Loader2, AlertCircle, Phone, Mail, XCircle, ChevronDown } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

// ===========================================================================
// Types
// ===========================================================================

interface EmbeddedCertifiedQuoteFormProps {
  formLocation: string;
  defaultDocumentType?: string;
}

interface LocalFile {
  id: string;
  file: File;
  name: string;
  size: number;
  mimeType: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  storagePath?: string;
  error?: string;
}

interface LanguageOption {
  id: string;
  name: string;
  code: string;
}

// ===========================================================================
// Constants
// ===========================================================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png';
const PORTAL_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.cethos.com';

// ===========================================================================
// Helpers
// ===========================================================================

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function sanitizeFilename(filename: string): string {
  return filename
    .replace(/[()[\]]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
}

// ===========================================================================
// Component
// ===========================================================================

export function EmbeddedCertifiedQuoteForm({
  formLocation,
  defaultDocumentType,
}: EmbeddedCertifiedQuoteFormProps) {
  // File state
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Language state
  const [sourceLanguages, setSourceLanguages] = useState<LanguageOption[]>([]);
  const [targetLanguages, setTargetLanguages] = useState<LanguageOption[]>([]);
  const [sourceLanguageId, setSourceLanguageId] = useState('');
  const [targetLanguageId, setTargetLanguageId] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'creating' | 'redirecting' | 'error'>('idle');
  const [showFallback, setShowFallback] = useState(false);

  // Supabase client (stable ref)
  const supabaseRef = useRef(createBrowserSupabaseClient());
  const supabase = supabaseRef.current;

  // =========================================================================
  // Fetch Languages on Mount
  // =========================================================================

  useEffect(() => {
    let cancelled = false;

    async function fetchLanguages() {
      const [srcRes, tgtRes] = await Promise.all([
        supabase
          .from('languages')
          .select('id, name, code')
          .eq('is_active', true)
          .eq('is_source_available', true)
          .order('sort_order')
          .order('name'),
        supabase
          .from('languages')
          .select('id, name, code')
          .eq('is_active', true)
          .eq('is_target_available', true)
          .order('sort_order')
          .order('name'),
      ]);

      if (cancelled) return;

      if (srcRes.data) setSourceLanguages(srcRes.data);
      if (tgtRes.data) {
        setTargetLanguages(tgtRes.data);
        // Default target to English
        const english = tgtRes.data.find(
          (l) => l.code === 'en' || l.code === 'eng',
        );
        if (english) setTargetLanguageId(english.id);
      }
    }

    fetchLanguages();
    return () => { cancelled = true; };
  }, [supabase]);

  // =========================================================================
  // Error Helpers
  // =========================================================================

  const clearError = useCallback((key: string) => {
    setErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }, []);

  // =========================================================================
  // File Validation & Upload
  // =========================================================================

  const validateFile = useCallback((file: File): string | null => {
    if (!ACCEPTED_MIME_TYPES.includes(file.type)) {
      return `${file.name}: Unsupported file type. Please upload PDF, JPG, or PNG.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File exceeds 10 MB limit.`;
    }
    return null;
  }, []);

  /** Upload a single file to Supabase storage (temp path). */
  const uploadFile = useCallback(async (localFile: LocalFile) => {
    // Simulate progress since Supabase JS SDK doesn't emit progress events
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 5;
      if (progress >= 95) {
        clearInterval(interval);
        progress = 95;
      }
      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id && f.status === 'uploading'
            ? { ...f, progress: Math.min(Math.round(progress), 95) }
            : f,
        ),
      );
    }, 200);

    try {
      const ext = localFile.name.split('.').pop();
      const tempPath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from('quote-files')
        .upload(tempPath, localFile.file, {
          cacheControl: '3600',
          upsert: false,
        });

      clearInterval(interval);

      if (error) throw error;

      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, progress: 100, status: 'success' as const, storagePath: tempPath }
            : f,
        ),
      );
    } catch (err: any) {
      clearInterval(interval);
      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, status: 'error' as const, error: err?.message || 'Upload failed' }
            : f,
        ),
      );
    }
  }, [supabase]);

  const processFiles = useCallback((files: File[]) => {
    const newFiles: LocalFile[] = [];
    const fileErrors: string[] = [];

    for (const file of files) {
      // Skip duplicates
      if (localFiles.some((f) => f.name === file.name && f.size === file.size)) continue;

      const err = validateFile(file);
      if (err) {
        fileErrors.push(err);
        continue;
      }

      newFiles.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        name: file.name,
        size: file.size,
        mimeType: file.type,
        status: 'uploading',
        progress: 0,
      });
    }

    if (fileErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: fileErrors.join(' ') }));
    } else {
      clearError('files');
    }

    if (newFiles.length > 0) {
      setLocalFiles((prev) => [...prev, ...newFiles]);
      clearError('noFiles');
      // Upload each file immediately
      newFiles.forEach((lf) => uploadFile(lf));
    }
  }, [localFiles, validateFile, clearError, uploadFile]);

  /** Remove a file from the list (and from storage if already uploaded). */
  const removeFile = useCallback((fileId: string) => {
    const file = localFiles.find((f) => f.id === fileId);
    if (file?.storagePath) {
      supabase.storage.from('quote-files').remove([file.storagePath]).catch(() => {});
    }
    setLocalFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, [localFiles, supabase]);

  // =========================================================================
  // Drag & Drop Handlers
  // =========================================================================

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(Array.from(e.target.files));
      e.target.value = '';
    }
  }, [processFiles]);

  // =========================================================================
  // Language Handlers
  // =========================================================================

  const handleSourceChange = (id: string) => {
    setSourceLanguageId(id);
    clearError('sourceLanguage');
    if (id !== targetLanguageId) clearError('sameLang');
  };

  const handleTargetChange = (id: string) => {
    setTargetLanguageId(id);
    clearError('targetLanguage');
    if (id !== sourceLanguageId) clearError('sameLang');
  };

  // =========================================================================
  // Validation
  // =========================================================================

  const successFiles = localFiles.filter((f) => f.status === 'success');

  const canSubmit =
    successFiles.length > 0 &&
    !!sourceLanguageId &&
    !!targetLanguageId &&
    sourceLanguageId !== targetLanguageId &&
    !isSubmitting;

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (successFiles.length === 0) {
      next.noFiles = 'Please upload at least one document.';
    }
    if (!sourceLanguageId) {
      next.sourceLanguage = 'Please select a source language.';
    }
    if (!targetLanguageId) {
      next.targetLanguage = 'Please select a target language.';
    }
    if (sourceLanguageId && targetLanguageId && sourceLanguageId === targetLanguageId) {
      next.sameLang = 'Source and target languages must be different.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  // =========================================================================
  // Form Submission
  // =========================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus('creating');
    setErrors({});

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      // 1. Create draft quote with language selections
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          status: 'draft',
          source_language_id: sourceLanguageId,
          target_language_id: targetLanguageId,
          entry_point: 'website_embed',
          source_url: window.location.href,
          source_location: formLocation,
          subtotal: 0,
          certification_total: 0,
          rush_fee: 0,
          delivery_fee: 0,
          tax_amount: 0,
          total: 0,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        })
        .select('id, quote_number')
        .single();

      if (quoteError || !quote) {
        throw new Error(quoteError?.message || 'Failed to create quote');
      }

      const quoteId = quote.id;

      // 2. Move files to canonical path and create quote_files records
      for (const lf of successFiles) {
        const sanitized = sanitizeFilename(lf.name);
        const finalPath = `${quoteId}/${sanitized}`;

        // Re-upload to canonical {quoteId}/{filename} path
        const { error: uploadError } = await supabase.storage
          .from('quote-files')
          .upload(finalPath, lf.file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) {
          console.error(`Failed to upload ${lf.name}:`, uploadError);
          continue;
        }

        // Create quote_files record
        const { error: recordError } = await supabase
          .from('quote_files')
          .insert({
            quote_id: quoteId,
            original_filename: lf.name,
            storage_path: finalPath,
            file_size: lf.size,
            mime_type: lf.mimeType,
            upload_status: 'uploaded',
            ai_processing_status: 'pending',
          });

        if (recordError) {
          console.error(`Failed to create file record for ${lf.name}:`, recordError);
        }

        // Clean up temp upload
        if (lf.storagePath && lf.storagePath !== finalPath) {
          supabase.storage.from('quote-files').remove([lf.storagePath]).catch(() => {});
        }
      }

      // 3. Log status history
      try {
        await supabase.from('quote_status_history').insert({
          quote_id: quoteId,
          previous_status: null,
          new_status: 'draft',
          changed_by_type: 'system',
          change_reason: `Website embed quote created from ${formLocation || 'unknown'}`,
          metadata: {
            source_url: window.location.href,
            files_count: successFiles.length,
            entry_point: 'website_embed',
            default_document_type: defaultDocumentType || null,
          },
        });
      } catch (logError) {
        console.warn('Failed to log status history:', logError);
      }

      // 4. Fire AI processing (fire and forget)
      fetch(`${supabaseUrl}/functions/v1/process-quote-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ quoteId }),
      });

      // 5. Redirect to portal
      setSubmitStatus('redirecting');
      await new Promise((resolve) => setTimeout(resolve, 500));

      const continueUrl = `${PORTAL_BASE_URL}/quote?id=${quoteId}&step=2`;
      window.location.href = continueUrl;
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setErrors({
        submit: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      });
      setShowFallback(true);
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // Fallback UI
  // =========================================================================

  if (showFallback) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Unable to connect to our instant quote system</p>
              <p className="text-amber-700 text-sm mt-1">
                Please use our standard form below, or contact us directly.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">Contact us for a quote:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:5876000786"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
            >
              <Phone className="w-5 h-5" />
              (587) 600-0786
            </a>
            <a
              href={`mailto:info@cethos.com?subject=Certified Translation Quote Request - ${formLocation}`}
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0891B2] text-[#0891B2] rounded-lg font-semibold hover:bg-[#0891B2] hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email Us
            </a>
          </div>
          <button
            onClick={() => {
              setShowFallback(false);
              setLocalFiles([]);
              setErrors({});
              setSubmitStatus('idle');
            }}
            className="text-sm text-[#0891B2] hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      {/* Header */}
      <h3 className="text-xl font-bold text-[#0C2340] mb-1">
        Get Your Instant Quote
      </h3>
      <p className="text-gray-600 text-sm mb-6">
        Upload your documents and get an AI-powered price estimate in seconds
      </p>

      {/* General Error */}
      <AnimatePresence>
        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errors.submit}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── File Upload Zone ─────────────────────────────────────────────── */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !isSubmitting && fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer
          ${isDragging
            ? 'border-[#0891B2] bg-[#E0F2FE]'
            : 'border-slate-300 hover:border-[#0891B2] hover:bg-slate-50'
          }
          ${isSubmitting ? 'pointer-events-none opacity-50' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={isSubmitting}
        />
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-700 mb-1">
          <span className="font-semibold text-[#0891B2]">Click to upload</span>
          {' '}or drag and drop
        </p>
        <p className="text-sm text-slate-500">PDF, JPG, PNG (max 10MB each)</p>
      </div>

      {/* File-level validation errors */}
      {errors.files && <p className="text-sm text-red-600 mt-2">{errors.files}</p>}
      {errors.noFiles && <p className="text-sm text-red-600 mt-2">{errors.noFiles}</p>}

      {/* ── File List ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {localFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {localFiles.map((f) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {f.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-[#0891B2] animate-spin flex-shrink-0" />
                  )}
                  {f.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  )}
                  {f.status === 'error' && (
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0C2340] truncate">{f.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{formatFileSize(f.size)}</span>
                      {f.status === 'error' && f.error && (
                        <span className="text-xs text-red-500 truncate">{f.error}</span>
                      )}
                    </div>
                    {f.status === 'uploading' && (
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                        <div
                          className="bg-[#0891B2] h-1 rounded-full transition-all duration-200"
                          style={{ width: `${f.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => removeFile(f.id)}
                    className="p-1 hover:bg-slate-200 rounded transition-colors flex-shrink-0 ml-2"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Language Dropdowns ────────────────────────────────────────────── */}
      <div className="flex gap-3 mt-6">
        {/* Source Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Source Language <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={sourceLanguageId}
              onChange={(e) => handleSourceChange(e.target.value)}
              disabled={isSubmitting}
              className={`
                w-full px-3 py-2.5 border rounded-lg text-sm bg-white appearance-none pr-8 transition
                ${errors.sourceLanguage || errors.sameLang
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                  : 'border-slate-300 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10'
                }
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <option value="">Select…</option>
              {sourceLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {errors.sourceLanguage && (
            <p className="text-xs text-red-600 mt-1">{errors.sourceLanguage}</p>
          )}
        </div>

        {/* Target Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Target Language <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              value={targetLanguageId}
              onChange={(e) => handleTargetChange(e.target.value)}
              disabled={isSubmitting}
              className={`
                w-full px-3 py-2.5 border rounded-lg text-sm bg-white appearance-none pr-8 transition
                ${errors.targetLanguage || errors.sameLang
                  ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
                  : 'border-slate-300 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10'
                }
                ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <option value="">Select…</option>
              {targetLanguages.map((lang) => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
          {errors.targetLanguage && (
            <p className="text-xs text-red-600 mt-1">{errors.targetLanguage}</p>
          )}
        </div>
      </div>

      {/* Same-language error */}
      {errors.sameLang && (
        <p className="text-sm text-red-600 mt-2">{errors.sameLang}</p>
      )}

      {/* ── Submit Button ────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={!canSubmit}
        className={`
          w-full mt-6 py-4 rounded-lg font-semibold text-white
          transition-all flex items-center justify-center gap-2
          ${!canSubmit
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-[#0891B2] hover:bg-[#06B6D4]'
          }
        `}
      >
        {submitStatus === 'creating' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating your quote…
          </>
        )}
        {submitStatus === 'redirecting' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirecting…
          </>
        )}
        {(submitStatus === 'idle' || submitStatus === 'error') && (
          <>
            Get Instant Quote
            <span className="text-lg">→</span>
          </>
        )}
      </button>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          IRCC Accepted
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          Same-Day Available
        </span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
          From $65
        </span>
      </div>

      {/* ── Contact Alternative ──────────────────────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-600">
          Prefer to talk?{' '}
          <a href="tel:5876000786" className="text-[#0891B2] font-medium hover:underline">
            (587) 600-0786
          </a>
          {' '}or{' '}
          <a href="mailto:info@cethos.com" className="text-[#0891B2] font-medium hover:underline">
            info@cethos.com
          </a>
        </p>
      </div>
    </form>
  );
}

export default EmbeddedCertifiedQuoteForm;
