from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import Base, engine
from routes import router


# =========================================================
# DATABASE INITIALIZATION
# =========================================================

# Creates database tables automatically
# during the initial development phase.

Base.metadata.create_all(
    bind=engine
)


# =========================================================
# FASTAPI APPLICATION
# =========================================================

app = FastAPI(
    title="HealthGPT",
    description=(
        "AI-powered health information platform "
        "with chatbot, ML, OCR, health records "
        "and agentic AI."
    ),
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)


# =========================================================
# ROUTES
# =========================================================

app.include_router(
    router
)


# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "application": "HealthGPT",
        "status": "running",
        "message": "HealthGPT backend is online.",
        "documentation": "/docs"
    }


# =========================================================
# STARTUP
# =========================================================

@app.on_event("startup")
async def startup():

    print("=" * 60)
    print("          HEALTHGPT BACKEND STARTED")
    print("=" * 60)
    print("API      : http://127.0.0.1:8000")
    print("Swagger  : http://127.0.0.1:8000/docs")
    print("ReDoc    : http://127.0.0.1:8000/redoc")
    print("=" * 60)