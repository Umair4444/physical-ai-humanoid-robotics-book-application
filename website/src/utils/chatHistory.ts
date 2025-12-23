// Define the ChatMessage interface here since it's used in chat history
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const CHAT_HISTORY_KEY = 'chatbot-history';

// Helper function to check if we're in a browser environment
const isBrowser = (): boolean => {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
};

export const saveChatHistory = (messages: ChatMessage[]): void => {
  if (!isBrowser()) {
    // Skip saving if we're not in a browser environment (e.g., SSR)
    return;
  }

  try {
    // Convert Date objects to ISO strings for serialization
    const serializableMessages = messages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }));
    const serializedMessages = JSON.stringify(serializableMessages);
    localStorage.setItem(CHAT_HISTORY_KEY, serializedMessages);
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
};

export const loadChatHistory = (): ChatMessage[] => {
  if (!isBrowser()) {
    // Return empty array if we're not in a browser environment (e.g., SSR)
    return [];
  }

  try {
    const serializedMessages = localStorage.getItem(CHAT_HISTORY_KEY);
    if (serializedMessages === null) {
      return [];
    }
    // Parse the messages and convert timestamp strings back to Date objects
    const messages: (Omit<ChatMessage, 'timestamp'> & { timestamp: string })[] = JSON.parse(serializedMessages);
    return messages.map(msg => ({
      ...msg,
      timestamp: new Date(msg.timestamp)
    })) as ChatMessage[];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
};

export const clearChatHistory = (): void => {
  if (!isBrowser()) {
    // Skip clearing if we're not in a browser environment (e.g., SSR)
    return;
  }

  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};