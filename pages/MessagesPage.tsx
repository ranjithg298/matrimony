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
  
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    const hashParts = hash.split('/');
    const conversationIdFromUrl = hashParts[3];

    if (conversationIdFromUrl) {
      setActiveConversationId(conversationIdFromUrl);
    } else if (conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations]);


  const interestsReceived = (currentUser.interestsReceived || [])
    .map(id => allProfiles.find(p => p.id === id))
    .filter((p): p is Profile => !!p);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipantId = activeConversation?.participantIds.find(id => id !== currentUser.id);
  const isOtherUserTyping = !!(activeConversation && otherParticipantId && typingStatus[activeConversation.id]?.includes(otherParticipantId));

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 text-theme-text-primary">
       <div className="bg-theme-surface rounded-xl border border-theme-border h-[calc(100vh_-_8rem)] flex flex-col">
          <div className="p-4 border-b border-theme-border">
              <h1 className="text-2xl font-bold">Inbox</h1>
          </div>
          {interestsReceived.length > 0 && (
            <div className="p-4 border-b border-theme-border">
                <h2 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <HeartIcon className="w-5 h-5 text-rose-500"/>
                    New Interests Received
                </h2>
                <InterestsReceivedTab profiles={interestsReceived} onAccept={onAcceptInterest} onDecline={onDeclineInterest} />
            </div>
          )}
          <div className="flex-grow overflow-auto min-h-0 flex">
            <ConversationList
                conversations={conversations}
                currentUser={currentUser}
                activeConversationId={activeConversationId}
                onSelectConversation={setActiveConversationId}
                allProfiles={allProfiles}
                typingStatus={typingStatus}
            />
            <ChatWindow
                conversation={activeConversation}
                currentUser={currentUser}
                onSendMessage={(text) => activeConversationId && onSendMessage(activeConversationId, text)}
                isOtherUserTyping={isOtherUserTyping}
                allProfiles={allProfiles}
                onInitiateCall={onInitiateCall}
            />
          </div>
       </div>
    </div>
  );
};

export default MessagesPage;