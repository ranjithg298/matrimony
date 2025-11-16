import React, { useState } from 'react';
import { Profile, Conversation, Message } from '../types';
import InterestsReceivedTab from '../components/inbox/InterestsReceivedTab';
import InterestsSentTab from '../components/inbox/InterestsSentTab';
import AcceptedMatchesTab from '../components/inbox/AcceptedMatchesTab';

interface MessagesPageProps {
  currentUser: Profile;
  conversations: Conversation[];
  allProfiles: Profile[];
  onUpdateConversations: (conversations: Conversation[]) => void;
  onAcceptInterest: (profileId: string) => void;
  onDeclineInterest: (profileId: string) => void;
  typingStatus: {[conversationId: string]: string[]};
  onSendMessage: (conversationId: string, text: string) => void;
  onInitiateCall: (targetUserId: string, type: 'voice' | 'video') => void;
}

type InboxTab = 'received' | 'sent' | 'accepted';

const MessagesPage: React.FC<MessagesPageProps> = (props) => {
  const { currentUser, conversations, allProfiles, onUpdateConversations, onAcceptInterest, onDeclineInterest, typingStatus, onSendMessage, onInitiateCall } = props;
  const [activeTab, setActiveTab] = useState<InboxTab>('received');
  
  const interestsReceived = (currentUser.interestsReceived || [])
    .map(id => allProfiles.find(p => p.id === id))
    .filter((p): p is Profile => !!p);

  const interestsSent = (currentUser.interestsSent || [])
    .map(id => allProfiles.find(p => p.id === id))
    .filter((p): p is Profile => !!p);

  const renderContent = () => {
    switch (activeTab) {
      case 'received':
        return <InterestsReceivedTab profiles={interestsReceived} onAccept={onAcceptInterest} onDecline={onDeclineInterest} />;
      case 'sent':
        return <InterestsSentTab profiles={interestsSent} />;
      case 'accepted':
        return <AcceptedMatchesTab 
                currentUser={currentUser} 
                conversations={conversations} 
                allProfiles={allProfiles} 
                onUpdateConversations={onUpdateConversations} 
                typingStatus={typingStatus}
                onSendMessage={onSendMessage}
                onInitiateCall={onInitiateCall}
               />;
      default:
        return null;
    }
  };

  const getNotificationCount = (tab: InboxTab) => {
    if (tab === 'received') return interestsReceived.length;
    // You can add logic for unread messages if needed
    return 0;
  }

  const TabButton: React.FC<{tab: InboxTab; label: string}> = ({tab, label}) => {
    const count = getNotificationCount(tab);
    return (
       <button onClick={() => setActiveTab(tab)} className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === tab ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
        {label}
        {count > 0 && <span className="bg-theme-accent-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>}
      </button>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
       <div className="bg-theme-surface rounded-xl border border-theme-border h-[calc(100vh_-_8rem)] flex flex-col">
          <div className="p-4 border-b border-theme-border">
              <h1 className="text-2xl font-bold">Inbox</h1>
          </div>
          <div className="border-b border-theme-border px-4">
              <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                <TabButton tab="received" label="Interests Received" />
                <TabButton tab="sent" label="Interests Sent" />
                <TabButton tab="accepted" label="Accepted Matches" />
              </nav>
          </div>
          <div className="flex-grow overflow-auto min-h-0">
              {renderContent()}
          </div>
       </div>
    </div>
  );
};

export default MessagesPage;
