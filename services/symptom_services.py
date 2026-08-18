"""
HealthGPT Symptom Analysis Service.
"""

from typing import Optional


class SymptomService:

    def __init__(
        self,
        symptom_model=None
    ):
        self.symptom_model = symptom_model

        self.symptom_groups = {

            "respiratory": {
                "cough",
                "sore throat",
                "runny nose",
                "blocked nose",
                "wheezing",
                "shortness of breath",
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

            "allergic": {
                "sneezing",
                "itchy eyes",
                "rash",
                "runny nose",
            },

            "neurological": {
                "headache",
                "dizziness",
                "weakness",
                "confusion",
            },
        }

    # ========================================================
    # ANALYZE
    # ========================================================

    def analyze(
        self,
        symptoms: list[str],
        age: Optional[int] = None,
        gender: Optional[str] = None,
    ) -> dict:

        cleaned = self.clean_symptoms(
            symptoms
        )

        if not cleaned:

            return {
                "success": False,
                "message": "No valid symptoms were supplied.",
            }

        # Use trained model when available.
        if self.symptom_model:

            try:

                result = self.symptom_model.analyze(
                    cleaned
                )

                if result.get("success"):

                    return result

            except Exception:
                pass

        patterns = self._find_patterns(
            cleaned
        )

        severity = self._estimate_severity(
            cleaned
        )

        return {
            "success": True,
            "symptoms": cleaned,
            "age": age,
            "gender": gender,
            "patterns": patterns,
            "severity": severity,
            "disclaimer": (
                "This is an informational symptom analysis "
                "and is not a medical diagnosis."
            ),
        }

    # ========================================================
    # CLEAN
    # ========================================================

    @staticmethod
    def clean_symptoms(
        symptoms: list[str]
    ) -> list[str]:

        cleaned = []

        for symptom in symptoms:

            if not isinstance(
                symptom,
                str
            ):
                continue

            value = symptom.strip().lower()

            if value and value not in cleaned:
                cleaned.append(value)

        return cleaned

    # ========================================================
    # PATTERN DETECTION
    # ========================================================

    def _find_patterns(
        self,
        symptoms: list[str]
    ) -> list[dict]:

        symptom_set = set(
            symptoms
        )

        patterns = []

        for group, known in self.symptom_groups.items():

            matched = sorted(
                symptom_set.intersection(
                    known
                )
            )

            if matched:

                score = (
                    len(matched)
                    /
                    len(known)
                )

                patterns.append({
                    "pattern": group,
                    "matched_symptoms": matched,
                    "match_count": len(matched),
                    "score": round(
                        score,
                        3
                    ),
                })

        patterns.sort(
            key=lambda item: item["score"],
            reverse=True,
        )

        return patterns

    # ========================================================
    # SIMPLE SEVERITY FLAG
    # ========================================================

    @staticmethod
    def _estimate_severity(
        symptoms: list[str]
    ) -> str:

        urgent_terms = {
            "severe chest pain",
            "difficulty breathing",
            "shortness of breath",
            "unconscious",
            "severe bleeding",
        }

        if any(
            symptom in urgent_terms
            for symptom in symptoms
        ):
            return "urgent"

        if len(symptoms) >= 5:
            return "moderate"

        return "low"