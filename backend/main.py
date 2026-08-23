from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import router
from intelligence_routes import router as intelligence_router
from knowledge_service import seed_knowledge
import models  # noqa: F401

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealthGPT",
    description="AI healthcare platform with conversational AI, KBA, fuzzy reasoning, TMS, medicine intelligence, OCR, analytics and digital health twin.",
    version="2.2.0",
)

app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(router)
app.include_router(intelligence_router)

@app.get("/")
def root():
    return {
        "application": "HealthGPT", "status": "running", "version": "2.2.0", "documentation": "/docs",
        "modules": [
            "AI Health Chatbot", "Symptom Analysis", "Medicine Intelligence", "Disease Prediction", "Medical OCR",
            "Health Records", "Personalized Recommendations", "AI Health Agent", "Nutrition Planner", "Mental Wellness",
            "Health Metrics", "Health Analytics", "Digital Health Twin", "Healthcare Knowledge Base",
            "KBA", "Fuzzy Logic", "Truth Maintenance System (TMS)"
        ],
    }

@app.on_event("startup")
async def startup():
    from database import SessionLocal
    db = SessionLocal()
    try:
        added = seed_knowledge(db)
        print(f"HealthGPT knowledge base: {added} seed entries added")
    finally:
        db.close()
    print("HEALTHGPT BACKEND STARTED | Swagger: http://127.0.0.1:8000/docs")
