'use client';

import { useAdmin } from '@/components/admin/AdminContext';
import Badge from '@/components/admin/Badge';
import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

interface CalendarPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  published_at: string | null;
  created_at: string;
}

export default function CalendarPage() {
  const { adminFetch } = useAdmin();
  const [posts, setPosts] = useState<CalendarPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week'>('month');
  const [selectedPost, setSelectedPost] = useState<CalendarPost | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const res = await adminFetch('/api/admin/blog/posts?limit=200');
    if (res.ok) {
      const data = await res.json();
      setPosts(data.posts || []);
    }
    setLoading(false);
  }, [adminFetch]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function navigate(dir: number) {
    const d = new Date(currentDate);
    if (view === 'month') {
      d.setMonth(d.getMonth() + dir);
    } else {
      d.setDate(d.getDate() + dir * 7);
    }
    setCurrentDate(d);
  }

  function getPostsForDate(date: Date): CalendarPost[] {
    const dateStr = date.toISOString().split('T')[0];
    return posts.filter(p => {
      const postDate = p.published_at || p.created_at;
      return postDate && postDate.startsWith(dateStr);
    });
  }

  function getStatusDot(status: string) {
    switch (status) {
      case 'published': return 'bg-[#16a34a]';
      case 'scheduled': return 'bg-[#2563eb]';
      case 'draft': return 'bg-[#d97706]';
      default: return 'bg-gray-400';
    }
  }

  // Generate calendar grid
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = firstDay.getDay(); // 0=Sun
  const totalDays = lastDay.getDate();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const days: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
  // Pad to complete last row
  while (days.length % 7 !== 0) days.push(null);

  const monthName = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  async function handleUpdateStatus(postId: string, newStatus: string) {
    const res = await adminFetch(`/api/admin/blog/posts/${postId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      toast.success('Status updated');
      fetchPosts();
      setSelectedPost(null);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0f172a]">Content Calendar</h1>
          <p className="text-sm text-[#64748b] mt-1">Plan and schedule your content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Post
        </Link>
      </div>

      {/* Calendar controls */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-md">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-semibold text-[#0f172a] min-w-[200px] text-center">{monthName}</h2>
            <button onClick={() => navigate(1)} className="p-1.5 hover:bg-gray-100 rounded-md">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="ml-2 px-3 py-1 text-xs font-medium text-[#0d9488] border border-[#0d9488] rounded-md hover:bg-[#0d9488]/5"
            >
              Today
            </button>
          </div>
          <div className="flex bg-gray-100 rounded-md p-0.5">
            <button
              onClick={() => setView('month')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === 'month' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            >
              Month
            </button>
            <button
              onClick={() => setView('week')}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${view === 'week' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'}`}
            >
              Week
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 py-2 border-b border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#16a34a]" /> Published</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#2563eb]" /> Scheduled</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#d97706]" /> Draft</span>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {weekDays.map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-500 py-2 border-b border-gray-100">
              {d}
            </div>
          ))}
          {days.map((date, i) => {
            if (!date) {
              return <div key={`empty-${i}`} className="min-h-[100px] border-b border-r border-gray-100 bg-gray-50/50" />;
            }

            const dateStr = date.toISOString().split('T')[0];
            const isToday = dateStr === todayStr;
            const dayPosts = getPostsForDate(date);

            return (
              <div
                key={dateStr}
                className={`min-h-[100px] border-b border-r border-gray-100 p-1.5 ${isToday ? 'bg-[#0d9488]/5' : 'hover:bg-gray-50'}`}
              >
                <div className={`text-xs font-medium mb-1 ${isToday ? 'text-[#0d9488]' : 'text-gray-500'}`}>
                  <span className={isToday ? 'inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#0d9488] text-white' : ''}>
                    {date.getDate()}
                  </span>
                </div>
                <div className="space-y-0.5">
                  {dayPosts.slice(0, 3).map(post => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="w-full text-left flex items-center gap-1 px-1 py-0.5 rounded text-[11px] truncate hover:bg-gray-100"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getStatusDot(post.status)}`} />
                      <span className="truncate">{post.title}</span>
                    </button>
                  ))}
                  {dayPosts.length > 3 && (
                    <p className="text-[10px] text-gray-400 pl-1">+{dayPosts.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Post detail side panel */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSelectedPost(null)} />
          <div className="relative w-full max-w-md bg-white shadow-xl h-full overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Post Details</h3>
              <button onClick={() => setSelectedPost(null)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Title</label>
                <p className="text-gray-900 font-medium">{selectedPost.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                <Badge variant={selectedPost.status === 'published' ? 'success' : selectedPost.status === 'scheduled' ? 'info' : 'warning'}>
                  {selectedPost.status}
                </Badge>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Date</label>
                <p className="text-sm text-gray-700">
                  {new Date(selectedPost.published_at || selectedPost.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/admin/blog/${selectedPost.id}/edit`}
                  className="flex-1 text-center px-4 py-2 text-sm font-medium text-white bg-[#0d9488] rounded-md hover:bg-[#0f766e]"
                >
                  Edit Post
                </Link>
                {selectedPost.status === 'draft' && (
                  <button
                    onClick={() => handleUpdateStatus(selectedPost.id, 'published')}
                    className="px-4 py-2 text-sm font-medium text-[#16a34a] border border-[#16a34a] rounded-md hover:bg-green-50"
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
