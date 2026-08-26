
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './store/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { 
  CustomerDashboard, 
  ApplicantDashboard, 
  WorkerDashboard, 
  CoopOfficerDashboard, 
  FedAdminDashboard 
} from './pages/Dashboards';

// A simple landing page that redirects logged-in users to their respective dashboards
const LandingPage = () => {
  const { session, profile, loading } = useAuth();

  if (loading) return <div className="p-8">Loading...</div>;

  if (session && profile) {
    switch (profile.role) {
      case 'CUSTOMER': return <Navigate to="/dashboard" replace />;
      case 'APPLICANT': return <Navigate to="/applicant-dashboard" replace />;
      case 'WORKER': return <Navigate to="/worker-dashboard" replace />;
      case 'COOPERATIVE_OFFICER': return <Navigate to="/coop-admin" replace />;
      case 'FEDERATION_ADMIN': return <Navigate to="/fed-admin" replace />;
      default: return <Navigate to="/dashboard" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-primary tracking-tight mb-4">Cooperative Marketplace</h1>
      <p className="text-muted-foreground text-lg mb-8">Connecting workers with communities securely.</p>
      <div className="flex gap-4">
        <Link to="/login" className="bg-primary text-primary-foreground px-6 py-2 rounded-md font-medium hover:bg-primary/90">
          Login
        </Link>
        <Link to="/register" className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md font-medium hover:bg-secondary/90 border">
          Register
        </Link>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* CUSTOMER ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['CUSTOMER']} />}>
            <Route path="/dashboard" element={<CustomerDashboard />} />
          </Route>

          {/* APPLICANT ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['APPLICANT']} />}>
            <Route path="/applicant-dashboard" element={<ApplicantDashboard />} />
          </Route>

          {/* WORKER ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['WORKER']} />}>
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
          </Route>

          {/* COOPERATIVE OFFICER ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['COOPERATIVE_OFFICER']} />}>
            <Route path="/coop-admin" element={<CoopOfficerDashboard />} />
          </Route>

          {/* FEDERATION ADMIN ROUTES */}
          <Route element={<ProtectedRoute allowedRoles={['FEDERATION_ADMIN']} />}>
            <Route path="/fed-admin" element={<FedAdminDashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
