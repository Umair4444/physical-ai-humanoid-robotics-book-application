import sys
import os

# Add the src directory to the path so modules can be imported
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from src.api.main import app
from src.config.settings import settings


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "src.api.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
    )