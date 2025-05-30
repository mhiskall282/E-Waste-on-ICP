import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useDevices } from '../context/DeviceContext';
import { UserIcon, DeviceIcon, RecycleIcon, BellIcon } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DeviceTable from '../components/DeviceTable';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { devices } = useDevices();

  const userStats = {
    totalDevices: devices.length,
    recycledDevices: devices.filter(d => d.currentStatus === 'Recycled').length,
    activeDevices: devices.filter(d => d.currentStatus === 'In Use').length,
    notifications: 3
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-icp-deepBlue">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Here's what's happening with your devices</p>
        </div>
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-12 h-12 rounded-full border-2 border-icp-purple"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Devices"
          value={userStats.totalDevices}
          icon={DeviceIcon}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Active Devices"
          value={userStats.activeDevices}
          icon={UserIcon}
        />
        <StatsCard
          title="Recycled Devices"
          value={userStats.recycledDevices}
          icon={RecycleIcon}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Notifications"
          value={userStats.notifications}
          icon={BellIcon}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6">Your Devices</h3>
        <DeviceTable devices={devices} />
      </div>
    </div>
  );
};

export default UserDashboard;