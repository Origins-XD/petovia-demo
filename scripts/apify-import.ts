/**
 * apify-import.ts
 * Transforms london-vets.json (Apify export) → lib/data/vets.json
 * Run: npx ts-node --project tsconfig.scripts.json scripts/apify-import.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import type { Vet } from '../lib/types';

// ── Deterministic seeded random ─────────────────────────────────────────────
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededRand(seed: number, min: number, max: number): number {
  const x = Math.sin(seed) * 10000;
  const r = x - Math.floor(x);
  return min + r * (max - min);
}

function seededPick<T>(seed: number, arr: T[]): T {
  return arr[Math.floor(seededRand(seed, 0, arr.length))];
}

// ── Location data for London boroughs ────────────────────────────────────────
const CITY_TO_BOROUGH: Record<string, { borough: string; postcode: string; lat: number; lng: number }> = {
  wallington:     { borough: 'Wallington',     postcode: 'SM6', lat: 51.365, lng: -0.162 },
  croydon:        { borough: 'Croydon',        postcode: 'CR0', lat: 51.376, lng: -0.098 },
  'south croydon':{ borough: 'South Croydon',  postcode: 'CR2', lat: 51.353, lng: -0.095 },
  coulsdon:       { borough: 'Coulsdon',       postcode: 'CR5', lat: 51.320, lng: -0.139 },
  sutton:         { borough: 'Sutton',         postcode: 'SM1', lat: 51.360, lng: -0.193 },
  carshalton:     { borough: 'Carshalton',     postcode: 'SM5', lat: 51.369, lng: -0.168 },
  erith:          { borough: 'Erith',          postcode: 'DA8', lat: 51.481, lng:  0.179 },
  westerham:      { borough: 'Westerham',      postcode: 'TN16',lat: 51.264, lng:  0.073 },
  london:         { borough: 'London',         postcode: 'SW',  lat: 51.500, lng: -0.127 },
};

const DEFAULT_LOCATION = { borough: 'London', postcode: 'SW1', lat: 51.501, lng: -0.119 };

function getLocation(city: string | null, vetId: string) {
  if (!city) return { ...DEFAULT_LOCATION };
  const key = city.toLowerCase().trim();
  const base = CITY_TO_BOROUGH[key] || DEFAULT_LOCATION;
  const h = hash(vetId);
  // Scatter ±0.01 degrees (~700m)
  return {
    ...base,
    lat: base.lat + seededRand(h, -0.01, 0.01),
    lng: base.lng + seededRand(h + 1, -0.01, 0.01),
  };
}

// ── Opening hours ─────────────────────────────────────────────────────────────
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function generateOpeningHours(vetId: string): Vet['openingHours'] {
  const h = hash(vetId);
  const openVariants = ['08:30', '09:00', '08:00'];
  const closeVariants = ['18:00', '18:30', '19:00', '17:30'];
  const open = seededPick(h, openVariants);
  const close = seededPick(h + 2, closeVariants);

  return DAYS.map((day, i) => {
    const seed = hash(vetId + day);
    if (day === 'Sunday') {
      // ~40% open Sunday, half-day
      return seed % 10 < 4
        ? { day, open: '10:00', close: '14:00' }
        : { day, open: '', close: '' };
    }
    if (day === 'Saturday') {
      // ~80% open Saturday
      return seed % 10 < 8
        ? { day, open: '09:00', close: '13:00' }
        : { day, open: '', close: '' };
    }
    return { day, open, close };
  });
}

// ── Services ──────────────────────────────────────────────────────────────────
const ALL_SERVICES = [
  'Microchipping', 'Emergency', 'Surgery', 'Vaccinations',
  'Dental', 'Behaviour', 'Grooming', 'Boarding',
];

const CATEGORY_SERVICE_MAP: Record<string, string> = {
  'emergency veterinarian service': 'Emergency',
  'animal hospital': 'Surgery',
};

function inferServices(categories: string[], vetId: string): string[] {
  const h = hash(vetId);
  const services = new Set<string>(['Vaccinations']); // always have vaccinations

  categories.forEach((cat) => {
    const mapped = CATEGORY_SERVICE_MAP[cat.toLowerCase()];
    if (mapped) services.add(mapped);
  });

  // Add 2–4 more deterministically
  const count = 2 + (h % 3);
  const shuffled = [...ALL_SERVICES].sort((a, b) => hash(vetId + a) - hash(vetId + b));
  shuffled.slice(0, count).forEach((s) => services.add(s));

  return [...services].slice(0, 5);
}

// ── Price tier ────────────────────────────────────────────────────────────────
function inferPriceTier(name: string, vetId: string): 1 | 2 | 3 {
  const n = name.toLowerCase();
  if (n.includes('cvs') || n.includes('vets4pets') || n.includes('medivet') || n.includes('pet at home')) return 3;
  const singleNamePattern = /^[A-Z][a-z]+\s+(veterinary|vets?|animal)/i;
  if (singleNamePattern.test(name)) return 1;
  const h = hash(vetId);
  return (h % 3 === 0 ? 1 : 2) as 1 | 2;
}

// ── Slug ──────────────────────────────────────────────────────────────────────
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// ── Main transform ────────────────────────────────────────────────────────────
interface ApifyRecord {
  title: string;
  totalScore: number;
  reviewsCount: number;
  street?: string;
  city?: string | null;
  phone?: string;
  website?: string;
  categories?: string[];
}

function transform(raw: ApifyRecord[], limit = 100): Vet[] {
  const sorted = [...raw]
    .sort((a, b) => (b.totalScore || 0) - (a.totalScore || 0))
    .slice(0, limit);

  const totalCount = sorted.length;

  return sorted.map((record, index) => {
    const id = slugify(record.title) || `vet-${index}`;
    const h = hash(id);
    const location = getLocation(record.city || null, id);

    return {
      id,
      name: record.title,
      photo: `/clinic-photos/fallback-${(h % 8) + 1}.jpg`,
      rating: Math.round((record.totalScore || 4.0) * 10) / 10,
      reviewCount: record.reviewsCount || 0,
      priceTier: inferPriceTier(record.title, id),
      services: inferServices(record.categories || [], id),
      openingHours: generateOpeningHours(id),
      address: record.street ? `${record.street}, ${record.city || 'London'}` : record.city || 'London',
      postcode: location.postcode,
      borough: location.borough,
      lat: Math.round(location.lat * 100000) / 100000,
      lng: Math.round(location.lng * 100000) / 100000,
      phone: record.phone || '',
      website: record.website || undefined,
      verified: index < Math.floor(totalCount * 0.3),
    };
  });
}

// ── Run ───────────────────────────────────────────────────────────────────────
const inputPath = path.join(process.cwd(), 'london-vets.json');
const outputPath = path.join(process.cwd(), 'lib', 'data', 'vets.json');

const raw: ApifyRecord[] = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const vets = transform(raw, 100);

fs.writeFileSync(outputPath, JSON.stringify(vets, null, 2));
console.log(`✓ Wrote ${vets.length} vets to ${outputPath}`);
