import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Settings2Icon,
  BellIcon,
  ShieldIcon,
  PaletteIcon,
  UserIcon,
  SaveIcon
} from 'lucide-react';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState({
    email: true,
    push: true,
    weekly: false
  });
  const [theme, setTheme] = React.useState('light');

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold text-icp-deepBlue mb-6">Settings</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <UserIcon className="h-6 w-6 text-icp-purple" />
              <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={user?.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
                />
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <BellIcon className="h-6 w-6 text-icp-purple" />
              <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-icp-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-icp-purple"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Push Notifications</p>
                  <p className="text-sm text-gray-500">Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={() => handleNotificationChange('push')}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-icp-purple/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-icp-purple"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <PaletteIcon className="h-6 w-6 text-icp-purple" />
              <h3 className="text-lg font-medium text-gray-900">Appearance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-icp-purple"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <ShieldIcon className="h-6 w-6 text-icp-purple" />
              <h3 className="text-lg font-medium text-gray-900">Security</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-sm font-medium text-icp-purple bg-white border border-icp-purple rounded-md hover:bg-icp-purple hover:text-white transition-colors">
                Change Password
              </button>
              <button className="w-full px-4 py-2 text-sm font-medium text-icp-purple bg-white border border-icp-purple rounded-md hover:bg-icp-purple hover:text-white transition-colors">
                Enable Two-Factor Auth
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4 mb-6">
              <Settings2Icon className="h-6 w-6 text-icp-purple" />
              <h3 className="text-lg font-medium text-gray-900">Advanced</h3>
            </div>
            <div className="space-y-4">
              <button className="w-full px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button className="flex items-center px-6 py-3 bg-icp-purple text-white font-medium rounded-lg hover:bg-opacity-90 transition-colors">
          <SaveIcon className="h-5 w-5 mr-2" />
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;