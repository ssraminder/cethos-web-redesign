'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createBrowserSupabaseClient } from '@/lib/supabase'

interface Quote {
  id: string
  service_type: string
  full_name: string
  email: string
  phone: string
  company_name: string
  job_title: string | null
  source_language: string
  target_languages: string[]
  word_count: number | null
  deadline: string
  additional_notes: string
  service_data: Record<string, unknown>
  file_urls: string[]
  status: string
  created_at: string
  quote_sent_at: string | null
  payment_link_sent_at: string | null
  // Editable fields for HITL review
  quoted_price: number | null
  currency: string
  turnaround_days: number | null
  internal_notes: string | null
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cethos.com'

export default function HITLReviewPage() {
  const params = useParams()
  const router = useRouter()
  const quoteId = params.id as string

  const [quote, setQuote] = useState<Quote | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sendingQuote, setSendingQuote] = useState(false)
  const [sendingPayment, setSendingPayment] = useState(false)

  // Editable fields
  const [quotedPrice, setQuotedPrice] = useState<string>('')
  const [currency, setCurrency] = useState('CAD')
  const [turnaroundDays, setTurnaroundDays] = useState<string>('')
  const [internalNotes, setInternalNotes] = useState('')

  const fetchQuote = useCallback(async () => {
    try {
      const supabase = createBrowserSupabaseClient()
      const { data, error } = await supabase
        .from('cethosweb_quote_submissions')
        .select('*')
        .eq('id', quoteId)
        .single()

      if (error) throw error
      setQuote(data)

      // Initialize editable fields
      setQuotedPrice(data.quoted_price?.toString() || '')
      setCurrency(data.currency || 'CAD')
      setTurnaroundDays(data.turnaround_days?.toString() || '')
      setInternalNotes(data.internal_notes || '')
    } catch (error) {
      console.error('Error fetching quote:', error)
      toast.error('Failed to load quote')
    } finally {
      setLoading(false)
    }
  }, [quoteId])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  const saveQuoteChanges = async () => {
    setSaving(true)
    try {
      const supabase = createBrowserSupabaseClient()
      const { error } = await supabase
        .from('cethosweb_quote_submissions')
        .update({
          quoted_price: quotedPrice ? parseFloat(quotedPrice) : null,
          currency,
          turnaround_days: turnaroundDays ? parseInt(turnaroundDays) : null,
          internal_notes: internalNotes || null,
        })
        .eq('id', quoteId)

      if (error) throw error
      toast.success('Quote saved successfully')
      await fetchQuote()
    } catch (error) {
      console.error('Error saving quote:', error)
      toast.error('Failed to save quote')
      throw error
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    await saveQuoteChanges()
  }

  const handleReject = async () => {
    if (!confirm('Are you sure you want to reject this quote?')) return

    try {
      const supabase = createBrowserSupabaseClient()
      const { error } = await supabase
        .from('cethosweb_quote_submissions')
        .update({ status: 'rejected' })
        .eq('id', quoteId)

      if (error) throw error
      toast.success('Quote rejected')
      router.push('/admin/quotes')
    } catch (error) {
      console.error('Error rejecting quote:', error)
      toast.error('Failed to reject quote')
    }
  }

  const handleEscalate = async () => {
    try {
      const supabase = createBrowserSupabaseClient()
      const { error } = await supabase
        .from('cethosweb_quote_submissions')
        .update({ status: 'escalated' })
        .eq('id', quoteId)

      if (error) throw error
      toast.success('Quote escalated')
    } catch (error) {
      console.error('Error escalating quote:', error)
      toast.error('Failed to escalate quote')
    }
  }

  const handleSendQuoteLink = async () => {
    if (!quotedPrice) {
      toast.error('Please enter a quoted price before sending')
      return
    }

    setSendingQuote(true)
    try {
      // Save changes first
      await saveQuoteChanges()

      // Send quote email via API
      const response = await fetch('/api/admin/send-quote-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId,
          customerEmail: quote?.email,
          customerName: quote?.full_name,
          linkUrl: `${SITE_URL}/quote/Step5/${quoteId}`,
          buttonText: 'Review and Pay',
          quotedPrice: parseFloat(quotedPrice),
          currency,
          turnaroundDays: turnaroundDays ? parseInt(turnaroundDays) : null,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to send email')
      }

      // Update quote status
      const supabase = createBrowserSupabaseClient()
      await supabase
        .from('cethosweb_quote_submissions')
        .update({
          status: 'awaiting_payment',
          quote_sent_at: new Date().toISOString(),
        })
        .eq('id', quoteId)

      toast.success('Quote link sent to customer')
      await fetchQuote()
    } catch (error) {
      console.error('Error sending quote link:', error)
      toast.error('Failed to send quote link')
    } finally {
      setSendingQuote(false)
    }
  }

  const handleSendPaymentLink = async () => {
    if (!quotedPrice) {
      toast.error('Please enter a quoted price before sending')
      return
    }

    setSendingPayment(true)
    try {
      // Save changes first
      await saveQuoteChanges()

      // Create Stripe checkout session and send email via API
      const response = await fetch('/api/admin/send-payment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteId,
          customerEmail: quote?.email,
          customerName: quote?.full_name,
          quotedPrice: parseFloat(quotedPrice),
          currency,
          description: `${quote?.service_type} - ${quote?.source_language} to ${quote?.target_languages?.join(', ')}`,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to send payment link')
      }

      // Update quote status
      const supabase = createBrowserSupabaseClient()
      await supabase
        .from('cethosweb_quote_submissions')
        .update({
          status: 'awaiting_payment',
          payment_link_sent_at: new Date().toISOString(),
        })
        .eq('id', quoteId)

      toast.success('Payment link sent to customer')
      await fetchQuote()
    } catch (error) {
      console.error('Error sending payment link:', error)
      toast.error('Failed to send payment link')
    } finally {
      setSendingPayment(false)
    }
  }

  const isConvertedToOrder = quote && ['paid', 'converted'].includes(quote.status)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-teal-600 border-t-transparent rounded-full" />
      </div>
    )
  }

  if (!quote) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Quote Not Found</h1>
          <p className="text-slate-600">The requested quote could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Left side - Reject and Escalate buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <span>×</span> Reject
              </button>
              <button
                onClick={handleEscalate}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
              >
                <span>⚡</span> Escalate
              </button>
            </div>

            {/* Center - Title */}
            <div className="text-center">
              <h1 className="text-xl font-bold text-slate-900">HITL Review</h1>
              <p className="text-sm text-slate-500">Quote #{quote.id.slice(0, 8)}</p>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                {saving ? (
                  <span className="animate-spin h-4 w-4 border-2 border-slate-500 border-t-transparent rounded-full" />
                ) : (
                  <span>💾</span>
                )}
                Save
              </button>

              {!isConvertedToOrder && (
                <>
                  <button
                    onClick={handleSendQuoteLink}
                    disabled={sendingQuote}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-700 bg-white border-2 border-purple-300 rounded-lg hover:bg-purple-50 hover:border-purple-400 transition-colors disabled:opacity-50"
                  >
                    {sendingQuote ? (
                      <span className="animate-spin h-4 w-4 border-2 border-purple-500 border-t-transparent rounded-full" />
                    ) : (
                      <span>✉️</span>
                    )}
                    Send Quote Link
                  </button>
                  <button
                    onClick={handleSendPaymentLink}
                    disabled={sendingPayment}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {sendingPayment ? (
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      <span>💳</span>
                    )}
                    Send Payment Link
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Quote Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Status Badge */}
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                quote.status === 'awaiting_payment' ? 'bg-blue-100 text-blue-800' :
                quote.status === 'paid' ? 'bg-green-100 text-green-800' :
                quote.status === 'converted' ? 'bg-green-100 text-green-800' :
                quote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                quote.status === 'escalated' ? 'bg-amber-100 text-amber-800' :
                'bg-slate-100 text-slate-800'
              }`}>
                {quote.status.charAt(0).toUpperCase() + quote.status.slice(1).replace('_', ' ')}
              </span>
              <span className="text-sm text-slate-500">
                Submitted {new Date(quote.created_at).toLocaleDateString()}
              </span>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span>👤</span> Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500">Name</label>
                  <p className="font-medium text-slate-900">{quote.full_name}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Email</label>
                  <p className="font-medium text-slate-900">
                    <a href={`mailto:${quote.email}`} className="text-teal-600 hover:underline">
                      {quote.email}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Phone</label>
                  <p className="font-medium text-slate-900">
                    <a href={`tel:${quote.phone}`} className="text-teal-600 hover:underline">
                      {quote.phone}
                    </a>
                  </p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Company</label>
                  <p className="font-medium text-slate-900">{quote.company_name}</p>
                </div>
                {quote.job_title && (
                  <div>
                    <label className="text-sm text-slate-500">Job Title</label>
                    <p className="font-medium text-slate-900">{quote.job_title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span>📋</span> Project Details
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-slate-500">Service Type</label>
                  <p className="font-medium text-slate-900">{quote.service_type}</p>
                </div>
                <div>
                  <label className="text-sm text-slate-500">Source Language</label>
                  <p className="font-medium text-slate-900">{quote.source_language}</p>
                </div>
                <div className="col-span-2">
                  <label className="text-sm text-slate-500">Target Languages</label>
                  <p className="font-medium text-slate-900">{quote.target_languages?.join(', ')}</p>
                </div>
                {quote.word_count && (
                  <div>
                    <label className="text-sm text-slate-500">Word Count</label>
                    <p className="font-medium text-slate-900">{quote.word_count.toLocaleString()}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm text-slate-500">Deadline</label>
                  <p className="font-medium text-slate-900">{quote.deadline}</p>
                </div>
              </div>
              {quote.additional_notes && (
                <div className="mt-4">
                  <label className="text-sm text-slate-500">Additional Notes</label>
                  <p className="font-medium text-slate-900 whitespace-pre-wrap">{quote.additional_notes}</p>
                </div>
              )}
            </div>

            {/* Files */}
            {quote.file_urls && quote.file_urls.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                  <span>📎</span> Uploaded Files ({quote.file_urls.length})
                </h2>
                <div className="space-y-2">
                  {quote.file_urls.map((url, index) => (
                    <a
                      key={index}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <span className="text-xl">📄</span>
                      <span className="text-sm font-medium text-teal-600 hover:underline truncate">
                        {url.split('/').pop()}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Quote Pricing */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <span>💰</span> Quote Pricing
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Quoted Price *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={quotedPrice}
                      onChange={(e) => setQuotedPrice(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    />
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    >
                      <option value="CAD">CAD</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Turnaround (Days)
                  </label>
                  <input
                    type="number"
                    value={turnaroundDays}
                    onChange={(e) => setTurnaroundDays(e.target.value)}
                    placeholder="e.g., 5"
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Internal Notes
                  </label>
                  <textarea
                    value={internalNotes}
                    onChange={(e) => setInternalNotes(e.target.value)}
                    placeholder="Notes for internal use only..."
                    rows={4}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
                  />
                </div>
              </div>

              {/* Send Status */}
              {(quote.quote_sent_at || quote.payment_link_sent_at) && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h3 className="text-sm font-medium text-slate-700 mb-2">Send History</h3>
                  {quote.quote_sent_at && (
                    <p className="text-sm text-slate-500">
                      Quote sent: {new Date(quote.quote_sent_at).toLocaleString()}
                    </p>
                  )}
                  {quote.payment_link_sent_at && (
                    <p className="text-sm text-slate-500">
                      Payment link sent: {new Date(quote.payment_link_sent_at).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
