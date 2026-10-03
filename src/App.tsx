/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { HandwrittenQuote } from './components/HandwrittenQuote';
import { ContactModal } from './components/ContactModal';
import { BookingModal } from './components/BookingModal';
import { WorkPreviewModal } from './components/WorkPreviewModal';
import { InfoModal } from './components/InfoModal';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { CreativeProcessSection } from './components/CreativeProcessSection';
import { ConnectSection } from './components/ConnectSection';
import heroBgImage from './assets/images/screenwriter_hero_1789318514729.jpg';
import siteContent from './data/siteContent.json';

export default function App() {
  const [activeNav, setActiveNav] = useState('Home');
  const [contactOpen, setContactOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [infoType, setInfoType] = useState<'About' | 'Services' | null>(null);
  const [isPortrait, setIsPortrait] = useState(true);

  const hero = siteContent.hero;
  const bgImage = hero.backgroundImage || heroBgImage;
  const bgFallback = hero.backgroundFallback || '/hero-bg.jpg';

  // Monitor scroll position to update active navigation
  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      const selectedWorkEl = document.getElementById('selected-work');
      const servicesEl = document.getElementById('services');
      const aboutEl = document.getElementById('about');

      if (contactEl) {
        const cRect = contactEl.getBoundingClientRect();
        if (cRect.top <= 350) {
          setActiveNav('Contact');
          return;
        }
      }

      if (selectedWorkEl) {
        const wRect = selectedWorkEl.getBoundingClientRect();
        if (wRect.top <= 260) {
          setActiveNav('My Work');
          return;
        }
      }

      if (servicesEl) {
        const sRect = servicesEl.getBoundingClientRect();
        if (sRect.top <= 260) {
          setActiveNav('Services');
          return;
        }
      }

      if (aboutEl) {
        const aRect = aboutEl.getBoundingClientRect();
        if (aRect.top <= 260) {
          setActiveNav('About');
          return;
        }
      }

      setActiveNav('Home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (navItem: string) => {
    setActiveNav(navItem);
    if (navItem === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (navItem === 'About') {
      const el = document.getElementById('about');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (navItem === 'Services') {
      const el = document.getElementById('services');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (navItem === 'My Work') {
      const el = document.getElementById('selected-work');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setWorkOpen(true);
      }
    } else if (navItem === 'Contact') {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setContactOpen(true);
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0c0f] text-neutral-100 overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="hero-section"
        className="relative w-full min-h-screen flex flex-col justify-between select-none"
      >
        {/* Background Image Container with Cinematic Lighting Gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Photorealistic Hero Background */}
          <img
            id="hero-background-image"
            src={bgImage}
            onLoad={(e) => {
              const { naturalWidth, naturalHeight } = e.currentTarget;
              setIsPortrait(naturalHeight > naturalWidth);
            }}
            onError={(e) => {
              e.currentTarget.src = bgFallback;
            }}
            alt={hero.headlineHighlighted || 'Kehinde David Aderibigbe'}
            referrerPolicy="no-referrer"
            className={`w-full h-full filter brightness-[0.96] contrast-[1.03] transition-all duration-300 ${
              isPortrait
                ? 'object-contain object-center md:object-right lg:object-[84%_center]'
                : 'object-cover object-center'
            }`}
          />

          {/* Deep Left Vignette Gradient: Solid on the left for pristine typography legibility, smooth feathering across */}
          <div
            id="hero-left-vignette"
            className={`absolute inset-0 w-full transition-opacity duration-300 ${
              isPortrait
                ? 'bg-gradient-to-t from-[#090b0e] via-[#090b0e]/90 to-[#090b0e]/30 md:bg-gradient-to-r md:from-[#090b0e] md:via-[#090b0e] md:via-30% lg:via-[#090b0e]/85 lg:via-48% md:to-transparent'
                : 'bg-gradient-to-r from-[#090b0e] via-[#090b0e]/90 md:via-[#090b0e]/75 sm:w-4/5 md:w-3/5 lg:w-[58%]'
            }`}
          />

          {/* Top Header Subtle Fade for Navbar Legibility without obscuring top of portrait */}
          <div
            id="hero-top-vignette"
            className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#090b0e]/80 via-[#090b0e]/30 to-transparent"
          />

          {/* Bottom Subtle Grounding Vignette */}
          <div
            id="hero-bottom-vignette"
            className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/45 to-transparent"
          />

          {/* Right Edge Subtle Vignette for Portrait Soft Blending */}
          <div
            id="hero-right-vignette"
            className="hidden md:block absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-l from-[#090b0e]/60 to-transparent"
          />

          {/* Warm Golden Ambient Glow near the portrait */}
          <div
            id="hero-ambient-lamp-glow"
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#f5b544]/6 blur-[130px] mix-blend-screen"
          />
        </div>

        {/* Top Navigation Bar */}
        <Navbar
          activeNav={activeNav}
          onNavClick={handleNavClick}
          onScheduleClick={() => setBookingOpen(true)}
        />

        {/* Hero Section Center Body */}
        <div className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-10 md:px-14 lg:px-16 flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-12 sm:py-10">
            {/* Left Column: Hero Content & Call-to-Actions */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col justify-center max-w-2xl">
              {/* Eyebrow / Category Label */}
              <div id="hero-eyebrow-container" className="mb-3 sm:mb-4">
                <span
                  id="hero-eyebrow"
                  className="font-sans-ui text-xs sm:text-[13px] tracking-[0.24em] uppercase font-semibold text-stone-300/90"
                >
                  {hero.eyebrow}
                </span>
              </div>

              {/* Main Headline */}
              <h1
                id="hero-headline"
                className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-normal leading-[1.06] tracking-[-0.015em] text-neutral-100"
              >
                {hero.headlinePrefix || 'I Turn Ideas Into'} <br className="hidden sm:inline" />
                {hero.headlineMiddle || 'Stories Worth'}{' '}
                <span className="relative inline-block text-[#F3B544] font-normal">
                  {hero.headlineHighlighted || 'Watching.'}
                  {/* Hand-drawn Golden Underline Swoosh */}
                  <svg
                    id="hero-watching-underline"
                    className="absolute -bottom-2 sm:-bottom-3.5 left-0 w-[104%] h-3.5 sm:h-5 text-[#F3B544] overflow-visible"
                    viewBox="0 0 260 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 3 13 C 50 17, 120 16.5, 190 10.5 C 218 8, 242 6.5, 256 5.5"
                      stroke="currentColor"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 16 17 C 75 20, 155 18, 230 11.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      opacity="0.65"
                    />
                  </svg>
                </span>
              </h1>

              {/* Paragraph / Intro Biography */}
              <p
                id="hero-description"
                className="font-sans-ui text-stone-300 text-sm sm:text-base md:text-[17px] leading-relaxed max-w-xl mt-6 sm:mt-7 font-normal"
              >
                {hero.description}
              </p>

              {/* Call To Action Buttons */}
              <div
                id="hero-cta-buttons"
                className="flex flex-wrap items-center gap-3.5 sm:gap-4 mt-7 sm:mt-9"
              >
                {/* Primary CTA: Schedule a Call */}
                <button
                  id="cta-schedule-call-btn"
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="group inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-[#F3B544] hover:bg-[#ffbe4d] text-[#14110E] font-semibold text-sm sm:text-[15px] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#F3B544]/25 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#14110E]" />
                  <span>Schedule a Call</span>
                </button>

                {/* Secondary CTA: View My Work */}
                <button
                  id="cta-view-work-btn"
                  type="button"
                  onClick={() => setWorkOpen(true)}
                  className="group inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3.5 rounded-full border border-stone-600/70 hover:border-[#F3B544]/80 bg-black/40 hover:bg-black/65 backdrop-blur-sm text-neutral-200 hover:text-white font-medium text-sm sm:text-[15px] transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>{hero.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </button>

                {/* Tertiary CTA: Let's Talk */}
                <button
                  id="cta-lets-talk-btn"
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3.5 rounded-full border border-transparent hover:border-stone-700/60 bg-transparent hover:bg-white/5 text-stone-300 hover:text-white font-medium text-sm sm:text-[15px] transition-all duration-200 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-stone-400 group-hover:text-[#F3B544] transition-colors duration-200" />
                  <span>{hero.secondaryCta}</span>
                </button>
              </div>
            </div>

            {/* Right Column: Handwritten Artistic Quote "Great Stories Build Better Worlds" */}
            <div className="lg:col-span-5 xl:col-span-4 flex justify-end items-start lg:pt-0 pointer-events-none">
              <div className="hidden md:block lg:translate-x-2 xl:translate-x-6 lg:-translate-y-4">
                <HandwrittenQuote />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Subtle Indicator */}
        <div className="relative z-10 w-full px-6 sm:px-10 md:px-14 lg:px-16 py-3 border-t border-stone-800/40 bg-gradient-to-t from-[#090b0e]/80 to-transparent">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-xs text-stone-500 font-sans-ui">
            <div className="flex items-center space-x-3">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
              <span>{hero.availabilityNotice}</span>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('about');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-1 sm:mt-0 flex items-center space-x-2 text-stone-400 hover:text-[#F3B544] transition-colors cursor-pointer group"
            >
              <span>{hero.scrollPrompt}</span>
              <span className="group-hover:translate-y-0.5 transition-transform">↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Me Section from uploaded design */}
      <AboutSection />

      {/* What I Do / Services Section from uploaded design */}
      <ServicesSection
        onViewServicesClick={() => setInfoType('Services')}
        onServiceSelect={(serviceName) => setInfoType('Services')}
      />

      {/* Selected Work / Some of My Scripts Section from uploaded design */}
      <SelectedWorkSection
        onViewAllProjects={() => setWorkOpen(true)}
        onRequestScript={(scriptTitle) => setContactOpen(true)}
      />

      {/* My Creative Process / From Idea to Final Script Section from uploaded design */}
      <CreativeProcessSection />

      {/* Let's Connect / Have a Story to Tell Section from uploaded design */}
      <ConnectSection
        onOpenContact={() => setContactOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      {/* Modals for Interactivity */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onOpenBooking={() => setBookingOpen(true)}
      />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      <WorkPreviewModal
        isOpen={workOpen}
        onClose={() => setWorkOpen(false)}
        onOpenContact={() => setContactOpen(true)}
      />

      <InfoModal
        type={infoType}
        isOpen={infoType !== null}
        onClose={() => setInfoType(null)}
        onOpenContact={() => setContactOpen(true)}
      />
    </div>
  );
}
