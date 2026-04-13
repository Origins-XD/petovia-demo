import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, MessageSquare } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import articlesData from '@/lib/data/articles.json';
import type { Article } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import DiscussionFeed from '@/components/community/DiscussionFeed';
import { CATEGORY_COLORS, CATEGORY_EMOJIS } from '@/components/community/ArticleCard';

interface Props {
  params: { slug: string };
}

export default function ArticlePage({ params }: Props) {
  const article = (articlesData as Article[]).find((a) => a.id === params.slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <div className="relative h-52 sm:h-64 md:h-72 bg-gradient-to-br from-teal-soft via-surface-container to-amber-soft overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-9xl opacity-20">{CATEGORY_EMOJIS[article.category] || '📝'}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Back */}
        <Link
          href="/community"
          className="absolute top-5 left-5 flex items-center gap-2 px-4 py-2.5 bg-surface-container-lowest/90 backdrop-blur-sm rounded-full text-sm font-semibold text-on-surface shadow-teal-sm hover:bg-surface-container-lowest transition-colors"
        >
          <ArrowLeft size={15} />
          Back
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-5 sm:px-8 -mt-6 pb-16 relative z-10">
        {/* Article card */}
        <article className="bg-surface-container-lowest rounded-2xl p-6 md:p-8 shadow-teal-sm ring-1 ring-border/40 mb-8">
          {/* Meta */}
          <div className="flex items-center flex-wrap gap-2 mb-5">
            <span className={`inline-flex px-3 py-1.5 rounded-full text-xs font-bold ${CATEGORY_COLORS[article.category] || 'bg-surface-container text-on-surface-variant'}`}>
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <Clock size={12} />
              {article.readingTimeMin} min read
            </div>
            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium ml-auto">
              <MessageSquare size={12} />
              {article.commentCount} comments
            </div>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-black text-on-surface tracking-tight mb-5 leading-tight">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center gap-3 pb-6 mb-6 border-b border-border/50">
            <span className="text-3xl">{article.author.petBadge}</span>
            <div>
              <p className="text-sm font-bold text-on-surface">{article.author.name}</p>
              <p className="text-xs text-on-surface-variant">{formatTime(article.publishedAt)}</p>
            </div>
          </div>

          {/* Body — rendered markdown */}
          <div className="prose prose-sm max-w-none text-on-surface prose-headings:font-black prose-headings:text-on-surface prose-headings:tracking-tight prose-p:text-on-surface-variant prose-p:leading-relaxed prose-strong:text-on-surface prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-on-surface-variant prose-li:leading-relaxed prose-h2:text-xl prose-h3:text-base prose-h3:mb-2">
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </div>
        </article>

        {/* Discussion feed */}
        <div>
          <h2 className="text-lg font-black text-on-surface tracking-tight mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-primary" />
            Community Discussion
          </h2>
          <DiscussionFeed articleId={article.id} articleCategory={article.category} />
        </div>
      </div>
    </div>
  );
}
