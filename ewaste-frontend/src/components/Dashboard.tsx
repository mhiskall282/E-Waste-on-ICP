import React, { useMemo } from 'react';
import { useDevices } from '../context/DeviceContext';
import StatusBadge from './StatusBadge';
import { BarChart, BarChartIcon, RecycleIcon, TrendingUpIcon } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { devices } = useDevices();
  
  const stats = useMemo(() => {
    const statusCounts = {
      Manufactured: 0,
      Sold: 0,
      'In Use': 0,
      Recycled: 0
    };
    
    devices.forEach(device => {
      statusCounts[device.currentStatus]++;
    });
    
    const totalDevices = devices.length;
    const recyclingRate = totalDevices > 0 
      ? ((statusCounts.Recycled / totalDevices) * 100).toFixed(1) 
      : '0';
    
    return {
      totalDevices,
      statusCounts,
      recyclingRate
    };
  }, [devices]);
  
  // Calculate the max count for the chart scaling
  const maxCount = Math.max(...Object.values(stats.statusCounts), 1);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-xl font-semibold text-icp-deepBlue mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-icp-deepBlue to-icp-purple rounded-lg p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-icp-lightBlue text-sm font-medium">Total Devices</p>
              <h3 className="text-3xl font-bold mt-1">{stats.totalDevices}</h3>
            </div>
            <BarChartIcon className="h-10 w-10 text-icp-lightBlue opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-500 rounded-lg p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">Devices Recycled</p>
              <h3 className="text-3xl font-bold mt-1">{stats.statusCounts.Recycled}</h3>
            </div>
            <RecycleIcon className="h-10 w-10 text-emerald-100 opacity-80" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-amber-400 rounded-lg p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">Recycling Rate</p>
              <h3 className="text-3xl font-bold mt-1">{stats.recyclingRate}%</h3>
            </div>
            <TrendingUpIcon className="h-10 w-10 text-amber-100 opacity-80" />
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Device Status Distribution</h3>
        <div className="space-y-3">
          {Object.entries(stats.statusCounts).map(([status, count]) => (
            <div key={status} className="flex items-center">
              <StatusBadge status={status as any} className="w-28" />
              <div className="ml-2 flex-grow">
                <div className="h-7 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getStatusBarColor(status)} transition-all duration-500 ease-out`}
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  >
                    <span className="pl-2 text-white font-medium">{count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recently Updated Devices</h3>
        {devices.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No devices registered yet.</p>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <ul className="divide-y divide-gray-200">
              {devices
                .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
                .slice(0, 5)
                .map(device => (
                  <li key={device.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">{device.id}</p>
                        <p className="text-sm text-gray-500">{device.model}</p>
                      </div>
                      <StatusBadge status={device.currentStatus} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

function getStatusBarColor(status: string) {
  switch (status) {
    case 'Manufactured':
      return 'bg-status-manufactured';
    case 'Sold':
      return 'bg-status-sold';
    case 'In Use':
      return 'bg-status-inUse';
    case 'Recycled':
      return 'bg-status-recycled';
    default:
      return 'bg-gray-400';
  }
}

export default Dashboard;