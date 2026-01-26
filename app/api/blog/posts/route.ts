import { NextRequest, NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/blog-db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '6');
  const offset = (page - 1) * limit;

  try {
    const { posts, total } = await getPublishedPosts(limit, offset);

    const totalPages = Math.ceil(total / limit);
    const hasMore = page < totalPages;

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        totalCount: total,
        totalPages,
        hasMore,
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
