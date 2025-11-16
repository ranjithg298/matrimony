import React, { useState } from 'react';
import { Profile, Conversation, Message } from '../../types';
import ConversationList from '../ConversationList';
import ChatWindow from '../ChatWindow';

interface AcceptedMatchesTabProps {
  currentUser: Profile;
  conversations: Conversation[];
  allProfiles: Profile[];
  onUpdateConversations: (conversations: Conversation[]) => void;
  typingStatus: {[conversationId: string]: string[]};
  onSendMessage: (conversationId: string, text: string) => void;
  onInitiateCall: (targetUserId: string, type: 'voice' | 'video') => void;
}

const AcceptedMatchesTab: React.FC<AcceptedMatchesTabProps> = ({ currentUser, conversations, allProfiles, onUpdateConversations, typingStatus, onSendMessage, onInitiateCall }) => {
  const [activeConversationId, setActiveConversationId] = useState<string | null>(conversations[0]?.id || null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);
  const otherParticipantId = activeConversation?.participantIds.find(id => id !== currentUser.id);
  const isOtherUserTyping = !!(activeConversation && otherParticipantId && typingStatus[activeConversation.id]?.includes(otherParticipantId));

  return (
    <div className="flex h-full">
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
  );
};

export default AcceptedMatchesTab;
