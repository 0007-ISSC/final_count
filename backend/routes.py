import json
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from database import get_db
from models import User, Conversation, Message, HealthRecord, Prediction, MedicineAnalysis, HealthMetric, WellnessCheck
from services import HealthChatbot, SymptomAnalyzer, MedicineAnalyzer, DiseasePredictor, MedicalOCR, RecommendationEngine, HealthAgent
from advanced_services import NutritionPlanner, MentalWellnessService, HealthAnalyticsService, DigitalHealthTwinService

router = APIRouter(prefix="/api")

@router.post("/chat")
def chat(message: str = Form(...), user_id: int | None = Form(None), db: Session = Depends(get_db)):
    response = HealthChatbot().generate_response(message)
    conversation = None
    if user_id is not None:
        if not db.query(User).filter(User.id == user_id).first():
            raise HTTPException(404, "User not found")
        conversation = Conversation(user_id=user_id, title=message[:60])
        db.add(conversation); db.commit(); db.refresh(conversation)
        db.add(Message(conversation_id=conversation.id, role="user", content=message))
        db.add(Message(conversation_id=conversation.id, role="assistant", content=response)); db.commit()
    return {"success": True, "module": "AI Health Chatbot", "response": response, "conversation_id": conversation.id if conversation else None}

@router.post("/symptoms/analyze")
def analyze_symptoms(symptoms: list[str]):
    return {"success": True, "module": "Symptom Analysis", **SymptomAnalyzer().analyze(symptoms)}

@router.post("/medicine/analyze")
def analyze_medicine(medicine_name: str, ingredients: list[str] | None = None, user_id: int | None = None, db: Session = Depends(get_db)):
    ingredients = ingredients or []
    result = MedicineAnalyzer().analyze(medicine_name, ingredients)
    if user_id is not None:
        db.add(MedicineAnalysis(user_id=user_id, medicine_name=medicine_name, ingredients=json.dumps(ingredients), uses=json.dumps(result.get("uses", [])), warnings=json.dumps(result.get("warnings", []))))
        db.commit()
    return {"success": True, "module": "Medicine Analyzer", **result}

@router.post("/prediction")
def disease_prediction(symptoms: list[str], user_id: int | None = None, db: Session = Depends(get_db)):
    result = DiseasePredictor().predict(symptoms)
    if user_id is not None:
        for prediction in result.get("predictions", []):
            db.add(Prediction(user_id=user_id, condition=prediction["condition"], probability=prediction["probability"], symptoms=json.dumps(symptoms), model_name=result.get("model")))
        db.commit()
    return {"success": True, "module": "Disease Prediction", **result}

@router.post("/ocr")
async def medical_ocr(file: UploadFile = File(...)):
    return {"success": True, "module": "Medical OCR", **MedicalOCR().extract_text(await file.read())}

@router.get("/dashboard/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404, "User not found")
    return {"success": True, "module": "Health Dashboard", "user": {"id": user.id, "name": user.name, "email": user.email, "age": user.age, "gender": user.gender}, "statistics": {"health_records": db.query(HealthRecord).filter(HealthRecord.user_id == user_id).count(), "conversations": db.query(Conversation).filter(Conversation.user_id == user_id).count(), "predictions": db.query(Prediction).filter(Prediction.user_id == user_id).count(), "medicine_analyses": db.query(MedicineAnalysis).filter(MedicineAnalysis.user_id == user_id).count(), "health_metrics": db.query(HealthMetric).filter(HealthMetric.user_id == user_id).count()}}

@router.post("/records")
def create_record(user_id: int, record_type: str, title: str, content: str, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    record = HealthRecord(user_id=user_id, record_type=record_type, title=title, content=content); db.add(record); db.commit(); db.refresh(record)
    return {"success": True, "module": "Health Records", "record": {"id": record.id, "type": record.record_type, "title": record.title, "content": record.content}}

@router.get("/records/{user_id}")
def get_records(user_id: int, db: Session = Depends(get_db)):
    records = db.query(HealthRecord).filter(HealthRecord.user_id == user_id).order_by(HealthRecord.created_at.desc()).all()
    return {"success": True, "module": "Health Records", "records": [{"id": r.id, "type": r.record_type, "title": r.title, "content": r.content, "created_at": r.created_at} for r in records]}

@router.post("/recommendations")
def recommendations(age: int | None = None, symptoms: list[str] | None = None):
    return {"success": True, "module": "Personalized Recommendations", "recommendations": RecommendationEngine().generate(age, symptoms or [])}

@router.post("/agent")
def health_agent(message: str):
    selected = HealthAgent().route(message)
    return {"success": True, "module": "AI Health Agent", "message": message, "selected_module": selected}

@router.post("/nutrition")
def nutrition(age: int | None = None, goal: str = "general wellness", dietary_preference: str = "balanced", activity_level: str = "moderate", allergies: list[str] | None = None):
    return {"success": True, "module": "Nutrition Planner", **NutritionPlanner().generate(age, goal, dietary_preference, activity_level, allergies)}

@router.post("/wellness")
def wellness(user_id: int, mood: str, stress_level: int, sleep_hours: float, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    result = MentalWellnessService().assess(mood, stress_level, sleep_hours)
    db.add(WellnessCheck(user_id=user_id, mood=mood, stress_level=stress_level, sleep_hours=sleep_hours)); db.commit()
    return {"success": True, "module": "Mental Wellness", **result}

@router.post("/metrics")
def add_metric(user_id: int, metric: str, value: float, unit: str = "", db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    item = HealthMetric(user_id=user_id, metric=metric, value=value, unit=unit); db.add(item); db.commit(); db.refresh(item)
    return {"success": True, "module": "Health Metrics", "metric": {"id": item.id, "metric": metric, "value": value, "unit": unit, "recorded_at": item.recorded_at}}

@router.get("/analytics/{user_id}")
def analytics(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(HealthMetric).filter(HealthMetric.user_id == user_id).order_by(HealthMetric.recorded_at.asc()).all()
    metrics = [{"metric": r.metric, "value": r.value, "unit": r.unit, "recorded_at": r.recorded_at} for r in rows]
    return {"success": True, "module": "Health Analytics", **HealthAnalyticsService().summarize(metrics)}

@router.get("/health-twin/{user_id}")
def health_twin(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404, "User not found")
    records = db.query(HealthRecord).filter(HealthRecord.user_id == user_id).all()
    metrics = db.query(HealthMetric).filter(HealthMetric.user_id == user_id).order_by(HealthMetric.recorded_at.asc()).all()
    return {"success": True, "module": "Digital Health Twin", **DigitalHealthTwinService().build({"id": user.id, "name": user.name, "age": user.age, "gender": user.gender}, [{"type": r.record_type, "title": r.title, "content": r.content} for r in records], [{"metric": m.metric, "value": m.value, "unit": m.unit} for m in metrics])}

@router.get("/health")
def health_check():
    return {"status": "online", "application": "HealthGPT", "version": "2.0.0"}

def register_routes(app):
    app.include_router(router)
