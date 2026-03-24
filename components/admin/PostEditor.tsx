'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from './AdminContext';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import ConfirmDialog from './ConfirmDialog';
import { toast } from 'sonner';
import { slugify } from '@/lib/utils';
import { Save, Eye, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

interface PostEditorProps {
  postId?: string;
}

interface Category { id: string; name: string; slug: string; }
interface Author { id: string; name: string; slug: string; }

export default function PostEditor({ postId }: PostEditorProps) {
  const { adminFetch } = useAdmin();
  const router = useRouter();
  const isEdit = !!postId;

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('draft');
  const [publishedAt, setPublishedAt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [readTime, setReadTime] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredImageAlt, setFeaturedImageAlt] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [seoOpen, setSeoOpen] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loaded, setLoaded] = useState(!isEdit);

  // Auto-calculate read time
  useEffect(() => {
    if (content) {
      const words = content.trim().split(/\s+/).length;
      const mins = Math.ceil(words / 200);
      setReadTime(`${mins} min read`);
    }
  }, [content]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && !isEdit) {
      setSlug(slugify(title));
    }
  }, [title, slugManual, isEdit]);

  // Load categories, authors, tags
  useEffect(() => {
    async function loadMeta() {
      const [catRes, authRes] = await Promise.all([
        adminFetch('/api/admin/blog/categories'),
        adminFetch('/api/admin/blog/authors'),
      ]);
      if (catRes.ok) setCategories(await catRes.json());
      if (authRes.ok) setAuthors(await authRes.json());
    }
    loadMeta();
  }, [adminFetch]);

  // Load post data for edit
  useEffect(() => {
    if (!postId) return;
    async function loadPost() {
      const res = await adminFetch(`/api/admin/blog/posts/${postId}`);
      if (!res.ok) {
        toast.error('Failed to load post');
        router.push('/admin/blog');
        return;
      }
      const post = await res.json();
      setTitle(post.title || '');
      setSlug(post.slug || '');
      setSlugManual(true);
      setDescription(post.description || '');
      setContent(post.content || '');
      setStatus(post.status || 'draft');
      setPublishedAt(post.published_at ? new Date(post.published_at).toISOString().slice(0, 16) : '');
      setCategoryId(post.category_id || '');
      setAuthorId(post.author_id || '');
      setTags(post.tags || []);
      setReadTime(post.read_time || '');
      setFeaturedImage(post.featured_image || '');
      setFeaturedImageAlt(post.featured_image_alt || '');
      setMetaTitle(post.meta_title || '');
      setMetaDescription(post.meta_description || '');
      setCanonicalUrl(post.canonical_url || '');
      setLoaded(true);
    }
    loadPost();
  }, [postId, adminFetch, router]);

  const handleSave = useCallback(async (overrideStatus?: string) => {
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!slug.trim()) {
      toast.error('Slug is required');
      return;
    }

    setSaving(true);
    const finalStatus = overrideStatus || status;
    const body = {
      title, slug, description, content,
      status: finalStatus,
      published_at: publishedAt ? new Date(publishedAt).toISOString() : null,
      category_id: categoryId || null,
      author_id: authorId || null,
      tags, read_time: readTime,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      canonical_url: canonicalUrl || null,
    };

    const url = isEdit ? `/api/admin/blog/posts/${postId}` : '/api/admin/blog/posts';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await adminFetch(url, { method, body: JSON.stringify(body) });
    setSaving(false);

    if (res.ok) {
      const data = await res.json();
      toast.success(isEdit ? 'Post updated' : 'Post created');
      if (!isEdit) router.push(`/admin/blog/${data.id}/edit`);
    } else {
      const err = await res.json();
      toast.error(err.error || 'Failed to save');
    }
  }, [title, slug, description, content, status, publishedAt, categoryId, authorId, tags, readTime, featuredImage, featuredImageAlt, metaTitle, metaDescription, canonicalUrl, isEdit, postId, adminFetch, router]);

  async function handleDelete() {
    if (!postId) return;
    const res = await adminFetch(`/api/admin/blog/posts/${postId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Post deleted');
      router.push('/admin/blog');
    } else {
      toast.error('Failed to delete');
    }
    setDeleteOpen(false);
  }

  if (!loaded) {
    return <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-cethos-teal border-t-transparent rounded-full animate-spin" /></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? 'Edit Post' : 'New Post'}
        </h1>
        <div className="flex gap-2">
          {isEdit && slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cethos-teal rounded-lg hover:bg-cethos-teal-light disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Save Draft'}
          </button>
          {status !== 'published' && (
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              Publish
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-lg font-medium focus:ring-2 focus:ring-cethos-teal focus:border-cethos-teal outline-none"
                placeholder="Post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
                {isEdit && <span className="text-yellow-600 text-xs ml-2">Changing may break existing links</span>}
              </label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cethos-teal focus:border-cethos-teal outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Excerpt</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-cethos-teal focus:border-cethos-teal outline-none resize-none"
                placeholder="Brief summary of the post..."
              />
            </div>

            <div data-color-mode="light">
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <MDEditor
                value={content}
                onChange={(val) => setContent(val || '')}
                height={500}
                preview="edit"
              />
            </div>
          </div>
        </div>

        {/* Right column - Settings */}
        <div className="space-y-4">
          {/* Status */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {(status === 'published' || status === 'scheduled') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input
                  type="datetime-local"
                  value={publishedAt}
                  onChange={(e) => setPublishedAt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <select
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
              >
                <option value="">Select author</option>
                {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <TagInput value={tags} onChange={setTags} suggestions={allTags} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Read Time</label>
              <input
                type="text"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                placeholder="e.g. 8 min read"
              />
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-3">
            <label className="block text-sm font-medium text-gray-700">Featured Image</label>
            <ImageUpload value={featuredImage} onChange={setFeaturedImage} name={slug || 'post'} />
            {featuredImage && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                <input
                  type="text"
                  value={featuredImageAlt}
                  onChange={(e) => setFeaturedImageAlt(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  placeholder="Describe the image"
                />
              </div>
            )}
          </div>

          {/* SEO */}
          <div className="bg-white rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setSeoOpen(!seoOpen)}
              className="w-full flex items-center justify-between p-5 text-sm font-medium text-gray-700"
            >
              SEO Settings
              {seoOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {seoOpen && (
              <div className="px-5 pb-5 space-y-3 border-t border-gray-100 pt-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Meta Title</label>
                    <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>
                      {metaTitle.length}/60
                    </span>
                  </div>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-gray-700">Meta Description</label>
                    <span className={`text-xs ${metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>
                      {metaDescription.length}/160
                    </span>
                  </div>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={canonicalUrl}
                    onChange={(e) => setCanonicalUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    placeholder="https://..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Delete */}
          {isEdit && (
            <button
              onClick={() => setDeleteOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Delete Post
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Post"
        message="Are you sure? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
