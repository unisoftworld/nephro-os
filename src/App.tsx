import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MarketingLayout from './layouts/MarketingLayout';
import ConsoleLayout from './layouts/ConsoleLayout';
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Marketing Site Routes */}
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        {/* Console Routes */}
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
          <Route path="settings" element={<SettingsView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
