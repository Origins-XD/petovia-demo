'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, ChevronRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative px-5 sm:px-8 pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-cream">
      {/* Subtle radial glow behind hero */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #1aada0 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
        {/* Left column */}
        <div className="relative z-10">
          {/* Badge */}
          <div className="flex flex-wrap gap-3 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-soft text-primary rounded-full text-xs font-bold tracking-wider border border-primary/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              TRUSTED BY 10,000+ PET PARENTS
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight text-on-surface leading-[1.05] mb-6">
            Every pet service.{' '}
            <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary-container to-secondary-container">
              One trusted place.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-on-surface-variant font-medium max-w-lg mb-10 leading-relaxed">
            The modern directory for London pet owners. From elite vets to bespoke groomers — discover the gold standard of care.
          </p>

          {/* Pill search bar */}
          <div className="bg-surface-container-lowest rounded-full shadow-teal-lg flex items-center gap-2 p-2 max-w-xl ring-1 ring-border/60 focus-within:ring-2 focus-within:ring-primary/30 transition-all">
            <div className="flex items-center gap-2 pl-4 pr-4 border-r border-outline-variant/40 shrink-0">
              <span className="material-symbols-outlined text-primary text-xl leading-none">pets</span>
              <span className="text-sm font-bold text-on-surface whitespace-nowrap">Vets</span>
            </div>
            <div className="flex items-center gap-2 px-4 flex-grow min-w-0">
              <MapPin size={16} className="text-outline shrink-0" />
              <input
                type="text"
                placeholder="Enter postcode or area"
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-on-surface placeholder:text-outline py-3 min-w-0"
              />
            </div>
            <Link
              href="/marketplace"
              className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-teal-deep transition-colors active:scale-90 shadow-teal-sm"
            >
              <Search size={18} />
            </Link>
          </div>

          {/* Pill tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: 'Discover', icon: 'explore' },
              { label: 'Compare', icon: 'compare_arrows' },
              { label: 'Trust', icon: 'verified_user' },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary-container text-white rounded-full font-semibold text-sm shadow-teal-xs"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — image with floating stats */}
        <div className="relative hidden lg:block h-[580px]">
          {/* Tilted background shape */}
          <div className="absolute inset-0 bg-secondary-container/20 rounded-[4rem] rotate-3 -z-10 translate-x-8 translate-y-8 scale-95" />

          {/* Main image */}
          <div className="relative z-10 w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl">
            <Image
              src="/hero-dog.jpg"
              alt="Happy golden retriever"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 0px, 50vw"
            />
          </div>

          {/* Floating stat card — rating */}
          <div className="absolute -bottom-4 -left-10 bg-surface-container-lowest px-6 py-4 rounded-2xl shadow-teal-lg flex items-center gap-4 z-20 ring-1 ring-border/40">
            <div className="w-11 h-11 bg-secondary/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}>star</span>
            </div>
            <div>
              <p className="text-2xl font-black text-on-surface leading-none">4.8</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">Average Rating</p>
            </div>
          </div>

          {/* Floating stat card — vets */}
          <div className="absolute -top-4 -right-4 bg-surface-container-lowest px-5 py-3.5 rounded-2xl shadow-teal-md flex items-center gap-3 z-20 ring-1 ring-border/40">
            <span className="material-symbols-outlined text-primary text-2xl">medical_services</span>
            <div>
              <p className="text-lg font-black text-on-surface leading-none">100+</p>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mt-0.5">Verified Vets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="lg:hidden mt-10 flex gap-3">
        <Link
          href="/marketplace"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-primary text-white rounded-full font-bold text-sm shadow-teal-sm active:scale-[0.98]"
        >
          Find a vet
          <ChevronRight size={16} />
        </Link>
        <Link
          href="/community"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-surface-container text-on-surface rounded-full font-semibold text-sm active:scale-[0.98]"
        >
          Community
        </Link>
      </div>
    </section>
  );
}
