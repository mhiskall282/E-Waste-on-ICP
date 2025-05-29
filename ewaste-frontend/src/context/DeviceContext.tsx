import React, { createContext, useContext, useState, useEffect } from 'react';
import { Device, DeviceStatus, StatusUpdate } from '../types';
import { mockDevices } from '../data/mockData';

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Omit<Device, 'createdAt' | 'updatedAt' | 'currentStatus' | 'statusHistory'>) => void;
  updateDeviceStatus: (deviceId: string, statusUpdate: Omit<StatusUpdate, 'timestamp'>) => void;
  getDevice: (deviceId: string) => Device | undefined;
  deleteDevice: (deviceId: string) => void;
  filteredDevices: Device[];
  setStatusFilter: (status: DeviceStatus | 'All') => void;
  setSearchTerm: (term: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const useDevices = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevices must be used within a DeviceProvider');
  }
  return context;
};

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [devices, setDevices] = useState<Device[]>(() => {
    const savedDevices = localStorage.getItem('devices');
    return savedDevices ? JSON.parse(savedDevices) : mockDevices;
  });
  
  const [statusFilter, setStatusFilter] = useState<DeviceStatus | 'All'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    localStorage.setItem('devices', JSON.stringify(devices));
  }, [devices]);
  
  const addDevice = (deviceData: Omit<Device, 'createdAt' | 'updatedAt' | 'currentStatus' | 'statusHistory'>) => {
    const now = new Date().toISOString();
    const newDevice: Device = {
      ...deviceData,
      currentStatus: 'Manufactured',
      statusHistory: [
        {
          status: 'Manufactured',
          timestamp: now,
          notes: 'Initial registration'
        }
      ],
      createdAt: now,
      updatedAt: now
    };
    
    setDevices(prev => [...prev, newDevice]);
  };
  
  const updateDeviceStatus = (deviceId: string, statusUpdate: Omit<StatusUpdate, 'timestamp'>) => {
    const now = new Date().toISOString();
    setDevices(prev => 
      prev.map(device => {
        if (device.id === deviceId) {
          const newStatusUpdate = {
            ...statusUpdate,
            timestamp: now
          };
          
          return {
            ...device,
            currentStatus: statusUpdate.status,
            statusHistory: [...device.statusHistory, newStatusUpdate],
            updatedAt: now
          };
        }
        return device;
      })
    );
  };
  
  const getDevice = (deviceId: string) => {
    return devices.find(device => device.id === deviceId);
  };
  
  const deleteDevice = (deviceId: string) => {
    setDevices(prev => prev.filter(device => device.id !== deviceId));
  };
  
  const filteredDevices = devices.filter(device => {
    const matchesStatus = statusFilter === 'All' || device.currentStatus === statusFilter;
    const matchesSearch = 
      device.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (device.manufacturer && device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });
  
  const value = {
    devices,
    addDevice,
    updateDeviceStatus,
    getDevice,
    deleteDevice,
    filteredDevices,
    setStatusFilter,
    setSearchTerm
  };
  
  return (
    <DeviceContext.Provider value={value}>
      {children}
    </DeviceContext.Provider>
  );
};