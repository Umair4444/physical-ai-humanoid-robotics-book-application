class ChatbotException(Exception):
    """Base exception class for chatbot-related errors."""
    def __init__(self, error_code: str, message: str, status_code: int = 500):
        self.error_code = error_code
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)


class SessionNotFoundException(ChatbotException):
    """Exception raised when a session is not found."""
    def __init__(self, session_id: str):
        super().__init__(
            error_code="SESSION_NOT_FOUND",
            message=f"The specified session does not exist or has expired: {session_id}",
            status_code=404
        )


class SessionExpiredException(ChatbotException):
    """Exception raised when a session has expired."""
    def __init__(self, session_id: str):
        super().__init__(
            error_code="SESSION_EXPIRED",
            message=f"Session has expired due to inactivity: {session_id}",
            status_code=400
        )


class InvalidSessionIdException(ChatbotException):
    """Exception raised when an invalid session ID is provided."""
    def __init__(self, session_id: str):
        super().__init__(
            error_code="INVALID_SESSION_ID",
            message=f"Invalid session ID format: {session_id}",
            status_code=400
        )


class MessageTooLongException(ChatbotException):
    """Exception raised when a message exceeds the maximum length."""
    def __init__(self, max_length: int = 4000):
        super().__init__(
            error_code="MESSAGE_TOO_LONG",
            message=f"Message exceeds maximum length of {max_length} characters",
            status_code=400
        )


class EmptyMessageException(ChatbotException):
    """Exception raised when an empty message is provided."""
    def __init__(self):
        super().__init__(
            error_code="EMPTY_MESSAGE",
            message="Message cannot be empty",
            status_code=400
        )


class InvalidPreferencesException(ChatbotException):
    """Exception raised when invalid user preferences are provided."""
    def __init__(self, details: str = ""):
        message = "Invalid user preferences provided"
        if details:
            message += f": {details}"
        super().__init__(
            error_code="INVALID_PREFERENCES",
            message=message,
            status_code=400
        )


class LLMServiceUnavailableException(ChatbotException):
    """Exception raised when the LLM service is unavailable."""
    def __init__(self, details: str = ""):
        message = "The LLM service is temporarily unavailable"
        if details:
            message += f": {details}"
        super().__init__(
            error_code="LLM_SERVICE_UNAVAILABLE",
            message=message,
            status_code=503
        )


class InvalidJSONException(ChatbotException):
    """Exception raised when invalid JSON is provided."""
    def __init__(self):
        super().__init__(
            error_code="INVALID_JSON",
            message="Invalid JSON format",
            status_code=400
        )