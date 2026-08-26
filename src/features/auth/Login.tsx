import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

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

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-card border rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive text-sm rounded">{error}</div>}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            required 
            className="w-full p-2 border rounded bg-background"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            type="password" 
            required 
            className="w-full p-2 border rounded bg-background"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-primary-foreground p-2 rounded hover:bg-primary/90 disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center text-sm">
        <span className="text-muted-foreground">Demo Accounts (Password: password123):</span>
        <ul className="mt-2 space-y-1 font-mono text-xs">
          <li>customer@demo.com</li>
          <li>applicant@demo.com</li>
          <li>worker@demo.com</li>
          <li>officer@demo.com</li>
          <li>admin@demo.com</li>
        </ul>
      </div>
    </div>
  );
}
