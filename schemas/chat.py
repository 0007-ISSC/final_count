"""
HealthGPT Chatbot Schemas.
"""

from datetime import datetime

from pydantic import (
    BaseModel,
    Field,
)


class ChatRequest(BaseModel):
    """
    Data received when a user sends a message.
    """

    message: str = Field(
        ...,
        min_length=1,
        max_length=5000,
        description="User's health-related message.",
    )

    user_id: int | None = Field(
        default=None,
        description="Optional user ID.",
    )

    conversation_id: int | None = Field(
        default=None,
        description="Optional conversation ID.",
    )


class ChatResponse(BaseModel):
    """
    Response returned by HealthGPT chatbot.
    """

    success: bool = True

    response: str

    emergency_detected: bool = False

    user_id: int | None = None

    conversation_id: int | None = None

    timestamp: datetime | None = None

    disclaimer: str = (
        "HealthGPT provides general health information "
        "and does not replace a qualified healthcare professional."
    )