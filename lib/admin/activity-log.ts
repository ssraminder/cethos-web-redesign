import { createServerSupabaseClient } from '@/lib/supabase';

export type ActionType = 'created' | 'updated' | 'published' | 'deleted' | 'scheduled';
export type ResourceType = 'post' | 'category' | 'author' | 'redirect' | 'media' | 'seo_setting' | 'tracking_pixel';

export async function logActivity(
  action: ActionType,
  resourceType: ResourceType,
  resourceId: string,
  resourceTitle: string,
  performedBy: string,
) {
  try {
    const supabase = createServerSupabaseClient();
    await supabase.from('cethosweb_admin_activity_log').insert({
      action_type: action,
      resource_type: resourceType,
      resource_id: resourceId,
      resource_title: resourceTitle,
      performed_by: performedBy,
      performed_at: new Date().toISOString(),
    });
  } catch {
    // Activity logging is non-critical, don't throw
    console.error('Failed to log activity');
  }
}
