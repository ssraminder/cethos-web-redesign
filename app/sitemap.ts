import { MetadataRoute } from 'next';
import { getAllPublishedPosts, getAllCategorySlugs } from '@/lib/blog-db';

const locales = ['en', 'fr'] as const;
const baseUrl = 'https://cethos.com';

/** Build the full URL for a path + locale. English uses no prefix (canonical). */
function localizedUrl(path: string, locale: string): string {
  if (locale === 'en') return `${baseUrl}${path}`;
  return `${baseUrl}/${locale}${path}`;
}

/** Build hreflang alternates for a given path. */
function alternates(path: string): MetadataRoute.Sitemap[number]['alternates'] {
  return {
    languages: Object.fromEntries(
      locales.map((locale) => [locale, localizedUrl(path, locale)])
    ),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages with their priorities
  const staticPaths: { path: string; changeFrequency: 'daily' | 'weekly' | 'monthly'; priority: number }[] = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/get-quote', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/blog', changeFrequency: 'daily', priority: 0.8 },
    { path: '/careers', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/privacy', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'monthly', priority: 0.3 },
    { path: '/cookies', changeFrequency: 'monthly', priority: 0.3 },

    // Industries
    { path: '/industries/ecommerce', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/energy-mining', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/finance', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/gaming', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/healthcare', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/legal', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/manufacturing', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/pharmaceutical', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/industries/technology', changeFrequency: 'monthly', priority: 0.8 },

    // Services - Main
    { path: '/services', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/certified', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/lifesciences', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/canadian', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/interpretation', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/business', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/legal', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/software', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/multimedia', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/transcription', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/services/website', changeFrequency: 'weekly', priority: 0.9 },

    // Services - Certified Translation
    { path: '/services/certified/immigration-translation-services', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/birth-certificate-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/marriage-certificate-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/academic-transcript-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/pr-citizenship-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/divorce-certificate-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/drivers-license-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/hindi-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/police-clearance-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/punjabi-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/arabic-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/spanish-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/french-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/mandarin-translation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/edmonton-translation-agency', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/wes-evaluation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/express-entry', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/iqas-alberta', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/certified/spousal-sponsorship', changeFrequency: 'weekly', priority: 0.8 },

    // Languages index
    { path: '/services/languages', changeFrequency: 'weekly', priority: 0.8 },

    // Locations
    { path: '/locations/calgary', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/edmonton', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/toronto', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/vancouver', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/ottawa', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/montreal', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/winnipeg', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/halifax', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/locations/saskatoon', changeFrequency: 'monthly', priority: 0.8 },

    // Services - Life Sciences
    { path: '/services/lifesciences/cognitive-debriefing', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/clinician-review', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/clinical-trials', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/ecoa-migration', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/linguistic-validation', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/medical-devices', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/pharmacovigilance', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/services/lifesciences/regulatory-affairs', changeFrequency: 'weekly', priority: 0.8 },
  ];

  // Generate entries for each locale with hreflang alternates
  const staticPages: MetadataRoute.Sitemap = staticPaths.flatMap(({ path, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: localizedUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: alternates(path),
    }))
  );

  // Blog posts (per locale with alternates)
  const posts = await getAllPublishedPosts();
  const blogPosts: MetadataRoute.Sitemap = posts.flatMap((post) =>
    locales.map((locale) => ({
      url: localizedUrl(`/blog/${post.slug}`, locale),
      lastModified: new Date(post.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      alternates: alternates(`/blog/${post.slug}`),
    }))
  );

  // Blog categories (per locale with alternates)
  const categorySlugs = await getAllCategorySlugs();
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: localizedUrl(`/blog/category/${slug}`, locale),
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      alternates: alternates(`/blog/category/${slug}`),
    }))
  );

  return [...staticPages, ...blogPosts, ...categoryPages];
}
