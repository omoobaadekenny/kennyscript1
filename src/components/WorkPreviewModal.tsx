import React from 'react';
import { X, Film, Award, BookOpen, Clock, ArrowUpRight } from 'lucide-react';

interface WorkPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

interface ScriptWork {
  title: string;
  genre: string;
  format: string;
  status: string;
  logline: string;
  accolade?: string;
}

const SAMPLE_SCRIPTS: ScriptWork[] = [
  {
    title: 'Echoes of the Caldera',
    genre: 'Psychological Thriller / Drama',
    format: 'Feature Film (112 pages)',
    status: 'Ready for Packaging',
    logline:
      'When an isolated vulcanologist discovers anomalous harmonic seismic signals beneath an ancient dormant crater, he uncovers a suppressed corporate experiment tied to his late sister’s disappearance.',
    accolade: 'Nicholl Fellowship Top 10% Semifinalist',
  },
  {
    title: 'The Silent Frequency',
    genre: 'Sci-Fi / Neo-Noir',
    format: 'One-Hour TV Pilot & Series Bible',
    status: 'In Development',
    logline:
      'In a near-future metropolis where verbal speech is monitored by predictive audio sensors, a rogue telegraphist and an ex-sound engineer transmit encrypted counter-narratives over forgotten analog frequencies.',
    accolade: 'Austin Film Festival Second Rounder',
  },
  {
    title: 'Harvest of Solitude',
    genre: 'Coming-of-Age Drama',
    format: 'Feature Film (98 pages)',
    status: 'Optioned / Pre-production',
    logline:
      'A young botanical archivist in coastal West Africa fights to preserve ancestral agricultural remedies while navigating familial friction and high-stakes pharmaceutical patent battles.',
    accolade: 'Black List Recommended Script (Score 8/10)',
  },
];

export const WorkPreviewModal: React.FC<WorkPreviewModalProps> = ({
  isOpen,
  onClose,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="work-preview-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="work-preview-modal-dialog"
        className="relative w-full max-w-2xl max-h-[85vh] bg-[#101216] border border-stone-700/80 rounded-2xl p-6 sm:p-8 text-neutral-100 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#F3B544]" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#F3B544]">
                Screenwriting Catalog
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold">
              Selected Feature & Television Works
            </h2>
          </div>
          <button
            id="close-work-modal-btn"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Cards List */}
        <div className="overflow-y-auto py-4 space-y-4 pr-1 scrollbar-thin">
          {SAMPLE_SCRIPTS.map((script, idx) => (
            <div
              key={idx}
              id={`script-item-${idx}`}
              className="p-4 sm:p-5 rounded-xl bg-[#17191f] border border-stone-800 hover:border-stone-700 transition-all group"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="font-serif-display text-lg sm:text-xl font-semibold text-neutral-100 group-hover:text-[#F3B544] transition-colors">
                  {script.title}
                </h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-stone-800/90 text-stone-300 font-mono">
                  {script.format}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-400 mb-3">
                <span className="text-[#F3B544]/90 font-medium">{script.genre}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {script.status}
                </span>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed mb-3">
                {script.logline}
              </p>

              {script.accolade && (
                <div className="flex items-center gap-1.5 text-xs text-amber-200/80 bg-amber-950/30 border border-amber-800/40 rounded-lg px-2.5 py-1 w-fit">
                  <Award className="w-3.5 h-3.5 text-[#F3B544]" />
                  <span>{script.accolade}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-400">
            Full treatments, script bibles, and lookbooks available upon request.
          </p>
          <button
            id="modal-request-script-btn"
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#F3B544] text-[#120E0A] font-semibold text-sm rounded-full hover:bg-[#ffc355] transition-all cursor-pointer"
          >
            <span>Request Full Screenplay</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
