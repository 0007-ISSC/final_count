"""Central FastAPI route registration for HealthGPT."""

from fastapi import APIRouter
from .chat import router as chat_router
from .symptoms import router as symptoms_router
from .medicine import router as medicine_router
from .prediction import router as prediction_router
from .ocr import router as ocr_router
from .dashboard import router as dashboard_router
from .records import router as records_router
from .recommendation import router as recommendation_router
from .agent import router as agent_router

router = APIRouter()
for child in (
    chat_router, symptoms_router, medicine_router, prediction_router,
    ocr_router, dashboard_router, records_router, recommendation_router,
    agent_router,
):
    router.include_router(child, prefix="/api")

__all__ = ["router"]
