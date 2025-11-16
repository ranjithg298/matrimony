import React, { useState } from 'react';
import { Profile } from '../types';
import UserIcon from '../components/icons/UserIcon';
import HeartIcon from '../components/icons/HeartIcon';
import ClientDetailModal from '../components/ClientDetailModal';

interface VendorDashboardProps {
  vendor: Profile;
  clients: Profile[];
}

const KPICard: React.FC<{icon: React.ReactNode, label: string, value: string | number}> = ({icon, label, value}) => (
    <div className="bg-theme-surface p-4 rounded-lg flex items-center gap-4 border border-theme-border">
        <div className="bg-theme-border p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-theme-text-secondary text-sm">{label}</p>
            <p className="text-2xl font-bold text-theme-text-primary">{value}</p>
        </div>
    </div>
);

const AnalyticsChart: React.FC<{title: string}> = ({title}) => (
    <div className="bg-theme-surface p-6 rounded-xl shadow-lg border border-theme-border">
        <h3 className="text-xl font-semibold mb-4 text-theme-text-primary">{title}</h3>
        <div className="h-64 bg-theme-bg rounded-lg flex items-center justify-center text-theme-text-secondary">
            [ Chart Placeholder ]
        </div>
    </div>
);


const VendorDashboard: React.FC<VendorDashboardProps> = ({ vendor, clients }) => {
  const [selectedClient, setSelectedClient] = useState<Profile | null>(null);

  return (
    <>
      <div className="p-4 sm:p-6 lg:p-8 text-theme-text-primary">
        <h1 className="text-3xl font-bold mb-2">Vendor Dashboard</h1>
        <p className="text-theme-text-secondary mb-6">Welcome back, {vendor.name}!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard icon={<UserIcon className="h-6 w-6 text-theme-accent-secondary" />} label="Active Clients" value={clients.length} />
          <KPICard icon={<HeartIcon className="h-6 w-6 text-green-400" />} label="Success Rate" value="82%" />
          <KPICard icon={<span className="text-2xl font-bold text-yellow-400">₹</span>} label="Monthly Revenue" value="1,50,000" /> 
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 bg-theme-surface p-6 rounded-xl shadow-lg border border-theme-border">
            <h2 className="text-xl font-semibold mb-4">Your Clients</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-theme-border">
                    <th className="p-3">Name</th>
                    <th className="p-3">Age</th>
                    <th className="p-3">City</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map(client => (
                    <tr key={client.id} className="border-b border-theme-border hover:bg-theme-bg/50">
                      <td className="p-3 flex items-center gap-3">
                        <img src={client.photo} alt={client.name} className="h-8 w-8 rounded-full object-cover" />
                        {client.name}
                      </td>
                      <td className="p-3">{client.age}</td>
                      <td className="p-3">{client.city}</td>
                      <td className="p-3">
                        <button onClick={() => setSelectedClient(client)} className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-full">Manage</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           <div className="lg:col-span-2">
                <AnalyticsChart title="Client Acquisition" />
           </div>
        </div>
      </div>
      {selectedClient && (
        <ClientDetailModal 
          client={selectedClient}
          isOpen={!!selectedClient}
          onClose={() => setSelectedClient(null)}
        />
      )}
    </>
  );
};

export default VendorDashboard;