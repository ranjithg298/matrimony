

import React, { useState, useMemo } from 'react';
import { Profile } from '../../types';
import UserTable from './UserTable';
import SearchIcon from '../icons/SearchIcon';

interface VendorsManagementProps {
    allProfiles: Profile[];
    onUpdateProfiles: (profiles: Profile[]) => void;
}

const VendorsManagement: React.FC<VendorsManagementProps> = ({ allProfiles, onUpdateProfiles }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleAction = (action: string, userId: string) => {
        let updatedProfiles: Profile[];
        switch (action) {
            case 'remove':
                if (!window.confirm('Are you sure you want to remove this vendor permanently?')) return;
                updatedProfiles = allProfiles.filter(p => p.id !== userId);
                break;
            case 'suspend':
                updatedProfiles = allProfiles.map(p => p.id === userId ? { ...p, status: 'suspended' } : p);
                break;
            case 'enable':
                updatedProfiles = allProfiles.map(p => p.id === userId ? { ...p, status: 'active' } : p);
                break;
            default:
                return;
        }
        onUpdateProfiles(updatedProfiles);
    };
    
    const vendors = useMemo(() => allProfiles.filter(p => p.role === 'vendor'), [allProfiles]);

    const filteredVendors = useMemo(() => {
        if (!searchTerm) return vendors;
        const lowercasedFilter = searchTerm.toLowerCase();
        return vendors.filter(vendor =>
            vendor.name.toLowerCase().includes(lowercasedFilter) ||
            vendor.email.toLowerCase().includes(lowercasedFilter)
        );
    }, [vendors, searchTerm]);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                 <p className="text-sm text-theme-text-secondary">Manage all registered vendors on the platform.</p>
            </div>
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-theme-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by vendor name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                    />
                </div>
            </div>
            <UserTable users={filteredVendors} onAction={handleAction} />
        </div>
    );
};

export default VendorsManagement;