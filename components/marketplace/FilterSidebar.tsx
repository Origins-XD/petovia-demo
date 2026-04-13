'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const ALL_SERVICES = [
  'Microchipping', 'Emergency', 'Surgery', 'Vaccinations',
  'Dental', 'Behaviour', 'Grooming', 'Boarding',
];

const PRICE_TIERS = [
  { value: 1, label: '£', description: 'Budget-friendly' },
  { value: 2, label: '££', description: 'Mid-range' },
  { value: 3, label: '£££', description: 'Premium' },
];

export interface FilterState {
  services: string[];
  priceTiers: number[];
  verifiedOnly: boolean;
  openNow: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  onClear: () => void;
}

export default function FilterSidebar({ filters, onChange, resultCount, onClear }: FilterSidebarProps) {
  function toggleService(s: string) {
    const next = filters.services.includes(s)
      ? filters.services.filter((x) => x !== s)
      : [...filters.services, s];
    onChange({ ...filters, services: next });
  }

  function toggleTier(t: number) {
    const next = filters.priceTiers.includes(t)
      ? filters.priceTiers.filter((x) => x !== t)
      : [...filters.priceTiers, t];
    onChange({ ...filters, priceTiers: next });
  }

  const hasActive =
    filters.services.length > 0 ||
    filters.priceTiers.length > 0 ||
    filters.verifiedOnly ||
    filters.openNow;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-base font-bold text-on-surface">Filters</h2>
          <p className="text-xs text-on-surface-variant mt-0.5">{resultCount} results</p>
        </div>
        {hasActive && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs font-bold text-primary hover:text-teal-deep transition-colors"
          >
            <X size={12} />
            Clear all
          </button>
        )}
      </div>

      {/* Quick toggles */}
      <div className="mb-6 space-y-3">
        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-semibold text-on-surface">Open now</span>
          <div
            onClick={() => onChange({ ...filters, openNow: !filters.openNow })}
            className={cn(
              'relative w-11 h-6 rounded-full transition-colors duration-200',
              filters.openNow ? 'bg-primary' : 'bg-surface-container-highest'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                filters.openNow ? 'left-5' : 'left-0.5'
              )}
            />
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group">
          <span className="text-sm font-semibold text-on-surface">Verified only</span>
          <div
            onClick={() => onChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
            className={cn(
              'relative w-11 h-6 rounded-full transition-colors duration-200',
              filters.verifiedOnly ? 'bg-primary' : 'bg-surface-container-highest'
            )}
          >
            <span
              className={cn(
                'absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200',
                filters.verifiedOnly ? 'left-5' : 'left-0.5'
              )}
            />
          </div>
        </label>
      </div>

      <hr className="border-border/50 mb-6" />

      {/* Price tier */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
          Price
        </h3>
        <div className="flex gap-2">
          {PRICE_TIERS.map(({ value, label, description }) => (
            <button
              key={value}
              onClick={() => toggleTier(value)}
              title={description}
              className={cn(
                'flex-1 py-2 rounded-xl text-sm font-bold transition-all duration-200 ring-1',
                filters.priceTiers.includes(value)
                  ? 'bg-primary text-white ring-primary shadow-teal-xs'
                  : 'bg-surface-container text-on-surface ring-border/50 hover:ring-primary/40'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <hr className="border-border/50 mb-6" />

      {/* Services */}
      <div>
        <h3 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-3">
          Services
        </h3>
        <div className="flex flex-col gap-1.5">
          {ALL_SERVICES.map((s) => {
            const active = filters.services.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleService(s)}
                className={cn(
                  'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left ring-1',
                  active
                    ? 'bg-teal-soft text-primary ring-primary/30 font-semibold'
                    : 'bg-transparent text-on-surface ring-transparent hover:bg-surface-container hover:ring-border/50'
                )}
              >
                <span
                  className={cn(
                    'w-4 h-4 rounded flex items-center justify-center ring-1 transition-colors shrink-0',
                    active ? 'bg-primary ring-primary' : 'bg-transparent ring-outline-variant'
                  )}
                >
                  {active && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </svg>
                  )}
                </span>
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
