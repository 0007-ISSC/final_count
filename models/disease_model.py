"""
HealthGPT Disease Prediction Model.

This class is designed to work with a trained
scikit-learn/joblib disease prediction model.

IMPORTANT:
This is an engineering interface, not a clinical
diagnostic system.
"""

from typing import Any, Optional

import numpy as np


class DiseasePredictor:
    """Disease prediction model wrapper."""

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
        """Return True when a trained model is available."""

        return self.model is not None

    # ---------------------------------------------------------
    # PREDICTION
    # ---------------------------------------------------------

    def predict(
        self,
        features: Any
    ) -> dict:
        """
        Make a prediction using the trained model.
        """

        if not self.is_loaded:

            return {
                "success": False,
                "status": "model_not_loaded",
                "prediction": None,
                "probability": None,
                "message": (
                    "The disease prediction model "
                    "has not been trained or loaded yet."
                ),
            }

        try:

            prediction = self.model.predict(
                features
            )

            prediction_value = self._convert_value(
                prediction[0]
            )

            probability = self._get_probability(
                features
            )

            return {
                "success": True,
                "status": "prediction_complete",
                "prediction": prediction_value,
                "probability": probability,
                "message": (
                    "Prediction generated successfully."
                ),
                "disclaimer": (
                    "This prediction is for informational "
                    "purposes and is not a medical diagnosis."
                ),
            }

        except Exception as exc:

            return {
                "success": False,
                "status": "prediction_error",
                "prediction": None,
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
        """Return highest model probability if supported."""

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
        """Convert NumPy values into JSON-safe values."""

        if isinstance(
            value,
            np.generic
        ):
            return value.item()

        return value