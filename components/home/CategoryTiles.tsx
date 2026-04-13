import Link from 'next/link';

type Category = {
  iconName: string;
  label: string;
  href?: string;
  active?: boolean;
  description: string;
};

const categories: Category[] = [
  { iconName: 'medical_services', label: 'Vets', href: '/marketplace', active: true, description: '100+ verified clinics' },
  { iconName: 'security', label: 'Insurance', description: 'Coming soon' },
  { iconName: 'content_cut', label: 'Groomers', description: 'Coming soon' },
  { iconName: 'sports_and_outdoors', label: 'Trainers', description: 'Coming soon' },
  { iconName: 'directions_walk', label: 'Walkers', description: 'Coming soon' },
  { iconName: 'cottage', label: 'Boarding', description: 'Coming soon' },
  { iconName: 'home_health', label: 'Sitters', description: 'Coming soon' },
];

export default function CategoryTiles() {
  return (
    <section className="py-20 md:py-24 px-5 sm:px-8 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-on-surface mb-3">
            Explore our categories
          </h2>
          <p className="text-on-surface-variant font-medium text-base md:text-lg">
            Verified professional services for every stage of your pet's life.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
          {categories.map(({ iconName, label, href, active, description }) => {
            const inner = (
              <>
                {/* Icon container */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 transition-colors duration-300 ${
                    active
                      ? 'bg-primary/10 group-hover:bg-on-primary/20'
                      : 'bg-primary/10 group-hover:bg-on-primary/20'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary group-hover:text-on-primary text-[30px] transition-colors duration-300">
                    {iconName}
                  </span>
                </div>

                {/* Label */}
                <span className="block font-bold text-sm transition-colors duration-300 mb-1 text-on-surface group-hover:text-on-primary">
                  {label}
                </span>

                {/* Sub-label */}
                <span
                  className={`block text-[11px] font-medium transition-colors duration-300 ${
                    active ? 'text-primary group-hover:text-on-primary/70' : 'text-on-surface-variant group-hover:text-on-primary/60'
                  }`}
                >
                  {description}
                </span>
              </>
            );

            const commonClasses = `group flex flex-col items-center text-center p-6 md:p-8 rounded-[16px] transition-all duration-300 hover:-translate-y-2 shadow-[0px_4px_12px_rgba(26,173,160,0.04)] ${
              active
                ? 'bg-surface-container-lowest hover:bg-primary cursor-pointer hover:shadow-[0px_8px_24px_rgba(26,173,160,0.16)]'
                : 'bg-surface-container-lowest hover:bg-primary cursor-not-allowed'
            }`;

            if (active && href) {
              return (
                <Link key={label} href={href} className={commonClasses}>
                  {inner}
                </Link>
              );
            }

            return (
              <div key={label} className={commonClasses} title="Coming soon">
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
