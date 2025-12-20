import asyncio
import logging
from datetime import datetime
from ..services.session_manager import SessionManager

logger = logging.getLogger(__name__)

async def run_cleanup_task(session_manager: SessionManager, interval_minutes: int = 5):
    """
    Background task that periodically cleans up expired sessions.
    
    Args:
        session_manager: The session manager instance to use for cleanup
        interval_minutes: How often to run the cleanup task (in minutes)
    """
    while True:
        try:
            logger.info(f"Running session cleanup task at {datetime.now()}")
            session_manager.cleanup_expired_sessions()
            logger.info("Session cleanup completed")
        except Exception as e:
            logger.error(f"Error during session cleanup: {str(e)}")
        
        # Wait for the specified interval before running again
        await asyncio.sleep(interval_minutes * 60)  # Convert minutes to seconds