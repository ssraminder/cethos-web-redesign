import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts, categories, getRelatedPosts } from '@/lib/blog'
import { ArticleJsonLd } from '@/components/JsonLd'
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    alternates: {
      canonical: `https://cethos.com/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const category = categories.find((c) => c.slug === post.category)
  const relatedPosts = getRelatedPosts(post.slug, 3)

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        author={post.author}
        url={`https://cethos.com/blog/${post.slug}`}
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

            <div className="text-sm font-semibold text-[#0891B2] uppercase tracking-wider mb-4">
              {category?.name}
            </div>

            <h1 className="text-[40px] font-bold text-[#0C2340] leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-[#4B5563]">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="max-w-[800px] mx-auto px-8 py-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-[#4B5563] leading-relaxed">
              {post.description}
            </p>

            <p className="text-[#4B5563] leading-relaxed mt-6">
              In the global marketplace, effective communication across languages is no longer
              optional—it&apos;s essential. Organizations that invest in quality translation services
              gain a significant competitive advantage by reaching new markets, building trust
              with international customers, and ensuring compliance with local regulations.
            </p>

            <h2 className="text-2xl font-bold text-[#0C2340] mt-8 mb-4">
              Key Takeaways
            </h2>

            <ul className="space-y-2 text-[#4B5563]">
              <li>Quality translation goes beyond word-for-word conversion</li>
              <li>Cultural context is crucial for effective communication</li>
              <li>Industry-specific expertise ensures accuracy and compliance</li>
              <li>Technology enhances efficiency while human expertise ensures quality</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#0C2340] mt-8 mb-4">
              Best Practices
            </h2>

            <p className="text-[#4B5563] leading-relaxed">
              When working with translation services, consider these best practices to ensure
              the best possible outcomes for your projects:
            </p>

            <ol className="space-y-2 text-[#4B5563] list-decimal list-inside mt-4">
              <li>Provide context and reference materials to translators</li>
              <li>Establish glossaries for consistent terminology</li>
              <li>Plan for text expansion in target languages</li>
              <li>Include review cycles in your project timeline</li>
              <li>Maintain open communication with your translation partner</li>
            </ol>

            <h2 className="text-2xl font-bold text-[#0C2340] mt-8 mb-4">
              Conclusion
            </h2>

            <p className="text-[#4B5563] leading-relaxed">
              By following these guidelines and partnering with experienced translation professionals,
              you can ensure your message resonates effectively across all your target markets.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-[#4B5563]">Tags:</span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-sm bg-[#F8FAFC] text-[#4B5563] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 bg-[#F8FAFC] rounded-lg text-center">
            <h3 className="text-xl font-semibold text-[#0C2340] mb-3">
              Need Professional Translation Services?
            </h3>
            <p className="text-[#4B5563] mb-6">
              Get a free quote from our team of expert linguists.
            </p>
            <Link
              href="/get-quote"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors font-semibold"
            >
              Get a Free Quote <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-[#F8FAFC] py-16">
            <div className="max-w-[1200px] mx-auto px-8">
              <h2 className="text-2xl font-bold text-[#0C2340] mb-8">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.slug}
                    className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="h-32 bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20"></div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-[#0C2340] mb-2 line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-[#0891B2] transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-sm text-[#4B5563] line-clamp-2">
                        {relatedPost.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  )
}
