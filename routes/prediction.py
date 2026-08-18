"""
HealthGPT Disease Prediction Routes.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/prediction",
    tags=["04 - Disease Prediction"]
)


class PredictionRequest(BaseModel):

    symptoms: list[str] = Field(
        ...,
        min_length=1
    )

    age: int | None = None

    gender: str | None = None


@router.post("")
async def predict_disease(
    request: PredictionRequest
):

    symptoms = [
        symptom.strip().lower()
        for symptom in request.symptoms
        if symptom.strip()
    ]

    if not symptoms:

        return {
            "success": False,
            "message": "No symptoms supplied."
        }

    # --------------------------------------------------------
    # Baseline prediction.
    #
    # Replace this with the trained model from:
    # trained_models/disease_model.joblib
    # --------------------------------------------------------

    prediction = "Insufficient information"

    probability = 0.0

    if (
        "fever" in symptoms
        and "cough" in symptoms
    ):

        prediction = (
            "Influenza-like illness pattern"
        )

        probability = 0.65

    elif (
        "runny nose" in symptoms
        and "sneezing" in symptoms
    ):

        prediction = (
            "Common-cold/allergic pattern"
        )

        probability = 0.55

    return {
        "success": True,
        "module": "Disease Prediction",
        "prediction": prediction,
        "probability": probability,
        "model": "HealthGPT-Baseline",
        "symptoms": symptoms,
        "disclaimer": (
            "This is an experimental informational prediction "
            "and must not be treated as a medical diagnosis."
        )
    }