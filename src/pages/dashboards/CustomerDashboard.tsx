import React, { useState } from 'react';
import {
  Search, CalendarCheck, Star, MapPin, Wrench,
  Droplets, Sparkles, Refrigerator, Hammer, Clock3
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
import { useAuth } from '../../store/AuthContext';

type StoredBooking = {
  id: number;
  service: string;
  worker: string;
  time: string;
  area: string;
  status: StatusType;
};

export const CustomerDashboardPage: React.FC = () => {
  const { profile } = useAuth();
  const [activeSection, setActiveSection] = useState('Overview');
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<string | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<{ name: string; service: string } | null>(null);

  const [bookings, setBookings] = useDemoState<StoredBooking[]>('cooperative-demo-bookings', [
    {
      id: 1,
      service: 'Electrical inspection',
      worker: 'Anil Kumar',
      time: 'Tomorrow • 10:00 AM',
      area: 'T. Nagar, Chennai',
      status: 'Scheduled',
    },
    {
      id: 2,
      service: 'Kitchen deep clean',
      worker: 'Meera S.',
      time: 'Fri, 18 Apr • 2:30 PM',
      area: 'Adyar, Chennai',
      status: 'Pending',
    },
  ]);

  const workers = [
    {
      name: 'Anil Kumar',
      service: 'Electrical Repair',
      rating: '4.9',
      area: 'T. Nagar',
      availability: 'Available' as StatusType,
      initials: 'AK',
      tone: 'bg-slate-800 text-slate-200 border-slate-700',
      coop: 'Chennai City Labour Cooperative',
      price: '₹500 / hr',
    },
    {
      name: 'Meera S.',
      service: 'Home Cleaning',
      rating: '4.8',
      area: 'Adyar',
      availability: 'Available' as StatusType,
      initials: 'MS',
      tone: 'bg-slate-800 text-slate-200 border-slate-700',
      coop: 'South Chennai Workers Federation',
      price: '₹400 / hr',
    },
    {
      name: 'Ravi Prakash',
      service: 'Plumbing',
      rating: '4.7',
      area: 'Anna Nagar',
      availability: 'Offline' as StatusType,
      initials: 'RP',
      tone: 'bg-slate-800 text-slate-200 border-slate-700',
      coop: 'Chennai City Labour Cooperative',
      price: '₹500 / hr',
    },
  ];

  const categories = [
    { label: 'Electrical Repair', icon: Wrench },
    { label: 'Plumbing', icon: Droplets },
    { label: 'Home Cleaning', icon: Sparkles },
    { label: 'Appliance Repair', icon: Refrigerator },
    { label: 'Carpentry', icon: Hammer },
  ];

  const filteredWorkers = workers.filter((worker) =>
    `${worker.name} ${worker.service} ${worker.area} ${worker.coop}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const confirmBooking = () => {
    if (!selectedWorker) return;
    const newBooking: StoredBooking = {
      id: Date.now(),
      service: selectedWorker.service,
      worker: selectedWorker.name,
      time: 'Next available • 2:00 PM',
      area: 'Chennai',
      status: 'Pending',
    };
    setBookings((current) => [newBooking, ...current]);
    setNotice(`Booking request sent to ${selectedWorker.name}. Scheduled for verification.`);
    setSelectedWorker(null);
  };

  const handleCancelBooking = (id: number, service: string) => {
    setBookings((current) => current.filter((b) => b.id !== id));
    setNotice(`Booking for "${service}" has been cancelled.`);
  };

  // Header Titles Mapping
  const sectionHeader: Record<string, { title: string; subtitle: string }> = {
    'Overview': {
      title: `Welcome back, ${profile?.name?.split(' ')[0] ?? 'Customer'}`,
      subtitle: 'Find and book trusted, verified cooperative workers in your area.',
    },
    'Browse Services': {
      title: 'Browse & Filter Cooperative Services',
      subtitle: 'Search cooperative skills, browse categories, and dispatch verified workers.',
    },
    'My Bookings': {
      title: 'My Bookings & Dispatches',
      subtitle: 'Manage active service requests, view scheduled visits, and track dispatch status.',
    },
    'Activity': {
      title: 'Customer Activity Log',
      subtitle: 'Real-time audit trail of service requests, worker dispatches, and completed payouts.',
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
          {/* Member Co-op Banner */}
          <div className="p-6 bg-[#0D1210] border border-slate-800 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Co-op Member Advantage
              </div>
              <h2 className="text-xl font-heading font-bold text-white">Book verified local cooperative labor</h2>
              <p className="text-sm text-slate-300 mt-1 max-w-xl">
                Every booking directly supports worker welfare funds and cooperative profit distribution.
              </p>
            </div>
            <Button variant="primary" icon={Search} onClick={() => setActiveSection('Browse Services')}>
              Find Nearby Workers
            </Button>
          </div>

          {/* Key Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <ProgressMetricCard
              title="Active Bookings"
              value={bookings.filter((b) => b.status !== 'Completed').length}
              trend={{ value: 'Scheduled', isPositive: true }}
              subDetail="Visits pending or in progress"
              statsSummary={{ peak: 4, low: 0, avg: 2 }}
              chartData={[1, 2, 1, 2, 3, bookings.filter((b) => b.status !== 'Completed').length]}
              chartColor="amber"
            />
            <ProgressMetricCard
              title="Services Completed"
              value="12"
              trend={{ value: '+2 this month', isPositive: true }}
              subDetail="Across 3 service categories"
              statsSummary={{ peak: 14, low: 6, avg: 10 }}
              chartData={[6, 7, 9, 10, 11, 12]}
              chartColor="emerald"
            />
            <ProgressMetricCard
              title="Trusted Workers"
              value="4"
              trend={{ value: 'Verified', isPositive: true }}
              subDetail="Saved in your co-op network"
              statsSummary={{ peak: 5, low: 2, avg: 4 }}
              chartData={[2, 2, 3, 3, 4, 4]}
              chartColor="amber"
            />
            <ProgressMetricCard
              title="Member Benefit"
              value="5%"
              trend={{ value: 'Active', isPositive: true }}
              subDetail="Co-op rebate applied on booking"
              statsSummary={{ peak: '5%', low: '5%', avg: '5%' }}
              chartData={[5, 5, 5, 5, 5, 5]}
              chartColor="neutral"
            />
          </div>

          {/* Category Filter Pills */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-heading font-bold text-white">Browse Categories</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {categories.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    setQuery(label);
                    setActiveSection('Browse Services');
                  }}
                  className="p-4 rounded-2xl border text-left bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">From ₹400 / hr</p>
                </button>
              ))}
            </div>
          </div>

          {/* Worker List and Bookings Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-heading font-bold text-white">Available Cooperative Workers</h3>
                <button
                  type="button"
                  onClick={() => setActiveSection('Browse Services')}
                  className="text-xs text-amber-400 font-semibold hover:underline"
                >
                  View All Workers →
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {workers.slice(0, 2).map((worker) => (
                  <Card key={worker.name} variant="interactive" className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${worker.tone}`}>
                          {worker.initials}
                        </div>
                        <Badge status={worker.availability} />
                      </div>
                      <h4 className="text-base font-heading font-bold text-white">{worker.name}</h4>
                      <p className="text-xs text-slate-300 font-semibold mt-0.5">{worker.service}</p>
                      <p className="text-xs text-slate-400 mt-1">{worker.coop}</p>
                    </div>
                    <div className="mt-5">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() => setSelectedWorker({ name: worker.name, service: worker.service })}
                      >
                        Book Worker
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Card className="h-full">
                <CardHeader className="flex items-center justify-between">
                  <h3 className="text-base font-heading font-bold text-white">Your Bookings</h3>
                  <button
                    type="button"
                    onClick={() => setActiveSection('My Bookings')}
                    className="text-xs font-semibold text-amber-400 hover:underline"
                  >
                    Manage ({bookings.length})
                  </button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-white">{b.service}</p>
                        <Badge status={b.status} size="sm" />
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">{b.worker} • {b.time}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: BROWSE SERVICES */}
      {activeSection === 'Browse Services' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search workers by name, skill category, or area..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none focus:ring-2 focus:ring-[#D98E3B]/20 transition-all"
              />
            </div>
            {query && (
              <Button variant="ghost" size="sm" onClick={() => setQuery('')}>
                Clear Search
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {categories.map(({ label, icon: Icon }) => {
              const isSelected = query === label;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setQuery(isSelected ? '' : label)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#D98E3B] border-[#D98E3B] text-slate-950 font-bold shadow-md'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 border ${
                    isSelected ? 'bg-slate-950/20 text-slate-950 border-slate-950/30' : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className={`text-xs font-semibold ${isSelected ? 'text-slate-950' : 'text-white'}`}>{label}</p>
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredWorkers.map((worker) => (
              <Card key={worker.name} variant="interactive" className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm border ${worker.tone}`}>
                      {worker.initials}
                    </div>
                    <Badge status={worker.availability} />
                  </div>
                  <h4 className="text-base font-heading font-bold text-white">{worker.name}</h4>
                  <p className="text-xs text-slate-300 font-semibold mt-0.5">{worker.service}</p>
                  <p className="text-xs text-slate-400 mt-1">{worker.coop}</p>
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1 font-semibold text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      {worker.rating}
                    </span>
                    <span>{worker.area}</span>
                    <span className="font-semibold text-slate-200">{worker.price}</span>
                  </div>
                </div>
                <div className="mt-5">
                  <Button
                    variant={worker.availability === 'Available' ? 'primary' : 'outline'}
                    size="sm"
                    className="w-full"
                    onClick={() => setSelectedWorker({ name: worker.name, service: worker.service })}
                  >
                    {worker.availability === 'Available' ? 'Book Worker' : 'Request Service'}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: MY BOOKINGS */}
      {activeSection === 'My Bookings' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-heading font-bold text-white">Active & Past Bookings</h3>
            <Button variant="primary" size="sm" icon={Search} onClick={() => setActiveSection('Browse Services')}>
              Book New Service
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="p-5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-heading font-bold text-white">{booking.service}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Assigned Worker: <strong className="text-slate-200">{booking.worker}</strong></p>
                    </div>
                    <Badge status={booking.status} />
                  </div>

                  <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-2">
                      <Clock3 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{booking.area}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNotice(`Contact request sent to ${booking.worker}. They will call you shortly.`)}
                  >
                    Contact Worker
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleCancelBooking(booking.id, booking.service)}
                  >
                    Cancel Request
                  </Button>
                </div>
              </Card>
            ))}

            {bookings.length === 0 && (
              <div className="md:col-span-2">
                <EmptyState
                  icon={CalendarCheck}
                  title="No Active Bookings"
                  detail="You have no current service requests. Browse available workers to schedule a visit."
                  action={
                    <Button variant="primary" size="sm" onClick={() => setActiveSection('Browse Services')}>
                      Browse Services
                    </Button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION: ACTIVITY */}
      {activeSection === 'Activity' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <h3 className="text-base font-heading font-bold text-white">Recent Customer Activity</h3>
              <p className="text-xs text-slate-400">Chronological history of dispatches, payments, and co-op dividends</p>
            </CardHeader>

            <CardContent className="space-y-4">
              {[
                {
                  title: 'Service Request Dispatched',
                  detail: 'Electrical inspection request assigned to Anil Kumar at Chennai City Labour Cooperative.',
                  time: 'Today • 10:15 AM',
                },
                {
                  title: 'Worker Verification Confirmed',
                  detail: 'Meera S. credentials and Aadhaar identity verified for Kitchen deep clean.',
                  time: 'Yesterday • 4:30 PM',
                },
                {
                  title: 'Cooperative Dividend Benefit Applied',
                  detail: '5% member discount calculated on dispatch #TN-CHE-104.',
                  time: 'Apr 14 • 11:00 AM',
                },
                {
                  title: 'Service Completed',
                  detail: 'Ceiling fan repair completed by Anil Kumar. Payment released to cooperative account.',
                  time: 'Apr 10 • 3:00 PM',
                },
              ].map((act, i) => (
                <div key={i} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-white">{act.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{act.detail}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{act.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Confirmation Modal */}
      {selectedWorker && (
        <Modal
          title="Confirm Service Request"
          subtitle={`Cooperative Member Dispatch • ${selectedWorker.service}`}
          onClose={() => setSelectedWorker(null)}
          confirmLabel="Confirm & Book Visit"
          confirmVariant="primary"
          onConfirm={confirmBooking}
        >
          <div className="space-y-4">
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Assigned Worker</p>
                <p className="text-sm font-bold text-white mt-0.5">{selectedWorker.name}</p>
              </div>
              <Badge status="Available" />
            </div>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex justify-between py-1.5 border-b border-slate-800">
                <span>Service Category:</span>
                <strong className="text-white">{selectedWorker.service}</strong>
              </p>
              <p className="flex justify-between py-1.5 border-b border-slate-800">
                <span>Scheduled Time:</span>
                <strong className="text-white">Next Available (Today • 2:00 PM)</strong>
              </p>
              <p className="flex justify-between py-1.5">
                <span>Cooperative Rate:</span>
                <strong className="text-emerald-400">₹500 / visit (Member rate)</strong>
              </p>
            </div>
          </div>
        </Modal>
      )}
    </DashboardShell>
  );
};
