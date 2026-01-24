import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/blog-db';

export const revalidate = 3600;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Cethos Blog',
    };
  }

  return {
    title: post.meta_title || `${post.title} | Cethos Blog`,
    description: post.meta_description || post.excerpt || '',
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.excerpt || '',
      url: `https://cethos.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.published_at || undefined,
      images: post.featured_image ? [post.featured_image] : [],
    },
  };
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.id, post.category_id, 3);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      <section className="relative bg-[#0C2340]">
        {/* Background Image */}
        {post.featured_image && (
          <div className="absolute inset-0">
            <Image
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C2340] via-[#0C2340]/80 to-[#0C2340]/60" />
          </div>
        )}

        {/* Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          {/* Breadcrumb */}
          <nav className="flex text-sm text-gray-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            {post.category && (
              <>
                <span className="mx-2">/</span>
                <Link
                  href={`/blog/category/${post.category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>

          {/* Category Badge */}
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-[#0891B2] text-white mb-6 hover:bg-[#06B6D4] transition-colors"
            >
              {post.category.name}
            </Link>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.author.avatar_url ? (
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    width={48}
                    height={48}
                    className="rounded-full border-2 border-white/20"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-semibold text-lg">
                    {post.author.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-white">{post.author.name}</p>
                  {post.author.title && (
                    <p className="text-sm text-gray-400">{post.author.title}</p>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time>{post.published_at && formatDate(post.published_at)}</time>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{post.read_time} min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image - Full Width */}
      {post.featured_image && (
        <div className="relative -mt-8 mx-4 md:mx-auto md:max-w-5xl">
          <div className="relative aspect-[21/9] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Excerpt/Introduction */}
        {post.excerpt && (
          <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-10 font-light">
            {post.excerpt}
          </p>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none
          prose-headings:font-bold prose-headings:text-[#0C2340]
          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
          prose-a:text-[#0891B2] prose-a:font-medium prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#0C2340] prose-strong:font-semibold
          prose-ul:my-6 prose-ul:space-y-2
          prose-ol:my-6 prose-ol:space-y-2
          prose-li:text-gray-700 prose-li:leading-relaxed
          prose-li:marker:text-[#0891B2]
          prose-blockquote:border-l-4 prose-blockquote:border-[#0891B2] prose-blockquote:bg-gray-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-600
          prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
          prose-pre:bg-[#0C2340] prose-pre:text-gray-100
        ">
          <ReactMarkdown
            components={{
              // Custom heading renderers for better IDs
              h2: ({ children }) => (
                <h2 id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 id={String(children).toLowerCase().replace(/\s+/g, '-')}>
                  {children}
                </h3>
              ),
              // Ensure lists are properly styled
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-6 space-y-3">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-6 space-y-3">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="pl-2">
                  {children}
                </li>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Topics
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author && (
          <div className="mt-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              {post.author.avatar_url ? (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-[#0891B2] flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  {post.author.name.charAt(0)}
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#0891B2] uppercase tracking-wide mb-1">
                  Written by
                </p>
                <p className="text-xl font-bold text-[#0C2340] mb-1">
                  {post.author.name}
                </p>
                {post.author.title && (
                  <p className="text-gray-600 mb-3">{post.author.title}</p>
                )}
                {post.author.bio && (
                  <p className="text-gray-600 leading-relaxed">{post.author.bio}</p>
                )}
                {(post.author.linkedin_url || post.author.twitter_url) && (
                  <div className="flex gap-4 mt-4">
                    {post.author.linkedin_url && (
                      <a
                        href={post.author.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#0077B5] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                    )}
                    {post.author.twitter_url && (
                      <a
                        href={post.author.twitter_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#1DA1F2] transition-colors"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0C2340] mb-10 text-center">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
                >
                  {relatedPost.featured_image && (
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="relative h-48 bg-gray-100 overflow-hidden">
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.featured_image_alt || relatedPost.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {relatedPost.category && (
                      <span className="text-sm font-medium text-[#0891B2]">
                        {relatedPost.category.name}
                      </span>
                    )}
                    <h3 className="mt-2 font-bold text-lg text-[#0C2340] group-hover:text-[#0891B2] transition-colors">
                      <Link href={`/blog/${relatedPost.slug}`}>
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-gray-500">
                      {relatedPost.read_time} min read
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#0C2340] py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Professional Translation Services?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Get expert translation for your documents, clinical trials, or business content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-quote"
              className="inline-block px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#0C2340] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
