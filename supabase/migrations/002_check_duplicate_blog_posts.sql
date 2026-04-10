-- Query to identify potential duplicate/cannibalized blog posts
-- Run this against Supabase project: lmzoyezvsjgsxveoakdr
-- DO NOT delete any posts — review results and decide which to keep/redirect

SELECT slug, title, published_at
FROM cethosweb_blog_posts
WHERE status = 'published'
AND (
  slug LIKE '%clinical-trial-documentation%'
  OR slug LIKE '%ecommerce-localization-beyond%'
  OR slug LIKE '%multilingual-customer-support-transformation%'
  OR slug LIKE '%techflow%'
)
ORDER BY slug;
