'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import Badge from '@/components/admin/Badge';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { Plus, Search, ChevronLeft, ChevronRight, Trash2, Pencil, FileText, Eye, EyeOff, Archive } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
  category?: { id: string; name: string } | null;
  author?: { id: string; name: string } | null;
}

interface Category { id: string; name: string; }
interface Author { id: string; name: string; }

export default function BlogPostsPage() {
  const { adminFetch } = useAdmin();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterAuthor, setFilterAuthor] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<'delete' | 'publish' | 'unpublish' | null>(null);
  const searchTimer = useRef<NodeJS.Timeout>();
  const limit = 20;

  // Debounced search
  useEffect(() => {
    searchTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(searchTimer.current);
  }, [search]);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(debouncedSearch && { search: debouncedSearch }),
      ...(filterCategory && { category: filterCategory }),
      ...(filterAuthor && { author: filterAuthor }),
      ...(filterStatus && { status: filterStatus }),
    });

    const res = await adminFetch(`/api/admin/blog/posts?${params}`);
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
      setTotalPages(data.totalPages);
    }
    setLoading(false);
  }, [adminFetch, page, debouncedSearch, filterCategory, filterAuthor, filterStatus]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  useEffect(() => {
    async function fetchFilters() {
      const [catRes, authRes] = await Promise.all([
        adminFetch('/api/admin/blog/categories'),
        adminFetch('/api/admin/blog/authors'),
      ]);
      if (catRes.ok) setCategories(await catRes.json());
      if (authRes.ok) setAuthors(await authRes.json());
    }
    fetchFilters();
  }, [adminFetch]);

  async function handleDelete() {
    if (!deleteId) return;
    const res = await adminFetch(`/api/admin/blog/posts/${deleteId}`, { method: 'DELETE' });
    if (res.ok) {
      toast.success('Post deleted');
      fetchPosts();
    } else {
      toast.error('Failed to delete post');
    }
    setDeleteId(null);
  }

  async function handleBulkAction() {
    if (!bulkAction || selected.size === 0) return;
    if (bulkAction === 'delete') {
      const promises = Array.from(selected).map((id) =>
        adminFetch(`/api/admin/blog/posts/${id}`, { method: 'DELETE' })
      );
      await Promise.all(promises);
      toast.success(`${selected.size} posts deleted`);
    } else {
      const status = bulkAction === 'publish' ? 'published' : 'draft';
      const promises = Array.from(selected).map((id) =>
        adminFetch(`/api/admin/blog/posts/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        })
      );
      await Promise.all(promises);
      toast.success(`${selected.size} posts ${bulkAction === 'publish' ? 'published' : 'unpublished'}`);
    }
    setSelected(new Set());
    setBulkAction(null);
    fetchPosts();
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  function timeAgo(dateStr: string | null) {
    if (!dateStr) return '';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  const statusBadge = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
      published: 'success',
      draft: 'warning',
      scheduled: 'info',
      archived: 'default',
    };
    return <Badge variant={map[status] || 'default'}>{status}</Badge>;
  };

  const startIdx = (page - 1) * limit + 1;
  const endIdx = Math.min(page * limit, total);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Blog Posts</h1>
          <p className="text-sm text-[#64748b] mt-1">{total} posts total</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] mb-4">
        <div className="p-4 flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-[#0d9488] focus:border-[#0d9488] outline-none"
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select
            value={filterAuthor}
            onChange={(e) => { setFilterAuthor(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">All Authors</option>
            {authors.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="w-10 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.size === posts.length && posts.length > 0}
                    onChange={(e) => {
                      if (e.target.checked) setSelected(new Set(posts.map((p) => p.id)));
                      else setSelected(new Set());
                    }}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 min-w-[300px]">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Author</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Published</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-4 py-3"><div className="w-4 h-4 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-48 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-gray-100 rounded-full animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 bg-gray-100 rounded animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-12 bg-gray-100 rounded animate-pulse ml-auto" /></td>
                  </tr>
                ))
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center">
                    <FileText className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-500">No posts found</p>
                    <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or create a new post</p>
                    <Link
                      href="/admin/blog/new"
                      className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-[#0d9488] hover:text-[#0f766e]"
                    >
                      <Plus className="w-4 h-4" />
                      Create New Post
                    </Link>
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id} className="hover:bg-[#f8fafc] transition-colors">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(post.id)}
                        onChange={(e) => {
                          const next = new Set(selected);
                          e.target.checked ? next.add(post.id) : next.delete(post.id);
                          setSelected(next);
                        }}
                        className="rounded border-gray-300"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-gray-900 hover:text-[#0d9488] font-medium"
                        title={post.title}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      {post.category ? <Badge>{post.category.name}</Badge> : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{post.author?.name || '-'}</td>
                    <td className="px-4 py-3">{statusBadge(post.status)}</td>
                    <td className="px-4 py-3 text-gray-500" title={timeAgo(post.published_at || post.created_at)}>
                      {formatDate(post.published_at || post.created_at)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-500 hover:text-[#0d9488]"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className="p-1.5 hover:bg-red-50 rounded-md transition-colors text-gray-500 hover:text-red-600"
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

        {/* Pagination */}
        {total > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Showing {startIdx}&ndash;{endIdx} of {total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`w-8 h-8 text-sm rounded-md transition-colors ${
                      page === pageNum ? 'bg-[#0d9488] text-white' : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
                className="p-1.5 hover:bg-gray-100 rounded disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating bulk action bar */}
      {selected.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#0f172a] text-white rounded-lg shadow-xl px-6 py-3 flex items-center gap-4 z-40">
          <span className="text-sm font-medium">{selected.size} post{selected.size > 1 ? 's' : ''} selected</span>
          <div className="w-px h-5 bg-white/20" />
          <button
            onClick={() => setBulkAction('publish')}
            className="inline-flex items-center gap-1.5 text-sm text-green-400 hover:text-green-300 font-medium"
          >
            <Eye className="w-3.5 h-3.5" />
            Publish
          </button>
          <button
            onClick={() => setBulkAction('unpublish')}
            className="inline-flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-medium"
          >
            <EyeOff className="w-3.5 h-3.5" />
            Unpublish
          </button>
          <button
            onClick={() => setBulkAction('delete')}
            className="inline-flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 font-medium"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Post"
        message="Are you sure you want to delete this post? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

      <ConfirmDialog
        open={!!bulkAction}
        title={`Bulk ${bulkAction === 'delete' ? 'Delete' : bulkAction === 'publish' ? 'Publish' : 'Unpublish'}`}
        message={`Are you sure you want to ${bulkAction} ${selected.size} post${selected.size > 1 ? 's' : ''}?${bulkAction === 'delete' ? ' This cannot be undone.' : ''}`}
        confirmLabel={bulkAction === 'delete' ? 'Delete All' : bulkAction === 'publish' ? 'Publish All' : 'Unpublish All'}
        destructive={bulkAction === 'delete'}
        onConfirm={handleBulkAction}
        onCancel={() => setBulkAction(null)}
      />
    </div>
  );
}
