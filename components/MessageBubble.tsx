
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isCurrentUser }) => {
  const bubbleClasses = isCurrentUser
    ? 'bg-theme-gradient text-white self-end rounded-br-none'
    : 'bg-theme-surface text-theme-text-primary self-start rounded-bl-none';

  const containerClasses = isCurrentUser ? 'flex justify-end' : 'flex justify-start';

  return (
    <div className={containerClasses}>
      <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl shadow-sm ${bubbleClasses}`}>
        <p>{message.text}</p>
        <p className={`text-xs mt-1 ${isCurrentUser ? 'text-gray-200/80' : 'text-theme-text-secondary'} text-right`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;