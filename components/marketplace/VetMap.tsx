'use client';

import dynamic from 'next/dynamic';
import type { Vet } from '@/lib/types';

// Lazy-load the actual Leaflet map (SSR incompatible)
const LeafletMap = dynamic(() => import('./LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-surface-container-low flex items-center justify-center rounded-2xl">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-xs text-on-surface-variant font-medium">Loading map…</p>
      </div>
    </div>
  ),
});

interface VetMapProps {
  vets: Vet[];
  activeId?: string | null;
  onVetHover?: (id: string | null) => void;
  onVetClick?: (vet: Vet) => void;
}

export default function VetMap(props: VetMapProps) {
  return <LeafletMap {...props} />;
}
