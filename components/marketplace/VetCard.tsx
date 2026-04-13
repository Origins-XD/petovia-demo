'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, MapPin, ArrowRight, Star } from 'lucide-react';
import { useState } from 'react';
import { cn, isOpenNow } from '@/lib/utils';
import type { Vet } from '@/lib/types';

interface VetCardProps {
  vet: Vet;
  className?: string;
}

const PRICE_LABELS: Record<number, string> = { 1: '£', 2: '££', 3: '£££' };

export function VetCardSkeleton() {
  return (
    <div className="bg-surface-container-lowest rounded-[16px] p-5 shadow-teal-xs ring-1 ring-border/40 overflow-hidden">
      <div className="flex gap-4">
        {/* Photo skeleton */}
        <div className="w-24 h-24 md:w-28 md:h-28 rounded-[12px] shimmer shrink-0" />
        <div className="flex-1 min-w-0">
          {/* Name */}
          <div className="h-5 w-3/4 shimmer rounded-full mb-2" />
          {/* Stars */}
          <div className="h-4 w-1/3 shimmer rounded-full mb-3" />
          {/* Status */}
          <div className="h-4 w-1/2 shimmer rounded-full mb-4" />
          {/* Chips */}
          <div className="flex gap-2">
            <div className="h-7 w-20 shimmer rounded-full" />
            <div className="h-7 w-24 shimmer rounded-full" />
            <div className="h-7 w-16 shimmer rounded-full" />
          </div>
        </div>
      </div>
      {/* Bottom row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/40">
        <div className="h-4 w-24 shimmer rounded-full" />
        <div className="h-9 w-28 shimmer rounded-full" />
      </div>
    </div>
  );
}

export default function VetCard({ vet, className }: VetCardProps) {
  const [saved, setSaved] = useState(false);
  const { isOpen, statusText } = isOpenNow(vet.openingHours);

  const visibleServices = vet.services.slice(0, 3);
  const extraCount = vet.services.length - visibleServices.length;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(26,173,160,0.16)' }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={cn(
        'group bg-surface-container-lowest rounded-[16px] p-5 shadow-teal-xs ring-1 ring-border/40 overflow-hidden transition-all duration-300',
        className
      )}
    >
      <div className="flex gap-4 items-start">
        {/* Clinic photo */}
        <Link href={`/marketplace/${vet.id}`} className="shrink-0 relative block">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-[12px] bg-surface-container-low overflow-hidden ring-[1.5px] ring-primary/20"
          >
            <Image
              src={vet.photo}
              alt={`${vet.name} clinic`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 96px, 112px"
            />
          </motion.div>

          {/* Verified badge */}
          {vet.verified && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-teal-sm ring-2 ring-surface-container-lowest">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          )}
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + price tier */}
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <Link href={`/marketplace/${vet.id}`}>
              <h3 className="text-[0.9375rem] font-bold text-on-surface leading-snug tracking-tight hover:text-primary transition-colors line-clamp-2">
                {vet.name}
              </h3>
            </Link>
            <span className="text-xs font-bold text-on-surface-variant shrink-0 mt-0.5">
              {PRICE_LABELS[vet.priceTier]}
            </span>
          </div>

          {/* Star row */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="flex items-center gap-1">
              <Star size={13} className="fill-secondary-container text-secondary-container" />
              <span className="text-sm font-bold text-on-surface tabular-nums">{vet.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">
              ({vet.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Open status */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className={cn('w-2 h-2 rounded-full flex-shrink-0', isOpen ? 'bg-green-500' : 'bg-red-400')} />
            <span className={cn('text-xs font-semibold', isOpen ? 'text-green-700' : 'text-red-600')}>
              {statusText}
            </span>
          </div>

          {/* Service chips */}
          <div className="flex flex-wrap gap-1.5">
            {visibleServices.map((s) => (
              <span
                key={s}
                className="inline-flex items-center px-2.5 py-1 rounded-full bg-teal-soft text-primary text-[11px] font-semibold"
              >
                {s}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-semibold">
                +{extraCount} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium min-w-0">
          <MapPin size={12} className="shrink-0 text-outline" />
          <span className="truncate">
            {vet.distanceMi != null ? `${vet.distanceMi.toFixed(1)} mi · ` : ''}{vet.borough}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Save heart */}
          <button
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? 'Remove from saved' : 'Save clinic'}
            className={cn(
              'w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90',
              saved
                ? 'bg-red-50 text-red-500'
                : 'bg-surface-container text-on-surface-variant hover:bg-red-50 hover:text-red-400'
            )}
          >
            <Heart size={16} className={saved ? 'fill-red-500' : ''} />
          </button>

          {/* View clinic */}
          <Link
            href={`/marketplace/${vet.id}`}
            className="flex items-center gap-1.5 pl-4 pr-3 py-2 bg-primary text-white rounded-full text-xs font-bold transition-all duration-200 hover:bg-teal-deep active:scale-[0.98] group/btn shadow-teal-xs"
          >
            View clinic
            <motion.span
              animate={{ x: 0 }}
              whileHover={{ x: 3 }}
              className="inline-block"
            >
              <ArrowRight size={13} />
            </motion.span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
