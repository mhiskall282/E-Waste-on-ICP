import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Device } from '../types';

interface DeviceContextType {
  devices: Device[];
  addDevice: (device: Omit<Device, 'id' | 'currentStatus' | 'updatedAt'>) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
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
  const [devices, setDevices] = useState<Device[]>([
    {
      id: uuidv4(),
      model: 'iPhone 12',
      manufacturer: 'Apple',
      currentStatus: 'In Use',
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      model: 'Galaxy S21',
      manufacturer: 'Samsung',
      currentStatus: 'Recycled',
      updatedAt: new Date().toISOString()
    }
  ]);

  const addDevice = (device: Omit<Device, 'id' | 'currentStatus' | 'updatedAt'>) => {
    const newDevice: Device = {
      ...device,
      id: uuidv4(),
      currentStatus: 'In Use',
      updatedAt: new Date().toISOString()
    };
    setDevices(prev => [...prev, newDevice]);
  };

  const updateDevice = (id: string, updates: Partial<Device>) => {
    setDevices(prev =>
      prev.map(device =>
        device.id === id
          ? { ...device, ...updates, updatedAt: new Date().toISOString() }
          : device
      )
    );
  };

  const deleteDevice = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
  };

  return (
    <DeviceContext.Provider value={{ devices, addDevice, updateDevice, deleteDevice }}>
      {children}
    </DeviceContext.Provider>
  );
};