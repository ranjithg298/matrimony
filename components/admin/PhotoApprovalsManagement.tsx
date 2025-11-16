
import React from 'react';
import { Profile } from '../../types';

interface PhotoApprovalsManagementProps {
    profiles: Profile[];
    onUpdateProfiles: (profiles: Profile[]) => void;
}

const PhotoApprovalsManagement: React.FC<PhotoApprovalsManagementProps> = ({ profiles, onUpdateProfiles }) => {
    // Get all photos with 'pending' status from all user galleries
    const pendingPhotos = profiles.flatMap(user => 
        user.gallery
            .filter(photo => photo.status === 'pending')
            .map(photo => ({
                userId: user.id,
                userName: user.name,
                photoUrl: photo.url
            }))
    );

    const handlePhotoAction = (userId: string, photoUrl: string, action: 'approved' | 'rejected') => {
        const updatedProfiles = profiles.map(user => {
            if (user.id === userId) {
                const updatedGallery = user.gallery.map(photo => {
                    if (photo.url === photoUrl) {
                        return { ...photo, status: action };
                    }
                    return photo;
                });
                return { ...user, gallery: updatedGallery };
            }
            return user;
        });
        onUpdateProfiles(updatedProfiles);
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">
                Review and approve or reject photos uploaded by members to their galleries.
            </p>
            {pendingPhotos.length === 0 ? (
                <div className="text-center p-8 bg-theme-bg/50 rounded-lg border border-theme-border">
                    <p className="text-theme-text-secondary">No photos are currently pending approval.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {pendingPhotos.map(({ userId, userName, photoUrl }, index) => (
                        <div key={`${userId}-${index}`} className="bg-theme-bg/50 p-3 rounded-lg border border-theme-border">
                            <img src={photoUrl} alt={`Pending photo from ${userName}`} className="w-full h-48 object-cover rounded-md mb-3" />
                            <p className="text-sm font-semibold text-theme-text-primary mb-3">From: {userName}</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handlePhotoAction(userId, photoUrl, 'approved')} 
                                    className="w-full text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-2 px-3 rounded-md"
                                >
                                    Approve
                                </button>
                                <button 
                                    onClick={() => handlePhotoAction(userId, photoUrl, 'rejected')} 
                                    className="w-full text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-2 px-3 rounded-md"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PhotoApprovalsManagement;
