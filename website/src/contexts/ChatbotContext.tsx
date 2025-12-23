import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { loadChatHistory, saveChatHistory, clearChatHistory } from '../utils/chatHistory';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface ChatbotState {
  messages: ChatMessage[];
  isTyping: boolean;
}

type ChatbotAction =
  | { type: 'ADD_MESSAGE'; payload: ChatMessage }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'CLEAR_MESSAGES' }
  | { type: 'INITIALIZE_CHAT' }
  | { type: 'LOAD_HISTORY'; payload: ChatMessage[] };

interface ChatbotContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string, role: 'user' | 'assistant', sources?: string[]) => void;
  clearMessages: () => void;
  setIsTyping: (typing: boolean) => void;
  initializeChat: () => void;
  loadHistory: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

const chatbotReducer = (state: ChatbotState, action: ChatbotAction): ChatbotState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      const newMessages = [...state.messages, action.payload];
      saveChatHistory(newMessages); // Automatically save when a message is added
      return {
        ...state,
        messages: newMessages,
      };
    case 'SET_TYPING':
      return {
        ...state,
        isTyping: action.payload,
      };
    case 'CLEAR_MESSAGES':
      clearChatHistory(); // Clear saved history when messages are cleared
      return {
        ...state,
        messages: [],
      };
    case 'INITIALIZE_CHAT':
      const welcomeMessage: ChatMessage = {
        id: 'welcome-' + Date.now(),
        role: 'assistant',
        content: 'Hello! I\'m your AI Tutor for the Physical AI Humanoid Robotics Textbook. How can I help you today?',
        timestamp: new Date(),
      };
      saveChatHistory([welcomeMessage]); // Save the welcome message
      return {
        messages: [welcomeMessage],
        isTyping: false,
      };
    case 'LOAD_HISTORY':
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

interface ChatbotProviderProps {
  children: ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(chatbotReducer, {
    messages: loadChatHistory(), // Load initial messages from storage
    isTyping: false
  });

  // Load history from localStorage when the provider initializes
  useEffect(() => {
    const savedMessages = loadChatHistory();
    if (savedMessages.length > 0) {
      dispatch({ type: 'LOAD_HISTORY', payload: savedMessages });
    }
  }, []);

  const sendMessage = (content: string, role: 'user' | 'assistant', sources?: string[]) => {
    const newMessage: ChatMessage = {
      id: `${role}-${Date.now()}`,
      role,
      content,
      timestamp: new Date(),
      sources,
    };
    dispatch({ type: 'ADD_MESSAGE', payload: newMessage });
  };

  const setIsTyping = (typing: boolean) => {
    dispatch({ type: 'SET_TYPING', payload: typing });
  };

  const clearMessages = () => {
    dispatch({ type: 'CLEAR_MESSAGES' });
  };

  const initializeChat = () => {
    dispatch({ type: 'INITIALIZE_CHAT' });
  };

  const loadHistory = () => {
    const savedMessages = loadChatHistory();
    if (savedMessages.length > 0) {
      dispatch({ type: 'LOAD_HISTORY', payload: savedMessages });
    }
  };

  const value: ChatbotContextType = {
    messages: state.messages,
    isTyping: state.isTyping,
    sendMessage,
    setIsTyping,
    clearMessages,
    initializeChat,
    loadHistory,
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};