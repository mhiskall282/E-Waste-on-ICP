import React, { useState } from 'react';
import { useDevices } from '../context/DeviceContext';
import { DeviceStatus } from '../types';
import { ClipboardCheckIcon } from 'lucide-react';

const StatusUpdatePanel: React.FC = () => {
  const { devices, updateDeviceStatus } = useDevices();
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [status, setStatus] = useState<DeviceStatus>('Manufactured');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  
  const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDeviceId(e.target.value);
  };
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value as DeviceStatus);
  };
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDeviceId) return;
    
    updateDeviceStatus(selectedDeviceId, {
      status,
      notes
    });
    
    setSuccess(true);
    setNotes('');
    
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  
  const selectedDevice = devices.find(d => d.id === selectedDeviceId);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex items-center mb-4">
        <ClipboardCheckIcon className="text-icp-purple h-6 w-6 mr-2" />
        <h2 className="text-xl font-semibold text-icp-deepBlue">Update Device Status</h2>
      </div>
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 animate-slide-in">
          Status updated successfully!
        </div>
      )}
      
      {devices.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No devices available. Register a device first to update its status.
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="device" className="block text-sm font-medium text-gray-700 mb-1">
              Select Device
            </label>
            <select
              id="device"
              value={selectedDeviceId}
              onChange={handleDeviceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
              required
            >
              <option value="">-- Select a device --</option>
              {devices.map(device => (
                <option key={device.id} value={device.id}>
                  {device.id} - {device.model}
                </option>
              ))}
            </select>
          </div>
          
          {selectedDevice && (
            <>
              <div className="mb-4">
                <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Status
                </label>
                <input
                  type="text"
                  id="currentStatus"
                  value={selectedDevice.currentStatus}
                  className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  New Status
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={handleStatusChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
                  required
                >
                  <option value="Manufactured">Manufactured</option>
                  <option value="Sold">Sold</option>
                  <option value="In Use">In Use</option>
                  <option value="Recycled">Recycled</option>
                </select>
              </div>
              
              <div className="mb-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={handleNotesChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
                  rows={3}
                  placeholder="Add any relevant notes about this status change"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-icp-purple hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
              >
                Update Status
              </button>
            </>
          )}
        </form>
      )}
    </div>
  );
};

export default StatusUpdatePanel;