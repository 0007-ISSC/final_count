"""
HealthGPT AI Chatbot Service.
"""

from datetime import datetime
from typing import Optional


class ChatbotService:
    """
    Business logic for the HealthGPT chatbot.

    The LLM can be connected later through the AI layer.
    """

    def __init__(self, llm_client=None):
        self.llm_client = llm_client

    # ========================================================
    # MAIN CHAT FUNCTION
    # ========================================================

    async def chat(
        self,
        message: str,
        user_id: Optional[int] = None,
        conversation_id: Optional[int] = None,
    ) -> dict:

        message = message.strip()

        if not message:
            return {
                "success": False,
                "message": "Message cannot be empty.",
            }

        emergency = self.detect_emergency(
            message
        )

        if emergency:

            response = (
                "Your message may describe a medical emergency. "
                "Please seek urgent medical attention immediately "
                "instead of relying on an AI response."
            )

        elif self.llm_client:

            try:

                response = await self.llm_client.generate(
                    message
                )

            except Exception:

                response = self.fallback_response(
                    message
                )

        else:

            response = self.fallback_response(
                message
            )

        return {
            "success": True,
            "response": response,
            "emergency_detected": emergency,
            "user_id": user_id,
            "conversation_id": conversation_id,
            "timestamp": datetime.utcnow().isoformat(),
        }

    # ========================================================
    # EMERGENCY DETECTION
    # ========================================================

    @staticmethod
    def detect_emergency(
        message: str
    ) -> bool:

        emergency_terms = [
            "chest pain",
            "severe chest pain",
            "can't breathe",
            "cannot breathe",
            "difficulty breathing",
            "severe bleeding",
            "unconscious",
            "stroke",
            "heart attack",
            "suicidal",
            "overdose",
        ]

        text = message.lower()

        return any(
            term in text
            for term in emergency_terms
        )

    # ========================================================
    # FALLBACK RESPONSE
    # ========================================================

    @staticmethod
    def fallback_response(
        message: str
    ) -> str:

        text = message.lower()

        if "medicine" in text:

            return (
                "I can provide general information about medicines, "
                "but medication decisions should be verified with "
                "a qualified healthcare professional."
            )

        if "symptom" in text:

            return (
                "I can help organize and explain symptoms, but "
                "symptom information alone cannot establish a diagnosis."
            )

        if "diet" in text:

            return (
                "I can help you plan general nutrition ideas based "
                "on your dietary preferences and goals."
            )

        if "sleep" in text:

            return (
                "Consistent sleep timing, an appropriate sleep "
                "duration, and a comfortable sleep environment "
                "can support general wellbeing."
            )

        return (
            "I'm HealthGPT. I can help with general health "
            "information, symptoms, medicines, nutrition, "
            "health records and wellness."
        )