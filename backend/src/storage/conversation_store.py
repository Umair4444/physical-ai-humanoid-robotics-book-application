from typing import Dict, List, TYPE_CHECKING
import threading

if TYPE_CHECKING:
    from ..models.conversation_session import ConversationSession

# Thread-safe storage for sessions
conversations: Dict[str, 'ConversationSession'] = {}
conversations_lock = threading.Lock()

def get_conversation(session_id: str) -> 'ConversationSession':
    with conversations_lock:
        return conversations.get(session_id)

def save_conversation(session: 'ConversationSession') -> None:
    with conversations_lock:
        conversations[session.session_id] = session

def delete_conversation(session_id: str) -> bool:
    with conversations_lock:
        if session_id in conversations:
            del conversations[session_id]
            return True
        return False

def get_all_conversations() -> List['ConversationSession']:
    with conversations_lock:
        return list(conversations.values())