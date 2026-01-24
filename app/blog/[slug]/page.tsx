import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, getAllPostSlugs, getRelatedPosts, BlogPost } from '@/lib/blog-db';

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
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-500">
            <Link href="/" className="hover:text-[#0891B2]">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#0891B2]">Blog</Link>
            {post.category && (
              <>
                <span className="mx-2">/</span>
                <Link href={`/blog/category/${post.category.slug}`} className="hover:text-[#0891B2]">
                  {post.category.name}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-8">
          {post.category && (
            <Link
              href={`/blog/category/${post.category.slug}`}
              className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-[#0891B2]/10 text-[#0891B2] mb-4"
            >
              {post.category.name}
            </Link>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar_url && (
                  <Image
                    src={post.author.avatar_url}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-900">{post.author.name}</p>
                  {post.author.title && (
                    <p className="text-sm">{post.author.title}</p>
                  )}
                </div>
              </div>
            )}
            <span>•</span>
            <time>{post.published_at && formatDate(post.published_at)}</time>
            <span>•</span>
            <span>{post.read_time} min read</span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.featured_image_alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#0891B2] prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        {post.author && post.author.bio && (
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <div className="flex items-start gap-4">
              {post.author.avatar_url && (
                <Image
                  src={post.author.avatar_url}
                  alt={post.author.name}
                  width={64}
                  height={64}
                  className="rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                {post.author.title && (
                  <p className="text-sm text-gray-600 mb-2">{post.author.title}</p>
                )}
                <p className="text-gray-600">{post.author.bio}</p>
              </div>
            </div>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <article key={relatedPost.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  {relatedPost.featured_image && (
                    <Link href={`/blog/${relatedPost.slug}`}>
                      <div className="relative h-40 bg-gray-100">
                        <Image
                          src={relatedPost.featured_image}
                          alt={relatedPost.featured_image_alt || relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">
                      <Link href={`/blog/${relatedPost.slug}`} className="hover:text-[#0891B2]">
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{relatedPost.read_time} min read</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-[#0C2340] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Professional Translation Services?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Get expert translation for your documents, clinical trials, or business content.
          </p>
          <Link
            href="/get-quote"
            className="inline-block px-8 py-4 bg-[#0891B2] text-white font-semibold rounded-lg hover:bg-[#06B6D4] transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </main>
  );
}
