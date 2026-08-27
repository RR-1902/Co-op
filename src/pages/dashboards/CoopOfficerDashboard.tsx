import React, { useState } from 'react';
import {
  Check, Eye, Activity
} from 'lucide-react';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { ProgressMetricCard } from '../../components/ui/ProgressMetricCard';
import { Badge, type StatusType } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { EmptyState } from '../../components/ui/EmptyState';
import { useDemoState } from '../../features/demo/demoStorage';
import {
  SYNTHETIC_APPLICANTS,
  SYNTHETIC_WORKERS,
  SYNTHETIC_ACTIVITY_FEED
} from '../../features/demo/demoData';

type Applicant = {
  id: number;
  name: string;
  skill: string;
  submitted: string;
  status: StatusType;
};

export const CoopOfficerDashboardPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('Overview');
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);

  const [applicants, setApplicants] = useDemoState<Applicant[]>(
    'cooperative-demo-approvals',
    SYNTHETIC_APPLICANTS.map((a) => ({
      id: a.id,
      name: a.name,
      skill: a.skill,
      submitted: a.submitted,
      status: a.status,
    }))
  );

  const handleDecision = (id: number, decision: StatusType) => {
    const candidate = applicants.find((a) => a.id === id);
    setApplicants((current) =>
      current.map((a) => (a.id === id ? { ...a, status: decision } : a))
    );
    setSelectedApplicant(null);
    if (candidate) {
      setNotice(`Applicant ${candidate.name} has been marked as ${decision.toUpperCase()}.`);
    }
  };

  const pendingList = applicants.filter((a) => a.status === 'Pending' || a.status === 'In review');
  const approvedCount = applicants.filter((a) => a.status === 'Approved').length;

  const sectionHeader: Record<string, { title: string; subtitle: string }> = {
    'Overview': {
      title: 'Cooperative operations',
      subtitle: 'Workforce management and candidate review for Chennai City Labour Cooperative.',
    },
    'Applications': {
      title: 'Worker application queue',
      subtitle: 'Review candidate applications and approve onboarding.',
    },
    'Worker Verification': {
      title: 'Credentials & document verification',
      subtitle: 'Audit Aadhaar identity and trade certifications.',
    },
    'Cooperative Activity': {
      title: 'Operational audit log',
      subtitle: 'Real-time dispatch log, service completions, and member activity.',
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
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ProgressMetricCard
              title="Pending Approvals"
              value={pendingList.length}
              trend={{ value: '+3 today', isPositive: true }}
              subDetail="Applications awaiting review"
              statsSummary={{ peak: 8, low: 1, avg: 4 }}
              chartData={[3, 5, 2, 6, 4, 7, pendingList.length + 2]}
              chartColor="amber"
            />
            <ProgressMetricCard
              title="Active Workers"
              value={42 + approvedCount}
              trend={{ value: '+14.2%', isPositive: true }}
              subDetail="Available for dispatch"
              statsSummary={{ peak: 48, low: 32, avg: 41 }}
              chartData={[32, 34, 38, 40, 42, 44, 42 + approvedCount]}
              chartColor="emerald"
            />
            <ProgressMetricCard
              title="Jobs Completed"
              value="286"
              trend={{ value: '+18.0%', isPositive: true }}
              subDetail="+24 completed today"
              statsSummary={{ peak: 310, low: 220, avg: 265 }}
              chartData={[210, 225, 240, 255, 270, 280, 286]}
              chartColor="neutral"
            />
            <ProgressMetricCard
              title="Cooperative Revenue"
              value="₹1.84L"
              trend={{ value: '+12.4%', isPositive: true }}
              subDetail="April net revenue"
              statsSummary={{ peak: '₹2.1L', low: '₹1.4L', avg: '₹1.7L' }}
              chartData={[140, 155, 160, 172, 180, 184]}
              chartColor="amber"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-white">Worker Application Queue</h3>
                <span className="text-xs text-slate-400">Cooperative ID: #TN-CHE-04</span>
              </div>
              <div className="space-y-4">
                {pendingList.length === 0 ? (
                  <EmptyState
                    icon={Check}
                    title="All Applications Processed"
                    detail="There are no pending worker applications requiring officer review."
                  />
                ) : (
                  pendingList.map((item) => (
                    <Card key={item.id} variant="glass" className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-4">
                          <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-sm flex items-center justify-center">
                            {item.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-base font-heading font-bold text-white">{item.name}</h4>
                            <p className="text-xs text-slate-300 font-semibold mt-0.5">{item.skill}</p>
                            <p className="text-xs text-slate-400 mt-1">Submitted: {item.submitted}</p>
                          </div>
                        </div>
                        <Badge status={item.status} />
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                        <Button variant="outline" size="sm" icon={Eye} onClick={() => setSelectedApplicant(item)}>
                          Inspect Credentials
                        </Button>
                        <Button variant="primary" size="sm" icon={Check} onClick={() => handleDecision(item.id, 'Approved')}>
                          Approve
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h3 className="text-base font-heading font-bold text-white">Document Verification</h3>
                </CardHeader>
                <CardContent className="space-y-3">
                  {['Karthik R. • Electrical Specialist', 'Muthu S. • Carpentry Lead', 'Divya K. • Cleaning Supervisor'].map((worker) => (
                    <div key={worker} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                      <span className="text-slate-300 font-medium">{worker}</span>
                      <button
                        type="button"
                        onClick={() => setNotice(`Opened verification file for ${worker.split(' • ')[0]}.`)}
                        className="text-slate-300 font-semibold hover:underline"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: APPLICATIONS */}
      {activeSection === 'Applications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-white">Pending Applications</h3>
            <span className="text-xs text-slate-400">{pendingList.length} Pending Review</span>
          </div>

          <div className="space-y-4">
            {applicants.map((item) => (
              <Card key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 font-bold text-base flex items-center justify-center">
                    {item.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-white">{item.name}</h4>
                    <p className="text-xs text-slate-300 font-semibold mt-0.5">{item.skill}</p>
                    <p className="text-xs text-slate-400 mt-1">Submitted: {item.submitted}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <Badge status={item.status} />
                  <Button variant="outline" size="sm" icon={Eye} onClick={() => setSelectedApplicant(item)}>
                    Inspect Credentials
                  </Button>
                  {item.status !== 'Approved' && (
                    <Button variant="primary" size="sm" icon={Check} onClick={() => handleDecision(item.id, 'Approved')}>
                      Approve
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: WORKER VERIFICATION */}
      {activeSection === 'Worker Verification' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Worker Credentials Verification Queue</h3>
              <p className="text-xs text-slate-400">Identity and trade certification audit for registered cooperative workers</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {SYNTHETIC_WORKERS.slice(0, 6).map((w) => (
                <div key={w.id} className="p-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white">{w.name} • {w.service}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Verification Doc: TN-GOVT-CERT-{w.id * 89}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setNotice(`Doc inspection file opened for ${w.name}.`)}>
                    Inspect File
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* SECTION: COOPERATIVE ACTIVITY */}
      {activeSection === 'Cooperative Activity' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-heading font-bold text-white">Cooperative Activity Stream</h3>
                <p className="text-xs text-slate-400">Live operational dispatch events and member status updates</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/under-construction?feature=Operational+Audit+Export'}
              >
                Export Audit Feed
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {SYNTHETIC_ACTIVITY_FEED.map((ev) => (
                <div key={ev.id} className="p-4 bg-[#1C1C1F] border border-[#2A2A2E] rounded-xl flex items-start gap-3">
                  <Activity className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-white">{ev.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{ev.detail}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{ev.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Candidate Profile Modal */}
      {selectedApplicant && (
        <Modal
          title={`Review Application: ${selectedApplicant.name}`}
          subtitle={`Skill Track: ${selectedApplicant.skill}`}
          onClose={() => setSelectedApplicant(null)}
          confirmLabel="Approve Applicant"
          confirmVariant="primary"
          onConfirm={() => handleDecision(selectedApplicant.id, 'Approved')}
        >
          <div className="space-y-4">
            <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5 text-slate-300">
              <p>• Submission Timestamp: {selectedApplicant.submitted}</p>
              <p>• Primary Skill: {selectedApplicant.skill}</p>
              <p>• Identity Verification: <strong className="text-emerald-400">Aadhaar Verified</strong></p>
              <p>• Skill Certificate: <strong className="text-emerald-400">NTUC Certified</strong></p>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
};
