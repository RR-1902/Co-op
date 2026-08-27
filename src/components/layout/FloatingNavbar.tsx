import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '../ui/Logo';

interface FloatingNavbarProps {
  onExploreClick?: () => void;
  onVisionClick?: () => void;
  onContactClick?: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  onExploreClick,
  onVisionClick,
  onContactClick,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'Home' | 'Platform' | 'Vision' | 'Contact'>('Home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll position for state transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: 'Home' | 'Platform' | 'Vision' | 'Contact') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    if (tab === 'Home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'Platform' && onExploreClick) {
      onExploreClick();
    } else if (tab === 'Vision' && onVisionClick) {
      onVisionClick();
    } else if (tab === 'Contact' && onContactClick) {
      onContactClick();
    }
  };

  return (
    <>
      <header
        aria-label="Main Navigation"
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out select-none ${
          isScrolled
            ? 'bg-[#0A0A0B]/85 backdrop-blur-md border-b border-[#2A2A2E] shadow-xl shadow-black/40 py-3.5'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* 1. LEFT LOGO */}
          <div className="flex items-center gap-3">
            <Link to="/" onClick={() => handleNavClick('Home')} className="group flex items-center gap-2.5">
              <div className="flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105">
                <Logo size="sm" />
              </div>
            </Link>
          </div>

          {/* 2. CENTER DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wide">
            <button
              type="button"
              onClick={() => handleNavClick('Home')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'Home' ? 'text-[#F5F5F4]' : 'text-[#9B9B9F] hover:text-[#F5F5F4]'
              }`}
            >
              <span>Home</span>
              {activeTab === 'Home' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8934A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Platform')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'Platform' ? 'text-[#F5F5F4]' : 'text-[#9B9B9F] hover:text-[#F5F5F4]'
              }`}
            >
              <span>Platform</span>
              {activeTab === 'Platform' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8934A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Vision')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'Vision' ? 'text-[#F5F5F4]' : 'text-[#9B9B9F] hover:text-[#F5F5F4]'
              }`}
            >
              <span>Vision</span>
              {activeTab === 'Vision' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8934A]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Contact')}
              className={`relative py-1 transition-colors cursor-pointer ${
                activeTab === 'Contact' ? 'text-[#F5F5F4]' : 'text-[#9B9B9F] hover:text-[#F5F5F4]'
              }`}
            >
              <span>Contact</span>
              {activeTab === 'Contact' && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8934A]" />
              )}
            </button>
          </nav>

          {/* 3. RIGHT DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <span className="text-xs font-semibold text-[#9B9B9F] hover:text-[#F5F5F4] px-3 py-2 transition-colors cursor-pointer">
                Sign In
              </span>
            </Link>

            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8934A] hover:bg-[#F5A662] text-[#0A0A0B] text-xs font-extrabold shadow-md shadow-[#E8934A]/20 transition-all active:scale-95 cursor-pointer"
            >
              <span>Explore CO-OP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. MOBILE HAMBURGER BUTTON (<= 720px) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-overlay"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isScrolled
                  ? 'bg-[#1C1C1F] border border-[#2A2A2E] text-[#F5F5F4]'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </header>

      {/* 5. MOBILE MENU OVERLAY SHEET */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-[#0A0A0B]/95 backdrop-blur-xl p-6 flex flex-col justify-between select-none"
        >
          {/* Header row in mobile overlay */}
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <button
              type="button"
              aria-label="Close Navigation Menu"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2.5 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#F5F5F4] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-3 text-center my-auto max-w-sm mx-auto w-full">
            <button
              type="button"
              onClick={() => handleNavClick('Home')}
              className={`py-3 px-6 rounded-2xl border text-sm font-semibold transition-colors ${
                activeTab === 'Home'
                  ? 'bg-[#E8934A] text-[#0A0A0B] border-[#E8934A] font-bold'
                  : 'bg-[#1C1C1F] border-[#2A2A2E] text-[#F5F5F4]'
              }`}
            >
              Home
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Platform')}
              className={`py-3 px-6 rounded-2xl border text-sm font-semibold transition-colors ${
                activeTab === 'Platform'
                  ? 'bg-[#E8934A] text-[#0A0A0B] border-[#E8934A] font-bold'
                  : 'bg-[#1C1C1F] border-[#2A2A2E] text-[#F5F5F4]'
              }`}
            >
              Platform Sandbox
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Vision')}
              className={`py-3 px-6 rounded-2xl border text-sm font-semibold transition-colors ${
                activeTab === 'Vision'
                  ? 'bg-[#E8934A] text-[#0A0A0B] border-[#E8934A] font-bold'
                  : 'bg-[#1C1C1F] border-[#2A2A2E] text-[#F5F5F4]'
              }`}
            >
              Vision
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('Contact')}
              className={`py-3 px-6 rounded-2xl border text-sm font-semibold transition-colors ${
                activeTab === 'Contact'
                  ? 'bg-[#E8934A] text-[#0A0A0B] border-[#E8934A] font-bold'
                  : 'bg-[#1C1C1F] border-[#2A2A2E] text-[#F5F5F4]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Row */}
          <div className="flex flex-col gap-3 max-w-sm mx-auto w-full">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onExploreClick) onExploreClick();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-[#E8934A] text-[#0A0A0B] font-extrabold text-sm shadow-lg shadow-[#E8934A]/20"
            >
              Explore CO-OP
            </button>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full">
              <button
                type="button"
                className="w-full py-3 px-6 rounded-2xl bg-[#1C1C1F] border border-[#2A2A2E] text-[#9B9B9F] font-semibold text-sm"
              >
                Sign In
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
