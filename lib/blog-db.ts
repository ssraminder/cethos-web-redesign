import { createClient } from '@supabase/supabase-js'

// Create Supabase client for blog data fetching
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Types
export interface BlogAuthor {
  id: string
  name: string
  title: string | null
  bio: string | null
  avatar_url: string | null
}

export interface BlogCategory {
  id: string
  slug: string
  name: string
  description: string | null
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  description: string | null
  content: string | null
  featured_image: string | null
  published_at: string | null
  read_time: string | null
  tags: string[] | null
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  category_id: string | null
  author_id: string | null
  category: BlogCategory | null
  author: BlogAuthor | null
  created_at: string
  updated_at: string
}

// Simplified type for sitemap
export interface SitemapPost {
  slug: string
  updated_at: string
}

// Simplified type for related posts
export interface RelatedPost {
  id: string
  slug: string
  title: string
  description: string | null
  featured_image: string | null
  published_at: string | null
}

// Helper function to format dates
export function formatPostDate(dateString: string | null): string {
  if (!dateString) return ''

  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

// Get all published posts with pagination
export async function getPublishedPosts(
  limit: number = 12,
  offset: number = 0
): Promise<{ posts: BlogPost[]; total: number }> {
  const supabase = getSupabaseClient()

  const { data: posts, error, count } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      category:blog_categories(*),
      author:blog_authors(*)
    `,
      { count: 'exact' }
    )
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], total: 0 }
  }

  return { posts: posts || [], total: count || 0 }
}

// Get all published posts (for sitemap)
export async function getAllPublishedPosts(): Promise<SitemapPost[]> {
  const supabase = getSupabaseClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts for sitemap:', error)
    return []
  }

  return posts || []
}

// Get all post slugs (for static generation)
export async function getAllPostSlugs(): Promise<string[]> {
  const supabase = getSupabaseClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())

  if (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }

  return posts?.map((p) => p.slug) || []
}

// Get a single post by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = getSupabaseClient()

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      category:blog_categories(*),
      author:blog_authors(*)
    `
    )
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return post
}

// Get all categories
export async function getCategories(): Promise<BlogCategory[]> {
  const supabase = getSupabaseClient()

  const { data: categories, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name')

  if (error) {
    console.error('Error fetching categories:', error)
    return []
  }

  return categories || []
}

// Get all category slugs (for static generation)
export async function getAllCategorySlugs(): Promise<string[]> {
  const supabase = getSupabaseClient()

  const { data: categories, error } = await supabase
    .from('blog_categories')
    .select('slug')

  if (error) {
    console.error('Error fetching category slugs:', error)
    return []
  }

  return categories?.map((c) => c.slug) || []
}

// Get posts by category with pagination
export async function getPostsByCategory(
  categorySlug: string,
  limit: number = 12,
  offset: number = 0
): Promise<{ posts: BlogPost[]; category: BlogCategory | null; total: number }> {
  const supabase = getSupabaseClient()

  // First get the category
  const { data: category, error: catError } = await supabase
    .from('blog_categories')
    .select('*')
    .eq('slug', categorySlug)
    .single()

  if (catError || !category) {
    console.error('Error fetching category:', catError)
    return { posts: [], category: null, total: 0 }
  }

  // Then get posts in that category
  const { data: posts, error, count } = await supabase
    .from('blog_posts')
    .select(
      `
      *,
      category:blog_categories(*),
      author:blog_authors(*)
    `,
      { count: 'exact' }
    )
    .eq('category_id', category.id)
    .eq('status', 'published')
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) {
    console.error('Error fetching posts by category:', error)
    return { posts: [], category, total: 0 }
  }

  return { posts: posts || [], category, total: count || 0 }
}

// Get related posts (same category, excluding current post)
export async function getRelatedPosts(
  currentPostId: string,
  categoryId: string | null,
  limit: number = 3
): Promise<RelatedPost[]> {
  if (!categoryId) return []

  const supabase = getSupabaseClient()

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select(
      `
      id,
      slug,
      title,
      description,
      featured_image,
      published_at
    `
    )
    .eq('category_id', categoryId)
    .eq('status', 'published')
    .neq('id', currentPostId)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching related posts:', error)
    return []
  }

  return posts || []
}
