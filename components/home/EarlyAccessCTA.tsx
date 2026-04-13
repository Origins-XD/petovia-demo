'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function EarlyAccessCTA() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="mx-5 sm:mx-8 mb-16 md:mb-24 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto bg-brown-dark rounded-[2rem] p-10 md:p-16 lg:p-24 relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none" />

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — headline */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-gold leading-tight mb-6 tracking-tight">
              Join the pack for<br />priority access.
            </h2>
            <p className="text-lg text-white/70 font-medium max-w-md leading-relaxed">
              Be the first to know when we launch in your city. Exclusive member perks and early booking benefits await.
            </p>
          </div>

          {/* Right — email form */}
          <div className="flex flex-col gap-4">
            {submitted ? (
              <div className="flex items-center gap-3 text-gold text-lg font-bold">
                <CheckCircle2 size={24} />
                You're on the list!
              </div>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/5 p-2 rounded-full flex flex-col sm:flex-row gap-2 border border-white/10 focus-within:border-primary/50 transition-all"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="bg-transparent border-none focus:ring-0 px-6 py-4 text-white placeholder:text-white/30 flex-grow font-medium text-sm focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-amber text-brown-dark font-black px-8 py-4 rounded-full hover:brightness-105 active:scale-[0.98] transition-all whitespace-nowrap text-sm"
                  >
                    Join Now
                  </button>
                </form>
                <p className="text-xs text-white/40 ml-6">
                  No spam. Only essential pet care updates.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
