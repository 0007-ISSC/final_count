import json

from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

from database import get_db
from models import (
    User,
    Conversation,
    Message,
    HealthRecord,
    Prediction,
)

from services import (
    HealthChatbot,
    SymptomAnalyzer,
    MedicineAnalyzer,
    DiseasePredictor,
    MedicalOCR,
    RecommendationEngine,
    HealthAgent,
)


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(prefix="/api")


# =========================================================
# MODULE 1
# AI CHATBOT
# =========================================================

@router.post("/chat")
def chat(
    message: str = Form(...),
    user_id: int | None = Form(None),
    db: Session = Depends(get_db),
):
    chatbot = HealthChatbot()

    response = chatbot.generate_response(message)

    conversation = None

    if user_id is not None:

        conversation = Conversation(
            user_id=user_id,
            title=message[:60],
        )

        db.add(conversation)
        db.commit()
        db.refresh(conversation)

        db.add(
            Message(
                conversation_id=conversation.id,
                role="user",
                content=message,
            )
        )

        db.add(
            Message(
                conversation_id=conversation.id,
                role="assistant",
                content=response,
            )
        )

        db.commit()

    return {
        "success": True,
        "module": "AI Health Chatbot",
        "response": response,
        "conversation_id": (
            conversation.id
            if conversation
            else None
        ),
    }


# =========================================================
# MODULE 2
# SYMPTOM ANALYSIS
# =========================================================

@router.post("/symptoms/analyze")
def analyze_symptoms(
    symptoms: list[str],
):
    analyzer = SymptomAnalyzer()

    result = analyzer.analyze(symptoms)

    return {
        "success": True,
        "module": "Symptom Analysis",
        **result,
    }


# =========================================================
# MODULE 3
# MEDICINE ANALYSIS
# =========================================================

@router.post("/medicine/analyze")
def analyze_medicine(
    medicine_name: str,
    ingredients: list[str] | None = None,
):
    analyzer = MedicineAnalyzer()

    if ingredients is None:
        ingredients = []

    result = analyzer.analyze(
        medicine_name,
        ingredients,
    )

    return {
        "success": True,
        "module": "Medicine Analyzer",
        **result,
    }


# =========================================================
# MODULE 4
# DISEASE PREDICTION
# =========================================================

@router.post("/prediction")
def disease_prediction(
    symptoms: list[str],
    user_id: int | None = None,
    db: Session = Depends(get_db),
):
    predictor = DiseasePredictor()

    result = predictor.predict(symptoms)

    if user_id is not None:

        for prediction in result.get("predictions", []):

            db.add(
                Prediction(
                    user_id=user_id,
                    condition=prediction["condition"],
                    probability=prediction["probability"],
                    symptoms=json.dumps(symptoms),
                    model_name=result.get("model"),
                )
            )

        db.commit()

    return {
        "success": True,
        "module": "Disease Prediction",
        **result,
    }


# =========================================================
# MODULE 5
# MEDICAL OCR
# =========================================================

@router.post("/ocr")
async def medical_ocr(
    file: UploadFile = File(...),
):
    image_bytes = await file.read()

    ocr = MedicalOCR()

    result = ocr.extract_text(image_bytes)

    return {
        "success": True,
        "module": "Medical OCR",
        **result,
    }


# =========================================================
# MODULE 6
# HEALTH DASHBOARD
# =========================================================

@router.get("/dashboard/{user_id}")
def dashboard(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    records = (
        db.query(HealthRecord)
        .filter(HealthRecord.user_id == user_id)
        .count()
    )

    conversations = (
        db.query(Conversation)
        .filter(Conversation.user_id == user_id)
        .count()
    )

    predictions = (
        db.query(Prediction)
        .filter(Prediction.user_id == user_id)
        .count()
    )

    return {
        "success": True,
        "module": "Health Dashboard",

        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "age": user.age,
            "gender": user.gender,
        },

        "statistics": {
            "health_records": records,
            "conversations": conversations,
            "predictions": predictions,
        },
    }


# =========================================================
# MODULE 7
# HEALTH RECORDS
# =========================================================

@router.post("/records")
def create_record(
    user_id: int,
    record_type: str,
    title: str,
    content: str,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    record = HealthRecord(
        user_id=user_id,
        record_type=record_type,
        title=title,
        content=content,
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "success": True,
        "module": "Health Records",

        "record": {
            "id": record.id,
            "type": record.record_type,
            "title": record.title,
            "content": record.content,
        },
    }


@router.get("/records/{user_id}")
def get_records(
    user_id: int,
    db: Session = Depends(get_db),
):
    records = (
        db.query(HealthRecord)
        .filter(HealthRecord.user_id == user_id)
        .order_by(HealthRecord.created_at.desc())
        .all()
    )

    return {
        "success": True,
        "module": "Health Records",

        "records": [
            {
                "id": record.id,
                "type": record.record_type,
                "title": record.title,
                "content": record.content,
                "created_at": record.created_at,
            }
            for record in records
        ],
    }


# =========================================================
# MODULE 8
# PERSONALIZED RECOMMENDATIONS
# =========================================================

@router.post("/recommendations")
def recommendations(
    age: int | None = None,
    symptoms: list[str] | None = None,
):
    if symptoms is None:
        symptoms = []

    engine = RecommendationEngine()

    result = engine.generate(
        age,
        symptoms,
    )

    return {
        "success": True,
        "module": "Personalized Recommendations",
        "recommendations": result,
    }


# =========================================================
# MODULE 9
# AI HEALTH AGENT
# =========================================================

@router.post("/agent")
def health_agent(
    message: str,
):
    agent = HealthAgent()

    selected_module = agent.route(message)

    return {
        "success": True,
        "module": "AI Health Agent",
        "message": message,
        "selected_module": selected_module,
        "message_for_frontend": (
            f"HealthGPT Agent routed your request "
            f"to the {selected_module} module."
        ),
    }


# =========================================================
# HEALTH CHECK
# =========================================================

@router.get("/health")
def health_check():
    return {
        "status": "online",
        "application": "HealthGPT",
        "version": "1.0.0",
    }


# =========================================================
# REGISTER ROUTES
# =========================================================

def register_routes(app):
    """
    Register all HealthGPT routes
    with the FastAPI application.
    """
    app.include_router(router)