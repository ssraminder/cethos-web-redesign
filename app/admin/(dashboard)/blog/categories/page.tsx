'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { slugify } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  sort_order: number;
  post_count: number;
}

export default function CategoriesPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState({ name: '', slug: '', description: '' });
  const [addMode, setAddMode] = useState(false);
  const [newData, setNewData] = useState({ name: '', slug: '', description: '' });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = hasPermission(adminUser!.role, 'blog_categories', 'create');
  const canDelete = hasPermission(adminUser!.role, 'blog_categories', 'delete');

  async function fetchCategories() {
    setLoading(true);
    const res = await adminFetch('/api/admin/blog/categories');
    if (res.ok) setCategories(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchCategories(); }, [adminFetch]);

  async function handleAdd() {
    if (!newData.name.trim()) return;
    const res = await adminFetch('/api/admin/blog/categories', {
      method: 'POST',
      body: JSON.stringify({
        name: newData.name,
        slug: newData.slug || slugify(newData.name),
        description: newData.description || null,
        sort_order: categories.length,
      }),
    });
    if (res.ok) {
      toast.success('Category created');
      setAddMode(false);
      setNewData({ name: '', slug: '', description: '' });
      fetchCategories();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to create');
    }
  }

  async function handleUpdate() {
    if (!editId || !editData.name.trim()) return;
    const res = await adminFetch(`/api/admin/blog/categories/${editId}`, {
      method: 'PATCH',
      body: JSON.stringify(editData),
    });
    if (res.ok) {
      toast.success('Category updated');
      setEditId(null);
      fetchCategories();
    } else {
      toast.error('Failed to update');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/blog/categories/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Category deleted');
      fetchCategories();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to delete');
    }
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">{categories.length} categories</p>
        </div>
        {canCreate && (
          <button
            onClick={() => setAddMode(true)}
            className="inline-flex items-center gap-2 bg-cethos-teal hover:bg-cethos-teal-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Slug</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Description</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-20">Posts</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {/* Add row */}
            {addMode && (
              <tr className="bg-blue-50/50">
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newData.name}
                    onChange={(e) => setNewData({ ...newData, name: e.target.value, slug: slugify(e.target.value) })}
                    placeholder="Category name"
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                    autoFocus
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newData.slug}
                    onChange={(e) => setNewData({ ...newData, slug: e.target.value })}
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={newData.description}
                    onChange={(e) => setNewData({ ...newData, description: e.target.value })}
                    placeholder="Description"
                    className="w-full px-2 py-1.5 border border-gray-200 rounded text-sm"
                  />
                </td>
                <td className="px-4 py-2 text-gray-400">-</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={handleAdd} className="p-1.5 hover:bg-green-100 rounded text-green-600"><Check className="w-4 h-4" /></button>
                    <button onClick={() => setAddMode(false)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><X className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            )}

            {loading ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">Loading...</td></tr>
            ) : categories.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-gray-400">No categories</td></tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    {editId === cat.id ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editId === cat.id ? (
                      <input
                        type="text"
                        value={editData.slug}
                        onChange={(e) => setEditData({ ...editData, slug: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    ) : (
                      <span className="text-gray-500">{cat.slug}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editId === cat.id ? (
                      <input
                        type="text"
                        value={editData.description}
                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                        className="w-full px-2 py-1 border border-gray-200 rounded text-sm"
                      />
                    ) : (
                      <span className="text-gray-500 truncate block max-w-xs">{cat.description || '-'}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{cat.post_count}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {editId === cat.id ? (
                        <>
                          <button onClick={handleUpdate} className="p-1.5 hover:bg-green-100 rounded text-green-600"><Check className="w-4 h-4" /></button>
                          <button onClick={() => setEditId(null)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500"><X className="w-4 h-4" /></button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => { setEditId(cat.id); setEditData({ name: cat.name, slug: cat.slug, description: cat.description || '' }); }}
                            className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-cethos-teal"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          {canDelete && (
                            <button
                              onClick={() => setDeleteId(cat.id)}
                              className="p-1.5 hover:bg-red-50 rounded text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category"
        message="Are you sure? This cannot be undone. Categories with posts cannot be deleted."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
