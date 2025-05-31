import React from 'react';
import { useDevices } from '../context/DeviceContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BarChart2Icon, TrendingUpIcon, RecycleIcon } from 'lucide-react';
import StatsCard from '../components/StatsCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  const { devices } = useDevices();

  const recyclingData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Devices Recycled',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#7C3AED',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Recycling Trends',
      },
    },
  };

  const stats = {
    totalDevices: devices.length,
    recycledDevices: devices.filter(d => d.currentStatus === 'Recycled').length,
    recyclingRate: devices.length > 0
      ? ((devices.filter(d => d.currentStatus === 'Recycled').length / devices.length) * 100).toFixed(1)
      : '0'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-icp-deepBlue mb-6">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Devices"
          value={stats.totalDevices}
          icon={BarChart2Icon}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Recycled Devices"
          value={stats.recycledDevices}
          icon={RecycleIcon}
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Recycling Rate"
          value={`${stats.recyclingRate}%`}
          icon={TrendingUpIcon}
          trend={{ value: 10, isPositive: true }}
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <Line options={options} data={recyclingData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;