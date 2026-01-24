import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Calendar, Clock, ArrowRight, ArrowLeft } from 'lucide-react'
import {
  getPostsByCategory,
  getAllCategorySlugs,
  getCategories,
  formatPostDate,
} from '@/lib/blog-db'

// Revalidate every hour
export const revalidate = 3600

// Generate static params for all categories
export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs()
  return slugs.map((category) => ({ category }))
}

// Generate metadata
export async function generateMetadata({
  params,
}: {
  params: { category: string }
}): Promise<Metadata> {
  const { category } = await getPostsByCategory(params.category, 1, 0)

  if (!category) {
    return {
      title: 'Category Not Found | Cethos Blog',
    }
  }

  return {
    title: `${category.name} | Cethos Blog`,
    description: category.description || `Articles about ${category.name}`,
    alternates: {
      canonical: `https://cethos.com/blog/category/${category.slug}`,
    },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string }
}) {
  const [{ posts, category }, allCategories] = await Promise.all([
    getPostsByCategory(params.category, 12, 0),
    getCategories(),
  ])

  if (!category) {
    notFound()
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-20 bg-gradient-to-br from-white via-[#F8FAFC] to-[#E0F2FE]">
        <div className="max-w-[1200px] mx-auto px-8 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#0891B2] font-medium mb-6 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            All Posts
          </Link>
          <h1 className="text-[48px] font-bold text-[#0C2340] mb-4">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-xl text-[#4B5563] max-w-[600px]">
              {category.description}
            </p>
          )}
        </div>
      </section>

      {/* Categories Nav */}
      <section className="bg-white border-b border-[#E5E7EB]">
        <div className="max-w-[1200px] mx-auto px-8 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <Link
              href="/blog"
              className="px-4 py-2 text-sm font-medium text-[#4B5563] hover:text-[#0891B2] hover:bg-[#F8FAFC] rounded-full whitespace-nowrap transition-colors"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                  cat.slug === category.slug
                    ? 'text-[#0891B2] bg-[#E0F2FE]'
                    : 'text-[#4B5563] hover:text-[#0891B2] hover:bg-[#F8FAFC]'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#4B5563]">No posts found in this category.</p>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[#0891B2] font-medium mt-4 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                View all posts
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-[#E5E7EB] overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {post.featured_image ? (
                    <div className="aspect-[16/9] bg-[#F8FAFC] overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-gradient-to-br from-[#E0F2FE] to-[#0891B2]/20 flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  )}

                  <div className="p-6">
                    <h2 className="text-xl font-bold text-[#0C2340] mb-3 group-hover:text-[#0891B2] transition-colors">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-[#4B5563] text-sm mb-4 line-clamp-2">
                      {post.description}
                    </p>

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

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#0891B2] mt-4 hover:underline"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
