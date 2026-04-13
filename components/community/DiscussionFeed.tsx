'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ChevronUp } from 'lucide-react';
import allMessages from '@/lib/data/messages.json';
import simQueue from '@/lib/data/sim-queue.json';
import type { Message, SimMessage, Article } from '@/lib/types';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { hashString } from '@/lib/utils';

interface DiscussionFeedProps {
  articleId: string;
  articleCategory: Article['category'];
}

function buildThreads(messages: Message[]): Message[][] {
  const roots = messages.filter((m) => !m.parentId);
  return roots.map((root) => [
    root,
    ...messages.filter((m) => m.parentId === root.id),
  ]);
}

const TYPING_NAMES = ['Sarah', 'Priya', 'James', 'Emma', 'Ravi', 'Leila', 'Marcus', 'Zoe'];

export default function DiscussionFeed({ articleId, articleCategory }: DiscussionFeedProps) {
  const seedMessages = (allMessages as Message[]).filter(
    (m) => m.articleId === articleId && !m.parentId
  );
  // Fallback — pick any if none for this article
  const initialMessages: Message[] = seedMessages.length > 0 ? seedMessages : [];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [typingName, setTypingName] = useState<string | null>(null);
  const [newCount, setNewCount] = useState(0);
  const [input, setInput] = useState('');
  const [onlineCount] = useState(() => 18 + (hashString(articleId) % 17));
  const feedRef = useRef<HTMLDivElement>(null);

  // Relevant sim messages for this category
  const relevantSim = (simQueue as SimMessage[]).filter(
    (m) => m.category === articleCategory
  );
  const simRef = useRef(0);
  const nextSim = useCallback((): SimMessage | null => {
    const pool = relevantSim.length > 0 ? relevantSim : (simQueue as SimMessage[]);
    if (pool.length === 0) return null;
    const msg = pool[simRef.current % pool.length];
    simRef.current++;
    return msg;
  }, [relevantSim]);

  // ── Message delivery loop ─────────────────────────────────────────────────
  useEffect(() => {
    let deliveryTimer: ReturnType<typeof setTimeout>;
    let typingTimer: ReturnType<typeof setTimeout>;
    let typingClearTimer: ReturnType<typeof setTimeout>;

    function scheduleDelivery() {
      const delay = 6000 + Math.random() * 6000; // 6–12s
      deliveryTimer = setTimeout(() => {
        const sim = nextSim();
        if (sim) {
          const newMsg: Message = {
            id: `sim-${Date.now()}`,
            articleId,
            author: sim.author,
            body: sim.body,
            postedAt: new Date().toISOString(),
            reactions: { paw: 0, heart: 0 },
            reactors: [],
          };
          setMessages((prev) => [newMsg, ...prev]);
          setNewIds((prev) => new Set(prev).add(newMsg.id));
          setNewCount((n) => n + 1);
          // Clear the "new" highlight after 3s
          setTimeout(() => {
            setNewIds((prev) => {
              const next = new Set(prev);
              next.delete(newMsg.id);
              return next;
            });
          }, 3000);
        }
        scheduleDelivery();
      }, delay);
    }

    function scheduleTyping() {
      const delay = 15000 + Math.random() * 10000; // 15–25s
      typingTimer = setTimeout(() => {
        const name = TYPING_NAMES[Math.floor(Math.random() * TYPING_NAMES.length)];
        setTypingName(name);
        const duration = 2000 + Math.random() * 2000; // 2–4s
        typingClearTimer = setTimeout(() => {
          setTypingName(null);
        }, duration);
        scheduleTyping();
      }, delay);
    }

    scheduleDelivery();
    scheduleTyping();

    return () => {
      clearTimeout(deliveryTimer);
      clearTimeout(typingTimer);
      clearTimeout(typingClearTimer);
    };
  }, [articleId, nextSim]);

  // ── Post user message ─────────────────────────────────────────────────────
  function handlePost(e: React.FormEvent) {
    e.preventDefault();
    const body = input.trim();
    if (!body) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      articleId,
      author: { name: 'You', avatar: '🧑‍💻', petBadge: '🐾' },
      body,
      postedAt: new Date().toISOString(),
      reactions: { paw: 0, heart: 0 },
      reactors: [],
    };
    setMessages((prev) => [userMsg, ...prev]);
    setNewIds((prev) => new Set(prev).add(userMsg.id));
    setInput('');
    feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const threads = buildThreads(messages);

  return (
    <div className="bg-surface-container-lowest rounded-2xl overflow-hidden ring-1 ring-border/40 shadow-teal-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/50 bg-surface-container-low/50">
        <div>
          <h3 className="text-sm font-bold text-on-surface">Discussion</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-on-surface-variant font-medium">
              {onlineCount} pet parents online
            </span>
          </div>
        </div>
        <span className="text-xs font-medium text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full">
          {messages.length} comments
        </span>
      </div>

      {/* Composer */}
      <form onSubmit={handlePost} className="flex items-center gap-3 px-5 py-4 border-b border-border/50">
        <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-base shrink-0">
          🧑‍💻
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Share your thoughts…"
          className="flex-1 min-w-0 bg-surface-container-low rounded-full px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/60 font-medium focus:outline-none focus:ring-2 ring-primary/20 transition-all border border-border/50 focus:border-primary/30"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shrink-0 disabled:opacity-40 hover:bg-teal-deep active:scale-90 transition-all duration-200 shadow-teal-xs"
        >
          <Send size={15} />
        </button>
      </form>

      {/* New messages pill */}
      <AnimatePresence>
        {newCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex justify-center py-2"
          >
            <button
              onClick={() => {
                feedRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                setNewCount(0);
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-primary text-white rounded-full text-xs font-bold shadow-teal-sm hover:bg-teal-deep transition-colors"
            >
              <ChevronUp size={12} />
              {newCount} new {newCount === 1 ? 'message' : 'messages'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div
        ref={feedRef}
        className="px-5 py-4 max-h-[520px] overflow-y-auto space-y-5 scrollbar-hide"
      >
        {/* Typing indicator at top */}
        <AnimatePresence>
          {typingName && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TypingIndicator name={typingName} />
            </motion.div>
          )}
        </AnimatePresence>

        {threads.length === 0 ? (
          <div className="text-center py-10">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-3">chat_bubble</span>
            <p className="text-sm text-on-surface-variant font-medium">Be the first to comment!</p>
          </div>
        ) : (
          threads.map((thread) => (
            <div key={thread[0].id} className="space-y-4">
              {thread.map((msg, i) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isNew={newIds.has(msg.id)}
                  isReply={i > 0}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
