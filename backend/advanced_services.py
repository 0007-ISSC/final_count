"""Extended HealthGPT services.

These services provide deterministic, explainable baseline functionality for
nutrition, mental wellness, health analytics, and the digital health twin.
They are intentionally informational and are designed to be replaceable by
specialized ML/LLM services later.
"""

from collections import Counter
from typing import Any


class NutritionPlanner:
    def generate(self, age: int | None, goal: str, dietary_preference: str,
                 activity_level: str, allergies: list[str] | None = None) -> dict[str, Any]:
        allergies = allergies or []
        goal_key = goal.lower().strip()
        activity = activity_level.lower().strip()

        calories = 2000
        if activity in {"high", "very active"}:
            calories += 300
        elif activity in {"low", "sedentary"}:
            calories -= 200

        meal_pattern = {
            "breakfast": "Whole grains + protein + fruit",
            "lunch": "Vegetables + protein + whole-grain carbohydrate",
            "snack": "Fruit, yogurt, or nuts according to tolerance",
            "dinner": "Vegetables + protein + moderate carbohydrate",
        }

        if goal_key in {"weight loss", "fat loss"}:
            calories -= 250
        elif goal_key in {"weight gain", "muscle gain"}:
            calories += 250

        return {
            "goal": goal,
            "estimated_daily_calories": max(1200, calories),
            "dietary_preference": dietary_preference,
            "activity_level": activity_level,
            "allergies_to_avoid": allergies,
            "meal_plan": meal_pattern,
            "hydration_guidance": "Drink fluids regularly and adjust intake for activity and climate.",
            "note": "This is general nutrition information, not a prescribed medical diet.",
        }


class MentalWellnessService:
    def assess(self, mood: str, stress_level: int, sleep_hours: float) -> dict[str, Any]:
        stress = max(0, min(10, stress_level))
        suggestions = [
            "Maintain a consistent sleep routine.",
            "Take short breaks and use slow, comfortable breathing when stressed.",
            "Stay connected with trusted people and maintain regular activity when appropriate.",
        ]
        if stress >= 8:
            suggestions.append("Consider speaking with a qualified mental-health professional for persistent or overwhelming stress.")
        if sleep_hours < 6:
            suggestions.append("Consider discussing persistent sleep difficulties with a healthcare professional.")
        return {
            "mood": mood,
            "stress_level": stress,
            "sleep_hours": sleep_hours,
            "suggestions": suggestions,
            "safety_note": "If you feel unsafe or are in immediate danger, seek urgent local professional help.",
        }


class HealthAnalyticsService:
    def summarize(self, metrics: list[dict[str, Any]]) -> dict[str, Any]:
        if not metrics:
            return {"count": 0, "summary": {}, "insights": []}

        grouped: dict[str, list[float]] = {}
        for item in metrics:
            name = str(item.get("metric", "unknown")).strip().lower()
            try:
                value = float(item.get("value"))
            except (TypeError, ValueError):
                continue
            grouped.setdefault(name, []).append(value)

        summary = {}
        for name, values in grouped.items():
            summary[name] = {
                "latest": values[-1],
                "average": round(sum(values) / len(values), 2),
                "minimum": min(values),
                "maximum": max(values),
                "samples": len(values),
            }

        insights = []
        if "sleep" in summary and summary["sleep"]["latest"] < 6:
            insights.append("Recent sleep duration is below 6 hours; consider improving sleep habits.")
        if "hydration" in summary and summary["hydration"]["latest"] < 1.5:
            insights.append("Recent recorded hydration is relatively low; individual fluid needs vary.")
        if not insights:
            insights.append("No simple threshold-based concern was identified from the supplied metrics.")

        return {"count": len(metrics), "summary": summary, "insights": insights}


class DigitalHealthTwinService:
    def build(self, profile: dict[str, Any], records: list[dict[str, Any]], metrics: list[dict[str, Any]]) -> dict[str, Any]:
        record_types = Counter(str(r.get("type", "unknown")) for r in records)
        return {
            "profile": profile,
            "health_record_count": len(records),
            "record_types": dict(record_types),
            "tracked_metric_count": len(metrics),
            "latest_metrics": metrics[-10:],
            "purpose": "A structured informational snapshot of user-provided health data; it is not a clinical digital twin or diagnosis.",
        }
