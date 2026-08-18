"""
HealthGPT Symptom Analysis Schemas.
"""

from pydantic import (
    BaseModel,
    Field,
)


class SymptomRequest(BaseModel):
    """
    User symptom information.
    """

    symptoms: list[str] = Field(
        ...,
        min_length=1,
        description="List of symptoms.",
    )

    age: int | None = Field(
        default=None,
        ge=0,
        le=120,
    )

    gender: str | None = Field(
        default=None,
        max_length=50,
    )


class SymptomPattern(BaseModel):
    """
    Detected symptom pattern.
    """

    pattern: str

    matched_symptoms: list[str] = []

    match_count: int = 0

    score: float = 0.0


class SymptomResponse(BaseModel):
    """
    Symptom analysis response.
    """

    success: bool = True

    symptoms: list[str]

    age: int | None = None

    gender: str | None = None

    patterns: list[SymptomPattern] = []

    severity: str = "low"

    disclaimer: str = (
        "This is informational symptom analysis "
        "and is not a medical diagnosis."
    )