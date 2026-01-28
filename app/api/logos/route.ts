import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate optimized image URLs using Supabase Image Transformation
function generateOptimizedUrls(filename: string) {
  const bucket = 'logos';
  const renderBase = `${supabaseUrl}/storage/v1/render/image/public/${bucket}/${filename}`;
  const objectBase = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filename}`;

  return {
    // Small: 80px for mobile
    small: `${renderBase}?width=80&quality=85&format=webp`,
    // Medium: 160px for tablet/desktop (default)
    medium: `${renderBase}?width=160&quality=85&format=webp`,
    // Large: 320px for retina displays
    large: `${renderBase}?width=320&quality=85&format=webp`,
    // Original: Fallback PNG
    original: objectBase,
  };
}

// Fisher-Yates shuffle for unbiased randomization
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const random = searchParams.get('random') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');

    let query = supabase
      .from('cethosweb_client_logos')
      .select('id, filename, display_name')
      .eq('is_active', true);

    if (featured) {
      query = query.eq('is_featured', true);
    }

    // If random, fetch all then shuffle; otherwise use sort_order and limit
    if (!random) {
      query = query.order('sort_order', { ascending: true }).limit(limit);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch logos' }, { status: 500 });
    }

    const allLogos = data || [];
    const totalCount = allLogos.length;

    // Shuffle server-side and take only what's needed
    const selectedLogos = random
      ? shuffleArray(allLogos).slice(0, limit)
      : allLogos;

    // Add optimized URLs to each logo
    const optimizedLogos = selectedLogos.map(logo => ({
      ...logo,
      urls: generateOptimizedUrls(logo.filename),
    }));

    return NextResponse.json({ logos: optimizedLogos, total: totalCount });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
