import { createClient } from '@supabase/supabase-js';
import { AdminUser } from './permissions';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side admin auth helper for API routes
export async function getAdminUserFromToken(authHeader: string | null): Promise<AdminUser | null> {
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.replace('Bearer ', '');

  // Create a client with the user's token to verify their identity
  const userClient = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: { user }, error } = await userClient.auth.getUser();
  if (error || !user) return null;

  // Now use the service client to fetch the admin user record
  const serviceClient = createClient(supabaseUrl, supabaseServiceKey);
  const { data: adminUser } = await serviceClient
    .from('cethosweb_admin_users')
    .select('*')
    .eq('auth_user_id', user.id)
    .eq('is_active', true)
    .single();

  return adminUser || null;
}

// Create a service-level Supabase client for admin DB operations
export function createAdminSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Log an action to the audit trail
export async function logAuditAction(params: {
  userId: string;
  userEmail: string;
  userName: string;
  action: string;
  entityType: string;
  entityId: string;
  entityName: string;
  oldValue?: Record<string, unknown> | null;
  newValue?: Record<string, unknown> | null;
  changes?: Record<string, unknown> | null;
  request?: Request;
}) {
  const supabase = createAdminSupabaseClient();

  const ip = params.request?.headers.get('x-forwarded-for') ||
    params.request?.headers.get('x-real-ip') || null;
  const userAgent = params.request?.headers.get('user-agent') || null;

  await supabase.from('cethosweb_audit_log').insert({
    user_id: params.userId,
    user_email: params.userEmail,
    user_name: params.userName,
    action: params.action,
    entity_type: params.entityType,
    entity_id: params.entityId,
    entity_name: params.entityName,
    old_value: params.oldValue || null,
    new_value: params.newValue || null,
    changes: params.changes || null,
    ip_address: ip,
    user_agent: userAgent,
  });
}
