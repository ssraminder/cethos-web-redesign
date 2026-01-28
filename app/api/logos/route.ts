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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit') || '527');

    let query = supabase
      .from('cethosweb_client_logos')
      .select('id, filename, display_name')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .limit(limit);

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch logos' }, { status: 500 });
    }

    // Add optimized URLs to each logo
    const optimizedLogos = (data || []).map(logo => ({
      ...logo,
      urls: generateOptimizedUrls(logo.filename),
    }));

    return NextResponse.json({ logos: optimizedLogos, total: optimizedLogos.length });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
