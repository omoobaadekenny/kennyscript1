import React, { useState, useEffect, useCallback } from 'react';
import { X, Calendar, ExternalLink, Clock, Sparkles, RotateCcw } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const baseBookingUrl =
    siteContent.booking?.bookingUrl ||
    'https://api.leadconnectorhq.com/widget/booking/Ycvgdlju6M3707KQbc8C';
  const bookingData = siteContent.booking;

  const [isLoading, setIsLoading] = useState(true);
  const [sessionId, setSessionId] = useState<string>(() => Date.now().toString());

  // Generate a fresh session ID whenever modal opens to prevent retention of previous user details
  const startFreshSession = useCallback(() => {
    setIsLoading(true);
    setSessionId(Date.now().toString());
  }, []);

  useEffect(() => {
    if (isOpen) {
      startFreshSession();
    }
  }, [isOpen, startFreshSession]);

  // Handle ESC key to easily dismiss the modal environment
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Append session and timestamp parameters to ensure a pristine, un-cached booking session
  const separator = baseBookingUrl.includes('?') ? '&' : '?';
  const bookingUrlWithSession = `${baseBookingUrl}${separator}_session=${sessionId}&_t=${sessionId}`;

  const handleClose = () => {
    setIsLoading(true);
    onClose();
  };

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        id="booking-modal-dialog"
        className="relative w-full max-w-[540px] sm:max-w-[560px] h-auto max-h-[92vh] sm:max-h-[640px] aspect-[1/1.1] sm:aspect-square flex flex-col bg-[#111317] border border-stone-700/80 rounded-2xl text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative gold ambient glow 1 */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#F3B544]/15 rounded-full blur-3xl pointer-events-none" />
        
        {/* Subtle decorative gold ambient glow 2 */}
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#F3B544]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header (Child 3) */}
        <div
          id="booking-modal-header"
          className="relative z-10 flex-shrink-0 flex items-center justify-between px-3.5 sm:px-5 py-3 sm:py-3.5 border-b border-stone-800 bg-[#0d0f13]/95"
        >
          <div className="flex items-center space-x-2 sm:space-x-3 pr-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#F3B544]/15 border border-[#F3B544]/30 flex items-center justify-center text-[#F3B544] shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#F3B544]">
                  {bookingData?.badge || 'Call Scheduling'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] uppercase font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-1.5 py-0.2 rounded-full">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>
              <h2 className="font-serif-display text-sm sm:text-base font-semibold text-neutral-100 leading-tight">
                {bookingData?.title || 'Schedule a Discovery Call'}
              </h2>
            </div>
          </div>

          {/* Action buttons on the header */}
          <div className="flex items-center space-x-1.5 shrink-0">
            {/* Start Fresh / Reset details button */}
            <button
              id="reset-booking-session-btn"
              type="button"
              onClick={startFreshSession}
              title="Clear remembered details and start a fresh session"
              className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3 text-[#F3B544]" />
              <span className="text-[10.5px]">Clear</span>
            </button>

            {/* Open directly in new tab */}
            <a
              id="booking-open-external-btn"
              href={baseBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-1 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700 border border-stone-700 rounded-lg transition-colors cursor-pointer"
              title="Open booking page in a new window"
            >
              <ExternalLink className="w-3 h-3 text-[#F3B544]" />
              <span className="hidden md:inline text-[11px]">Open tab</span>
            </a>

            {/* Prominent Cancel Button */}
            <button
              id="close-booking-modal-btn"
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-neutral-100 hover:text-white bg-stone-800 hover:bg-rose-900/60 hover:border-rose-700/80 border border-stone-600 rounded-lg transition-all cursor-pointer shadow-sm active:scale-95"
              aria-label="Cancel and close scheduling dialog"
            >
              <X className="w-3.5 h-3.5 text-stone-300 hover:text-white" />
              <span className="font-semibold text-xs">Cancel</span>
            </button>
          </div>
        </div>

        {/* Modal Info Strip (Child 4) */}
        <div
          id="booking-modal-info-strip"
          className="relative z-10 flex-shrink-0 px-3.5 sm:px-5 py-1.5 bg-[#14171d] border-b border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-1.5"
        >
          <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px]">
            <Clock className="w-3 h-3 text-[#F3B544] shrink-0" />
            <span>Select a date & time for your discovery session.</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-[10px] text-stone-400">
            <Sparkles className="w-3 h-3 text-[#F3B544] shrink-0" />
            <span>Auto confirmation sent</span>
          </div>
        </div>

        {/* Modal Iframe Body (Child 5) */}
        <div
          id="booking-iframe-container"
          className="relative z-10 flex-1 min-h-0 w-full overflow-y-auto bg-[#0c0e12] flex items-center justify-center p-1.5 sm:p-2.5"
        >
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0e12] z-20 space-y-2">
              <div className="w-8 h-8 border-3 border-[#F3B544]/20 border-t-[#F3B544] rounded-full animate-spin" />
              <p className="text-stone-400 text-xs font-sans-ui">
                Loading scheduling widget...
              </p>
            </div>
          )}

          <iframe
            id="gohighlevel-booking-widget"
            key={sessionId}
            src={bookingUrlWithSession}
            style={{
              width: '100%',
              maxWidth: '480px',
              height: '100%',
              maxHeight: '480px',
              aspectRatio: '1 / 1',
              border: 'none',
              display: 'block',
              margin: '0 auto',
            }}
            onLoad={() => setIsLoading(false)}
            title="Schedule a Call - Kehinde David Aderibigbe"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen"
            className="w-full max-w-[480px] h-full max-h-[480px] aspect-square mx-auto border-none bg-[#0c0e12] rounded-xl"
          />
        </div>

        {/* Modal Footer Strip (Child 6) */}
        <div
          id="booking-modal-footer"
          className="relative z-10 flex-shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 bg-[#0d0f13] border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2"
        >
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startFreshSession}
              className="text-[#F3B544] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer text-[11px]"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset & clear details</span>
            </button>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <a
              href={baseBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-neutral-200 transition-colors inline-flex items-center gap-1 text-[11px]"
            >
              <span>Open in tab</span>
              <ExternalLink className="w-2.5 h-2.5 text-[#F3B544]" />
            </a>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="cancel-booking-footer-btn"
              type="button"
              onClick={handleClose}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1 px-3.5 py-1 rounded-full bg-stone-800 hover:bg-stone-700 active:scale-95 text-stone-200 hover:text-white font-medium text-xs border border-stone-600/80 transition-all cursor-pointer shadow-sm"
            >
              <X className="w-3 h-3 text-stone-400" />
              <span>Cancel & Exit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
