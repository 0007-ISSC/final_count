from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import Base, engine
from routes import router

# Database tables are created automatically for development.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HealthGPT",
    description=(
        "AI-powered healthcare information platform with conversational AI, "
        "symptom analysis, medicine intelligence, disease prediction, OCR, "
        "health records, nutrition, wellness, health analytics and a digital health twin."
    ),
    version="2.0.0",
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
        "version": "2.0.0",
        "documentation": "/docs",
        "modules": [
            "AI Chatbot", "Symptom Analysis", "Medicine Intelligence",
            "Disease Prediction", "Medical OCR", "Health Records",
            "Personalized Recommendations", "AI Health Agent",
            "Nutrition Planner", "Mental Wellness", "Health Analytics",
            "Digital Health Twin"
        ],
    }

@app.on_event("startup")
async def startup():
    print("=" * 60)
    print("          HEALTHGPT BACKEND STARTED")
    print("=" * 60)
    print("API      : http://127.0.0.1:8000")
    print("Swagger  : http://127.0.0.1:8000/docs")
    print("ReDoc    : http://127.0.0.1:8000/redoc")
    print("=" * 60)
