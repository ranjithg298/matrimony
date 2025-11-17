import React, { useState, useRef, useEffect } from 'react';
import { Conversation, Profile } from '../types';
import MessageBubble from './MessageBubble';
import SparklesIcon from './icons/SparklesIcon';
import { getAIcebreaker } from '../services/geminiService';
import PhoneIcon from './icons/PhoneIcon';
import VideoCameraIcon from './icons/VideoCameraIcon';

interface ChatWindowProps {
  conversation: Conversation | undefined;
  currentUser: Profile;
  onSendMessage: (text: string) => void;
  isOtherUserTyping: boolean;
  allProfiles: Profile[];
  onInitiateCall: (targetUserId: string, type: 'voice' | 'video') => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUser, onSendMessage, isOtherUserTyping, allProfiles, onInitiateCall }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isGeneratingIcebreaker, setIsGeneratingIcebreaker] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [conversation?.messages]);
  
  const otherParticipantId = conversation?.participantIds.find(id => id !== currentUser.id);
  const otherParticipant = otherParticipantId ? conversation?.participants[otherParticipantId] : null;
  const otherParticipantProfile = allProfiles.find(p => p.id === otherParticipantId);

  const handleGenerateIcebreaker = async () => {
      if (!conversation || !otherParticipantId) return;
      setIsGeneratingIcebreaker(true);
      if (currentUser && otherParticipantProfile) {
          const icebreaker = await getAIcebreaker(currentUser, otherParticipantProfile);
          setNewMessage(icebreaker);
      }
      setIsGeneratingIcebreaker(false);
  };

  if (!conversation || !otherParticipant || !otherParticipantProfile) {
    return (
      <div className="flex-grow flex items-center justify-center text-theme-text-secondary bg-theme-bg">
        <p>Select a conversation to start chatting.</p>
      </div>
    );
  }
  
  const handleSend = () => {
      if(newMessage.trim()){
          onSendMessage(newMessage);
          setNewMessage('');
      }
  }

  const areBothPremium = !!(currentUser.isPremium && otherParticipantProfile.isPremium);

  return (
    <div className="flex-grow flex flex-col h-full bg-theme-bg">
      {/* Header */}
      <div className="flex items-center p-3 bg-theme-surface border-b border-theme-border flex-shrink-0">
        <img src={otherParticipant.photo} alt={otherParticipant.name} className="h-10 w-10 rounded-full object-cover mr-4" />
        <div className="flex-grow">
          <h2 className="text-lg font-bold text-theme-text-primary">{otherParticipant.name}</h2>
          {isOtherUserTyping ? (
            <p className="text-xs italic text-green-500 animate-pulse">is typing...</p>
          ) : (
            otherParticipant.isOnline && <p className="text-xs text-green-400">Online</p>
          )}
        </div>
         <div className="flex items-center gap-2">
            <button 
                onClick={() => onInitiateCall(otherParticipantProfile.id, 'voice')} 
                disabled={!areBothPremium} 
                className="p-2 rounded-full text-theme-text-secondary hover:bg-theme-border disabled:opacity-50 disabled:cursor-not-allowed"
                title={areBothPremium ? "Start Voice Call" : "Upgrade to start calls"}
            >
                <PhoneIcon className="h-6 w-6" />
            </button>
            <button 
                onClick={() => onInitiateCall(otherParticipantProfile.id, 'video')} 
                disabled={!areBothPremium}
                className="p-2 rounded-full text-theme-text-secondary hover:bg-theme-border disabled:opacity-50 disabled:cursor-not-allowed"
                title={areBothPremium ? "Start Video Call" : "Upgrade to start calls"}
            >
                <VideoCameraIcon className="h-6 w-6" />
            </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-6 overflow-y-auto">
        <div className="space-y-4">
            {conversation.messages.length === 0 && (
                <div className="text-center text-theme-text-secondary text-sm">
                    <p>This is the beginning of your conversation with {otherParticipant.name}.</p>
                    <p>Why not start with an AI-generated icebreaker?</p>
                </div>
            )}
            {conversation.messages.map(msg => (
                <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.senderId === currentUser.id} />
            ))}
            <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-4 bg-theme-surface border-t border-theme-border flex-shrink-0">
        <div className="flex items-center space-x-2 bg-theme-border rounded-full p-2">
           <button 
              onClick={handleGenerateIcebreaker} 
              disabled={isGeneratingIcebreaker}
              className="p-2 rounded-full text-theme-text-secondary hover:bg-theme-surface disabled:cursor-wait"
              title="Generate AI Icebreaker"
          >
              <SparklesIcon className={`h-6 w-6 ${isGeneratingIcebreaker ? 'animate-spin text-theme-accent-primary' : ''}`} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-grow bg-transparent focus:outline-none text-theme-text-primary"
          />
          <button 
            onClick={handleSend}
            className="bg-theme-gradient text-white rounded-full p-2 hover:opacity-90 transition-opacity duration-200 w-10 h-10 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;