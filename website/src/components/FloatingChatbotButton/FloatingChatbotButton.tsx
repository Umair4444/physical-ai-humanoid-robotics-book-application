import React, { useState, useEffect } from 'react';
import { useChatbot } from '@site/src/contexts/ChatbotContext';
import ChatbotComponent from '../Chatbot/ChatbotComponent';
import { FaRobot, FaComments, FaTimes } from 'react-icons/fa';

const FloatingChatbotButton: React.FC = () => {
  const { messages, clearMessages, initializeChat } = useChatbot();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnreadMessage, setHasUnreadMessage] = useState(false);

  // Check for new messages when messages change
  useEffect(() => {
    // A new message counts as unread if it's from the assistant and we're not currently viewing the chat
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.role === 'assistant' && !isOpen) {
      setHasUnreadMessage(true);
    }
  }, [messages, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      // Clear unread message indicator when opening the chat
      setHasUnreadMessage(false);
    }
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleNewChat = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering header click to close
    initializeChat(); // Initialize a new chat session
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-96 h-[500px] flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-500 to-violet-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <FaRobot className="mr-2" />
              <h3 className="font-semibold">AI Tutor</h3>
            </div>
            <div className="flex space-x-2">
              {/* New Chat Button */}
              <button
                type="button"
                onClick={handleNewChat}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Start new conversation"
                title="New Chat"
              >
                <FaComments aria-hidden="true" />
              </button>
              {/* Close Button */}
              <button
                type="button"
                onClick={closeChat}
                className="p-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
                aria-label="Close chat"
                title="Close"
              >
                <FaTimes aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <ChatbotComponent closeChat={closeChat} />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className={`p-4 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
            hasUnreadMessage
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse'
              : 'bg-gradient-to-r from-blue-500 to-violet-600 hover:from-blue-600 hover:to-violet-700'
          }`}
          aria-label="Open AI Tutor chat"
        >
          <div className="relative">
            <FaRobot className="text-xl" />
            {hasUnreadMessage && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            )}
          </div>
        </button>
      )}

      {/* Optional: Notification badge for unread messages */}
      {hasUnreadMessage && !isOpen && (
        <div className="absolute bottom-12 right-0 flex -mr-2 transform translate-x-1/2">
          <span className="animate-bounce flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-indigo-600 text-white text-xs items-center justify-center">
              !
            </span>
          </span>
        </div>
      )}
    </div>
  );
};

export default FloatingChatbotButton;
