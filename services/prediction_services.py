"""
HealthGPT Disease Prediction Service.
"""

from typing import Optional


class PredictionService:

    def __init__(
        self,
        disease_model=None,
        risk_model=None,
    ):
        self.disease_model = disease_model
        self.risk_model = risk_model

    # ========================================================
    # DISEASE PREDICTION
    # ========================================================

    def predict_disease(
        self,
        features,
        symptoms: Optional[list[str]] = None,
    ) -> dict:

        symptoms = symptoms or []

        # ----------------------------------------------------
        # Trained model
        # ----------------------------------------------------

        if self.disease_model:

            try:

                result = self.disease_model.predict(
                    features
                )

                if result.get("success"):

                    return result

            except Exception:
                pass

        # ----------------------------------------------------
        # Development fallback
        # ----------------------------------------------------

        normalized = {
            item.lower().strip()
            for item in symptoms
        }

        prediction = (
            "Insufficient information"
        )

        probability = 0.0

        if (
            "fever" in normalized
            and "cough" in normalized
        ):

            prediction = (
                "Influenza-like illness pattern"
            )

            probability = 0.65

        elif (
            "sneezing" in normalized
            and "runny nose" in normalized
        ):

            prediction = (
                "Common-cold/allergic pattern"
            )

            probability = 0.55

        return {
            "success": True,
            "prediction": prediction,
            "probability": probability,
            "model": "development-baseline",
            "disclaimer": (
                "This is an experimental informational "
                "prediction and is not a diagnosis."
            ),
        }

    # ========================================================
    # RISK PREDICTION
    # ========================================================

    def predict_risk(
        self,
        features
    ) -> dict:

        if self.risk_model:

            try:

                result = self.risk_model.predict(
                    features
                )

                if result.get("success"):

                    return result

            except Exception:
                pass

        return {
            "success": False,
            "status": "model_not_loaded",
            "risk": None,
            "message": (
                "A trained health-risk model has not "
                "been connected yet."
            ),
        }