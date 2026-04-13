import Link from 'next/link';
import Image from 'next/image';
import { formatTime } from '@/lib/utils';
import type { Article } from '@/lib/types';

export const CATEGORY_COLORS: Record<string, string> = {
  'Vets & Health': 'bg-teal-soft text-primary',
  Insurance:       'bg-amber-soft text-amber',
  Grooming:        'bg-purple-50 text-purple-600',
  Training:        'bg-blue-50 text-blue-600',
  Travel:          'bg-orange-50 text-orange-600',
  Food:            'bg-green-50 text-green-700',
};

export const CATEGORY_EMOJIS: Record<string, string> = {
  'Vets & Health': '🏥',
  Insurance:       '🛡️',
  Grooming:        '✂️',
  Training:        '🎓',
  Travel:          '✈️',
  Food:            '🍖',
};

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <Link
        href={`/community/${article.id}`}
        className="group block bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_12px_32px_rgba(26,173,160,0.06)] border border-outline-variant/20 hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Hero image — 21:9 aspect ratio matching Stitch */}
        <div className="relative aspect-[21/9] overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 space-y-4">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">
              {article.category}
            </span>
            <span className="text-on-surface-variant text-sm font-medium">{article.readingTimeMin} min read</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-on-surface leading-tight group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between pt-4 border-t border-border/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-high shrink-0">
                <Image
                  src={article.author.avatar}
                  alt={article.author.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface leading-none">{article.author.name}</p>
                <p className="text-xs text-on-surface-variant mt-0.5">{formatTime(article.publishedAt)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18" }}>chat_bubble</span>
              <span>{article.commentCount}</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/community/${article.id}`}
      className="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0px_12px_32px_rgba(26,173,160,0.06)] hover:-translate-y-1 transition-transform"
    >
      {/* Image — aspect-video matching Stitch */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-col flex-grow p-6 space-y-3">
        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold self-start ${CATEGORY_COLORS[article.category] || 'bg-surface-container text-on-surface-variant'}`}>
          {article.category}
        </span>
        <h3 className="text-lg font-bold text-on-surface leading-snug group-hover:text-primary transition-colors tracking-tight line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2 flex-grow">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <span className="text-sm font-semibold text-on-surface">{article.author.name}</span>
          <div className="flex items-center gap-1.5 text-on-surface-variant text-sm">
            <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 18" }}>chat_bubble</span>
            <span>{article.commentCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
