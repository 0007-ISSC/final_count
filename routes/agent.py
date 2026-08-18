"""
HealthGPT AI Health Agent Routes.

The agent determines which HealthGPT module should handle
a user's request.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/agent",
    tags=["09 - AI Health Agent"]
)


class AgentRequest(BaseModel):

    message: str = Field(
        ...,
        min_length=1,
        max_length=5000
    )


@router.post("/route")
async def route_request(
    request: AgentRequest
):

    message = request.message.lower()

    # --------------------------------------------------------
    # Medicine
    # --------------------------------------------------------

    medicine_words = [
        "medicine",
        "tablet",
        "capsule",
        "drug",
        "dose",
        "medication"
    ]

    if any(
        word in message
        for word in medicine_words
    ):

        selected_module = (
            "Medicine Intelligence"
        )

        endpoint = (
            "/api/medicine/analyze"
        )


    # --------------------------------------------------------
    # Symptoms
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "symptom",
            "fever",
            "cough",
            "headache",
            "pain",
            "nausea",
            "vomiting"
        ]
    ):

        selected_module = (
            "Symptom Analysis"
        )

        endpoint = (
            "/api/symptoms/analyze"
        )


    # --------------------------------------------------------
    # Prediction
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "predict",
            "disease",
            "risk",
            "probability"
        ]
    ):

        selected_module = (
            "Disease Prediction"
        )

        endpoint = (
            "/api/prediction"
        )


    # --------------------------------------------------------
    # OCR
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "report",
            "scan",
            "prescription",
            "medical document",
            "ocr"
        ]
    ):

        selected_module = (
            "Medical OCR"
        )

        endpoint = (
            "/api/ocr/analyze"
        )


    # --------------------------------------------------------
    # Dashboard
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "dashboard",
            "health score",
            "analytics",
            "steps",
            "sleep",
            "hydration"
        ]
    ):

        selected_module = (
            "Health Dashboard"
        )

        endpoint = (
            "/api/dashboard/calculate"
        )


    # --------------------------------------------------------
    # Records
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "record",
            "medical history",
            "health history"
        ]
    ):

        selected_module = (
            "Health Records"
        )

        endpoint = (
            "/api/records"
        )


    # --------------------------------------------------------
    # Recommendations
    # --------------------------------------------------------

    elif any(
        word in message
        for word in [
            "recommend",
            "diet",
            "nutrition",
            "wellness",
            "exercise"
        ]
    ):

        selected_module = (
            "Personalized Recommendations"
        )

        endpoint = (
            "/api/recommendations"
        )


    # --------------------------------------------------------
    # Default
    # --------------------------------------------------------

    else:

        selected_module = (
            "AI Health Chatbot"
        )

        endpoint = (
            "/api/chat"
        )


    return {
        "success": True,
        "module": "AI Health Agent",
        "user_message": request.message,
        "selected_module": selected_module,
        "endpoint": endpoint,
        "routing_reason": (
            "HealthGPT Agent selected the module "
            "based on the detected intent."
        )
    }