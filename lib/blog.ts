export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image?: string
  readTime: string
}

export interface BlogCategory {
  slug: string
  name: string
  description: string
}

export const categories: BlogCategory[] = [
  { slug: 'translation-tips', name: 'Translation Tips', description: 'Best practices for translation projects' },
  { slug: 'industry-insights', name: 'Industry Insights', description: 'Trends and news in the translation industry' },
  { slug: 'localization', name: 'Localization', description: 'Software and content localization guides' },
  { slug: 'case-studies', name: 'Case Studies', description: 'Client success stories' },
  { slug: 'regulatory', name: 'Regulatory Updates', description: 'Compliance and regulatory news' },
  { slug: 'technology', name: 'Technology', description: 'Translation technology and AI' },
]

export const blogPosts: BlogPost[] = [
  {
    slug: 'fda-labeling-requirements-2024',
    title: 'FDA Labeling Requirements for Multilingual Pharmaceutical Products in 2024',
    description: 'A comprehensive guide to FDA labeling translation requirements, including recent updates and best practices for pharmaceutical companies.',
    date: '2024-01-15',
    author: 'Dr. Sarah Chen',
    category: 'regulatory',
    tags: ['FDA', 'pharmaceutical', 'labeling', 'compliance'],
    readTime: '8 min read',
  },
  {
    slug: 'machine-translation-vs-human-translation',
    title: 'Machine Translation vs Human Translation: When to Use Each',
    description: 'Understanding when machine translation is appropriate and when human expertise is essential for quality translations.',
    date: '2024-01-10',
    author: 'Michael Roberts',
    category: 'technology',
    tags: ['machine translation', 'AI', 'quality', 'cost'],
    readTime: '6 min read',
  },
  {
    slug: 'software-localization-best-practices',
    title: '10 Software Localization Best Practices for 2024',
    description: 'Essential best practices for localizing software applications, from internationalization to testing.',
    date: '2024-01-05',
    author: 'Jennifer Kim',
    category: 'localization',
    tags: ['software', 'localization', 'i18n', 'best practices'],
    readTime: '10 min read',
  },
  {
    slug: 'certified-translation-immigration',
    title: 'Complete Guide to Certified Translation for US Immigration',
    description: 'Everything you need to know about USCIS certified translation requirements for immigration documents.',
    date: '2024-01-01',
    author: 'Maria Garcia',
    category: 'translation-tips',
    tags: ['certified', 'immigration', 'USCIS', 'legal'],
    readTime: '7 min read',
  },
  {
    slug: 'clinical-trial-translation-challenges',
    title: 'Overcoming Clinical Trial Translation Challenges in Multi-Country Studies',
    description: 'How to manage translation complexity in global clinical trials while maintaining regulatory compliance.',
    date: '2023-12-20',
    author: 'Dr. Sarah Chen',
    category: 'case-studies',
    tags: ['clinical trials', 'pharmaceutical', 'case study'],
    readTime: '12 min read',
  },
  {
    slug: 'ecommerce-localization-global-expansion',
    title: 'E-commerce Localization: Your Guide to Global Market Expansion',
    description: 'Learn how to localize your e-commerce store for international markets, from product descriptions to checkout flows.',
    date: '2023-12-15',
    author: 'Jennifer Kim',
    category: 'localization',
    tags: ['ecommerce', 'localization', 'global expansion', 'SEO'],
    readTime: '9 min read',
  },
  {
    slug: 'legal-translation-contract-best-practices',
    title: 'Legal Translation Best Practices: Contracts and Agreements',
    description: 'How to ensure accurate and legally binding translations of contracts, agreements, and legal documents.',
    date: '2023-12-10',
    author: 'Maria Garcia',
    category: 'translation-tips',
    tags: ['legal', 'contracts', 'certified', 'best practices'],
    readTime: '8 min read',
  },
  {
    slug: 'game-localization-player-experience',
    title: 'Game Localization: Creating Authentic Player Experiences Worldwide',
    description: 'Strategies for localizing video games that resonate with players in different cultures and markets.',
    date: '2023-12-05',
    author: 'Michael Roberts',
    category: 'industry-insights',
    tags: ['gaming', 'localization', 'culturalization', 'player experience'],
    readTime: '11 min read',
  },
]

export function getPostsByCategory(categorySlug: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === categorySlug)
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getCategoryBySlug(slug: string): BlogCategory | undefined {
  return categories.find((cat) => cat.slug === slug)
}

export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getPostBySlug(currentSlug)
  if (!currentPost) return []

  return blogPosts
    .filter((post) => post.slug !== currentSlug && post.category === currentPost.category)
    .slice(0, limit)
}
