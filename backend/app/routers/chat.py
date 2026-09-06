from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chat_service import chat_with_ai


router = APIRouter(prefix="/chat", tags=["Chat"])


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


@router.post("/", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await chat_with_ai(request.message)

        return ChatResponse(
            response=response
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI service error: {str(e)}"
        )