"""
HealthGPT AI Agent.

Coordinates:
    User request
        ↓
    Intent detection
        ↓
    HealthGPT module
        ↓
    LLM when appropriate
"""

from .llm_client import LLMClient
from .prompt_manager import PromptManager


class HealthGPTAgent:

    def __init__(
        self,
        llm_client: LLMClient | None = None,
    ):

        self.llm_client = llm_client

    # ========================================================
    # INTENT DETECTION
    # ========================================================

    @staticmethod
    def detect_intent(
        message: str
    ) -> str:

        text = message.lower().strip()

        module_keywords = {

            "medicine": [
                "medicine",
                "tablet",
                "capsule",
                "drug",
                "medication",
                "dose",
            ],

            "symptoms": [
                "symptom",
                "fever",
                "cough",
                "headache",
                "pain",
                "nausea",
                "vomiting",
            ],

            "prediction": [
                "predict",
                "disease",
                "risk",
                "probability",
            ],

            "ocr": [
                "prescription",
                "medical report",
                "scan",
                "ocr",
            ],

            "dashboard": [
                "dashboard",
                "health score",
                "steps",
                "sleep",
                "hydration",
            ],

            "records": [
                "health record",
                "medical history",
                "health history",
            ],

            "recommendations": [
                "recommend",
                "diet",
                "nutrition",
                "exercise",
                "wellness",
            ],
        }

        for intent, keywords in (
            module_keywords.items()
        ):

            if any(
                keyword in text
                for keyword in keywords
            ):

                return intent

        return "chat"

    # ========================================================
    # PROCESS
    # ========================================================

    async def process(
        self,
        message: str,
        context: str | None = None,
    ) -> dict:

        message = message.strip()

        if not message:

            return {
                "success": False,
                "message": "Message cannot be empty.",
            }

        intent = self.detect_intent(
            message
        )

        prompt = (
            PromptManager.build_chat_prompt(
                message,
                context,
            )
        )

        # ----------------------------------------------------
        # LLM
        # ----------------------------------------------------

        if self.llm_client:

            try:

                response = await self.llm_client.generate(
                    user_prompt=prompt,
                    system_prompt=(
                        PromptManager.system_prompt()
                    ),
                )

                return {
                    "success": True,
                    "intent": intent,
                    "response": response,
                    "source": "llm",
                }

            except Exception as exc:

                return {
                    "success": True,
                    "intent": intent,
                    "response": self._fallback_response(
                        intent
                    ),
                    "source": "fallback",
                    "llm_error": str(exc),
                }

        # ----------------------------------------------------
        # Fallback
        # ----------------------------------------------------

        return {
            "success": True,
            "intent": intent,
            "response": self._fallback_response(
                intent
            ),
            "source": "fallback",
        }

    # ========================================================
    # FALLBACK
    # ========================================================

    @staticmethod
    def _fallback_response(
        intent: str
    ) -> str:

        responses = {

            "medicine": (
                "I can help explain general medicine "
                "information. Please provide the exact "
                "medicine name and formulation."
            ),

            "symptoms": (
                "I can help organize and explain your "
                "symptoms, but symptom analysis cannot "
                "confirm a diagnosis."
            ),

            "prediction": (
                "HealthGPT can provide experimental "
                "risk or prediction information when "
                "a validated model and appropriate data "
                "are available."
            ),

            "ocr": (
                "Upload a clear medical document or "
                "prescription image and HealthGPT can "
                "extract its text through the OCR module."
            ),

            "dashboard": (
                "The Health Dashboard can analyze "
                "wellness metrics such as activity, "
                "sleep and hydration."
            ),

            "records": (
                "Health Records can organize your "
                "health information and documents."
            ),

            "recommendations": (
                "I can provide general nutrition, "
                "activity and wellness recommendations "
                "based on the information you provide."
            ),

            "chat": (
                "I'm HealthGPT. I can help with general "
                "health information, symptoms, medicines, "
                "nutrition, medical reports and wellness."
            ),
        }

        return responses.get(
            intent,
            responses["chat"],
        )