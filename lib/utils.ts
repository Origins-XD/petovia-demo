import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Vet } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDistance(miles: number): string {
  if (miles < 0.1) return 'Nearby';
  if (miles < 1) return `${(miles * 5280 / 264).toFixed(0)} min walk`;
  return `${miles.toFixed(1)} mi`;
}

export function formatTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;

  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function isOpenNow(openingHours: Vet['openingHours']): {
  isOpen: boolean;
  statusText: string;
  closingTime?: string;
  openingTime?: string;
} {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const now = new Date();
  const todayName = days[now.getDay()];
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const todayHours = openingHours.find(
    (h) => h.day.toLowerCase() === todayName.toLowerCase()
  );

  if (!todayHours || !todayHours.open || !todayHours.close) {
    return { isOpen: false, statusText: 'Closed today' };
  }

  const parseTime = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m || 0);
  };

  const openMin = parseTime(todayHours.open);
  const closeMin = parseTime(todayHours.close);

  if (currentMinutes >= openMin && currentMinutes < closeMin) {
    // Closing within 60 minutes — show warning
    const minsLeft = closeMin - currentMinutes;
    if (minsLeft <= 60) {
      return {
        isOpen: true,
        statusText: `Closes in ${minsLeft}m`,
        closingTime: todayHours.close,
      };
    }
    return {
      isOpen: true,
      statusText: `Open until ${todayHours.close}`,
      closingTime: todayHours.close,
    };
  }

  // Find next open day
  for (let i = 1; i <= 7; i++) {
    const nextDayIndex = (now.getDay() + i) % 7;
    const nextDayName = days[nextDayIndex];
    const nextHours = openingHours.find(
      (h) => h.day.toLowerCase() === nextDayName.toLowerCase()
    );
    if (nextHours && nextHours.open) {
      const label = i === 1 ? 'Tomorrow' : nextDayName;
      return {
        isOpen: false,
        statusText: `Opens ${label} ${nextHours.open}`,
        openingTime: nextHours.open,
      };
    }
  }

  return { isOpen: false, statusText: 'Closed' };
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
  }
  return hash;
}
