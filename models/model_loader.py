"""
HealthGPT ML Model Loader

Loads trained joblib models safely.
"""

from pathlib import Path
from typing import Optional

import joblib


class ModelLoader:
    """Utility class for loading trained ML models."""

    @staticmethod
    def load(
        model_path: str
    ) -> Optional[object]:
        """
        Load a joblib model.

        Returns:
            Loaded model if the file exists.
            None if the model file doesn't exist.
        """

        path = Path(model_path)

        if not path.exists():
            return None

        if not path.is_file():
            return None

        try:
            return joblib.load(path)

        except Exception as exc:
            raise RuntimeError(
                f"Failed to load ML model: {path}"
            ) from exc

    @staticmethod
    def exists(
        model_path: str
    ) -> bool:
        """Check whether a model file exists."""

        path = Path(model_path)

        return path.exists() and path.is_file()