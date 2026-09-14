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
      className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/85 p-4 backdrop-blur-md animate-in fade-in duration-150"
    >
      <div
        id="quick-add-link-modal-content"
        className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4 mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 tracking-tight">
              <Link2 className="h-5 w-5 text-blue-400" />
              Bewijsstuk toevoegen
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{sprintTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-rose-500/10 border border-rose-500/30 p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Type bewijsstuk
            </label>
            <div className="grid grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setType('app')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  type === 'app'
                    ? 'border-blue-500/80 bg-blue-600/10 text-blue-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Globe className="h-4 w-4 mb-1" />
                <span>Applicatie</span>
              </button>
              <button
                type="button"
                onClick={() => setType('document')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  type === 'document'
                    ? 'border-blue-500/80 bg-blue-600/10 text-blue-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <FileText className="h-4 w-4 mb-1" />
                <span>Document</span>
              </button>
              <button
                type="button"
                onClick={() => setType('video')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  type === 'video'
                    ? 'border-blue-500/80 bg-blue-600/10 text-blue-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Video className="h-4 w-4 mb-1" />
                <span>Video</span>
              </button>
              <button
                type="button"
                onClick={() => setType('code')}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium cursor-pointer transition-colors ${
                  type === 'code'
                    ? 'border-blue-500/80 bg-blue-600/10 text-blue-400'
                    : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Code2 className="h-4 w-4 mb-1" />
                <span>Code</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Titel van het bewijsstuk
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bijv. Live Demo Webapplicatie v1"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Link URL (website, document of video link)
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Korte beschrijving (optioneel)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bijv. Prototype getest met 3 eindgebruikers"
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3.5 py-2.5 text-sm text-neutral-100 placeholder-neutral-600 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl px-4 py-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer"
            >
              Annuleren
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-blue-500 transition-colors cursor-pointer shadow-lg shadow-blue-900/30"
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
