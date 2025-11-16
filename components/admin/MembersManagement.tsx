

import React, { useState, useMemo } from 'react';
import { Profile } from '../../types';
import UserTable from './UserTable';
import SearchIcon from '../icons/SearchIcon';

interface MembersManagementProps {
    allProfiles: Profile[];
    onUpdateProfiles: (profiles: Profile[]) => void;
}

const MembersManagement: React.FC<MembersManagementProps> = ({ allProfiles, onUpdateProfiles }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleAction = (action: string, userId: string) => {
        let updatedProfiles: Profile[] = [];
        if (action === 'remove') {
            if (window.confirm('Are you sure you want to remove this user permanently?')) {
                updatedProfiles = allProfiles.filter(p => p.id !== userId);
            } else {
                return; // Do nothing if user cancels
            }
        } else if (action === 'suspend') {
            updatedProfiles = allProfiles.map(p => p.id === userId ? { ...p, status: 'suspended' } : p);
        } else if (action === 'enable') {
            updatedProfiles = allProfiles.map(p => p.id === userId ? { ...p, status: 'active' } : p);
        }
        onUpdateProfiles(updatedProfiles);
    };

    const filteredProfiles = useMemo(() => {
        if (!searchTerm) return allProfiles;
        const lowercasedFilter = searchTerm.toLowerCase();
        return allProfiles.filter(profile =>
            profile.name.toLowerCase().includes(lowercasedFilter) ||
            profile.email.toLowerCase().includes(lowercasedFilter)
        );
    }, [allProfiles, searchTerm]);

    return (
        <div>
            <div className="mb-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-theme-text-secondary" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-theme-bg border border-theme-border rounded-lg text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-theme-accent-primary"
                    />
                </div>
            </div>
            <UserTable users={filteredProfiles} onAction={handleAction} />
        </div>
    );
};

export default MembersManagement;