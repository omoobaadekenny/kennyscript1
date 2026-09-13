import React from 'react';

interface HandwrittenQuoteProps {
  className?: string;
}

export const HandwrittenQuote: React.FC<HandwrittenQuoteProps> = ({ className = '' }) => {
  return (
    <div
      id="hero-quote-container"
      className={`font-script-quote select-none pointer-events-none ${className}`}
      style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
    >
      <div className="flex flex-col leading-[1.08] text-right sm:text-left text-neutral-100/90 text-3xl sm:text-4xl md:text-5xl lg:text-[46px] tracking-wide font-medium italic">
        <span className="transform -rotate-2 origin-bottom-left transition-transform duration-500">Great</span>
        <span className="transform -rotate-1 ml-1 sm:ml-2">Stories</span>
        <span className="transform rotate-1 ml-0.5 sm:ml-1">Build</span>
        <span className="transform -rotate-1 ml-1 sm:ml-2">Better</span>
        <div className="relative inline-block w-fit self-end sm:self-start">
          <span className="transform rotate-2 ml-1 sm:ml-2">Worlds</span>
          {/* Handwritten artistic underline */}
          <svg
            id="quote-underline-svg"
            className="w-24 sm:w-32 h-4 sm:h-5 text-neutral-200/90 mt-1 overflow-visible"
            viewBox="0 0 120 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 11C24 6.5 56 4 82 8.5C97 11 110 9 117 7.5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 15C38 12 70 11.5 95 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="2 1"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
