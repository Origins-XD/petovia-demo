import articlesData from '@/lib/data/articles.json';
import type { Article } from '@/lib/types';
import ArticleCard from '@/components/community/ArticleCard';

const ALL_CATEGORIES = ['All', 'Vets & Health', 'Grooming', 'Insurance', 'Training', 'Travel', 'Food'];

const TRENDING = [
  { rank: '01', topic: 'The rise of fresh-cooked pet diets in the UK', count: '248 discussions today' },
  { rank: '02', topic: 'Dealing with fireworks anxiety: Early prep', count: '192 discussions today' },
  { rank: '03', topic: 'Best-rated pet insurance for senior labradors', count: '156 discussions today' },
  { rank: '04', topic: 'Top 10 city-living cat trees for 2025', count: '104 discussions today' },
];

export default function CommunityPage() {
  const articles = articlesData as Article[];

  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* Full hero header — matches Stitch community-desktop */}
      <header className="py-12 md:py-20 text-center space-y-5 max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-[1.1]">
          The Petovia Community
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium">
          Real advice from real UK pet parents. Join a growing network of animal lovers sharing the journey of modern caretaking.
        </p>
      </header>

      {/* Category pill strip */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-6 mb-10 border-b border-outline-variant/40">
          {ALL_CATEGORIES.map((cat, i) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-colors duration-200 focus-visible:ring-2 ring-primary ${
                i === 0
                  ? 'bg-secondary-container text-on-secondary-fixed font-bold'
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 12-column content grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

          {/* Main feed — 8 columns */}
          <div className="lg:col-span-8 space-y-10">
            {/* Featured article */}
            <ArticleCard article={articles[0]} featured />

            {/* Article grid — 2 columns */}
            <div className="grid sm:grid-cols-2 gap-6">
              {articles.slice(1).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar — 4 columns */}
          <aside className="lg:col-span-4 space-y-6">

            {/* Community stats */}
            <div className="bg-surface-container-low p-7 rounded-lg space-y-5">
              <h3 className="text-lg font-black tracking-tight text-on-surface">Community Pulse</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: '12.4k', label: 'Active Parents' },
                  { value: '100+', label: 'Verified Vets' },
                  { value: '3.2k', label: 'Articles' },
                  { value: '98%', label: 'Helpful Rate' },
                ].map(({ value, label }) => (
                  <div key={label} className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/20">
                    <p className="text-2xl font-black text-primary">{value}</p>
                    <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending topics */}
            <div className="bg-surface-container-low p-7 rounded-lg space-y-5">
              <h3 className="text-lg font-black tracking-tight text-on-surface">Trending Now</h3>
              <ul className="space-y-4">
                {TRENDING.map(({ rank, topic, count }) => (
                  <li key={rank} className="flex items-start gap-3 group cursor-pointer">
                    <div className="bg-secondary-container/50 w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-on-secondary-fixed font-black text-xs">{rank}</span>
                    </div>
                    <div>
                      <p className="font-bold text-on-surface text-sm group-hover:text-primary transition-colors leading-snug">
                        {topic}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{count}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA card */}
            <div className="bg-primary rounded-lg p-7 space-y-4 shadow-xl shadow-primary/20">
              <h4 className="text-xl font-black text-white leading-tight">Got something to share?</h4>
              <p className="text-white/80 font-medium text-sm leading-relaxed">
                Join our contributor network and share your pet stories with thousands of owners.
              </p>
              <button className="bg-white text-primary px-6 py-2.5 rounded-full font-black text-sm hover:scale-[0.98] transition-transform active:scale-95">
                Join Contributors
              </button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
