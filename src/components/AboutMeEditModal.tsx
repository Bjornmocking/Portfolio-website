import React, { useState } from 'react';
import { AboutMeData } from '../types';
import { X, Save, User } from 'lucide-react';

interface AboutMeEditModalProps {
  data: AboutMeData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: AboutMeData) => void;
}

export const AboutMeEditModal: React.FC<AboutMeEditModalProps> = ({
  data,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<AboutMeData>({ ...data });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div
      id="about-me-edit-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-3 sm:p-4 backdrop-blur-md overflow-y-auto"
    >
      <div
        id="about-me-edit-modal-content"
        className="w-full max-w-2xl my-8 rounded-3xl border border-stone-200 bg-white shadow-2xl flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-50 border border-teal-300 text-teal-700">
              <User className="h-4 w-4" />
            </div>
            <h3 className="text-xl font-bold text-stone-900 tracking-tight">Over mij bewerken</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Name and Role */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Volledige Naam
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bijv. Jan Jansen"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Rol / Opleiding
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Bijv. Student Minor Futureproof met AI!"
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
              />
            </div>
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Foto URL (webafbeelding link)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="url"
                value={formData.photoUrl}
                onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                placeholder="https://..."
                className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    photoUrl:
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                  })
                }
                className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm font-medium text-stone-700 hover:text-stone-900 hover:border-stone-300 transition-colors cursor-pointer"
                title="Herstel placeholder foto"
              >
                Reset foto
              </button>
            </div>
            <p className="text-base text-stone-600 mt-1.5">
              Tip: Je kunt elke openbare afbeeldingslink (bijv. van Unsplash, LinkedIn of GitHub) gebruiken.
            </p>
          </div>

          {/* Subheading Quote */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Korte slagzin / quote
            </label>
            <input
              type="text"
              value={formData.subheading}
              onChange={(e) => setFormData({ ...formData, subheading: e.target.value })}
              placeholder="Bijv. Nieuwsgierige maker met interesse in mensgerichte AI"
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
            />
          </div>

          {/* Bio text */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-1.5">
              Over mij (Wie ik ben, achtergrond en motivatie voor de minor)
            </label>
            <textarea
              rows={6}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Vertel over wie je bent, je achtergrond en wat je drijft..."
              className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-teal-600 focus:outline-none placeholder-stone-400"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-stone-200">
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
              <Save className="h-4 w-4" />
              Opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
