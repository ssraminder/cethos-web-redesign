'use client';

import { useState, useEffect, useRef } from 'react';
import { trackQuoteSubmission } from '@/lib/tracking';

interface Language {
  id: string;
  language_name: string;
  native_name: string | null;
}

interface FormData {
  // Contact Details
  fullName: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  // Transcription Details
  serviceType: string;
  legalSubType: string;
  audioFormat: string;
  durationHours: string;
  durationMinutes: string;
  speakerCount: string;
  transcriptionStyle: string;
  outputFormat: string;
  turnaround: string;
  sourceLanguage: string;
  needsTranslation: boolean;
  targetLanguage: string;
  additionalDetails: string;
}

const SERVICE_TYPES = [
  { value: 'legal', label: 'Legal Transcription' },
  { value: 'medical', label: 'Medical Transcription' },
  { value: 'business', label: 'Business / Corporate' },
  { value: 'academic', label: 'Academic / Research' },
  { value: 'media', label: 'Media / Podcast' },
  { value: 'insurance', label: 'Insurance / Claims' },
  { value: 'transcription-translation', label: 'Transcription + Translation' },
  { value: 'other', label: 'Other' },
];

const LEGAL_SUB_TYPES = [
  { value: 'deposition', label: 'Deposition / Examination' },
  { value: 'court-hearing', label: 'Court Hearing' },
  { value: 'trial', label: 'Trial Proceedings' },
  { value: 'arbitration', label: 'Arbitration / Mediation' },
  { value: 'witness-statement', label: 'Witness Statement / Interview' },
  { value: 'legal-dictation', label: 'Legal Dictation' },
  { value: 'surveillance', label: 'Surveillance / Wiretap Audio' },
  { value: 'administrative', label: 'Administrative Hearing' },
  { value: 'other', label: 'Other Legal' },
];

const AUDIO_FORMATS = [
  { value: 'mp3', label: 'MP3' },
  { value: 'mp4', label: 'MP4 (Video)' },
  { value: 'wav', label: 'WAV / AIFF' },
  { value: 'wma', label: 'WMA / WMV' },
  { value: 'mov', label: 'MOV / M4A' },
  { value: 'digital', label: 'Digital Recording' },
  { value: 'cassette', label: 'Cassette / VHS' },
  { value: 'dvd', label: 'DVD' },
  { value: 'streaming', label: 'Streaming URL' },
  { value: 'court-system', label: 'Court Recording System (FTR, JAVS)' },
  { value: 'other', label: 'Other' },
];

const TRANSCRIPTION_STYLES = [
  { value: 'verbatim', label: 'Verbatim (Every word, fillers included)' },
  { value: 'clean-verbatim', label: 'Clean Verbatim (Edited for readability)' },
  { value: 'intelligent', label: 'Intelligent Verbatim (Summarized, key points)' },
];

const OUTPUT_FORMATS = [
  { value: 'word', label: 'Microsoft Word (.docx)' },
  { value: 'pdf', label: 'PDF (Searchable)' },
  { value: 'txt', label: 'Plain Text (.txt)' },
  { value: 'timestamped', label: 'Time-Stamped Transcript' },
  { value: 'legal-format', label: 'Legal Format (Line-Numbered)' },
  { value: 'ascii', label: 'ASCII (Litigation Software)' },
  { value: 'other', label: 'Other' },
];

const TURNAROUND_OPTIONS = [
  { value: 'standard', label: 'Standard (3-5 Business Days)' },
  { value: 'rush', label: 'Rush (24-48 Hours)' },
  { value: 'same-day', label: 'Same-Day (Submit by 10 AM MST)' },
  { value: 'overnight', label: 'Overnight (Next Morning)' },
  { value: 'flexible', label: 'Flexible / Contact Me' },
];

export default function TranscriptionQuoteForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    serviceType: '',
    legalSubType: '',
    audioFormat: '',
    durationHours: '',
    durationMinutes: '',
    speakerCount: '',
    transcriptionStyle: 'clean-verbatim',
    outputFormat: 'word',
    turnaround: 'standard',
    sourceLanguage: 'English',
    needsTranslation: false,
    targetLanguage: '',
    additionalDetails: '',
  });

  const [languages, setLanguages] = useState<Language[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch languages from database
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const response = await fetch('/api/languages');
        if (response.ok) {
          const data = await response.json();
          setLanguages(data);
        }
      } catch (error) {
        console.error('Error fetching languages:', error);
      }
    }
    fetchLanguages();
  }, []);

  // Auto-enable translation when "Transcription + Translation" is selected
  useEffect(() => {
    if (formData.serviceType === 'transcription-translation') {
      setFormData(prev => ({ ...prev, needsTranslation: true }));
    }
  }, [formData.serviceType]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Calculate total duration in minutes
      const totalMinutes =
        (parseInt(formData.durationHours) || 0) * 60 +
        (parseInt(formData.durationMinutes) || 0);

      const response = await fetch('/api/transcription-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: 'transcription',
          source_language: formData.sourceLanguage,
          target_languages: formData.needsTranslation && formData.targetLanguage
            ? [formData.targetLanguage]
            : [],
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          job_title: formData.jobTitle,
          additional_info: {
            transcription_type: formData.serviceType,
            legal_sub_type: formData.legalSubType,
            audio_format: formData.audioFormat,
            duration_minutes: totalMinutes,
            speaker_count: formData.speakerCount,
            transcription_style: formData.transcriptionStyle,
            output_format: formData.outputFormat,
            turnaround: formData.turnaround,
            needs_translation: formData.needsTranslation,
            file_count: uploadedFiles.length,
            file_names: uploadedFiles.map(f => f.name),
            additional_details: formData.additionalDetails,
          },
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        trackQuoteSubmission('transcription', formData.serviceType);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          jobTitle: '',
          serviceType: '',
          legalSubType: '',
          audioFormat: '',
          durationHours: '',
          durationMinutes: '',
          speakerCount: '',
          transcriptionStyle: 'clean-verbatim',
          outputFormat: 'word',
          turnaround: 'standard',
          sourceLanguage: 'English',
          needsTranslation: false,
          targetLanguage: '',
          additionalDetails: '',
        });
        setUploadedFiles([]);
      } else {
        const errorData = await response.json();
        setSubmitStatus('error');
        setErrorMessage(errorData.error || 'Failed to submit quote request');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Quote Request Received!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your inquiry. Our team will review your transcription needs and
          send you a detailed quote within 1 hour during business hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="text-[#0891B2] hover:text-[#06B6D4] font-medium"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
      <div className="text-center mb-6">
        <h3 className="text-xl lg:text-2xl font-bold text-[#0C2340]">Get a Free Transcription Quote</h3>
        <p className="text-gray-600 text-sm mt-1">Most quotes delivered within 1 hour</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Contact Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-[#0C2340] uppercase tracking-wide">Contact Details</h4>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name *"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number *"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="Company / Law Firm"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
            />
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Transcription Details */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-[#0C2340] uppercase tracking-wide">Transcription Details</h4>

          <select
            name="serviceType"
            value={formData.serviceType}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
          >
            <option value="">Service Type *</option>
            {SERVICE_TYPES.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          {/* Show legal sub-type if legal is selected */}
          {formData.serviceType === 'legal' && (
            <select
              name="legalSubType"
              value={formData.legalSubType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              <option value="">Legal Document Type *</option>
              {LEGAL_SUB_TYPES.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="audioFormat"
              value={formData.audioFormat}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              <option value="">Audio/Video Format *</option>
              {AUDIO_FORMATS.map(format => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>

            <div className="flex gap-2">
              <input
                type="number"
                name="durationHours"
                value={formData.durationHours}
                onChange={handleInputChange}
                placeholder="Hours"
                min="0"
                className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
              />
              <input
                type="number"
                name="durationMinutes"
                value={formData.durationMinutes}
                onChange={handleInputChange}
                placeholder="Minutes"
                min="0"
                max="59"
                className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="number"
              name="speakerCount"
              value={formData.speakerCount}
              onChange={handleInputChange}
              placeholder="Number of Speakers"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm"
            />

            <select
              name="transcriptionStyle"
              value={formData.transcriptionStyle}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              {TRANSCRIPTION_STYLES.map(style => (
                <option key={style.value} value={style.value}>{style.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select
              name="outputFormat"
              value={formData.outputFormat}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              {OUTPUT_FORMATS.map(format => (
                <option key={format.value} value={format.value}>{format.label}</option>
              ))}
            </select>

            <select
              name="turnaround"
              value={formData.turnaround}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              {TURNAROUND_OPTIONS.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Language Options */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-[#0C2340] uppercase tracking-wide">Language</h4>

          <select
            name="sourceLanguage"
            value={formData.sourceLanguage}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
          >
            <option value="English">English</option>
            {languages.map(lang => (
              <option key={lang.id} value={lang.language_name}>
                {lang.language_name}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="needsTranslation"
              name="needsTranslation"
              checked={formData.needsTranslation}
              onChange={handleInputChange}
              disabled={formData.serviceType === 'transcription-translation'}
              className="w-4 h-4 text-[#0891B2] border-gray-300 rounded focus:ring-[#0891B2] disabled:opacity-60"
            />
            <label htmlFor="needsTranslation" className="text-sm text-gray-700">
              {formData.serviceType === 'transcription-translation'
                ? 'Translation included with this service'
                : 'I also need the transcript translated to another language'}
            </label>
          </div>

          {formData.needsTranslation && (
            <select
              name="targetLanguage"
              value={formData.targetLanguage}
              onChange={handleInputChange}
              required={formData.needsTranslation}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm bg-white"
            >
              <option value="">Select Target Language *</option>
              {languages.map(lang => (
                <option key={lang.id} value={lang.language_name}>
                  {lang.language_name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* File Upload */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-[#0C2340] uppercase tracking-wide">Upload Files (Optional)</h4>

          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0891B2] transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*,video/*,.mp3,.mp4,.wav,.m4a,.mov,.avi,.wmv"
              onChange={handleFileChange}
              className="hidden"
            />
            <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-gray-600">
              <span className="text-[#0891B2] font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">Audio/Video files up to 500MB each</p>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Additional Details */}
        <div className="space-y-3 pt-2">
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleInputChange}
            placeholder="Additional Details (speaker names, terminology, special formatting requirements...)"
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent text-sm resize-none"
          />
        </div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0891B2] hover:bg-[#06B6D4] text-white font-semibold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Submitting...
            </span>
          ) : (
            'Request Free Quote'
          )}
        </button>

        {/* Security Note */}
        <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure & Confidential - NDA-Bound Transcriptionists
        </p>
      </form>
    </div>
  );
}
