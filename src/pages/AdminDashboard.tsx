import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDevices } from '../context/DeviceContext';
import { 
  Users, 
  Factory, 
  Recycle, 
  AlertTriangle, 
  Settings, 
  Shield, 
  Activity,
  RefreshCw
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DeviceTable from '../components/DeviceTable';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { devices } = useDevices();

  const stats = {
    totalUsers: 156,
    activeManufacturers: 23,
    recyclingRate: 78.5,
    pendingApprovals: 12,
    systemHealth: 98.2,
    totalDevices: devices.length,
    activeDevices: devices.filter(d => d.currentStatus === 'In Use').length,
    criticalAlerts: 3
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-icp-deepBlue">Admin Dashboard</h2>
          <p className="text-gray-600">System Overview and Management</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center px-4 py-2 bg-icp-purple text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Shield className="h-5 w-5 mr-2" />
            Security Audit
          </button>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-opacity-90 transition-colors">
            <Settings className="h-5 w-5 mr-2" />
            System Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={Users}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Manufacturers"
          value={stats.activeManufacturers}
          icon={Factory}
        />
        <StatsCard
          title="Recycling Rate"
          value={`${stats.recyclingRate}%`}
          icon={Recycle}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatsCard
          title="Critical Alerts"
          value={stats.criticalAlerts}
          icon={AlertTriangle}
          trend={{ value: 2, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">System Health</h3>
            <button className="text-icp-purple hover:text-icp-deepBlue">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Performance</span>
              <span className="text-green-600 font-medium">98.2% Uptime</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Status</span>
              <span className="text-green-600 font-medium">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Memory Usage</span>
              <span className="text-yellow-600 font-medium">76%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Storage</span>
              <span className="text-green-600 font-medium">42% Used</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              { action: 'New manufacturer registered', time: '5 minutes ago', type: 'info' },
              { action: 'System backup completed', time: '1 hour ago', type: 'success' },
              { action: 'Security alert detected', time: '2 hours ago', type: 'warning' },
              { action: 'Database optimization completed', time: '3 hours ago', type: 'info' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full ${
                    activity.type === 'info' ? 'bg-blue-500' :
                    activity.type === 'success' ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`} />
                  <span className="text-gray-700">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Devices</h3>
        <DeviceTable 
          devices={devices.slice(0, 5)} 
          onEdit={(device) => console.log('Edit device:', device)}
          onDelete={(deviceId) => console.log('Delete device:', deviceId)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;