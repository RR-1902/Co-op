import React, { useState } from 'react';
import {
  Building2, MapPin, TrendingUp, Plus, Eye
} from 'lucide-react';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { ProgressMetricCard } from '../../components/ui/ProgressMetricCard';
import { Badge, type StatusType } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { useAuth } from '../../store/AuthContext';
import {
  SYNTHETIC_COOPERATIVES,
  SYNTHETIC_WORKERS,
  SYNTHETIC_APPLICANTS,
  SYNTHETIC_ACTIVITY_FEED
} from '../../features/demo/demoData';

type CooperativeItem = {
  name: string;
  location: string;
  workers: number;
  jobs: number;
  status: StatusType;
};

export const FedAdminDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState('Overview');
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedCoop, setSelectedCoop] = useState<CooperativeItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [coopName, setCoopName] = useState('');
  const [coopLocation, setCoopLocation] = useState('');

  const [cooperatives, setCooperatives] = useState<CooperativeItem[]>(
    SYNTHETIC_COOPERATIVES.map((c) => ({
      name: c.name,
      location: `${c.city}, Tamil Nadu`,
      workers: c.workersCount,
      jobs: c.completedJobsCount,
      status: c.status,
    }))
  );

  const handleAddCooperative = () => {
    if (!coopName || !coopLocation) return;
    const newCoop: CooperativeItem = {
      name: coopName,
      location: coopLocation,
      workers: 1,
      jobs: 0,
      status: 'Available',
    };
    setCooperatives((current) => [...current, newCoop]);
    setNotice(`Cooperative "${coopName}" registered successfully in federation database.`);
    setShowAddModal(false);
    setCoopName('');
    setCoopLocation('');
  };

  const sectionHeader: Record<string, { title: string; subtitle: string }> = {
    'Overview': {
      title: `Federation Intelligence • ${profile?.name ?? 'Admin'}`,
      subtitle: 'Federation-wide network monitoring across all affiliated labour cooperatives.',
    },
    'Cooperatives': {
      title: 'Affiliated Labour Cooperatives',
      subtitle: 'Manage registered member cooperatives, geographic coverage, and operational status.',
    },
    'Workers': {
      title: 'Federation Worker Pool Directory',
      subtitle: 'Comprehensive directory of active worker members across all regional cooperatives.',
    },
    'Applications': {
      title: 'Federation Onboarding Applications',
      subtitle: 'Track worker application volume and pending officer reviews across all entities.',
    },
    'Activity': {
      title: 'Federation Audit Feed & Events',
      subtitle: 'System-wide audit trail of entity registrations, payouts, and dispatch milestones.',
    },
  };

  const currentHeader = sectionHeader[activeSection] ?? sectionHeader['Overview'];

  return (
    <DashboardShell
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      title={currentHeader.title}
      subtitle={currentHeader.subtitle}
    >
      {notice && <Toast message={notice} onClose={() => setNotice(null)} />}

      {/* SECTION: OVERVIEW */}
      {activeSection === 'Overview' && (
        <div className="space-y-8">          {/* HERO LARGE METRIC CARD (Federation Network Scalability Story) */}
          <ProgressMetricCard
            size="lg"
            title="Federation Network Volume & Revenue"
            value="₹15,85,000"
            trend={{ value: '+18.4% YOY', isPositive: true }}
            subDetail="Combined gross monthly service volume across 5 Tamil Nadu regional cooperatives"
            statsSummary={{ peak: '₹17.2L', low: '₹9.4L', avg: '₹13.6L' }}
            chartData={[940000, 1080000, 1220000, 1380000, 1490000, 1585000]}
            chartColor="amber"
          />

          {/* 3-COLUMN METRIC ROW */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProgressMetricCard
              size="md"
              title="Total Network Workers"
              value="171"
              trend={{ value: '+14.2%', isPositive: true }}
              subDetail="Active verified members in network"
              statsSummary={{ peak: 180, low: 120, avg: 154 }}
              chartData={[120, 134, 145, 158, 164, 171]}
              chartColor="emerald"
            />
            <ProgressMetricCard
              size="md"
              title="Completed Services"
              value="1,115"
              trend={{ value: '+15.8%', isPositive: true }}
              subDetail="Verified service visits to date"
              statsSummary={{ peak: 1200, low: 800, avg: 980 }}
              chartData={[800, 890, 960, 1020, 1080, 1115]}
              chartColor="amber"
            />
            <ProgressMetricCard
              size="md"
              title="Pending Applications Queue"
              value="10"
              trend={{ value: 'In Review', isPositive: true }}
              subDetail="Officer onboarding queue reviews"
              statsSummary={{ peak: 18, low: 4, avg: 11 }}
              chartData={[8, 12, 9, 14, 11, 10]}
              chartColor="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-heading font-bold text-white">Registered Cooperatives</h3>
                  <p className="text-xs text-slate-400">Manage member cooperatives and regional health</p>
                </div>
                <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddModal(true)}>
                  Register Cooperative
                </Button>
              </div>

              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                      <tr>
                        <th className="p-4">Cooperative Name</th>
                        <th className="p-4">Active Workers</th>
                        <th className="p-4">Total Jobs</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Inspect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      {cooperatives.map((coop) => (
                        <tr key={coop.name} className="hover:bg-slate-800/40 transition-colors">
                          <td className="p-4 font-semibold text-white">
                            <div>
                              <span>{coop.name}</span>
                              <p className="text-[11px] text-slate-400 font-normal flex items-center gap-1 mt-0.5">
                                <MapPin className="w-3 h-3 text-slate-400" />
                                {coop.location}
                              </p>
                            </div>
                          </td>
                          <td className="p-4 font-bold text-slate-200">{coop.workers}</td>
                          <td className="p-4 font-bold text-slate-200">{coop.jobs}</td>
                          <td className="p-4">
                            <Badge status={coop.status} size="sm" />
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="sm" icon={Eye} onClick={() => setSelectedCoop(coop)}>
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-bold text-white">Network Revenue</h3>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" /> +14.8%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-heading font-extrabold text-white">₹8.42L</p>
                  <p className="text-xs text-slate-400 mt-0.5">Federation service volume this month</p>
                  <div className="flex h-20 items-end gap-2 pt-4">
                    {[32, 44, 39, 56, 48, 66, 61, 78, 72, 94].map((h, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 rounded-t-lg transition-all duration-300 ${
                          idx === 9 ? 'bg-[#D98E3B]' : 'bg-slate-800'
                        }`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: COOPERATIVES */}
      {activeSection === 'Cooperatives' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-white">Affiliated Cooperative Directory</h3>
            <Button variant="primary" size="sm" icon={Plus} onClick={() => setShowAddModal(true)}>
              Register Cooperative
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cooperatives.map((coop) => (
              <Card key={coop.name} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between">
                    <h4 className="text-base font-heading font-bold text-white">{coop.name}</h4>
                    <Badge status={coop.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{coop.location}</p>
                  <div className="mt-4 pt-3 border-t border-slate-800 text-xs space-y-1">
                    <p className="flex justify-between"><span className="text-slate-400">Workers:</span> <strong className="text-white">{coop.workers}</strong></p>
                    <p className="flex justify-between"><span className="text-slate-400">Total Jobs:</span> <strong className="text-white">{coop.jobs}</strong></p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-4" onClick={() => setSelectedCoop(coop)}>
                  Inspect Cooperative
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: WORKERS */}
      {activeSection === 'Workers' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Federation Network Worker Pool</h3>
              <p className="text-xs text-slate-400">Directory of verified worker members registered across affiliated entities</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {SYNTHETIC_WORKERS.map((w) => (
                <div key={w.id} className="p-3.5 bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{w.name} • <span className="text-[#E8934A]">{w.rating} ★</span></p>
                    <p className="text-slate-400 mt-0.5">{w.service} • {w.cooperative} ({w.area})</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setNotice(`Worker profile file opened for ${w.name}.`)}>
                    Profile
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* SECTION: APPLICATIONS */}
      {activeSection === 'Applications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Federation Onboarding Applications Queue</h3>
              <p className="text-xs text-slate-400">Pending applications across regional cooperatives</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {SYNTHETIC_APPLICANTS.map((app) => (
                <div key={app.id} className="p-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-white">{app.name} (#APP-{app.id})</p>
                    <p className="text-slate-400 mt-0.5">{app.skill} • {app.cooperative}</p>
                  </div>
                  <Badge status={app.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* SECTION: ACTIVITY */}
      {activeSection === 'Activity' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Federation Audit Trail & Feed</h3>
              <p className="text-xs text-slate-400">System events recorded across all affiliated entities</p>
            </CardHeader>
            <CardContent className="space-y-4 text-xs text-slate-300">
              {SYNTHETIC_ACTIVITY_FEED.map((item) => (
                <div key={item.id} className="p-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl flex items-start gap-3">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">{item.title}</p>
                    <p className="text-slate-400 mt-0.5">{item.detail}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detail Modal */}
      {selectedCoop && (
        <Modal
          title={selectedCoop.name}
          subtitle={`Location: ${selectedCoop.location}`}
          onClose={() => setSelectedCoop(null)}
        >
          <div className="space-y-4 text-xs text-slate-300">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <p className="text-slate-400">Active Workers</p>
                <p className="text-xl font-bold text-white mt-1">{selectedCoop.workers}</p>
              </div>
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
                <p className="text-slate-400">Total Jobs Dispatched</p>
                <p className="text-xl font-bold text-white mt-1">{selectedCoop.jobs}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Cooperative Modal */}
      {showAddModal && (
        <Modal
          title="Register New Cooperative"
          subtitle="Add a new member cooperative to the federation directory"
          onClose={() => setShowAddModal(false)}
          confirmLabel="Register Cooperative"
          confirmVariant="primary"
          onConfirm={handleAddCooperative}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Cooperative Entity Name
              </label>
              <input
                type="text"
                value={coopName}
                onChange={(e) => setCoopName(e.target.value)}
                placeholder="e.g. Coimbatore Artisans Labour Cooperative"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                City and State
              </label>
              <input
                type="text"
                value={coopLocation}
                onChange={(e) => setCoopLocation(e.target.value)}
                placeholder="e.g. Coimbatore, Tamil Nadu"
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
              />
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
};
