import { NextRequest, NextResponse } from 'next/server';
import { getAdminUserFromToken } from '@/lib/admin/auth';

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.replace('Bearer ', '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await getAdminUserFromToken(token);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    const { action, postTitle, selectedText, fullContent } = body;

    // Check for API key
    const apiKey = process.env.AI_PROVIDER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        result: getPlaceholderResponse(action, postTitle, selectedText),
      });
    }

    // In production, this would call an AI provider API
    // For now, return placeholder responses
    return NextResponse.json({
      result: getPlaceholderResponse(action, postTitle, selectedText),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

function getPlaceholderResponse(action: string, postTitle?: string, selectedText?: string): string {
  switch (action) {
    case 'generate_outline':
      return `## Suggested Outline for "${postTitle || 'Your Post'}"\n\n### Introduction\nBrief overview of the topic and why it matters.\n\n### Key Concepts\nCore ideas and definitions.\n\n### Benefits and Advantages\nWhy readers should care.\n\n### Implementation Steps\nPractical advice and how-to.\n\n### Best Practices\nTips and recommendations.\n\n### Conclusion\nSummary and call to action.`;

    case 'write_introduction':
      return `In today's rapidly evolving landscape, understanding ${postTitle || 'this topic'} is more important than ever. Whether you're a seasoned professional or just getting started, this comprehensive guide will walk you through everything you need to know to succeed.`;

    case 'expand_selection':
      return `${selectedText || ''}\n\nTo elaborate further on this point, it's worth considering the broader implications. Research shows that organizations who invest in this area see significant improvements in efficiency and outcomes. By taking a systematic approach, teams can achieve better results while reducing overhead costs.`;

    case 'improve_seo':
      return `**SEO Suggestions:**\n\n1. **Keyword Placement:** Add your focus keyword to the first paragraph and at least one H2 heading.\n2. **Heading Structure:** Ensure you have H2 and H3 headings with relevant keywords.\n3. **Internal Links:** Consider linking to related posts on your site.\n4. **Meta Description:** Write a compelling meta description (150-160 characters) that includes your target keyword.\n5. **Image Alt Text:** Add descriptive alt text to all images.`;

    case 'suggest_titles':
      return `**Alternative Title Suggestions:**\n\n1. "The Complete Guide to ${postTitle || 'This Topic'}: What You Need to Know"\n2. "${postTitle || 'This Topic'}: A Step-by-Step Guide for 2026"\n3. "Why ${postTitle || 'This Topic'} Matters More Than Ever"\n4. "Mastering ${postTitle || 'This Topic'}: Expert Tips and Strategies"\n5. "The Ultimate ${postTitle || 'This Topic'} Playbook for Businesses"`;

    case 'generate_meta_description':
      return `Discover everything you need to know about ${postTitle || 'this topic'}. Our comprehensive guide covers key strategies, best practices, and actionable tips to help you succeed.`;

    default:
      return 'AI assistance is ready. Select an action to get started.';
  }
}
