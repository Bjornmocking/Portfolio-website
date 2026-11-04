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
      className="border-b border-stone-200 bg-stone-50 py-14 sm:py-18 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 border-b border-stone-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-800 mb-1">
              <UserCheck className="h-3.5 w-3.5" />
              Profiel & Motivatie
            </div>
            <h2 id="about-me-heading" className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
              Over mij
            </h2>
            <p className="text-base text-stone-600 mt-1">
              Mijn achtergrond, visie en motivatie binnen de minor Futureproof met AI!
            </p>
          </div>

          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-1.5 self-start rounded-xl border border-teal-300 bg-teal-50 px-3.5 py-2 text-sm font-bold text-teal-700 hover:bg-teal-100 hover:border-teal-300 transition-colors cursor-pointer"
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
            className="lg:col-span-4 rounded-3xl border border-stone-200 bg-white p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden"
          >
            {/* Avatar Frame */}
            <div className="relative mt-3 mb-6 h-36 w-36 sm:h-40 sm:w-40 rounded-2xl border border-stone-300 bg-gradient-to-br from-stone-100 to-stone-50 p-1.5 group overflow-hidden">
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
            <h3 id="about-me-name" className="text-xl font-bold text-stone-900 tracking-tight">
              {data.name}
            </h3>
            <p id="about-me-role" className="text-base font-bold text-teal-700 mt-1 mb-3">
              {data.role}
            </p>
            <div className="w-12 h-px bg-stone-100 mb-3" />
            <p id="about-me-subheading" className="text-base text-stone-600 leading-relaxed font-normal px-2 italic">
              "{data.subheading}"
            </p>

          </div>

          {/* Bio Column (lg: 8 cols) */}
          <div className="lg:col-span-8">
            {/* Bio Box */}
            <div
              id="about-me-bio-card"
              className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 md:p-10 shadow-xl flex flex-col justify-between min-h-[380px]"
            >
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 bg-teal-700 rounded-full" />
                  <h4 className="text-stone-600 text-sm font-bold">
                    Wie ik ben & mijn motivatie
                  </h4>
                </div>
                <p
                  id="about-me-bio-text"
                  className="text-stone-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal"
                >
                  {data.bio}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-200 flex items-center justify-between text-sm text-stone-600">
                <span>Minor Futureproof met AI! • Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
