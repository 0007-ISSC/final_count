"""
HealthGPT Health Dashboard Routes.
"""

from fastapi import APIRouter
from pydantic import BaseModel


router = APIRouter(
    prefix="/dashboard",
    tags=["06 - Health Dashboard"]
)


class DashboardData(BaseModel):

    steps: int = 0

    sleep_hours: float = 0.0

    hydration_liters: float = 0.0

    resting_heart_rate: int = 0

    health_score: float = 0.0


@router.post("/calculate")
async def calculate_dashboard(
    data: DashboardData
):

    # --------------------------------------------------------
    # Simple wellness score.
    # This is NOT a clinical risk score.
    # --------------------------------------------------------

    score = 0.0

    # Steps
    if data.steps >= 8000:
        score += 25

    elif data.steps >= 5000:
        score += 18

    elif data.steps >= 2500:
        score += 10


    # Sleep
    if 7 <= data.sleep_hours <= 9:
        score += 25

    elif 6 <= data.sleep_hours < 7:
        score += 18

    elif data.sleep_hours > 9:
        score += 18


    # Hydration
    if data.hydration_liters >= 2:
        score += 25

    elif data.hydration_liters >= 1.5:
        score += 18

    elif data.hydration_liters >= 1:
        score += 10


    # Resting heart rate
    if (
        60 <=
        data.resting_heart_rate <=
        80
    ):
        score += 25

    elif (
        50 <=
        data.resting_heart_rate <=
        90
    ):
        score += 18

    score = min(
        score,
        100
    )

    return {
        "success": True,
        "module": "Health Dashboard",
        "health_score": round(
            score,
            1
        ),
        "metrics": {
            "steps": data.steps,
            "sleep_hours": data.sleep_hours,
            "hydration_liters": data.hydration_liters,
            "resting_heart_rate": data.resting_heart_rate
        },
        "disclaimer": (
            "This wellness score is an educational indicator "
            "and is not a medical assessment."
        )
    }