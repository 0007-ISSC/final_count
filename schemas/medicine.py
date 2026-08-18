"""
HealthGPT Medicine Intelligence Schemas.
"""

from pydantic import (
    BaseModel,
    Field,
)


class MedicineRequest(BaseModel):
    """
    Medicine analysis request.
    """

    medicine_name: str = Field(
        ...,
        min_length=1,
        max_length=200,
    )

    ingredients: list[str] = Field(
        default_factory=list,
    )

    user_age: int | None = Field(
        default=None,
        ge=0,
        le=120,
    )

    allergies: list[str] = Field(
        default_factory=list,
    )


class MedicineInformation(BaseModel):

    generic_name: str

    common_uses: list[str] = Field(
        default_factory=list
    )

    warnings: list[str] = Field(
        default_factory=list
    )


class MedicineResponse(BaseModel):

    success: bool = True

    medicine: str

    ingredients: list[str] = Field(
        default_factory=list
    )

    age: int | None = None

    allergies: list[str] = Field(
        default_factory=list
    )

    information: MedicineInformation

    allergy_alerts: list[str] = Field(
        default_factory=list
    )

    disclaimer: str = (
        "HealthGPT provides educational medicine "
        "information and does not prescribe medicines."
    )