import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts, getCategories, BlogPost, BlogCategory } from '@/lib/blog-db';

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

// Revalidate every hour
export const revalidate = 3600;

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const [{ posts }, categories] = await Promise.all([
    getPublishedPosts(12, 0),
    getCategories(),
  ]);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-[#0C2340] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Translation Insights & Resources
            </h1>
            <p className="text-xl text-gray-200">
              Expert perspectives on translation, localization, and global communication
              from the Cethos team.
            </p>
          </div>
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  {post.featured_image && (
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative h-48 bg-gray-100">
                        <Image
                          src={post.featured_image}
                          alt={post.featured_image_alt || post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-6">
                    {post.category && (
                      <Link
                        href={`/blog/category/${post.category.slug}`}
                        className="text-sm font-medium text-[#0891B2] hover:text-[#06B6D4]"
                      >
                        {post.category.name}
                      </Link>
                    )}
                    <h2 className="mt-2 text-xl font-semibold text-gray-900">
                      <Link href={`/blog/${post.slug}`} className="hover:text-[#0891B2]">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && (
                      <p className="mt-3 text-gray-600 line-clamp-3">{post.excerpt}</p>
                    )}
                    <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                      <span>{post.published_at && formatDate(post.published_at)}</span>
                      <span>{post.read_time} min read</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
