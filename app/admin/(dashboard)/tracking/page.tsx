'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import Modal from '@/components/admin/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { PIXEL_TYPES } from '@/lib/admin/pixel-templates';
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight, Code2, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface TrackingPixel {
  id: string;
  name: string;
  type: string;
  pixel_id: string | null;
  custom_head_code: string | null;
  custom_body_code: string | null;
  placement: string;
  is_active: boolean;
  description: string | null;
  sort_order: number;
}

const emptyForm = {
  name: '', type: 'google_analytics', pixel_id: '', custom_head_code: '',
  custom_body_code: '', placement: 'head', description: '', is_active: true,
};

// Template cards for quick selection
const TEMPLATES = [
  { type: 'google_analytics', label: 'Google Analytics 4', color: 'bg-orange-50 border-orange-200', idLabel: 'Measurement ID', placeholder: 'G-XXXXXXXXXX' },
  { type: 'google_tag_manager', label: 'Google Tag Manager', color: 'bg-blue-50 border-blue-200', idLabel: 'Container ID', placeholder: 'GTM-XXXXXXX' },
  { type: 'meta_pixel', label: 'Meta Pixel (Facebook)', color: 'bg-indigo-50 border-indigo-200', idLabel: 'Pixel ID', placeholder: '123456789' },
  { type: 'linkedin', label: 'LinkedIn Insight Tag', color: 'bg-sky-50 border-sky-200', idLabel: 'Partner ID', placeholder: '123456' },
  { type: 'hubspot', label: 'HubSpot Tracking Code', color: 'bg-orange-50 border-orange-200', idLabel: 'Hub ID', placeholder: '12345678' },
  { type: 'custom', label: 'Custom Script', color: 'bg-gray-50 border-gray-200', idLabel: '', placeholder: '' },
];

export default function TrackingPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [pixels, setPixels] = useState<TrackingPixel[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editPixel, setEditPixel] = useState<TrackingPixel | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'form'>('select');
  const [previewOpen, setPreviewOpen] = useState(false);

  const canCreate = hasPermission(adminUser!.role, 'tracking_pixels', 'create');
  const canDelete = hasPermission(adminUser!.role, 'tracking_pixels', 'delete');

  async function fetchPixels() {
    setLoading(true);
    const res = await adminFetch('/api/admin/tracking');
    if (res.ok) setPixels(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchPixels(); }, [adminFetch]);

  function openNew() {
    setEditPixel(null);
    setFormData(emptyForm);
    setAdvancedOpen(false);
    setStep('select');
    setModalOpen(true);
  }

  function selectTemplate(type: string) {
    const template = TEMPLATES.find(t => t.type === type);
    setFormData({
      ...emptyForm,
      type,
      name: template?.label ? `${template.label} - Main Site` : '',
    });
    setStep('form');
  }

  function openEdit(pixel: TrackingPixel) {
    setEditPixel(pixel);
    setFormData({
      name: pixel.name,
      type: pixel.type,
      pixel_id: pixel.pixel_id || '',
      custom_head_code: pixel.custom_head_code || '',
      custom_body_code: pixel.custom_body_code || '',
      placement: pixel.placement,
      description: pixel.description || '',
      is_active: pixel.is_active,
    });
    setAdvancedOpen(!!(pixel.custom_head_code || pixel.custom_body_code));
    setStep('form');
    setModalOpen(true);
  }

  async function handleSave() {
    if (!formData.name.trim()) { toast.error('Name is required'); return; }

    const url = editPixel ? `/api/admin/tracking/${editPixel.id}` : '/api/admin/tracking';
    const method = editPixel ? 'PATCH' : 'POST';

    const res = await adminFetch(url, { method, body: JSON.stringify(formData) });
    if (res.ok) {
      toast.success(editPixel ? 'Pixel updated' : 'Pixel created');
      setModalOpen(false);
      fetchPixels();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  }

  async function handleToggle(pixel: TrackingPixel) {
    const res = await adminFetch(`/api/admin/tracking/${pixel.id}`, {
      method: 'PATCH',
      body: JSON.stringify({ is_active: !pixel.is_active }),
    });
    if (res.ok) {
      toast.success(`${pixel.name} ${pixel.is_active ? 'disabled' : 'enabled'}`);
      fetchPixels();
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/tracking/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Pixel deleted');
      fetchPixels();
    } else {
      toast.error('Failed to delete');
    }
    setDeleteId(null);
  }

  const isCustom = formData.type === 'custom';
  const typeInfo = PIXEL_TYPES.find((t) => t.value === formData.type);
  const templateInfo = TEMPLATES.find(t => t.type === formData.type);

  // Generate preview code
  function getPreviewCode() {
    if (isCustom) return formData.custom_head_code || formData.custom_body_code || 'No custom code entered';
    if (!formData.pixel_id) return 'Enter a tracking ID to see the generated code';
    // Simplified preview
    switch (formData.type) {
      case 'google_analytics':
        return `<!-- Google Analytics -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${formData.pixel_id}"></script>\n<script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag(){dataLayer.push(arguments);}\n  gtag('js', new Date());\n  gtag('config', '${formData.pixel_id}');\n</script>`;
      case 'google_tag_manager':
        return `<!-- Google Tag Manager -->\n<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':\nnew Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],\nj=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=\n'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);\n})(window,document,'script','dataLayer','${formData.pixel_id}');</script>`;
      case 'meta_pixel':
        return `<!-- Meta Pixel -->\n<script>\n!function(f,b,e,v,n,t,s){...}(window, document,'script',\n'https://connect.facebook.net/en_US/fbevents.js');\nfbq('init', '${formData.pixel_id}');\nfbq('track', 'PageView');\n</script>`;
      default:
        return `<!-- ${templateInfo?.label || formData.type} -->\n<!-- Tracking ID: ${formData.pixel_id} -->`;
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Tracking Pixels</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage tracking scripts and analytics</p>
        </div>
        {canCreate && (
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Tracking Pixel
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2].map(i => (
            <div key={i} className="bg-white rounded-lg border border-[#e2e8f0] p-5 animate-pulse">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-gray-200 mt-1.5" />
                <div className="flex-1">
                  <div className="h-5 w-40 bg-gray-200 rounded" />
                  <div className="h-3 w-24 bg-gray-100 rounded mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : pixels.length === 0 ? (
        <div className="bg-white rounded-lg border border-[#e2e8f0] p-16 text-center">
          <Code2 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-500">No tracking pixels configured</p>
          <p className="text-xs text-gray-400 mt-1">Add tracking scripts to monitor your site analytics</p>
          {canCreate && (
            <button
              onClick={openNew}
              className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#0d9488] hover:text-[#0f766e]"
            >
              <Plus className="w-4 h-4" /> Add Tracking Pixel
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pixels.map((pixel) => (
            <div key={pixel.id} className="bg-white rounded-lg border border-[#e2e8f0] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${pixel.is_active ? 'bg-[#16a34a]' : 'bg-red-400'}`} />
                  <div>
                    <h3 className="font-semibold text-gray-900">{pixel.name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {PIXEL_TYPES.find((t) => t.value === pixel.type)?.label || pixel.type}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggle(pixel)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    pixel.is_active ? 'bg-[#16a34a]' : 'bg-gray-300'
                  }`}
                >
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${
                    pixel.is_active ? 'translate-x-4' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {pixel.pixel_id && (
                  <p>ID: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs font-mono">{pixel.pixel_id}</code></p>
                )}
                <p>Placement: {pixel.placement}</p>
              </div>

              {pixel.description && (
                <p className="mt-2 text-xs text-gray-400">{pixel.description}</p>
              )}

              <div className="mt-4 pt-3 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => openEdit(pixel)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-[#0d9488] hover:bg-gray-50 rounded-md transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                {canDelete && (
                  <button
                    onClick={() => { setDeleteId(pixel.id); setDeleteName(pixel.name); }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editPixel ? 'Edit Tracking Pixel' : step === 'select' ? 'Choose Tracking Type' : 'Add Tracking Pixel'}
        maxWidth="max-w-xl"
      >
        {step === 'select' && !editPixel ? (
          /* Template selection step */
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">Select a tracking service to get started:</p>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map(template => (
                <button
                  key={template.type}
                  onClick={() => selectTemplate(template.type)}
                  className={`text-left p-4 rounded-lg border ${template.color} hover:shadow-md transition-all`}
                >
                  <p className="font-medium text-sm text-gray-900">{template.label}</p>
                  {template.idLabel && (
                    <p className="text-xs text-gray-500 mt-1">Requires: {template.idLabel}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Form step */
          <div className="space-y-4">
            {!editPixel && (
              <button
                onClick={() => setStep('select')}
                className="text-xs text-[#0d9488] hover:text-[#0f766e] font-medium"
              >
                &larr; Back to type selection
              </button>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value, pixel_id: '', custom_head_code: '', custom_body_code: '' })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
              >
                {PIXEL_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                placeholder={`e.g. ${typeInfo?.label || 'Custom'} - Main Site`}
              />
            </div>

            {!isCustom && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {templateInfo?.idLabel || 'Pixel / Tracking ID'}
                </label>
                <input
                  type="text"
                  value={formData.pixel_id}
                  onChange={(e) => setFormData({ ...formData, pixel_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm font-mono"
                  placeholder={templateInfo?.placeholder || typeInfo?.placeholder}
                />
              </div>
            )}

            {isCustom && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Head Code</label>
                  <textarea
                    value={formData.custom_head_code}
                    onChange={(e) => setFormData({ ...formData, custom_head_code: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm font-mono resize-none"
                    placeholder="<script>...</script>"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Body Code</label>
                  <textarea
                    value={formData.custom_body_code}
                    onChange={(e) => setFormData({ ...formData, custom_body_code: e.target.value })}
                    rows={5}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm font-mono resize-none"
                    placeholder="<script>...</script>"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Placement</label>
              <select
                value={formData.placement}
                onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
              >
                <option value="head">Head</option>
                <option value="body">Body</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (internal notes)</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none"
              />
            </div>

            {/* Code Preview */}
            <div>
              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
              >
                <Eye className="w-4 h-4" />
                {previewOpen ? 'Hide' : 'Show'} Generated Code Preview
              </button>
              {previewOpen && (
                <pre className="mt-2 p-3 bg-gray-900 text-green-400 text-xs rounded-md overflow-x-auto">
                  {getPreviewCode()}
                </pre>
              )}
            </div>

            {/* Advanced: custom code override for structured types */}
            {!isCustom && (
              <div>
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  {advancedOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  Advanced: Custom Code Override
                </button>
                {advancedOpen && (
                  <div className="mt-2 space-y-3 pl-5 border-l-2 border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Custom Head Code</label>
                      <textarea
                        value={formData.custom_head_code}
                        onChange={(e) => setFormData({ ...formData, custom_head_code: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs font-mono resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Custom Body Code</label>
                      <textarea
                        value={formData.custom_body_code}
                        onChange={(e) => setFormData({ ...formData, custom_body_code: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-md text-xs font-mono resize-none"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
                Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#0d9488] rounded-md hover:bg-[#0f766e]">
                {editPixel ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Tracking Pixel"
        message={`Are you sure you want to delete '${deleteName}'? This will remove the tracking script from your site.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
