'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import { hasPermission } from '@/lib/admin/permissions';
import Modal from '@/components/admin/Modal';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Pencil, Trash2, Mail, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { slugify } from '@/lib/utils';

interface Author {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  post_count: number;
}

const emptyForm = { name: '', slug: '', title: '', bio: '', email: '', linkedin_url: '', avatar_url: '' };

export default function AuthorsPage() {
  const { adminUser, adminFetch } = useAdmin();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [editAuthor, setEditAuthor] = useState<Author | null>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const canCreate = hasPermission(adminUser!.role, 'blog_authors', 'create');
  const canUpdate = hasPermission(adminUser!.role, 'blog_authors', 'update');
  const canDelete = hasPermission(adminUser!.role, 'blog_authors', 'delete');

  async function fetchAuthors() {
    setLoading(true);
    const res = await adminFetch('/api/admin/blog/authors');
    if (res.ok) setAuthors(await res.json());
    setLoading(false);
  }

  useEffect(() => { fetchAuthors(); }, [adminFetch]);

  function openNew() {
    setEditAuthor(null);
    setFormData(emptyForm);
    setModalOpen(true);
  }

  function openEdit(author: Author) {
    setEditAuthor(author);
    setFormData({
      name: author.name,
      slug: author.slug,
      title: author.title || '',
      bio: author.bio || '',
      email: author.email || '',
      linkedin_url: author.linkedin_url || '',
      avatar_url: author.avatar_url || '',
    });
    setModalOpen(true);
  }

  async function handleSave() {
    if (!formData.name.trim()) { toast.error('Name is required'); return; }

    const body = {
      ...formData,
      slug: formData.slug || slugify(formData.name),
    };

    const url = editAuthor ? `/api/admin/blog/authors/${editAuthor.id}` : '/api/admin/blog/authors';
    const method = editAuthor ? 'PATCH' : 'POST';

    const res = await adminFetch(url, { method, body: JSON.stringify(body) });
    if (res.ok) {
      toast.success(editAuthor ? 'Author updated' : 'Author created');
      setModalOpen(false);
      fetchAuthors();
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/blog/authors/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Author deleted');
      fetchAuthors();
    } else {
      toast.error('Failed to delete');
    }
    setDeleteId(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="text-sm text-gray-500 mt-1">{authors.length} authors</p>
        </div>
        {canCreate && (
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 bg-cethos-teal hover:bg-cethos-teal-light text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Author
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-cethos-teal border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author) => (
            <div key={author.id} className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-cethos-navy flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {author.avatar_url ? (
                    <img src={author.avatar_url} alt={author.name} className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    author.name.charAt(0)
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900">{author.name}</h3>
                  {author.title && <p className="text-sm text-gray-500">{author.title}</p>}
                </div>
              </div>
              {author.bio && (
                <p className="mt-3 text-sm text-gray-600 line-clamp-2">{author.bio}</p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{author.post_count} posts</span>
                  {author.email && (
                    <a href={`mailto:${author.email}`} className="text-gray-400 hover:text-cethos-teal">
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {author.linkedin_url && (
                    <a href={author.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cethos-teal">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                <div className="flex gap-1">
                  {canUpdate && (
                    <button onClick={() => openEdit(author)} className="p-1.5 hover:bg-gray-100 rounded text-gray-500 hover:text-cethos-teal">
                      <Pencil className="w-4 h-4" />
                    </button>
                  )}
                  {canDelete && (
                    <button onClick={() => setDeleteId(author.id)} className="p-1.5 hover:bg-red-50 rounded text-gray-500 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Author Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editAuthor ? 'Edit Author' : 'New Author'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value, ...(!editAuthor && { slug: slugify(e.target.value) }) })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="e.g. CEO, Content Lead"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input
              type="url"
              value={formData.avatar_url}
              onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Paste image URL"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handleSave} className="px-4 py-2 text-sm font-medium text-white bg-cethos-teal rounded-lg hover:bg-cethos-teal-light">
              {editAuthor ? 'Update' : 'Create'}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Author"
        message="Are you sure? This cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
