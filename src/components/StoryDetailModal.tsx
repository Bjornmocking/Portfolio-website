import React from 'react';
import { Story } from '../types';
import { X, BookOpen, ArrowRight, Image as ImageIcon } from 'lucide-react';
import { ShareBarChart } from './ShareBarChart';

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
  research: 'bg-violet-50 text-violet-900 border border-violet-300',
  user: 'bg-sky-50 text-sky-900 border border-sky-300',
  learning: 'bg-teal-50 text-teal-900 border border-teal-300',
};

export const StoryDetailModal: React.FC<StoryDetailModalProps> = ({ story, onClose }) => {
  if (!story) return null;

  return (
    <div
      id="story-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        id="story-detail-modal-content"
        className="w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl border border-stone-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-stone-200 p-6 sm:p-7 pb-5">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-sm font-bold ${TYPE_STYLES[story.type]}`}
            >
              <span className="w-1 h-1 rounded-full bg-current" />
              <span>{TYPE_LABELS[story.type]}</span>
            </span>
            <h3 className="mt-2 text-lg font-bold text-stone-900 flex items-center gap-2 tracking-tight">
              <BookOpen className="h-5 w-5 text-teal-700 shrink-0" />
              {story.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 sm:p-7">
          {story.outcomes && story.outcomes.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-1.5">
              <span className="text-sm text-stone-600">{story.outcomesPrefix ?? 'Leeruitkomsten:'}</span>
              {story.outcomes.map((id) => (
                <span
                  key={id}
                  className="rounded-md border border-stone-300 bg-stone-50 px-1.5 py-0.5 text-sm font-mono font-bold text-stone-700"
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
                  <div className="flex-1 rounded-xl border border-teal-300 bg-teal-50 px-3 py-3 text-center text-sm font-semibold text-teal-700">
                    <span className="block text-sm text-teal-700 mb-0.5">{i + 1}</span>
                    {step}
                  </div>
                  {i < story.flow!.length - 1 && (
                    <div className="flex items-center justify-center text-teal-700" aria-hidden="true">
                      <ArrowRight className="h-4 w-4 rotate-90 sm:rotate-0" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
          {story.screenshotPlaceholder && (
            <div className="mb-5 flex items-center gap-3 rounded-xl border border-dashed border-stone-300 bg-stone-50 px-4 py-6 text-stone-600">
              <ImageIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="text-base">{story.screenshotPlaceholder}</span>
            </div>
          )}
          <p className="text-base text-stone-700 leading-relaxed font-normal whitespace-pre-line">
            {story.details || story.summary}
          </p>
          {story.chart && <ShareBarChart chart={story.chart} />}
        </div>

        <div className="flex items-center justify-end border-t border-stone-200 p-4 sm:p-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-stone-600 hover:text-stone-800 transition-colors cursor-pointer"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};
