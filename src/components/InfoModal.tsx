import React from 'react';
import { X, Check, Award, Sparkles, Feather, Clapperboard, Layers } from 'lucide-react';

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
              <span>Biography & Philosophy</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-4">
              Kehinde David Aderibigbe
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-[15px] leading-relaxed">
              <p>
                Kehinde David Aderibigbe is an accomplished screenwriter and visual storyteller dedicated to developing character-driven cinematic narratives that provoke thought, evoke empathy, and linger long after the final credits roll.
              </p>
              <p>
                Bridging contemporary global viewpoints with classic theatrical pacing, his writing focuses on rich interpersonal tensions, authentic dialogue, high-stakes moral dilemmas, and atmospheric worldbuilding.
              </p>
              <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 my-4">
                <h4 className="text-xs uppercase tracking-wider text-[#F3B544] font-semibold mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4" /> Core Storytelling Pillars
                </h4>
                <ul className="space-y-2 text-xs text-stone-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F3B544] mt-0.5">•</span>
                    <span><strong>Unflinching Character Authenticity:</strong> Multi-layered protagonists with grounded motivations and flaws.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F3B544] mt-0.5">•</span>
                    <span><strong>Cinematic Visual Pacing:</strong> Scripts crafted to translate seamlessly from the page to the camera lens.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F3B544] mt-0.5">•</span>
                    <span><strong>Thematic Resonance:</strong> Stories that interrogate culture, humanity, and our relationship with the future.</span>
                  </li>
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
                Connect With Kehinde
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-semibold text-[#F3B544] mb-2">
              <Clapperboard className="w-4 h-4" />
              <span>Creative Services</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-4">
              Screenwriting & Narrative Advisory
            </h2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#17191f] border border-stone-800">
                <h4 className="font-semibold text-base text-neutral-100 flex items-center justify-between">
                  <span>Feature Film Screenwriting</span>
                  <span className="text-xs text-[#F3B544] font-mono">Commission / Spec</span>
                </h4>
                <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                  Full feature-length screenplays written from original concepts or adapted from source material, delivered with scene-by-scene blueprints.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#17191f] border border-stone-800">
                <h4 className="font-semibold text-base text-neutral-100 flex items-center justify-between">
                  <span>Television Pilot & Series Bibles</span>
                  <span className="text-xs text-[#F3B544] font-mono">Episodic</span>
                </h4>
                <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                  Comprehensive pilot episodes, episodic outlines, character arcs, and multi-season worldbuilding bibles ready for production studio pitches.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#17191f] border border-stone-800">
                <h4 className="font-semibold text-base text-neutral-100 flex items-center justify-between">
                  <span>Script Doctoring & Coverage Analysis</span>
                  <span className="text-xs text-[#F3B544] font-mono">Polish / Rewrites</span>
                </h4>
                <p className="text-stone-300 text-xs mt-1.5 leading-relaxed">
                  Diagnostic dialogue tune-ups, structure tightening, character voice elevation, and in-depth developmental notes for directors and producers.
                </p>
              </div>
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
                Inquire About Availability
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
