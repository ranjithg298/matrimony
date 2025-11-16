
import React from 'react';
import { Profile } from '../../types';

interface ApprovalsManagementProps {
    allProfiles: Profile[];
    onUpdateProfiles: (profiles: Profile[]) => void;
    onCreateNotification: (userId: string, message: string) => void;
}

const ApprovalsManagement: React.FC<ApprovalsManagementProps> = ({ allProfiles, onUpdateProfiles, onCreateNotification }) => {
    const pendingProfiles = allProfiles.filter(p => p.approvalStatus === 'pending');

    const handleApproval = (userId: string, action: 'approved' | 'rejected') => {
        const updatedProfiles = allProfiles.map(profile => {
            if (profile.id === userId) {
                return { ...profile, approvalStatus: action };
            }
            return profile;
        });

        onUpdateProfiles(updatedProfiles);
        
        const user = allProfiles.find(p => p.id === userId);
        if (user) {
            const message = action === 'approved' 
                ? 'Congratulations! Your profile has been approved.' 
                : 'Your profile registration has been rejected. Please contact support for more information.';
            onCreateNotification(userId, message);
        }
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">
                Review and approve new member registrations to grant them access to the platform.
            </p>
            {pendingProfiles.length === 0 ? (
                <div className="text-center p-8 bg-theme-bg/50 rounded-lg border border-theme-border">
                    <p className="text-theme-text-secondary">No members are currently pending approval.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-theme-bg/50">
                            <tr className="border-b border-theme-border">
                                <th className="p-3 text-sm font-semibold text-theme-text-secondary">User</th>
                                <th className="p-3 text-sm font-semibold text-theme-text-secondary">Email</th>
                                <th className="p-3 text-sm font-semibold text-theme-text-secondary">Role</th>
                                <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pendingProfiles.map(profile => (
                                <tr key={profile.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                    <td className="p-3 flex items-center gap-3">
                                        <img src={profile.photo} alt={profile.name} className="h-8 w-8 rounded-full object-cover" />
                                        {profile.name}
                                    </td>
                                    <td className="p-3">{profile.email}</td>
                                    <td className="p-3 capitalize">{profile.role}</td>
                                    <td className="p-3 space-x-2">
                                        <button 
                                            onClick={() => handleApproval(profile.id, 'approved')} 
                                            className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full"
                                        >
                                            Approve
                                        </button>
                                        <button 
                                            onClick={() => handleApproval(profile.id, 'rejected')} 
                                            className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApprovalsManagement;
