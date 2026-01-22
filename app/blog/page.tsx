import { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts, categories } from '@/lib/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Translation Blog | Industry Insights & Tips',
  description: 'Expert insights on translation, localization, and global communication. Tips, best practices, case studies, and industry news from Cethos.',
  alternates: {
    canonical: 'https://cethos.com/blog',
  },
}

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <h1 className="text-[48px] font-bold text-[#0C2340] mb-4">
            Translation Insights & Resources
          </h1>
          <p className="text-xl text-[#4B5563] max-w-[600px]">
            Expert insights on translation, localization, and global communication
            from our team of industry specialists.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-[#0891B2] bg-[#E0F2FE] rounded-full whitespace-nowrap"
            >
              All Posts
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:text-[#0891B2] hover:bg-[#F8FAFC] rounded-full whitespace-nowrap transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20"></div>

                <div className="p-6">
                  {/* Category */}
                  <Link
                    href={`/blog/category/${post.category}`}
                    className="text-xs font-semibold text-[#0891B2] uppercase tracking-wider"
                  >
                    {categories.find((c) => c.slug === post.category)?.name}
                  </Link>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-[#0C2340] mt-2 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-[#0891B2] transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  {/* Description */}
                  <p className="text-sm text-[#4B5563] mb-4 line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-sm text-[#717182]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[#0C2340] py-16">
        <div className="max-w-[600px] mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/80 mb-6">
            Get the latest translation insights, industry news, and tips delivered to your inbox.
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#0891B2]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#0891B2] text-white rounded-lg hover:bg-[#06B6D4] transition-colors font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
