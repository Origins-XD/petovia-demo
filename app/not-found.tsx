import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        {/* Illustration */}
        <div className="text-8xl mb-6 animate-bounce" style={{ animationDuration: '2s' }}>
          🐾
        </div>

        <h1 className="text-3xl font-black text-on-surface tracking-tight mb-3">
          Lost your way?
        </h1>
        <p className="text-on-surface-variant font-medium mb-8 leading-relaxed">
          Even the most curious pets need a guide sometimes. This page doesn't exist — but we can take you home.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-full font-bold text-sm shadow-teal-sm hover:bg-teal-deep active:scale-[0.98] transition-all duration-200"
        >
          <ArrowLeft size={16} />
          Back to Petovia
        </Link>
      </div>
    </div>
  );
}
