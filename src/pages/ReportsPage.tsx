import React from 'react';
import { useDevices } from '../context/DeviceContext';
import { FileTextIcon, DownloadIcon, FilterIcon } from 'lucide-react';
import SearchBar from '../components/SearchBar';

const ReportsPage: React.FC = () => {
  const { devices } = useDevices();
  const [searchTerm, setSearchTerm] = React.useState('');

  const reports = [
    {
      id: '1',
      title: 'Monthly Recycling Summary',
      description: 'Overview of all recycling activities in the current month',
      date: '2024-02-01',
      type: 'summary'
    },
    {
      id: '2',
      title: 'Device Lifecycle Analysis',
      description: 'Detailed analysis of device lifecycles and disposal patterns',
      date: '2024-02-15',
      type: 'analysis'
    },
    {
      id: '3',
      title: 'Environmental Impact Report',
      description: 'Assessment of environmental benefits from recycling efforts',
      date: '2024-02-28',
      type: 'impact'
    }
  ];

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-icp-deepBlue">Reports</h2>
        <div className="flex space-x-4">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search reports..."
          />
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
            <FilterIcon className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <p className="text-xs text-gray-500">Generated on {new Date(report.date).toLocaleDateString()}</p>
                </div>
                <FileTextIcon className="h-6 w-6 text-icp-purple" />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button className="w-full flex items-center justify-center px-4 py-2 bg-icp-purple text-white rounded-md hover:bg-opacity-90 transition-colors">
                <DownloadIcon className="h-5 w-5 mr-2" />
                Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;