'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, CheckCircle, Loader2, AlertCircle, Phone, Mail, XCircle, ChevronDown, ChevronRight, Search, Paperclip } from 'lucide-react';
import { createBrowserSupabaseClient } from '@/lib/supabase';
import { compressPdfIfNeeded, needsCompression } from '@/lib/compressPdf';
import { combineImagesToPdf } from '@/lib/combineImagesToPdf';
import { convertDocxToPdf } from '@/lib/convertDocxToPdf';

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
  status: 'uploading' | 'converting' | 'success' | 'error';
  progress: number;
  storagePath?: string;
  error?: string;
  isImage: boolean;
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
const ACCEPTED_MIME_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png,.docx';
const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png'];
const DOCX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const PORTAL_BASE_URL = process.env.NEXT_PUBLIC_PORTAL_URL || 'https://portal.cethos.com';

// Reference files allow DOCX as well
const REF_ACCEPTED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const REF_ACCEPTED_EXTENSIONS = '.pdf,.jpg,.jpeg,.png,.docx';
const REF_MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

// English language codes to match against (covers all variants/locales)
const ENGLISH_CODES = ['en', 'eng', 'en-us', 'en-gb', 'en-ca', 'en-au', 'en-nz', 'en-ie', 'en-za'];

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

function isEnglishCode(code: string): boolean {
  return ENGLISH_CODES.includes(code.toLowerCase());
}

// ===========================================================================
// SearchableDropdown Component
// ===========================================================================

interface SearchableDropdownProps {
  label: string;
  required?: boolean;
  options: LanguageOption[];
  value: string;
  onChange: (id: string, name: string) => void;
  placeholder?: string;
  disabled?: boolean;
  hasError?: boolean;
  errorMessage?: string;
}

function SearchableDropdown({
  label,
  required,
  options,
  value,
  onChange,
  placeholder = 'Search…',
  disabled = false,
  hasError = false,
  errorMessage,
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.id === value);

  const filtered = useMemo(() => {
    if (!search.trim()) return options;
    const q = search.toLowerCase();
    return options.filter((o) => o.name.toLowerCase().includes(q));
  }, [options, search]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Scroll list to top when opening
  useEffect(() => {
    if (isOpen && listRef.current) listRef.current.scrollTop = 0;
  }, [isOpen]);

  const handleOpen = () => {
    if (disabled) return;
    setIsOpen(true);
    setSearch('');
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSelect = (opt: LanguageOption) => {
    onChange(opt.id, opt.name);
    setIsOpen(false);
    setSearch('');
  };

  const showSearch = options.length > 5;

  return (
    <div className="flex-1 relative" ref={containerRef}>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Trigger button — 16px font prevents iOS zoom */}
      <button
        type="button"
        onClick={handleOpen}
        disabled={disabled}
        className={`
          w-full px-3 py-2.5 border rounded-lg bg-white flex items-center justify-between gap-2 transition
          text-[16px] sm:text-sm leading-normal
          ${hasError
            ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10'
            : 'border-slate-300 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span className={`truncate ${selectedOption ? 'text-slate-900' : 'text-slate-400'}`}>
          {selectedOption ? selectedOption.name : 'Select…'}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-1 left-0 right-0 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Search input */}
            {showSearch && (
              <div className="p-2 border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={placeholder}
                    className="w-full pl-8 pr-3 py-2 text-[16px] sm:text-sm border border-slate-200 rounded-md bg-slate-50 focus:outline-none focus:border-[#0891B2] focus:ring-1 focus:ring-[#0891B2]/20"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                </div>
              </div>
            )}

            {/* Options list */}
            <div ref={listRef} className="max-h-[240px] overflow-y-auto overscroll-contain">
              {filtered.length === 0 ? (
                <div className="px-3 py-4 text-sm text-slate-400 text-center">
                  No languages found
                </div>
              ) : (
                filtered.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelect(opt)}
                    className={`
                      w-full text-left px-3 py-2.5 text-[16px] sm:text-sm transition-colors
                      ${opt.id === value
                        ? 'bg-[#E0F2FE] text-[#0891B2] font-medium'
                        : 'text-slate-700 hover:bg-slate-50 active:bg-slate-100'
                      }
                    `}
                  >
                    {opt.name}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {errorMessage && (
        <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}

// ===========================================================================
// Main Component
// ===========================================================================

export function EmbeddedCertifiedQuoteForm({
  formLocation,
  defaultDocumentType,
}: EmbeddedCertifiedQuoteFormProps) {
  // File state
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reference file state
  const [refFiles, setRefFiles] = useState<LocalFile[]>([]);
  const [isRefDragging, setIsRefDragging] = useState(false);
  const refFileInputRef = useRef<HTMLInputElement>(null);
  const [refSectionOpen, setRefSectionOpen] = useState(false);

  // Language state
  const [allSourceLanguages, setAllSourceLanguages] = useState<LanguageOption[]>([]);
  const [allTargetLanguages, setAllTargetLanguages] = useState<LanguageOption[]>([]);
  const [sourceLanguageId, setSourceLanguageId] = useState('');
  const [sourceLanguageName, setSourceLanguageName] = useState('');
  const [targetLanguageId, setTargetLanguageId] = useState('');
  const [targetLanguageName, setTargetLanguageName] = useState('');
  const [otherTargetLanguage, setOtherTargetLanguage] = useState('');

  // UI state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'creating' | 'redirecting' | 'error'>('idle');
  const [showFallback, setShowFallback] = useState(false);

  // Supabase client (stable ref)
  const supabaseRef = useRef(createBrowserSupabaseClient());
  const supabase = supabaseRef.current;

  // =========================================================================
  // Derived: Is source English?
  // =========================================================================

  const sourceIsEnglish = useMemo(() => {
    if (!sourceLanguageId) return false;
    const selected = allSourceLanguages.find((l) => l.id === sourceLanguageId);
    return selected ? isEnglishCode(selected.code) : false;
  }, [sourceLanguageId, allSourceLanguages]);

  const isOtherSelected = targetLanguageId === '__other__';

  // =========================================================================
  // Derived: Filtered target languages
  // =========================================================================

  const filteredTargetLanguages = useMemo(() => {
    if (!sourceLanguageId) return [];

    if (sourceIsEnglish) {
      // Source is English → show ALL targets except English variants
      return allTargetLanguages.filter((l) => !isEnglishCode(l.code));
    } else {
      // Source is NOT English → show English, French, and "Other"
      const english = allTargetLanguages.find((l) => isEnglishCode(l.code));
      const french = allTargetLanguages.find(
        (l) => ['fr', 'fra', 'fre'].includes(l.code.toLowerCase()),
      );

      const options: LanguageOption[] = [];
      if (english) options.push(english);
      if (french) options.push(french);
      options.push({ id: '__other__', name: 'Other (please specify)', code: 'other' });

      return options;
    }
  }, [sourceLanguageId, sourceIsEnglish, allTargetLanguages]);

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
      if (srcRes.data) setAllSourceLanguages(srcRes.data);
      if (tgtRes.data) setAllTargetLanguages(tgtRes.data);
    }

    fetchLanguages();
    return () => { cancelled = true; };
  }, [supabase]);

  // =========================================================================
  // Reset target when source changes
  // =========================================================================

  useEffect(() => {
    if (!sourceLanguageId) {
      setTargetLanguageId('');
      setTargetLanguageName('');
      setOtherTargetLanguage('');
      return;
    }

    if (sourceIsEnglish) {
      const currentTarget = allTargetLanguages.find((l) => l.id === targetLanguageId);
      if (!currentTarget || isEnglishCode(currentTarget.code) || targetLanguageId === '__other__') {
        setTargetLanguageId('');
        setTargetLanguageName('');
        setOtherTargetLanguage('');
      }
    } else {
      const english = allTargetLanguages.find((l) => isEnglishCode(l.code));
      if (english) {
        setTargetLanguageId(english.id);
        setTargetLanguageName(english.name);
      } else {
        setTargetLanguageId('');
        setTargetLanguageName('');
      }
      setOtherTargetLanguage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceLanguageId, sourceIsEnglish]);

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
      return `${file.name}: Unsupported file type. Please upload PDF, JPG, PNG, or DOCX.`;
    }
    if (file.size > MAX_FILE_SIZE) {
      return `${file.name}: File exceeds 10 MB limit.`;
    }
    return null;
  }, []);

  const uploadFile = useCallback(async (localFile: LocalFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 5;
      if (progress >= 95) { clearInterval(interval); progress = 95; }
      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id && f.status === 'uploading'
            ? { ...f, progress: Math.min(Math.round(progress), 95) }
            : f,
        ),
      );
    }, 200);

    try {
      // Compress large PDFs before upload
      let fileToUpload = localFile.file;
      if (needsCompression(localFile.file)) {
        fileToUpload = await compressPdfIfNeeded(localFile.file);
        if (fileToUpload !== localFile.file) {
          // Update state with compressed file and size
          setLocalFiles((prev) =>
            prev.map((f) =>
              f.id === localFile.id
                ? { ...f, file: fileToUpload, size: fileToUpload.size }
                : f,
            ),
          );
        }
      }

      const ext = localFile.name.split('.').pop();
      const tempPath = `uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error } = await supabase.storage
        .from('quote-files')
        .upload(tempPath, fileToUpload, { cacheControl: '3600', upsert: false });

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

  const convertAndUploadDocx = useCallback(async (localFile: LocalFile) => {
    try {
      const pdfFile = await convertDocxToPdf(localFile.file);
      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, file: pdfFile, name: pdfFile.name, size: pdfFile.size, mimeType: 'application/pdf', status: 'uploading' as const, isImage: false }
            : f,
        ),
      );
      // Now upload the converted PDF
      uploadFile({ ...localFile, file: pdfFile, name: pdfFile.name, size: pdfFile.size, mimeType: 'application/pdf', isImage: false });
    } catch (err: any) {
      setLocalFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, status: 'error' as const, error: err?.message || 'DOCX conversion failed' }
            : f,
        ),
      );
    }
  }, [uploadFile]);

  const processFiles = useCallback((files: File[]) => {
    const newFiles: LocalFile[] = [];
    const fileErrors: string[] = [];

    for (const file of files) {
      if (localFiles.some((f) => f.name === file.name && f.size === file.size)) continue;
      const err = validateFile(file);
      if (err) { fileErrors.push(err); continue; }

      const isImage = IMAGE_MIME_TYPES.includes(file.type);
      const isDocx = file.type === DOCX_MIME_TYPE;

      newFiles.push({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file, name: file.name, size: file.size, mimeType: file.type,
        // Images: held in state only (combined into PDF at submit time)
        // DOCX: will be converted server-side then uploaded
        // PDF: uploaded immediately
        status: isImage ? 'success' : isDocx ? 'converting' : 'uploading',
        progress: isImage ? 100 : 0,
        isImage,
      });
    }

    if (fileErrors.length > 0) {
      setErrors((prev) => ({ ...prev, files: fileErrors.join(' ') }));
    } else { clearError('files'); }

    if (newFiles.length > 0) {
      setLocalFiles((prev) => [...prev, ...newFiles]);
      clearError('noFiles');
      newFiles.forEach((lf) => {
        if (lf.isImage) return; // Images stay client-side, combined at submit
        if (lf.mimeType === DOCX_MIME_TYPE) {
          convertAndUploadDocx(lf);
        } else {
          uploadFile(lf);
        }
      });
    }
  }, [localFiles, validateFile, clearError, uploadFile, convertAndUploadDocx]);

  const removeFile = useCallback((fileId: string) => {
    const file = localFiles.find((f) => f.id === fileId);
    // Only clean up storage for files that were actually uploaded (not images held client-side)
    if (file?.storagePath && !file.isImage) {
      supabase.storage.from('quote-files').remove([file.storagePath]).catch(() => {});
    }
    setLocalFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, [localFiles, supabase]);

  // =========================================================================
  // Reference File Validation & Upload
  // =========================================================================

  const validateRefFile = useCallback((file: File): string | null => {
    if (!REF_ACCEPTED_MIME_TYPES.includes(file.type)) {
      return `${file.name}: Unsupported file type. Please upload PDF, JPG, PNG, or DOCX.`;
    }
    if (file.size > REF_MAX_FILE_SIZE) {
      return `${file.name}: File exceeds 20 MB limit.`;
    }
    return null;
  }, []);

  const uploadRefFile = useCallback(async (localFile: LocalFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 25 + 5;
      if (progress >= 95) { clearInterval(interval); progress = 95; }
      setRefFiles((prev) =>
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
        .from('quote-reference-files')
        .upload(tempPath, localFile.file, { cacheControl: '3600', upsert: false });

      clearInterval(interval);
      if (error) throw error;

      setRefFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, progress: 100, status: 'success' as const, storagePath: tempPath }
            : f,
        ),
      );
    } catch (err: any) {
      clearInterval(interval);
      setRefFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, status: 'error' as const, error: err?.message || 'Upload failed' }
            : f,
        ),
      );
    }
  }, [supabase]);

  const convertAndUploadRefDocx = useCallback(async (localFile: LocalFile) => {
    try {
      const pdfFile = await convertDocxToPdf(localFile.file);
      setRefFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, file: pdfFile, name: pdfFile.name, size: pdfFile.size, mimeType: 'application/pdf', status: 'uploading' as const, isImage: false }
            : f,
        ),
      );
      uploadRefFile({ ...localFile, file: pdfFile, name: pdfFile.name, size: pdfFile.size, mimeType: 'application/pdf', isImage: false });
    } catch (err: any) {
      setRefFiles((prev) =>
        prev.map((f) =>
          f.id === localFile.id
            ? { ...f, status: 'error' as const, error: err?.message || 'DOCX conversion failed' }
            : f,
        ),
      );
    }
  }, [uploadRefFile]);

  const processRefFiles = useCallback((files: File[]) => {
    const newFiles: LocalFile[] = [];
    const fileErrors: string[] = [];

    for (const file of files) {
      if (refFiles.some((f) => f.name === file.name && f.size === file.size)) continue;
      const err = validateRefFile(file);
      if (err) { fileErrors.push(err); continue; }

      const isImage = IMAGE_MIME_TYPES.includes(file.type);
      const isDocx = file.type === DOCX_MIME_TYPE;

      newFiles.push({
        id: `ref-${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file, name: file.name, size: file.size, mimeType: file.type,
        status: isImage ? 'success' : isDocx ? 'converting' : 'uploading',
        progress: isImage ? 100 : 0,
        isImage,
      });
    }

    if (fileErrors.length > 0) {
      setErrors((prev) => ({ ...prev, refFiles: fileErrors.join(' ') }));
    } else { clearError('refFiles'); }

    if (newFiles.length > 0) {
      setRefFiles((prev) => [...prev, ...newFiles]);
      newFiles.forEach((lf) => {
        if (lf.isImage) return;
        if (lf.mimeType === DOCX_MIME_TYPE) {
          convertAndUploadRefDocx(lf);
        } else {
          uploadRefFile(lf);
        }
      });
    }
  }, [refFiles, validateRefFile, clearError, uploadRefFile, convertAndUploadRefDocx]);

  const removeRefFile = useCallback((fileId: string) => {
    const file = refFiles.find((f) => f.id === fileId);
    if (file?.storagePath && !file.isImage) {
      supabase.storage.from('quote-reference-files').remove([file.storagePath]).catch(() => {});
    }
    setRefFiles((prev) => prev.filter((f) => f.id !== fileId));
  }, [refFiles, supabase]);

  // =========================================================================
  // Drag & Drop (main files)
  // =========================================================================

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    if (e.dataTransfer.files) processFiles(Array.from(e.dataTransfer.files));
  }, [processFiles]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { processFiles(Array.from(e.target.files)); e.target.value = ''; }
  }, [processFiles]);

  // =========================================================================
  // Drag & Drop (reference files)
  // =========================================================================

  const handleRefDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsRefDragging(true);
  }, []);

  const handleRefDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsRefDragging(false);
  }, []);

  const handleRefDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsRefDragging(false);
    if (e.dataTransfer.files) processRefFiles(Array.from(e.dataTransfer.files));
  }, [processRefFiles]);

  const handleRefFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) { processRefFiles(Array.from(e.target.files)); e.target.value = ''; }
  }, [processRefFiles]);

  // =========================================================================
  // Language Handlers
  // =========================================================================

  const handleSourceChange = (id: string, name: string) => {
    setSourceLanguageId(id);
    setSourceLanguageName(name);
    clearError('sourceLanguage');
    clearError('sameLang');
  };

  const handleTargetChange = (id: string, name: string) => {
    setTargetLanguageId(id);
    setTargetLanguageName(name);
    if (id !== '__other__') setOtherTargetLanguage('');
    clearError('targetLanguage');
    clearError('sameLang');
    clearError('otherTarget');
  };

  // =========================================================================
  // Validation
  // =========================================================================

  const successFiles = localFiles.filter((f) => f.status === 'success');

  const hasFilesInProgress = localFiles.some((f) => f.status === 'uploading' || f.status === 'converting') ||
    refFiles.some((f) => f.status === 'uploading' || f.status === 'converting');

  const canSubmit =
    successFiles.length > 0 &&
    !hasFilesInProgress &&
    !!sourceLanguageId &&
    !!targetLanguageId &&
    (targetLanguageId !== '__other__' || otherTargetLanguage.trim().length > 0) &&
    sourceLanguageId !== targetLanguageId &&
    !isSubmitting;

  const validate = (): boolean => {
    const next: Record<string, string> = {};

    if (successFiles.length === 0) next.noFiles = 'Please upload at least one document.';
    if (!sourceLanguageId) next.sourceLanguage = 'Please select a source language.';
    if (!targetLanguageId) next.targetLanguage = 'Please select a target language.';
    if (isOtherSelected && !otherTargetLanguage.trim()) {
      next.otherTarget = 'Please specify the target language.';
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

      // Resolve target language — if "Other" use null ID + store free text
      const resolvedTargetId = isOtherSelected ? null : targetLanguageId;
      const resolvedTargetName = isOtherSelected ? otherTargetLanguage.trim() : targetLanguageName;

      // 1. Create draft quote
      const { data: quote, error: quoteError } = await supabase
        .from('quotes')
        .insert({
          status: 'draft',
          source_language_id: sourceLanguageId,
          target_language_id: resolvedTargetId,
          target_language_other: isOtherSelected ? otherTargetLanguage.trim() : null,
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

      if (quoteError || !quote) throw new Error(quoteError?.message || 'Failed to create quote');

      const quoteId = quote.id;

      // 2. Combine images into a single PDF, then upload all files
      const imageFiles = successFiles.filter((f) => f.isImage);
      const nonImageFiles = successFiles.filter((f) => !f.isImage);

      // 2a. Combine all images into one PDF
      if (imageFiles.length > 0) {
        const combinedName = `${quote.quote_number}-combined-images.pdf`;
        const combinedPdf = await combineImagesToPdf(
          imageFiles.map((f) => f.file),
          combinedName
        );
        // Compress the combined PDF if large
        const finalPdf = await compressPdfIfNeeded(combinedPdf);
        const sanitized = sanitizeFilename(finalPdf.name);
        const finalPath = `${quoteId}/${sanitized}`;

        const { error: uploadError } = await supabase.storage
          .from('quote-files')
          .upload(finalPath, finalPdf, { cacheControl: '3600', upsert: true });

        if (uploadError) {
          console.error('Failed to upload combined images PDF:', uploadError);
        } else {
          await supabase.from('quote_files').insert({
            quote_id: quoteId,
            original_filename: combinedName,
            storage_path: finalPath,
            file_size: finalPdf.size,
            mime_type: 'application/pdf',
            upload_status: 'uploaded',
            ai_processing_status: 'pending',
          });
        }
      }

      // 2b. Upload individual PDFs (and converted DOCX) to final path
      for (const lf of nonImageFiles) {
        const sanitized = sanitizeFilename(lf.name);
        const finalPath = `${quoteId}/${sanitized}`;

        const { error: uploadError } = await supabase.storage
          .from('quote-files')
          .upload(finalPath, lf.file, { cacheControl: '3600', upsert: true });

        if (uploadError) { console.error(`Failed to upload ${lf.name}:`, uploadError); continue; }

        await supabase.from('quote_files').insert({
          quote_id: quoteId,
          original_filename: lf.name,
          storage_path: finalPath,
          file_size: lf.size,
          mime_type: lf.mimeType,
          upload_status: 'uploaded',
          ai_processing_status: 'pending',
        });

        if (lf.storagePath && lf.storagePath !== finalPath) {
          supabase.storage.from('quote-files').remove([lf.storagePath]).catch(() => {});
        }
      }

      // 2c. Upload reference files to final path and create quote_files records
      const successRefFiles = refFiles.filter((f) => f.status === 'success');
      const refImageFiles = successRefFiles.filter((f) => f.isImage);
      const refNonImageFiles = successRefFiles.filter((f) => !f.isImage);

      // Combine reference images into a single PDF
      if (refImageFiles.length > 0) {
        const refCombinedName = `${quote.quote_number}-ref-combined-images.pdf`;
        const refCombinedPdf = await combineImagesToPdf(
          refImageFiles.map((f) => f.file),
          refCombinedName
        );
        const sanitized = sanitizeFilename(refCombinedPdf.name);
        const finalPath = `${quoteId}/ref_${sanitized}`;

        const { error: uploadError } = await supabase.storage
          .from('quote-reference-files')
          .upload(finalPath, refCombinedPdf, { cacheControl: '3600', upsert: true });

        if (!uploadError) {
          await supabase.from('quote_files').insert({
            quote_id: quoteId,
            original_filename: refCombinedName,
            storage_path: finalPath,
            file_size: refCombinedPdf.size,
            mime_type: 'application/pdf',
            upload_status: 'uploaded',
            ai_processing_status: 'skipped',
            category_id: 'f1aed462-a25f-4dd0-96c0-f952c3a72950',
          });
        }
      }

      for (const rf of refNonImageFiles) {
        const sanitized = sanitizeFilename(rf.name);
        const finalPath = `${quoteId}/ref_${sanitized}`;

        const { error: uploadError } = await supabase.storage
          .from('quote-reference-files')
          .upload(finalPath, rf.file, { cacheControl: '3600', upsert: true });

        if (uploadError) {
          console.error(`Failed to upload ref file ${rf.name}:`, uploadError);
          continue;
        }

        await supabase.from('quote_files').insert({
          quote_id: quoteId,
          original_filename: rf.name,
          storage_path: finalPath,
          file_size: rf.size,
          mime_type: rf.mimeType,
          upload_status: 'uploaded',
          ai_processing_status: 'skipped',
          category_id: 'f1aed462-a25f-4dd0-96c0-f952c3a72950',
        });

        if (rf.storagePath && rf.storagePath !== finalPath) {
          supabase.storage.from('quote-reference-files').remove([rf.storagePath]).catch(() => {});
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
            ref_files_count: successRefFiles.length,
            entry_point: 'website_embed',
            source_language: sourceLanguageName,
            target_language: resolvedTargetName,
            default_document_type: defaultDocumentType || null,
          },
        });
      } catch (logError) { console.warn('Failed to log status history:', logError); }

      // 4. Fire AI processing (fire and forget)
      fetch(`${supabaseUrl}/functions/v1/process-quote-documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({ quoteId }),
      });

      // 5. Redirect to portal Step 2
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
      <div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">Unable to connect to our instant quote system</p>
              <p className="text-amber-700 text-sm mt-1">Please contact us directly for a quote.</p>
            </div>
          </div>
        </div>
        <div className="text-center space-y-4">
          <p className="text-gray-600">Contact us for a quote:</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:5876000786" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors">
              <Phone className="w-5 h-5" /> (587) 600-0786
            </a>
            <a href={`mailto:info@cethos.com?subject=Certified Translation Quote Request - ${formLocation}`} className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#0891B2] text-[#0891B2] rounded-lg font-semibold hover:bg-[#0891B2] hover:text-white transition-colors">
              <Mail className="w-5 h-5" /> Email Us
            </a>
          </div>
          <button onClick={() => { setShowFallback(false); setLocalFiles([]); setRefFiles([]); setErrors({}); setSubmitStatus('idle'); }} className="text-sm text-[#0891B2] hover:underline">
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
    <form onSubmit={handleSubmit}>
      {/* Header */}
      <h3 className="text-xl font-bold text-[#0C2340] mb-1">Get Your Instant Quote</h3>
      <p className="text-gray-600 text-sm mb-6">Upload your documents and get an AI-powered price estimate in seconds</p>

      {/* General Error */}
      <AnimatePresence>
        {errors.submit && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
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
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${isDragging ? 'border-[#0891B2] bg-[#E0F2FE]' : 'border-slate-300 hover:border-[#0891B2] hover:bg-slate-50'} ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
      >
        <input ref={fileInputRef} type="file" accept={ACCEPTED_EXTENSIONS} multiple onChange={handleFileSelect} className="hidden" disabled={isSubmitting} />
        <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
        <p className="text-slate-700 mb-1">
          <span className="font-semibold text-[#0891B2]">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-slate-500">PDF, JPG, PNG, DOCX (max 10MB each)</p>
      </div>

      {errors.files && <p className="text-sm text-red-600 mt-2">{errors.files}</p>}
      {errors.noFiles && <p className="text-sm text-red-600 mt-2">{errors.noFiles}</p>}

      {/* ── File List ────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {localFiles.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-2">
            {localFiles.map((f) => (
              <motion.div key={f.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3 min-w-0">
                  {(f.status === 'uploading' || f.status === 'converting') && <Loader2 className="w-5 h-5 text-[#0891B2] animate-spin flex-shrink-0" />}
                  {f.status === 'success' && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                  {f.status === 'error' && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[#0C2340] truncate">{f.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">{formatFileSize(f.size)}</span>
                      {f.status === 'converting' && <span className="text-xs text-[#0891B2]">Converting...</span>}
                      {f.isImage && f.status === 'success' && <span className="text-xs text-slate-400">Will be combined into PDF</span>}
                      {f.status === 'error' && f.error && <span className="text-xs text-red-500 truncate">{f.error}</span>}
                    </div>
                    {f.status === 'uploading' && (
                      <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                        <div className="bg-[#0891B2] h-1 rounded-full transition-all duration-200" style={{ width: `${f.progress}%` }} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {f.isImage && <span className="text-[10px] uppercase tracking-wider text-[#0891B2] bg-[#E0F2FE] px-1.5 py-0.5 rounded">IMG</span>}
                  {!isSubmitting && (
                    <button type="button" onClick={() => removeFile(f.id)} className="p-1 hover:bg-slate-200 rounded transition-colors">
                      <X className="w-4 h-4 text-slate-500" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Language Dropdowns ────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <SearchableDropdown
          label="Source Language"
          required
          options={allSourceLanguages}
          value={sourceLanguageId}
          onChange={handleSourceChange}
          placeholder="Search languages…"
          disabled={isSubmitting}
          hasError={!!errors.sourceLanguage || !!errors.sameLang}
          errorMessage={errors.sourceLanguage}
        />

        <SearchableDropdown
          label="Target Language"
          required
          options={filteredTargetLanguages}
          value={targetLanguageId}
          onChange={handleTargetChange}
          placeholder="Search languages…"
          disabled={isSubmitting || !sourceLanguageId}
          hasError={!!errors.targetLanguage || !!errors.sameLang}
          errorMessage={errors.targetLanguage}
        />
      </div>

      {/* "Other" free text input */}
      <AnimatePresence>
        {isOtherSelected && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3">
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Specify Target Language <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={otherTargetLanguage}
              onChange={(e) => { setOtherTargetLanguage(e.target.value); clearError('otherTarget'); }}
              placeholder="e.g. Punjabi, Urdu, Tagalog…"
              disabled={isSubmitting}
              className={`w-full px-3 py-2.5 border rounded-lg bg-white transition text-[16px] sm:text-sm ${errors.otherTarget ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10' : 'border-slate-300 focus:border-[#0891B2] focus:ring-2 focus:ring-[#0891B2]/10'} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              autoComplete="off"
            />
            {errors.otherTarget && <p className="text-xs text-red-600 mt-1">{errors.otherTarget}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {errors.sameLang && <p className="text-sm text-red-600 mt-2">{errors.sameLang}</p>}

      {/* ── Reference Files Accordion ────────────────────────────────────── */}
      <div className="mt-6 border border-slate-200 rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setRefSectionOpen(!refSectionOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition text-left"
        >
          <div className="flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-700">
              Reference Files
              <span className="text-slate-400 font-normal ml-1">(optional)</span>
            </span>
            {!refSectionOpen && refFiles.length > 0 && (
              <span className="bg-[#E0F2FE] text-[#0891B2] text-xs px-1.5 py-0.5 rounded-full">
                {refFiles.length}
              </span>
            )}
          </div>
          <ChevronRight
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              refSectionOpen ? 'rotate-90' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {refSectionOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 py-4">
                <p className="text-xs text-slate-500 mb-3">
                  Upload glossaries, style guides, or reference materials to help the translator. These files won&apos;t be translated or counted toward pricing.
                </p>

                <div
                  onDragOver={handleRefDragOver}
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsRefDragging(true); }}
                  onDragLeave={handleRefDragLeave}
                  onDrop={handleRefDrop}
                  onClick={(e) => { e.stopPropagation(); !isSubmitting && refFileInputRef.current?.click(); }}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    isRefDragging
                      ? 'border-slate-400 bg-slate-50'
                      : 'border-slate-200 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-50'
                  } ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                >
                  <input
                    ref={refFileInputRef}
                    type="file"
                    accept={REF_ACCEPTED_EXTENSIONS}
                    multiple
                    onChange={handleRefFileSelect}
                    className="hidden"
                    disabled={isSubmitting}
                  />
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 mx-auto mb-2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                  </svg>
                  <p className="text-sm text-slate-500">
                    Drag and drop reference files or click to browse
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    PDF, JPG, PNG, DOCX &mdash; max 20MB per file
                  </p>
                </div>

                {errors.refFiles && (
                  <p className="text-sm text-red-600 mt-2">{errors.refFiles}</p>
                )}

                {/* Reference File List */}
                <AnimatePresence>
                  {refFiles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 space-y-2"
                    >
                      {refFiles.map((f) => (
                        <motion.div
                          key={f.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {(f.status === 'uploading' || f.status === 'converting') && <Loader2 className="w-4 h-4 text-slate-400 animate-spin flex-shrink-0" />}
                            {f.status === 'success' && <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />}
                            {f.status === 'error' && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-slate-700 truncate">{f.name}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500">{formatFileSize(f.size)}</span>
                                {f.status === 'converting' && <span className="text-xs text-slate-400">Converting...</span>}
                                {f.status === 'error' && f.error && <span className="text-xs text-red-500 truncate">{f.error}</span>}
                              </div>
                              {f.status === 'uploading' && (
                                <div className="w-full bg-slate-200 rounded-full h-1 mt-1">
                                  <div className="bg-slate-400 h-1 rounded-full transition-all duration-200" style={{ width: `${f.progress}%` }} />
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                            <span className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">Ref</span>
                            {!isSubmitting && (
                              <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); removeRefFile(f.id); }}
                                className="p-1 hover:bg-slate-200 rounded transition-colors"
                              >
                                <X className="w-4 h-4 text-slate-500" />
                              </button>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Submit Button ────────────────────────────────────────────────── */}
      <button
        type="submit"
        disabled={!canSubmit}
        className={`w-full mt-6 py-4 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2 ${!canSubmit ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#0891B2] hover:bg-[#06B6D4]'}`}
      >
        {submitStatus === 'creating' && <><Loader2 className="w-5 h-5 animate-spin" />Creating your quote…</>}
        {submitStatus === 'redirecting' && <><Loader2 className="w-5 h-5 animate-spin" />Redirecting…</>}
        {(submitStatus === 'idle' || submitStatus === 'error') && <>Get Instant Quote<span className="text-lg">→</span></>}
      </button>

      {/* ── Trust Badges ─────────────────────────────────────────────────── */}
      <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-slate-600">
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />IRCC Accepted</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />Same-Day Available</span>
        <span className="flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-green-500" />From $65</span>
      </div>

      {/* ── Contact Alternative ──────────────────────────────────────────── */}
      <div className="mt-6 pt-4 border-t border-slate-200 text-center">
        <p className="text-sm text-slate-600">
          Prefer to talk?{' '}
          <a href="tel:5876000786" className="text-[#0891B2] font-medium hover:underline">(587) 600-0786</a>
          {' '}or{' '}
          <a href="mailto:info@cethos.com" className="text-[#0891B2] font-medium hover:underline">info@cethos.com</a>
        </p>
      </div>
    </form>
  );
}

export default EmbeddedCertifiedQuoteForm;
