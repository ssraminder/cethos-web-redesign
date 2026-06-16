'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import { Briefcase, Download, ChevronDown, ChevronRight, ShieldAlert, ExternalLink } from 'lucide-react';
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Application {
  id: string;
  created_at: string;
  role_slug: string;
  role_title: string | null;
  full_name: string;
  email: string;
  phone: string | null;
  city: string | null;
  country: string;
  linkedin_url: string | null;
  years_experience: string;
  resume_path: string | null;
  screening_experience: string;
  screening_hours: string;
  expected_comp_amount: number | null;
  expected_comp_currency: string | null;
  writing_sample: string;
  how_heard: string | null;
  additional_notes: string | null;
  status: string;
}

export default function EmploymentApplicationsPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const canRead = adminUser ? hasPermission(adminUser.role, 'employment_applications', 'read') : false;

  useEffect(() => {
    if (!canRead) {
      setLoading(false);
      return;
    }
    (async () => {
      setLoading(true);
      try {
        const res = await adminFetch('/api/admin/employment-applications');
        if (res.ok) {
          const data = await res.json();
          setApplications(data.applications || []);
        } else {
          toast.error('Failed to load applications');
        }
      } catch {
        toast.error('Failed to load applications');
      }
      setLoading(false);
    })();
  }, [adminFetch, canRead]);

  async function downloadResume(id: string, name: string) {
    try {
      const res = await adminFetch(`/api/admin/employment-applications/${id}/resume`);
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        toast.error(err.error || 'Could not open CV');
        return;
      }
      const { url } = await res.json();
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      toast.error(`Could not open CV for ${name}`);
    }
  }

  // Defence in depth: the sidebar already hides this for non-super-admins and the
  // API enforces the role, but block direct navigation to the URL too.
  if (!loading && !canRead) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <ShieldAlert className="w-10 h-10 text-amber-500 mb-3" />
        <h1 className="text-lg font-semibold text-gray-800">Access restricted</h1>
        <p className="text-gray-500 text-sm mt-1">Employment applications are visible to super admins only.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <Briefcase className="w-6 h-6 text-cethos-teal" />
        <h1 className="text-2xl font-bold text-gray-900">Employment Applications</h1>
      </div>
      <p className="text-gray-500 text-sm mb-6">
        Full-time staff applications submitted via the Careers section. Super admin only.
      </p>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-2 border-cethos-teal border-t-transparent rounded-full animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-xl py-20 text-center">
          <Briefcase className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-medium">No applications yet</p>
          <p className="text-gray-400 text-sm mt-1">
            New full-time applications from the Careers form will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600 text-left">
              <tr>
                <th className="px-4 py-3 font-medium w-8"></th>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Location</th>
                <th className="px-4 py-3 font-medium">Experience</th>
                <th className="px-4 py-3 font-medium">Expected</th>
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium">CV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <Fragment key={app.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 align-top">
                      <button
                        onClick={() => setExpanded(expanded === app.id ? null : app.id)}
                        className="text-gray-400 hover:text-gray-700"
                        aria-label="Toggle details"
                      >
                        {expanded === app.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <div className="font-medium text-gray-900">{app.full_name}</div>
                      <a href={`mailto:${app.email}`} className="text-cethos-teal hover:underline">{app.email}</a>
                      {app.phone && <div className="text-gray-500">{app.phone}</div>}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">{app.role_title || app.role_slug}</td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {[app.city, app.country].filter(Boolean).join(', ')}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-700">{app.years_experience}</td>
                    <td className="px-4 py-3 align-top text-gray-700">
                      {app.expected_comp_amount != null
                        ? `${app.expected_comp_amount.toLocaleString()} ${app.expected_comp_currency || ''}`.trim()
                        : '—'}
                    </td>
                    <td className="px-4 py-3 align-top text-gray-500 whitespace-nowrap">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 align-top">
                      {app.resume_path ? (
                        <button
                          onClick={() => downloadResume(app.id, app.full_name)}
                          className="inline-flex items-center gap-1 text-cethos-teal hover:underline"
                        >
                          <Download className="w-4 h-4" /> CV
                        </button>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                  {expanded === app.id && (
                    <tr className="bg-gray-50/60">
                      <td></td>
                      <td colSpan={7} className="px-4 py-4 space-y-3 text-gray-700">
                        {app.linkedin_url && (
                          <p>
                            <span className="font-medium text-gray-900">LinkedIn: </span>
                            <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-cethos-teal hover:underline inline-flex items-center gap-1">
                              {app.linkedin_url} <ExternalLink className="w-3 h-3" />
                            </a>
                          </p>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">Relevant experience</p>
                          <p className="whitespace-pre-wrap">{app.screening_experience}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Shifted-hours availability</p>
                          <p className="whitespace-pre-wrap">{app.screening_hours}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Writing sample / link</p>
                          <p className="whitespace-pre-wrap break-words">{app.writing_sample}</p>
                        </div>
                        {app.how_heard && (
                          <p><span className="font-medium text-gray-900">How they heard: </span>{app.how_heard}</p>
                        )}
                        {app.additional_notes && (
                          <div>
                            <p className="font-medium text-gray-900">Additional notes</p>
                            <p className="whitespace-pre-wrap">{app.additional_notes}</p>
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
