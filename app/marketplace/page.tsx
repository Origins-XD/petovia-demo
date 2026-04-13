'use client';

import { useState, useMemo } from 'react';
import { SlidersHorizontal, List, Map as MapIcon } from 'lucide-react';
import vetsData from '@/lib/data/vets.json';
import VetCard, { VetCardSkeleton } from '@/components/marketplace/VetCard';
import FilterSidebar, { type FilterState } from '@/components/marketplace/FilterSidebar';
import SortDropdown, { type SortOption } from '@/components/marketplace/SortDropdown';
import VetMap from '@/components/marketplace/VetMap';
import type { Vet } from '@/lib/types';
import { cn } from '@/lib/utils';
import { isOpenNow } from '@/lib/utils';

const DEFAULT_FILTERS: FilterState = {
  services: [],
  priceTiers: [],
  verifiedOnly: false,
  openNow: false,
};

export default function MarketplacePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('rating');
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const vets = vetsData as Vet[];

  const filtered = useMemo(() => {
    let result = vets;

    if (filters.verifiedOnly) result = result.filter((v) => v.verified);
    if (filters.openNow) result = result.filter((v) => isOpenNow(v.openingHours).isOpen);
    if (filters.services.length > 0) {
      result = result.filter((v) =>
        filters.services.every((s) => v.services.includes(s))
      );
    }
    if (filters.priceTiers.length > 0) {
      result = result.filter((v) => filters.priceTiers.includes(v.priceTier));
    }

    // Sort
    return [...result].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'reviews') return b.reviewCount - a.reviewCount;
      if (sort === 'distance') return (a.distanceMi ?? 99) - (b.distanceMi ?? 99);
      return 0;
    });
  }, [vets, filters, sort]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Page header */}
      <div className="bg-surface-container-low border-b border-border/40 px-5 sm:px-8 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight mb-1">
            Find a vet near you
          </h1>
          <p className="text-on-surface-variant text-sm font-medium">
            {vets.length} verified clinics across London
          </p>

          {/* Controls row */}
          <div className="flex items-center justify-between mt-5 gap-3">
            {/* Filter button (mobile) + Sort */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest rounded-full text-sm font-semibold text-on-surface ring-1 ring-border/50 shadow-teal-xs"
              >
                <SlidersHorizontal size={15} />
                Filters
                {(filters.services.length + filters.priceTiers.length + (filters.verifiedOnly ? 1 : 0) + (filters.openNow ? 1 : 0)) > 0 && (
                  <span className="w-5 h-5 bg-primary text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {filters.services.length + filters.priceTiers.length + (filters.verifiedOnly ? 1 : 0) + (filters.openNow ? 1 : 0)}
                  </span>
                )}
              </button>
              <SortDropdown value={sort} onChange={setSort} />
            </div>

            {/* View toggle */}
            <div className="flex items-center gap-1 bg-surface-container rounded-full p-1 ring-1 ring-border/50">
              <button
                onClick={() => setView('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200',
                  view === 'list'
                    ? 'bg-primary text-white shadow-teal-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                <List size={13} />
                <span className="hidden sm:inline">List</span>
              </button>
              <button
                onClick={() => setView('map')}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-bold transition-all duration-200',
                  view === 'map'
                    ? 'bg-primary text-white shadow-teal-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                )}
              >
                <MapIcon size={13} />
                <span className="hidden sm:inline">Map</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filter panel */}
      {filterOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-border/40 px-5 py-6">
          <FilterSidebar
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
            onClear={() => setFilters(DEFAULT_FILTERS)}
          />
        </div>
      )}

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-6 md:py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden md:block w-64 shrink-0">
            <div className="sticky top-24 bg-surface-container-lowest rounded-2xl p-5 shadow-teal-xs ring-1 ring-border/40">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                resultCount={filtered.length}
                onClear={() => setFilters(DEFAULT_FILTERS)}
              />
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            {view === 'list' ? (
              <>
                {/* Result count */}
                <p className="text-sm text-on-surface-variant font-medium mb-5">
                  {filtered.length === 0
                    ? 'No clinics match these filters'
                    : `Showing ${filtered.length} clinic${filtered.length !== 1 ? 's' : ''}`}
                </p>

                {filtered.length === 0 ? (
                  <div className="text-center py-20">
                    <span className="text-6xl block mb-4">🔍</span>
                    <h3 className="text-lg font-bold text-on-surface mb-2">No results found</h3>
                    <p className="text-on-surface-variant text-sm mb-6">
                      Try removing some filters to see more clinics.
                    </p>
                    <button
                      onClick={() => setFilters(DEFAULT_FILTERS)}
                      className="px-5 py-2.5 bg-primary text-white rounded-full text-sm font-bold"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filtered.map((vet) => (
                      <VetCard
                        key={vet.id}
                        vet={vet}
                        className={activeId === vet.id ? 'ring-2 ring-primary' : ''}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="h-[600px] md:h-[700px] rounded-2xl overflow-hidden shadow-teal-md ring-1 ring-border/40">
                <VetMap
                  vets={filtered}
                  activeId={activeId}
                  onVetHover={setActiveId}
                  onVetClick={(vet) => setActiveId(vet.id)}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
