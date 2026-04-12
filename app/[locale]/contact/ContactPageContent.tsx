'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, FileText, MapPin, Clock, CheckCircle, Send, ArrowRight } from 'lucide-react'
import { Container, Card, Button, Input, Textarea, Select } from '@/components/ui'
import { trackGenerateLead } from '@/lib/tracking'

const serviceOptions = [
  { value: 'general-inquiry', label: 'General Inquiry' },
  { value: 'certified-translation', label: 'Certified Translation' },
  { value: 'business-translation', label: 'Business Translation' },
  { value: 'legal-translation', label: 'Legal Translation' },
  { value: 'software-localization', label: 'Software Localization' },
  { value: 'life-sciences', label: 'Life Sciences' },
  { value: 'interpretation', label: 'Interpretation' },
]

const offices = [
  {
    city: 'Calgary, Canada',
    label: 'Headquarters',
    flag: 'https://flagcdn.com/w40/ca.png',
    flagAlt: 'Canada flag',
    address: '421 7 Avenue SW, Floor 30, Calgary, AB T2P 4K9, Canada',
    phone: '(587) 600-0786',
    email: 'info@cethos.com',
    hours: 'Monday-Friday: 9:00 AM - 5:00 PM MST',
  },
  {
    city: 'Dubai, UAE',
    label: null,
    flag: 'https://flagcdn.com/w40/ae.png',
    flagAlt: 'UAE flag',
    address: 'Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE',
    phone: null,
    email: 'info@cethos.com',
    hours: 'Sunday-Thursday: 9:00 AM - 6:00 PM GST',
  },
  {
    city: 'Patiala, India',
    label: null,
    flag: 'https://flagcdn.com/w40/in.png',
    flagAlt: 'India flag',
    address: '158/3, Dharampura Bazaar, Patiala 147001, Punjab, India',
    phone: null,
    email: 'info@cethos.com',
    hours: 'Monday-Friday: 9:00 AM - 6:00 PM IST',
  },
]

const contactMethods = [
  {
    icon: Phone,
    title: '(587) 600-0786',
    description: 'Monday-Friday, 9 AM - 5 PM MST',
    href: 'tel:+15876000786',
    isExternal: true,
  },
  {
    icon: Mail,
    title: 'info@cethos.com',
    description: 'We typically respond within 2 hours',
    href: 'mailto:info@cethos.com',
    isExternal: true,
  },
  {
    icon: FileText,
    title: 'Request a Free Quote',
    description: 'Upload your documents and get a quote in minutes',
    href: '/get-quote',
    isExternal: false,
  },
]

interface ContactFormData {
  fullName: string
  email: string
  phone: string
  serviceInterest: string
  message: string
}

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function ContactPageContent() {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tHero = useTranslations('contact.hero')
  const tOffices = useTranslations('contact.offices')
  const tForm = useTranslations('contact.form')
  const tCta = useTranslations('contact.cta')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const submitData = new FormData()
      submitData.append('fullName', formData.fullName)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('companyName', '')
      submitData.append('serviceType', formData.serviceInterest || 'general-inquiry')
      submitData.append('sourceLanguage', 'English')
      submitData.append('targetLanguages', JSON.stringify(['To be determined']))
      submitData.append('timeline', 'flexible')
      submitData.append('projectDescription', formData.message)

      const response = await fetch('/api/quote', { method: 'POST', body: submitData })

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.')
      }

      setIsSubmitted(true)
      trackGenerateLead('contact', 'Contact Form Submitted')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      serviceInterest: '',
      message: '',
    })
    setError(null)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-20 bg-[#0C2340] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0C2340] to-[#0a1c33]" />
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0891B2] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#0891B2] rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative max-w-3xl mx-auto text-center py-24">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[40px] md:text-[56px] font-bold text-white leading-[1.1] mb-6 tracking-tight"
            >
              {tHero('heading')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto"
            >
              {tHero('description')}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-20 bg-white">
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              const cardContent = (
                <Card hover className="text-center h-full">
                  <div className="w-14 h-14 rounded-full bg-[#0891B2]/10 flex items-center justify-center mx-auto mb-5">
                    <IconComponent className="w-6 h-6 text-[#0891B2]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#0C2340] mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {method.description}
                  </p>
                </Card>
              )

              return (
                <motion.div key={method.title} variants={fadeInUp}>
                  {method.isExternal ? (
                    <a href={method.href} className="block h-full">
                      {cardContent}
                    </a>
                  ) : (
                    <Link href={method.href} className="block h-full">
                      {cardContent}
                    </Link>
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </Container>
      </section>

      {/* Office Locations Section */}
      <section className="py-20 bg-slate-50">
        <Container>
          <div className="text-center mb-14">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[32px] md:text-[40px] font-bold text-[#0C2340] mb-4 tracking-tight"
            >
              {tOffices('heading')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-slate-600 max-w-lg mx-auto"
            >
              {tOffices('description')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <motion.div
                key={office.city}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                    <Image
                      src={office.flag}
                      alt={office.flagAlt}
                      width={40}
                      height={30}
                      className="rounded-sm shadow-sm"
                      unoptimized
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-[#0C2340] leading-tight">
                        {office.city}
                      </h3>
                      {office.label && (
                        <span className="text-xs font-semibold text-[#0891B2] uppercase tracking-wider">
                          {office.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-600 leading-relaxed">{office.address}</p>
                    </div>

                    {office.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <a
                          href="tel:+15876000786"
                          className="text-sm text-[#0891B2] hover:text-[#06B6D4] transition-colors font-medium"
                        >
                          {office.phone}
                        </a>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <a
                        href={`mailto:${office.email}`}
                        className="text-sm text-[#0891B2] hover:text-[#06B6D4] transition-colors font-medium"
                      >
                        {office.email}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{office.hours}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[32px] md:text-[40px] font-bold text-[#0C2340] mb-4 tracking-tight"
              >
                {tForm('heading')}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-slate-600"
              >
                {tForm('description')}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <Card className="text-center py-16">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                  >
                    <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#0891B2]" />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-[#0C2340] mb-3">{tForm('success_heading')}</h3>
                    <p className="text-slate-600 mb-8 max-w-md mx-auto">
                      {tForm('success_desc')}
                    </p>
                    <Button onClick={resetForm} variant="secondary">
                      {tForm('success_again')}
                    </Button>
                  </motion.div>
                </Card>
              ) : (
                <Card padding="lg" className="shadow-medium">
                  <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label={tForm('name_label')}
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        label={tForm('email_label')}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label={tForm('phone_label')}
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                      <Select
                        label={tForm('service_label')}
                        name="serviceInterest"
                        value={formData.serviceInterest}
                        onChange={handleChange}
                        options={serviceOptions}
                      />
                    </div>

                    <Textarea
                      label={tForm('message_label')}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                    />

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-lg bg-red-50 border border-red-200"
                      >
                        <p className="text-sm text-red-600 font-medium">{error}</p>
                      </motion.div>
                    )}

                    <div className="flex justify-start pt-2">
                      <Button
                        type="submit"
                        size="lg"
                        isLoading={isLoading}
                        icon={!isLoading ? <Send className="w-4 h-4" /> : undefined}
                      >
                        {tForm('submit')}
                      </Button>
                    </div>
                  </form>
                </Card>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0C2340] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#0891B2] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0891B2] rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {tCta('certified_heading')}
              </h3>
              <Button href="/services/certified" variant="primary" showArrow>
                {tCta('certified_button')}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-white mb-6">
                {tCta('enterprise_heading')}
              </h3>
              <Button href="/services/lifesciences" variant="outline" showArrow>
                {tCta('enterprise_button')}
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>
    </>
  )
}
