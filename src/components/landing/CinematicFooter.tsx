import React, { useRef, useState } from 'react';
import { ArrowUpRight, ArrowUp, Sparkles } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

interface CinematicFooterProps {
  onSelectRole?: (roleEmail: string) => void;
}

export const CinematicFooter: React.FC<CinematicFooterProps> = () => {
  const { signInDemo } = useAuth();
  const ctaRef = useRef<HTMLDivElement>(null);
  const backTopRef = useRef<HTMLButtonElement>(null);

  // Magnetic button position states
  const [ctaPos, setCtaPos] = useState({ x: 0, y: 0 });
  const [backTopPos, setBackTopPos] = useState({ x: 0, y: 0 });

  // Handle magnetic hover for Desktop CTA
  const handleCtaMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ctaRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = ctaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.22;
    const dy = (e.clientY - centerY) * 0.22;
    setCtaPos({ x: dx, y: dy });
  };

  const handleCtaMouseLeave = () => {
    setCtaPos({ x: 0, y: 0 });
  };

  // Handle magnetic hover for Back to Top
  const handleBackTopMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!backTopRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = backTopRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) * 0.25;
    const dy = (e.clientY - centerY) * 0.25;
    setBackTopPos({ x: dx, y: dy });
  };

  const handleBackTopMouseLeave = () => {
    setBackTopPos({ x: 0, y: 0 });
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreClick = () => {
    const el = document.getElementById('sandbox');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'COOPERATIVE WORK',
    'SHARED OPPORTUNITY',
    'LOCAL WORKFORCE',
    'FAIRER ALLOCATION',
    'CONNECTED COMMUNITIES',
    'COOPERATIVE ECONOMY',
  ];

  return (
    <footer className="relative z-20 overflow-hidden bg-[#0A0A0B] text-[#F5F5F4] pt-20 pb-12 border-t border-[#2A2A2E]">
      {/* Background Subtle Grid & Atmospheric Radial Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#2A2A2E_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8934A]/5 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Giant CO-OP Watermark Typography */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-[0.035]">
        <span className="font-heading font-extrabold text-[24vw] sm:text-[22vw] leading-none tracking-tighter text-[#F5F5F4] uppercase">
          CO-OP
        </span>
      </div>

      {/* 1. Subtle Diagonal Marquee */}
      <div className="relative z-10 w-full overflow-hidden border-y border-[#2A2A2E]/60 bg-[#141416]/50 py-3 backdrop-blur-sm mb-16 -rotate-1 scale-105">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#9B9B9F]">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8934A]/60" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#9B9B9F] text-xs font-semibold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#E8934A]" />
          <span>CO-OP Platform Vision</span>
        </div>

        {/* Main Closing Headline */}
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-extrabold tracking-tight text-[#F5F5F4] max-w-4xl leading-[1.1] mb-6">
          Work, organized together.
        </h2>

        <p className="text-base sm:text-lg text-[#9B9B9F] max-w-xl mx-auto mb-10 leading-relaxed">
          Connecting Customers, Labour Cooperatives, Workers, and Federations into a trusted, modern digital ecosystem.
        </p>

        {/* Primary CTA (Magnetic Button) */}
        <div
          ref={ctaRef}
          onMouseMove={handleCtaMouseMove}
          onMouseLeave={handleCtaMouseLeave}
          className="mb-14 touch-manipulation"
        >
          <button
            type="button"
            onClick={handleExploreClick}
            style={{
              transform: `translate3d(${ctaPos.x}px, ${ctaPos.y}px, 0px)`,
              transition: ctaPos.x === 0 ? 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'transform 0.1s ease-out',
            }}
            className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full bg-[#E8934A] hover:bg-[#F5A662] text-[#0A0A0B] font-extrabold text-base sm:text-lg shadow-xl shadow-[#E8934A]/25 border border-[#E8934A]/40 active:scale-95 transition-colors cursor-pointer select-none"
          >
            <span>Explore CO-OP</span>
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Secondary Navigation Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-2xl">
          <a
            href="#ecosystem"
            className="px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#1C1C1F]/80 hover:bg-[#2A2A2E] text-xs font-semibold text-[#9B9B9F] hover:text-[#F5F5F4] transition-colors"
          >
            Ecosystem
          </a>
          <a
            href="#sandbox"
            className="px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#1C1C1F]/80 hover:bg-[#2A2A2E] text-xs font-semibold text-[#9B9B9F] hover:text-[#F5F5F4] transition-colors"
          >
            Role Sandbox
          </a>
          <a
            href="#vision"
            className="px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#1C1C1F]/80 hover:bg-[#2A2A2E] text-xs font-semibold text-[#9B9B9F] hover:text-[#F5F5F4] transition-colors"
          >
            Vision
          </a>
          <button
            type="button"
            onClick={() => signInDemo('worker@demo.com', 'password123')}
            className="px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#1C1C1F]/80 hover:bg-[#2A2A2E] text-xs font-semibold text-[#9B9B9F] hover:text-[#E8934A] transition-colors"
          >
            For Workers
          </button>
          <button
            type="button"
            onClick={() => signInDemo('officer@demo.com', 'password123')}
            className="px-4 py-2 rounded-full border border-[#2A2A2E] bg-[#1C1C1F]/80 hover:bg-[#2A2A2E] text-xs font-semibold text-[#9B9B9F] hover:text-[#E8934A] transition-colors"
          >
            For Cooperatives
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="w-full border-t border-[#2A2A2E]/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#9B9B9F]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#F5F5F4]">© 2026 CO-OP</span>
            <span className="text-[#2A2A2E]">•</span>
            <span>Labour Cooperative Marketplace</span>
          </div>

          <p className="font-medium text-[#9B9B9F]/80 text-center">
            Built for cooperative work
          </p>

          <button
            ref={backTopRef}
            type="button"
            onClick={handleScrollTop}
            onMouseMove={handleBackTopMouseMove}
            onMouseLeave={handleBackTopMouseLeave}
            style={{
              transform: `translate3d(${backTopPos.x}px, ${backTopPos.y}px, 0px)`,
              transition: backTopPos.x === 0 ? 'transform 0.4s ease-out' : 'transform 0.1s ease-out',
            }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2A2A2E] bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#9B9B9F] hover:text-[#F5F5F4] transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
