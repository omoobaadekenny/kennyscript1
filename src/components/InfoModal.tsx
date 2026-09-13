import React from 'react';
import { X, Award, Feather, Clapperboard } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface InfoModalProps {
  type: 'About' | 'Services' | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  type,
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen || !type) return null;

  const aboutModal = siteContent.aboutModal;
  const servicesModal = siteContent.servicesModal;

  return (
    <div
      id="info-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="info-modal-dialog"
        className="relative w-full max-w-xl max-h-[85vh] bg-[#111317] border border-stone-700/80 rounded-2xl p-6 sm:p-8 text-neutral-100 shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          id="close-info-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'About' ? (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#F3B544] mb-2">
              <Feather className="w-4 h-4" />
              <span>{aboutModal.badge}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-4">
              {aboutModal.title}
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-[15px] leading-relaxed">
              {aboutModal.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 my-4">
                <h4 className="text-xs uppercase tracking-wider text-[#F3B544] font-semibold mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> {aboutModal.pillarsHeading}
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  {aboutModal.pillars.map((pillar) => (
                    <li key={pillar.id} className="flex items-start gap-2">
                      <span className="text-[#F3B544] mt-0.5">•</span>
                      <span>
                        <strong>{pillar.title}:</strong> {pillar.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                id="about-contact-btn"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-5 py-2.5 bg-[#F3B544] text-[#120E0A] font-semibold text-sm rounded-full hover:bg-[#ffc355] transition-all"
              >
                {aboutModal.buttonText}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#F3B544] mb-2">
              <Clapperboard className="w-4 h-4" />
              <span>{servicesModal.badge}</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-4">
              {servicesModal.title}
            </h2>
            <div className="space-y-4">
              {servicesModal.offerings.map((offering) => (
                <div key={offering.id} className="p-4 rounded-xl bg-[#17191f] border border-stone-800">
                  <h4 className="font-semibold text-base text-neutral-100 flex items-center justify-between">
                    <span>{offering.title}</span>
                    <span className="text-xs text-[#F3B544] font-mono">{offering.tag}</span>
                  </h4>
                  <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                id="services-inquire-btn"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-5 py-2.5 bg-[#F3B544] text-[#120E0A] font-semibold text-sm rounded-full hover:bg-[#ffc355] transition-all"
              >
                {servicesModal.buttonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
