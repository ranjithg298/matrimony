import React from 'react';
import HeartIcon from '../components/icons/HeartIcon';

interface MaintenancePageProps {
    message: string;
}

const MaintenancePage: React.FC<MaintenancePageProps> = ({ message }) => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary flex items-center justify-center p-4">
      <div className="text-center">
         <HeartIcon className="h-16 w-16 text-theme-accent-primary mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Under Maintenance</h1>
        <p className="text-theme-text-secondary max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
};

export default MaintenancePage;
