import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './store/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import { LandingPage } from './pages/LandingPage';
import { UnderConstructionPage } from './pages/UnderConstructionPage';
import {
  CustomerDashboard,
  ApplicantDashboard,
  WorkerDashboard,
  CoopOfficerDashboard,
  FedAdminDashboard,
} from './pages/Dashboards';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/under-construction" element={<UnderConstructionPage />} />
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
