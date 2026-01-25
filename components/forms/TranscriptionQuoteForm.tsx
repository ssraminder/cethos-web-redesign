'use client';

import { useState, useEffect } from 'react';
import { trackQuoteSubmission } from '@/lib/tracking';

// Service types with their configurations
const SERVICE_TYPES = [
  { value: 'legal', label: 'Legal Transcription', badge: 'Most Popular' },
  { value: 'medical', label: 'Medical Transcription' },
  { value: 'business', label: 'Business & Corporate' },
  { value: 'academic', label: 'Academic & Research' },
  { value: 'media', label: 'Media & Podcast' },
  { value: 'insurance', label: 'Insurance & Claims' },
  { value: 'transcription-translation', label: 'Transcription + Translation', badge: 'Bundle & Save' },
];

const LEGAL_SUBTYPES = [
  { value: 'court-proceedings', label: 'Court Proceedings' },
  { value: 'depositions', label: 'Depositions' },
  { value: 'witness-statements', label: 'Witness Statements' },
  { value: 'legal-briefs', label: 'Legal Briefs & Documents' },
  { value: 'arbitration', label: 'Arbitration Hearings' },
  { value: 'other-legal', label: 'Other Legal Content' },
];

const TURNAROUND_OPTIONS = [
  { value: 'standard', label: 'Standard (3-5 business days)', price: '$1.50/min' },
  { value: 'rush', label: 'Rush (24-48 hours)', price: '$2.25/min' },
  { value: 'same-day', label: 'Same-Day (by end of day)', price: '$3.00/min' },
  { value: 'overnight', label: 'Overnight (next morning)', price: '$2.75/min' },
];

interface FormData {
  // Step 1: Service Details
  serviceType: string;
  legalSubtype: string;
  includeTranslation: boolean;
  targetLanguage: string;
  turnaround: string;
  estimatedMinutes: string;

  // Step 2: Contact Information
  fullName: string;
  email: string;
  phone: string;
  company: string;

  // Step 3: Files & Notes
  files: FileList | null;
  notes: string;
}

export default function TranscriptionQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    legalSubtype: '',
    includeTranslation: false,
    targetLanguage: '',
    turnaround: 'standard',
    estimatedMinutes: '',
    fullName: '',
    email: '',
    phone: '',
    company: '',
    files: null,
    notes: '',
  });

  // Auto-enable translation for bundle service
  useEffect(() => {
    if (formData.serviceType === 'transcription-translation') {
      setFormData(prev => ({ ...prev, includeTranslation: true }));
    }
  }, [formData.serviceType]);

  const updateFormData = (field: keyof FormData, value: string | boolean | FileList | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.serviceType || !formData.turnaround) return false;
        if (formData.serviceType === 'legal' && !formData.legalSubtype) return false;
        if (formData.includeTranslation && !formData.targetLanguage) return false;
        return true;
      case 2:
        return !!(formData.fullName && formData.email && formData.phone);
      case 3:
        return true; // Files and notes are optional
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (isStepValid(currentStep) && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Prepare file info
      const fileNames = formData.files ? Array.from(formData.files).map(f => f.name) : [];

      // Submit to existing transcription-quote API with JSON format
      const response = await fetch('/api/transcription-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_type: 'transcription',
          source_language: 'English',
          target_languages: formData.includeTranslation && formData.targetLanguage
            ? [formData.targetLanguage]
            : [],
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          additional_info: {
            transcription_type: formData.serviceType,
            legal_sub_type: formData.legalSubtype || null,
            turnaround: formData.turnaround,
            duration_minutes: formData.estimatedMinutes ? parseInt(formData.estimatedMinutes) : 0,
            needs_translation: formData.includeTranslation,
            file_count: fileNames.length,
            file_names: fileNames,
            additional_details: formData.notes,
            transcription_style: 'clean-verbatim',
            output_format: 'word',
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit quote request');
      }

      // Track successful submission
      trackQuoteSubmission('transcription', formData.serviceType);

      setSubmitStatus('success');

      // Reset form
      setFormData({
        serviceType: '',
        legalSubtype: '',
        includeTranslation: false,
        targetLanguage: '',
        turnaround: 'standard',
        estimatedMinutes: '',
        fullName: '',
        email: '',
        phone: '',
        company: '',
        files: null,
        notes: '',
      });
      setCurrentStep(1);

    } catch (error) {
      console.error('Quote submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Progress indicator
  const ProgressSteps = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
              step === currentStep
                ? 'bg-[#0891B2] text-white'
                : step < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {step < currentStep ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div
              className={`w-16 md:w-24 h-1 mx-2 rounded ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  // Step labels
  const stepLabels = ['Service Details', 'Contact Info', 'Upload & Submit'];

  if (submitStatus === 'success') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#0C2340] mb-2">Quote Request Submitted!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your request. Our team will review your requirements and get back to you within 2 hours during business hours.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="bg-[#0891B2] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-[#0C2340] mb-2 text-center">Get a Free Quote</h3>
      <p className="text-gray-600 text-center mb-6">
        Step {currentStep} of 3: {stepLabels[currentStep - 1]}
      </p>

      <ProgressSteps />

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* STEP 1: Service Details */}
        {currentStep === 1 && (
          <div className="space-y-5">
            {/* Service Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transcription Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => updateFormData('serviceType', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                <option value="">Select service type...</option>
                {SERVICE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label} {type.badge && `(${type.badge})`}
                  </option>
                ))}
              </select>
            </div>

            {/* Legal Subtype (conditional) */}
            {formData.serviceType === 'legal' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Document Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.legalSubtype}
                  onChange={(e) => updateFormData('legalSubtype', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                  required
                >
                  <option value="">Select document type...</option>
                  {LEGAL_SUBTYPES.map((type) => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Translation Option */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.includeTranslation}
                  onChange={(e) => updateFormData('includeTranslation', e.target.checked)}
                  disabled={formData.serviceType === 'transcription-translation'}
                  className="mt-1 w-5 h-5 text-[#0891B2] rounded focus:ring-[#0891B2]"
                />
                <div>
                  <span className="font-medium text-gray-900">
                    {formData.serviceType === 'transcription-translation'
                      ? 'Translation included with this service'
                      : 'Add Translation Service'}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    Get your transcription translated to another language (from $3.50/min)
                  </p>
                </div>
              </label>
            </div>

            {/* Target Language (conditional) */}
            {formData.includeTranslation && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Language <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.targetLanguage}
                  onChange={(e) => updateFormData('targetLanguage', e.target.value)}
                  placeholder="e.g., Spanish, French, Mandarin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                  required
                />
              </div>
            )}

            {/* Turnaround Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turnaround Time <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.turnaround}
                onChange={(e) => updateFormData('turnaround', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              >
                {TURNAROUND_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Estimated Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Audio/Video Length (minutes)
              </label>
              <input
                type="number"
                value={formData.estimatedMinutes}
                onChange={(e) => updateFormData('estimatedMinutes', e.target.value)}
                placeholder="e.g., 60"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Helps us provide an accurate quote
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Contact Information */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData('fullName', e.target.value)}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData('phone', e.target.value)}
                placeholder="(587) 600-0786"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company/Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateFormData('company', e.target.value)}
                placeholder="Company name (optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Upload & Notes */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Audio/Video Files
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#0891B2] transition-colors">
                <input
                  type="file"
                  multiple
                  accept="audio/*,video/*,.mp3,.mp4,.wav,.m4a,.mov,.avi,.wmv"
                  onChange={(e) => updateFormData('files', e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-1">MP3, MP4, WAV, M4A, MOV, AVI (max 500MB each)</p>
                </label>
              </div>
              {formData.files && formData.files.length > 0 && (
                <div className="mt-3 space-y-2">
                  {Array.from(formData.files).map((file, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Or share via Dropbox/Google Drive link in the notes below
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                rows={4}
                placeholder="Any special requirements, speaker identification needs, timestamps, formatting preferences, file sharing links..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0891B2] focus:border-transparent resize-none"
              />
            </div>

            {/* Summary */}
            <div className="bg-[#0C2340]/5 p-4 rounded-lg">
              <h4 className="font-semibold text-[#0C2340] mb-3">Request Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-600">Service:</span>
                <span className="font-medium">{SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label || '-'}</span>

                <span className="text-gray-600">Turnaround:</span>
                <span className="font-medium">{TURNAROUND_OPTIONS.find(t => t.value === formData.turnaround)?.label.split(' (')[0] || '-'}</span>

                <span className="text-gray-600">Translation:</span>
                <span className="font-medium">{formData.includeTranslation ? `Yes (${formData.targetLanguage})` : 'No'}</span>

                <span className="text-gray-600">Contact:</span>
                <span className="font-medium">{formData.fullName || '-'}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              &larr; Back
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!isStepValid(currentStep)}
              className="px-6 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue &rarr;
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#0891B2] text-white rounded-lg font-semibold hover:bg-[#06B6D4] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </>
              ) : (
                'Submit Quote Request'
              )}
            </button>
          )}
        </div>
      </form>

      {/* Trust Indicators */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Secure & Confidential
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-[#0891B2]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            Response within 2 hours
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            139 Five-Star Reviews
          </span>
        </div>
      </div>
    </div>
  );
}
