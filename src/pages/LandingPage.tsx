import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Building2, ShieldCheck, ArrowRight, Sparkles, CheckCircle2,
  BriefcaseBusiness, ChevronRight, UserCheck, X, Info, Phone
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAuth } from '../store/AuthContext';
import { FloatingNavbar } from '../components/layout/FloatingNavbar';

export const LandingPage: React.FC = () => {
  const { session, profile, signInDemo } = useAuth();
  const navigate = useNavigate();
  const [showPlatformModal, setShowPlatformModal] = useState(false);
  const [showVisionModal, setShowVisionModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'APPLICANT' | 'WORKER' | 'COOPERATIVE_OFFICER' | 'FEDERATION_ADMIN'>('CUSTOMER');

  // Auto redirect if already logged in
  if (session && profile) {
    switch (profile.role) {
      case 'CUSTOMER': navigate('/dashboard', { replace: true }); break;
      case 'APPLICANT': navigate('/applicant-dashboard', { replace: true }); break;
      case 'WORKER': navigate('/worker-dashboard', { replace: true }); break;
      case 'COOPERATIVE_OFFICER': navigate('/coop-admin', { replace: true }); break;
      case 'FEDERATION_ADMIN': navigate('/fed-admin', { replace: true }); break;
      default: navigate('/dashboard', { replace: true }); break;
    }
  }

  const handleDemoLaunch = (email: string) => {
    if (signInDemo(email, 'password123')) {
      navigate('/');
    }
  };

  const roleDetails = {
    CUSTOMER: {
      title: 'Customer Experience',
      subtitle: 'Discover trusted local services backed by verified cooperative workers.',
      icon: Users,
      badge: 'Customer Portal',
      features: [
        'Browse verified nearby workers by skill & category',
        'Transparent service pricing with co-op member benefits',
        'Real-time booking tracking & history',
        'Direct ratings & service feedback'
      ],
      demoAccount: 'customer@demo.com',
    },
    APPLICANT: {
      title: 'Worker Applicant Journey',
      subtitle: 'Seamless onboarding pipeline into registered labour cooperatives.',
      icon: UserCheck,
      badge: 'Applicant Portal',
      features: [
        'Submit digital worker application with skill credentials',
        'Track verification & compliance checklist in real time',
        'Browse matched cooperative job opportunities',
        'Transparent approval updates from cooperative officers'
      ],
      demoAccount: 'applicant@demo.com',
    },
    WORKER: {
      title: 'Member Worker Hub',
      subtitle: 'Manage availability, accept daily jobs, and track fair earnings.',
      icon: BriefcaseBusiness,
      badge: 'Worker Hub',
      features: [
        'Toggle real-time job availability status',
        'Accept and update customer service job progression',
        'Track daily earnings & cooperative welfare contributions',
        'Build long-term work history and verified ratings'
      ],
      demoAccount: 'worker@demo.com',
    },
    COOPERATIVE_OFFICER: {
      title: 'Cooperative Management',
      subtitle: 'Centralized workforce intelligence and candidate verification queue.',
      icon: ShieldCheck,
      badge: 'Coop Officer Admin',
      features: [
        'Review pending applicant profiles & document verification',
        'Approve or reject candidate applications with 1-click',
        'Monitor cooperative worker availability & job allocation',
        'Track daily cooperative service revenue & welfare stats'
      ],
      demoAccount: 'officer@demo.com',
    },
    FEDERATION_ADMIN: {
      title: 'Federation Intelligence',
      subtitle: 'Multi-cooperative network monitoring and regional governance.',
      icon: Building2,
      badge: 'Federation Command',
      features: [
        'Overview statistics across all regional cooperatives',
        'Cooperative network performance data table',
        'Register new cooperatives & monitor network growth',
        'Network revenue analytics & system audit logs'
      ],
      demoAccount: 'admin@demo.com',
    },
  };

  const currentRole = roleDetails[selectedRole];

  return (
    <div className="relative w-full h-screen h-[100dvh] overflow-hidden bg-black text-[#F5F5F4] flex flex-col justify-between select-none">
      
      {/* 1. LOOPING CINEMATIC VIDEO BACKGROUND */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        src="/assets/final.mp4"
      />
      
      {/* Dark Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/75 to-black/90 pointer-events-none z-0" />

      {/* 2. FLOATING CINEMATIC NAVBAR */}
      <FloatingNavbar
        onExploreClick={() => setShowPlatformModal(true)}
        onVisionClick={() => setShowVisionModal(true)}
        onContactClick={() => setShowContactModal(true)}
      />

      {/* 3. CENTER HERO CONTENT */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center my-auto">
        
        {/* TRUST / NETWORK ROW */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-[#F5F5F4] mb-6 sm:mb-8">
          <Sparkles className="w-3.5 h-3.5 text-[#E8934A]" />
          <span className="uppercase tracking-wider text-[10px] sm:text-[11px] text-[#9B9B9F]">
            Built around cooperative work
          </span>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-medium text-white">
            <span className="px-2 py-0.5 rounded-full bg-white/10">Customer</span>
            <span className="text-[#9B9B9F]">↔</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10">Cooperative</span>
            <span className="text-[#9B9B9F]">↔</span>
            <span className="px-2 py-0.5 rounded-full bg-white/10">Worker</span>
          </div>
        </div>

        {/* DISTINCTIVE HEADLINE (Solid White Display Stack) */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white leading-[1.05] max-w-4xl mx-auto mb-4 sm:mb-6 select-none">
          Work,
          <br />
          Organized Together.
        </h1>

        {/* SUBHEAD (Concise max 2-line explanation) */}
        <p className="text-sm sm:text-lg md:text-xl text-[#9B9B9F] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
          A digital platform connecting customers, cooperative workforces, and local opportunity in one shared ecosystem.
        </p>

        {/* PRIMARY CTA */}
        <div>
          <button
            type="button"
            onClick={() => setShowPlatformModal(true)}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#E8934A] hover:bg-[#F5A662] text-[#0A0A0B] font-extrabold text-base sm:text-lg shadow-xl shadow-[#E8934A]/25 border border-[#E8934A]/40 active:scale-95 transition-all cursor-pointer select-none"
          >
            <span>Explore CO-OP</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </main>

      {/* 4. BOTTOM METRICS BAR */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 sm:pb-8 pt-4 border-t border-white/10 shrink-0">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-2 sm:p-3">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">5</p>
            <p className="text-[11px] sm:text-xs text-[#9B9B9F] font-medium tracking-wider uppercase mt-0.5">Platform Roles</p>
          </div>
          <div className="p-2 sm:p-3">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">3</p>
            <p className="text-[11px] sm:text-xs text-[#9B9B9F] font-medium tracking-wider uppercase mt-0.5">Stakeholder Layers</p>
          </div>
          <div className="p-2 sm:p-3">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">1</p>
            <p className="text-[11px] sm:text-xs text-[#9B9B9F] font-medium tracking-wider uppercase mt-0.5">Connected Ecosystem</p>
          </div>
          <div className="p-2 sm:p-3">
            <p className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">100%</p>
            <p className="text-[11px] sm:text-xs text-[#9B9B9F] font-medium tracking-wider uppercase mt-0.5">Cooperative-Led</p>
          </div>
        </div>
      </footer>

      {/* 5. INTERACTIVE PLATFORM ROLE WORKSPACE MODAL */}
      {showPlatformModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#141416] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowPlatformModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#9B9B9F] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#E8934A]">
                CO-OP Role Sandbox
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                Explore All 5 Stakeholder Role Workflows
              </h2>
              <p className="text-sm text-[#9B9B9F] mt-1">
                Select any platform role below to launch and test its interactive workspace.
              </p>
            </div>

            {/* Role Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 border-b border-[#2A2A2E] pb-4">
              {(Object.keys(roleDetails) as Array<keyof typeof roleDetails>).map((roleKey) => (
                <button
                  key={roleKey}
                  type="button"
                  onClick={() => setSelectedRole(roleKey)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    selectedRole === roleKey
                      ? 'bg-[#E8934A] text-[#0A0A0B] font-bold shadow-md'
                      : 'bg-[#1C1C1F] text-[#9B9B9F] hover:text-white border border-[#2A2A2E]'
                  }`}
                >
                  {roleKey.replace('_', ' ')}
                </button>
              ))}
            </div>

            {/* Selected Role Card */}
            <div className="bg-[#1C1C1F] border border-[#2A2A2E] rounded-2xl p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[#2A2A2E]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#2A2A2E] text-[#E8934A] flex items-center justify-center shrink-0">
                    <currentRole.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge status="Available" />
                      <span className="text-xs text-[#9B9B9F] uppercase tracking-wider">{currentRole.badge}</span>
                    </div>
                    <h3 className="text-xl font-heading font-bold text-white">{currentRole.title}</h3>
                    <p className="text-xs text-[#9B9B9F] mt-0.5">{currentRole.subtitle}</p>
                  </div>
                </div>

                <Button
                  variant="primary"
                  size="md"
                  icon={ChevronRight}
                  iconPosition="right"
                  onClick={() => handleDemoLaunch(currentRole.demoAccount)}
                >
                  Enter {selectedRole.replace('_', ' ')} Workspace
                </Button>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#9B9B9F] mb-3">
                  Key Workflows Available in Prototype
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {currentRole.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 bg-[#141416] border border-[#2A2A2E] rounded-xl text-xs text-[#F5F5F4]">
                      <CheckCircle2 className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#9B9B9F] pt-2 border-t border-[#2A2A2E]">
              <span>SIH Prototype • CO-OP Digital Platform</span>
              <button
                type="button"
                onClick={() => handleDemoLaunch('customer@demo.com')}
                className="text-[#E8934A] hover:underline font-semibold"
              >
                Launch Default Customer Workspace →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. VISION MODAL */}
      {showVisionModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center">
          <div className="relative w-full max-w-2xl bg-[#141416] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowVisionModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#9B9B9F] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2 text-[#E8934A] text-xs font-semibold uppercase tracking-wider">
              <Info className="w-4 h-4" />
              <span>Ecosystem Vision</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-white mb-4">Future Ecosystem Architecture</h2>
            <p className="text-sm text-[#9B9B9F] leading-relaxed mb-6">
              CO-OP is designed to scale from local primary labour cooperatives to state and national federations. Future architecture concepts include geospatial proximity routing, automated welfare fund distributions, and predictive demand analytics.
            </p>
            <Button variant="primary" size="md" onClick={() => setShowVisionModal(false)}>
              Got it
            </Button>
          </div>
        </div>
      )}

      {/* 7. CONTACT MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center">
          <div className="relative w-full max-w-lg bg-[#141416] border border-[#2A2A2E] rounded-3xl p-6 sm:p-8 shadow-2xl text-left">
            <button
              type="button"
              onClick={() => setShowContactModal(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#9B9B9F] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 mb-2 text-[#E8934A] text-xs font-semibold uppercase tracking-wider">
              <Phone className="w-4 h-4" />
              <span>Platform Contact</span>
            </div>
            <h2 className="text-2xl font-heading font-bold text-white mb-2">CO-OP Federation Hub</h2>
            <p className="text-sm text-[#9B9B9F] mb-6">
              For inquiry, cooperative registration, or SIH evaluation details:
            </p>
            <div className="p-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-2xl space-y-2 text-xs text-[#F5F5F4] mb-6">
              <p><strong>Email:</strong> support@coop-platform.org</p>
              <p><strong>Platform:</strong> Smart India Hackathon Prototype</p>
              <p><strong>Status:</strong> Active Interactive Prototype</p>
            </div>
            <Button variant="primary" size="md" onClick={() => setShowContactModal(false)}>
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
