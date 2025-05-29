import React from 'react';
import Dashboard from '../components/Dashboard';
import DeviceRegistrationForm from '../components/DeviceRegistrationForm';
import DeviceListView from '../components/DeviceListView';
import StatusUpdatePanel from '../components/StatusUpdatePanel';

const HomePage: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <section className="mb-8">
            <Dashboard />
          </section>
          <section>
            <DeviceListView />
          </section>
        </div>
        <div className="space-y-8">
          <section>
            <DeviceRegistrationForm />
          </section>
          <section>
            <StatusUpdatePanel />
          </section>
        </div>
      </div>
    </main>
  );
};

export default HomePage;