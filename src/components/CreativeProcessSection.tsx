import React from 'react';
import processBgImage from '../assets/images/creative_process_bg_1789319539701.jpg';
import siteContent from '../data/siteContent.json';

export const CreativeProcessSection: React.FC = () => {
  const content = siteContent.creativeProcess;
  const bgImage = content.backgroundImage || processBgImage;
  const bgFallback = content.backgroundFallback || '/process-bg.jpg';

  const stepIcons: Record<string, React.ReactNode> = {
    '1': (
      // Lightbulb line art icon
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
        <line x1="12" y1="2" x2="12" y2="3" />
        <line x1="4.93" y1="4.93" x2="5.64" y2="5.64" />
        <line x1="19.07" y1="4.93" x2="18.36" y2="5.64" />
      </svg>
    ),
    '2': (
      // Document / Script page icon
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="16" y2="17" />
        <line x1="8" y1="9" x2="10" y2="9" />
      </svg>
    ),
    '3': (
      // Pen / Nib angled down
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 19 7-7 3 3-7 7-3-3z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
    '4': (
      // Movie clapperboard icon
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.2 6 3 11l-.9-2.4c-.4-1.1.2-2.4 1.3-2.8l13.6-5c1.1-.4 2.4.2 2.8 1.3l.4 1.9Z" />
        <path d="m6.2 5.3 3.1 4.7" />
        <path d="m12.2 3.1 3.1 4.7" />
        <rect x="2" y="11" width="20" height="11" rx="2" />
      </svg>
    ),
  };

  const defaultIcon = (
    <svg
      className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
    </svg>
  );

  return (
    <section
      id="process"
      className="relative w-full bg-[#0a0c10] text-neutral-100 py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden border-t border-stone-800"
    >
      {/* Background Mountain Panorama & Cinematic Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          id="process-bg-image"
          src={bgImage}
          onError={(e) => {
            e.currentTarget.src = bgFallback;
          }}
          alt="Cinematic mountain landscape with vintage film reel"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[center_35%] filter brightness-[0.42] contrast-[1.12]"
        />

        {/* Cinematic Vignette Overlay */}
        <div
          id="process-vignette"
          className="absolute inset-0 bg-gradient-to-r from-[#090b0e]/95 via-[#090b0e]/80 to-[#090b0e]/85"
        />

        {/* Ambient Warm Golden Horizon Glow */}
        <div
          id="process-ambient-glow"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-48 bg-[#f5b544]/5 blur-[120px] pointer-events-none"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div id="process-eyebrow-container" className="mb-2.5">
            <span
              id="process-eyebrow"
              className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-400"
            >
              {content.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h2
            id="process-headline"
            className="font-serif-display text-3xl sm:text-4xl lg:text-[44px] font-normal italic leading-[1.12] tracking-[-0.01em] text-neutral-100"
          >
            {content.headline}
          </h2>
        </div>

        {/* 4 Process Steps in Horizontal Chain with Connecting Arrows */}
        <div
          id="process-steps-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 items-start"
        >
          {content.steps.map((step, index) => (
            <div
              key={step.id || step.number}
              id={`process-step-${step.number}`}
              className="relative flex items-start group"
            >
              {/* Step Card Content */}
              <div className="flex flex-col items-start pr-4 sm:pr-6">
                {/* Icon */}
                <div
                  id={`process-icon-${step.number}`}
                  className="mb-4 text-[#F3B544] transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
                >
                  {stepIcons[step.number] || defaultIcon}
                </div>

                {/* Title */}
                <h3
                  id={`process-title-${step.number}`}
                  className="font-sans-ui text-base sm:text-[17px] font-semibold text-neutral-100 group-hover:text-[#F3B544] transition-colors leading-snug mb-1.5"
                >
                  {step.title}
                </h3>

                {/* Subtitle */}
                <p
                  id={`process-desc-${step.number}`}
                  className="font-sans-ui text-xs sm:text-[13.5px] text-stone-400 font-normal leading-relaxed"
                >
                  {step.subtitle}
                </p>
              </div>

              {/* Connecting Golden Arrow (shown between steps on desktop) */}
              {index < content.steps.length - 1 && (
                <div
                  id={`process-arrow-${index + 1}`}
                  className="hidden lg:flex absolute right-0 top-10 text-[#F3B544]/70 transform translate-x-1/2 pointer-events-none"
                  aria-hidden="true"
                >
                  <svg
                    className="w-7 h-5"
                    viewBox="0 0 32 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="2" y1="8" x2="28" y2="8" />
                    <polyline points="22 2 28 8 22 14" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
