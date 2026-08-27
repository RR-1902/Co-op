import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { supabase } from '../../services/supabaseClient';
import { useAuth } from '../../store/AuthContext';
import { Logo } from '../../components/ui/Logo';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signInDemo } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (signInDemo(email, password)) {
        navigate('/');
      } else {
        setError(error.message);
      }
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const demoPresets = [
    { label: 'Customer', email: 'customer@demo.com' },
    { label: 'Applicant', email: 'applicant@demo.com' },
    { label: 'Worker', email: 'worker@demo.com' },
    { label: 'Coop Officer', email: 'officer@demo.com' },
    { label: 'Fed Admin', email: 'admin@demo.com' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#0D1210] opacity-60 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex justify-between items-center">
          <Link to="/" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to CO-OP Landing
          </Link>
        </div>

        <Card variant="glass" className="p-8">
          <div className="flex flex-col items-center text-center mb-8">
            <Logo size="lg" showSubtitle />
            <h2 className="text-2xl font-heading font-extrabold text-white mt-6">Welcome Back</h2>
            <p className="text-xs text-slate-400 mt-1">Sign in to your CO-OP account or select a demo role.</p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-[#D98E3B]/20 transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-[#D98E3B] rounded-xl text-sm text-white outline-none focus:ring-2 focus:ring-[#D98E3B]/20 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button type="submit" isLoading={loading} className="w-full py-2.5">
              Sign In to Account
            </Button>
          </form>

          {/* Quick Demo Sign-in Shortcuts */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-3 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>One-Click Hackathon Demo Access</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {demoPresets.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => {
                    setEmail(acc.email);
                    setPassword('password123');
                    signInDemo(acc.email, 'password123');
                    navigate('/');
                  }}
                  className="px-3 py-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 rounded-xl transition-all text-center flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3 h-3 text-amber-400" />
                  {acc.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-3">Demo Password: <code className="text-slate-400 font-mono">password123</code></p>
          </div>
        </Card>
      </div>
    </div>
  );
}
