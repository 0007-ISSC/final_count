"""
HealthGPT Personalized Recommendation Service.
"""


class RecommendationService:

    SUPPORTED_DIETS = {
        "vegan",
        "vegetarian",
        "non-vegetarian",
        "balanced",
        "keto",
        "mediterranean",
    }

    # ========================================================
    # GENERATE RECOMMENDATIONS
    # ========================================================

    def generate(
        self,
        age=None,
        diet="balanced",
        symptoms=None,
        sleep_hours=None,
        activity_level="moderate",
    ) -> dict:

        symptoms = symptoms or []

        recommendations = []

        # ----------------------------------------------------
        # General
        # ----------------------------------------------------

        recommendations.extend([
            "Maintain a varied and balanced diet.",
            "Stay appropriately hydrated.",
            "Maintain a consistent sleep schedule.",
        ])

        # ----------------------------------------------------
        # Sleep
        # ----------------------------------------------------

        if (
            sleep_hours is not None
            and sleep_hours < 7
        ):

            recommendations.append(
                "Consider improving sleep duration and consistency."
            )

        # ----------------------------------------------------
        # Activity
        # ----------------------------------------------------

        if (
            activity_level.lower()
            == "low"
        ):

            recommendations.append(
                "Consider gradually increasing appropriate daily physical activity."
            )

        # ----------------------------------------------------
        # Diet
        # ----------------------------------------------------

        diet_normalized = (
            diet.lower().strip()
        )

        if diet_normalized == "vegan":

            recommendations.append(
                "Ensure your vegan diet provides adequate protein, iron, calcium, vitamin B12 and other essential nutrients."
            )

        elif diet_normalized == "vegetarian":

            recommendations.append(
                "Include varied plant proteins and nutrient-dense foods."
            )

        elif diet_normalized == "non-vegetarian":

            recommendations.append(
                "Include a variety of vegetables, whole grains and appropriate protein sources."
            )

        # ----------------------------------------------------
        # Symptoms
        # ----------------------------------------------------

        if symptoms:

            recommendations.append(
                "Monitor your symptoms and seek professional advice if they persist, worsen or become concerning."
            )

        return {
            "success": True,
            "recommendations": recommendations,
            "profile": {
                "age": age,
                "diet": diet,
                "sleep_hours": sleep_hours,
                "activity_level": activity_level,
            },
            "disclaimer": (
                "These are general wellness suggestions "
                "and are not medical treatment."
            ),
        }