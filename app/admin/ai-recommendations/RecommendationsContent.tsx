'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'

type Status = 'pending' | 'approved' | 'rejected' | 'executed' | 'auto_executed' | 'failed' | 'expired' | 'superseded'
type RiskTier = 'low' | 'medium' | 'high'
type Severity = 'critical' | 'high' | 'medium' | 'low'

interface FollowUp {
  note: string
  refined_title: string
  refined_summary_md: string
  refined_impact: string
  created_at: string
  invoked_by?: string
  model?: string
}

interface Recommendation {
  id: string
  audit_run_id: string | null
  created_at: string
  check_id: string
  category: string
  risk_tier: RiskTier
  severity: Severity
  title: string
  summary_md: string
  expected_impact: string | null
  evidence: Record<string, unknown>
  action_type: string
  action_payload: Record<string, unknown>
  status: Status
  reviewed_by: string | null
  reviewed_at: string | null
  executed_at: string | null
  execution_result: Record<string, unknown> | null
  failure_count: number
  expires_at: string
  follow_ups?: FollowUp[]
  last_followup_at?: string | null
}

type StatusFilter = Status | 'all' | 'active'

const SEVERITY_ORDER: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 }

const severityColor = (s: Severity) =>
  ({ critical: 'bg-red-100 text-red-800', high: 'bg-orange-100 text-orange-800', medium: 'bg-yellow-100 text-yellow-800', low: 'bg-slate-100 text-slate-700' }[s])

const riskColor = (r: RiskTier) =>
  ({ low: 'bg-green-50 text-green-700 border-green-200', medium: 'bg-yellow-50 text-yellow-800 border-yellow-200', high: 'bg-red-50 text-red-800 border-red-200' }[r])

const ALL_CATEGORIES = [
  'ads_keyword', 'ads_negative', 'ads_bid', 'ads_budget',
  'seo_meta', 'seo_sitemap', 'seo_jsonld',
  'gbp_profile', 'gbp_reply', 'gbp_post',
  'site_code',
] as const

const CATEGORY_GROUPS: Record<string, string[]> = {
  Ads: ['ads_keyword', 'ads_negative', 'ads_bid', 'ads_budget'],
  SEO: ['seo_meta', 'seo_sitemap', 'seo_jsonld'],
  GBP: ['gbp_profile', 'gbp_reply', 'gbp_post'],
  Site: ['site_code'],
}

const ALL_SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low']
const ALL_RISK_TIERS: RiskTier[] = ['low', 'medium', 'high']

export default function RecommendationsContent() {
  const [items, setItems] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('active')
  const [severityFilter, setSeverityFilter] = useState<Set<Severity>>(new Set(ALL_SEVERITIES))
  const [groupFilter, setGroupFilter] = useState<Set<string>>(new Set(Object.keys(CATEGORY_GROUPS)))
  const [riskFilter, setRiskFilter] = useState<Set<RiskTier>>(new Set(ALL_RISK_TIERS))
  const [searchQuery, setSearchQuery] = useState('')
  const [expanded, setExpanded] = useState<Set<string>>(new Set())
  const [busy, setBusy] = useState<Set<string>>(new Set())
  const [confirmHigh, setConfirmHigh] = useState<Recommendation | null>(null)
  const [followUpOpen, setFollowUpOpen] = useState<Recommendation | null>(null)
  const [followUpNote, setFollowUpNote] = useState('')
  const [justRefined, setJustRefined] = useState<Set<string>>(new Set())

  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      // Explicit cache-bust on the client side too — belt and suspenders
      // against Netlify's edge cache + browser HTTP cache layering.
      const res = await fetch(
        `/api/admin/recommendations/list?status=${statusFilter}&_=${Date.now()}`,
        { cache: 'no-store' },
      )
      if (!res.ok) throw new Error(`list ${res.status}`)
      const data = await res.json()
      setItems(data.recommendations || [])
    } catch (err) {
      console.error(err)
      toast.error('Failed to load recommendations')
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const [showReviewed, setShowReviewed] = useState(false)

  const filtered = useMemo(() => {
    const categoryWhitelist = new Set<string>()
    Array.from(groupFilter).forEach((group) => {
      (CATEGORY_GROUPS[group] || []).forEach((c) => categoryWhitelist.add(c))
    })
    const q = searchQuery.trim().toLowerCase()
    return items.filter((r) => {
      if (!severityFilter.has(r.severity)) return false
      if (!riskFilter.has(r.risk_tier)) return false
      if (!categoryWhitelist.has(r.category)) return false
      // In the "Active" view, treat a rec as acted-upon (hide) if it has
      // one or more follow-ups — the user has engaged with it. Just-refined
      // recs stay visible so the user sees the effect of their action in
      // this session.
      if (
        statusFilter === 'active' &&
        !showReviewed &&
        (r.follow_ups?.length || 0) > 0 &&
        !justRefined.has(r.id)
      ) {
        return false
      }
      if (q) {
        const hay = `${r.title} ${r.summary_md} ${r.expected_impact || ''} ${r.check_id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [items, severityFilter, groupFilter, riskFilter, searchQuery, statusFilter, showReviewed, justRefined])

  const hiddenReviewedCount = useMemo(() => {
    if (statusFilter !== 'active' || showReviewed) return 0
    return items.filter((r) => r.status === 'pending' && (r.follow_ups?.length || 0) > 0 && !justRefined.has(r.id)).length
  }, [items, statusFilter, showReviewed, justRefined])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1
      if (b.status === 'pending' && a.status !== 'pending') return 1
      // Just-refined items float to the top within pending so the user sees
      // the effect of their follow-up immediately.
      const aRefined = justRefined.has(a.id)
      const bRefined = justRefined.has(b.id)
      if (aRefined && !bRefined) return -1
      if (bRefined && !aRefined) return 1
      const sev = SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]
      if (sev !== 0) return sev
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })
  }, [items])

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const markBusy = (id: string, on: boolean) => {
    setBusy((prev) => {
      const next = new Set(prev)
      if (on) next.add(id)
      else next.delete(id)
      return next
    })
  }

  const approve = async (rec: Recommendation) => {
    if (rec.risk_tier === 'high') {
      setConfirmHigh(rec)
      return
    }
    await doApprove(rec)
  }

  const doApprove = async (rec: Recommendation) => {
    markBusy(rec.id, true)
    try {
      const res = await fetch(`/api/admin/recommendations/${rec.id}/approve`, { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `approve ${res.status}`)
      if (data.auto_rejected) {
        toast.message('Auto-rejected — agent refused this rec', {
          description: data.result?.reason || data.result?.suggestion || 'See evidence drawer for details',
          duration: 8000,
        })
      } else if (data.ok) {
        toast.success('Executed')
      } else {
        toast.error(`Execution failed: ${data.result?.error || 'unknown'}`)
      }
      await fetchItems()
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    } finally {
      markBusy(rec.id, false)
      setConfirmHigh(null)
    }
  }

  const reject = async (rec: Recommendation) => {
    markBusy(rec.id, true)
    try {
      const res = await fetch(`/api/admin/recommendations/${rec.id}/reject`, { method: 'POST' })
      if (!res.ok) throw new Error(`reject ${res.status}`)
      toast.success('Rejected')
      await fetchItems()
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    } finally {
      markBusy(rec.id, false)
    }
  }

  const submitFollowUp = async (rec: Recommendation) => {
    if (!followUpNote.trim()) {
      toast.error('Note is required')
      return
    }
    markBusy(rec.id, true)
    try {
      const res = await fetch(`/api/admin/recommendations/${rec.id}/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note: followUpNote }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `follow-up ${res.status}`)
      if (data.auto_closed) {
        toast.success(`Auto-closed as false positive — "${(data.refined_title || '').slice(0, 60)}"`, { duration: 6000 })
      } else {
        toast.success(`Refined — new title: "${(data.refined_title || '').slice(0, 60)}${(data.refined_title || '').length > 60 ? '…' : ''}"`, { duration: 6000 })
      }
      setFollowUpOpen(null)
      setFollowUpNote('')
      // Mark as just-refined + auto-expand so the user sees Claude's update
      setJustRefined((prev) => new Set(prev).add(rec.id))
      setExpanded((prev) => new Set(prev).add(rec.id))
      await fetchItems()
    } catch (err: any) {
      toast.error(err.message || 'Failed')
    } finally {
      markBusy(rec.id, false)
    }
  }

  const categoryLabels: Record<string, string> = {
    ads_keyword: 'Ads · Keyword',
    ads_negative: 'Ads · Negative',
    ads_bid: 'Ads · Bid',
    ads_budget: 'Ads · Budget',
    seo_meta: 'SEO · Meta',
    seo_sitemap: 'SEO · Sitemap',
    seo_jsonld: 'SEO · Structured data',
    gbp_profile: 'GBP · Profile',
    gbp_reply: 'GBP · Review reply',
    gbp_post: 'GBP · Post',
    site_code: 'Site · Code',
  }

  return (
    <div className="p-6 max-w-[1100px] mx-auto">
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">AI Recommendations</h1>
            <p className="text-sm text-slate-500 mt-1">
              Findings from the weekly audit. Low-risk items auto-execute; others need your approval.
            </p>
          </div>
          <button
            onClick={() => fetchItems()}
            className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white hover:bg-slate-50 shrink-0"
          >
            Refresh
          </button>
        </div>

        {/* Filter toolbar */}
        <div className="bg-white border border-slate-200 rounded-lg p-3 flex flex-wrap gap-3 text-sm">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="border border-slate-300 rounded-md px-2 py-1 bg-white"
            >
              <option value="active">Active (hides acted-upon)</option>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="auto_executed">Auto-executed</option>
              <option value="executed">Executed</option>
              <option value="rejected">Rejected</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Severity</span>
            {ALL_SEVERITIES.map((s) => {
              const on = severityFilter.has(s)
              return (
                <button
                  key={s}
                  onClick={() => setSeverityFilter((prev) => {
                    const n = new Set(prev)
                    if (n.has(s)) n.delete(s)
                    else n.add(s)
                    return n
                  })}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
                    on ? severityColor(s) : 'bg-slate-50 text-slate-400 border border-slate-200'
                  }`}
                >
                  {s}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Platform</span>
            {Object.keys(CATEGORY_GROUPS).map((g) => {
              const on = groupFilter.has(g)
              return (
                <button
                  key={g}
                  onClick={() => setGroupFilter((prev) => {
                    const n = new Set(prev)
                    if (n.has(g)) n.delete(g)
                    else n.add(g)
                    return n
                  })}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors border ${
                    on ? 'bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/30' : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  {g}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Risk</span>
            {ALL_RISK_TIERS.map((r) => {
              const on = riskFilter.has(r)
              return (
                <button
                  key={r}
                  onClick={() => setRiskFilter((prev) => {
                    const n = new Set(prev)
                    if (n.has(r)) n.delete(r)
                    else n.add(r)
                    return n
                  })}
                  className={`px-2 py-1 rounded text-xs font-semibold transition-colors border ${
                    on ? riskColor(r) : 'bg-slate-50 text-slate-400 border-slate-200'
                  }`}
                >
                  {r}
                </button>
              )
            })}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search title, summary, check id…"
            className="flex-1 min-w-[180px] border border-slate-300 rounded-md px-3 py-1 bg-white text-sm"
          />

          {(severityFilter.size < ALL_SEVERITIES.length ||
            groupFilter.size < Object.keys(CATEGORY_GROUPS).length ||
            riskFilter.size < ALL_RISK_TIERS.length ||
            searchQuery) && (
            <button
              onClick={() => {
                setSeverityFilter(new Set(ALL_SEVERITIES))
                setGroupFilter(new Set(Object.keys(CATEGORY_GROUPS)))
                setRiskFilter(new Set(ALL_RISK_TIERS))
                setSearchQuery('')
              }}
              className="text-xs text-slate-500 hover:text-slate-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {items.length > 0 && (
          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
            <span>
              Showing {sorted.length} of {items.length}
              {items.length !== sorted.length && ' (filtered)'}
            </span>
            {hiddenReviewedCount > 0 && (
              <button
                onClick={() => setShowReviewed(true)}
                className="text-amber-700 hover:text-amber-900 underline underline-offset-2 font-medium"
              >
                + {hiddenReviewedCount} reviewed item{hiddenReviewedCount === 1 ? '' : 's'} hidden — show
              </button>
            )}
            {showReviewed && statusFilter === 'active' && (
              <button
                onClick={() => setShowReviewed(false)}
                className="text-slate-500 hover:text-slate-700 underline underline-offset-2"
              >
                hide reviewed again
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-sm text-slate-500 py-12 text-center">Loading…</div>
      ) : sorted.length === 0 ? (
        <div className="text-sm text-slate-500 py-12 text-center border border-dashed border-slate-200 rounded-lg">
          {statusFilter === 'active' ? 'No pending recommendations. You\'re all caught up.' : 'Nothing to show.'}
        </div>
      ) : (
        <div className="space-y-3">
          {sorted.map((rec) => {
            const isOpen = expanded.has(rec.id)
            const isBusy = busy.has(rec.id)
            const isJustRefined = justRefined.has(rec.id)
            const followUpCount = rec.follow_ups?.length || 0
            return (
              <div
                key={rec.id}
                className={`bg-white rounded-lg border overflow-hidden transition-colors ${
                  isJustRefined ? 'border-amber-400 ring-2 ring-amber-200' : 'border-slate-200'
                }`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${severityColor(rec.severity)}`}>
                          {rec.severity.toUpperCase()}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${riskColor(rec.risk_tier)}`}>
                          {rec.risk_tier} risk
                        </span>
                        <span className="text-[11px] text-slate-500">
                          {categoryLabels[rec.category] || rec.category}
                        </span>
                        {rec.status !== 'pending' && (
                          <span className="text-[11px] text-slate-500 italic">· {rec.status.replace('_', ' ')}</span>
                        )}
                        {followUpCount > 0 && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                            ✓ Refined × {followUpCount}
                          </span>
                        )}
                        {isJustRefined && (
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500 text-white animate-pulse">
                            just updated
                          </span>
                        )}
                      </div>
                      <h3 className="text-[15px] font-semibold text-slate-900 mb-1">{rec.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{rec.summary_md}</p>
                      {rec.expected_impact && (
                        <p className="text-xs text-slate-500 mt-2 italic">→ {rec.expected_impact}</p>
                      )}
                    </div>

                    {rec.status === 'pending' && (
                      <div className="flex flex-col gap-1.5 flex-shrink-0 min-w-[110px]">
                        <button
                          onClick={() => approve(rec)}
                          disabled={isBusy}
                          className="bg-[#0891B2] hover:bg-[#06B6D4] disabled:opacity-50 text-white text-sm font-medium px-4 py-1.5 rounded-md transition-colors"
                          title={rec.action_type === 'manual' ? 'Mark this rec as handled — no automated action will run' : 'Approve and execute this rec'}
                        >
                          {isBusy ? '…' : (rec.action_type === 'manual' ? 'Mark done' : 'Approve')}
                        </button>
                        <button
                          onClick={() => { setFollowUpOpen(rec); setFollowUpNote('') }}
                          disabled={isBusy}
                          className="border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-sm font-medium px-4 py-1.5 rounded-md"
                        >
                          Follow-up
                        </button>
                        <button
                          onClick={() => reject(rec)}
                          disabled={isBusy}
                          className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-1.5 rounded-md"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 flex items-center gap-4 text-xs text-slate-500">
                    <button
                      onClick={() => toggleExpand(rec.id)}
                      className="hover:text-slate-700 underline-offset-2 hover:underline"
                    >
                      {isOpen ? 'Hide evidence' : 'Show evidence'}
                    </button>
                    <span>check: <code className="bg-slate-100 px-1 rounded">{rec.check_id}</code></span>
                    <span>{new Date(rec.created_at).toLocaleString()}</span>
                    {rec.failure_count > 0 && (
                      <span className="text-red-600">{rec.failure_count} failed attempts</span>
                    )}
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-slate-200 bg-slate-50 p-4">
                    {rec.follow_ups && rec.follow_ups.length > 0 && (
                      <div className="mb-4">
                        <div className="font-semibold text-slate-700 mb-2 text-xs">Follow-up history ({rec.follow_ups.length})</div>
                        <div className="space-y-2">
                          {rec.follow_ups.map((f, i) => (
                            <div key={i} className="bg-white border border-amber-200 rounded p-3 text-xs">
                              <div className="text-slate-500 mb-1">
                                {new Date(f.created_at).toLocaleString()}
                                {f.invoked_by ? ` · ${f.invoked_by}` : ''}
                                {f.model ? ` · ${f.model}` : ''}
                              </div>
                              <div className="mb-2">
                                <span className="font-semibold text-slate-700">Note:</span>
                                <div className="text-slate-600 whitespace-pre-wrap">{f.note}</div>
                              </div>
                              <div className="border-t border-slate-100 pt-2">
                                <span className="font-semibold text-slate-700">Refined:</span>
                                <div className="text-slate-600">{f.refined_title}</div>
                                <div className="text-slate-500 mt-1">{f.refined_summary_md}</div>
                                {f.refined_impact && <div className="text-slate-500 italic mt-1">→ {f.refined_impact}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <div className="font-semibold text-slate-700 mb-1.5">Evidence</div>
                        <pre className="bg-white border border-slate-200 rounded p-2 overflow-x-auto text-[11px] leading-relaxed">
                          {JSON.stringify(rec.evidence, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <div className="font-semibold text-slate-700 mb-1.5">Action ({rec.action_type})</div>
                        <pre className="bg-white border border-slate-200 rounded p-2 overflow-x-auto text-[11px] leading-relaxed">
                          {JSON.stringify(rec.action_payload, null, 2)}
                        </pre>
                        {rec.execution_result && (
                          <>
                            <div className="font-semibold text-slate-700 mt-3 mb-1.5">Execution result</div>
                            <pre className="bg-white border border-slate-200 rounded p-2 overflow-x-auto text-[11px] leading-relaxed">
                              {JSON.stringify(rec.execution_result, null, 2)}
                            </pre>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Follow-up modal */}
      {followUpOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Add follow-up note</h3>
            <p className="text-sm text-slate-600 mb-4">
              Send context back to the agent — evidence I missed, clarification on the check&apos;s premise, steps you&apos;ve already taken, or why this is a false positive. Claude will rewrite the recommendation to account for your input. If the note shows the issue is resolved or the check was wrong, the rec will auto-close.
            </p>
            <div className="border border-slate-200 rounded p-3 bg-slate-50 mb-4">
              <div className="font-semibold text-sm text-slate-900">{followUpOpen.title}</div>
              <div className="text-xs text-slate-600 mt-1">{followUpOpen.summary_md}</div>
            </div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Your note</label>
            <textarea
              value={followUpNote}
              onChange={(e) => setFollowUpNote(e.target.value)}
              rows={6}
              placeholder="e.g. The check is looking for `generate_lead` events but our real conversion event in GA4 is named `quote_lead`. Re-check against that instead."
              className="w-full border border-slate-300 rounded-md p-2 text-sm font-mono"
              autoFocus
            />
            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={() => { setFollowUpOpen(null); setFollowUpNote('') }}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-1.5 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => submitFollowUp(followUpOpen)}
                disabled={!followUpNote.trim() || busy.has(followUpOpen.id)}
                className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
              >
                {busy.has(followUpOpen.id) ? '…' : 'Send to agent'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm dialog for HIGH risk */}
      {confirmHigh && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-red-800 mb-2">Confirm high-risk change</h3>
            <p className="text-sm text-slate-700 mb-4">
              This recommendation is flagged <strong>high risk</strong>:
            </p>
            <div className="border border-slate-200 rounded p-3 bg-slate-50 mb-4">
              <div className="font-semibold text-sm text-slate-900">{confirmHigh.title}</div>
              <div className="text-xs text-slate-600 mt-1">{confirmHigh.summary_md}</div>
            </div>
            <p className="text-sm text-slate-600 mb-5">
              Proceeding will execute this change immediately. Are you sure?
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setConfirmHigh(null)}
                className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium px-4 py-1.5 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => doApprove(confirmHigh)}
                disabled={busy.has(confirmHigh.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-1.5 rounded-md"
              >
                {busy.has(confirmHigh.id) ? '…' : 'Yes, execute'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
