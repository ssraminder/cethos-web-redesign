'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import Modal from '@/components/admin/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import Badge from '@/components/admin/Badge';
import { Plus, Pencil, Trash2, ArrowLeftRight, AlertTriangle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  type: '301' | '302';
  created_at: string;
}

const emptyForm: { from_path: string; to_path: string; type: string } = { from_path: '', to_path: '', type: '301' };

export default function RedirectsPage() {
  const { adminFetch } = useAdmin();
  const [redirects, setRedirects] = useState<Redirect[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editRedirect, setEditRedirect] = useState<Redirect | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loopWarning, setLoopWarning] = useState('');

  async function fetchRedirects() {
    setLoading(true);
    try {
      const res = await adminFetch('/api/admin/redirects');
      if (res.ok) {
        const data = await res.json();
        setRedirects(data.redirects || []);
      }
    } catch {
      setRedirects([]);
    }
    setLoading(false);
  }

  useEffect(() => { fetchRedirects(); }, [adminFetch]);

  function openNew() {
    setEditRedirect(null);
    setFormData(emptyForm);
    setLoopWarning('');
    setModalOpen(true);
  }

  function openEdit(redirect: Redirect) {
    setEditRedirect(redirect);
    setFormData({ from_path: redirect.from_path, to_path: redirect.to_path, type: redirect.type as string });
    setLoopWarning('');
    setModalOpen(true);
  }

  // Detect redirect loops
  function checkLoop(from: string, to: string) {
    if (from === to) {
      setLoopWarning('Warning: From and To paths are the same. This will create an infinite redirect loop.');
      return;
    }
    const existingTo = redirects.find(r => r.from_path === to && r.id !== editRedirect?.id);
    if (existingTo) {
      setLoopWarning(`Warning: A redirect from '${to}' already exists. This may create a redirect chain.`);
      return;
    }
    setLoopWarning('');
  }

  async function handleSave() {
    if (!formData.from_path.trim()) { toast.error('From path is required'); return; }
    if (!formData.to_path.trim()) { toast.error('To path is required'); return; }

    const url = editRedirect ? `/api/admin/redirects/${editRedirect.id}` : '/api/admin/redirects';
    const method = editRedirect ? 'PATCH' : 'POST';

    const res = await adminFetch(url, { method, body: JSON.stringify(formData) });
    if (res.ok) {
      toast.success(editRedirect ? 'Redirect updated' : 'Redirect created');
      setModalOpen(false);
      fetchRedirects();
    } else {
      toast.error('Failed to save redirect');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/redirects/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Redirect deleted');
      fetchRedirects();
    } else {
      toast.error('Failed to delete');
    }
    setDeleteId(null);
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    const promises = Array.from(selected).map(id =>
      adminFetch(`/api/admin/redirects/${id}`, { method: 'DELETE' })
    );
    await Promise.all(promises);
    toast.success(`${selected.size} redirects deleted`);
    setSelected(new Set());
    fetchRedirects();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Redirects</h1>
          <p className="text-sm text-[#64748b] mt-1">Manage URL redirect rules</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Redirect
        </button>
      </div>

      {/* Bulk actions */}
      {selected.size > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center justify-between">
          <span className="text-sm text-blue-700">{selected.size} selected</span>
          <button onClick={handleBulkDelete} className="text-sm text-red-600 hover:text-red-700 font-medium">
            Delete Selected
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="w-10 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selected.size === redirects.length && redirects.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) setSelected(new Set(redirects.map(r => r.id)));
                    else setSelected(new Set());
                  }}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">From Path</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">To Path</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-24">Type</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Created</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><div className="w-4 h-4 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-32 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-32 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-5 w-10 bg-gray-100 rounded-full animate-pulse" /></td>
                  <td className="px-4 py-3"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                  <td className="px-4 py-3" />
                </tr>
              ))
            ) : redirects.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center">
                  <ArrowLeftRight className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">No redirects configured</p>
                  <p className="text-xs text-gray-400 mt-1">Add redirect rules to manage URL changes</p>
                  <button
                    onClick={openNew}
                    className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#0d9488] hover:text-[#0f766e]"
                  >
                    <Plus className="w-4 h-4" /> Add Redirect
                  </button>
                </td>
              </tr>
            ) : (
              redirects.map((redirect) => (
                <tr key={redirect.id} className="hover:bg-[#f8fafc]">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(redirect.id)}
                      onChange={(e) => {
                        const next = new Set(selected);
                        e.target.checked ? next.add(redirect.id) : next.delete(redirect.id);
                        setSelected(next);
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{redirect.from_path}</code>
                  </td>
                  <td className="px-4 py-3">
                    <code className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{redirect.to_path}</code>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={redirect.type === '301' ? 'success' : 'info'}>{redirect.type}</Badge>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(redirect.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(redirect)}
                        className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-[#0d9488]"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { setDeleteId(redirect.id); setDeleteName(redirect.from_path); }}
                        className="p-1.5 hover:bg-red-50 rounded text-gray-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editRedirect ? 'Edit Redirect' : 'Add Redirect'}
      >
        <div className="space-y-4">
          {loopWarning && (
            <div className="flex items-start gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-700">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              {loopWarning}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">From Path *</label>
            <input
              type="text"
              value={formData.from_path}
              onChange={(e) => {
                setFormData({ ...formData, from_path: e.target.value });
                checkLoop(e.target.value, formData.to_path);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              placeholder="/old-page"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">To Path *</label>
            <input
              type="text"
              value={formData.to_path}
              onChange={(e) => {
                setFormData({ ...formData, to_path: e.target.value });
                checkLoop(formData.from_path, e.target.value);
              }}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
              placeholder="/new-page"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
            >
              <option value="301">301 Permanent</option>
              <option value="302">302 Temporary</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-[#0d9488] rounded-md hover:bg-[#0f766e]">
              {editRedirect ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Redirect"
        message={`Are you sure you want to delete the redirect from '${deleteName}'? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
