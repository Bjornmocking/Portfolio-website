import React from 'react';
import { AboutMeData } from '../types';
import { Edit3, UserCheck } from 'lucide-react';

interface AboutMeSectionProps {
  data: AboutMeData;
  onEdit: () => void;
}

export const AboutMeSection: React.FC<AboutMeSectionProps> = ({ data, onEdit }) => {
  return (
    <section
      id="about-me-section"
      className="border-b border-neutral-800 bg-neutral-950/60 py-14 sm:py-18 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-neutral-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">
              <UserCheck className="h-3.5 w-3.5" />
              Profiel & Motivatie
            </div>
            <h2 id="about-me-heading" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Over mij
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Mijn achtergrond, visie en motivatie binnen de minor Futureproof met AI!
            </p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-blue-500/30 bg-blue-600/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-blue-400 hover:bg-blue-600/20 hover:border-blue-500/50 transition-colors cursor-pointer"
          >
            <Edit3 className="h-3.5 w-3.5" />
            <span>Bewerken</span>
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Photo & Identity Column (lg: 4 cols) */}
          <div
            id="about-me-photo-card"
            className="lg:col-span-4 rounded-3xl border border-neutral-800 bg-neutral-900 p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden"
          >
            {/* Avatar Frame */}
            <div className="relative mt-3 mb-6 h-36 w-36 sm:h-40 sm:w-40 rounded-2xl border border-neutral-700 bg-gradient-to-br from-neutral-800 to-neutral-950 p-1.5 shadow-inner group overflow-hidden">
              <img
                id="about-me-avatar"
                src={data.photoUrl}
                alt={`Profielfoto van ${data.name}`}
                className="h-full w-full rounded-xl object-cover object-center filter brightness-95"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop';
                }}
              />
            </div>

            {/* Name & Role */}
            <h3 id="about-me-name" className="text-xl font-bold text-white tracking-tight">
              {data.name}
            </h3>
            <p id="about-me-role" className="text-[11px] font-bold uppercase tracking-widest text-blue-500 mt-1 mb-3">
              {data.role}
            </p>
            <div className="w-12 h-px bg-neutral-800 mb-3" />
            <p id="about-me-subheading" className="text-xs text-neutral-400 leading-relaxed font-light px-2 italic">
              "{data.subheading}"
            </p>

          </div>

          {/* Bio Column (lg: 8 cols) */}
          <div className="lg:col-span-8">
            {/* Bio Box */}
            <div
              id="about-me-bio-card"
              className="rounded-3xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8 md:p-10 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  <h4 className="text-neutral-400 text-xs font-bold uppercase tracking-[0.2em]">
                    Wie ik ben & mijn motivatie
                  </h4>
                </div>
                <p
                  id="about-me-bio-text"
                  className="text-neutral-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-light"
                >
                  {data.bio}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-500">
                <span>Minor Futureproof met AI! • Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
