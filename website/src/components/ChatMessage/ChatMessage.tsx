import React from 'react';
import { useTheme } from '@site/src/contexts/ThemeContext';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    sources?: string[];
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { isDarkMode } = useTheme();
  const isUser = message.role === 'user';

  // Format the timestamp to a readable string
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      data-testid={isUser ? 'user-message' : 'assistant-message'}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      role="log"
      aria-label={`${message.role} message`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? isDarkMode
              ? 'bg-blue-700 text-white'
              : 'bg-blue-500 text-white'
            : isDarkMode
            ? 'bg-gray-700 text-white'
            : 'bg-gray-200 text-gray-800'
        }`}
        role="article"
        aria-roledescription="chat message"
      >
        <div className="text-sm" tabIndex={0} aria-label={`Message content: ${message.content}`}>
          {message.content}
        </div>

        {message.sources && message.sources.length > 0 && (
          <div className="mt-2 text-xs opacity-70">
            <strong>Sources:</strong> {message.sources.join(', ')}
          </div>
        )}

        <div className="text-xs mt-1 opacity-70" aria-label={`Message timestamp: ${formatTime(message.timestamp)}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;