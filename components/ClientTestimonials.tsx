'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id?: string;
  reviewer_name: string;
  reviewer_initial: string;
  service_type: string;
  rating: number;
  review_text: string;
  review_source?: string;
  review_date?: string;
  is_featured?: boolean;
}

const fallbackReviews: Testimonial[] = [
  {
    reviewer_name: 'Hamed A.',
    reviewer_initial: 'H',
    service_type: 'Legal Translation',
    rating: 5,
    review_text:
      'Raminder and Preeti truly considered my urgent request and understood my situation, as I needed the documents for my court hearing. They provided the translations on time and at a very reasonable price. Highly recommend.',
  },
  {
    reviewer_name: 'Sarah K.',
    reviewer_initial: 'S',
    service_type: 'Certified Translation',
    rating: 5,
    review_text:
      'Had my degree and birth certificate translated for my PR application. Same-day service in Calgary was a lifesaver. Documents were accepted by IRCC on first submission.',
  },
  {
    reviewer_name: 'Dr. Chen L.',
    reviewer_initial: 'C',
    service_type: 'Life Sciences',
    rating: 5,
    review_text:
      'Outstanding work on our pharmaceutical labeling translations. The team demonstrated deep knowledge of FDA requirements and delivered ahead of our regulatory submission deadline.',
  },
];

function StarIcon() {
  return (
    <svg
      className="w-4 h-4 text-yellow-400 fill-current"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function FiveStars() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon key={i} />
      ))}
    </div>
  );
}

function shuffleAndPick(reviews: Testimonial[], count: number): Testimonial[] {
  const featured = reviews.filter((r) => r.is_featured);
  const nonFeatured = reviews.filter((r) => !r.is_featured);

  const shuffled = [...featured].sort(() => Math.random() - 0.5);
  const rest = [...nonFeatured].sort(() => Math.random() - 0.5);

  const picked = [...shuffled, ...rest].slice(0, count);
  return picked;
}

interface ClientTestimonialsProps {
  compact?: boolean;
}

export default function ClientTestimonials({ compact = false }: ClientTestimonialsProps) {
  const [reviews, setReviews] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data: Testimonial[]) => {
        if (data.length > 0) {
          setReviews(shuffleAndPick(data, 3));
        } else {
          setReviews(fallbackReviews);
        }
        setLoaded(true);
      })
      .catch(() => {
        setReviews(fallbackReviews);
        setLoaded(true);
      });
  }, []);

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2">
            <FiveStars />
            <span className="text-sm text-gray-600">
              4.9 out of 5 &bull; Based on 139 Google Reviews
            </span>
          </div>
        </div>

        {/* Review Cards (hidden in compact mode) */}
        {!compact && loaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {reviews.map((review, i) => (
              <div
                key={review.id || i}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
              >
                <FiveStars />
                <p
                  className="mt-3 text-gray-700 leading-relaxed italic flex-1"
                  style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  &ldquo;{review.review_text}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {review.reviewer_initial || review.reviewer_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {review.reviewer_name}
                    </p>
                    <p className="text-xs text-gray-500">{review.service_type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { icon: 'shield', text: 'Government of Alberta Approved' },
            { icon: 'check', text: 'BBB Accredited \u2014 A+ Rating' },
            { icon: 'cert', text: 'ISO 17100 Compliant' },
          ].map((badge) => (
            <div
              key={badge.text}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm text-gray-600"
            >
              <svg
                className="w-4 h-4 text-teal-600 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {badge.text}
            </div>
          ))}
        </div>

        {/* Google Reviews Link */}
        <div className="text-center">
          <a
            href="https://www.google.com/maps/place/Cethos+Solutions+Inc./@51.0447,-114.0719,15z/data=!4m8!3m7!1s0x537170a1b0b1b1b1:0x1234567890abcdef!8m2!3d51.0447!4d-114.0719!9m1!1b1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors"
          >
            Read all reviews on Google
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
