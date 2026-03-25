'use client';

interface SerpPreviewProps {
  title: string;
  description: string;
  url: string;
}

export default function SerpPreview({ title, description, url }: SerpPreviewProps) {
  const displayTitle = title || 'Page Title';
  const displayDesc = description || 'Add a meta description...';

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <p className="text-xs text-gray-400 mb-2">Google Search Preview</p>
      <p
        className="text-lg text-[#1a0dab] hover:underline cursor-pointer truncate leading-snug"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {displayTitle.length > 60 ? displayTitle.slice(0, 60) + '...' : displayTitle}
      </p>
      <p
        className="text-sm text-[#006621] mt-0.5 truncate"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {url}
      </p>
      <p
        className="text-sm text-[#545454] mt-1 line-clamp-2"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {displayDesc.length > 160 ? displayDesc.slice(0, 160) + '...' : displayDesc}
      </p>
    </div>
  );
}
