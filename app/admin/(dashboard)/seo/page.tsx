'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import Badge from '@/components/admin/Badge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Pencil, Trash2, ChevronDown, ChevronUp, X, Save } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface SeoSetting {
  id: string;
  page_path: string;
  page_name: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  canonical_url: string | null;
  robots: string;
  schema_markup: unknown | null;
  priority: number;
  change_frequency: string | null;
  exclude_from_sitemap: boolean;
}

const emptyForm: Partial<SeoSetting> = {
  page_path: '', page_name: '', meta_title: '', meta_description: '',
  og_title: '', og_description: '', og_image: '', canonical_url: '',
  robots: 'index, follow', priority: 0.5, change_frequency: 'weekly',
  exclude_from_sitemap: false,
};

export default function SeoPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [settings, setSettings] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SeoSetting>>(emptyForm);
  const [addMode, setAddMode] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const canCreate = hasPermission(adminUser!.role, 'seo_settings', 'create');
  const canDelete = hasPermission(adminUser!.role, 'seo_settings', 'delete');

  async function fetchSettings() {
    setLoading(true);
    const res = await adminFetch('/api/admin/seo');
    if (res.ok) setSettings(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchSettings(); }, [adminFetch]);

  function openEdit(seo: SeoSetting) {
    if (expandedId === seo.id) {
      setExpandedId(null);
      return;
    }
    setExpandedId(seo.id);
    setEditData({
      page_path: seo.page_path,
      page_name: seo.page_name || '',
      meta_title: seo.meta_title || '',
      meta_description: seo.meta_description || '',
      og_title: seo.og_title || '',
      og_description: seo.og_description || '',
      og_image: seo.og_image || '',
      canonical_url: seo.canonical_url || '',
      robots: seo.robots || 'index, follow',
      priority: seo.priority ?? 0.5,
      change_frequency: seo.change_frequency || 'weekly',
      exclude_from_sitemap: seo.exclude_from_sitemap || false,
    });
  }

  async function handleSave(id?: string) {
    setSaving(true);
    const isNew = !id;
    const url = isNew ? '/api/admin/seo' : `/api/admin/seo/${id}`;
    const method = isNew ? 'POST' : 'PATCH';

    const res = await adminFetch(url, { method, body: JSON.stringify(editData) });
    setSaving(false);

    if (res.ok) {
      toast.success(isNew ? 'Page added' : 'Settings updated');
      setExpandedId(null);
      setAddMode(false);
      fetchSettings();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/seo/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('SEO setting deleted');
      fetchSettings();
    } else {
      toast.error('Failed to delete');
    }
    setDeleteId(null);
  }

  function titleLengthColor(len: number) {
    if (len === 0) return 'text-gray-400';
    if (len >= 50 && len <= 60) return 'text-green-600';
    if (len > 60) return 'text-red-500';
    return 'text-yellow-600';
  }

  function descLengthColor(len: number) {
    if (len === 0) return 'text-gray-400';
    if (len >= 150 && len <= 160) return 'text-green-600';
    if (len > 160) return 'text-red-500';
    return 'text-yellow-600';
  }

  const serpTitle = editData.meta_title || editData.page_name || 'Page Title';
  const serpDesc = editData.meta_description || 'Add a meta description for this page...';
  const serpUrl = `https://cethos.com${editData.page_path || '/'}`;

  function renderEditForm(id?: string) {
    return (
      <div className="p-5 space-y-4 border-t border-gray-100 bg-gray-50/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Path *</label>
            <input
              type="text"
              value={editData.page_path || ''}
              onChange={(e) => setEditData({ ...editData, page_path: e.target.value })}
              readOnly={!!id}
              className={`w-full px-3 py-2 border border-gray-200 rounded-lg text-sm ${id ? 'bg-gray-100 text-gray-500' : ''}`}
              placeholder="/about"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Name</label>
            <input
              type="text"
              value={editData.page_name || ''}
              onChange={(e) => setEditData({ ...editData, page_name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="About Us"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Meta Title</label>
            <span className={`text-xs ${titleLengthColor(editData.meta_title?.length || 0)}`}>
              {editData.meta_title?.length || 0}/60
            </span>
          </div>
          <input
            type="text"
            value={editData.meta_title || ''}
            onChange={(e) => setEditData({ ...editData, meta_title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Meta Description</label>
            <span className={`text-xs ${descLengthColor(editData.meta_description?.length || 0)}`}>
              {editData.meta_description?.length || 0}/160
            </span>
          </div>
          <textarea
            value={editData.meta_description || ''}
            onChange={(e) => setEditData({ ...editData, meta_description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
            <input
              type="text"
              value={editData.og_title || ''}
              onChange={(e) => setEditData({ ...editData, og_title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Falls back to meta title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
            <input
              type="url"
              value={editData.og_image || ''}
              onChange={(e) => setEditData({ ...editData, og_image: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
          <textarea
            value={editData.og_description || ''}
            onChange={(e) => setEditData({ ...editData, og_description: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
            placeholder="Falls back to meta description"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
            <input
              type="url"
              value={editData.canonical_url || ''}
              onChange={(e) => setEditData({ ...editData, canonical_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Robots</label>
            <select
              value={editData.robots || 'index, follow'}
              onChange={(e) => setEditData({ ...editData, robots: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Change Frequency</label>
            <select
              value={editData.change_frequency || 'weekly'}
              onChange={(e) => setEditData({ ...editData, change_frequency: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
            >
              <option value="always">Always</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitemap Priority</label>
            <input
              type="number"
              min="0" max="1" step="0.1"
              value={editData.priority ?? 0.5}
              onChange={(e) => setEditData({ ...editData, priority: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div className="flex items-center gap-2 pt-6">
            <input
              type="checkbox"
              id="exclude-sitemap"
              checked={editData.exclude_from_sitemap || false}
              onChange={(e) => setEditData({ ...editData, exclude_from_sitemap: e.target.checked })}
              className="rounded border-gray-300"
            />
            <label htmlFor="exclude-sitemap" className="text-sm text-gray-700">Exclude from sitemap</label>
          </div>
        </div>

        {/* SERP Preview */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Google SERP Preview</label>
          <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <p className="text-lg text-blue-800 hover:underline cursor-pointer truncate" style={{ fontFamily: 'Arial, sans-serif' }}>
              {serpTitle.length > 60 ? serpTitle.slice(0, 60) + '...' : serpTitle}
            </p>
            <p className="text-sm text-green-800 mt-0.5" style={{ fontFamily: 'Arial, sans-serif' }}>
              {serpUrl}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              {serpDesc.length > 160 ? serpDesc.slice(0, 160) + '...' : serpDesc}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => { setExpandedId(null); setAddMode(false); }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={() => handleSave(id)}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cethos-teal rounded-lg hover:bg-cethos-teal-light disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Manage meta tags and search engine settings per page</p>
        </div>
        {canCreate && (
          <button
            onClick={() => { setAddMode(true); setExpandedId(null); setEditData({ ...emptyForm }); }}
            className="inline-flex items-center gap-2 bg-cethos-teal hover:bg-cethos-teal-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Page
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Add new row */}
        {addMode && (
          <div className="border-b border-gray-200">
            <div className="px-5 py-4 bg-blue-50/50">
              <h3 className="text-sm font-medium text-gray-900">Add New Page SEO Settings</h3>
            </div>
            {renderEditForm()}
          </div>
        )}

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Page Path</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Page Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Meta Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-24">Robots</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : settings.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">No SEO settings configured</td></tr>
            ) : (
              settings.map((seo) => (
                <tr key={seo.id} className="group">
                  <td colSpan={5} className="p-0">
                    <div className="flex items-center hover:bg-gray-50/50">
                      <div className="flex-1 grid grid-cols-5 items-center">
                        <div className="px-4 py-3">
                          <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{seo.page_path}</code>
                        </div>
                        <div className="px-4 py-3 text-gray-600">{seo.page_name || '-'}</div>
                        <div className="px-4 py-3 text-gray-600 truncate max-w-xs">{seo.meta_title || '-'}</div>
                        <div className="px-4 py-3">
                          <Badge variant={seo.robots?.includes('noindex') ? 'warning' : 'success'}>
                            {seo.robots || 'index, follow'}
                          </Badge>
                        </div>
                        <div className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEdit(seo)}
                              className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-cethos-teal"
                            >
                              {expandedId === seo.id ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                            </button>
                            {canDelete && (
                              <button
                                onClick={() => setDeleteId(seo.id)}
                                className="p-1.5 hover:bg-red-50 rounded text-gray-500 hover:text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {expandedId === seo.id && renderEditForm(seo.id)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete SEO Settings"
        message="Are you sure? This will remove SEO settings for this page."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
