import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { getPublishedPosts, getCategories, formatPostDate, BlogPost, BlogCategory } from '@/lib/blog-db'

export const metadata: Metadata = {
  title: 'Translation Blog | Industry Insights & Tips | Cethos',
  description: 'Expert insights on translation, localization, and global communication. Tips, best practices, case studies, and industry news from Cethos.',
  alternates: {
    canonical: 'https://cethos.com/blog',
  },
}

// Revalidate every hour
export const revalidate = 3600

export default async function BlogPage() {
  const [{ posts }, categories] = await Promise.all([
    getPublishedPosts(12, 0),
    getCategories(),
  ])

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
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4B5563]">No posts found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0C2340] py-16">
        <div className="max-w-[600px] mx-auto px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-white/70 mb-6">
            Get the latest translation insights delivered to your inbox.
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

function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Featured Image */}
      {post.featured_image && (
        <div className="aspect-[16/9] bg-[#F8FAFC] overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {!post.featured_image && (
        <div className="aspect-[16/9] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 flex items-center justify-center">
          <span className="text-4xl">📝</span>
        </div>
      )}

      <div className="p-6">
        {/* Category */}
        {post.category && (
          <Link
            href={`/blog/category/${post.category.slug}`}
            className="text-xs font-semibold text-[#0891B2] uppercase tracking-wider hover:underline"
          >
            {post.category.name}
          </Link>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-[#0C2340] mt-2 mb-3 group-hover:text-[#0891B2] transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Description */}
        <p className="text-[#4B5563] text-sm mb-4 line-clamp-2">
          {post.description}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#6B7280]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatPostDate(post.published_at)}
          </span>
          {post.read_time && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.read_time}
            </span>
          )}
        </div>

        {/* Read More */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#0891B2] mt-4 hover:underline"
        >
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
