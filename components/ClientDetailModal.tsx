
import React from 'react';
import { Profile } from '../types';

interface ClientDetailModalProps {
  isOpen: boolean;
  client: Profile;
  onClose: () => void;
}

const DetailItem: React.FC<{label: string, value: any}> = ({label, value}) => (
    <div>
        <p className="text-sm text-theme-text-secondary">{label}</p>
        <p className="font-medium text-theme-text-primary">{value}</p>
    </div>
);

const ClientDetailModal: React.FC<ClientDetailModalProps> = ({ isOpen, client, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-theme-surface rounded-lg shadow-xl w-full max-w-lg text-theme-text-primary border border-theme-border">
        <div className="p-6 border-b border-theme-border flex justify-between items-start">
            <div className="flex items-center gap-4">
                <img src={client.photo} alt={client.name} className="w-16 h-16 rounded-full object-cover"/>
                <div>
                    <h3 className="text-xl font-bold">{client.name}</h3>
                    <p className="text-theme-text-secondary">{client.age}, {client.city}</p>
                </div>
            </div>
            <button onClick={onClose} className="text-theme-text-secondary hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-4">
                <div>
                    <h4 className="font-semibold mb-2">About</h4>
                    <p className="text-theme-text-secondary">{client.bio}</p>
                </div>
                 <div>
                    <h4 className="font-semibold mb-2">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                    {client.interests.map(interest => (
                        <span key={interest} className="px-3 py-1 bg-theme-border text-theme-text-secondary text-sm rounded-full">
                        {interest}
                        </span>
                    ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold mb-2">Astrological Details</h4>
                    <div className="grid grid-cols-2 gap-4 bg-theme-bg/50 p-4 rounded-lg">
                        <DetailItem label="Vedic Rasi" value={client.customFields.rasi} />
                        <DetailItem label="Nakshatra" value={client.customFields.nakshatra} />
                    </div>
                </div>
            </div>
        </div>
         <div className="bg-theme-bg/50 p-4 flex justify-end rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-theme-border font-semibold hover:bg-theme-border/80">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientDetailModal;