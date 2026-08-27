import { createContext, useContext, useState, type FC, type ReactNode } from 'react';
import {
  LayoutDashboard, Search, CalendarDays, Activity, BriefcaseBusiness, FileCheck2,
  ShieldCheck, CircleDollarSign, UserRound, ClipboardCheck, Building2, Users,
  LogOut, Menu, X, RotateCcw, ChevronRight, Sparkles, Settings
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { resetDemoStorage } from '../../features/demo/demoStorage';
import { Logo } from '../ui/Logo';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { SettingsView } from '../dashboard/SettingsView';

type NavigationContextValue = {
  active: string;
  setActive: (section: string) => void;
};

const NavigationContext = createContext<NavigationContextValue | null>(null);

export const useDashboardNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useDashboardNavigation must be used inside DashboardShell.');
  return context;
};

interface DashboardShellProps {
  children: ReactNode;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  title: string;
  subtitle: string;
}

const roleNavLinks: Record<string, [string, LucideIcon][]> = {
  CUSTOMER: [
    ['Overview', LayoutDashboard],
    ['Browse Services', Search],
    ['My Bookings', CalendarDays],
    ['Activity', Activity],
    ['Settings', Settings],
  ],
  APPLICANT: [
    ['Overview', LayoutDashboard],
    ['My Applications', FileCheck2],
    ['Opportunities', BriefcaseBusiness],
    ['Profile & Compliance', ShieldCheck],
    ['Settings', Settings],
  ],
  WORKER: [
    ['Overview', LayoutDashboard],
    ['My Jobs', BriefcaseBusiness],
    ['Earnings', CircleDollarSign],
    ['Availability', CalendarDays],
    ['Profile', UserRound],
    ['Settings', Settings],
  ],
  COOPERATIVE_OFFICER: [
    ['Overview', LayoutDashboard],
    ['Applications', ClipboardCheck],
    ['Worker Verification', ShieldCheck],
    ['Cooperative Activity', Activity],
    ['Settings', Settings],
  ],
  FEDERATION_ADMIN: [
    ['Overview', LayoutDashboard],
    ['Cooperatives', Building2],
    ['Workers', Users],
    ['Applications', ClipboardCheck],
    ['Activity', Activity],
    ['Settings', Settings],
  ],
};

const roleLabels: Record<string, string> = {
  CUSTOMER: 'Customer Workspace',
  APPLICANT: 'Applicant Portal',
  WORKER: 'Worker Member Hub',
  COOPERATIVE_OFFICER: 'Cooperative Officer',
  FEDERATION_ADMIN: 'Federation Intelligence',
};

export const DashboardShell: FC<DashboardShellProps> = ({
  children,
  activeSection = 'Overview',
  onSectionChange,
  title,
  subtitle,
}) => {
  const { profile, signOut, signInDemo } = useAuth();
  const [internalSection, setInternalSection] = useState(activeSection);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentSection = onSectionChange ? activeSection : internalSection;

  const handleSelectSection = (section: string) => {
    setInternalSection(section);
    onSectionChange?.(section);
  };

  const role = profile?.role ?? 'CUSTOMER';
  const links = roleNavLinks[role] ?? roleNavLinks.CUSTOMER;

  const handleResetDemo = () => {
    if (window.confirm('Reset all local demo data for CO-OP? This will reset local storage to default state.')) {
      resetDemoStorage();
      window.location.reload();
    }
  };

  const demoAccounts = [
    { label: 'Customer', email: 'customer@demo.com' },
    { label: 'Applicant', email: 'applicant@demo.com' },
    { label: 'Worker', email: 'worker@demo.com' },
    { label: 'Coop Officer', email: 'officer@demo.com' },
    { label: 'Fed Admin', email: 'admin@demo.com' },
  ];

  return (
    <NavigationContext.Provider value={{ active: currentSection, setActive: handleSelectSection }}>
      <div className="min-h-screen bg-[#0A0A0B] text-[#F5F5F4] flex flex-col md:flex-row font-sans selection:bg-[#E8934A] selection:text-[#0A0A0B]">
        
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex flex-col w-72 bg-[#141416] border-r border-[#2A2A2E] shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
          <div className="p-6 border-b border-[#2A2A2E]">
            <Logo size="md" showSubtitle />
          </div>

          {/* Active Role Badge Card */}
          <div className="p-4 mx-4 mt-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2A2A2E] border border-[#2A2A2E] text-[#F5F5F4] flex items-center justify-center font-bold text-xs shrink-0">
                {profile?.name?.charAt(0) ?? 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-[#F5F5F4] truncate">{profile?.name}</p>
                <p className="text-[11px] text-[#9B9B9F] font-medium truncate mt-0.5">
                  {roleLabels[role] ?? role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1.5">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#9B9B9F] mb-2">
              Navigation Menu
            </p>
            {links.map(([label, Icon]) => {
              const isActive = currentSection === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleSelectSection(label)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E8934A] text-[#0A0A0B] font-bold shadow-md shadow-[#E8934A]/20 border border-[#E8934A]/40'
                      : 'text-[#9B9B9F] hover:text-[#F5F5F4] hover:bg-[#1C1C1F]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#0A0A0B]' : 'text-[#9B9B9F]'}`} />
                  <span>{label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto text-[#0A0A0B]" />}
                </button>
              );
            })}
          </nav>

          {/* Quick Demo Switcher for Judges */}
          <div className="p-4 border-t border-[#2A2A2E] bg-[#0A0A0B]/60">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#9B9B9F] mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#E8934A]" /> Demo Role Switcher
            </p>
            <div className="grid grid-cols-2 gap-1.5">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => signInDemo(acc.email, 'password123')}
                  className="px-2 py-1 text-[11px] font-medium bg-[#1C1C1F] hover:bg-[#2A2A2E] text-[#9B9B9F] hover:text-[#F5F5F4] border border-[#2A2A2E] rounded-lg transition-colors text-center truncate"
                >
                  {acc.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleResetDemo}
              className="mt-3 w-full flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs text-[#E8934A] hover:text-[#F5A662] bg-[#E8934A]/10 hover:bg-[#E8934A]/20 border border-[#E8934A]/30 rounded-xl transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Storage
            </button>
          </div>
        </aside>

        {/* Mobile Header & Drawer Overlay */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 bg-[#141416] border-b border-[#2A2A2E] sticky top-0 z-30">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#9B9B9F] hover:text-[#F5F5F4] rounded-lg"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#0A0A0B]/95 backdrop-blur-md p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Logo size="md" showSubtitle />
              <button type="button" onClick={() => setMobileOpen(false)} className="p-2 text-[#9B9B9F]">
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2 mb-6">
              {links.map(([label, Icon]) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    handleSelectSection(label);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-[#1C1C1F] text-[#F5F5F4] border border-[#2A2A2E]"
                >
                  <Icon className="w-5 h-5 text-[#E8934A]" />
                  {label}
                </button>
              ))}
            </nav>
            <Button variant="destructive" size="md" className="w-full" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Top Bar Header */}
          <header className="hidden md:flex h-20 items-center justify-between px-8 border-b border-[#2A2A2E] bg-[#141416]/80 backdrop-blur-md">
            <div>
              <p className="text-xs text-[#9B9B9F] font-semibold tracking-wide uppercase">{roleLabels[role]}</p>
              <h2 className="text-lg font-heading font-bold text-[#F5F5F4]">{title}</h2>
            </div>

            <div className="flex items-center gap-4">
              <Badge status="Available" />
              
              <div className="h-6 w-px bg-[#2A2A2E]" />

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C1C1F] border border-[#2A2A2E] text-[#F5F5F4] font-bold text-xs flex items-center justify-center">
                  {profile?.name?.charAt(0) ?? 'U'}
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-semibold text-[#F5F5F4]">{profile?.name}</p>
                  <p className="text-[11px] text-[#9B9B9F]">{profile?.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={signOut}
                className="p-2 text-[#9B9B9F] hover:text-[#F87171] hover:bg-[#1C1C1F] rounded-xl transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </header>

          {/* Page Content Body */}
          <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#F5F5F4] tracking-tight">
                {currentSection === 'Settings' ? 'Account & Portal Settings' : title}
              </h1>
              <p className="text-sm text-[#9B9B9F] mt-1">
                {currentSection === 'Settings'
                  ? 'Manage your profile info, security credentials, and notification preferences.'
                  : subtitle}
              </p>
            </div>

            {currentSection === 'Settings' ? <SettingsView /> : children}
          </main>
        </div>
      </div>
    </NavigationContext.Provider>
  );
};
