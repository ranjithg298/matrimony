import React from 'react';
import { StaffMember } from '../../types';
import UserTable from './UserTable';

interface StaffManagementProps {
    initialStaff: StaffMember[];
    onAction: (action: string, userId: string) => void;
}

const StaffManagement: React.FC<StaffManagementProps> = ({ initialStaff, onAction }) => {
    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">
                Manage staff accounts. Use the "+ Create User/Staff" button in the header to add new members.
            </p>
            <UserTable users={initialStaff} onAction={onAction} />
        </div>
    );
};

export default StaffManagement;