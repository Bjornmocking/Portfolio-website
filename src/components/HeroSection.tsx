import React from 'react';
import { ArrowDown, Cpu, Sparkles, Layers, BookOpen } from 'lucide-react';

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
      className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/60 via-neutral-950 to-neutral-950 pt-12 pb-16 sm:pt-16 sm:pb-20"
    >
      {/* Subtle background ambient lighting */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-80 w-full max-w-4xl rounded-full bg-blue-600/10 blur-[130px]" />
      <div className="pointer-events-none absolute top-1/3 right-10 h-64 w-64 rounded-full bg-blue-500/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Portfolio Title */}
        <h1
          id="hero-portfolio-title"
          className="text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl text-balance"
        >
          {portfolioTitle}
        </h1>

        {/* Introduction Text */}
        <p
          id="hero-intro-text"
          className="mx-auto mt-5 max-w-3xl text-base sm:text-lg leading-relaxed text-neutral-400 font-light"
        >
          {introText}
        </p>

        {/* Quick Highlights / Stats strip */}
        <div
          id="hero-stats-strip"
          className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 backdrop-blur-sm text-center shadow-inner"
        >
          <div className="border-r border-neutral-800 pr-2">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 font-black text-xl sm:text-2xl">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>8</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1 font-semibold">Sprints (16 Weken)</div>
          </div>
          <div className="border-r border-neutral-800 px-2">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 font-black text-xl sm:text-2xl">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>5</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1 font-semibold">Leeruitkomsten</div>
          </div>
          <div className="pl-2">
            <div className="flex items-center justify-center gap-1.5 text-blue-400 font-black text-xl sm:text-2xl">
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>100%</span>
            </div>
            <div className="text-[11px] uppercase tracking-wider text-neutral-500 mt-1 font-semibold">Praktijkgericht</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div
          id="hero-action-buttons"
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <button
            id="hero-btn-sprints"
            type="button"
            onClick={onExploreSprints}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-950 shadow-lg shadow-white/5 transition-all hover:bg-neutral-200 active:scale-[0.98] cursor-pointer"
          >
            <span>Bekijk Sprints (1-8)</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </button>
          <button
            id="hero-btn-about"
            type="button"
            onClick={onExploreAbout}
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-3 text-xs font-bold uppercase tracking-widest text-neutral-300 shadow-sm transition-all hover:bg-neutral-800 hover:text-white hover:border-neutral-700 active:scale-[0.98] cursor-pointer"
          >
            <span>Over mij</span>
          </button>
        </div>
      </div>
    </section>
  );
};
