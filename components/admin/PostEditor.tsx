'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from './AdminContext';
import TagInput from './TagInput';
import ImageUpload from './ImageUpload';
import ConfirmDialog from './ConfirmDialog';
import SerpPreview from './SerpPreview';
import { toast } from 'sonner';
import { slugify } from '@/lib/utils';
import {
  Save, Eye, ChevronDown, ChevronRight, MoreHorizontal,
  Copy, History, Trash2, AlertTriangle, Check, Loader2, Sparkles,
} from 'lucide-react';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });
const AIAssistantPanel = dynamic(() => import('./AIAssistantPanel'), { ssr: false });

interface PostEditorProps {
  postId?: string;
}

interface Category { id: string; name: string; slug: string; }
interface Author { id: string; name: string; slug: string; }

// Accordion Section component
function AccordionSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        {title}
        {open ? <ChevronDown className="w-4 h-4 text-gray-400" /> : <ChevronRight className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-5 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

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
  const [focusKeyword, setFocusKeyword] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loaded, setLoaded] = useState(!isEdit);
  const [menuOpen, setMenuOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Auto-save state
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const autoSaveTimer = useRef<NodeJS.Timeout>();
  const lastSavedContent = useRef('');

  // Auto-calculate read time
  useEffect(() => {
    if (content) {
      const textContent = content.replace(/<[^>]*>/g, '');
      const words = textContent.trim().split(/\s+/).length;
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
      setFocusKeyword(post.focus_keyword || '');
      lastSavedContent.current = post.content || '';
      setLoaded(true);
    }
    loadPost();
  }, [postId, adminFetch, router]);

  // Auto-save every 30 seconds for existing posts
  useEffect(() => {
    if (!isEdit || !loaded) return;
    autoSaveTimer.current = setInterval(() => {
      if (content !== lastSavedContent.current && title.trim()) {
        setAutoSaveStatus('saving');
        handleSave(undefined, true);
      }
    }, 30000);
    return () => clearInterval(autoSaveTimer.current);
  }, [isEdit, loaded, content, title]);

  // Track unsaved changes
  useEffect(() => {
    if (loaded && content !== lastSavedContent.current) {
      setAutoSaveStatus('unsaved');
    }
  }, [content, loaded]);

  // Close overflow menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = useCallback(async (overrideStatus?: string, isAutoSave?: boolean) => {
    if (!title.trim()) {
      if (!isAutoSave) toast.error('Title is required');
      return;
    }
    if (!slug.trim()) {
      if (!isAutoSave) toast.error('Slug is required');
      return;
    }

    if (!isAutoSave) setSaving(true);
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
      focus_keyword: focusKeyword || null,
    };

    const url = isEdit ? `/api/admin/blog/posts/${postId}` : '/api/admin/blog/posts';
    const method = isEdit ? 'PATCH' : 'POST';

    const res = await adminFetch(url, { method, body: JSON.stringify(body) });
    if (!isAutoSave) setSaving(false);

    if (res.ok) {
      const data = await res.json();
      lastSavedContent.current = content;
      setAutoSaveStatus('saved');
      if (!isAutoSave) toast.success(isEdit ? 'Post updated' : 'Post created');
      if (!isEdit) router.push(`/admin/blog/${data.id}/edit`);
    } else {
      if (!isAutoSave) {
        const err = await res.json();
        toast.error(err.error || 'Failed to save');
      }
      setAutoSaveStatus('unsaved');
    }
  }, [title, slug, description, content, status, publishedAt, categoryId, authorId, tags, readTime, featuredImage, featuredImageAlt, metaTitle, metaDescription, canonicalUrl, focusKeyword, isEdit, postId, adminFetch, router]);

  // Keyboard shortcut: Ctrl/Cmd+S to save
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSave]);

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

  async function handleDuplicate() {
    setMenuOpen(false);
    const body = {
      title: `${title} (Copy)`,
      slug: `${slug}-copy`,
      description, content, status: 'draft',
      category_id: categoryId || null,
      author_id: authorId || null,
      tags, read_time: readTime,
      featured_image: featuredImage || null,
      featured_image_alt: featuredImageAlt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
    };
    const res = await adminFetch('/api/admin/blog/posts', { method: 'POST', body: JSON.stringify(body) });
    if (res.ok) {
      const data = await res.json();
      toast.success('Post duplicated');
      router.push(`/admin/blog/${data.id}/edit`);
    } else {
      toast.error('Failed to duplicate');
    }
  }

  const metaTitleLen = metaTitle.length;
  const metaDescLen = metaDescription.length;

  function charCountColor(len: number, max: number) {
    if (len === 0) return 'text-gray-400';
    if (len <= max) return 'text-green-600';
    return 'text-red-500';
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-[#0d9488] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#0f172a]">
            {isEdit ? 'Edit Post' : 'New Post'}
          </h1>
          {/* Auto-save indicator */}
          {isEdit && (
            <span className="flex items-center gap-1 text-xs text-gray-400">
              {autoSaveStatus === 'saved' && <><Check className="w-3 h-3 text-green-500" /> Saved</>}
              {autoSaveStatus === 'saving' && <><Loader2 className="w-3 h-3 animate-spin" /> Saving...</>}
              {autoSaveStatus === 'unsaved' && <span className="text-amber-500">Unsaved changes</span>}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isEdit && slug && (
            <a
              href={`/blog/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </a>
          )}
          <button
            onClick={() => handleSave()}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#0d9488] rounded-md hover:bg-[#0f766e] disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : isEdit ? 'Update' : 'Save Draft'}
          </button>
          {status !== 'published' && (
            <button
              onClick={() => handleSave('published')}
              disabled={saving}
              className="px-4 py-2 text-sm font-medium text-white bg-[#16a34a] rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              Publish
            </button>
          )}
          {/* Overflow menu */}
          {isEdit && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-lg border border-gray-200 shadow-lg py-1 min-w-[180px] z-50">
                  <button
                    onClick={handleDuplicate}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Copy className="w-4 h-4" />
                    Duplicate Post
                  </button>
                  <button
                    onClick={() => { setMenuOpen(false); toast.info('Revision history coming soon'); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <History className="w-4 h-4" />
                    View Revision History
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                  <button
                    onClick={() => { setMenuOpen(false); setDeleteOpen(true); }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Post
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Content */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-lg border border-[#e2e8f0] p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-lg font-medium focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none"
                placeholder="Post title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              {isEdit && (
                <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  Changing the slug may break existing links to this post.
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">/blog/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugManual(true); }}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description / Excerpt</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none resize-none"
                placeholder="Brief summary of the post..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-gray-700">Content</label>
                <button
                  type="button"
                  onClick={() => setAiPanelOpen(true)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#0d9488] border border-[#0d9488] rounded-md hover:bg-[#0d9488]/5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Assistant
                </button>
              </div>
              <TiptapEditor
                content={content}
                onChange={(val) => setContent(val)}
              />
            </div>
          </div>
        </div>

        {/* Right column - Settings (Accordion) */}
        <div className="space-y-4">
          {/* Publish Settings */}
          <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
            <AccordionSection title="Publish Settings" defaultOpen>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {(status === 'published' || status === 'scheduled') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                  <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  />
                </div>
              )}
            </AccordionSection>

            <AccordionSection title="Post Settings" defaultOpen>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm bg-white"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="e.g. 8 min read"
                />
              </div>
            </AccordionSection>

            <AccordionSection title="Featured Image">
              <ImageUpload value={featuredImage} onChange={setFeaturedImage} name={slug || 'post'} />
              {featuredImage && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alt Text</label>
                    <input
                      type="text"
                      value={featuredImageAlt}
                      onChange={(e) => setFeaturedImageAlt(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                      placeholder="Describe the image"
                    />
                  </div>
                  <p className="text-xs text-gray-400 truncate">{featuredImage}</p>
                </>
              )}
            </AccordionSection>

            <AccordionSection title="SEO">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Meta Title</label>
                  <span className={`text-xs ${charCountColor(metaTitleLen, 60)}`}>
                    {metaTitleLen}/60
                  </span>
                </div>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">Meta Description</label>
                  <span className={`text-xs ${charCountColor(metaDescLen, 160)}`}>
                    {metaDescLen}/160
                  </span>
                </div>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none"
                />
              </div>
              <SerpPreview
                title={metaTitle || title}
                description={metaDescription || description}
                url={`https://cethos.com/blog/${slug}`}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Focus Keyword</label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="Primary keyword for this post"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm"
                  placeholder="https://..."
                />
              </div>
            </AccordionSection>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={deleteOpen}
        title="Delete Post"
        message={`Are you sure you want to delete '${title}'? This cannot be undone.`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />

      {/* AI Assistant Panel */}
      <AIAssistantPanel
        open={aiPanelOpen}
        onClose={() => setAiPanelOpen(false)}
        postTitle={title}
        fullContent={content}
        onInsert={(text) => {
          setContent(prev => prev + '\n' + text);
          setAiPanelOpen(false);
        }}
      />
    </div>
  );
}
