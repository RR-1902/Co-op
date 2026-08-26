import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase } from '../services/supabaseClient';
import type { Session, User } from '@supabase/supabase-js';
import { findDemoAccount } from '../features/auth/demoMode';

type DemoUser = {
  id: string;
  email: string;
  user_metadata: { name: string };
};

type DemoSession = {
  demo: true;
  user: DemoUser;
};

type UserProfile = {
  id: string;
  role: 'CUSTOMER' | 'APPLICANT' | 'WORKER' | 'COOPERATIVE_OFFICER' | 'FEDERATION_ADMIN';
  name: string;
  email: string;
};

type AuthContextType = {
  session: Session | DemoSession | null;
  user: User | DemoUser | null;
  profile: UserProfile | null;
  loading: boolean;
  signInDemo: (email: string, password: string) => boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  profile: null,
  loading: true,
  signInDemo: () => false,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | DemoSession | null>(null);
  const [user, setUser] = useState<User | DemoUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signInDemo = (email: string, password: string) => {
    const account = findDemoAccount(email, password);
    if (!account) return false;

    const demoUser: DemoUser = {
      id: account.id,
      email: account.email,
      user_metadata: { name: account.name },
    };

    setSession({ demo: true, user: demoUser });
    setUser(demoUser);
    setProfile({
      id: account.id,
      role: account.role,
      name: account.name,
      email: account.email,
    });
    setLoading(false);
    return true;
  };

  useEffect(() => {
    // Get active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
      } else {
        setProfile(data as UserProfile);
      }
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setSession(null);
    setUser(null);
    setProfile(null);
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, loading, signInDemo, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
