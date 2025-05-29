import React, { useState } from 'react';
import { useDevices } from '../context/DeviceContext';
import { format } from 'date-fns';
import { FileDownIcon, FilterIcon } from 'lucide-react';

const ReportsPage: React.FC = () => {
  const { devices } = useDevices();
  const [dateRange, setDateRange] = useState('last30');
  const [reportType, setReportType] = useState('status');

  const generateReport = () => {
    // In a real application, this would generate and download a CSV/PDF report
    console.log('Generating report...', { dateRange, reportType });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-icp-deepBlue mb-8">Generate Reports</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Range
            </label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
            >
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last90">Last 90 days</option>
              <option value="lastYear">Last year</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
            >
              <option value="status">Status Distribution</option>
              <option value="manufacturer">Manufacturer Analysis</option>
              <option value="recycling">Recycling Metrics</option>
              <option value="timeline">Device Timeline</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateReport}
          className="w-full md:w-auto bg-icp-purple hover:bg-opacity-90 text-white font-medium py-2 px-6 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          <FileDownIcon className="h-5 w-5 mr-2" />
          Generate Report
        </button>

        <div className="mt-12">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Reports</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[1, 2, 3].map((_, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {`Report_${format(new Date(), 'yyyyMMdd')}_${index + 1}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(new Date(), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Status Distribution
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-icp-purple hover:text-icp-deepBlue">
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;