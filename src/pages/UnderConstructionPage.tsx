import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Wrench, Sparkles, ShieldCheck } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Button } from '../components/ui/Button';

export const UnderConstructionPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const featureName = searchParams.get('feature');

  const handleReturnHome = () => {
    if (window.opener && window.history.length === 1) {
      window.close();
    } else {
      navigate('/');
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F4] flex flex-col justify-between p-6 font-sans selection:bg-[#E8934A] selection:text-[#0A0A0B] relative overflow-hidden">
      {/* Subtle Background Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#2A2A2E_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto flex items-center justify-between py-4">
        <Logo size="md" showSubtitle />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-xs text-[#9B9B9F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E8934A]" />
          <span>CO-OP Platform Roadmap</span>
        </div>
      </header>

      {/* Central Under Construction Experience */}
      <main className="relative z-10 max-w-xl w-full mx-auto my-auto text-center px-4 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8934A]/10 border border-[#E8934A]/30 text-[#E8934A] text-xs font-semibold uppercase tracking-wider mb-6">
          <Wrench className="w-3.5 h-3.5" />
          <span>Work in Progress</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#F5F5F4] tracking-tight mb-4 leading-tight">
          {featureName ? `${featureName} is under construction` : 'This part of CO-OP is under construction'}
        </h1>

        <p className="text-base text-[#9B9B9F] max-w-md mx-auto mb-8 font-normal leading-relaxed">
          We're building this workflow for the next stage of the cooperative network platform.
        </p>

        {/* Feature Context Card if specified */}
        {featureName && (
          <div className="mb-8 p-4 bg-[#141416] border border-[#2A2A2E] rounded-2xl text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#9B9B9F] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#E8934A]" />
              <span>Target Workflow</span>
            </div>
            <p className="text-sm font-semibold text-[#F5F5F4]">{featureName}</p>
            <p className="text-xs text-[#9B9B9F] mt-0.5">
              Scheduled for deployment in the upcoming regional cooperative release cycle.
            </p>
          </div>
        )}

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="lg"
            icon={Home}
            onClick={handleReturnHome}
            className="w-full sm:w-auto"
          >
            Return to CO-OP
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={ArrowLeft}
            onClick={handleGoBack}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </main>

      {/* Footer Utility Bar */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto text-center text-xs text-[#9B9B9F] py-4 border-t border-[#2A2A2E]">
        <p>CO-OP Digital Ecosystem • Tamil Nadu Regional Cooperative Network</p>
      </footer>
    </div>
  );
};
