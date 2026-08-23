from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import router
from knowledge_service import seed_knowledge

# Import models before table creation so every mapped table is registered.
import models  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealthGPT",
    description=(
        "AI-powered healthcare information platform with conversational AI, "
        "symptom analysis, medicine intelligence, disease prediction, OCR, "
        "health records, nutrition, wellness, analytics, digital health twin "
        "and a scalable healthcare knowledge base."
    ),
    version="2.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
def root():
    return {
        "application": "HealthGPT",
        "status": "running",
        "version": "2.1.0",
        "documentation": "/docs",
        "modules": [
            "AI Health Chatbot", "Symptom Analysis", "Medicine Intelligence",
            "Disease Prediction", "Medical OCR", "Health Records",
            "Personalized Recommendations", "AI Health Agent", "Nutrition Planner",
            "Mental Wellness", "Health Metrics", "Health Analytics",
            "Digital Health Twin", "Healthcare Knowledge Base"
        ],
    }

@app.on_event("startup")
async def startup():
    # Seeds only missing records; existing knowledge is never duplicated.
    from database import SessionLocal
    db = SessionLocal()
    try:
        added = seed_knowledge(db)
        print(f"HealthGPT knowledge base: {added} seed entries added")
    finally:
        db.close()
    print("=" * 60)
    print("          HEALTHGPT BACKEND STARTED")
    print("=" * 60)
    print("API      : http://127.0.0.1:8000")
    print("Swagger  : http://127.0.0.1:8000/docs")
    print("ReDoc    : http://127.0.0.1:8000/redoc")
    print("=" * 60)
