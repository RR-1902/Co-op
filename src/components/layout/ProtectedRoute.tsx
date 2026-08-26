import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { session, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="animate-pulse text-muted-foreground">Loading session...</p>
      </div>
    );
  }

  if (!session || !profile) {
    // Not logged in, redirect to login page with the return url
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    // Logged in but doesn't have the right role
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-4">You do not have permission to view this page.</p>
        <p className="text-sm">Current Role: <span className="font-mono bg-muted px-2 py-1 rounded">{profile.role}</span></p>
        <a href="/" className="mt-6 text-primary hover:underline">Return to Home</a>
      </div>
    );
  }

  return <Outlet />;
};
