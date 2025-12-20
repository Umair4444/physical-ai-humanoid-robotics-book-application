interface ChatRequest {
  query: string;
  context?: string;
  sessionId: string;
}

interface ChatResponse {
  id: string;
  response: string;
  sources: string[];
  timestamp: Date;
  sessionId: string;
}

interface ErrorResponse {
  error: string;
  code: number;
}

// Same helper function for environment variables
function getEnvVar(varName: string, defaultValue: string): string {
  // In browser environment, process may not be defined
  if (typeof process !== 'undefined' && process.env) {
    return process.env[varName] || defaultValue;
  }
  // For browser environments where process is not available, return default
  return defaultValue;
}

class ChatService {
  private static API_BASE_URL = getEnvVar('REACT_APP_CHATBOT_API_URL', 'http://localhost:8000/api/v1/chat/query');
  private static BACKEND_BASE_URL = getEnvVar('REACT_APP_BACKEND_API_URL', 'http://localhost:8000');

  static async sendMessage(
    query: string,
    sessionId: string,
    context: string = ''
  ): Promise<ChatResponse> {
    try {
      // Implement retry mechanism
      const maxRetries = 3;
      let lastError: any;

      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
          console.log(`Chat API call attempt ${attempt} for session ${sessionId}`);

          const response = await fetch(this.API_BASE_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              query,
              context,
              sessionId,
            } as ChatRequest),
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data: Omit<ChatResponse, 'timestamp'> & { timestamp: string } =
            await response.json();

          // Convert timestamp string to Date object
          return {
            ...data,
            timestamp: new Date(data.timestamp),
          } as ChatResponse;
        } catch (error: any) {
          console.error(`Chat API call attempt ${attempt} failed:`, error.message);
          lastError = error;

          // Don't wait after the last attempt
          if (attempt < maxRetries) {
            // Exponential backoff: wait 1s, 2s, 4s between retries
            const waitTime = Math.pow(2, attempt) * 1000;
            console.log(`Waiting ${waitTime}ms before retry ${attempt + 1}`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
          }
        }
      }

      // If all retries failed, throw the last error
      throw lastError;
    } catch (error) {
      console.error('Error in ChatService.sendMessage:', error);
      throw error;
    }
  }

  static async initializeSession(userId?: string): Promise<string> {
    try {
      // Call the backend to create a new session
      const response = await fetch(`${this.BACKEND_BASE_URL}/api/v1/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_preferences: { language: 'en' }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.session_id;
    } catch (error) {
      console.error('Error initializing session:', error);
      // Fallback to client-generated ID if backend call fails
      return `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  static async clearConversationHistory(sessionId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.BACKEND_BASE_URL}/api/v1/sessions/${sessionId}/history`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('Error clearing conversation history:', error);
      return false;
    }
  }
}

export { ChatService };