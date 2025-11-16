import React, { useState } from 'react';
import { Profile, Conversation, Message } from '../types';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';

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

const MessagesPage: React.FC<MessagesPageProps> = ({ currentUser, conversations, allProfiles, onUpdateConversations, onInitiateCall, onSendMessage, typingStatus, onAcceptInterest, onDeclineInterest }) => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversations[0]?.id || null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleSendMessage = (text: string) => {
    if (!activeConversationId) return;
    onSendMessage(activeConversationId, text);
  };
  
  const otherParticipantId = activeConversation?.participantIds.find(id => id !== currentUser.id);
  const isOtherUserTyping = !!(activeConversation && otherParticipantId && typingStatus[activeConversation.id]?.includes(otherParticipantId));

  return (
    <div className="flex h-[calc(100vh_-_4rem)]">
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
        onSendMessage={handleSendMessage}
        isOtherUserTyping={isOtherUserTyping}
        allProfiles={allProfiles}
        onInitiateCall={onInitiateCall}
      />
    </div>
  );
};

export default MessagesPage;
