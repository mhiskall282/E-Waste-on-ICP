import React from 'react';
import { DeviceStatus } from '../types';

interface StatusBadgeProps {
  status: DeviceStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'Manufactured':
        return 'bg-status-manufactured text-green-900';
      case 'Sold':
        return 'bg-status-sold text-yellow-900';
      case 'In Use':
        return 'bg-status-inUse text-white';
      case 'Recycled':
        return 'bg-status-recycled text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()} ${className}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;