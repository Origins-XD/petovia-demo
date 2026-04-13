'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/marketplace', label: 'Find a Vet' },
  { href: '/community', label: 'Community' },
];

export default function TopNav() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Image
              src="/logo.png"
              alt="Petovia"
              width={120}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-full text-label-lg font-medium transition-all duration-200',
                    active
                      ? 'bg-primary text-white'
                      : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/marketplace"
              className="px-5 py-2.5 rounded-full bg-primary text-white text-label-lg font-semibold transition-all duration-200 hover:bg-teal-deep hover:shadow-teal-sm active:scale-[0.98]"
            >
              Find a vet
            </Link>
          </div>

          {/* Mobile: logo only, nav handled by MobileBottomNav */}
        </div>
      </div>
    </header>
  );
}
