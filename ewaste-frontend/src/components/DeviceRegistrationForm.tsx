import React, { useState } from 'react';
import { useDevices } from '../context/DeviceContext';
import { DeviceFormData } from '../types';
import { QrCodeIcon } from 'lucide-react';

const DeviceRegistrationForm: React.FC = () => {
  const { addDevice } = useDevices();
  const [formData, setFormData] = useState<DeviceFormData>({
    id: '',
    model: '',
    manufacturer: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.id.trim()) {
      setError('Device ID is required');
      return;
    }
    
    if (!formData.model.trim()) {
      setError('Device model is required');
      return;
    }
    
    // Add the device
    try {
      addDevice(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        id: '',
        model: '',
        manufacturer: '',
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Failed to register device. Please try again.');
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <QrCodeIcon className="text-icp-purple h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold text-icp-deepBlue">Register New Device</h2>
      </div>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-slide-in">
          Device registered successfully!
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
            Device ID *
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
            placeholder="Enter unique device identifier"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
            Model *
          </label>
          <input
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
            placeholder="Enter device model"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="manufacturer" className="block text-sm font-medium text-gray-700 mb-1">
            Manufacturer
          </label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
            placeholder="Enter manufacturer name"
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-icp-deepBlue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
        >
          Register Device
        </button>
      </form>
    </div>
  );
};

export default DeviceRegistrationForm;