export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'author' | 'viewer' | 'translator';

export interface AdminUser {
  id: string;
  auth_user_id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  role: AdminRole;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  assigned_locales: string[] | null; // null = all locales, array = restricted
}

export const PERMISSIONS = {
  blog_posts: {
    create: ['super_admin', 'admin', 'editor'],
    read: ['super_admin', 'admin', 'editor', 'author', 'viewer'],
    update: ['super_admin', 'admin', 'editor'],
    delete: ['super_admin', 'admin', 'editor'],
  },
  blog_categories: {
    create: ['super_admin', 'admin', 'editor'],
    read: ['super_admin', 'admin', 'editor', 'author', 'viewer'],
    update: ['super_admin', 'admin', 'editor'],
    delete: ['super_admin', 'admin'],
  },
  blog_authors: {
    create: ['super_admin', 'admin'],
    read: ['super_admin', 'admin', 'editor'],
    update: ['super_admin', 'admin'],
    delete: ['super_admin', 'admin'],
  },
  tracking_pixels: {
    create: ['super_admin', 'admin', 'editor'],
    read: ['super_admin', 'admin', 'editor'],
    update: ['super_admin', 'admin', 'editor'],
    delete: ['super_admin', 'admin', 'editor'],
  },
  seo_settings: {
    create: ['super_admin', 'admin', 'editor'],
    read: ['super_admin', 'admin', 'editor'],
    update: ['super_admin', 'admin', 'editor'],
    delete: ['super_admin', 'admin'],
  },
  users: {
    create: ['super_admin'],
    read: ['super_admin', 'admin'],
    update: ['super_admin'],
    delete: ['super_admin'],
  },
  audit_log: {
    read: ['super_admin', 'admin'],
  },
  seo_dashboard: {
    read: ['super_admin', 'admin'],
  },
  translations: {
    read: ['super_admin', 'admin', 'editor', 'translator'],
    update: ['super_admin', 'admin', 'editor', 'translator'],
    export: ['super_admin', 'admin', 'editor', 'translator'],
    import: ['super_admin', 'admin'],
    publish: ['super_admin', 'admin'],
  },
} as const;

export function hasPermission(
  role: AdminRole,
  resource: keyof typeof PERMISSIONS,
  action: string
): boolean {
  const resourcePerms = PERMISSIONS[resource] as Record<string, readonly string[]> | undefined;
  if (!resourcePerms) return false;
  const allowedRoles = resourcePerms[action];
  if (!allowedRoles) return false;
  return allowedRoles.includes(role);
}
