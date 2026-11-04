import React, { useState } from 'react';
import { EvidenceLink, EvidenceType } from '../types';
import { X, Link2, Globe, FileText, Video, Code2, Plus } from 'lucide-react';

interface QuickAddLinkModalProps {
  sprintTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (link: EvidenceLink) => void;
}

export const QuickAddLinkModal: React.FC<QuickAddLinkModalProps> = ({
  sprintTitle,
  isOpen,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<EvidenceType>('app');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Vul een titel in voor het bewijsstuk.');
      return;
    }
    if (!url.trim()) {
      setError('Vul een geldige link (URL) in.');
      return;
    }

    const newLink: EvidenceLink = {
      id: 'ev-' + Date.now(),
      title: title.trim(),
      url: url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`,
      type,
      description: description.trim() || undefined,
    };

    onSave(newLink);
    // Reset form
    setTitle('');
    setUrl('');
    setType('app');
    setDescription('');
    setError('');
    onClose();
  };

  return (
    <div
      id="quick-add-link-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        id="quick-add-link-modal-content"
        className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-6 sm:p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2 tracking-tight">
              <Link2 className="h-5 w-5 text-teal-700" />
              Bewijsstuk toevoegen
            </h3>
            <p className="text-base text-stone-600 mt-0.5">{sprintTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-50 border border-rose-300 p-3 text-sm text-rose-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Type bewijsstuk
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('app')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                  type === 'app'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-800'
                }`}
              >
                <Globe className="h-4 w-4 mb-1" />
                <span>Applicatie</span>
              </button>
              <button
                type="button"
                onClick={() => setType('document')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                  type === 'document'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-800'
                }`}
              >
                <FileText className="h-4 w-4 mb-1" />
                <span>Document</span>
              </button>
              <button
                type="button"
                onClick={() => setType('video')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                  type === 'video'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-800'
                }`}
              >
                <Video className="h-4 w-4 mb-1" />
                <span>Video</span>
              </button>
              <button
                type="button"
                onClick={() => setType('code')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-sm font-medium cursor-pointer transition-colors ${
                  type === 'code'
                    ? 'border-teal-600 bg-teal-50 text-teal-700'
                    : 'border-stone-200 bg-stone-50 text-stone-600 hover:text-stone-800'
                }`}
              >
                <Code2 className="h-4 w-4 mb-1" />
                <span>Code</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Titel van het bewijsstuk
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bijv. Live Demo Webapplicatie v1"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Link URL (website, document of video link)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Korte beschrijving (optioneel)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bijv. Prototype getest met 3 eindgebruikers"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-stone-200">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-sm sm:text-base font-medium text-stone-600 hover:text-stone-800 transition-colors cursor-pointer"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-teal-700 px-5 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-teal-800 transition-colors cursor-pointer shadow-lg shadow-stone-900/5"
            >
              <Plus className="h-4 w-4" />
              Toevoegen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
