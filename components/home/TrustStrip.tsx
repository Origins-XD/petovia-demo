const stats = [
  { value: '100+', label: 'Verified Vets' },
  { value: '4.8★', label: 'Community Stars' },
  { value: '12k+', label: 'Pet Parents' },
  { value: '96%', label: 'Satisfaction Rate' },
];

export default function TrustStrip() {
  return (
    <section className="bg-brown-dark py-12 md:py-16 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-8">
        {/* Stats */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-8 sm:gap-12">
          {stats.map(({ value, label }, i) => (
            <div key={label} className="flex items-center gap-8 sm:gap-12">
              <div className="text-center sm:text-left">
                <p className="text-3xl md:text-4xl font-black text-gold tabular-nums leading-none">
                  {value}
                </p>
                <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/50 mt-1.5">
                  {label}
                </p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden sm:block w-px h-10 bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div className="sm:text-right text-center shrink-0">
          <p className="text-white/70 text-sm font-medium leading-relaxed max-w-[200px]">
            London's most trusted<br className="hidden sm:block" /> pet services platform
          </p>
        </div>
      </div>
    </section>
  );
}
