import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import BlogImage from '@/components/BlogImage';
import { getPostBySlug, getRelatedPosts, getAllPostSlugs, formatDate } from '@/lib/blog-db';

// Revalidate every 60 seconds for faster post updates
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Cethos Blog`,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: 'article',
      publishedTime: post.published_at ?? undefined,
      authors: [post.author?.name || 'Cethos Team'],
      images: post.featured_image ? [{ url: post.featured_image }] : [],
    },
  };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category_id);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image,
    author: {
      '@type': 'Person',
      name: post.author?.name,
      jobTitle: post.author?.title,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cethos Solutions Inc.',
    },
    datePublished: post.published_at,
    dateModified: post.updated_at,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Hero Section */}
        <header className="min-h-[400px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumbs */}
              <nav className="text-sm text-gray-300 mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
                <span className="mx-2">/</span>
                <span className="text-white truncate max-w-[200px] inline-block align-bottom">
                  {post.title}
                </span>
              </nav>

              {/* Category Badge */}
              {post.category && (
                <div className="mb-4">
                  <Link
                    href={`/blog/category/${post.category.slug}`}
                    className="inline-block bg-[#0891B2] hover:bg-[#06B6D4] text-white text-sm font-medium px-4 py-1.5 rounded-full transition-colors"
                  >
                    {post.category.name}
                  </Link>
                </div>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author & Meta */}
              <div className="flex items-center justify-center gap-4 text-gray-200 flex-wrap">
                {/* Author Avatar */}
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.author.avatar_url ? (
                      <Image
                        src={post.author.avatar_url}
                        alt={post.author.name}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-semibold text-lg border-2 border-white/20">
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="text-left">
                      <p className="text-white font-medium">{post.author.name}</p>
                      {post.author.title && (
                        <p className="text-gray-300 text-sm">{post.author.title}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Divider */}
                {post.author && <span className="text-gray-400">•</span>}

                {/* Date & Read Time */}
                <div className="text-gray-300 text-sm">
                  {post.published_at && (
                    <>
                      <span>{formatDate(post.published_at)}</span>
                      <span className="mx-2">•</span>
                    </>
                  )}
                  <span>{post.read_time} min read</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image - Below Hero */}
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="max-w-4xl mx-auto">
            <BlogImage
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              width={1200}
              height={630}
              className="w-full h-auto rounded-xl shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="blog-content">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl md:text-3xl font-bold text-[#0C2340] mt-10 mb-4 pb-2 border-b-2 border-[#0891B2]">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl md:text-2xl font-bold text-[#0C2340] mt-10 mb-4 pb-2 border-b border-gray-200">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg md:text-xl font-semibold text-[#0C2340] mt-8 mb-3 pl-4 border-l-4 border-[#0891B2]">
                    {children}
                  </h3>
                ),
                h4: ({ children }) => (
                  <h4 className="text-base md:text-lg font-semibold text-[#0C2340] mt-6 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="my-4 space-y-2">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-4 space-y-2 list-none counter-reset-item">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="flex items-start gap-3 text-gray-700">
                    <span className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-full bg-[#0891B2] text-white text-xs font-medium flex items-center justify-center">
                      ✓
                    </span>
                    <span className="flex-1">{children}</span>
                  </li>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-[#0C2340]">{children}</strong>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#0891B2] font-medium hover:text-[#06B6D4] underline underline-offset-2 transition-colors"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-6 pl-4 border-l-4 border-[#0891B2] bg-gray-50 py-3 pr-4 rounded-r-lg italic text-gray-600">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="px-1.5 py-0.5 bg-gray-100 text-[#0891B2] rounded text-sm font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="my-4 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-sm">
                    {children}
                  </pre>
                ),
                hr: () => (
                  <hr className="my-8 border-t border-gray-200" />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          {post.author && (
            <div className="mt-10 p-6 bg-gray-50 rounded-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-bold text-xl">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold text-[#0891B2] uppercase tracking-wider mb-1">
                    Written by
                  </div>
                  <h3 className="text-lg font-bold text-[#0C2340] mb-1">
                    {post.author.name}
                  </h3>
                  {post.author.title && (
                    <div className="text-gray-600 text-sm mb-2">{post.author.title}</div>
                  )}
                  {post.author.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed">{post.author.bio}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-[#0C2340] to-[#1a3a5c] rounded-xl text-center">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
              Need Expert Translation Services?
            </h2>
            <p className="text-gray-300 mb-6 max-w-xl mx-auto text-sm">
              Our team of specialized linguists is ready to help with your translation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/get-quote"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
              >
                Get a Free Quote
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/20"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="bg-gray-50 py-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-xl md:text-2xl font-bold text-[#0C2340] mb-6">
                Related Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.slug}`}
                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <BlogImage
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#0C2340] group-hover:text-[#0891B2] transition-colors line-clamp-2 text-sm mb-1">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {relatedPost.read_time} min read
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
