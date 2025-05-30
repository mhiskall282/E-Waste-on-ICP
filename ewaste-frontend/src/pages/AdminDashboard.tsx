import React from 'react';
import { useDevices } from '../context/DeviceContext';
import { Users, Settings, Shield, Activity } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DeviceTable from '../components/DeviceTable';

const AdminDashboard: React.FC = () => {
  const { devices } = useDevices();

  const adminStats = {
    totalUsers: 156,
    activeDevices: devices.length,
    systemHealth: '98%',
    pendingApprovals: 12
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-icp-deepBlue mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={adminStats.totalUsers}
          icon={Users}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Active Devices"
          value={adminStats.activeDevices}
          icon={Activity}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="System Health"
          value={adminStats.systemHealth}
          icon={Settings}
        />
        <StatsCard
          title="Pending Approvals"
          value={adminStats.pendingApprovals}
          icon={Shield}
          trend={{ value: 3, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="h-10 w-10 rounded-full bg-icp-purple/10 flex items-center justify-center">
                  <Activity className="h-5 w-5 text-icp-purple" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    New device registered
                  </p>
                  <p className="text-sm text-gray-500">
                    Device ID: DEV-{String(i + 1).padStart(4, '0')}
                  </p>
                </div>
                <span className="ml-auto text-sm text-gray-500">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">System Metrics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">CPU Usage</span>
                <span className="text-sm font-medium text-gray-900">65%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Memory Usage</span>
                <span className="text-sm font-medium text-gray-900">82%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Storage</span>
                <span className="text-sm font-medium text-gray-900">43%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-500 rounded-full" style={{ width: '43%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">All Devices</h3>
        <DeviceTable devices={devices} />
      </div>
    </div>
  );
};

export default AdminDashboard;