import React from 'react';
import { Device } from '../types';

interface DeviceTimelineProps {
  device: Device;
}

const DeviceTimeline: React.FC<DeviceTimelineProps> = ({ device }) => {
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
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Manufactured':
        return 'bg-status-manufactured';
      case 'Sold':
        return 'bg-status-sold';
      case 'In Use':
        return 'bg-status-inUse';
      case 'Recycled':
        return 'bg-status-recycled';
      default:
        return 'bg-gray-400';
    }
  };
  
  return (
    <div className="py-4">
      <h3 className="text-lg font-medium text-gray-700 mb-4">Device Timeline</h3>
      
      <div className="flow-root">
        <ul className="-mb-8">
          {device.statusHistory.map((update, idx) => (
            <li key={idx}>
              <div className="relative pb-8">
                {idx !== device.statusHistory.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  ></span>
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${getStatusColor(update.status)}`}
                    >
                      <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-800 font-medium">
                        Status changed to <span className="font-semibold">{update.status}</span>
                      </p>
                      {update.notes && (
                        <p className="mt-1 text-sm text-gray-500">{update.notes}</p>
                      )}
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {formatDate(update.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DeviceTimeline;