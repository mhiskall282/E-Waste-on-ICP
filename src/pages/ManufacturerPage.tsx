import React from 'react';
import { useDevices } from '../context/DeviceContext';
import { FactoryIcon, TrendingUpIcon, PackageIcon, AlertTriangleIcon } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DeviceTable from '../components/DeviceTable';
import SearchBar from '../components/SearchBar';

const ManufacturerPage: React.FC = () => {
  const { devices } = useDevices();
  const [searchTerm, setSearchTerm] = React.useState('');

  const manufacturerStats = React.useMemo(() => {
    const totalDevices = devices.length;
    const activeManufacturers = new Set(devices.map(d => d.manufacturer)).size;
    const recycledDevices = devices.filter(d => d.currentStatus === 'Recycled').length;
    const recyclingRate = totalDevices > 0 ? (recycledDevices / totalDevices) * 100 : 0;

    return {
      totalDevices,
      activeManufacturers,
      recyclingRate: recyclingRate.toFixed(1),
      qualityIssues: Math.floor(Math.random() * 10) // Simulated data
    };
  }, [devices]);

  const filteredDevices = devices.filter(device => 
    device.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-icp-deepBlue mb-6">Manufacturer Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Devices"
            value={manufacturerStats.totalDevices}
            icon={FactoryIcon}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Active Manufacturers"
            value={manufacturerStats.activeManufacturers}
            icon={PackageIcon}
          />
          <StatsCard
            title="Recycling Rate"
            value={`${manufacturerStats.recyclingRate}%`}
            icon={TrendingUpIcon}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Quality Issues"
            value={manufacturerStats.qualityIssues}
            icon={AlertTriangleIcon}
            trend={{ value: 3, isPositive: false }}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Device Inventory</h3>
          <div className="w-64">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search devices..."
            />
          </div>
        </div>

        <DeviceTable
          devices={filteredDevices}
          onEdit={(device) => console.log('Edit device:', device)}
          onDelete={(deviceId) => console.log('Delete device:', deviceId)}
        />
      </div>
    </div>
  );
};

export default ManufacturerPage;