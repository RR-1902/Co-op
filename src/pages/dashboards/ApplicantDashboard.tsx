import React, { useState } from 'react';
import {
  FileCheck2, ShieldCheck, BriefcaseBusiness, CheckCircle2,
  AlertCircle, ArrowUpRight, Wrench, Sparkles
} from 'lucide-react';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { StatCard } from '../../components/ui/StatCard';
import { ProgressMetricCard } from '../../components/ui/ProgressMetricCard';
import { Badge, type StatusType } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Modal } from '../../components/ui/Modal';
import { Toast } from '../../components/ui/Toast';
import { useDemoState } from '../../features/demo/demoStorage';
import { useAuth } from '../../store/AuthContext';
import { SYNTHETIC_OPPORTUNITIES } from '../../features/demo/demoData';

type StoredApplication = {
  status: StatusType;
  applied: string[];
};

export const ApplicantDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState('Overview');
  const [notice, setNotice] = useState<string | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const [applicationState, setApplicationState] = useDemoState<StoredApplication>(
    'cooperative-demo-applications',
    { status: 'Pending', applied: [] }
  );

  const opportunities = SYNTHETIC_OPPORTUNITIES.map((opp) => ({
    title: opp.title,
    coop: opp.coop,
    area: opp.area,
    pay: opp.pay,
    icon: opp.title.toLowerCase().includes('clean')
      ? Sparkles
      : opp.title.toLowerCase().includes('ac')
      ? ShieldCheck
      : Wrench,
  }));

  const applyForOpportunity = (title: string) => {
    setApplicationState((current) => ({
      status: 'In review',
      applied: current.applied.includes(title) ? current.applied : [...current.applied, title],
    }));
    setNotice(`Application submitted successfully for "${title}". Your file has been updated.`);
  };

  const sectionHeader: Record<string, { title: string; subtitle: string }> = {
    'Overview': {
      title: `Applicant Portal • ${profile?.name ?? 'Rahul'}`,
      subtitle: 'Track your cooperative onboarding progress, document verification, and matched role opportunities.',
    },
    'My Applications': {
      title: 'My Applications & Status',
      subtitle: 'View submitted applications, review stage timelines, and inspection status.',
    },
    'Opportunities': {
      title: 'Matched Cooperative Opportunities',
      subtitle: 'Explore open cooperative roles tailored to your verified skills and preferred region.',
    },
    'Profile & Compliance': {
      title: 'Profile & Compliance Verification',
      subtitle: 'Manage required identity documents, background verification, and skill certifications.',
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
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatCard
              label="Application Status"
              value={applicationState.status}
              detail="Updated just now"
              icon={FileCheck2}
              tone="amber"
            />
            <ProgressMetricCard
              size="sm"
              title="Profile & Skill Completion"
              value="85%"
              trend={{ value: '+15%', isPositive: true }}
              subDetail="Verification in progress"
              statsSummary={{ peak: '100%', low: '40%', avg: '80%' }}
              chartData={[40, 55, 65, 70, 80, 85]}
              chartColor="emerald"
            />
            <StatCard
              label="Matched Opportunities"
              value={SYNTHETIC_OPPORTUNITIES.length}
              detail="Based on skill profile"
              icon={BriefcaseBusiness}
              tone="slate"
            />
            <StatCard
              label="Verified Documents"
              value="4 / 5"
              detail="1 awaiting officer review"
              icon={ShieldCheck}
              tone="emerald"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-heading font-bold text-white">General Worker Application</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Chennai City Labour Cooperative • Ref #APP-2048</p>
                  </div>
                  <Badge status={applicationState.status} />
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-300">
                      <span className="text-amber-400">1. Submitted</span>
                      <span className={applicationState.status === 'Pending' ? 'text-slate-500' : 'text-amber-400'}>2. Under Review</span>
                      <span className="text-slate-500">3. Decision & Onboarding</span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                      <div
                        className="h-full bg-[#D98E3B] rounded-full transition-all duration-500"
                        style={{
                          width: applicationState.status === 'Approved' ? '100%' : applicationState.status === 'In review' ? '65%' : '33%',
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div className="text-xs text-slate-300">
                      <p className="font-semibold text-white">Application Details & Verification</p>
                      <p className="text-slate-400 mt-0.5">Your skills and background check documents are currently being processed.</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setDetailsOpen(true)}>
                      View File
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-heading font-bold text-white mb-4">Matched Opportunities</h3>
                <div className="space-y-4">
                  {opportunities.map((opp) => {
                    const isApplied = applicationState.applied.includes(opp.title);
                    return (
                      <Card key={opp.title} variant="interactive" className="p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                              <opp.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-base font-heading font-bold text-white">{opp.title}</h4>
                              <p className="text-xs text-slate-300 font-semibold mt-0.5">{opp.coop}</p>
                              <p className="text-xs text-slate-400 mt-1">{opp.area}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                            {opp.pay}
                          </span>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                          <Button
                            variant={isApplied ? 'outline' : 'primary'}
                            size="sm"
                            disabled={isApplied}
                            icon={isApplied ? CheckCircle2 : ArrowUpRight}
                            iconPosition="right"
                            onClick={() => applyForOpportunity(opp.title)}
                          >
                            {isApplied ? 'Application Submitted' : 'Apply Now'}
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <h3 className="text-base font-heading font-bold text-white">Profile & Compliance</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Required documents for cooperative membership</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <span className="text-slate-300">Identity (Aadhaar/Voter ID)</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <span className="text-slate-300">Skill Certifications</span>
                      <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Verified</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                      <span className="text-amber-200">Address Proof Verification</span>
                      <span className="flex items-center gap-1 font-semibold text-amber-400"><AlertCircle className="w-3.5 h-3.5" /> Action Needed</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setNotice('Document checklist opened.')}>
                    Upload Document
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: MY APPLICATIONS */}
      {activeSection === 'My Applications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">General Worker Registration #APP-2048</h3>
                <p className="text-xs text-slate-400 mt-0.5">Chennai City Labour Cooperative • Primary Registration</p>
              </div>
              <Badge status={applicationState.status} />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span className="text-amber-400">1. Submitted</span>
                  <span className={applicationState.status === 'Pending' ? 'text-slate-500' : 'text-amber-400'}>2. Under Officer Review</span>
                  <span className="text-slate-500">3. Verification & Dispatch Pool</span>
                </div>
                <div className="h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                  <div
                    className="h-full bg-[#D98E3B] rounded-full transition-all duration-500"
                    style={{ width: applicationState.status === 'Approved' ? '100%' : applicationState.status === 'In review' ? '65%' : '33%' }}
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
                <p className="font-bold text-white text-sm">Application Metadata</p>
                <p>• Candidate Ref: <strong className="text-white">#APP-2048</strong></p>
                <p>• Assigned Officer: <strong className="text-white">Meera S. (Cooperative Admin)</strong></p>
                <p>• Track: <strong className="text-white">Maintenance & Skilled Electrical/Plumbing</strong></p>
              </div>

              <div className="flex items-center justify-end gap-3">
                <Button variant="primary" size="sm" onClick={() => setDetailsOpen(true)}>
                  Inspect Application File
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* SECTION: OPPORTUNITIES */}
      {activeSection === 'Opportunities' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-white">Open Cooperative Job Opportunities</h3>
            <span className="text-xs text-slate-400">{opportunities.length} Roles Matched</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map((opp) => {
              const isApplied = applicationState.applied.includes(opp.title);
              return (
                <Card key={opp.title} className="p-5 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0">
                          <opp.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-base font-heading font-bold text-white">{opp.title}</h4>
                          <p className="text-xs text-slate-400">{opp.coop}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl text-xs space-y-1">
                      <p><strong className="text-slate-200">Location:</strong> {opp.area}</p>
                      <p><strong className="text-slate-200">Monthly Compensation:</strong> <span className="text-emerald-400 font-bold">{opp.pay}</span></p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end">
                    <Button
                      variant={isApplied ? 'outline' : 'primary'}
                      size="sm"
                      disabled={isApplied}
                      icon={isApplied ? CheckCircle2 : ArrowUpRight}
                      onClick={() => applyForOpportunity(opp.title)}
                    >
                      {isApplied ? 'Application Submitted' : 'Apply Now'}
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION: PROFILE & COMPLIANCE */}
      {activeSection === 'Profile & Compliance' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Document Compliance Checklist</h3>
              <p className="text-xs text-slate-400">All member applicants must submit valid government verification documents</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div>
                    <p className="font-bold text-white">Identity Document (Aadhaar / Voter ID)</p>
                    <p className="text-slate-400 mt-0.5">Government ID verified by cooperative officer</p>
                  </div>
                  <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800 rounded-xl">
                  <div>
                    <p className="font-bold text-white">Skill Certifications (NTUC Electrical Level 2)</p>
                    <p className="text-slate-400 mt-0.5">Technician skill certificate uploaded</p>
                  </div>
                  <span className="flex items-center gap-1 font-semibold text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Verified</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                  <div>
                    <p className="font-bold text-amber-200">Address Proof Verification</p>
                    <p className="text-amber-300/80 mt-0.5">Recent utility bill or rental agreement needed</p>
                  </div>
                  <span className="flex items-center gap-1 font-semibold text-amber-400"><AlertCircle className="w-4 h-4" /> Action Needed</span>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setNotice('Document upload system ready. Please select utility bill PDF or image.')}
              >
                Upload Address Proof Document
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Details Modal */}
      {detailsOpen && (
        <Modal
          title="Application File #APP-2048"
          subtitle="Chennai City Labour Cooperative Worker Registration"
          onClose={() => setDetailsOpen(false)}
        >
          <div className="space-y-3 text-xs text-slate-300">
            <p>
              Your application is under active review by officer <strong>Meera S.</strong> at the Chennai City Labour Cooperative.
            </p>
            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <p>• Candidate ID: 3cf34bbb-fd7d-4d55-b491-3465a03c964d</p>
              <p>• Category: Maintenance & Skilled Labour</p>
              <p>• Region: Chennai Central Zone</p>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
};
