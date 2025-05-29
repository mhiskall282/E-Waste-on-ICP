import { Device, DeviceStatus } from '../types';
import { addDays, subDays } from 'date-fns';

const generateMockDevices = (): Device[] => {
  const statuses: DeviceStatus[] = ['Manufactured', 'Sold', 'In Use', 'Recycled'];
  const manufacturers = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo'];
  const models = {
    Apple: ['iPhone 13', 'MacBook Pro', 'iPad Air'],
    Samsung: ['Galaxy S21', 'Galaxy Tab S7', 'Galaxy Book'],
    Dell: ['XPS 13', 'Latitude 5420', 'Precision 5560'],
    HP: ['Spectre x360', 'EliteBook 840', 'ZBook Studio'],
    Lenovo: ['ThinkPad X1', 'Yoga 9i', 'Legion 7']
  };

  const devices: Device[] = [];
  const now = new Date();

  for (let i = 1; i <= 50; i++) {
    const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
    const model = models[manufacturer as keyof typeof models][Math.floor(Math.random() * 3)];
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const currentStatus = statuses[statusIndex];
    
    const createdAt = subDays(now, Math.floor(Math.random() * 365)).toISOString();
    const updatedAt = addDays(new Date(createdAt), Math.floor(Math.random() * 30)).toISOString();
    
    const statusHistory = [];
    for (let j = 0; j <= statusIndex; j++) {
      statusHistory.push({
        status: statuses[j],
        timestamp: addDays(new Date(createdAt), j * 10).toISOString(),
        notes: `Status updated to ${statuses[j]}`
      });
    }

    devices.push({
      id: `DEV-${String(i).padStart(4, '0')}`,
      model,
      manufacturer,
      currentStatus,
      statusHistory,
      createdAt,
      updatedAt
    });
  }

  return devices;
};

export const mockDevices = generateMockDevices();