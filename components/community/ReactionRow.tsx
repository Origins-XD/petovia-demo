'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ReactionRowProps {
  paw: number;
  heart: number;
  reactors: string[];
  messageId: string;
}

export default function ReactionRow({ paw: initialPaw, heart: initialHeart, reactors: initialReactors, messageId }: ReactionRowProps) {
  const [paw, setPaw] = useState(initialPaw);
  const [heart, setHeart] = useState(initialHeart);
  const [pawActive, setPawActive] = useState(false);
  const [heartActive, setHeartActive] = useState(false);
  const [reactors, setReactors] = useState(initialReactors.slice(0, 3));

  function react(type: 'paw' | 'heart') {
    if (type === 'paw') {
      const next = !pawActive;
      setPawActive(next);
      setPaw((n) => n + (next ? 1 : -1));
      if (next) setReactors((r) => ['🧑‍💻', ...r].slice(0, 5));
    } else {
      const next = !heartActive;
      setHeartActive(next);
      setHeart((n) => n + (next ? 1 : -1));
      if (next) setReactors((r) => ['🧑‍💻', ...r].slice(0, 5));
    }
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      {/* Paw reaction */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => react('paw')}
        className={cn(
          'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200',
          pawActive
            ? 'bg-teal-soft text-primary ring-1 ring-primary/20'
            : 'bg-surface-container text-on-surface-variant hover:bg-teal-soft hover:text-primary'
        )}
      >
        <span>🐾</span>
        <span>{paw}</span>
      </motion.button>

      {/* Heart reaction */}
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => react('heart')}
        className={cn(
          'flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold transition-all duration-200',
          heartActive
            ? 'bg-red-50 text-red-500 ring-1 ring-red-200'
            : 'bg-surface-container text-on-surface-variant hover:bg-red-50 hover:text-red-400'
        )}
      >
        <span>{heartActive ? '❤️' : '🤍'}</span>
        <span>{heart}</span>
      </motion.button>

      {/* Reactor avatar stack */}
      {reactors.length > 0 && (
        <div className="flex -space-x-1.5">
          {reactors.map((r, i) => (
            <AnimatePresence key={`${messageId}-reactor-${i}`} mode="popLayout">
              <motion.span
                initial={{ scale: 0, x: -4 }}
                animate={{ scale: 1, x: 0 }}
                exit={{ scale: 0, x: -4 }}
                className="w-5 h-5 rounded-full bg-surface-container-low ring-1 ring-surface-container-lowest flex items-center justify-center text-[10px]"
              >
                {r}
              </motion.span>
            </AnimatePresence>
          ))}
        </div>
      )}
    </div>
  );
}
