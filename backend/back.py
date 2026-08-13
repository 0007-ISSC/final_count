# ============================================================
#                    HEALTHGPT BACKEND
#              Calm • Intelligent • Secure
# ============================================================

from datetime import datetime
from typing import Optional

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ============================================================
# APPLICATION
# ============================================================

app = FastAPI(
    title="HealthGPT API",
    description="AI-powered personal health intelligence backend",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DEMO USER
# Replace with PostgreSQL later
# ============================================================

USER = {
    "id": 1,
    "name": "Iqra",
    "email": "user@healthgpt.local",
    "age": 20
}


# ============================================================
# DEMO HEALTH DATA
# Replace with database / wearable APIs later
# ============================================================

HEALTH_DATA = {
    "health_score": 84,

    "activity": {
        "steps": 7842,
        "goal": 10000,
        "percentage": 78
    },

    "sleep": {
        "quality": 87,
        "hours": 7.6
    },

    "hydration": {
        "current_liters": 1.8,
        "target_liters": 2.5,
        "percentage": 72
    },

    "heart": {
        "resting_bpm": 72
    },

    "health_trend": [
        71,
        74,
        76,
        78,
        80,
        82,
        84
    ]
}


# ============================================================
# REQUEST MODELS
# ============================================================

class AIQuestion(BaseModel):
    question: str = Field(
        ...,
        min_length=1,
        max_length=1000
    )


class MoodRequest(BaseModel):
    mood: str
    stress_level: Optional[int] = Field(
        default=None,
        ge=0,
        le=10
    )
    note: Optional[str] = None


class NutritionRequest(BaseModel):
    goal: str
    diet_type: str = "balanced"
    cuisine: Optional[str] = "Indian"
    activity_level: Optional[str] = "moderate"


class MedicineRequest(BaseModel):
    medicine_name: str
    dosage: Optional[str] = None


class HealthUpdate(BaseModel):
    steps: Optional[int] = None
    sleep_hours: Optional[float] = None
    water_liters: Optional[float] = None
    heart_rate: Optional[int] = None


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {
        "name": "HealthGPT",
        "status": "online",
        "message": "HealthGPT AI Core is ready.",
        "version": "1.0.0"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy",

        "services": {
            "api": "online",
            "ai_core": "online",
            "database": "demo-mode",
            "ml_engine": "ready",
            "ocr_engine": "ready",
            "security": "active"
        },

        "timestamp": datetime.utcnow().isoformat()
    }


# ============================================================
# USER
# ============================================================

@app.get("/api/user")
def get_user():

    return USER


# ============================================================
# DASHBOARD
# ============================================================

@app.get("/api/dashboard")
def dashboard():

    return {
        "user": USER,

        "health_score":
            HEALTH_DATA["health_score"],

        "activity":
            HEALTH_DATA["activity"],

        "sleep":
            HEALTH_DATA["sleep"],

        "hydration":
            HEALTH_DATA["hydration"],

        "heart":
            HEALTH_DATA["heart"],

        "trend":
            HEALTH_DATA["health_trend"],

        "ai_status": {
            "online": True,
            "message": "HealthGPT AI Core is ready."
        }
    }


# ============================================================
# AI DOCTOR
# ============================================================

@app.post("/api/ai/ask")
def ask_ai(request: AIQuestion):

    question = request.question.lower()

    if "sleep" in question:

        answer = (
            "Your dashboard shows a recent sleep quality "
            "of 87%. Maintaining a consistent sleep schedule "
            "may support better recovery."
        )

    elif "water" in question or "hydration" in question:

        answer = (
            "Your current hydration is approximately "
            "1.8 L against a 2.5 L displayed daily target."
        )

    elif "steps" in question or "exercise" in question:

        answer = (
            "You currently have 7,842 steps recorded today. "
            "Your activity progress is around 78% of the "
            "displayed goal."
        )

    elif "health score" in question:

        answer = (
            "Your current HealthGPT demo health score "
            "is 84 out of 100."
        )

    else:

        answer = (
            "I understand your question. This is the starter "
            "HealthGPT reasoning layer. A real LLM can be "
            "connected here later for advanced personalized "
            "health conversations."
        )

    return {
        "success": True,
        "question": request.question,
        "answer": answer,
        "source": "HealthGPT AI Core",

        "disclaimer": (
            "HealthGPT is not a substitute for professional "
            "medical care."
        )
    }


# ============================================================
# HEALTH TWIN
# ============================================================

@app.get("/api/health-twin")
def health_twin():

    return {
        "profile": {
            "user": USER["name"],
            "health_score":
                HEALTH_DATA["health_score"],
            "activity":
                HEALTH_DATA["activity"],
            "sleep":
                HEALTH_DATA["sleep"],
            "hydration":
                HEALTH_DATA["hydration"],
            "heart":
                HEALTH_DATA["heart"]
        },

        "status":
            "Digital Health Twin ready",

        "last_updated":
            datetime.utcnow().isoformat()
    }


# ============================================================
# PHYSICAL HEALTH
# ============================================================

@app.get("/api/physical-health")
def physical_health():

    return {
        "activity":
            HEALTH_DATA["activity"],

        "sleep":
            HEALTH_DATA["sleep"],

        "heart":
            HEALTH_DATA["heart"],

        "hydration":
            HEALTH_DATA["hydration"],

        "trend":
            HEALTH_DATA["health_trend"]
    }


# ============================================================
# MENTAL WELLNESS
# ============================================================

@app.post("/api/mental-wellness/check-in")
def mental_wellness(request: MoodRequest):

    mood = request.mood.lower()

    if mood in [
        "happy",
        "good",
        "great",
        "excellent"
    ]:

        message = (
            "That's wonderful. Continue noticing the habits "
            "and moments contributing to your wellbeing."
        )

    elif mood in [
        "sad",
        "low",
        "bad"
    ]:

        message = (
            "I'm sorry you're having a difficult moment. "
            "Consider taking a pause, connecting with someone "
            "you trust, and taking care of your immediate needs."
        )

    elif mood in [
        "stressed",
        "anxious",
        "overwhelmed"
    ]:

        message = (
            "It sounds like you're experiencing some pressure. "
            "A short breathing break and stepping away from the "
            "immediate stressor may help."
        )

    else:

        message = (
            "Thank you for checking in with yourself."
        )

    return {
        "mood": request.mood,
        "stress_level": request.stress_level,
        "message": message,
        "recorded": True,
        "timestamp": datetime.utcnow().isoformat()
    }


# ============================================================
# NUTRITION
# ============================================================

@app.post("/api/nutrition/plan")
def nutrition_plan(request: NutritionRequest):

    meals = {

        "breakfast":
            "Vegetable oats + fruit + yogurt",

        "lunch":
            "Balanced rice/roti bowl with vegetables, "
            "protein and salad",

        "snack":
            "Fruit + nuts",

        "dinner":
            "Vegetable-rich meal with a suitable "
            "protein source"
    }

    return {

        "success": True,

        "goal":
            request.goal,

        "diet_type":
            request.diet_type,

        "cuisine":
            request.cuisine,

        "activity_level":
            request.activity_level,

        "meal_plan":
            meals,

        "note":
            "This is a demonstration plan. Nutrition "
            "recommendations should be personalized using "
            "verified health information."
    }


# ============================================================
# MEDICINE ANALYSIS
# ============================================================

@app.post("/api/medicine/analyze")
def analyze_medicine(request: MedicineRequest):

    return {

        "medicine":
            request.medicine_name,

        "dosage":
            request.dosage,

        "status":
            "analysis_ready",

        "message":
            "Medicine identification is ready for connection "
            "to a verified medicine database/API.",

        "planned_analysis": [

            "Medicine name",

            "Active ingredients",

            "Common uses",

            "General precautions",

            "Known interactions",

            "Common side effects"
        ],

        "safety":
            "Do not change or stop prescribed medication "
            "based only on an AI-generated explanation."
    }


# ============================================================
# PRESCRIPTION OCR
# ============================================================

@app.post("/api/prescription/analyze")
def prescription_analyze():

    return {

        "status":
            "ocr_ready",

        "pipeline": [

            "Image received",

            "OCR extraction",

            "Medicine identification",

            "Dosage extraction",

            "Schedule extraction",

            "Safety verification"
        ],

        "next_step":
            "Connect OCR / vision model."
    }


# ============================================================
# ANALYTICS
# ============================================================

@app.get("/api/analytics")
def analytics():

    return {

        "health_score":
            HEALTH_DATA["health_score"],

        "weekly_trend":
            HEALTH_DATA["health_trend"],

        "activity_average":
            7215,

        "sleep_average":
            7.4,

        "hydration_average":
            2.1,

        "summary":
            "Your demo health indicators show a generally "
            "positive trend."
    }


# ============================================================
# REPORT
# ============================================================

@app.get("/api/report")
def generate_report():

    return {

        "report_id":
            "HGPT-DEMO-001",

        "generated_at":
            datetime.utcnow().isoformat(),

        "health_score":
            HEALTH_DATA["health_score"],

        "summary":
            "Your current dashboard indicators show positive "
            "movement in activity and sleep.",

        "sections": [

            "Health overview",

            "Physical activity",

            "Sleep",

            "Hydration",

            "Mental wellness",

            "Nutrition",

            "AI observations"
        ]
    }


# ============================================================
# UPDATE HEALTH DATA
# ============================================================

@app.put("/api/health/update")
def update_health(data: HealthUpdate):

    # ----------------------------
    # STEPS
    # ----------------------------

    if data.steps is not None:

        HEALTH_DATA["activity"]["steps"] = data.steps

        HEALTH_DATA["activity"]["percentage"] = min(
            int(
                data.steps
                / HEALTH_DATA["activity"]["goal"]
                * 100
            ),
            100
        )

    # ----------------------------
    # SLEEP
    # ----------------------------

    if data.sleep_hours is not None:

        HEALTH_DATA["sleep"]["hours"] = (
            data.sleep_hours
        )

    # ----------------------------
    # WATER
    # ----------------------------

    if data.water_liters is not None:

        HEALTH_DATA["hydration"]["current_liters"] = (
            data.water_liters
        )

        HEALTH_DATA["hydration"]["percentage"] = min(
            int(
                data.water_liters
                / HEALTH_DATA["hydration"]["target_liters"]
                * 100
            ),
            100
        )

    # ----------------------------
    # HEART RATE
    # ----------------------------

    if data.heart_rate is not None:

        HEALTH_DATA["heart"]["resting_bpm"] = (
            data.heart_rate
        )

    return {

        "success": True,

        "message":
            "Health data updated successfully.",

        "data":
            HEALTH_DATA
    }


# ============================================================
# AI INSIGHTS
# ============================================================

@app.get("/api/ai/insights")
def ai_insights():

    insights = [

        {
            "type": "hydration",

            "title":
                "Hydration reminder",

            "message":
                "Your current water intake is below "
                "the displayed daily target."
        },

        {
            "type": "sleep",

            "title":
                "Sleep is improving",

            "message":
                "Your recent sleep pattern is showing "
                "positive movement."
        },

        {
            "type": "activity",

            "title":
                "Activity looks positive",

            "message":
                "Your movement pattern has improved this week."
        }
    ]

    return {

        "count":
            len(insights),

        "insights":
            insights
    }


# ============================================================
# SYSTEM STATUS
# ============================================================

@app.get("/api/system/status")
def system_status():

    return {

        "healthgpt":
            "online",

        "ai_core":
            "online",

        "ml_engine":
            "ready",

        "ocr_engine":
            "ready",

        "database":
            "demo-mode",

        "security":
            "active",

        "api":
            "online"
    }


# ============================================================
# START SERVER
# ============================================================

if __name__ == "__main__":

    import uvicorn

    print()
    print("=" * 60)
    print("       HEALTHGPT AI BACKEND")
    print("=" * 60)
    print("Status : Starting...")
    print("API    : http://127.0.0.1:8000")
    print("Docs   : http://127.0.0.1:8000/docs")
    print("=" * 60)
    print()

    uvicorn.run(
        "back:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )