"""
HealthGPT Symptom Analysis Routes.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/symptoms",
    tags=["02 - Symptom Analysis"]
)


class SymptomRequest(BaseModel):

    symptoms: list[str] = Field(
        ...,
        min_length=1
    )

    age: int | None = Field(
        default=None,
        ge=0,
        le=120
    )

    gender: str | None = None


@router.post("/analyze")
async def analyze_symptoms(
    request: SymptomRequest
):
    """
    Analyze supplied symptoms.

    This endpoint provides informational pattern matching.
    It does not diagnose disease.
    """

    symptoms = [
        symptom.strip().lower()
        for symptom in request.symptoms
        if symptom.strip()
    ]

    if not symptoms:

        return {
            "success": False,
            "message": "Please provide at least one symptom."
        }

    groups = {

        "respiratory": [
            "cough",
            "sore throat",
            "runny nose",
            "blocked nose",
            "wheezing",
            "shortness of breath"
        ],

        "flu_like": [
            "fever",
            "fatigue",
            "headache",
            "body ache",
            "chills",
            "cough"
        ],

        "gastrointestinal": [
            "nausea",
            "vomiting",
            "diarrhea",
            "abdominal pain",
            "stomach pain"
        ],

        "allergic": [
            "sneezing",
            "itchy eyes",
            "rash",
            "runny nose"
        ]
    }

    patterns = []

    symptom_set = set(symptoms)

    for group, known in groups.items():

        matched = sorted(
            symptom_set.intersection(
                known
            )
        )

        if matched:

            patterns.append({
                "pattern": group,
                "matched_symptoms": matched,
                "match_count": len(matched)
            })

    patterns.sort(
        key=lambda item: item["match_count"],
        reverse=True
    )

    return {
        "success": True,
        "module": "Symptom Analysis",
        "symptoms": symptoms,
        "age": request.age,
        "gender": request.gender,
        "possible_patterns": patterns,
        "disclaimer": (
            "This is informational symptom analysis "
            "and is not a medical diagnosis."
        )
    }