"""
HealthGPT AI Agent Service.

Determines which HealthGPT module should handle a request.
"""


class AgentService:

    MODULES = {

        "medicine": {
            "keywords": [
                "medicine",
                "tablet",
                "capsule",
                "drug",
                "dose",
                "medication",
            ],
            "module": "Medicine Intelligence",
            "endpoint": "/api/medicine/analyze",
        },

        "symptoms": {
            "keywords": [
                "symptom",
                "fever",
                "cough",
                "headache",
                "pain",
                "nausea",
                "vomiting",
            ],
            "module": "Symptom Analysis",
            "endpoint": "/api/symptoms/analyze",
        },

        "prediction": {
            "keywords": [
                "predict",
                "disease",
                "risk",
                "probability",
            ],
            "module": "Disease Prediction",
            "endpoint": "/api/prediction",
        },

        "ocr": {
            "keywords": [
                "prescription",
                "medical report",
                "medical document",
                "scan",
                "ocr",
            ],
            "module": "Medical OCR",
            "endpoint": "/api/ocr/analyze",
        },

        "dashboard": {
            "keywords": [
                "dashboard",
                "health score",
                "analytics",
                "steps",
                "sleep",
                "hydration",
            ],
            "module": "Health Dashboard",
            "endpoint": "/api/dashboard/calculate",
        },

        "records": {
            "keywords": [
                "record",
                "medical history",
                "health history",
            ],
            "module": "Health Records",
            "endpoint": "/api/records",
        },

        "recommendations": {
            "keywords": [
                "recommend",
                "diet",
                "nutrition",
                "wellness",
                "exercise",
            ],
            "module": "Personalized Recommendations",
            "endpoint": "/api/recommendations",
        },

        "chat": {
            "keywords": [],
            "module": "AI Health Chatbot",
            "endpoint": "/api/chat",
        },
    }

    # ========================================================
    # ROUTE REQUEST
    # ========================================================

    def route(
        self,
        message: str
    ) -> dict:

        text = (
            message
            .strip()
            .lower()
        )

        if not text:

            return {
                "success": False,
                "message": "Message cannot be empty.",
            }

        # ----------------------------------------------------
        # Check modules
        # ----------------------------------------------------

        for key, information in self.MODULES.items():

            if key == "chat":
                continue

            for keyword in information["keywords"]:

                if keyword in text:

                    return {
                        "success": True,
                        "intent": key,
                        "module": information["module"],
                        "endpoint": information["endpoint"],
                        "reason": (
                            f"Detected keyword: {keyword}"
                        ),
                    }

        # ----------------------------------------------------
        # Default
        # ----------------------------------------------------

        return {
            "success": True,
            "intent": "chat",
            "module": "AI Health Chatbot",
            "endpoint": "/api/chat",
            "reason": "No specialized module matched.",
        }