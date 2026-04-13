const steps = [
  {
    number: '01',
    icon: 'search',
    title: 'Search',
    description: 'Enter your postcode and service needs to see all local experts in one view.',
    rotate: 'group-hover:rotate-6',
  },
  {
    number: '02',
    icon: 'dashboard',
    title: 'Compare',
    description: 'Filter by rating, price, and availability. Read honest reviews from other pet parents.',
    rotate: 'group-hover:-rotate-6',
  },
  {
    number: '03',
    icon: 'event_available',
    title: 'Choose',
    description: 'Book securely or contact the provider directly. Simple, safe, and stress-free.',
    rotate: 'group-hover:rotate-6',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 px-5 sm:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <span className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block">
            The Process
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-on-surface tracking-tight">
            How Petovia Works
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 relative">
          {/* Dashed connector line (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-px border-t-2 border-dashed border-outline-variant/30" />

          {steps.map(({ number, icon, title, description, rotate }) => (
            <div key={number} className="relative text-center group">
              {/* Icon card */}
              <div className={`relative w-24 h-24 bg-surface-container rounded-[24px] flex items-center justify-center mx-auto mb-10 transition-transform duration-300 ${rotate}`}>
                <span className="text-6xl font-black text-primary/10 absolute -top-4 -left-4 select-none leading-none">
                  {number}
                </span>
                <span className="material-symbols-outlined text-4xl text-primary">{icon}</span>
              </div>
              <h3 className="text-2xl font-black mb-4 text-on-surface tracking-tight">{title}</h3>
              <p className="text-on-surface-variant font-medium leading-relaxed max-w-xs mx-auto">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
