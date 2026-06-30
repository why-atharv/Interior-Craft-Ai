import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import RoomSetupWizard from './pages/RoomSetupWizard';
import Dashboard from './pages/Dashboard';
import PricingPage from './pages/PricingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/templates" element={<TemplateSelection />} />
        <Route path="/setup" element={<RoomSetupWizard />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/app" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
