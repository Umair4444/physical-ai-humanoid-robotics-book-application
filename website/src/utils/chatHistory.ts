// Define the ChatMessage interface here since it's used in chat history
interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  sources?: string[];
}

const CHAT_HISTORY_KEY = 'chatbot-history';

export const saveChatHistory = (messages: ChatMessage[]): void => {
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
  try {
    localStorage.removeItem(CHAT_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
};