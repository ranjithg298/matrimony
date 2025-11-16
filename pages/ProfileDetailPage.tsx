import React, { useState, useEffect, useRef } from 'react';
import { Profile, Attribute, Quiz, Gift } from '../types';
import PartnerPreferencesTab from '../components/profile/PartnerPreferencesTab';
import VerifiedIcon from '../components/icons/VerifiedIcon';
import PremiumIcon from '../components/icons/PremiumIcon';
import HeartIcon from '../components/icons/HeartIcon';
import DotsVerticalIcon from '../components/icons/DotsVerticalIcon';
import SparklesIcon from '../components/icons/SparklesIcon';
import ReportUserModal from '../components/ReportUserModal';
import PhoneCallIcon from '../components/icons/PhoneCallIcon';
import WhatsappIcon from '../components/icons/WhatsappIcon';
import ShieldCheckIcon from '../components/icons/ShieldCheckIcon';
import StarIcon from '../components/icons/StarIcon';
import StarSolidIcon from '../components/icons/StarSolidIcon';
import PhotoViewerModal from '../components/PhotoViewerModal';
import PuzzlePieceIcon from '../components/icons/PuzzlePieceIcon';
import GiftIcon from '../components/icons/GiftIcon';
import GiftModal from '../components/GiftModal';
import ArrowLeftIcon from '../components/icons/ArrowLeftIcon';

interface ProfileDetailPageProps {
  profile: Profile;
  currentUser: Profile;
  onBlockUser: (userIdToBlock: string) => void;
  onReportUser: (reportedUserId: string, reason: string) => void;
  onSendInterest: (profileId: string) => void;
  onShortlistProfile: (profileId: string) => void;
  onUpgradePlanRequest: () => void;
  onFetchAnalysis: (profileA: Profile, profileB: Profile) => void;
  onFetchAstroReport: (profileA: Profile, profileB: Profile) => void;
  isLoadingAnalysis: boolean;
  analysisCache: { [key: string]: string };
  attributes: Attribute[];
  onProfileView: (viewedProfileId: string) => void;
  onSendQuizInvite: (challengedId: string) => void;
  onSendGift: (recipientId: string, giftId: string) => void;
  quizzes: Quiz[];
}

type ProfileTab = 'details' | 'preferences';

const ProfileDetailItem: React.FC<{label: string; value: any}> = ({label, value}) => (
    <div>
        <p className="text-sm text-theme-text-secondary">{label}</p>
        <p className="font-medium text-theme-text-primary">{Array.isArray(value) ? value.join(', ') : value}</p>
    </div>
);

const AILoadingIndicator: React.FC = () => (
    <div className="space-y-4 animate-pulse">
        <div className="h-4 bg-theme-border rounded w-1/3"></div>
        <div className="h-16 bg-theme-bg rounded"></div>
        <div className="space-y-2">
            <div className="h-4 bg-theme-bg rounded"></div>
            <div className="h-4 bg-theme-bg rounded w-5/6"></div>
            <div className="h-4 bg-theme-bg rounded w-4/6"></div>
        </div>
    </div>
);

const ParsedAnalysisResult: React.FC<{ result: string }> = ({ result }) => {
    if (result.startsWith("Error:")) {
        return <p className="text-red-500">{result}</p>;
    }
    const scoreMatch = result.match(/Compatibility Score: (\d+\/100)/);
    const summaryMatch = result.match(/Summary\n(.+?)(?=\n\*\*|$)/s);
    const pointsMatch = result.match(/Key Compatibility Points\n((?:.|\n)+?)(?=\n\*\*|$)/s);
    const challengesMatch = result.match(/Potential Challenges\n((?:.|\n)+)/s);

    const summary = summaryMatch ? summaryMatch[1].trim() : null;
    const points = pointsMatch ? pointsMatch[1].trim().split('\n').map(p => p.replace(/^- |^\* /, '')) : [];
    const challenges = challengesMatch ? challengesMatch[1].trim().split('\n').map(p => p.replace(/^- |^\* /, '')) : [];

    return (
        <div>
            {scoreMatch && <p className="font-bold text-2xl text-transparent bg-clip-text bg-theme-gradient my-2">{scoreMatch[0].replace(/\*\*/g, '')}</p>}
            {summary && <p className="text-theme-text-secondary mt-2">{summary}</p>}
            {points.length > 0 && (
                <>
                <h4 className="font-semibold text-theme-text-primary mt-4 mb-2">Key Compatibility Points</h4>
                <ul className="list-disc list-inside text-theme-text-secondary space-y-1">
                    {points.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
                </>
            )}
             {challenges.length > 0 && (
                <>
                <h4 className="font-semibold text-theme-text-primary mt-4 mb-2">Potential Challenges</h4>
                <ul className="list-disc list-inside text-theme-text-secondary space-y-1">
                    {challenges.map((point, index) => <li key={index}>{point}</li>)}
                </ul>
                </>
            )}
        </div>
    );
};

const ProfileDetailPage: React.FC<ProfileDetailPageProps> = (props) => {
  const { profile, currentUser, onBlockUser, onReportUser, onSendInterest, onShortlistProfile, onUpgradePlanRequest, onFetchAnalysis, onFetchAstroReport, isLoadingAnalysis, analysisCache, attributes, onProfileView, onSendQuizInvite, onSendGift, quizzes } = props;
  const [activeTab, setActiveTab] = useState<ProfileTab>('details');
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [viewingImage, setViewingImage] = useState<string | null>(null);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onProfileView(profile.id);
  }, [profile.id, onProfileView]);

  useEffect(() => {
    // Only fetch if not already in cache
    if (!analysisCache[profile.id]) {
      onFetchAnalysis(currentUser, profile);
    }
  }, [profile.id, currentUser.id, onFetchAnalysis, analysisCache]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [optionsRef]);

  const handleBlock = () => {
    if(window.confirm(`Are you sure you want to block ${profile.name}?`)) {
        onBlockUser(profile.id);
    }
    setOptionsOpen(false);
  };
  
  const handleReport = () => {
    setReportModalOpen(true);
    setOptionsOpen(false);
  };

   const handleAstroReport = () => {
     if (currentUser.isPremium) {
        onFetchAstroReport(currentUser, profile);
    } else {
        onUpgradePlanRequest();
    }
  }

  const handleViewContact = () => {
      if (currentUser.isPremium) {
          setShowContact(true);
      } else {
          onUpgradePlanRequest();
      }
  }

  const hasSentInterest = currentUser.interestsSent?.includes(profile.id);
  const isShortlisted = currentUser.shortlisted?.includes(profile.id);
  const hasPendingQuiz = (currentUser.quizInvitesSent || []).some(quizId => quizzes.find(q => q.id === quizId)?.challengedId === profile.id && quizzes.find(q => q.id === quizId)?.status === 'pending') ||
                         (currentUser.quizInvitesReceived || []).some(quizId => quizzes.find(q => q.id === quizId)?.challengerId === profile.id && quizzes.find(q => q.id === quizId)?.status === 'pending');

  const analysisResult = analysisCache[profile.id];
  const phoneNumber = profile.customFields?.phoneNumber;
  const approvedPhotos = profile.gallery.filter(p => p.status === 'approved');

  return (
    <>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm font-semibold text-theme-text-secondary hover:text-theme-text-primary mb-4"
        >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
        </button>
        {/* Profile Header */}
        <div className="bg-theme-surface rounded-xl border border-theme-border p-6 md:flex gap-8">
            <img src={profile.photo} alt={profile.name} className="w-40 h-40 rounded-full object-cover mx-auto md:mx-0 flex-shrink-0 border-4 border-theme-accent-secondary" />
            <div className="flex-grow text-center md:text-left mt-4 md:mt-0">
                <div className="flex justify-center md:justify-start items-center gap-2">
                    <h1 className="text-3xl font-bold">{profile.name}, {profile.age}</h1>
                    {profile.isVerified && <VerifiedIcon className="w-6 h-6 text-blue-400" title="Document Verified" />}
                    {profile.isPhotoVerified && <ShieldCheckIcon className="w-6 h-6 text-green-400" title="Photo Verified" />}
                    {profile.isPremium && <PremiumIcon className="w-6 h-6 text-yellow-400" />}
                </div>
                <p className="text-theme-text-secondary mt-1">{profile.customFields.occupation} in {profile.city}</p>
                <p className="text-theme-text-secondary text-sm mt-2 max-w-xl">{profile.bio}</p>
                <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-2">
                    <button 
                        onClick={() => onSendInterest(profile.id)} 
                        disabled={hasSentInterest}
                        className="flex items-center gap-2 bg-theme-accent-primary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition disabled:bg-theme-border disabled:cursor-not-allowed">
                        <HeartIcon className="w-5 h-5"/>
                        {hasSentInterest ? 'Interest Sent' : 'Send Interest'}
                    </button>
                    <button
                        onClick={() => {
                            if (currentUser.isPremium) {
                                setIsGiftModalOpen(true);
                            } else {
                                onUpgradePlanRequest();
                            }
                        }}
                        className="flex items-center gap-2 bg-yellow-500 text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition"
                        title={currentUser.isPremium ? "Send a virtual gift" : "Upgrade to send gifts"}
                    >
                        <GiftIcon className="w-5 h-5"/>
                        Send Gift
                    </button>
                    <button 
                        onClick={() => onSendQuizInvite(profile.id)} 
                        disabled={hasPendingQuiz}
                        className="flex items-center gap-2 bg-theme-accent-secondary text-white font-bold py-2 px-6 rounded-lg hover:opacity-90 transition disabled:bg-theme-border disabled:cursor-not-allowed">
                        <PuzzlePieceIcon className="w-5 h-5"/>
                        {hasPendingQuiz ? 'Quiz Pending' : 'Challenge to Quiz'}
                    </button>
                    <button 
                        onClick={() => onShortlistProfile(profile.id)}
                        className="flex items-center gap-2 bg-theme-border font-bold py-2 px-6 rounded-lg hover:bg-theme-border/80 transition"
                    >
                      {isShortlisted ? <StarSolidIcon className="w-5 h-5 text-yellow-400" /> : <StarIcon className="w-5 h-5" />}
                      {isShortlisted ? 'Shortlisted' : 'Shortlist'}
                    </button>
                     <div className="relative" ref={optionsRef}>
                        <button onClick={() => setOptionsOpen(o => !o)} className="p-2 rounded-full hover:bg-theme-border text-theme-text-secondary">
                            <DotsVerticalIcon className="h-6 w-6" />
                        </button>
                        {optionsOpen && (
                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-theme-surface ring-1 ring-theme-border z-10">
                                <button onClick={handleBlock} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-theme-border">Block User</button>
                                <button onClick={handleReport} className="block w-full text-left px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Report User</button>
                            </div>
                        )}
                    </div>
                </div>
                 {showContact && (
                    <div className="mt-4 bg-theme-bg/50 p-3 rounded-lg border border-theme-border max-w-md">
                        <p className="text-sm font-semibold">Contact Details:</p>
                        <p className="text-sm text-theme-text-secondary">Phone: {phoneNumber || 'Not Provided'}</p>
                        <p className="text-sm text-theme-text-secondary">Email: {profile.email}</p>
                        {phoneNumber && (
                             <div className="flex items-center gap-2 mt-2">
                                <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-xs bg-green-500/10 text-green-500 font-semibold py-1 px-2 rounded-full hover:bg-green-500/20">
                                    <PhoneCallIcon className="h-3 w-3" /> Call
                                </a>
                                <a href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs bg-teal-500/10 text-teal-500 font-semibold py-1 px-2 rounded-full hover:bg-teal-500/20">
                                    <WhatsappIcon className="h-3 w-3" /> WhatsApp
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>

        {/* Tabs */}
        <div className="mt-8">
            <div className="border-b border-theme-border">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button onClick={() => setActiveTab('details')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'details' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                        Detailed Profile
                    </button>
                    <button onClick={() => setActiveTab('preferences')} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'preferences' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                        Partner Preferences
                    </button>
                </nav>
            </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
            {activeTab === 'details' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {approvedPhotos.length > 0 && (
                          <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                            <h3 className="font-semibold text-xl mb-3 text-theme-text-primary">Photo Gallery</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                              {approvedPhotos.map((photo, index) => (
                                <img key={index} src={photo.url} alt={`Gallery photo ${index + 1}`} onClick={() => setViewingImage(photo.url)} className="w-full h-40 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity" />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {profile.giftsReceived && profile.giftsReceived.length > 0 && (
                            <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                                <h3 className="font-semibold text-xl mb-3 text-theme-text-primary flex items-center gap-2">
                                    <GiftIcon className="w-5 h-5 text-theme-accent-primary" />
                                    Gifts Received
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                    {profile.giftsReceived.slice(0, 8).map(gift => (
                                        <div key={gift.id} className="bg-theme-bg/50 p-3 rounded-lg text-center border border-theme-border" title={`${gift.name} from ${gift.senderName}`}>
                                            <div className="text-4xl">{gift.icon}</div>
                                            <p className="text-xs text-theme-text-secondary mt-1 truncate">from {gift.senderName}</p>
                                        </div>
                                    ))}
                                </div>
                                {profile.giftsReceived.length > 8 && <p className="text-xs text-center mt-3 text-theme-text-secondary">...and {profile.giftsReceived.length - 8} more!</p>}
                            </div>
                        )}

                        {attributes.map(attr => {
                            const value = profile.customFields[attr.id];
                            if (!value) return null;
                            return (
                                <div key={attr.id} className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                                    <h3 className="font-semibold text-xl mb-3 text-theme-text-primary">{attr.label}</h3>
                                    <ProfileDetailItem label="" value={value} />
                                </div>
                            );
                        })}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="space-y-6 sticky top-24">
                            <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                                <h3 className="font-semibold text-xl mb-3 text-theme-text-primary flex items-center gap-2"><SparklesIcon className="w-5 h-5 text-theme-accent-primary" />AI Compatibility</h3>
                                {isLoadingAnalysis && <AILoadingIndicator />}
                                {analysisResult && !isLoadingAnalysis && <ParsedAnalysisResult result={analysisResult} />}
                            </div>
                            <div className="bg-theme-surface p-6 rounded-xl border border-theme-border">
                                <h3 className="font-semibold text-xl mb-3 text-theme-text-primary">Vedic Astrology</h3>
                                 <button onClick={handleAstroReport} className="w-full text-center bg-theme-accent-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300">
                                    Get AI Astro Report
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 'preferences' && (
                <PartnerPreferencesTab
                    currentUser={currentUser}
                    targetPreferences={profile.partnerPreferences}
                    attributes={attributes}
                />
            )}
        </div>
      </div>
      <ReportUserModal 
        isOpen={isReportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportedUser={profile}
        onReport={(reason) => onReportUser(profile.id, reason)}
    />
    {viewingImage && (
      <PhotoViewerModal imageUrl={viewingImage} onClose={() => setViewingImage(null)} />
    )}
    <GiftModal 
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        onSendGift={(giftId) => onSendGift(profile.id, giftId)}
        recipientName={profile.name}
    />
    </>
  );
};

export default ProfileDetailPage;
