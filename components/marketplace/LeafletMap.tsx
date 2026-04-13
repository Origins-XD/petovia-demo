'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { divIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Vet } from '@/lib/types';
import Link from 'next/link';

interface LeafletMapProps {
  vets: Vet[];
  activeId?: string | null;
  onVetHover?: (id: string | null) => void;
  onVetClick?: (vet: Vet) => void;
}

// Custom teal teardrop SVG pin
function makePinIcon(active = false) {
  const bg = active ? '#006a62' : '#1aada0';
  const ring = active ? '#fdf9f3' : '#ffffff';
  return divIcon({
    html: `
      <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0C7.163 0 0 7.163 0 16C0 24 16 40 16 40C16 40 32 24 32 16C32 7.163 24.837 0 16 0Z"
          fill="${bg}" />
        <circle cx="16" cy="16" r="9" fill="${ring}" opacity="0.2"/>
        <!-- Paw silhouette -->
        <g transform="translate(9.5, 9)" fill="${ring}">
          <ellipse cx="6.5" cy="10" rx="3" ry="3.5"/>
          <ellipse cx="1.5" cy="7" rx="1.5" ry="1.8"/>
          <ellipse cx="11.5" cy="7" rx="1.5" ry="1.8"/>
          <ellipse cx="3.5" cy="4" rx="1.4" ry="1.6"/>
          <ellipse cx="9.5" cy="4" rx="1.4" ry="1.6"/>
        </g>
      </svg>`,
    className: '',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

function MapController({ vets }: { vets: Vet[] }) {
  const map = useMap();

  useEffect(() => {
    if (vets.length === 0) return;
    const lats = vets.map((v) => v.lat);
    const lngs = vets.map((v) => v.lng);
    const bounds: [[number, number], [number, number]] = [
      [Math.min(...lats) - 0.005, Math.min(...lngs) - 0.005],
      [Math.max(...lats) + 0.005, Math.max(...lngs) + 0.005],
    ];
    map.fitBounds(bounds, { padding: [24, 24] });
  }, [vets, map]);

  return null;
}

export default function LeafletMap({ vets, activeId, onVetClick }: LeafletMapProps) {
  const centre: [number, number] =
    vets.length > 0
      ? [
          vets.reduce((a, v) => a + v.lat, 0) / vets.length,
          vets.reduce((a, v) => a + v.lng, 0) / vets.length,
        ]
      : [51.5, -0.12];

  return (
    <MapContainer
      center={centre}
      zoom={12}
      style={{ height: '100%', width: '100%', borderRadius: '1.5rem' }}
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <MapController vets={vets} />

      {vets.map((vet) => (
        <Marker
          key={vet.id}
          position={[vet.lat, vet.lng]}
          icon={makePinIcon(vet.id === activeId)}
          eventHandlers={{
            click: () => onVetClick?.(vet),
          }}
        >
          <Popup>
            <div className="min-w-[200px] py-2 px-1">
              {/* Mini card */}
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-teal-soft flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">medical_services</span>
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm leading-tight">{vet.name}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{vet.borough}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs mb-3">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 20" }}>star</span>
                <span className="font-bold text-on-surface">{vet.rating.toFixed(1)}</span>
                <span className="text-on-surface-variant">({vet.reviewCount})</span>
              </div>
              <Link
                href={`/marketplace/${vet.id}`}
                className="block w-full text-center py-2 bg-primary text-white rounded-full text-xs font-bold hover:bg-teal-deep transition-colors"
              >
                View clinic →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
