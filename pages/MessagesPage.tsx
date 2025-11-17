import React, { useState, useEffect } from 'react';
import { Profile, Conversation } from '../types';
import ConversationList from '../components/ConversationList';
import ChatWindow from '../components/ChatWindow';
import InterestsReceivedTab from '../components/inbox/InterestsReceivedTab';
import HeartIcon from '../components/icons/HeartIcon';

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

const MessagesPage: React.FC<MessagesPageProps> = (props) => {
  const { currentUser, conversations, allProfiles, onAcceptInterest, onDeclineInterest, typingStatus, onSendMessage, onInitiateCall } = props;
  
  const [activeTab, setActiveTab] = useState<'chats' | 'interests'>('chats');
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const hashParts = hash.split('/');
    const conversationIdFromUrl = hashParts[3];

    if (conversationIdFromUrl) {
      setActiveConversationId(conversationIdFromUrl);
      setActiveTab('chats');
    } else if (conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
    // FIX: The 'route' variable was not defined in this component's scope.
    // The effect's logic depends on the URL hash to determine the active conversation,
    // so `window.location.hash` is used as a dependency to ensure the component
    // updates correctly when navigating between conversations via the URL.
  }, [conversations, window.location.hash]);

  const interestsReceived = (currentUser.interestsReceived || [])
    .map(id => allProfiles.find(p => p.id === id))
    .filter((p): p is Profile => !!p);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipantId = activeConversation?.participantIds.find(id => id !== currentUser.id);
  const isOtherUserTyping = !!(activeConversation && otherParticipantId && typingStatus[activeConversation.id]?.includes(otherParticipantId));

  const handleSelectConversation = (id: string) => {
      setActiveConversationId(id);
      window.location.hash = `#/app/messages/${id}`;
  }

  return (
    <div className="bg-theme-surface rounded-xl border border-theme-border h-[calc(100vh_-_8rem)] flex overflow-hidden">
        <aside className="w-full md:w-1/3 lg:w-1/4 border-r border-theme-border flex flex-col">
            <div className="p-4 border-b border-theme-border">
                <h1 className="text-xl font-bold">Inbox</h1>
            </div>
            <div className="border-b border-theme-border">
                <nav className="-mb-px flex space-x-4 px-4" aria-label="Tabs">
                    <button onClick={() => setActiveTab('chats')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'chats' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                        Chats ({conversations.length})
                    </button>
                    <button onClick={() => setActiveTab('interests')} className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${activeTab === 'interests' ? 'border-theme-accent-primary text-theme-accent-primary' : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary'}`}>
                        Interests ({interestsReceived.length})
                    </button>
                </nav>
            </div>
            {activeTab === 'chats' && (
                <ConversationList
                    conversations={conversations}
                    currentUser={currentUser}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    allProfiles={allProfiles}
                    typingStatus={typingStatus}
                />
            )}
             {activeTab === 'interests' && (
                <InterestsReceivedTab 
                    profiles={interestsReceived} 
                    onAccept={onAcceptInterest} 
                    onDecline={onDeclineInterest} 
                />
             )}

        </aside>
       <main className="flex-grow hidden md:flex">
            <ChatWindow
                conversation={activeConversation}
                currentUser={currentUser}
                onSendMessage={(text) => activeConversationId && onSendMessage(activeConversationId, text)}
                isOtherUserTyping={isOtherUserTyping}
                allProfiles={allProfiles}
                onInitiateCall={onInitiateCall}
            />
       </main>
    </div>
  );
};

export default MessagesPage;