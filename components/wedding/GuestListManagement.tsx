import React, { useState } from 'react';
import { Guest } from '../../types';
import PlusIcon from '../icons/PlusIcon';
import TrashIcon from '../icons/TrashIcon';

interface GuestListManagementProps {
    guests: Guest[];
    onUpdateGuests: (guests: Guest[]) => void;
}

const GuestListManagement: React.FC<GuestListManagementProps> = ({ guests: initialGuests, onUpdateGuests }) => {
    const [guests, setGuests] = useState(initialGuests);
    
    const handleAddGuest = () => {
        const newGuest: Guest = { id: `g${Date.now()}`, name: 'New Guest', side: 'both', status: 'pending', group: 'Unassigned' };
        const newGuests = [...guests, newGuest];
        setGuests(newGuests);
        onUpdateGuests(newGuests);
    };
    
    const handleUpdateGuest = (id: string, field: keyof Guest, value: string) => {
        const newGuests = guests.map(g => g.id === id ? { ...g, [field]: value } : g);
        setGuests(newGuests);
        onUpdateGuests(newGuests);
    };

    const handleDeleteGuest = (id: string) => {
        const newGuests = guests.filter(g => g.id !== id);
        setGuests(newGuests);
        onUpdateGuests(newGuests);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-theme-text-secondary">Manage your wedding guest list.</p>
                <button onClick={handleAddGuest} className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90">
                    <PlusIcon className="h-5 w-5" /> Add Guest
                </button>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Name</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Side</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {guests.map(guest => (
                             <tr key={guest.id} className="border-b border-theme-border text-sm text-theme-text-primary">
                                <td className="p-2">
                                    <input type="text" value={guest.name} onChange={e => handleUpdateGuest(guest.id, 'name', e.target.value)} className="w-full bg-theme-border p-2 rounded-md" />
                                </td>
                                <td className="p-2">
                                    <select value={guest.side} onChange={e => handleUpdateGuest(guest.id, 'side', e.target.value)} className="w-full bg-theme-border p-2 rounded-md">
                                        <option value="bride">Bride</option>
                                        <option value="groom">Groom</option>
                                        <option value="both">Both</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <select value={guest.status} onChange={e => handleUpdateGuest(guest.id, 'status', e.target.value)} className="w-full bg-theme-border p-2 rounded-md">
                                        <option value="pending">Pending</option>
                                        <option value="invited">Invited</option>
                                        <option value="attending">Attending</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                </td>
                                <td className="p-2">
                                    <button onClick={() => handleDeleteGuest(guest.id)} className="text-red-500 hover:text-red-400 p-2"><TrashIcon className="h-5 w-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GuestListManagement;
