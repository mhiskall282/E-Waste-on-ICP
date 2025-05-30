import React from 'react';
import { MapPinIcon, PhoneIcon, MailIcon } from 'lucide-react';

interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  certifications: string[];
  acceptedItems: string[];
}

const mockCenters: RecyclingCenter[] = [
  {
    id: '1',
    name: 'EcoTech Recycling Solutions',
    address: '123 Green Street, Eco City, EC 12345',
    phone: '+1 (555) 123-4567',
    email: 'contact@ecotech.com',
    certifications: ['ISO 14001', 'R2 Certified', 'e-Stewards'],
    acceptedItems: ['Computers', 'Smartphones', 'Tablets', 'Printers']
  },
  {
    id: '2',
    name: 'Global E-Waste Management',
    address: '456 Recycling Ave, Green Valley, GV 67890',
    phone: '+1 (555) 987-6543',
    email: 'info@globalewaste.com',
    certifications: ['ISO 9001', 'NAID AAA Certified'],
    acceptedItems: ['TVs', 'Monitors', 'Gaming Consoles', 'Office Equipment']
  },
  // Add more centers as needed
];

const RecyclingCentersPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-icp-deepBlue mb-6">Recycling Centers</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCenters.map((center) => (
          <div key={center.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{center.name}</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                  <span className="text-gray-600">{center.address}</span>
                </div>
                
                <div className="flex items-center">
                  <PhoneIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${center.phone}`} className="text-icp-purple hover:text-icp-deepBlue">
                    {center.phone}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <MailIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`mailto:${center.email}`} className="text-icp-purple hover:text-icp-deepBlue">
                    {center.email}
                  </a>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {center.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Accepted Items</h4>
                <div className="flex flex-wrap gap-2">
                  {center.acceptedItems.map((item) => (
                    <span
                      key={item}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
              <button className="w-full bg-icp-purple hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300">
                Schedule Drop-off
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecyclingCentersPage;