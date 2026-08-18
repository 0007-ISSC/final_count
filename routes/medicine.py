"""
HealthGPT Medicine Analyzer Routes.
"""

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/medicine",
    tags=["03 - Medicine Intelligence"]
)


class MedicineRequest(BaseModel):

    medicine_name: str = Field(
        ...,
        min_length=1,
        max_length=200
    )

    ingredients: list[str] = []

    user_age: int | None = None

    allergies: list[str] = []


# Basic educational medicine information.
MEDICINE_DATABASE = {

    "paracetamol": {
        "common_uses": [
            "Fever",
            "Mild to moderate pain"
        ],
        "warnings": [
            "Do not exceed the labeled dose.",
            "Check combination medicines for duplicate ingredients."
        ]
    },

    "acetaminophen": {
        "common_uses": [
            "Fever",
            "Mild to moderate pain"
        ],
        "warnings": [
            "Do not exceed the labeled dose."
        ]
    },

    "ibuprofen": {
        "common_uses": [
            "Pain",
            "Inflammation",
            "Fever"
        ],
        "warnings": [
            "May not be appropriate for everyone.",
            "Check with a healthcare professional if you have relevant medical conditions or take other medicines."
        ]
    }
}


@router.post("/analyze")
async def analyze_medicine(
    request: MedicineRequest
):

    name = request.medicine_name.strip()

    data = MEDICINE_DATABASE.get(
        name.lower()
    )

    if data is None:

        data = {
            "common_uses": [
                "Exact uses depend on the formulation."
            ],
            "warnings": [
                "Verify the exact product information.",
                "Consult a pharmacist or healthcare professional for personalized advice."
            ]
        }

    return {
        "success": True,
        "module": "Medicine Intelligence",
        "medicine": name,
        "ingredients": request.ingredients,
        "common_uses": data["common_uses"],
        "warnings": data["warnings"],
        "user_age": request.user_age,
        "allergies": request.allergies,
        "disclaimer": (
            "HealthGPT provides educational medicine information "
            "and does not prescribe or replace a healthcare professional."
        )
    }