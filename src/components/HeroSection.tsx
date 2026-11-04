import React from 'react';
import { ArrowDown, Layers, BookOpen, Wrench } from 'lucide-react';

interface HeroSectionProps {
  portfolioTitle: string;
  introText: string;
  onExploreSprints: () => void;
  onExploreAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  portfolioTitle,
  introText,
  onExploreSprints,
  onExploreAbout,
}) => {
  return (
    <section
      id="hero-section"
      className="border-b border-stone-200 bg-gradient-to-b from-amber-50/70 to-stone-50 pt-14 pb-16 sm:pt-20 sm:pb-24"
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 text-center">
        <h1
          id="hero-portfolio-title"
          className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl text-balance"
        >
          {portfolioTitle}
        </h1>

        <p
          id="hero-intro-text"
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl leading-relaxed text-stone-700"
        >
          {introText}
        </p>

        <div
          id="hero-action-buttons"
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            id="hero-btn-sprints"
            type="button"
            onClick={onExploreSprints}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-700 px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-teal-800 cursor-pointer"
          >
            <span>Bekijk de sprints</span>
            <ArrowDown className="h-4 w-4" />
          </button>
          <button
            id="hero-btn-about"
            type="button"
            onClick={onExploreAbout}
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-6 py-3.5 text-base font-semibold text-stone-800 shadow-sm transition-colors hover:bg-stone-100 cursor-pointer"
          >
            <span>Over mij</span>
          </button>
        </div>

        <dl
          id="hero-stats-strip"
          className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            { icon: Layers, value: '8', label: 'Sprints van 2 weken' },
            { icon: BookOpen, value: '5', label: 'Leeruitkomsten' },
            { icon: Wrench, value: '100%', label: 'Praktijkgericht' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-stone-200 bg-white px-3 py-4 shadow-sm">
              <dt className="sr-only">{label}</dt>
              <dd className="flex items-center justify-center gap-2 text-2xl font-bold text-teal-700 sm:text-3xl">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                <span>{value}</span>
              </dd>
              <div className="mt-1 text-sm text-stone-600" aria-hidden="true">{label}</div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
