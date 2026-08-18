"""
HealthGPT API Routes

Central route registration for the nine HealthGPT modules.
"""

from fastapi import APIRouter

from .chat import router as chat_router
from .symptoms import router as symptoms_router
from .medicine import router as medicine_router
from .prediction import router as prediction_router
from .ocr import router as ocr_router
from .dashboard import router as dashboard_router
from .records import router as records_router
from .recommendations import router as recommendations_router
from .agent import router as agent_router


router = APIRouter()


# ============================================================
# REGISTER ALL HEALTHGPT MODULES
# ============================================================

router.include_router(
    chat_router,
    prefix="/api"
)

router.include_router(
    symptoms_router,
    prefix="/api"
)

router.include_router(
    medicine_router,
    prefix="/api"
)

router.include_router(
    prediction_router,
    prefix="/api"
)

router.include_router(
    ocr_router,
    prefix="/api"
)

router.include_router(
    dashboard_router,
    prefix="/api"
)

router.include_router(
    records_router,
    prefix="/api"
)

router.include_router(
    recommendations_router,
    prefix="/api"
)

router.include_router(
    agent_router,
    prefix="/api"
)


__all__ = ["router"]