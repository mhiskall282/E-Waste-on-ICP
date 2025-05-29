import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <DeviceProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </DeviceProvider>
    </Router>
  );
}

export default App;