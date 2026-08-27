import React, { useState } from 'react';
import {
  CheckCircle2, Clock3, MapPin, Check, TrendingUp, Power
} from 'lucide-react';
import { DashboardShell } from '../../components/layout/DashboardShell';
import { ProgressMetricCard } from '../../components/ui/ProgressMetricCard';
import { Badge, type StatusType } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Toast } from '../../components/ui/Toast';
import { useDemoState } from '../../features/demo/demoStorage';
import { useAuth } from '../../store/AuthContext';
import { SYNTHETIC_WORKER_JOBS } from '../../features/demo/demoData';

type Job = {
  id: number;
  service: string;
  customer: string;
  time: string;
  area: string;
  amount: string;
  status: StatusType;
};

export const WorkerDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState('Overview');
  const [notice, setNotice] = useState<string | null>(null);

  const [available, setAvailable] = useDemoState<boolean>('cooperative-demo-availability', true);

  const [jobs, setJobs] = useDemoState<Job[]>(
    'cooperative-demo-jobs',
    SYNTHETIC_WORKER_JOBS.map((j) => ({
      id: j.id,
      service: j.service,
      customer: j.customer,
      time: j.time,
      area: j.area,
      amount: j.amount,
      status: j.status,
    }))
  );

  const updateJobStatus = (id: number, newStatus: StatusType) => {
    const targetJob = jobs.find((j) => j.id === id);
    setJobs((current) =>
      current.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (targetJob) {
      setNotice(`"${targetJob.service}" status updated to ${newStatus.toLowerCase()}.`);
    }
  };

  const completedJobsCount = jobs.filter((j) => j.status === 'Completed').length;

  const sectionHeader: Record<string, { title: string; subtitle: string }> = {
    'Overview': {
      title: `Worker Hub • ${profile?.name ?? 'Anil Kumar'}`,
      subtitle: 'Manage your daily visits, accept customer requests, and toggle availability.',
    },
    'My Jobs': {
      title: 'My Visits Agenda & Jobs',
      subtitle: 'View scheduled customer visits, accept new requests, and complete assigned tasks.',
    },
    'Earnings': {
      title: 'Earnings & Payouts',
      subtitle: 'Track net earnings, member fee contributions, and cooperative welfare distribution.',
    },
    'Availability': {
      title: 'Availability & Dispatch Status',
      subtitle: 'Manage live job matching readiness and service area preferences.',
    },
    'Profile': {
      title: 'Worker Member Profile',
      subtitle: 'Verified credentials, cooperative entity membership, and customer rating.',
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

      {/* Header Profile & Availability Bar */}
      <div className="mb-8 p-6 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-lg flex items-center justify-center">
            {profile?.name?.split(' ').map((n) => n[0]).join('') ?? 'AK'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-heading font-bold text-white">{profile?.name ?? 'Anil Kumar'}</h2>
              <Badge status={available ? 'Available' : 'Unavailable'} />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Electrical Specialist • Chennai City Labour Cooperative
            </p>
          </div>
        </div>

        <Button
          variant={available ? 'primary' : 'secondary'}
          icon={Power}
          onClick={() => {
            setAvailable((prev) => !prev);
            setNotice(`Job matching is now ${!available ? 'AVAILABLE' : 'UNAVAILABLE'}.`);
          }}
        >
          {available ? 'Job Matching ACTIVE' : 'Set AVAILABLE'}
        </Button>
      </div>

      {/* SECTION: OVERVIEW */}
      {activeSection === 'Overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ProgressMetricCard
              title="Today's Jobs"
              value={jobs.filter((j) => j.time.startsWith('Today')).length}
              trend={{ value: '2 scheduled', isPositive: true }}
              subDetail="Visits scheduled today"
              statsSummary={{ peak: 4, low: 1, avg: 2 }}
              chartData={[1, 2, 1, 3, 2, 3, jobs.filter((j) => j.time.startsWith('Today')).length]}
              chartColor="amber"
            />
            <ProgressMetricCard
              title="April Earnings"
              value="₹24,850"
              trend={{ value: '+12.4%', isPositive: true }}
              subDetail="Net earnings payout"
              statsSummary={{ peak: '₹28K', low: '₹18K', avg: '₹22K' }}
              chartData={[18000, 19500, 21000, 22400, 23800, 24850]}
              chartColor="emerald"
            />
            <ProgressMetricCard
              title="Customer Rating"
              value="4.9 / 5"
              trend={{ value: '98% 5-star', isPositive: true }}
              subDetail="From 48 verified reviews"
              statsSummary={{ peak: '5.0', low: '4.8', avg: '4.9' }}
              chartData={[4.7, 4.8, 4.8, 4.9, 4.9, 4.9]}
              chartColor="amber"
            />
            <ProgressMetricCard
              title="Total Completed"
              value={48 + completedJobsCount}
              trend={{ value: '+6 this week', isPositive: true }}
              subDetail="Verified service visits"
              statsSummary={{ peak: 52, low: 30, avg: 42 }}
              chartData={[30, 36, 40, 44, 46, 48 + completedJobsCount]}
              chartColor="neutral"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-white">Today's Visits Agenda</h3>
                <span className="text-xs text-slate-400">Chennai Central Zone</span>
              </div>
              <div className="space-y-4">
                {jobs
                  .filter((job) => job.time.startsWith('Today'))
                  .map((job) => (
                    <Card key={job.id} variant="glass" className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-heading font-bold text-white">{job.service}</h4>
                            <Badge status={job.status} size="sm" />
                          </div>
                          <p className="text-xs text-slate-400 mt-1">Customer: <strong className="text-slate-200">{job.customer}</strong></p>
                          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            {job.area}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-400">{job.amount}</span>
                          <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5 justify-end">
                            <Clock3 className="w-3.5 h-3.5 text-slate-400" />
                            {job.time}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                        {job.status === 'Pending' && (
                          <Button variant="primary" size="sm" icon={Check} onClick={() => updateJobStatus(job.id, 'Accepted')}>
                            Accept Visit
                          </Button>
                        )}
                        {(job.status === 'Accepted' || job.status === 'Scheduled') && (
                          <Button variant="primary" size="sm" icon={CheckCircle2} onClick={() => updateJobStatus(job.id, 'Completed')}>
                            Mark Complete
                          </Button>
                        )}
                      </div>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-bold text-white">Earnings Growth</h3>
                  <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" /> +12.4%
                  </span>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-heading font-extrabold text-white">₹24,850</p>
                  <div className="flex h-24 items-end gap-2 pt-4">
                    {[35, 48, 42, 58, 52, 70, 64, 82, 76, 92].map((h, idx) => (
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

      {/* SECTION: MY JOBS */}
      {activeSection === 'My Jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-white">All Assigned Visits & Schedule</h3>
            <span className="text-xs text-slate-400">{jobs.length} Total Visits</span>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <Card key={job.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-heading font-bold text-white">{job.service}</h4>
                    <Badge status={job.status} />
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Customer: <strong className="text-slate-200">{job.customer}</strong> • {job.area}</p>
                  <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                    <Clock3 className="w-3.5 h-3.5" /> {job.time}
                  </p>
                </div>

                <div className="flex items-center gap-3 justify-end">
                  <span className="text-lg font-bold text-emerald-400 mr-2">{job.amount}</span>
                  {job.status === 'Pending' && (
                    <Button variant="primary" size="sm" icon={Check} onClick={() => updateJobStatus(job.id, 'Accepted')}>
                      Accept Visit
                    </Button>
                  )}
                  {(job.status === 'Accepted' || job.status === 'Scheduled') && (
                    <Button variant="primary" size="sm" icon={CheckCircle2} onClick={() => updateJobStatus(job.id, 'Completed')}>
                      Mark Complete
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: EARNINGS */}
      {activeSection === 'Earnings' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-5">
              <p className="text-xs text-slate-400">Total Net Payout</p>
              <p className="text-3xl font-heading font-extrabold text-white mt-1">₹24,850</p>
              <p className="text-xs text-emerald-400 mt-2 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> +12.4% vs last month
              </p>
            </Card>

            <Card className="p-5">
              <p className="text-xs text-slate-400">Co-op Member Fee (5%)</p>
              <p className="text-3xl font-heading font-extrabold text-slate-300 mt-1">₹1,300</p>
              <p className="text-xs text-slate-500 mt-2">Deducted for co-op operational pool</p>
            </Card>

            <Card className="p-5">
              <p className="text-xs text-slate-400">Welfare Fund Contribution</p>
              <p className="text-3xl font-heading font-extrabold text-emerald-400 mt-1">₹650</p>
              <p className="text-xs text-slate-500 mt-2">Healthcare & pension allocation</p>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Monthly Earnings Distribution</h3>
            </CardHeader>
            <CardContent>
              <div className="flex h-36 items-end gap-3 pt-4">
                {[35, 48, 42, 58, 52, 70, 64, 82, 76, 92].map((h, idx) => (
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
      )}

      {/* SECTION: AVAILABILITY */}
      {activeSection === 'Availability' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-heading font-bold text-white">Live Job Matching Readiness</h3>
                <p className="text-xs text-slate-400 mt-1">When ACTIVE, nearby customer requests are automatically routed to your device.</p>
              </div>
              <Button
                variant={available ? 'primary' : 'secondary'}
                size="md"
                icon={Power}
                onClick={() => {
                  setAvailable((prev) => !prev);
                  setNotice(`Job matching is now ${!available ? 'AVAILABLE' : 'UNAVAILABLE'}.`);
                }}
              >
                {available ? 'Job Matching ACTIVE' : 'Set AVAILABLE'}
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h4 className="text-base font-heading font-bold text-white mb-3">Service Dispatch Zone</h4>
            <p className="text-xs text-slate-300">Primary Region: <strong className="text-white">Chennai Central Zone (T. Nagar, Adyar, Velachery)</strong></p>
            <p className="text-xs text-slate-400 mt-1">Max Travel Radius: 12 km from registered pin code.</p>
          </Card>
        </div>
      )}

      {/* SECTION: PROFILE */}
      {activeSection === 'Profile' && (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xl flex items-center justify-center">
                {profile?.name?.split(' ').map((n) => n[0]).join('') ?? 'AK'}
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white">{profile?.name ?? 'Anil Kumar'}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Electrical Specialist • Chennai City Labour Cooperative</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-slate-300">
                  <span className="font-semibold text-amber-400">★ 4.9 Rating (48 Reviews)</span>
                  <span>•</span>
                  <span>Member #WRK-8042</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </DashboardShell>
  );
};
