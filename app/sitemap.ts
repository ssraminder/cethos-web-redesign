import { MetadataRoute } from 'next'
import { blogPosts, categories } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cethos.com'
  const currentDate = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: currentDate, priority: 1, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, lastModified: currentDate, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, lastModified: currentDate, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/get-quote`, lastModified: currentDate, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services`, lastModified: currentDate, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${baseUrl}/blog`, lastModified: currentDate, priority: 0.8, changeFrequency: 'weekly' },
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
    lastModified: currentDate,
    priority: 0.9,
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
    lastModified: currentDate,
    priority: 0.8,
    changeFrequency: 'monthly',
  }))

  // Blog posts
  const blogPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  // Blog categories
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/blog/category/${cat.slug}`,
    lastModified: currentDate,
    priority: 0.5,
    changeFrequency: 'weekly',
  }))

  return [
    ...staticPages,
    ...servicePages,
    ...industryPages,
    ...blogPages,
    ...categoryPages,
  ]
}
