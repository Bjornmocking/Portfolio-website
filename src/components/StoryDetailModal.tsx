import React from 'react';
import { Story } from '../types';
import { X, BookOpen, ArrowRight } from 'lucide-react';

interface StoryDetailModalProps {
  story: Story | null;
  onClose: () => void;
}

const TYPE_LABELS: Record<Story['type'], string> = {
  research: 'Research Story',
  user: 'User Story',
  learning: 'Learning Story',
};

const TYPE_STYLES: Record<Story['type'], string> = {
  research: 'bg-blue-500/10 text-blue-300 border border-blue-500/30',
  user: 'bg-sky-500/10 text-sky-300 border border-sky-500/30',
  learning: 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/30',
};

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div
      id="story-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        id="story-detail-modal-content"
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-neutral-800 p-6 sm:p-7 pb-5">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${TYPE_STYLES[story.type]}`}
            >
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{TYPE_LABELS[story.type]}</span>
            </span>
            <h3 className="mt-2 text-lg font-bold text-white flex items-center gap-2 tracking-tight">
              <BookOpen className="h-5 w-5 text-blue-400 shrink-0" />
              {story.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-7">
          {story.outcomes && story.outcomes.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-neutral-500">Leeruitkomsten:</span>
              {story.outcomes.map((id) => (
                <span
                  key={id}
                  className="rounded-md border border-neutral-700 bg-neutral-950 px-1.5 py-0.5 text-[10px] font-mono font-bold text-neutral-300"
                >
                  {id}
                </span>
              ))}
            </div>
          )}
          {story.flow && story.flow.length > 0 && (
            <div className="mb-6 flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-1" aria-label="Flow van de chatbot">
              {story.flow.map((step, i) => (
                <React.Fragment key={step}>
                  <div className="flex-1 rounded-xl border border-blue-500/30 bg-blue-500/10 px-3 py-3 text-center text-xs font-semibold text-blue-200">
                    <span className="block text-[10px] text-blue-400/70 mb-0.5">{i + 1}</span>
                    {step}
                  </div>
                  {i < story.flow!.length - 1 && (
                    <div className="flex items-center justify-center text-blue-400/70" aria-hidden="true">
                      <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          <p className="text-sm text-neutral-300 leading-relaxed font-light whitespace-pre-line">
            {story.details || story.summary}
          </p>
        </div>

        <div className="flex items-center justify-end border-t border-neutral-800 p-4 sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
