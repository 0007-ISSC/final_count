"""
HealthGPT Prediction Schemas.
"""

from pydantic import (
    BaseModel,
    Field,
)


class PredictionRequest(BaseModel):
    """
    Disease/risk prediction request.
    """

    symptoms: list[str] = Field(
        ...,
        min_length=1,
    )

    age: int | None = Field(
        default=None,
        ge=0,
        le=120,
    )

    gender: str | None = None


class PredictionResponse(BaseModel):

    success: bool = True

    prediction: str

    probability: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
    )

    model: str

    disclaimer: str = (
        "This is an experimental informational prediction "
        "and is not a medical diagnosis."
    )