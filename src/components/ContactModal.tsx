import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Calendar } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const content = siteContent.contactModal;
  const directEmail = siteContent.contactInfo?.email || 'kennydaviddesigns@gmail.com';

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Feature Film Screenplay',
    message: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation
    }, 400);
  };

  const handleBookingClick = () => {
    onClose();
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.open(
        siteContent.booking?.bookingUrl || 'https://api.leadconnectorhq.com/widget/booking/Ycvgdlju6M3707KQbc8C',
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="contact-modal-dialog"
        className="relative w-full max-w-lg bg-[#111317] border border-stone-700/80 rounded-2xl p-6 sm:p-8 text-neutral-100 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#F3B544]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          id="close-contact-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center flex flex-col items-center">
            <CheckCircle2 className="w-14 h-14 text-[#F3B544] mb-4" />
            <h3 className="font-serif-display text-2xl font-semibold mb-2">{content.successTitle}</h3>
            <p className="text-stone-300 text-sm max-w-sm mb-6">
              {content.successMessage}
            </p>
            <button
              id="close-success-btn"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-[#F3B544] text-[#120E0A] font-medium rounded-full text-sm hover:bg-[#ffc355] transition-all"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <span className="text-[11px] tracking-[0.2em] uppercase font-semibold text-[#F3B544]">
                {content.badge}
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold mt-1">
                {content.title}
              </h2>
              <p className="text-stone-300 text-sm mt-1.5 leading-relaxed">
                {content.description}
              </p>
            </div>

            {/* Quick Schedule Call Option */}
            <div
              id="contact-modal-booking-prompt"
              className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-[#F3B544]/15 via-[#F3B544]/5 to-transparent border border-[#F3B544]/35 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#F3B544]/20 flex items-center justify-center text-[#F3B544] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-neutral-100">
                    Prefer a direct discussion?
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Schedule a 1-on-1 discovery call directly on my calendar.
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="contact-modal-schedule-btn"
                onClick={handleBookingClick}
                className="w-full sm:w-auto px-3.5 py-1.5 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] text-[#14110E] text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer shadow-sm"
              >
                Schedule Call
              </button>
            </div>

            <div className="relative flex py-2 items-center mb-1">
              <div className="flex-grow border-t border-stone-800"></div>
              <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-stone-500 font-medium">Or Send a Written Inquiry</span>
              <div className="flex-grow border-t border-stone-800"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  Your Name
                </label>
                <input
                  id="contact-form-name"
                  required
                  type="text"
                  placeholder="e.g. Maya Lin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#181a20] border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-stone-500 focus:outline-none focus:border-[#F3B544] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  Email Address
                </label>
                <input
                  id="contact-form-email"
                  required
                  type="email"
                  placeholder="e.g. producer@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#181a20] border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-stone-500 focus:outline-none focus:border-[#F3B544] transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  Project Type
                </label>
                <select
                  id="contact-form-type"
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-[#181a20] border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 focus:outline-none focus:border-[#F3B544] transition-colors"
                >
                  {(content.projectTypes || [
                    "Feature Film",
                    "TV Pilot",
                    "Script Polish",
                    "Story Treatment",
                    "General Inquiry"
                  ]).map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-stone-400 mb-1.5 font-medium">
                  Brief Synopsis or Inquiry
                </label>
                <textarea
                  id="contact-form-message"
                  required
                  rows={3}
                  placeholder="Share a brief overview of your project, timeline, or vision..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#181a20] border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-neutral-100 placeholder-stone-500 focus:outline-none focus:border-[#F3B544] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[12px] text-stone-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#F3B544]" />
                  Direct: {directEmail}
                </span>
                <button
                  id="submit-contact-btn"
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F3B544] text-[#120E0A] font-semibold text-sm rounded-full hover:bg-[#ffc355] transition-all cursor-pointer"
                >
                  <span>Send</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
