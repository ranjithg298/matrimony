import React, { useMemo } from 'react';
import { Conversation, Profile } from '../types';
import VerifiedIcon from './icons/VerifiedIcon';
import PremiumIcon from './icons/PremiumIcon';

interface ConversationListProps {
  conversations: Conversation[];
  currentUser: Profile;
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  sortBy: 'newest' | 'oldest';
  onSortByChange: (value: 'newest' | 'oldest') => void;
  filterBy: 'all' | 'premium' | 'verified';
  onFilterByChange: (value: 'all' | 'premium' | 'verified') => void;
  allProfiles: Profile[];
  typingStatus: {[conversationId: string]: string[]};
}

const ConversationList: React.FC<ConversationListProps> = (props) => {
  const { 
    conversations, currentUser, activeConversationId, onSelectConversation,
    sortBy, onSortByChange, filterBy, onFilterByChange, typingStatus
  } = props;

  const sortedAndFilteredConversations = useMemo(() => {
    let conversationsToShow = [...conversations];

    // Filtering
    if (filterBy !== 'all') {
        conversationsToShow = conversationsToShow.filter(c => {
            const otherId = c.participantIds.find(id => id !== currentUser.id);
            if (!otherId) return false;
            const otherParticipant = c.participants[otherId];
            if (!otherParticipant) return false;

            if (filterBy === 'premium') return otherParticipant.isPremium;
            if (filterBy === 'verified') return otherParticipant.isVerified;
            return false;
        });
    }

    // Sorting
    conversationsToShow.sort((a, b) => {
        const lastMsgA = a.messages[a.messages.length - 1]?.timestamp || 0;
        const lastMsgB = b.messages[b.messages.length - 1]?.timestamp || 0;
        return sortBy === 'newest' ? lastMsgB - lastMsgA : lastMsgA - lastMsgB;
    });

    return conversationsToShow;
  }, [conversations, sortBy, filterBy, currentUser.id]);

  return (
    <aside className="w-full md:w-1/3 lg:w-1/4 bg-theme-surface border-r border-theme-border flex flex-col">
      <div className="p-4 border-b border-theme-border">
        <h2 className="text-xl font-bold text-theme-text-primary">Chats</h2>
        <div className="flex items-center gap-2 mt-2 text-sm">
            <label className="text-theme-text-secondary">Sort:</label>
            <select value={sortBy} onChange={(e) => onSortByChange(e.target.value as any)} className="bg-theme-bg/50 border border-theme-border rounded-md p-1">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
      </div>
      <div className="p-2 border-b border-theme-border flex justify-around">
          <button onClick={() => onFilterByChange('all')} className={`px-3 py-1 text-sm rounded-full ${filterBy === 'all' ? 'bg-theme-accent-primary text-white' : 'text-theme-text-secondary'}`}>All</button>
          <button onClick={() => onFilterByChange('premium')} className={`px-3 py-1 text-sm rounded-full ${filterBy === 'premium' ? 'bg-theme-accent-primary text-white' : 'text-theme-text-secondary'}`}>Premium</button>
          <button onClick={() => onFilterByChange('verified')} className={`px-3 py-1 text-sm rounded-full ${filterBy === 'verified' ? 'bg-theme-accent-primary text-white' : 'text-theme-text-secondary'}`}>Verified</button>
      </div>
      <div className="flex-grow overflow-y-auto">
        {sortedAndFilteredConversations.map(conv => {
          const otherParticipantId = conv.participantIds.find(id => id !== currentUser.id);
          if (!otherParticipantId) return null;
          
          const otherParticipant = conv.participants[otherParticipantId];
          if (!otherParticipant) return null;

          const lastMessage = conv.messages[conv.messages.length - 1];
          const isActive = conv.id === activeConversationId;
          const isTyping = typingStatus[conv.id] && typingStatus[conv.id].includes(otherParticipantId);

          return (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className={`flex items-center p-3 cursor-pointer transition-colors duration-200 border-l-4 ${isActive ? 'bg-theme-accent-secondary/10 border-theme-accent-secondary' : 'border-transparent hover:bg-theme-border/50'}`}
            >
              <div className="relative flex-shrink-0">
                  <img src={otherParticipant.photo} alt={otherParticipant.name} className="h-12 w-12 rounded-full object-cover" />
                   {otherParticipant.isOnline && <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-2 ring-theme-surface"></span>}
              </div>
              <div className="flex-grow overflow-hidden ml-4">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold truncate text-theme-text-primary">{otherParticipant.name}</h3>
                    {otherParticipant.isVerified && <VerifiedIcon className="h-4 w-4 text-blue-400 flex-shrink-0" />}
                    {otherParticipant.isPremium && <PremiumIcon className="h-4 w-4 text-yellow-400 flex-shrink-0" />}
                </div>
                <p className={`text-sm truncate ${isActive ? 'text-theme-text-primary' : 'text-theme-text-secondary'}`}>
                    {isTyping 
                        ? <span className="italic text-green-500">typing...</span> 
                        : (lastMessage ? lastMessage.text : 'No messages yet.')
                    }
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default ConversationList;