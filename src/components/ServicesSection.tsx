import React from 'react';
import { ArrowRight } from 'lucide-react';
import servicesBgImage from '../assets/images/film_set_bg_1789319268705.jpg';
import siteContent from '../data/siteContent.json';

interface ServicesSectionProps {
  onViewServicesClick?: () => void;
  onServiceSelect?: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onViewServicesClick,
  onServiceSelect,
}) => {
  const content = siteContent.services;
  const bgImage = content.backgroundImage || servicesBgImage;
  const bgFallback = content.backgroundFallback || '/services-bg.jpg';

  const serviceIcons: Record<string, React.ReactNode> = {
    scriptwriting: (
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
    'story-development': (
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
    'screenplay-rewriting': (
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
    'script-consultation': (
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-[#F3B544]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
        <circle cx="12" cy="11.5" r="0.75" fill="currentColor" />
        <circle cx="16" cy="11.5" r="0.75" fill="currentColor" />
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    </svg>
  );

  return (
    <section
      id="services"
      className="relative w-full bg-[#0d0f14] text-neutral-100 py-16 sm:py-20 md:py-24 px-6 sm:px-10 md:px-14 lg:px-16 overflow-hidden border-t border-stone-800"
    >
      {/* Background Film Set & Mood Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Photorealistic Movie Camera / Film Set Backdrop */}
        <img
          id="services-background-image"
          src={bgImage}
          onError={(e) => {
            e.currentTarget.src = bgFallback;
          }}
          alt="Film set background with cinema camera"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-right filter brightness-[0.45] contrast-[1.15]"
        />

        {/* Dark Vignette Gradients: Strong left-to-right fade so typography pops cleanly */}
        <div
          id="services-left-overlay"
          className="absolute inset-0 bg-gradient-to-r from-[#0a0c10] via-[#0d0f14]/95 md:via-[#0d0f14]/85 to-[#0d0f14]/65"
        />

        {/* Ambient Warm Golden Film Glow in center background */}
        <div
          id="services-ambient-glow"
          className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 rounded-full bg-[#f3b544]/6 blur-[100px] pointer-events-none"
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Heading & Action Button */}
          <div className="xl:col-span-4 flex flex-col justify-center max-w-lg">
            {/* Eyebrow */}
            <div id="services-eyebrow-container" className="mb-2.5 sm:mb-3">
              <span
                id="services-eyebrow"
                className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-400"
              >
                {content.eyebrow}
              </span>
            </div>

            {/* Headline */}
            <h2
              id="services-headline"
              className="font-serif-display text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-normal italic leading-[1.14] tracking-[-0.01em] text-neutral-100"
            >
              {content.headline}
            </h2>

            {/* Description Subtitle */}
            <p
              id="services-description"
              className="font-sans-ui text-stone-300 text-sm sm:text-[15px] leading-relaxed mt-4 sm:mt-5 font-normal"
            >
              {content.description}
            </p>

            {/* Call To Action Button */}
            <div className="mt-6 sm:mt-7">
              <button
                id="view-services-cta-btn"
                type="button"
                onClick={onViewServicesClick}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] text-[#14110E] font-semibold text-sm sm:text-[15px] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F3B544]/15 cursor-pointer"
              >
                <span>{content.buttonText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Service Modules with Vertical Dividers */}
          <div className="xl:col-span-8 w-full mt-4 xl:mt-0">
            <div
              id="services-pillars-grid"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-0 sm:divide-x sm:divide-stone-700/50"
            >
              {content.items.map((service, index) => (
                <div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => onServiceSelect && onServiceSelect(service.title)}
                  className={`flex flex-col items-start transition-all duration-200 group cursor-pointer ${
                    index === 0
                      ? 'sm:pr-6 lg:pr-6'
                      : index === content.items.length - 1
                      ? 'sm:pl-6 lg:pl-6'
                      : 'sm:px-6 lg:px-6'
                  } py-2`}
                >
                  {/* Service Icon */}
                  <div
                    id={`service-icon-${service.id}`}
                    className="mb-3.5 sm:mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-0.5"
                  >
                    {serviceIcons[service.id] || defaultIcon}
                  </div>

                  {/* Service Title */}
                  <h3
                    id={`service-title-${service.id}`}
                    className="font-sans-ui text-base sm:text-[17px] font-semibold text-neutral-100 group-hover:text-[#F3B544] transition-colors duration-200 leading-snug mb-2"
                  >
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p
                    id={`service-desc-${service.id}`}
                    className="font-sans-ui text-xs sm:text-[13px] text-stone-400 leading-relaxed font-normal"
                  >
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
