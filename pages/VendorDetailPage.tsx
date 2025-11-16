

import React, { useState } from 'react';
import { Profile, VendorReview, WebsiteSettings } from '../types';
import Footer from '../components/Footer';
import StarRating from '../components/StarRating';

interface VendorDetailPageProps {
  vendor: Profile;
  currentUser: Profile | null;
  onAddReview: (review: Omit<VendorReview, 'id' | 'date' | 'status'>) => void;
  websiteSettings: WebsiteSettings;
}

const VendorDetailPage: React.FC<VendorDetailPageProps> = ({ vendor, currentUser, onAddReview, websiteSettings }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const approvedReviews = vendor.reviews?.filter(r => r.status === 'approved') || [];
  const avgRating = approvedReviews.length > 0
    ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length
    : 0;
  
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim() && currentUser) {
      onAddReview({
        vendorId: vendor.id,
        userId: currentUser.id,
        userName: currentUser.name,
        userPhoto: currentUser.photo,
        rating,
        comment,
      });
      setRating(0);
      setComment('');
    }
  };


  return (
    <div className="bg-theme-bg min-h-screen">
       <header className="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="#/" className="flex items-center space-x-2 focus:outline-none">
                <img src={websiteSettings.logoUrl} alt={websiteSettings.siteName} className="h-8 object-contain" />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-theme-gradient">{websiteSettings.siteName}</span>
            </a>
            <a href="#/app/home" className="bg-theme-surface hover:bg-theme-border text-theme-text-primary font-semibold py-2 px-4 rounded-lg transition-colors">
                Back to App
            </a>
        </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
             <div className="bg-theme-surface rounded-xl border border-theme-border overflow-hidden">
                <img src={vendor.photo} alt={vendor.name} className="w-full h-96 object-cover" />
                <div className="p-6">
                    <p className="font-semibold text-theme-accent-primary">{vendor.serviceCategory}</p>
                    <h1 className="text-4xl font-bold text-theme-text-primary mt-1">{vendor.name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={avgRating} />
                        <span className="text-sm text-theme-text-secondary">({approvedReviews.length} reviews)</span>
                    </div>
                    <div className="mt-6">
                        <h2 className="text-xl font-bold text-theme-text-primary mb-2">About {vendor.name}</h2>
                        <p className="text-theme-text-secondary whitespace-pre-wrap">{vendor.vendorBio || vendor.bio}</p>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-theme-surface rounded-xl border border-theme-border mt-8 p-6">
                <h2 className="text-xl font-bold text-theme-text-primary mb-4">Reviews</h2>
                <div className="space-y-6">
                    {approvedReviews.map(review => (
                        <div key={review.id} className="flex gap-4 border-b border-theme-border pb-4 last:border-b-0 last:pb-0">
                            <img src={review.userPhoto} alt={review.userName} className="w-12 h-12 rounded-full object-cover"/>
                            <div>
                                <div className="flex items-center gap-4">
                                    <h4 className="font-semibold">{review.userName}</h4>
                                    <StarRating rating={review.rating} />
                                </div>
                                <p className="text-sm text-theme-text-secondary mt-2">{review.comment}</p>
                            </div>
                        </div>
                    ))}
                    {approvedReviews.length === 0 && <p className="text-theme-text-secondary">No reviews yet for this vendor.</p>}
                </div>
            </div>
          </div>
          {/* Right Column */}
          <div className="lg:col-span-1">
            <div className="bg-theme-surface rounded-xl border border-theme-border p-6 sticky top-24">
                <h3 className="text-xl font-bold text-theme-text-primary mb-4">Contact & Portfolio</h3>
                <a href={vendor.portfolioUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-theme-accent-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300">
                    View Portfolio
                </a>

                {currentUser && (
                    <div className="mt-8 border-t border-theme-border pt-6">
                         <h3 className="text-xl font-bold text-theme-text-primary mb-4">Leave a Review</h3>
                         <form onSubmit={handleSubmitReview}>
                             <div className="mb-4">
                                <p className="text-sm text-theme-text-secondary mb-2">Your Rating</p>
                                <StarRating rating={rating} onRatingChange={setRating} />
                             </div>
                             <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience..." rows={4} className="w-full bg-theme-bg p-2 rounded-md border border-theme-border"></textarea>
                             <button type="submit" disabled={!rating || !comment.trim()} className="w-full mt-2 bg-theme-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300 disabled:opacity-50">
                                 Submit Review
                             </button>
                         </form>
                    </div>
                )}
                {!currentUser && (
                    <p className="text-center text-sm text-theme-text-secondary mt-6">
                        <a href="#/login" className="text-theme-accent-primary underline">Log in</a> to leave a review.
                    </p>
                )}
            </div>
          </div>
        </div>
      </main>
      <Footer settings={websiteSettings} />
    </div>
  );
};

export default VendorDetailPage;