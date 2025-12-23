import { apiService } from './APIService';

interface ChatRequest {
  message: string;
  context?: {
    conversation_id?: string;
    previous_messages?: Array<{
      sender: string;
      content: string;
      timestamp?: string;
    }>;
  };
}

interface ToolCallResponse {
  name: string;
  arguments: Record<string, any>;
}

interface ChatResponseMetadata {
  confidence?: number;
  sources: string[];
  processing_time?: number;
  tool_calls: ToolCallResponse[];
}

interface BackendChatResponse {
  response: string;
  metadata: ChatResponseMetadata;
  suggestions: string[];
}

interface FrontendChatResponse {
  id: string;
  response: string;
  sources: string[];
  timestamp: Date;
  sessionId: string;
}

class ChatService {
  static async sendMessage(
    query: string,
    sessionId: string,
    context: string = ''
  ): Promise<FrontendChatResponse> {
    try {
      const request: ChatRequest = {
        message: query,
        context: context ? {
          conversation_id: sessionId,
          previous_messages: context.split('\n').map(msg => ({
            sender: 'user',
            content: msg
          }))
        } : undefined
      };

      const response: BackendChatResponse = await apiService.post('/api/v1/chat', request);

      return {
        id: `response-${Date.now()}`,
        response: response.response,
        sources: response.metadata.sources || [],
        timestamp: new Date(),
        sessionId
      };
    } catch (error) {
      console.error('Error in ChatService.sendMessage:', error);
      throw error;
    }
  }

  static async initializeSession(userId?: string): Promise<string> {
    // Generate a session ID on the client side
    // In a real implementation, you might call a backend endpoint to initialize a session
    return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  static async clearConversationHistory(sessionId: string): Promise<boolean> {
    // In a real implementation, this would call a backend endpoint to clear history
    try {
      // For now, this is a client-side operation
      return true;
    } catch (error) {
      console.error('Error clearing conversation history:', error);
      return false;
    }
  }
}

export { ChatService };