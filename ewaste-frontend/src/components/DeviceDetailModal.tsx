import React from 'react';
import { Device } from '../types';
import StatusBadge from './StatusBadge';
import DeviceTimeline from './DeviceTimeline';
import { XIcon } from 'lucide-react';

interface DeviceDetailModalProps {
  device: Device;
  onClose: () => void;
}

const DeviceDetailModal: React.FC<DeviceDetailModalProps> = ({ device, onClose }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-icp-deepBlue">Device Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">Device ID</p>
            <p className="text-lg font-medium">{device.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Model</p>
            <p className="text-lg font-medium">{device.model}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Manufacturer</p>
            <p className="text-lg font-medium">{device.manufacturer || 'N/A'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Current Status</p>
            <StatusBadge status={device.currentStatus} className="mt-1" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Created At</p>
            <p className="text-base">{formatDate(device.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Updated</p>
            <p className="text-base">{formatDate(device.updatedAt)}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <DeviceTimeline device={device} />
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailModal;