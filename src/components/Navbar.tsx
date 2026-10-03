import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';
import siteContent from '../data/siteContent.json';

interface NavbarProps {
  onNavClick?: (navItem: string) => void;
  onScheduleClick?: () => void;
  activeNav?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavClick,
  onScheduleClick,
  activeNav = 'Home',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = siteContent.site?.navigation?.map((n) => n.label) || [
    'Home',
    'About',
    'My Work',
    'Services',
    'Contact',
  ];

  const brandTitle = siteContent.site?.brandTitle || 'KEHINDE DAVID ADERIBIGBE';
  const brandSubtitle = siteContent.site?.brandSubtitle || 'SCREENWRITER | STORYTELLER';

  const handleItemClick = (item: string) => {
    if (onNavClick) {
      onNavClick(item);
    }
    setMobileMenuOpen(false);
  };

  const handleScheduleClick = () => {
    if (onScheduleClick) {
      onScheduleClick();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-40 w-full pt-6 md:pt-8 pb-4 px-6 sm:px-10 md:px-14 lg:px-16">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo / Name Branding */}
        <div id="nav-brand" className="flex flex-col group cursor-pointer" onClick={() => handleItemClick('Home')}>
          <span className="font-sans-ui text-sm sm:text-base md:text-[17px] tracking-[0.16em] uppercase font-semibold text-neutral-100 transition-colors duration-200 group-hover:text-[#F3B544]">
            {brandTitle}
          </span>
          <span className="font-sans-ui text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-stone-400 font-medium mt-0.5">
            {brandSubtitle}
          </span>
        </div>

        {/* Desktop Navigation Links & CTA */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <nav id="desktop-nav" aria-label="Main Navigation" className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  id={`nav-link-${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleItemClick(item)}
                  className={`text-sm lg:text-[15px] transition-all duration-200 cursor-pointer relative py-1 ${
                    isActive
                      ? 'text-neutral-100 font-medium'
                      : 'text-stone-300 hover:text-[#F3B544]'
                  }`}
                >
                  {item}
                  {isActive && (
                    <span
                      id="nav-active-indicator"
                      className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-[#F3B544] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Schedule a Call button */}
          <button
            id="nav-schedule-call-btn"
            type="button"
            onClick={handleScheduleClick}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F3B544]/60 bg-[#F3B544]/10 hover:bg-[#F3B544] text-[#F3B544] hover:text-[#120E0A] font-semibold text-xs sm:text-[13px] tracking-wide transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[#F3B544]/20"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule a Call</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            id="mobile-schedule-call-pill-btn"
            type="button"
            onClick={handleScheduleClick}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#F3B544]/60 bg-[#F3B544]/10 text-[#F3B544] text-xs font-semibold"
          >
            <Calendar className="w-3 h-3" />
            <span>Book Call</span>
          </button>
          <button
            id="mobile-menu-toggle-btn"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-300 hover:text-[#F3B544] rounded-lg transition-colors focus:outline-none"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden absolute top-full left-0 w-full bg-[#0d0f14]/98 backdrop-blur-md border-b border-stone-800/80 px-6 py-5 shadow-2xl transition-all z-50"
        >
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  id={`mobile-nav-${item.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleItemClick(item)}
                  className={`text-left text-base py-2 transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#F3B544] font-medium'
                      : 'text-stone-300 hover:text-[#F3B544]'
                  }`}
                >
                  <span>{item}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#F3B544]" />}
                </button>
              );
            })}

            {/* Mobile Schedule a Call button */}
            <div className="pt-2 border-t border-stone-800">
              <button
                id="mobile-nav-schedule-call-btn"
                type="button"
                onClick={handleScheduleClick}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F3B544] text-[#120E0A] font-semibold text-sm shadow-lg shadow-[#F3B544]/20 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#120E0A]" />
                <span>Schedule a Call</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
