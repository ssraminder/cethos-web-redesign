'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle, Loader2, AlertCircle, Phone, Mail } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase';

// ===========================================================================
// Types
// ===========================================================================

interface EmbeddedCertifiedQuoteFormProps {
  formLocation: string;
  defaultDocumentType?: string;
}

interface UploadedFile {
  file: File;
  id: string;
  storagePath?: string;
  uploadStatus: 'pending' | 'uploading' | 'uploaded' | 'error';
  errorMessage?: string;
}

// ===========================================================================
// Constants
// ===========================================================================

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const PORTAL_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.cethos.com';

// ===========================================================================
// Component
// ===========================================================================

export function EmbeddedCertifiedQuoteForm({
  formLocation,
  defaultDocumentType
}: EmbeddedCertifiedQuoteFormProps) {
  // State
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'uploading' | 'creating' | 'redirecting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);

  // =========================================================================
  // File Handling
  // =========================================================================

  const handleFileSelect = useCallback((selectedFiles: FileList | File[]) => {
    const newFiles: UploadedFile[] = [];
    const errors: string[] = [];

    Array.from(selectedFiles).forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds 10MB limit`);
      } else if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        errors.push(`${file.name} is not a supported file type`);
      } else {
        // Check for duplicates
        const isDuplicate = files.some(f =>
          f.file.name === file.name && f.file.size === file.size
        );
        if (!isDuplicate) {
          newFiles.push({
            file,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            uploadStatus: 'pending',
          });
        }
      }
    });

    if (errors.length > 0) {
      setErrorMessage(errors.join('. '));
      setTimeout(() => setErrorMessage(null), 5000);
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
    }
  }, [files]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  // =========================================================================
  // Drag & Drop Handlers
  // =========================================================================

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
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
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

  // =========================================================================
  // Form Submission
  // =========================================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (files.length === 0) {
      setErrorMessage('Please upload at least one document');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('uploading');
    setErrorMessage(null);

    try {
      // Supabase client
      const supabase = createBrowserSupabaseClient();
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

      // Step 1: Upload files to Supabase Storage
      const uploadedFiles: Array<{
        storagePath: string;
        originalFilename: string;
        mimeType: string;
        fileSize: number;
      }> = [];

      for (let i = 0; i < files.length; i++) {
        const fileData = files[i];

        // Update status
        setFiles(prev => prev.map(f =>
          f.id === fileData.id
            ? { ...f, uploadStatus: 'uploading' as const }
            : f
        ));

        // Generate unique path
        const timestamp = Date.now();
        const safeFilename = fileData.file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `uploads/${timestamp}-${safeFilename}`;

        // Upload to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from('quote-files')
          .upload(storagePath, fileData.file, {
            contentType: fileData.file.type,
            cacheControl: '3600',
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          setFiles(prev => prev.map(f =>
            f.id === fileData.id
              ? { ...f, uploadStatus: 'error' as const, errorMessage: uploadError.message }
              : f
          ));
          throw new Error(`Failed to upload ${fileData.file.name}`);
        }

        // Mark as uploaded
        setFiles(prev => prev.map(f =>
          f.id === fileData.id
            ? { ...f, uploadStatus: 'uploaded' as const, storagePath }
            : f
        ));

        uploadedFiles.push({
          storagePath,
          originalFilename: fileData.file.name,
          mimeType: fileData.file.type,
          fileSize: fileData.file.size,
        });
      }

      // Step 2: Call create-website-draft Edge Function
      setSubmitStatus('creating');

      const response = await fetch(
        `${supabaseUrl}/functions/v1/create-website-draft`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`,
          },
          body: JSON.stringify({
            files: uploadedFiles,
            sourceUrl: window.location.href,
            formLocation,
            defaultDocumentType,
            processWithAI: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create quote');
      }

      const result = await response.json();

      if (!result.success || !result.continueUrl) {
        throw new Error('Invalid response from server');
      }

      // Step 3: Redirect to portal
      setSubmitStatus('redirecting');

      // Small delay for UX
      await new Promise(resolve => setTimeout(resolve, 500));

      window.location.href = result.continueUrl;

    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      );

      // Show fallback form option
      setShowFallback(true);
      setIsSubmitting(false);
    }
  };

  // =========================================================================
  // Fallback to Original Form
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

        {/* Contact options */}
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
              setFiles([]);
              setErrorMessage(null);
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

      {/* Error Message */}
      <AnimatePresence>
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2"
          >
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{errorMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* File Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
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
          type="file"
          id="file-upload"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
          className="hidden"
          disabled={isSubmitting}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-700 mb-1">
            <span className="font-semibold text-[#0891B2]">Click to upload</span>
            {' '}or drag and drop
          </p>
          <p className="text-sm text-slate-500">PDF, JPG, PNG (max 10MB each)</p>
        </label>
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((fileData) => (
              <motion.div
                key={fileData.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {fileData.uploadStatus === 'uploading' ? (
                    <Loader2 className="w-5 h-5 text-[#0891B2] animate-spin flex-shrink-0" />
                  ) : fileData.uploadStatus === 'uploaded' ? (
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  ) : fileData.uploadStatus === 'error' ? (
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  ) : (
                    <FileText className="w-5 h-5 text-slate-500 flex-shrink-0" />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#0C2340] truncate">
                      {fileData.file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(fileData.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!isSubmitting && (
                  <button
                    type="button"
                    onClick={() => removeFile(fileData.id)}
                    className="p-1 hover:bg-slate-200 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={files.length === 0 || isSubmitting}
        className={`
          w-full mt-6 py-4 rounded-lg font-semibold text-white
          transition-all flex items-center justify-center gap-2
          ${files.length === 0 || isSubmitting
            ? 'bg-slate-300 cursor-not-allowed'
            : 'bg-[#0891B2] hover:bg-[#06B6D4]'
          }
        `}
      >
        {submitStatus === 'uploading' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Uploading documents...
          </>
        )}
        {submitStatus === 'creating' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Creating your quote...
          </>
        )}
        {submitStatus === 'redirecting' && (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Redirecting...
          </>
        )}
        {(submitStatus === 'idle' || submitStatus === 'error') && (
          <>
            Get Instant Quote
            <span className="text-lg">→</span>
          </>
        )}
      </button>

      {/* Trust Badges */}
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

      {/* Contact Alternative */}
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
