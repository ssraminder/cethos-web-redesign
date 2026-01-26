import { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedPosts, getCategories } from '@/lib/blog-db';
import BlogListInfinite from '@/components/blog/BlogListInfinite';

export const metadata: Metadata = {
  title: 'Translation Blog | Industry Insights & Tips | Cethos',
  description: 'Expert insights on translation, localization, and global communication from Cethos Solutions Inc.',
  openGraph: {
    title: 'Translation Blog | Cethos Solutions Inc.',
    description: 'Expert insights on translation, localization, and global communication.',
    url: 'https://cethos.com/blog',
    type: 'website',
  },
};

// Revalidate every 60 seconds for faster post updates
export const revalidate = 60;

const INITIAL_POSTS_LIMIT = 6;

export default async function BlogPage() {
  const [{ posts, total }, categories] = await Promise.all([
    getPublishedPosts(INITIAL_POSTS_LIMIT, 0),
    getCategories(),
  ]);

  const hasMore = total > INITIAL_POSTS_LIMIT;

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="min-h-[320px] bg-gradient-to-br from-[#0C2340] via-[#0C2340] to-[#0891B2] pt-32 pb-16 flex items-center">
        <div className="container mx-auto px-4 text-center">
          {/* Breadcrumbs */}
          <nav className="text-sm text-gray-300 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Blog</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Translation Insights & Resources
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Expert perspectives on translation, localization, and global communication from the Cethos team.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full bg-[#0891B2] text-white text-sm font-medium hover:bg-[#06B6D4] transition-colors"
              >
                All Posts
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/blog/category/${category.slug}`}
                  className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts published yet. Check back soon!</p>
            </div>
          ) : (
            <BlogListInfinite initialPosts={posts} initialHasMore={hasMore} />
          )}
        </div>
      </section>
    </main>
  );
}
