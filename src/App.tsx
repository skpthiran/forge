import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import DemoGeneratorPage from './pages/DemoGeneratorPage';
import SignalEnginePage from './pages/SignalEnginePage';
import CraftEnginePage from './pages/CraftEnginePage';
import ReachEnginePage from './pages/ReachEnginePage';
import PulseEnginePage from './pages/PulseEnginePage';
import CapitalEnginePage from './pages/CapitalEnginePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PricingPage from './pages/PricingPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SharePage from './pages/SharePage';
import ProjectsPage from './pages/ProjectsPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/b/:id" element={<SharePage />} />
        
        {/* Dashboard Routes wrapped in Layout */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/new-brand" element={<DemoGeneratorPage />} />
          <Route path="/signal" element={<SignalEnginePage />} />
          <Route path="/craft" element={<CraftEnginePage />} />
          <Route path="/reach" element={<ReachEnginePage />} />
          <Route path="/pulse" element={<PulseEnginePage />} />
          <Route path="/capital" element={<CapitalEnginePage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
