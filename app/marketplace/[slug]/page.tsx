import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Globe, Clock, Star, MapPin, CheckCircle2 } from 'lucide-react';
import vetsData from '@/lib/data/vets.json';
import type { Vet } from '@/lib/types';
import { isOpenNow, hashString } from '@/lib/utils';

interface Props {
  params: { slug: string };
}

const DAYS_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Generate seeded reviews for demo
function generateReviews(vet: Vet) {
  const names = [
    'Emma L.', 'James T.', 'Priya M.', 'Oliver W.', 'Sophie K.',
    'Daniel R.', 'Asha P.', 'Tom F.', 'Zoe B.', 'Marcus H.',
    'Nina C.', 'Jack D.', 'Lily S.', 'Sam O.', 'Bella N.',
  ];
  const bodies = [
    'Excellent practice — the vet was thorough, unhurried, and genuinely kind to my nervous cat. Will definitely return.',
    'Clean, professional, and great communication. They called the next day to check in after my dog\'s procedure.',
    'Really impressed with the level of care. The staff remembered my pet by name on the second visit.',
    'Good service overall. A little wait, but the vet was very knowledgeable and didn\'t try to upsell.',
    'Our Labrador had an emergency and they fitted us in same day. Cannot thank them enough.',
    'The vet took the time to explain everything clearly. Felt like they genuinely cared, not just going through the motions.',
    'Very fair pricing compared to other practices in the area. High quality care at a reasonable cost.',
    'Professional team. My rescue dog is very anxious and they handled her beautifully.',
  ];

  const h = hashString(vet.id);
  const count = 5 + (h % 8);
  return Array.from({ length: count }, (_, i) => {
    const seed = hashString(vet.id + i);
    const rating = Math.round((Math.sin(seed) * 0.8 + 4.5) * 2) / 2;
    const daysAgo = seed % 45;
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return {
      id: `review-${i}`,
      name: names[seed % names.length],
      petBadge: ['🐶', '🐱', '🐾', '🐕', '🐈'][seed % 5],
      rating: Math.min(5, Math.max(3, rating)),
      body: bodies[seed % bodies.length],
      date: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
  });
}

export default function VetProfilePage({ params }: Props) {
  const vet = (vetsData as Vet[]).find((v) => v.id === params.slug);
  if (!vet) notFound();

  const { isOpen, statusText } = isOpenNow(vet.openingHours);
  const reviews = generateReviews(vet);
  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero image */}
      <div className="relative h-56 sm:h-72 md:h-80 bg-gradient-to-br from-teal-soft via-surface-container to-amber-soft overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl opacity-20">🏥</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Back button */}
        <Link
          href="/marketplace"
          className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface rounded-full text-sm font-semibold shadow-teal-sm hover:bg-surface-container-lowest transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </Link>

        {/* Verified badge */}
        {vet.verified && (
          <div className="absolute top-5 right-5 flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-full text-xs font-bold shadow-teal-sm">
            <CheckCircle2 size={12} />
            Verified
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-5 sm:px-8 -mt-8 relative z-10 pb-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Card header */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-teal-sm ring-1 ring-border/40 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-[12px] bg-teal-soft flex items-center justify-center text-4xl ring-2 ring-primary/20 shrink-0">
                  🏥
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl md:text-2xl font-black text-on-surface tracking-tight mb-2 leading-tight">
                    {vet.name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <Star size={14} className="fill-secondary-container text-secondary-container" />
                      <span className="font-bold text-on-surface">{vet.rating.toFixed(1)}</span>
                      <span className="text-xs text-on-surface-variant">({vet.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
                      <span className={`text-xs font-semibold ${isOpen ? 'text-green-700' : 'text-red-600'}`}>
                        {statusText}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <MapPin size={12} className="text-outline shrink-0" />
                    <span className="text-xs text-on-surface-variant font-medium">
                      {vet.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service chips */}
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-border/50">
                {vet.services.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1.5 rounded-full bg-teal-soft text-primary text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Opening hours */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-teal-xs ring-1 ring-border/40 mb-6">
              <h2 className="text-base font-bold text-on-surface mb-4 flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                Opening Hours
              </h2>
              <div className="space-y-2">
                {DAYS_ORDER.map((day) => {
                  const hours = vet.openingHours.find(
                    (h) => h.day.toLowerCase() === day.toLowerCase()
                  );
                  const isToday =
                    ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
                      new Date().getDay()
                    ] === day;
                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between py-1.5 px-3 rounded-xl ${isToday ? 'bg-teal-soft' : ''}`}
                    >
                      <span className={`text-sm font-medium ${isToday ? 'text-primary font-bold' : 'text-on-surface'}`}>
                        {day}
                        {isToday && <span className="ml-2 text-[10px] font-bold text-primary uppercase tracking-wider">Today</span>}
                      </span>
                      <span className={`text-sm font-medium ${isToday ? 'text-primary font-semibold' : 'text-on-surface-variant'}`}>
                        {hours?.open && hours?.close
                          ? `${hours.open} – ${hours.close}`
                          : 'Closed'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-teal-xs ring-1 ring-border/40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-on-surface">
                  Reviews
                </h2>
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-secondary-container text-secondary-container" />
                  <span className="font-bold text-on-surface">{avgRating}</span>
                  <span className="text-xs text-on-surface-variant">({reviews.length} reviews)</span>
                </div>
              </div>
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div key={review.id} className="pb-5 border-b border-border/40 last:border-0 last:pb-0">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-xl shrink-0">
                        {review.petBadge}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-bold text-on-surface">{review.name}</span>
                          <span className="text-xs text-on-surface-variant shrink-0">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < review.rating ? 'fill-secondary-container text-secondary-container' : 'text-surface-container-highest fill-surface-container-highest'}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-on-surface-variant leading-relaxed">{review.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky contact card */}
          <div className="lg:w-72 shrink-0 w-full">
            <div className="lg:sticky lg:top-24 bg-surface-container-lowest rounded-2xl p-5 shadow-teal-md ring-1 ring-border/40">
              <div className="flex items-center gap-2 mb-5 pb-5 border-b border-border/50">
                <div className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-green-500' : 'bg-red-400'}`} />
                <span className={`text-sm font-semibold ${isOpen ? 'text-green-700' : 'text-red-600'}`}>
                  {statusText}
                </span>
              </div>

              {vet.phone && (
                <a
                  href={`tel:${vet.phone}`}
                  className="flex items-center gap-3 w-full py-3 px-4 bg-primary text-white rounded-full font-bold text-sm mb-3 hover:bg-teal-deep active:scale-[0.98] transition-all shadow-teal-sm"
                >
                  <Phone size={15} />
                  {vet.phone}
                </a>
              )}

              {vet.website && (
                <a
                  href={vet.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-surface-container text-on-surface rounded-full font-semibold text-sm mb-5 hover:bg-surface-container-high active:scale-[0.98] transition-all ring-1 ring-border/50"
                >
                  <Globe size={15} />
                  Visit website
                </a>
              )}

              <div className="space-y-2.5 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-outline mt-0.5 shrink-0" />
                  <span className="text-on-surface-variant font-medium leading-snug">
                    {vet.address}, {vet.postcode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="fill-secondary-container text-secondary-container shrink-0" />
                  <span className="text-on-surface-variant font-medium">
                    {['£', '££', '£££'][vet.priceTier - 1]} · {['Budget-friendly', 'Mid-range', 'Premium'][vet.priceTier - 1]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
