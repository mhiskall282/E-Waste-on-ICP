import React from 'react';
import { useDevices } from '../context/DeviceContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { format, subMonths } from 'date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsPage: React.FC = () => {
  const { devices } = useDevices();

  // Prepare data for charts
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = subMonths(new Date(), i);
    return format(date, 'MMM yyyy');
  }).reverse();

  const devicesByStatus = {
    Manufactured: devices.filter(d => d.currentStatus === 'Manufactured').length,
    Sold: devices.filter(d => d.currentStatus === 'Sold').length,
    'In Use': devices.filter(d => d.currentStatus === 'In Use').length,
    Recycled: devices.filter(d => d.currentStatus === 'Recycled').length,
  };

  const recyclingTrendData = {
    labels: last6Months,
    datasets: [
      {
        label: 'Recycled Devices',
        data: last6Months.map(() => Math.floor(Math.random() * 20)),
        borderColor: '#8b5cf6',
        tension: 0.4,
      },
    ],
  };

  const statusDistributionData = {
    labels: Object.keys(devicesByStatus),
    datasets: [
      {
        data: Object.values(devicesByStatus),
        backgroundColor: ['#4ade80', '#facc15', '#3b82f6', '#8b5cf6'],
      },
    ],
  };

  const manufacturerData = {
    labels: ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo'],
    datasets: [
      {
        label: 'Devices by Manufacturer',
        data: [12, 19, 8, 15, 10],
        backgroundColor: [
          'rgba(94, 211, 243, 0.8)',
          'rgba(142, 68, 236, 0.8)',
          'rgba(46, 49, 72, 0.8)',
          'rgba(74, 222, 128, 0.8)',
          'rgba(250, 204, 21, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-icp-deepBlue mb-8">Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recycling Trend */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recycling Trend</h3>
          <Line
            data={recyclingTrendData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom' as const,
                },
              },
            }}
          />
        </div>

        {/* Status Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Status Distribution</h3>
          <Doughnut
            data={statusDistributionData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom' as const,
                },
              },
            }}
          />
        </div>

        {/* Devices by Manufacturer */}
        <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Devices by Manufacturer</h3>
          <Bar
            data={manufacturerData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;