import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DeviceProvider } from './context/DeviceContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ManufacturerPage from './pages/ManufacturerPage';
import RecyclingCentersPage from './pages/RecyclingCentersPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import AIAssistant from './pages/AIAssistant';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <DeviceProvider>
          <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/manufacturers" element={<ManufacturerPage />} />
                <Route path="/recycling-centers" element={<RecyclingCentersPage />} />
                <Route 
                  path="/admin/*" 
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/ai-assistant" element={<AIAssistant />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </DeviceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;