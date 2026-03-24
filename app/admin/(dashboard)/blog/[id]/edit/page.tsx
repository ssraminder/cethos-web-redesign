'use client';

import PostEditor from '@/components/admin/PostEditor';
import { useParams } from 'next/navigation';

export default function EditPostPage() {
  const params = useParams();
  return <PostEditor postId={params.id as string} />;
}
