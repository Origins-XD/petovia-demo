import type { Metadata } from 'next';
import './globals.css';
import TopNav from '@/components/nav/TopNav';
import MobileBottomNav from '@/components/nav/MobileBottomNav';

export const metadata: Metadata = {
  title: 'Petovia — Find the Best Pet Services Near You',
  description:
    'Discover trusted vets, groomers, trainers and more in your area. Petovia connects London pet owners with the services their pets deserve.',
  keywords: 'vet, veterinary, pet services, London, pet care, grooming, training',
  openGraph: {
    title: 'Petovia — Find the Best Pet Services Near You',
    description: 'Discover trusted vets, groomers, trainers and more in your area.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream text-on-surface antialiased min-h-dvh">
        <TopNav />
        {/* top padding = TopNav height (64px) */}
        <main className="pt-16 pb-16 md:pb-0">{children}</main>
        <MobileBottomNav />
      </body>
    </html>
  );
}
