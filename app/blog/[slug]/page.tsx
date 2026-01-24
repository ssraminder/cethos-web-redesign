import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getCategories,
  formatPostDate,
} from '@/lib/blog-db'

// Revalidate every hour
export const revalidate = 3600

// Generate static params for all published posts
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found | Cethos Blog',
    }
  }

  return {
    title: post.meta_title || `${post.title} | Cethos Blog`,
    description: post.meta_description || post.description,
    authors: post.author ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description: post.description || undefined,
      type: 'article',
      publishedTime: post.published_at || undefined,
      authors: post.author ? [post.author.name] : undefined,
      images: post.featured_image ? [post.featured_image] : undefined,
    },
    alternates: {
      canonical: post.canonical_url || `https://cethos.com/blog/${post.slug}`,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const [post, categories] = await Promise.all([
    getPostBySlug(params.slug),
    getCategories(),
  ])

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category_id, 3)

  return (
    <>
      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.published_at,
            author: post.author
              ? {
                  '@type': 'Person',
                  name: post.author.name,
                }
              : undefined,
            publisher: {
              '@type': 'Organization',
              name: 'Cethos Solutions Inc.',
              logo: {
                '@type': 'ImageObject',
                url: 'https://cethos.com/logo.svg',
              },
            },
            image: post.featured_image,
          }),
        }}
      />

      <article className="pt-20">
        {/* Header */}
        <header className="bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE] py-16">
          <div className="max-w-[800px] mx-auto px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[#0891B2] font-medium mb-6 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {post.category && (
              <Link
                href={`/blog/category/${post.category.slug}`}
                className="text-sm font-semibold text-[#0891B2] uppercase tracking-wider mb-4 block hover:underline"
              >
                {post.category.name}
              </Link>
            )}

            <h1 className="text-[36px] md:text-[44px] font-bold text-[#0C2340] leading-[1.1] mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author.name}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatPostDate(post.published_at)}
              </span>
              {post.read_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.read_time}
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-[1000px] mx-auto px-8 -mt-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-8 py-12">
          <div
            className="prose prose-lg max-w-none prose-headings:text-[#0C2340] prose-a:text-[#0891B2]"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#F8FAFC] text-[#4B5563] text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author && (
            <div className="mt-12 p-6 bg-[#F8FAFC] rounded-xl">
              <div className="flex items-start gap-4">
                {post.author.avatar_url && (
                  <img
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-[#0C2340]">
                    {post.author.name}
                  </div>
                  {post.author.title && (
                    <div className="text-sm text-[#4B5563]">
                      {post.author.title}
                    </div>
                  )}
                  {post.author.bio && (
                    <p className="text-sm text-[#4B5563] mt-2">
                      {post.author.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-[#F8FAFC] py-16">
            <div className="max-w-[1200px] mx-auto px-8">
              <h2 className="text-2xl font-bold text-[#0C2340] mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-[#0C2340] mb-2 hover:text-[#0891B2]">
                      {relatedPost.title}
                    </h3>
                    <p className="text-sm text-[#4B5563] line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-[#0C2340] py-16">
          <div className="max-w-[600px] mx-auto px-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Translation Services?
            </h3>
            <p className="text-white/70 mb-6">
              Get a free quote from our team of expert linguists.
            </p>
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors font-semibold"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}

// Simple markdown to HTML converter (or use a library like marked/remark)
function renderMarkdown(content: string | null): string {
  if (!content) return ''

  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
    // Lists
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li>$2</li>')
    // Paragraphs
    .replace(/\n\n/gim, '</p><p>')
    .replace(/^(.+)$/gim, '<p>$1</p>')
    // Clean up
    .replace(/<p><\/p>/g, '')
    .replace(/<p>(<h[1-6]>)/g, '$1')
    .replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    .replace(/<p>(<li>)/g, '$1')
    .replace(/(<\/li>)<\/p>/g, '$1')
}
