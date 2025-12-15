import React, { useState, useEffect } from 'react';
import { useChatbot } from '@site/src/contexts/ChatbotContext';
import ChatbotComponent from '../Chatbot/ChatbotComponent';
import { FaRobot, FaTimes, FaComments } from 'react-icons/fa';

const FloatingChatbotButton: React.FC = () => {
  const { messages } = useChatbot();
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

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-80 h-[500px] flex flex-col">
          {/* Chat Header with Close Button */}
          <div className="bg-indigo-600 text-white p-3 flex justify-between items-center rounded-t-xl">
            <div className="flex items-center">
              <FaRobot className="mr-2" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Chat Content */}
          <div className="flex-1 overflow-hidden">
            <ChatbotComponent />
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className={`p-4 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 ${
            hasUnreadMessage 
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse' 
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          aria-label="Open AI Assistant chat"
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