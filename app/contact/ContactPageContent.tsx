'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Container, Card, Button, Input, Textarea, Select } from '@/components/ui'
import { MailIcon, PhoneIcon, MapPinIcon, ClockIcon, CheckIcon } from '@/components/icons'
import { ContactLocations } from '@/components/ContactLocations'

const contactInfo = [
  {
    title: 'Email Us',
    value: 'info@cethos.com',
    link: 'mailto:info@cethos.com',
    icon: MailIcon,
  },
  {
    title: 'Call Us',
    value: '587-600-0786',
    link: 'tel:+15876000786',
    icon: PhoneIcon,
  },
  {
    title: 'Visit Us',
    value: '421 7 Avenue SW, Floor 30, Calgary, AB',
    link: null,
    icon: MapPinIcon,
  },
  {
    title: 'Business Hours',
    value: '24/7 Support Available',
    link: null,
    icon: ClockIcon,
  },
]

const subjectOptions = [
  { value: 'quote', label: 'Request a Quote' },
  { value: 'services', label: 'Service Inquiry' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'careers', label: 'Career Inquiry' },
  { value: 'other', label: 'Other' },
]

export default function ContactPageContent() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  return (
    <>
      {/* Hero Section - Light background with dark text */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-24">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-[40px] md:text-[48px] font-bold text-[#0C2340] leading-[1.1] mb-6"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-[#4B5563] leading-relaxed"
            >
              Have a question or ready to start your project? We&apos;re here to help.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full">
                  <div className="icon-container mx-auto mb-4">
                    <info.icon size={24} />
                  </div>
                  <h3 className="font-semibold text-navy mb-1">{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className="text-teal-600 hover:underline">
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-slate-600 text-sm">{info.value}</p>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact Form & Map Section */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-heading-xl text-navy mb-2">Send Us a Message</h2>
              <p className="text-slate-600 mb-8">
                Fill out the form below and we&apos;ll get back to you within 2 hours.
              </p>

              {isSubmitted ? (
                <Card className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-4">
                    <CheckIcon size={32} className="text-teal-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-navy mb-2">Message Sent!</h3>
                  <p className="text-slate-600 mb-6">
                    Thank you for contacting us. We&apos;ll respond within 2 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="secondary">
                    Send Another Message
                  </Button>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      placeholder="John"
                      required
                    />
                    <Input
                      label="Last Name"
                      placeholder="Doe"
                      required
                    />
                  </div>

                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@company.com"
                    required
                  />

                  <Input
                    label="Company"
                    placeholder="Your Company Name"
                  />

                  <Select
                    label="Subject"
                    options={subjectOptions}
                    required
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us about your project or inquiry..."
                    required
                  />

                  <Button type="submit" size="lg" isLoading={isLoading} className="w-full sm:w-auto">
                    Send Message
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-heading-xl text-navy mb-2">Our Locations</h2>
              <p className="text-slate-600 mb-8">
                Connect with us at the location nearest to you.
              </p>

              <ContactLocations />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-slate-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-heading-xl text-navy mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-600 mb-12">
              Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>

            <div className="space-y-4 text-left">
              {[
                {
                  q: 'What languages do you support?',
                  a: 'We offer translation services in over 200 languages, including all major world languages and many specialized dialects.',
                },
                {
                  q: 'How quickly can you complete a translation?',
                  a: 'Turnaround times vary based on project size and complexity. Standard projects typically take 2-5 business days, with rush services available.',
                },
                {
                  q: 'Are your translations certified?',
                  a: 'Yes, we offer certified translations for official documents. All certified translations include a signed certificate of accuracy.',
                },
                {
                  q: 'How do you ensure quality?',
                  a: 'We follow ISO 17100 standards with a three-step process: translation by a native speaker, review by a second linguist, and final quality assurance.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <h3 className="font-semibold text-navy mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
