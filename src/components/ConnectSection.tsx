import React from 'react';
import { Mail, Instagram, Calendar } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface ConnectSectionProps {
  onOpenContact: () => void;
  onOpenBooking?: () => void;
}

export const ConnectSection: React.FC<ConnectSectionProps> = ({
  onOpenContact,
  onOpenBooking,
}) => {
  const content = siteContent.connect;
  const footerContent = siteContent.footer;
  const bookingUrl =
    siteContent.booking?.bookingUrl ||
    'https://api.leadconnectorhq.com/widget/booking/Ycvgdlju6M3707KQbc8C';

  const handleBooking = () => {
    if (onOpenBooking) {
      onOpenBooking();
    } else {
      window.open(bookingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const linkedinUrl = content.socialLinks?.find((s) => s.id === 'social-linkedin')?.url || 'https://linkedin.com';
  const xUrl = content.socialLinks?.find((s) => s.id === 'social-x')?.url || 'https://x.com';
  const instagramUrl = content.socialLinks?.find((s) => s.id === 'social-instagram')?.url || 'https://instagram.com';

  return (
    <div id="contact" className="w-full flex flex-col">
      {/* Upper Connect Banner on Linen / Cream Background */}
      <section
        id="connect-banner"
        className="w-full bg-[#F5F2EC] text-stone-900 py-14 sm:py-16 md:py-20 px-6 sm:px-10 md:px-14 lg:px-16 border-t border-stone-300/70"
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-6">
          
          {/* Left Column: Heading & Description */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-md">
            <div id="connect-eyebrow-container" className="mb-2">
              <span
                id="connect-eyebrow"
                className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-600"
              >
                {content.eyebrow}
              </span>
            </div>

            <h2
              id="connect-headline"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] font-normal italic leading-[1.14] tracking-[-0.01em] text-[#191613]"
            >
              {content.headline}
            </h2>

            <p
              id="connect-description"
              className="font-sans-ui text-stone-600 text-xs sm:text-sm md:text-[14.5px] leading-relaxed mt-2.5 font-normal"
            >
              {content.description}
            </p>
          </div>

          {/* Center Column: CTA Buttons (Schedule a Call & Get In Touch) */}
          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center justify-center gap-3.5 my-2 lg:my-0">
            {/* Primary Action: Schedule a Call */}
            <button
              id="connect-schedule-call-btn"
              type="button"
              onClick={handleBooking}
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-full bg-[#d69622] hover:bg-[#c28416] text-[#14110E] text-sm sm:text-[15px] font-semibold transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-[#d69622]/25 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#14110E]" />
              <span>{content.scheduleButtonText || 'Schedule a Call'}</span>
            </button>

            {/* Secondary Action: Send a Message */}
            <button
              id="get-in-touch-btn"
              type="button"
              onClick={onOpenContact}
              className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-full bg-[#0d0f14] hover:bg-[#181b22] text-neutral-100 text-sm sm:text-[15px] font-medium transition-all duration-200 transform hover:scale-[1.03] active:scale-[0.98] shadow-xl cursor-pointer border border-stone-800"
            >
              <span>{content.buttonText}</span>
              <Mail className="w-4 h-4 text-[#F3B544] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Column: Social Links & Handwritten Signature */}
          <div className="flex flex-col items-center lg:items-end space-y-4 sm:space-y-5">
            {/* Social Icons Row */}
            <div id="connect-social-links" className="flex items-center space-x-5 text-stone-800">
              {/* LinkedIn */}
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                id="social-linkedin"
                aria-label="LinkedIn"
                className="hover:text-[#F3B544] transition-colors p-1"
              >
                <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.46a1.63 1.63 0 1 0 0 3.25 1.63 1.63 0 0 0 0-3.25Z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                id="social-x"
                aria-label="X (Twitter)"
                className="hover:text-[#F3B544] transition-colors p-1"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                id="social-instagram"
                aria-label="Instagram"
                className="hover:text-[#F3B544] transition-colors p-1"
              >
                <Instagram className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
              </a>

              {/* Mail icon */}
              <button
                type="button"
                onClick={onOpenContact}
                id="social-email"
                aria-label="Send an email"
                className="hover:text-[#F3B544] transition-colors p-1 cursor-pointer"
              >
                <Mail className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
              </button>
            </div>

            {/* Handwritten Signature */}
            <div id="connect-signature-container" className="flex flex-col items-center lg:items-end select-none">
              <span className="font-script-quote text-2xl sm:text-3xl text-stone-700/90 font-medium tracking-wide transform -rotate-2">
                {content.signatureName}
              </span>
              {/* Handwritten signature underline brush swoosh */}
              <svg
                id="signature-swoosh"
                className="w-28 sm:w-32 h-4 text-stone-500/70 -mt-1"
                viewBox="0 0 130 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 8C35 4 80 5 125 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M20 13C50 11 90 12 115 15"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* Bottom Minimalist Footer Strip matching portfoliome 6.png */}
      <footer
        id="footer-strip"
        className="w-full bg-[#080a0d] py-6 sm:py-7 px-6 text-center border-t border-stone-900 select-none"
      >
        <p className="font-sans-ui text-[11px] sm:text-xs tracking-[0.32em] uppercase text-stone-400 font-medium">
          {footerContent.brandPillars.join(' / ')}
        </p>
      </footer>
    </div>
  );
};
