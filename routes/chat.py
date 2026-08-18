"""
HealthGPT AI Health Chatbot Routes.
"""

from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/chat",
    tags=["01 - AI Health Chatbot"]
)


# ============================================================
# REQUEST SCHEMA
# ============================================================

class ChatRequest(BaseModel):

    message: str = Field(
        ...,
        min_length=1,
        max_length=5000
    )

    user_id: int | None = None

    conversation_id: int | None = None


# ============================================================
# RESPONSE
# ============================================================

@router.post("")
async def chat(
    request: ChatRequest
):
    """
    Send a message to HealthGPT.

    The actual LLM can be connected through the AI/service
    layer later.
    """

    message = request.message.strip()

    # --------------------------------------------------------
    # Basic emergency detection
    # --------------------------------------------------------

    emergency_terms = [
        "chest pain",
        "can't breathe",
        "cannot breathe",
        "severe bleeding",
        "unconscious",
        "stroke",
        "heart attack"
    ]

    emergency = any(
        term in message.lower()
        for term in emergency_terms
    )

    if emergency:

        response = (
            "Your message may describe a medical emergency. "
            "Please seek urgent medical attention immediately "
            "rather than relying on an AI response."
        )

    else:

        response = (
            "Hello! I'm HealthGPT. I can help you understand "
            "general health information, symptoms, medicines, "
            "health reports and wellness topics. "
            "I cannot replace a qualified healthcare professional."
        )

    return {
        "success": True,
        "module": "AI Health Chatbot",
        "message": message,
        "response": response,
        "emergency_detected": emergency,
        "conversation_id": request.conversation_id,
        "timestamp": datetime.utcnow().isoformat()
    }