from fastapi import APIRouter
from intelligence_engine import HealthIntelligence

router = APIRouter(prefix="/api/intelligence", tags=["Health Intelligence"])

@router.post("/reason")
def reason(symptoms: list[str], duration_days: float = 1.0, stress: float = 0.0):
    return {"success": True, "module": "TMS + Fuzzy Logic + KBA", **HealthIntelligence().analyze(symptoms, duration_days, stress)}
