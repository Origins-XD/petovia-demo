import Link from 'next/link';
import Image from 'next/image';
import articles from '@/lib/data/articles.json';
import type { Article } from '@/lib/types';

// Map the first 3 articles to Stitch-sourced featured images and authors
const FEATURED_OVERRIDES = [
  {
    image: '/illustrations/featured-1.jpg',
    label: 'Health',
    labelClass: 'bg-primary text-on-primary',
    author: { name: 'Dr. Elena Ross', avatar: '/avatars/author-5.jpg' },
  },
  {
    image: '/illustrations/featured-2.jpg',
    label: 'Training',
    labelClass: 'bg-secondary-container text-on-secondary-fixed',
    author: { name: 'Marc Benioff', avatar: '/avatars/author-6.jpg' },
  },
  {
    image: '/illustrations/featured-3.jpg',
    label: 'Lifestyle',
    labelClass: 'bg-tertiary-container text-on-tertiary-container',
    author: { name: 'Sarah Jenkins', avatar: '/avatars/author-7.jpg' },
  },
];

function ArticleCard({ article, override }: { article: Article; override: typeof FEATURED_OVERRIDES[0] }) {
  return (
    <Link
      href={`/community/${article.id}`}
      className="group flex flex-col bg-surface-container-lowest rounded-[16px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Hero image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={override.image}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-xs font-bold ${override.labelClass}`}>
          {override.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-xl font-black mb-4 group-hover:text-primary transition-colors text-on-surface leading-snug tracking-tight line-clamp-2">
          {article.title}
        </h3>
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-surface-container-high">
            <Image
              src={override.author.avatar}
              alt={override.author.name}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm font-bold text-on-surface">{override.author.name}</span>
          <span className="text-sm text-on-surface-variant ml-auto">{article.readingTimeMin} min read</span>
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedPosts() {
  const featured = (articles as Article[]).slice(0, 3);

  return (
    <section className="py-20 md:py-24 px-5 sm:px-8 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-2">
              The Caretaker's Journal
            </h2>
            <p className="text-on-surface-variant font-medium">
              Expert advice and heartwarming stories from our community.
            </p>
          </div>
          <Link
            href="/community"
            className="hidden md:flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all duration-200 text-sm"
          >
            View All Articles
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>

        {/* Article grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((article, i) => (
            <ArticleCard key={article.id} article={article} override={FEATURED_OVERRIDES[i]} />
          ))}
        </div>

        {/* Mobile see all */}
        <div className="md:hidden mt-8 text-center">
          <Link
            href="/community"
            className="inline-flex items-center gap-2 px-6 py-3 bg-surface-container rounded-full font-bold text-sm text-on-surface"
          >
            See all articles
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
