'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type SortOption = 'rating' | 'reviews' | 'distance';

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'rating', label: 'Highest rated' },
  { value: 'reviews', label: 'Most reviews' },
  { value: 'distance', label: 'Nearest first' },
];

interface SortDropdownProps {
  value: SortOption;
  onChange: (v: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === value)!;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest rounded-full text-sm font-semibold text-on-surface ring-1 ring-border/50 hover:ring-primary/30 transition-all duration-200 shadow-teal-xs"
      >
        <span className="text-on-surface-variant text-xs font-medium">Sort:</span>
        {current.label}
        <ChevronDown
          size={14}
          className={cn('text-outline transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-surface-container-lowest rounded-2xl shadow-teal-lg ring-1 ring-border/40 overflow-hidden z-20 py-2">
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={cn(
                'w-full px-4 py-3 text-sm font-medium text-left transition-colors',
                opt.value === value
                  ? 'bg-teal-soft text-primary font-semibold'
                  : 'text-on-surface hover:bg-surface-container-low'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
