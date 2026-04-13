'use client';

import { motion } from 'framer-motion';
import { formatTime } from '@/lib/utils';
import type { Message } from '@/lib/types';
import ReactionRow from './ReactionRow';

interface MessageBubbleProps {
  message: Message;
  isNew?: boolean;
  isReply?: boolean;
}

export default function MessageBubble({ message, isNew = false, isReply = false }: MessageBubbleProps) {
  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      className={`flex gap-3 ${isReply ? 'ml-8 pl-3 border-l-2 border-primary/20' : ''} ${isNew ? 'glow-in' : ''}`}
    >
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-lg shrink-0 mt-0.5">
        {message.author.avatar}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className="text-sm font-bold text-on-surface">{message.author.name}</span>
          <span className="text-base">{message.author.petBadge}</span>
          <span className="text-xs text-on-surface-variant font-medium ml-auto shrink-0">
            {formatTime(message.postedAt)}
          </span>
        </div>

        {/* Body */}
        <p className="text-sm text-on-surface leading-relaxed mb-1">{message.body}</p>

        {/* Reactions */}
        <ReactionRow
          paw={message.reactions.paw}
          heart={message.reactions.heart}
          reactors={message.reactors}
          messageId={message.id}
        />
      </div>
    </motion.div>
  );
}
