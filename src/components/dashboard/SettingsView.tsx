import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabaseClient';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Toast } from '../ui/Toast';

export const SettingsView: React.FC = () => {
  const { profile, user } = useAuth();
  const [notice, setNotice] = useState<string | null>(null);

  // Profile Form State
  const [name, setName] = useState(profile?.name ?? 'Demo User');
  const [email, setEmail] = useState(profile?.email ?? 'user@demo.com');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Notification Preferences Toggles State (Demo UI)
  const [notifications, setNotifications] = useState({
    emailDispatch: true,
    smsAlerts: true,
    dividendNotice: false,
    communityDigest: false,
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice('Profile info saved successfully.');
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setNotice('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setNotice('New passwords do not match. Please verify.');
      return;
    }

    setPasswordLoading(true);

    try {
      if (user && 'id' in user && !('demo' in (user as any))) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) {
          setNotice(`Failed to update password: ${error.message}`);
        } else {
          setNotice('Password updated successfully via Supabase Auth.');
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
        }
      } else {
        // Demo mode simulated password change
        setNotice('Password updated successfully (Demo Mode).');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setNotice(`Error updating password: ${err?.message ?? 'Unknown error'}`);
    } finally {
      setPasswordLoading(false);
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setNotice('Notification preference updated (Demo UI).');
  };

  return (
    <div className="space-y-8">
      {notice && <Toast message={notice} onClose={() => setNotice(null)} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white">Profile Information</h3>
                <p className="text-xs text-slate-400">View and manage your account details</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  Role Track: <strong className="text-amber-400 uppercase">{profile?.role ?? 'CUSTOMER'}</strong>
                </span>
                <Button variant="primary" size="sm" type="submit">
                  Save Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-heading font-bold text-white">Security & Password</h3>
                <p className="text-xs text-slate-400">Update your account authentication credentials</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Current Password
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-xs text-white outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="primary" size="sm" type="submit" disabled={passwordLoading}>
                  {passwordLoading ? 'Updating...' : 'Update Password'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Notification Preferences (Demo UI) */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-white">Notification Preferences</h3>
              <p className="text-xs text-slate-400">Configure alert channels and event notifications</p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-[11px] font-semibold border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            Non-functional / Demo UI
          </span>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Toggle 1 */}
            <div
              onClick={() => toggleNotification('emailDispatch')}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-white">Email Dispatch & Booking Alerts</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Receive confirmations for bookings and job dispatches</p>
              </div>
              <div
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  notifications.emailDispatch ? 'bg-[#D98E3B]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    notifications.emailDispatch ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Toggle 2 */}
            <div
              onClick={() => toggleNotification('smsAlerts')}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-white">SMS & OTP Alerts</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Instant SMS updates for visit arrivals and verification</p>
              </div>
              <div
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  notifications.smsAlerts ? 'bg-[#D98E3B]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    notifications.smsAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Toggle 3 */}
            <div
              onClick={() => toggleNotification('dividendNotice')}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-white">Cooperative Dividend Payout Notices</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Quarterly profit-share dividend credit updates</p>
              </div>
              <div
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  notifications.dividendNotice ? 'bg-[#D98E3B]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    notifications.dividendNotice ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>

            {/* Toggle 4 */}
            <div
              onClick={() => toggleNotification('communityDigest')}
              className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl flex items-center justify-between cursor-pointer hover:border-slate-700 transition-colors"
            >
              <div>
                <p className="text-xs font-bold text-white">Weekly Community Newsletter</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Cooperative sector news and federation policy changes</p>
              </div>
              <div
                className={`w-11 h-6 rounded-full p-1 transition-colors ${
                  notifications.communityDigest ? 'bg-[#D98E3B]' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${
                    notifications.communityDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
