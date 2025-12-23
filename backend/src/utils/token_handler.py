from ..config.settings import settings


def truncate_message_if_needed(message: str) -> str:
    """
    Truncate the message if it exceeds the maximum allowed length.

    Args:
        message: The input message to potentially truncate

    Returns:
        The message, possibly truncated to the maximum allowed length
    """
    if len(message) > settings.max_message_length:
        # Truncate the message and add an indicator that it was truncated
        truncated = message[:settings.max_message_length]
        # Ensure we don't cut off in the middle of a word if possible
        if len(message) > settings.max_message_length:
            # Find the last space within the limit to avoid cutting words
            last_space = truncated.rfind(' ')
            if last_space != -1:
                truncated = truncated[:last_space]

        return truncated + "..."
    return message