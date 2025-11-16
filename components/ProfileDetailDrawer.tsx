import React, { useState, useEffect, useRef } from 'react';
import { Profile, Attribute, AttributeType } from '../types';
import PremiumIcon from './icons/PremiumIcon';
import SparklesIcon from './icons/SparklesIcon';
import StarIcon from './icons/StarIcon';
import DotsVerticalIcon from './icons/DotsVerticalIcon';
import ReportUserModal from './ReportUserModal';
import PhoneCallIcon from './icons/PhoneCallIcon';
import WhatsappIcon from './icons/WhatsappIcon';

interface ProfileDetailDrawerProps {
  profile: Profile | null;
  currentUser: Profile | null;
  isOpen: boolean;
  onClose: () => void;
  analysisResult: string | null;
  isLoading: boolean;
  onFetchAnalysis: (profile: Profile) => void;
  onUpgradePlanRequest: () => void;
  onBlockUser: (userIdToBlock: string) => void;
  onReportUser: (reportedUserId: string, reason: string) => void;
  onSendMessage: (userId: string) => void;
  attributes: Attribute[];
}

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
                    {points.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
                </>
            )}
             {challenges.length > 0 && (
                <>
                <h4 className="font-semibold text-theme-text-primary mt-4 mb-2">Potential Challenges</h4>
                <ul className="list-disc list-inside text-theme-text-secondary space-y-1">
                    {challenges.map((point, index) => (
                        <li key={index}>{point}</li>
                    ))}
                </ul>
                </>
            )}
        </div>
    );
};

const ProfileDetailItem: React.FC<{label: string; value: any}> = ({label, value}) => (
    <div>
        <p className="text-sm text-theme-text-secondary">{label}</p>
        <p className="font-medium text-theme-text-primary">{Array.isArray(value) ? value.join(', ') : value}</p>
    </div>
);


const ProfileDetailDrawer: React.FC<ProfileDetailDrawerProps> = (props) => {
  const { profile, currentUser, isOpen, onClose, analysisResult, isLoading, onFetchAnalysis, onUpgradePlanRequest, onSendMessage, attributes, onBlockUser, onReportUser } = props;
  const [showContact, setShowContact] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (profile) {
      setShowContact(false);
      setOptionsOpen(false);
    }
  }, [profile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [optionsRef]);

  if (!profile || !currentUser) return null;

  const handleBlock = () => {
    if(window.confirm(`Are you sure you want to block ${profile.name}? You will no longer see their profile or be able to interact with them.`)) {
        onBlockUser(profile.id);
    }
    setOptionsOpen(false);
  };
  
  const handleReport = () => {
    setReportModalOpen(true);
    setOptionsOpen(false);
  };

  const handleDownloadAstroPdf = () => {
     if (currentUser.isPremium) {
        const targetUrl = `#/astro-report?userA=${currentUser.id}&userB=${profile.id}`;
        window.open(targetUrl, '_blank');
    } else {
        onUpgradePlanRequest();
    }
  }

  const phoneNumber = profile.customFields.phoneNumber;

  return (
    <>
    <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-theme-surface shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} z-40 border-l border-theme-border`}>
      <div className="relative h-full flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-theme-text-secondary hover:text-theme-text-primary z-50 bg-theme-surface/50 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="h-64 w-full flex-shrink-0 relative">
          <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover"/>
           <div className="absolute inset-0 bg-gradient-to-t from-theme-surface to-transparent" />
        </div>

        <div className="p-6 flex-grow overflow-y-auto">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold text-theme-text-primary">{profile.name}, {profile.age}</h2>
            <div className="flex items-center gap-2">
                {profile.isPremium && (
                    <div className="bg-yellow-400/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 flex-shrink-0">
                        <PremiumIcon className="h-4 w-4 text-yellow-400" />
                        <span>Premium</span>
                    </div>
                )}
                <div className="relative" ref={optionsRef}>
                    <button onClick={() => setOptionsOpen(o => !o)} className="p-1 rounded-full hover:bg-theme-border text-theme-text-secondary">
                        <DotsVerticalIcon className="h-5 w-5" />
                    </button>
                    {optionsOpen && (
                        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-theme-surface ring-1 ring-theme-border z-10">
                            <button onClick={handleBlock} className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-theme-border">Block User</button>
                            <button onClick={handleReport} className="block w-full text-left px-4 py-2 text-sm text-theme-text-primary hover:bg-theme-border">Report User</button>
                        </div>
                    )}
                </div>
            </div>
          </div>
          <p className="text-theme-text-secondary mb-4 -mt-1">{profile.city}</p>


          <div className="mb-6">
            <h3 className="font-semibold text-theme-text-primary mb-2">About</h3>
            <p className="text-theme-text-secondary">{profile.bio}</p>
          </div>
          
          <div className="mb-6 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
            <h3 className="font-semibold text-theme-text-primary mb-3">Details</h3>
            <div className="grid grid-cols-2 gap-4">
                {attributes.map(attr => {
                    const value = profile.customFields[attr.id];
                    if (!value || attr.id === 'phoneNumber') return null;
                    return <ProfileDetailItem key={attr.id} label={attr.label} value={value} />
                })}
            </div>
             {showContact && (
                <div className="mt-4 pt-4 border-t border-theme-border space-y-3">
                     <ProfileDetailItem label="Phone Number" value={phoneNumber || 'Not Provided'} />
                     {phoneNumber && (
                        <div className="flex items-center gap-2">
                           <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-sm bg-green-500/10 text-green-500 font-semibold py-1 px-3 rounded-full hover:bg-green-500/20">
                               <PhoneCallIcon className="h-4 w-4" /> Call
                           </a>
                           <a href={`https://wa.me/${phoneNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm bg-teal-500/10 text-teal-500 font-semibold py-1 px-3 rounded-full hover:bg-teal-500/20">
                               <WhatsappIcon className="h-4 w-4" /> WhatsApp
                           </a>
                        </div>
                     )}
                </div>
            )}
          </div>


          <div className="mb-6 bg-theme-bg/50 p-4 rounded-lg border border-theme-border">
            <div className="text-center">
              <h3 className="font-semibold text-theme-text-primary mb-2">AI Compatibility Analysis</h3>
              {!analysisResult && !isLoading && (
                  <button 
                    onClick={() => onFetchAnalysis(profile)}
                    className="bg-theme-accent-secondary text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition duration-300 flex items-center gap-2 mx-auto"
                  >
                    <SparklesIcon className="h-5 w-5" />
                    Get AI Analysis
                  </button>
              )}
            </div>
            {isLoading && <AILoadingIndicator />}
            {analysisResult && !isLoading && <ParsedAnalysisResult result={analysisResult} />}
          </div>

          <div className="mb-6">
              <button onClick={handleDownloadAstroPdf} className="w-full text-center bg-theme-border text-theme-text-primary font-bold py-3 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300">
                Download Astrology PDF
              </button>
          </div>

        </div>

        <div className="p-6 border-t border-theme-border bg-theme-surface flex-shrink-0 grid grid-cols-2 gap-4">
            <button 
              onClick={() => currentUser.isPremium ? onSendMessage(profile.id) : onUpgradePlanRequest()}
              className="w-full bg-theme-accent-primary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition duration-300"
            >
              Message
            </button>
            <button 
                onClick={() => {
                    if (currentUser.isPremium) {
                        setShowContact(true);
                    } else {
                        onUpgradePlanRequest();
                    }
                }}
                disabled={showContact}
                className="w-full bg-theme-border text-theme-text-primary font-bold py-3 px-4 rounded-lg hover:bg-theme-border/80 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {showContact ? 'Contact Shown' : 'View Contact'}
            </button>
        </div>
      </div>
    </div>
    <ReportUserModal 
        isOpen={isReportModalOpen}
        onClose={() => setReportModalOpen(false)}
        reportedUser={profile}
        onReport={(reason) => onReportUser(profile.id, reason)}
    />
    </>
  );
};

export default ProfileDetailDrawer;