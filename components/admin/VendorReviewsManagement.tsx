
import React, { useState } from 'react';
import { VendorReview, Profile } from '../../types';
import StarRating from '../StarRating';

interface VendorReviewsManagementProps {
    reviews: VendorReview[];
    profiles: Profile[];
    onUpdateReviews: (reviews: VendorReview[]) => void;
}

const VendorReviewsManagement: React.FC<VendorReviewsManagementProps> = ({ reviews: initialReviews, profiles, onUpdateReviews }) => {
    const [reviews, setReviews] = useState(initialReviews);

    const handleReviewAction = (reviewId: string, action: 'approved' | 'rejected') => {
        const updatedReviews = reviews.map(review => {
            if (review.id === reviewId) {
                return { ...review, status: action };
            }
            return review;
        });
        setReviews(updatedReviews);
        onUpdateReviews(updatedReviews);
    };

    const getVendorName = (vendorId: string) => {
        const vendor = profiles.find(p => p.id === vendorId);
        return vendor ? vendor.name : 'Unknown Vendor';
    };

    return (
        <div>
            <p className="text-sm text-theme-text-secondary mb-4">
                Approve or reject reviews submitted by users for vendors. Approved reviews will be publicly visible on the vendor's detail page.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-theme-bg/50">
                        <tr className="border-b border-theme-border">
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Vendor</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">User</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Rating</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Comment</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Status</th>
                            <th className="p-3 text-sm font-semibold text-theme-text-secondary">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reviews.map(review => (
                            <tr key={review.id} className="border-b border-theme-border hover:bg-theme-surface/50 text-sm text-theme-text-primary">
                                <td className="p-3 font-medium">{getVendorName(review.vendorId)}</td>
                                <td className="p-3">{review.userName}</td>
                                <td className="p-3"><StarRating rating={review.rating} size={4} /></td>
                                <td className="p-3 max-w-xs truncate" title={review.comment}>{review.comment}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        review.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                        review.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                        'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="p-3 space-x-2 whitespace-nowrap">
                                    {review.status === 'pending' && (
                                        <>
                                            <button onClick={() => handleReviewAction(review.id, 'approved')} className="text-xs bg-green-500/80 hover:bg-green-500 text-white font-semibold py-1 px-3 rounded-full">Approve</button>
                                            <button onClick={() => handleReviewAction(review.id, 'rejected')} className="text-xs bg-red-600/80 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full">Reject</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {reviews.length === 0 && (
                            <tr>
                                <td colSpan={6} className="p-4 text-center text-theme-text-secondary">No vendor reviews found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VendorReviewsManagement;
