import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext';
import HomePage from './pages/HomePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ManufacturerPage from './pages/ManufacturerPage';
import RecyclingCentersPage from './pages/RecyclingCentersPage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <DeviceProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/manufacturers" element={<ManufacturerPage />} />
              <Route path="/recycling-centers" element={<RecyclingCentersPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </DeviceProvider>
    </Router>
  );
}