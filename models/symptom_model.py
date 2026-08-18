"""
HealthGPT Symptom Analysis Model.

This is a baseline symptom-analysis engine.

It is intentionally not presented as a diagnostic ML model.
A trained NLP/ML model can be plugged into this interface later.
"""

from typing import Any, Optional


class SymptomAnalyzer:
    """Analyze user-provided symptoms."""

    def __init__(
        self,
        model: Optional[Any] = None
    ):
        self.model = model

        self.symptom_groups = {

            "respiratory": {
                "cough",
                "sore throat",
                "runny nose",
                "blocked nose",
                "shortness of breath",
                "wheezing",
            },

            "flu_like": {
                "fever",
                "fatigue",
                "headache",
                "body ache",
                "chills",
                "cough",
            },

            "gastrointestinal": {
                "nausea",
                "vomiting",
                "diarrhea",
                "abdominal pain",
                "stomach pain",
            },

            "neurological": {
                "headache",
                "dizziness",
                "confusion",
                "weakness",
            },

            "allergic": {
                "sneezing",
                "itchy eyes",
                "runny nose",
                "rash",
            },
        }

    # =========================================================
    # ANALYZE
    # =========================================================

    def analyze(
        self,
        symptoms: list[str]
    ) -> dict:

        cleaned = self._clean_symptoms(
            symptoms
        )

        if not cleaned:

            return {
                "success": False,
                "status": "no_symptoms",
                "symptoms": [],
                "possible_patterns": [],
                "message": (
                    "Please provide at least one symptom."
                ),
            }

        # -----------------------------------------------------
        # If an actual trained model is available
        # -----------------------------------------------------

        if self.model is not None:

            try:

                prediction = self.model.predict(
                    [cleaned]
                )

                return {
                    "success": True,
                    "status": "ml_prediction",
                    "symptoms": cleaned,
                    "possible_patterns": (
                        prediction.tolist()
                        if hasattr(
                            prediction,
                            "tolist"
                        )
                        else prediction
                    ),
                    "disclaimer": (
                        "This is an AI-generated "
                        "health-information result and "
                        "not a medical diagnosis."
                    ),
                }

            except Exception:
                # Fall back to baseline analysis.
                pass

        # -----------------------------------------------------
        # Baseline analysis
        # -----------------------------------------------------

        patterns = []

        symptom_set = set(
            cleaned
        )

        for group, known_symptoms in (
            self.symptom_groups.items()
        ):

            matched = sorted(
                symptom_set.intersection(
                    known_symptoms
                )
            )

            if not matched:
                continue

            score = (
                len(matched)
                /
                len(known_symptoms)
            )

            patterns.append({

                "pattern": group,

                "matched_symptoms": matched,

                "match_count": len(
                    matched
                ),

                "score": round(
                    score,
                    3
                ),
            })

        patterns.sort(
            key=lambda item: item["score"],
            reverse=True
        )

        return {
            "success": True,
            "status": "baseline_analysis",
            "symptoms": cleaned,
            "possible_patterns": patterns,
            "disclaimer": (
                "This symptom analysis is informational "
                "and cannot diagnose a disease."
            ),
        }

    # =========================================================
    # CLEAN SYMPTOMS
    # =========================================================

    @staticmethod
    def _clean_symptoms(
        symptoms: list[str]
    ) -> list[str]:

        if not symptoms:
            return []

        cleaned = []

        for symptom in symptoms:

            if not isinstance(
                symptom,
                str
            ):
                continue

            value = (
                symptom
                .strip()
                .lower()
            )

            if value and value not in cleaned:
                cleaned.append(
                    value
                )

        return cleaned