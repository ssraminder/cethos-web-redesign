import { MetadataRoute } from 'next'
import { getAllPublishedPosts, getCategories } from '@/lib/blog-db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://cethos.com'

  // Fetch blog data
  const [posts, categories] = await Promise.all([
    getAllPublishedPosts(),
    getCategories(),
  ])

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/get-quote`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, priority: 0.8, changeFrequency: 'daily' },
  ]

  // Service pages
  const servicePages: MetadataRoute.Sitemap = [
    'lifesciences',
    'certified',
    'business',
    'software',
    'multimedia',
    'canadian',
    'interpretation',
  ].map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    priority: 0.9,
    changeFrequency: 'monthly',
  }))

  // Certified translation landing pages
  const certifiedLandingPages: MetadataRoute.Sitemap = [
    'immigration-translation-services',
    'birth-certificate-translation',
    'marriage-certificate-translation',
    'academic-transcript-translation',
    'pr-citizenship-translation',
    'edmonton-translation-agency',
  ].map((slug) => ({
    url: `${baseUrl}/services/certified/${slug}`,
    priority: 0.85,
    changeFrequency: 'monthly',
  }))

  // Industry pages
  const industryPages: MetadataRoute.Sitemap = [
    'pharmaceutical',
    'legal',
    'technology',
    'finance',
    'gaming',
    'ecommerce',
    'manufacturing',
    'healthcare',
  ].map((slug) => ({
    url: `${baseUrl}/industries/${slug}`,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  // Blog posts
  const blogPostPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updated_at,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Blog categories
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...certifiedLandingPages,
    ...industryPages,
    ...blogPostPages,
    ...categoryPages,
  ]
}
