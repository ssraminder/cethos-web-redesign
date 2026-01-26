'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import BlogImage from '@/components/BlogImage';
import { BlogPost } from '@/lib/blog-db';

interface BlogListInfiniteProps {
  initialPosts: BlogPost[];
  initialHasMore: boolean;
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogListInfinite({ initialPosts, initialHasMore }: BlogListInfiniteProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;

    try {
      const response = await fetch(`/api/blog/posts?page=${nextPage}&limit=6`);
      const data = await response.json();

      if (data.posts && data.posts.length > 0) {
        setPosts(prev => [...prev, ...data.posts]);
        setPage(nextPage);
        setHasMore(data.pagination.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more posts:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  // Intersection Observer for auto-load
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, loading, loadMorePosts]);

  return (
    <div className="space-y-8">
      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 bg-gray-100">
                <BlogImage
                  src={post.featured_image}
                  alt={post.featured_image_alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
            <div className="p-6">
              {post.category && (
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="text-sm font-medium text-[#0891B2] hover:text-[#06B6D4]"
                >
                  {post.category.name}
                </Link>
              )}
              <h2 className="mt-2 text-xl font-semibold text-gray-900">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#0891B2]">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && (
                <p className="mt-3 text-gray-600 line-clamp-3">{post.excerpt}</p>
              )}
              <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                <span>{post.published_at && formatDate(post.published_at)}</span>
                <span>{post.read_time} min read</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Load More Trigger / Status */}
      <div ref={loadMoreRef} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center gap-3 text-gray-500">
            <svg
              className="animate-spin h-5 w-5 text-[#0891B2]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </div>
        )}

        {!hasMore && posts.length > 0 && (
          <p className="text-gray-400 text-sm">
            No more posts
          </p>
        )}
      </div>
    </div>
  );
}
