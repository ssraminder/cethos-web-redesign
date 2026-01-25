import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostsByCategory, getAllCategorySlugs, getCategories } from '@/lib/blog-db';

export const revalidate = 3600;

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const { category } = await getPostsByCategory(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found | Cethos Blog',
    };
  }

  return {
    title: `${category.name} | Cethos Blog`,
    description: category.description || `Articles about ${category.name} from Cethos Solutions Inc.`,
    openGraph: {
      title: `${category.name} | Cethos Blog`,
      description: category.description || `Articles about ${category.name}`,
      url: `https://cethos.com/blog/category/${category.slug}`,
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

export default async function CategoryPage({ params }: Props) {
  const { category: categorySlug } = await params;
  const [{ posts, category }, allCategories] = await Promise.all([
    getPostsByCategory(categorySlug, 12, 0),
    getCategories(),
  ]);

  if (!category) {
    notFound();
  }

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
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{category.name}</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {category.name}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            {category.description || `Browse all articles in ${category.name}`}
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog/category/${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  cat.slug === category.slug
                    ? 'bg-[#0891B2] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts in this category yet.</p>
              <Link href="/blog" className="mt-4 inline-block text-[#0891B2] hover:underline">
                View all posts
              </Link>
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
                    <h2 className="text-xl font-semibold text-gray-900">
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
