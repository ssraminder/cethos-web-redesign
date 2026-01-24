/**
 * Blog Database Functions
 * 
 * This file provides all the database query functions for the blog system.
 * Copy this to /lib/blog-db.ts in your project.
 * 
 * After copying, delete the old /lib/blog.ts file that has hardcoded data.
 */

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// TYPES
// ============================================================================

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  post_count?: number;
  created_at: string;
  updated_at: string;
}

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  is_active: boolean;
  post_count?: number;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  featured_image_alt: string | null;
  category_id: string | null;
  author_id: string | null;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  published_at: string | null;
  scheduled_for: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  tags: string[];
  read_time: number;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: BlogCategory;
  author?: BlogAuthor;
}

// ============================================================================
// CATEGORY FUNCTIONS
// ============================================================================

/**
 * Get all categories with post counts
 */
export async function getCategories(): Promise<BlogCategory[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a single category by slug
 */
export async function getCategoryBySlug(slug: string): Promise<BlogCategory | null> {
  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Error fetching category:', error);
    return null;
  }

  return data;
}

/**
 * Get all category slugs (for generateStaticParams)
 */
export async function getAllCategorySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_categories')
    .select('slug');

  if (error) {
    console.error('Error fetching category slugs:', error);
    return [];
  }

  return (data || []).map((c) => c.slug);
}

// ============================================================================
// AUTHOR FUNCTIONS
// ============================================================================

/**
 * Get all active authors
 */
export async function getAuthors(): Promise<BlogAuthor[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_authors')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true });

  if (error) {
    console.error('Error fetching authors:', error);
    return [];
  }

  return data || [];
}

/**
 * Get an author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<BlogAuthor | null> {
  const { data, error } = await supabase
    .from('cethosweb_blog_authors')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    console.error('Error fetching author:', error);
    return null;
  }

  return data;
}

// ============================================================================
// POST FUNCTIONS
// ============================================================================

/**
 * Get published posts with pagination
 */
export async function getPublishedPosts(
  limit: number = 10,
  offset: number = 0
): Promise<{ posts: BlogPost[]; total: number }> {
  // Get total count
  const { count } = await supabase
    .from('cethosweb_blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  // Get posts with category and author
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts:', error);
    return { posts: [], total: 0 };
  }

  return {
    posts: data || [],
    total: count || 0,
  };
}

/**
 * Get all published posts (for sitemap)
 */
export async function getAllPublishedPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching all posts:', error);
    return [];
  }

  return data || [];
}

/**
 * Get a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .single();

  if (error) {
    console.error('Error fetching post:', error);
    return null;
  }

  return data;
}

/**
 * Get all post slugs (for generateStaticParams)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select('slug')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  if (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }

  return (data || []).map((p) => p.slug);
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(
  categorySlug: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ posts: BlogPost[]; total: number; category: BlogCategory | null }> {
  // Get category first
  const category = await getCategoryBySlug(categorySlug);
  if (!category) {
    return { posts: [], total: 0, category: null };
  }

  // Get total count
  const { count } = await supabase
    .from('cethosweb_blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('category_id', category.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  // Get posts
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('category_id', category.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts by category:', error);
    return { posts: [], total: 0, category };
  }

  return {
    posts: data || [],
    total: count || 0,
    category,
  };
}

/**
 * Get posts by author slug
 */
export async function getPostsByAuthor(
  authorSlug: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ posts: BlogPost[]; total: number; author: BlogAuthor | null }> {
  // Get author first
  const author = await getAuthorBySlug(authorSlug);
  if (!author) {
    return { posts: [], total: 0, author: null };
  }

  // Get total count
  const { count } = await supabase
    .from('cethosweb_blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('author_id', author.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  // Get posts
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('author_id', author.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts by author:', error);
    return { posts: [], total: 0, author };
  }

  return {
    posts: data || [],
    total: count || 0,
    author,
  };
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(
  tag: string,
  limit: number = 10,
  offset: number = 0
): Promise<{ posts: BlogPost[]; total: number }> {
  // Get total count
  const { count } = await supabase
    .from('cethosweb_blog_posts')
    .select('*', { count: 'exact', head: true })
    .contains('tags', [tag])
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString());

  // Get posts
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .contains('tags', [tag])
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching posts by tag:', error);
    return { posts: [], total: 0 };
  }

  return {
    posts: data || [],
    total: count || 0,
  };
}

/**
 * Get related posts (same category, excluding current post)
 */
export async function getRelatedPosts(
  postId: string,
  categoryId: string | null,
  limit: number = 3
): Promise<BlogPost[]> {
  if (!categoryId) return [];

  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('category_id', categoryId)
    .neq('id', postId)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }

  return data || [];
}

/**
 * Search posts by title, excerpt, or content
 */
export async function searchPosts(
  query: string,
  limit: number = 10
): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error searching posts:', error);
    return [];
  }

  return data || [];
}

/**
 * Get featured posts
 */
export async function getFeaturedPosts(limit: number = 3): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('cethosweb_blog_posts')
    .select(`
      *,
      category:cethosweb_blog_categories(*),
      author:cethosweb_blog_authors(*)
    `)
    .eq('is_featured', true)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }

  return data || [];
}

/**
 * Increment view count for a post
 */
export async function incrementViewCount(postId: string): Promise<void> {
  const { error } = await supabase.rpc('increment_post_view_count', {
    post_id: postId,
  });

  if (error) {
    // Non-critical error, just log it
    console.error('Error incrementing view count:', error);
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format a date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Calculate read time from content
 */
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}
