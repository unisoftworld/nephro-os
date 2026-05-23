import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import MarketingLayout from './layouts/MarketingLayout';
import ConsoleLayout from './layouts/ConsoleLayout';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/marketing/HomePage';
import PricingPage from './pages/marketing/PricingPage';
import TodayView from './pages/console/TodayView';
import SessionView from './pages/console/SessionView';
import PatientsView from './pages/console/PatientsView';
import PatientDetailView from './pages/console/PatientDetailView';
import InsightsView from './pages/console/InsightsView';
import ScheduleView from './pages/console/ScheduleView';
import AnalyticsView from './pages/console/AnalyticsView';
import InventoryView from './pages/console/InventoryView';
import BillingView from './pages/console/BillingView';
import SettingsView from './pages/console/SettingsView';
import VascularView from './pages/console/VascularView';
import LabsView from './pages/console/LabsView';
import SessionsListView from './pages/console/SessionsListView';
import StaffView from './pages/console/StaffView';

function RequireAuth() {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-saline-200 border-t-saline-500 animate-spin" />
          <p className="text-12 text-ink-400">Loading NephroOS…</p>
        </div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={user ? <Navigate to="/console" replace /> : <LoginPage />}
      />

      {/* Marketing Site Routes */}
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Route>

      {/* Protected Console Routes */}
      <Route element={<RequireAuth />}>
        <Route path="/console" element={<ConsoleLayout />}>
          <Route index element={<TodayView />} />
          <Route path="today" element={<TodayView />} />
          <Route path="sessions" element={<SessionsListView />} />
          <Route path="sessions/:id" element={<SessionView />} />
          <Route path="patients" element={<PatientsView />} />
          <Route path="patients/:id" element={<PatientDetailView />} />
          <Route path="schedule" element={<ScheduleView />} />
          <Route path="vascular" element={<VascularView />} />
          <Route path="labs" element={<LabsView />} />
          <Route path="inventory" element={<InventoryView />} />
          <Route path="billing" element={<BillingView />} />
          <Route path="insights" element={<InsightsView />} />
          <Route path="analytics" element={<AnalyticsView />} />
          <Route path="staff" element={<StaffView />} />
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
