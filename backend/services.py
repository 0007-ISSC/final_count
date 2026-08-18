import re
from typing import Any


# =========================================================
# MODULE 1
# AI HEALTH CHATBOT
# =========================================================

class HealthChatbot:

    def generate_response(
        self,
        message: str
    ) -> str:

        message_lower = message.lower()

        if any(
            word in message_lower
            for word in [
                "chest pain",
                "can't breathe",
                "cannot breathe",
                "unconscious",
                "severe bleeding"
            ]
        ):
            return (
                "Your message may describe a medical emergency. "
                "Please seek urgent medical attention rather than "
                "relying on an AI response."
            )

        return (
            "I'm HealthGPT, your AI health information assistant. "
            "I can help you understand symptoms, medicines, health "
            "records and general wellness information. "
            "I cannot replace a qualified healthcare professional.\n\n"
            f"You asked: {message}"
        )


# =========================================================
# MODULE 2
# SYMPTOM ANALYSIS
# =========================================================

class SymptomAnalyzer:

    CONDITIONS = {

        "Common Cold": {
            "runny nose",
            "sneezing",
            "sore throat",
            "cough"
        },

        "Influenza-like Illness": {
            "fever",
            "cough",
            "headache",
            "fatigue",
            "body ache"
        },

        "Migraine-like Symptoms": {
            "headache",
            "nausea",
            "light sensitivity"
        },

        "Gastrointestinal Illness": {
            "vomiting",
            "diarrhea",
            "nausea",
            "abdominal pain"
        }
    }

    def analyze(
        self,
        symptoms: list[str]
    ) -> dict[str, Any]:

        normalized = {
            symptom.lower().strip()
            for symptom in symptoms
        }

        results = []

        for condition, expected in self.CONDITIONS.items():

            matched = normalized.intersection(expected)

            if matched:

                score = len(matched) / len(expected)

                results.append({
                    "condition": condition,
                    "matched_symptoms": list(matched),
                    "score": round(score, 2)
                })

        results.sort(
            key=lambda x: x["score"],
            reverse=True
        )

        emergency_words = [
            "chest pain",
            "severe breathing difficulty",
            "unconscious",
            "severe bleeding"
        ]

        emergency = any(
            word in normalized
            for word in emergency_words
        )

        return {
            "possible_conditions": results[:5],
            "emergency": emergency,
            "advice": [
                "Monitor your symptoms.",
                "Stay hydrated when appropriate.",
                "Consult a healthcare professional for persistent or worsening symptoms."
            ]
        }


# =========================================================
# MODULE 3
# MEDICINE & INGREDIENT ANALYZER
# =========================================================

class MedicineAnalyzer:

    MEDICINES = {

        "paracetamol": {
            "uses": [
                "Fever",
                "Mild to moderate pain"
            ],
            "warnings": [
                "Do not exceed the labeled dose.",
                "Check combination medicines for duplicate paracetamol."
            ]
        },

        "acetaminophen": {
            "uses": [
                "Fever",
                "Mild to moderate pain"
            ],
            "warnings": [
                "Do not exceed the labeled dose."
            ]
        },

        "ibuprofen": {
            "uses": [
                "Pain",
                "Inflammation",
                "Fever"
            ],
            "warnings": [
                "May not be suitable for some people with stomach ulcers, kidney disease, or certain medicines."
            ]
        }
    }

    def analyze(
        self,
        medicine_name: str,
        ingredients: list[str]
    ):

        key = medicine_name.lower().strip()

        medicine = self.MEDICINES.get(
            key,
            {
                "uses": [
                    "Depends on the exact formulation."
                ],
                "warnings": [
                    "Verify the exact product label with a pharmacist or healthcare professional."
                ]
            }
        )

        return {
            "medicine": medicine_name,
            "ingredients": ingredients,
            "uses": medicine["uses"],
            "warnings": medicine["warnings"],
            "safety_note": (
                "HealthGPT provides educational information "
                "and does not prescribe medicines."
            )
        }


# =========================================================
# MODULE 4
# DISEASE PREDICTION
# =========================================================

class DiseasePredictor:

    def predict(
        self,
        symptoms: list[str]
    ):

        analysis = SymptomAnalyzer().analyze(symptoms)

        predictions = []

        for result in analysis["possible_conditions"]:

            probability = min(
                0.95,
                0.30 + result["score"] * 0.60
            )

            predictions.append({
                "condition": result["condition"],
                "probability": round(
                    probability,
                    3
                )
            })

        if not predictions:

            predictions.append({
                "condition": "Insufficient information",
                "probability": 0.0
            })

        return {
            "model": "HealthGPT-Baseline",
            "predictions": predictions,
            "disclaimer": (
                "These are informational predictions, "
                "not medical diagnoses."
            )
        }


# =========================================================
# MODULE 5
# MEDICAL OCR
# =========================================================

class MedicalOCR:

    def extract_text(
        self,
        image_bytes: bytes
    ):

        try:

            from io import BytesIO

            from PIL import Image
            import pytesseract

            image = Image.open(
                BytesIO(image_bytes)
            )

            text = pytesseract.image_to_string(
                image
            )

            return {
                "success": True,
                "text": text.strip(),
                "fields": self.extract_fields(text)
            }

        except Exception as error:

            return {
                "success": False,
                "text": "",
                "fields": {},
                "error": str(error)
            }

    def extract_fields(
        self,
        text: str
    ):

        fields = {}

        for line in text.splitlines():

            if ":" in line:

                key, value = line.split(
                    ":",
                    1
                )

                fields[key.strip()] = (
                    value.strip()
                )

        return fields


# =========================================================
# MODULE 8
# PERSONALIZED HEALTH RECOMMENDATIONS
# =========================================================

class RecommendationEngine:

    def generate(
        self,
        age: int | None = None,
        symptoms: list[str] | None = None
    ):

        recommendations = [
            "Maintain a regular sleep schedule.",
            "Stay adequately hydrated.",
            "Include a balanced diet.",
            "Maintain regular physical activity appropriate for your abilities.",
            "Keep important medical records organized."
        ]

        if symptoms:

            if any(
                "fever" in s.lower()
                for s in symptoms
            ):
                recommendations.append(
                    "Monitor your temperature and symptoms."
                )

            if any(
                "cough" in s.lower()
                for s in symptoms
            ):
                recommendations.append(
                    "Monitor breathing difficulty or worsening respiratory symptoms."
                )

        if age is not None and age >= 60:

            recommendations.append(
                "Discuss age-appropriate preventive care with your healthcare professional."
            )

        return recommendations


# =========================================================
# MODULE 9
# AI HEALTH AGENT
# =========================================================

class HealthAgent:

    def route(
        self,
        message: str
    ):

        text = message.lower()

        if any(
            word in text
            for word in [
                "symptom",
                "fever",
                "pain",
                "cough",
                "headache"
            ]
        ):

            return "symptoms"

        if any(
            word in text
            for word in [
                "medicine",
                "tablet",
                "drug",
                "capsule"
            ]
        ):

            return "medicine"

        if any(
            word in text
            for word in [
                "predict",
                "disease",
                "risk"
            ]
        ):

            return "prediction"

        if any(
            word in text
            for word in [
                "report",
                "scan",
                "image",
                "document"
            ]
        ):

            return "ocr"

        return "chat"