export type DeviceStatus = 'Manufactured' | 'Sold' | 'In Use' | 'Recycled';

export interface StatusUpdate {
  status: DeviceStatus;
  timestamp: string;
  notes?: string;
}

export interface Device {
  id: string;
  model: string;
  manufacturer?: string;
  currentStatus: DeviceStatus;
  statusHistory: StatusUpdate[];
  createdAt: string;
  updatedAt: string;
}

export interface DeviceFormData {
  id: string;
  model: string;
  manufacturer?: string;
}

export interface StatusUpdateFormData {
  status: DeviceStatus;
  notes?: string;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
  }[];
}

export interface DeviceAnalytics {
  totalDevices: number;
  recyclingRate: number;
  statusDistribution: Record<DeviceStatus, number>;
  manufacturerDistribution: Record<string, number>;
}