'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Stethoscope, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home, exact: true },
  { href: '/marketplace', label: 'Find a Vet', icon: Stethoscope, exact: false },
  { href: '/community', label: 'Community', icon: BookOpen, exact: false },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-nav border-t border-border/40">
      <div className="flex items-center justify-around h-16 px-2 safe-area-bottom">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 min-w-[64px] min-h-[44px] rounded-2xl px-3 py-1.5 transition-all duration-200',
                active
                  ? 'text-primary'
                  : 'text-on-surface-variant'
              )}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className="transition-all duration-200"
              />
              <span
                className={cn(
                  'text-[10px] font-medium leading-none transition-all duration-200',
                  active ? 'text-primary font-semibold' : 'text-on-surface-variant'
                )}
              >
                {label}
              </span>
              {active && (
                <span className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
