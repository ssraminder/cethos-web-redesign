'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Card, Button, Input, Textarea, Select } from '@/components/ui'
import {
  CheckIcon,
  ArrowRightIcon,
  DocumentCheckIcon,
  GlobeNetworkIcon,
  ClockIcon,
} from '@/components/icons'

const steps = [
  { id: 1, title: 'Project Details' },
  { id: 2, title: 'Languages' },
  { id: 3, title: 'Your Information' },
]

const serviceOptions = [
  { value: 'lifesciences', label: 'Life Sciences Translation' },
  { value: 'certified', label: 'Certified Translation' },
  { value: 'business', label: 'Business Translation' },
  { value: 'software', label: 'Software Localization' },
  { value: 'multimedia', label: 'Multimedia Translation' },
  { value: 'website', label: 'Website Localization' },
]

const urgencyOptions = [
  { value: 'standard', label: 'Standard (5-7 business days)' },
  { value: 'rush', label: 'Rush (2-4 business days)' },
  { value: 'urgent', label: 'Urgent (24-48 hours)' },
]

const sourceLanguages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ar', label: 'Arabic' },
  { value: 'other', label: 'Other (specify in notes)' },
]

const targetLanguages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'zh-tw', label: 'Chinese (Traditional)' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'pt', label: 'Portuguese (Brazil)' },
  { value: 'pt-pt', label: 'Portuguese (Portugal)' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ru', label: 'Russian' },
  { value: 'it', label: 'Italian' },
  { value: 'nl', label: 'Dutch' },
  { value: 'pl', label: 'Polish' },
  { value: 'other', label: 'Other (specify in notes)' },
]

export default function GetQuotePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    service: '',
    urgency: '',
    wordCount: '',
    description: '',
    sourceLanguage: '',
    targetLanguages: [] as string[],
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
  })

  const updateFormData = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const toggleTargetLanguage = (value: string) => {
    const current = formData.targetLanguages
    if (current.includes(value)) {
      updateFormData('targetLanguages', current.filter((l) => l !== value))
    } else {
      updateFormData('targetLanguages', [...current, value])
    }
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden bg-hero-mesh">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-teal-600/15 rounded-full blur-[80px]" />

        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Get a Free Quote
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white/80"
            >
              Tell us about your project and receive a detailed quote within 2 hours.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-16 -mt-8 relative z-20">
        <Container size="md">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-6">
                  <CheckIcon size={40} className="text-teal-600" />
                </div>
                <h2 className="text-2xl font-bold text-navy mb-4">Quote Request Submitted!</h2>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Thank you for your interest in Cethos. Our team will review your project and send you a detailed quote within 2 hours.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto mb-8">
                  <div className="p-4 rounded-xl bg-slate-50">
                    <DocumentCheckIcon size={24} className="mx-auto text-teal-600 mb-2" />
                    <p className="text-sm text-slate-600">Quote via Email</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <ClockIcon size={24} className="mx-auto text-teal-600 mb-2" />
                    <p className="text-sm text-slate-600">Within 2 Hours</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-50">
                    <GlobeNetworkIcon size={24} className="mx-auto text-teal-600 mb-2" />
                    <p className="text-sm text-slate-600">200+ Languages</p>
                  </div>
                </div>

                <Button href="/" variant="secondary">
                  Return to Homepage
                </Button>
              </Card>
            </motion.div>
          ) : (
            <Card padding="none" className="overflow-hidden">
              {/* Progress Steps */}
              <div className="px-8 py-6 bg-slate-50 border-b border-slate-100">
                <div className="flex items-center justify-between max-w-md mx-auto">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                            currentStep >= step.id
                              ? 'bg-teal-600 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {currentStep > step.id ? <CheckIcon size={20} /> : step.id}
                        </div>
                        <span className={`mt-2 text-sm ${currentStep >= step.id ? 'text-teal-600 font-medium' : 'text-slate-500'}`}>
                          {step.title}
                        </span>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`w-16 sm:w-24 h-1 mx-2 rounded ${
                            currentStep > step.id ? 'bg-teal-600' : 'bg-slate-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="p-8">
                <AnimatePresence mode="wait">
                  {/* Step 1: Project Details */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-navy mb-1">Project Details</h2>
                        <p className="text-slate-600">Tell us about your translation project.</p>
                      </div>

                      <Select
                        label="Service Type"
                        options={serviceOptions}
                        value={formData.service}
                        onChange={(e) => updateFormData('service', e.target.value)}
                        required
                      />

                      <Select
                        label="Urgency"
                        options={urgencyOptions}
                        value={formData.urgency}
                        onChange={(e) => updateFormData('urgency', e.target.value)}
                        required
                      />

                      <Input
                        label="Estimated Word Count"
                        type="number"
                        placeholder="e.g., 5000"
                        value={formData.wordCount}
                        onChange={(e) => updateFormData('wordCount', e.target.value)}
                        helperText="Approximate number of words to translate"
                      />

                      <Textarea
                        label="Project Description"
                        placeholder="Describe your project, content type, and any special requirements..."
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                      />
                    </motion.div>
                  )}

                  {/* Step 2: Languages */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-navy mb-1">Languages</h2>
                        <p className="text-slate-600">Select your source and target languages.</p>
                      </div>

                      <Select
                        label="Source Language"
                        options={sourceLanguages}
                        value={formData.sourceLanguage}
                        onChange={(e) => updateFormData('sourceLanguage', e.target.value)}
                        required
                      />

                      <div>
                        <label className="block text-sm font-medium text-navy mb-3">
                          Target Languages (select all that apply)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {targetLanguages.map((lang) => (
                            <button
                              key={lang.value}
                              type="button"
                              onClick={() => toggleTargetLanguage(lang.value)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                formData.targetLanguages.includes(lang.value)
                                  ? 'bg-teal-600 text-white'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {lang.label}
                            </button>
                          ))}
                        </div>
                        {formData.targetLanguages.length > 0 && (
                          <p className="mt-2 text-sm text-teal-600">
                            {formData.targetLanguages.length} language(s) selected
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-xl font-semibold text-navy mb-1">Your Information</h2>
                        <p className="text-slate-600">Where should we send your quote?</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="First Name"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => updateFormData('firstName', e.target.value)}
                          required
                        />
                        <Input
                          label="Last Name"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => updateFormData('lastName', e.target.value)}
                          required
                        />
                      </div>

                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => updateFormData('email', e.target.value)}
                        required
                      />

                      <Input
                        label="Company"
                        placeholder="Your Company Name"
                        value={formData.company}
                        onChange={(e) => updateFormData('company', e.target.value)}
                      />

                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => updateFormData('phone', e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                  {currentStep > 1 ? (
                    <Button type="button" variant="secondary" onClick={handleBack}>
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 3 ? (
                    <Button type="button" onClick={handleNext} showArrow>
                      Continue
                    </Button>
                  ) : (
                    <Button type="submit" isLoading={isLoading}>
                      Submit Quote Request
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          )}

          {/* Trust indicators */}
          {!isSubmitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-slate-500 text-sm mb-4">Trusted by 500+ global enterprises</p>
              <div className="flex flex-wrap justify-center gap-6 text-slate-400 text-sm">
                <span>✓ Free quote, no obligation</span>
                <span>✓ Response within 2 hours</span>
                <span>✓ 200+ languages available</span>
              </div>
            </motion.div>
          )}
        </Container>
      </section>
    </>
  )
}
