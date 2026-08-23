import json
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session
from .database import get_db
from .models import User, Conversation, Message, HealthRecord, Prediction, MedicineAnalysis, HealthMetric, WellnessCheck
from .services import HealthChatbot, SymptomAnalyzer, MedicineAnalyzer, DiseasePredictor, MedicalOCR, RecommendationEngine, HealthAgent
from .advanced_services import NutritionPlanner, MentalWellnessService, HealthAnalyticsService, DigitalHealthTwinService
from .knowledge_service import search_knowledge, build_context
from .api_integrations import gemini_chat, rxnorm_lookup, openfda_drug, food_product, pubmed_search
from .intelligence_engine import HealthIntelligence

router = APIRouter(prefix="/api")


def _history(db: Session, user_id: int | None, limit: int = 12):
    if not user_id:
        return []
    conversations = db.query(Conversation).filter(Conversation.user_id == user_id).order_by(Conversation.created_at.desc()).all()
    messages = []
    for conversation in conversations[:3]:
        rows = db.query(Message).filter(Message.conversation_id == conversation.id).order_by(Message.created_at.desc()).limit(limit).all()
        messages.extend({"role": m.role, "content": m.content} for m in reversed(rows))
        if len(messages) >= limit:
            break
    return messages[-limit:]


@router.post("/chat")
async def chat(message: str = Form(...), user_id: int | None = Form(None), db: Session = Depends(get_db)):
    if not message.strip():
        raise HTTPException(400, "Message cannot be empty")
    entries = search_knowledge(db, message)
    context = build_context(entries)
    history = _history(db, user_id)
    ai = await gemini_chat(message, context=context, history=history)
    response = ai.get("response") if ai.get("ok") else HealthChatbot().generate_response(message)
    source = "Gemini + HealthGPT Knowledge Base" if ai.get("ok") else "HealthGPT local fallback"
    conversation_id = None
    if user_id is not None:
        if not db.query(User).filter(User.id == user_id).first():
            raise HTTPException(404, "User not found")
        conversation = Conversation(user_id=user_id, title=message[:60]); db.add(conversation); db.commit(); db.refresh(conversation)
        db.add_all([Message(conversation_id=conversation.id, role="user", content=message), Message(conversation_id=conversation.id, role="assistant", content=response)]); db.commit()
        conversation_id = conversation.id
    return {"success": True, "module": "AI Health Chatbot", "response": response, "source": source, "knowledge_matches": len(entries), "conversation_id": conversation_id}


@router.post("/intelligence/reason")
def intelligence_reason(symptoms: list[str], duration_days: float = 1.0, stress: float = 0.0):
    return {"success": True, "module": "TMS + Fuzzy Logic + KBA", **HealthIntelligence().analyze(symptoms, duration_days, stress)}

@router.get("/knowledge/search")
def knowledge_search(q: str, limit: int = 8, db: Session = Depends(get_db)):
    entries = search_knowledge(db, q, max(1, min(limit, 25)))
    return {"success": True, "results": [{"id": x.id, "category": x.category, "title": x.title, "content": x.content, "tags": x.tags, "reviewed": x.reviewed} for x in entries]}

@router.get("/medicine/lookup")
async def medicine_lookup(name: str):
    return {"success": True, "module": "Medicine Intelligence", "medicine": name, "rxnorm": await rxnorm_lookup(name), "openfda": await openfda_drug(name)}

@router.get("/food/barcode/{barcode}")
async def food_barcode(barcode: str):
    return {"success": True, "module": "Nutrition Intelligence", **await food_product(barcode)}

@router.get("/research/search")
async def research_search(q: str, limit: int = 5):
    return {"success": True, "module": "Evidence Search", **await pubmed_search(q, limit)}

@router.post("/symptoms/analyze")
def analyze_symptoms(symptoms: list[str]):
    return {"success": True, "module": "Symptom Analysis", **SymptomAnalyzer().analyze(symptoms)}

@router.post("/medicine/analyze")
def analyze_medicine(medicine_name: str, ingredients: list[str] | None = None, user_id: int | None = None, db: Session = Depends(get_db)):
    ingredients = ingredients or []; result = MedicineAnalyzer().analyze(medicine_name, ingredients)
    if user_id is not None:
        db.add(MedicineAnalysis(user_id=user_id, medicine_name=medicine_name, ingredients=json.dumps(ingredients), uses=json.dumps(result.get("uses", [])), warnings=json.dumps(result.get("warnings", [])))); db.commit()
    return {"success": True, "module": "Medicine Analyzer", **result}

@router.post("/prediction")
def disease_prediction(symptoms: list[str], user_id: int | None = None, db: Session = Depends(get_db)):
    result = DiseasePredictor().predict(symptoms)
    if user_id is not None:
        for p in result.get("predictions", []): db.add(Prediction(user_id=user_id, condition=p["condition"], probability=p["probability"], symptoms=json.dumps(symptoms), model_name=result.get("model")))
        db.commit()
    return {"success": True, "module": "Disease Prediction", **result}

@router.post("/ocr")
async def medical_ocr(file: UploadFile = File(...)):
    return {"success": True, "module": "Medical OCR", **MedicalOCR().extract_text(await file.read())}

@router.get("/dashboard/{user_id}")
def dashboard(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404, "User not found")
    return {"success": True, "module": "Health Dashboard", "user": {"id": user.id, "name": user.name, "email": user.email, "age": user.age, "gender": user.gender}, "statistics": {"health_records": db.query(HealthRecord).filter(HealthRecord.user_id == user_id).count(), "conversations": db.query(Conversation).filter(Conversation.user_id == user_id).count(), "predictions": db.query(Prediction).filter(Prediction.user_id == user_id).count(), "medicine_analyses": db.query(MedicineAnalysis).filter(MedicineAnalysis.user_id == user_id).count(), "health_metrics": db.query(HealthMetric).filter(HealthMetric.user_id == user_id).count(), "wellness_checks": db.query(WellnessCheck).filter(WellnessCheck.user_id == user_id).count()}}

@router.post("/records")
def create_record(user_id: int, record_type: str, title: str, content: str, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    record = HealthRecord(user_id=user_id, record_type=record_type, title=title, content=content); db.add(record); db.commit(); db.refresh(record)
    return {"success": True, "record": {"id": record.id, "type": record.record_type, "title": record.title, "content": record.content}}

@router.get("/records/{user_id}")
def get_records(user_id: int, db: Session = Depends(get_db)):
    records = db.query(HealthRecord).filter(HealthRecord.user_id == user_id).order_by(HealthRecord.created_at.desc()).all()
    return {"success": True, "records": [{"id": r.id, "type": r.record_type, "title": r.title, "content": r.content, "created_at": r.created_at} for r in records]}

@router.post("/recommendations")
def recommendations(age: int | None = None, symptoms: list[str] | None = None):
    return {"success": True, "module": "Personalized Recommendations", "recommendations": RecommendationEngine().generate(age, symptoms or [])}

@router.post("/agent")
def health_agent(message: str):
    return {"success": True, "module": "AI Health Agent", "message": message, "selected_module": HealthAgent().route(message)}

@router.post("/nutrition")
def nutrition(age: int | None = None, goal: str = "general wellness", dietary_preference: str = "balanced", activity_level: str = "moderate", allergies: list[str] | None = None):
    return {"success": True, "module": "Nutrition Planner", **NutritionPlanner().generate(age, goal, dietary_preference, activity_level, allergies)}

@router.post("/wellness")
def wellness(user_id: int, mood: str, stress_level: int, sleep_hours: float, db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    result = MentalWellnessService().assess(mood, stress_level, sleep_hours); db.add(WellnessCheck(user_id=user_id, mood=mood, stress_level=stress_level, sleep_hours=sleep_hours)); db.commit()
    return {"success": True, "module": "Mental Wellness", **result}

@router.post("/metrics")
def add_metric(user_id: int, metric: str, value: float, unit: str = "", db: Session = Depends(get_db)):
    if not db.query(User).filter(User.id == user_id).first(): raise HTTPException(404, "User not found")
    item = HealthMetric(user_id=user_id, metric=metric, value=value, unit=unit); db.add(item); db.commit(); db.refresh(item)
    return {"success": True, "metric": {"id": item.id, "metric": metric, "value": value, "unit": unit, "recorded_at": item.recorded_at}}

@router.get("/analytics/{user_id}")
def analytics(user_id: int, db: Session = Depends(get_db)):
    rows = db.query(HealthMetric).filter(HealthMetric.user_id == user_id).order_by(HealthMetric.recorded_at.asc()).all(); metrics = [{"metric": r.metric, "value": r.value, "unit": r.unit, "recorded_at": r.recorded_at} for r in rows]
    return {"success": True, "module": "Health Analytics", **HealthAnalyticsService().summarize(metrics)}

@router.get("/health-twin/{user_id}")
def health_twin(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(404, "User not found")
    records = db.query(HealthRecord).filter(HealthRecord.user_id == user_id).all(); metrics = db.query(HealthMetric).filter(HealthMetric.user_id == user_id).order_by(HealthMetric.recorded_at.asc()).all()
    return {"success": True, "module": "Digital Health Twin", **DigitalHealthTwinService().build({"id": user.id, "name": user.name, "age": user.age, "gender": user.gender}, [{"type": r.record_type, "title": r.title, "content": r.content} for r in records], [{"metric": m.metric, "value": m.value, "unit": m.unit} for m in metrics])}

@router.get("/health")
def health_check():
    return {"status": "online", "application": "HealthGPT", "version": "2.2.0"}


def register_routes(app):
    app.include_router(router)
