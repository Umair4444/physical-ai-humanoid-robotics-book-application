import uuid
from datetime import datetime, timedelta
from typing import Optional, List
import threading

from ..models.conversation_session import ConversationSession
from ..storage.conversation_store import get_conversation, save_conversation, delete_conversation
from ..models.message import Message

class SessionManager:
    def __init__(self, session_timeout_minutes: int = 15, max_context_tokens: int = 30720):  # 30720 tokens is roughly 24k words
        self.session_timeout_minutes = session_timeout_minutes
        self.max_context_tokens = max_context_tokens  # Maximum tokens for context window
        self.lock = threading.Lock()  # For thread-safe operations

    def create_session(self, user_preferences: Optional[dict] = None) -> ConversationSession:
        """Create a new conversation session."""
        with self.lock:
            session_id = str(uuid.uuid4())
            now = datetime.now()

            session = ConversationSession(
                session_id=session_id,
                created_at=now,
                last_activity_at=now,
                is_active=True,
                user_id=None  # Initially no user_id since there's no authentication
            )

            save_conversation(session)
            return session

    def get_session(self, session_id: str) -> Optional[ConversationSession]:
        """Get an existing conversation session."""
        with self.lock:
            session = get_conversation(session_id)
            if session and self._is_session_active(session):
                # Update last activity time
                session.last_activity_at = datetime.now()
                save_conversation(session)
                return session
            elif session:
                # Session exists but is expired, delete it
                delete_conversation(session_id)
            return None

    def add_message(self, session_id: str, message: Message) -> bool:
        """Add a message to the conversation session."""
        with self.lock:
            session = get_conversation(session_id)
            if not session or not self._is_session_active(session):
                if session:
                    delete_conversation(session_id)
                return False

            session.messages.append(message)
            session.last_activity_at = datetime.now()
            save_conversation(session)
            return True

    def get_messages(self, session_id: str) -> Optional[list]:
        """Get all messages for a session."""
        with self.lock:
            session = get_conversation(session_id)
            if session and self._is_session_active(session):
                session.last_activity_at = datetime.now()
                save_conversation(session)
                return session.messages
            elif session:
                delete_conversation(session_id)
            return None

    def clear_messages(self, session_id: str) -> bool:
        """Clear all messages in a session while keeping the session active."""
        with self.lock:
            session = get_conversation(session_id)
            if not session or not self._is_session_active(session):
                if session:
                    delete_conversation(session_id)
                return False

            session.messages = []
            session.last_activity_at = datetime.now()
            save_conversation(session)
            return True

    def format_conversation_history(self, session_id: str) -> List[dict]:
        """
        Format conversation history for LLM requests.

        Returns a list of dictionaries with 'role' and 'content' keys
        suitable for OpenAI-compatible API format.
        """
        messages = self.get_messages(session_id)
        if not messages:
            return []

        formatted_history = []
        for msg in messages:
            # Map our sender to OpenAI role format
            role = "user" if msg.sender == "user" else "assistant"
            formatted_history.append({
                "role": role,
                "content": msg.content
            })

        return formatted_history

    def get_context_window_size(self, session_id: str) -> int:
        """
        Estimate the token count of the conversation history.
        This is a rough estimation based on character count.
        1 token is roughly 4 characters in English text.
        """
        messages = self.get_messages(session_id)
        if not messages:
            return 0

        total_chars = 0
        for msg in messages:
            total_chars += len(msg.content)

        # Rough estimation: 1 token ≈ 4 characters
        return total_chars // 4

    def is_context_window_full(self, session_id: str) -> bool:
        """
        Check if the context window is approaching the maximum.
        """
        current_tokens = self.get_context_window_size(session_id)
        return current_tokens >= self.max_context_tokens

    def truncate_oldest_messages(self, session_id: str, target_size: int = None) -> bool:
        """
        Truncate oldest messages to maintain context window size.
        """
        if target_size is None:
            # Default to 75% of max to create buffer
            target_size = int(self.max_context_tokens * 0.75)

        with self.lock:
            session = get_conversation(session_id)
            if not session or not self._is_session_active(session):
                if session:
                    delete_conversation(session_id)
                return False

            # Keep removing oldest messages until under target size
            while len(session.messages) > 2:  # Keep at least 2 messages (last user and AI response)
                current_tokens = self.get_context_window_size(session_id)
                if current_tokens <= target_size:
                    break

                # Remove the oldest message (index 0)
                session.messages.pop(0)

            save_conversation(session)
            return True

    def _is_session_active(self, session: ConversationSession) -> bool:
        """Check if a session is still active based on timeout."""
        time_since_last_activity = datetime.now() - session.last_activity_at
        return time_since_last_activity < timedelta(minutes=self.session_timeout_minutes)

    def cleanup_expired_sessions(self):
        """Remove all expired sessions from storage."""
        from ..storage.conversation_store import get_all_conversations

        with self.lock:
            all_sessions = get_all_conversations()
            now = datetime.now()

            for session in all_sessions:
                time_since_last_activity = now - session.last_activity_at
                if time_since_last_activity >= timedelta(minutes=self.session_timeout_minutes):
                    delete_conversation(session.session_id)