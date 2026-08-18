"""
HealthGPT Personalized Recommendation Routes.
"""

from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/recommendations",
    tags=["08 - Recommendations"]
)


class RecommendationRequest(BaseModel):

    age: int | None = None

    symptoms: list[str] = []

    diet: str = "balanced"

    sleep_hours: float | None = None

    activity_level: str = "moderate"


@router.post("")
async def get_recommendations(
    request: RecommendationRequest
):

    recommendations = []

    # --------------------------------------------------------
    # General wellness
    # --------------------------------------------------------

    recommendations.append(
        "Maintain a balanced and varied diet."
    )

    recommendations.append(
        "Keep a consistent sleep schedule."
    )

    recommendations.append(
        "Stay appropriately hydrated."
    )


    # --------------------------------------------------------
    # Sleep
    # --------------------------------------------------------

    if (
        request.sleep_hours is not None
        and request.sleep_hours < 7
    ):

        recommendations.append(
            "Consider improving your sleep duration and consistency."
        )


    # --------------------------------------------------------
    # Activity
    # --------------------------------------------------------

    if (
        request.activity_level.lower()
        == "low"
    ):

        recommendations.append(
            "Consider gradually increasing appropriate daily physical activity."
        )


    # --------------------------------------------------------
    # Symptoms
    # --------------------------------------------------------

    if request.symptoms:

        recommendations.append(
            "Monitor your symptoms and seek professional medical advice if they persist or worsen."
        )


    # --------------------------------------------------------
    # Diet
    # --------------------------------------------------------

    supported_diets = {
        "vegan",
        "vegetarian",
        "non-vegetarian",
        "balanced",
        "keto",
        "mediterranean"
    }

    if (
        request.diet.lower()
        not in supported_diets
    ):

        recommendations.append(
            "Choose a dietary pattern that meets your nutritional needs and personal preferences."
        )


    return {
        "success": True,
        "module": "Personalized Recommendations",
        "profile": {
            "age": request.age,
            "diet": request.diet,
            "activity_level": request.activity_level,
            "sleep_hours": request.sleep_hours
        },
        "recommendations": recommendations,
        "disclaimer": (
            "These are general wellness recommendations "
            "and are not personalized medical treatment."
        )
    }