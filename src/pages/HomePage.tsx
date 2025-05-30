import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecycleIcon, ArrowRightIcon } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <RecycleIcon className="h-16 w-16 text-icp-purple" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-icp-deepBlue mb-6">
            E-Waste Recycling Tracker
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Track and manage your electronic waste responsibly with our comprehensive recycling solution.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center px-6 py-3 bg-icp-purple text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Get Started
              <ArrowRightIcon className="ml-2 h-5 w-5" />
            </button>
            <button
              onClick={() => navigate('/recycling-centers')}
              className="inline-flex items-center px-6 py-3 bg-white text-icp-purple font-medium rounded-lg border-2 border-icp-purple hover:bg-icp-purple hover:text-white transition-colors"
            >
              Find Recycling Centers
            </button>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-icp-deepBlue mb-4">Track Devices</h3>
            <p className="text-gray-600">Monitor your electronic devices throughout their lifecycle.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-icp-deepBlue mb-4">Manage Recycling</h3>
            <p className="text-gray-600">Efficiently manage your e-waste recycling process.</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-icp-deepBlue mb-4">Analytics</h3>
            <p className="text-gray-600">Get insights into your recycling impact and patterns.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;