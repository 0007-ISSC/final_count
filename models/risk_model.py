"""
HealthGPT Health Risk Prediction Model.

Designed to work with a trained scikit-learn/joblib
risk prediction model.
"""

from typing import Any, Optional

import numpy as np


class HealthRiskPredictor:
    """Health risk model wrapper."""

    def __init__(
        self,
        model: Optional[Any] = None
    ):
        self.model = model

    # ---------------------------------------------------------
    # MODEL STATUS
    # ---------------------------------------------------------

    @property
    def is_loaded(self) -> bool:
        """Check whether a trained model is loaded."""

        return self.model is not None

    # ---------------------------------------------------------
    # PREDICTION
    # ---------------------------------------------------------

    def predict(
        self,
        features: Any
    ) -> dict:
        """Generate a health-risk prediction."""

        if not self.is_loaded:

            return {
                "success": False,
                "status": "model_not_loaded",
                "risk": None,
                "probability": None,
                "message": (
                    "The health-risk model "
                    "has not been trained or loaded yet."
                ),
            }

        try:

            prediction = self.model.predict(
                features
            )

            risk_value = self._convert_value(
                prediction[0]
            )

            probability = self._get_probability(
                features
            )

            return {
                "success": True,
                "status": "prediction_complete",
                "risk": risk_value,
                "probability": probability,
                "message": (
                    "Health-risk prediction generated."
                ),
                "disclaimer": (
                    "This prediction is informational "
                    "and is not a medical diagnosis."
                ),
            }

        except Exception as exc:

            return {
                "success": False,
                "status": "prediction_error",
                "risk": None,
                "probability": None,
                "message": str(exc),
            }

    # ---------------------------------------------------------
    # PROBABILITY
    # ---------------------------------------------------------

    def _get_probability(
        self,
        features: Any
    ) -> Optional[float]:

        if not hasattr(
            self.model,
            "predict_proba"
        ):
            return None

        probabilities = self.model.predict_proba(
            features
        )

        highest = float(
            np.max(probabilities)
        )

        return round(
            highest,
            4
        )

    # ---------------------------------------------------------
    # VALUE CONVERSION
    # ---------------------------------------------------------

    @staticmethod
    def _convert_value(
        value: Any
    ) -> Any:

        if isinstance(
            value,
            np.generic
        ):
            return value.item()

        return value