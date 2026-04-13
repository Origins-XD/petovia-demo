import Hero from '@/components/home/Hero';
import CategoryTiles from '@/components/home/CategoryTiles';
import TrustStrip from '@/components/home/TrustStrip';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedPosts from '@/components/home/FeaturedPosts';
import EarlyAccessCTA from '@/components/home/EarlyAccessCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryTiles />
      <TrustStrip />
      <HowItWorks />
      <FeaturedPosts />
      <EarlyAccessCTA />
    </>
  );
}
