import { Star } from 'lucide-react';

interface TrustedByLogosProps {
  displayCount?: number;
  title?: string;
  subtitle?: string;
  bgClass?: string;
}

const testimonials = [
  {
    quote:
      "Cethos consistently delivers accurate, culturally nuanced translations on tight deadlines. They've become an indispensable partner for our global operations.",
    author: 'Director of Global Communications',
    stars: 5,
  },
  {
    quote:
      'Exceptional quality and attention to detail. Their team understood our technical terminology perfectly and delivered ahead of schedule.',
    author: 'VP of Regulatory Affairs',
    stars: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[...Array(count)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export default function TrustedByLogos({
  bgClass = 'bg-gray-50',
}: TrustedByLogosProps) {
  return (
    <section className={`py-16 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-1 mb-1">
          <StarRating count={5} />
        </div>
        <p className="text-sm text-gray-500 mb-8">
          139 five-star reviews on Google
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="bg-white rounded-xl border border-gray-200 p-6 text-left"
            >
              <StarRating count={t.stars} />
              <p className="mt-3 text-gray-700 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-4 text-sm font-medium text-gray-500">
                &mdash; {t.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
