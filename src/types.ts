export interface Device {
  id: string;
  model: string;
  manufacturer?: string;
  currentStatus: 'In Use' | 'Pending' | 'Recycled';
  updatedAt: string;
}

export interface DeviceFormData {
  id: string;
  model: string;
  manufacturer?: string;
}