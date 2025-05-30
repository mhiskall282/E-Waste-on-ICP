import React from 'react';
import { Device } from '../types';
import StatusBadge from './StatusBadge';
import { format } from 'date-fns';
import { MoreVerticalIcon, EditIcon, TrashIcon } from 'lucide-react';

interface DeviceTableProps {
  devices: Device[];
  onEdit?: (device: Device) => void;
  onDelete?: (deviceId: string) => void;
}

const DeviceTable: React.FC<DeviceTableProps> = ({ devices, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col\" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Device ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Model
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Manufacturer
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Updated
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map((device) => (
            <tr key={device.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {device.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {device.model}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {device.manufacturer || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <StatusBadge status={device.currentStatus} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {format(new Date(device.updatedAt), 'MMM dd, yyyy HH:mm')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex items-center justify-end space-x-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(device)}
                      className="text-icp-purple hover:text-icp-deepBlue transition-colors"
                    >
                      <EditIcon className="h-5 w-5" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(device.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceTable;