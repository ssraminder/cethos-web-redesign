import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  // Per-request client (see admin/translations/export/route.ts): module-scope
  // createClient crashed `next build` when the Supabase env vars were absent in
  // the Vercel Preview environment.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  try {
    const { data, error } = await supabase
      .from('cethosweb_testimonials')
      .select('id, reviewer_name, reviewer_initial, service_type, rating, review_text, review_source, review_date, is_featured')
      .eq('is_active', true)
      .order('is_featured', { ascending: false })
      .order('sort_order', { ascending: true });

    if (error) {
      console.error('Testimonials fetch error:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || []);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
