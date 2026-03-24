import { createClient } from '@supabase/supabase-js';
import { PIXEL_TEMPLATES } from '@/lib/admin/pixel-templates';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface TrackingPixel {
  id: string;
  type: string;
  pixel_id: string | null;
  custom_head_code: string | null;
  custom_body_code: string | null;
  placement: string;
  is_active: boolean;
}

export default async function TrackingPixels() {
  let pixels: TrackingPixel[] = [];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase
      .from('cethosweb_tracking_pixels')
      .select('id, type, pixel_id, custom_head_code, custom_body_code, placement, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    pixels = data || [];
  } catch {
    // Fail silently - tracking is non-critical
    return null;
  }

  if (pixels.length === 0) return null;

  const headScripts: string[] = [];
  const bodyScripts: string[] = [];

  for (const pixel of pixels) {
    // Check for custom code overrides first
    if (pixel.custom_head_code && (pixel.placement === 'head' || pixel.placement === 'both')) {
      headScripts.push(pixel.custom_head_code);
    }
    if (pixel.custom_body_code && (pixel.placement === 'body' || pixel.placement === 'both')) {
      bodyScripts.push(pixel.custom_body_code);
    }

    // If no custom overrides and has a pixel_id, use template
    if (!pixel.custom_head_code && !pixel.custom_body_code && pixel.pixel_id) {
      const template = PIXEL_TEMPLATES[pixel.type];
      if (template) {
        const scripts = template(pixel.pixel_id);
        if (scripts.head) headScripts.push(scripts.head);
        if (scripts.body) bodyScripts.push(scripts.body);
      }
    }
  }

  return (
    <>
      {headScripts.length > 0 && (
        <div
          dangerouslySetInnerHTML={{ __html: headScripts.join('\n') }}
          suppressHydrationWarning
        />
      )}
      {bodyScripts.length > 0 && (
        <div
          id="tracking-body-scripts"
          dangerouslySetInnerHTML={{ __html: bodyScripts.join('\n') }}
          suppressHydrationWarning
        />
      )}
    </>
  );
}
