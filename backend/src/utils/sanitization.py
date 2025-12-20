import re

def sanitize_input(text: str) -> str:
    """Basic input sanitization to prevent injection attacks."""
    if not text:
        return text
    
    # Remove potentially dangerous characters/sequences
    # This is a basic implementation - in production, use a more robust sanitization library
    sanitized = re.sub(r'<script.*?>.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
    sanitized = re.sub(r'javascript:', '', sanitized, flags=re.IGNORECASE)
    sanitized = re.sub(r'on\w+\s*=', '', sanitized, flags=re.IGNORECASE)
    
    return sanitized.strip()