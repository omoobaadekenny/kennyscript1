import React, { useState } from 'react';
import { X, Calendar, ExternalLink, Clock, Sparkles } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const bookingUrl =
    siteContent.booking?.bookingUrl ||
    'https://api.leadconnectorhq.com/widget/booking/Ycvgdlju6M3707KQbc8C';
  const bookingData = siteContent.booking;

  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      id="booking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="booking-modal-dialog"
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#111317] border border-stone-700/80 rounded-2xl text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative gold ambient glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#F3B544]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-[#F3B544]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b border-stone-800 bg-[#0d0f13]/90">
          <div className="flex items-center space-x-3 sm:space-x-3.5 pr-4">
            <div className="w-10 h-10 rounded-xl bg-[#F3B544]/15 border border-[#F3B544]/30 flex items-center justify-center text-[#F3B544] shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase font-semibold text-[#F3B544]">
                  {bookingData?.badge || 'Call Scheduling'}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Calendar
                </span>
              </div>
              <h2 className="font-serif-display text-lg sm:text-xl md:text-2xl font-semibold text-neutral-100 leading-tight">
                {bookingData?.title || 'Schedule a Discovery Call'}
              </h2>
            </div>
          </div>

          {/* Action buttons on the header */}
          <div className="flex items-center space-x-2 shrink-0">
            {/* Open directly in new tab */}
            <a
              id="booking-open-external-btn"
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-medium text-stone-300 hover:text-white bg-stone-800/80 hover:bg-stone-700/80 border border-stone-700 rounded-lg transition-colors cursor-pointer"
              title="Open booking page in a new window"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#F3B544]" />
              <span className="hidden sm:inline">Open in new tab</span>
            </a>

            {/* Close button */}
            <button
              id="close-booking-modal-btn"
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Info Strip */}
        <div className="relative z-10 px-5 sm:px-7 py-2.5 bg-[#14171d] border-b border-stone-800/80 flex flex-wrap items-center justify-between text-xs text-stone-400 gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#F3B544]" />
            <span>Select a convenient time slot from the GoHighLevel automation calendar below.</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-stone-400">
            <Sparkles className="w-3 h-3 text-[#F3B544]" />
            <span>Automatic confirmation & invite sent via email</span>
          </div>
        </div>

        {/* Modal Iframe Body */}
        <div className="relative z-10 flex-1 overflow-y-auto w-full min-h-[520px] sm:min-h-[580px] md:min-h-[620px] bg-[#0c0e12]">
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0e12] z-20 space-y-3">
              <div className="w-10 h-10 border-3 border-[#F3B544]/20 border-t-[#F3B544] rounded-full animate-spin" />
              <p className="text-stone-400 text-xs sm:text-sm font-sans-ui">
                Loading scheduling widget...
              </p>
            </div>
          )}

          <iframe
            id="gohighlevel-booking-widget"
            src={bookingUrl}
            style={{ width: '100%', minHeight: '640px', border: 'none' }}
            onLoad={() => setIsLoading(false)}
            title="Schedule a Call - Kehinde David Aderibigbe"
            allow="camera; microphone; autoplay; encrypted-media; fullscreen"
          />
        </div>

        {/* Modal Footer Strip */}
        <div className="relative z-10 px-5 sm:px-7 py-3 bg-[#0d0f13] border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-2">
          <span>
            Having trouble viewing the calendar?{' '}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F3B544] hover:underline font-medium inline-flex items-center gap-1"
            >
              <span>Click here to open booking directly</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </span>
          <button
            id="close-booking-footer-btn"
            onClick={onClose}
            className="text-stone-400 hover:text-white transition-colors cursor-pointer text-xs"
          >
            Close window
          </button>
        </div>
      </div>
    </div>
  );
};
