from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def base_endpoint():
    return {"message": "Base API endpoint for AI Chatbot"}