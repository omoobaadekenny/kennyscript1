import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, FileText, X } from 'lucide-react';
import imgLastHorizon from '../assets/images/the_last_horizon_1789319378891.jpg';
import imgEchoesTomorrow from '../assets/images/echoes_of_tomorrow_1789319395622.jpg';
import imgNextChapter from '../assets/images/the_next_chapter_1789319410271.jpg';
import imgBeyondGate from '../assets/images/beyond_the_gate_1789319423559.jpg';
import siteContent from '../data/siteContent.json';

interface SelectedWorkSectionProps {
  onViewAllProjects?: () => void;
  onRequestScript?: (scriptTitle: string) => void;
}

export interface ScriptItem {
  id: string;
  title: string;
  genre: string;
  format: string;
  image: string;
  fallbackImage: string;
  logline: string;
  pages?: string;
  tone?: string;
}

const localFallbackImages: Record<string, string> = {
  'the-last-horizon': imgLastHorizon,
  'echoes-of-tomorrow': imgEchoesTomorrow,
  'the-next-chapter': imgNextChapter,
  'beyond-the-gate': imgBeyondGate,
};

export const SELECTED_SCRIPTS: ScriptItem[] = (
  siteContent.selectedWork?.featuredScripts || []
).map((s) => ({
  ...s,
  image: s.image || localFallbackImages[s.id] || s.fallbackImage,
}));

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onViewAllProjects,
  onRequestScript,
}) => {
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(null);
  const content = siteContent.selectedWork;

  return (
    <section
      id="selected-work"
      className="relative w-full bg-[#F5F2EC] text-stone-900 py-20 sm:py-24 md:py-28 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-stone-300/70"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 sm:pb-10">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div id="selected-work-eyebrow-container" className="mb-2">
              <span
                id="selected-work-eyebrow"
                className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-600"
              >
                {content.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2
              id="selected-work-headline"
              className="font-serif-display text-4xl sm:text-5xl lg:text-[52px] font-normal italic leading-[1.12] tracking-[-0.01em] text-[#191613]"
            >
              {content.headline}
            </h2>

            {/* Subtitle */}
            <p
              id="selected-work-subtitle"
              className="font-sans-ui text-stone-600 text-sm sm:text-base mt-3 font-normal"
            >
              {content.subtitle}
            </p>
          </div>

          {/* View All Projects Action Link */}
          <div className="pt-2 md:pt-0">
            <button
              id="view-all-projects-btn"
              type="button"
              onClick={onViewAllProjects}
              className="group inline-flex items-center gap-2 text-sm sm:text-[15px] font-medium text-stone-900 hover:text-[#c48d28] transition-colors cursor-pointer"
            >
              <span>{content.viewAllText}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* 4 Projects Grid */}
        <div
          id="scripts-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-7"
        >
          {SELECTED_SCRIPTS.map((script) => (
            <div
              key={script.id}
              id={`script-card-${script.id}`}
              onClick={() => setSelectedScript(script)}
              className="group flex flex-col cursor-pointer transition-all duration-200"
            >
              {/* Image Frame with rounded corners matching portfoliome 4.png */}
              <div className="relative w-full aspect-[16/9.5] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 shadow-sm group-hover:shadow-md transition-all duration-300">
                <img
                  id={`script-img-${script.id}`}
                  src={script.image}
                  onError={(e) => {
                    e.currentTarget.src = script.fallbackImage;
                  }}
                  alt={`${script.title} film still`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle vignette on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity" />

                {/* Hover Quick View Chip */}
                <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-black/75 text-amber-300 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Logline &amp; Details
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="flex items-start gap-3 mt-3.5 sm:mt-4">
                {/* Script Icon exactly matching portfoliome 4.png */}
                <div className="text-stone-800 group-hover:text-[#c48d28] transition-colors mt-0.5 shrink-0">
                  <svg
                    className="w-5 h-5 sm:w-[22px] sm:h-[22px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="8" y1="13" x2="16" y2="13" />
                    <line x1="8" y1="17" x2="16" y2="17" />
                    <line x1="8" y1="9" x2="10" y2="9" />
                  </svg>
                </div>

                <div className="flex flex-col min-w-0">
                  <h3
                    id={`script-title-${script.id}`}
                    className="font-sans-ui text-base sm:text-[16px] font-semibold text-stone-900 group-hover:text-[#c48d28] transition-colors leading-tight"
                  >
                    {script.title}
                  </h3>
                  <p
                    id={`script-meta-${script.id}`}
                    className="font-sans-ui text-xs sm:text-[13px] text-stone-500 mt-1 font-normal"
                  >
                    {script.genre} <span className="mx-1 text-stone-400">/</span> {script.format}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Script Detail Modal */}
      {selectedScript && (
        <div
          id="script-detail-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedScript(null)}
        >
          <div
            id="script-detail-dialog"
            className="relative w-full max-w-xl bg-[#111317] border border-stone-700/80 rounded-2xl overflow-hidden text-neutral-100 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image banner */}
            <div className="relative w-full h-52 sm:h-60 overflow-hidden">
              <img
                src={selectedScript.image}
                onError={(e) => {
                  e.currentTarget.src = selectedScript.fallbackImage;
                }}
                alt={selectedScript.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/50 to-transparent" />
              <button
                onClick={() => setSelectedScript(null)}
                className="absolute top-4 right-4 p-1.5 bg-black/60 hover:bg-black/90 text-stone-300 hover:text-white rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-6 sm:p-7 -mt-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#F3B544] px-2.5 py-0.5 rounded-full bg-[#F3B544]/15 border border-[#F3B544]/30">
                  {selectedScript.genre}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {selectedScript.format} • {selectedScript.pages}
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold mb-3">
                {selectedScript.title}
              </h3>

              <div className="mb-4">
                <h4 className="text-xs uppercase tracking-wider text-stone-400 font-semibold mb-1.5">
                  Logline
                </h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {selectedScript.logline}
                </p>
              </div>

              {selectedScript.tone && (
                <div className="text-xs text-stone-400 mb-6 flex items-center gap-2">
                  <span className="font-medium text-stone-300">Tone:</span>
                  <span>{selectedScript.tone}</span>
                </div>
              )}

              <div className="pt-4 border-t border-stone-800 flex items-center justify-between gap-3">
                <span className="text-xs text-stone-400">
                  Coverage &amp; lookbook available
                </span>
                <button
                  onClick={() => {
                    const title = selectedScript.title;
                    setSelectedScript(null);
                    if (onRequestScript) {
                      onRequestScript(title);
                    }
                  }}
                  className="px-5 py-2.5 bg-[#F3B544] text-[#120E0A] font-semibold text-sm rounded-full hover:bg-[#ffc355] transition-all cursor-pointer"
                >
                  Request Full Screenplay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
