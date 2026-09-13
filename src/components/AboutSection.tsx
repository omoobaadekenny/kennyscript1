import React from 'react';
import screenplayImg from '../assets/images/screenplay_notebook_1789318951251.jpg';
import siteContent from '../data/siteContent.json';

export const AboutSection: React.FC = () => {
  const content = siteContent.about;
  const imageSrc = content.image || screenplayImg;
  const imageFallback = content.imageFallback || '/screenplay-notebook.jpg';

  const pillarIcons: Record<string, React.ReactNode> = {
    'creative-thinker': (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
      </svg>
    ),
    'story-enthusiast': (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="12" cy="7" r="1" fill="currentColor" />
        <circle cx="16.5" cy="9.5" r="1" fill="currentColor" />
        <circle cx="16.5" cy="14.5" r="1" fill="currentColor" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
        <circle cx="7.5" cy="14.5" r="1" fill="currentColor" />
        <circle cx="7.5" cy="9.5" r="1" fill="currentColor" />
      </svg>
    ),
    'detail-focused': (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        <line x1="15" y1="5" x2="19" y2="9" />
      </svg>
    ),
    'always-growing': (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  };

  return (
    <section
      id="about"
      className="relative w-full bg-[#F5F2EC] text-stone-900 py-20 sm:py-24 md:py-28 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden border-t border-stone-300/60"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Artistic Brushstroke Masked Screenplay Image */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-center items-center">
            <div
              id="about-image-frame"
              className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center select-none"
            >
              {/* SVG Mask Definition */}
              <svg width="0" height="0" className="absolute">
                <defs>
                  <clipPath id="brushstroke-clip" clipPathUnits="objectBoundingBox">
                    {/* Organic, distressed torn-edge / painterly brushstroke silhouette */}
                    <path d="M 0.05 0.18 C 0.03 0.14, 0.08 0.10, 0.14 0.12 C 0.18 0.08, 0.25 0.07, 0.32 0.09 C 0.38 0.06, 0.46 0.07, 0.53 0.08 C 0.60 0.06, 0.68 0.09, 0.74 0.07 C 0.81 0.08, 0.87 0.11, 0.92 0.15 C 0.96 0.18, 0.94 0.24, 0.95 0.30 C 0.97 0.38, 0.93 0.46, 0.96 0.54 C 0.94 0.62, 0.97 0.70, 0.94 0.78 C 0.96 0.85, 0.91 0.90, 0.86 0.92 C 0.78 0.94, 0.71 0.92, 0.63 0.93 C 0.56 0.95, 0.48 0.92, 0.40 0.94 C 0.32 0.92, 0.24 0.94, 0.17 0.91 C 0.10 0.89, 0.06 0.84, 0.04 0.78 C 0.06 0.70, 0.03 0.62, 0.05 0.53 C 0.02 0.45, 0.05 0.37, 0.03 0.29 C 0.05 0.23, 0.03 0.19, 0.05 0.18 Z" />
                  </clipPath>
                </defs>
              </svg>

              {/* Distressed ink splatter/brush accents around the frame */}
              <div
                className="absolute inset-0 scale-[1.03] bg-stone-900/10 pointer-events-none"
                style={{
                  clipPath: 'url(#brushstroke-clip)',
                  filter: 'blur(3px)',
                }}
              />

              {/* Main Image with Painterly Clip-Path */}
              <div
                className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  clipPath: 'url(#brushstroke-clip)',
                }}
              >
                <img
                  id="screenplay-notebook-image"
                  src={imageSrc}
                  onError={(e) => {
                    e.currentTarget.src = imageFallback;
                  }}
                  alt="Screenplay notebook, pen, and director's clapperboard on desk"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-[1.06] brightness-[0.98]"
                />

                {/* Subtle warm grain / paper overlay to match vintage editorial look */}
                <div className="absolute inset-0 bg-[#3a2818]/10 mix-blend-multiply pointer-events-none" />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none" />
              </div>

              {/* Painterly brush edge bristles & flecks around the perimeter */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none text-stone-900/40"
                viewBox="0 0 500 360"
                fill="none"
              >
                {/* Top torn brush strokes */}
                <path d="M60 48 Q 120 40, 200 44 T 360 38 Q 420 45, 460 62" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 4 8 2" opacity="0.4" />
                {/* Bottom brush strokes */}
                <path d="M45 300 Q 140 322, 260 318 T 440 310" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 3 12 4" opacity="0.35" />
                {/* Left side bristles */}
                <path d="M30 90 Q 22 170, 28 250" stroke="currentColor" strokeWidth="2" strokeDasharray="4 6 10 3" opacity="0.3" />
                {/* Right side bristles */}
                <path d="M475 95 Q 480 180, 472 265" stroke="currentColor" strokeWidth="2" strokeDasharray="3 8 7 4" opacity="0.3" />
              </svg>
            </div>
          </div>

          {/* Right Column: Narrative Content & Pillars */}
          <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-center">
            {/* Eyebrow */}
            <div id="about-eyebrow-container" className="mb-3">
              <span
                id="about-eyebrow"
                className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-600"
              >
                {content.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2
              id="about-headline"
              className="font-serif-display text-4xl sm:text-5xl md:text-[52px] xl:text-[56px] font-normal italic leading-[1.12] tracking-[-0.01em] text-[#191613]"
            >
              {content.headline}
            </h2>

            {/* Body Description */}
            <p
              id="about-bio-text"
              className="font-sans-ui text-stone-700 text-sm sm:text-base md:text-[16px] leading-[1.72] max-w-2xl mt-5 sm:mt-6 font-normal"
            >
              {content.bioText}
            </p>

            {/* 4 Feature Columns with Vertical Dividers */}
            <div
              id="about-core-pillars"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-0 mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-stone-300/80 sm:border-t-0"
            >
              {content.pillars.map((pillar, idx) => {
                const isLast = idx === content.pillars.length - 1;
                const borderClasses = isLast
                  ? 'px-0 sm:pl-6'
                  : idx === 0
                  ? 'pr-4 sm:pr-6 sm:border-r sm:border-stone-300'
                  : 'px-0 sm:px-6 sm:border-r sm:border-stone-300';
                
                return (
                  <div
                    key={pillar.id}
                    id={`pillar-${pillar.id}`}
                    className={`flex flex-col items-start ${borderClasses}`}
                  >
                    <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center text-stone-900 mb-2.5 sm:mb-3">
                      {pillarIcons[pillar.id] || (
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="9" />
                        </svg>
                      )}
                    </div>
                    <div className="font-sans-ui text-xs sm:text-sm font-medium text-stone-900 leading-snug">
                      <div>{pillar.titleLine1}</div>
                      <div>{pillar.titleLine2}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
