import React, { useState, useEffect, useRef } from 'react';
import { useChatbot } from '@site/src/contexts/ChatbotContext';
import { ChatService } from '@site/src/services/ChatService';
import ChatMessage from '../ChatMessage/ChatMessage';
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaSpinner,
  FaTimes,
  FaGraduationCap,
  FaComments,
} from 'react-icons/fa';

interface ChatbotComponentProps {
  closeChat?: () => void;
}

const ChatbotComponent: React.FC<ChatbotComponentProps> = ({ closeChat }) => {
  const {
    messages,
    sendMessage,
    isTyping,
    setIsTyping,
    clearMessages,
    initializeChat,
  } = useChatbot();
  const [inputValue, setInputValue] = useState('');
  const [sessionId, setSessionId] = useState<string>('');
  const [useAgent, setUseAgent] = useState<boolean>(true); // Default to using agent
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Initialize session on component mount
  useEffect(() => {
    const initSession = async () => {
      const id = await ChatService.initializeSession();
      setSessionId(id);
    };
    initSession();
  }, []);

  // Check for page refresh and clear chat history if needed
  useEffect(() => {
    // Check if this is a page refresh by checking session storage
    const isPageRefresh = sessionStorage.getItem('pageRefreshed') === 'true';

    if (isPageRefresh) {
      clearMessages(); // Clear chat history on page refresh
      sessionStorage.removeItem('pageRefreshed');
    }

    // Set flag for potential refresh
    const handleBeforeUnload = () => {
      sessionStorage.setItem('pageRefreshed', 'true');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [clearMessages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || !sessionId) return;

    // Add user message to UI immediately
    sendMessage(inputValue, 'user');
    const userMessage = inputValue;
    setInputValue(''); // Clear input immediately

    try {
      setIsTyping(true);

      // Get response from API
      const response = await ChatService.sendMessage(
        userMessage,
        sessionId,
        '',
        useAgent
      );

      // Add the response to the chat
      sendMessage(response.response, 'assistant', response.sources || []);
    } catch (error: any) {
      console.error('Error getting chat response:', error);

      // Show error message to user based on error type
      let errorMessage = 'Sorry, I encountered an error. Please try again.';

      if (error.message?.includes('Network Error')) {
        errorMessage =
          'Unable to connect to the server. Please check your internet connection.';
      } else if (error.response?.status === 429) {
        errorMessage =
          "You've sent too many requests. Please wait a moment before trying again.";
      } else if (error.response?.status >= 500) {
        errorMessage =
          'The server is experiencing issues. Please try again later.';
      }

      sendMessage(errorMessage, 'assistant');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
      role="region"
      aria-label="AI Tutor Chat"
    >
      {/* Messages Container */}
      <div
        className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900"
        style={{ maxHeight: 'calc(100% - 100px)' }}
        role="log"
        aria-live="polite"
        aria-label="Chat messages"
      >
        {messages.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400"
            role="status"
            aria-label="No chat messages"
          >
            <FaRobot className="text-4xl mb-2" aria-hidden="true" />
            <p>
              Ask me anything about the Physical AI Humanoid Robotics Textbook!
            </p>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && (
              <div
                className="flex justify-start mb-4"
                data-testid="loading-indicator"
                role="status"
                aria-live="polite"
              >
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <div className="flex items-center">
                    <FaSpinner
                      className="animate-spin mr-2"
                      aria-hidden="true"
                    />
                    <span>Thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center mb-2">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={useAgent}
                onChange={e => setUseAgent(e.target.checked)}
              />
              <div
                className={`block w-10 h-5 rounded-full transition-colors duration-300 ${
                  useAgent ? 'bg-indigo-600' : 'bg-gray-300'
                }`}
              ></div>
              <div
                className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${
                  useAgent ? 'transform translate-x-5' : ''
                }`}
              ></div>
            </div>
            <div className="ml-2 flex items-center">
              <FaGraduationCap className="mr-1 text-sm" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Use Specialized Knowledge
              </span>
            </div>
          </label>
        </div>
        <form onSubmit={handleSubmit} role="form" aria-label="Chat input form">
          <div className="flex">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Ask about the textbook..."
              className="flex-1 border border-gray-300 dark:border-gray-600 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              disabled={isTyping}
              aria-label="Type your message to the AI assistant"
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              role="textbox"
              aria-multiline="false"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={isTyping || !inputValue.trim()}
              aria-label={
                isTyping
                  ? 'Sending message, please wait'
                  : 'Send message to AI assistant'
              }
            >
              {isTyping ? (
                <span className="flex items-center">
                  <FaSpinner className="animate-spin mr-1" aria-hidden="true" />
                  <span className="sr-only">Sending...</span>
                </span>
              ) : (
                <>
                  <span className="hidden sm:inline mr-1">Send</span>
                  <FaPaperPlane aria-hidden="true" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatbotComponent;
