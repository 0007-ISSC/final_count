"""
HealthGPT Dashboard Service.
"""


class DashboardService:

    # ========================================================
    # CALCULATE HEALTH SCORE
    # ========================================================

    @staticmethod
    def calculate_score(
        steps: int,
        sleep_hours: float,
        hydration_liters: float,
        resting_heart_rate: int,
    ) -> dict:

        score = 0.0

        # ----------------------------------------------------
        # Steps
        # ----------------------------------------------------

        if steps >= 8000:

            score += 25

        elif steps >= 5000:

            score += 18

        elif steps >= 2500:

            score += 10

        # ----------------------------------------------------
        # Sleep
        # ----------------------------------------------------

        if 7 <= sleep_hours <= 9:

            score += 25

        elif 6 <= sleep_hours < 7:

            score += 18

        elif sleep_hours > 9:

            score += 18

        # ----------------------------------------------------
        # Hydration
        # ----------------------------------------------------

        if hydration_liters >= 2:

            score += 25

        elif hydration_liters >= 1.5:

            score += 18

        elif hydration_liters >= 1:

            score += 10

        # ----------------------------------------------------
        # Resting heart rate
        # ----------------------------------------------------

        if 60 <= resting_heart_rate <= 80:

            score += 25

        elif 50 <= resting_heart_rate <= 90:

            score += 18

        score = min(
            score,
            100
        )

        return {
            "success": True,
            "health_score": round(
                score,
                1
            ),
            "metrics": {
                "steps": steps,
                "sleep_hours": sleep_hours,
                "hydration_liters": hydration_liters,
                "resting_heart_rate": resting_heart_rate,
            },
            "disclaimer": (
                "This is a general wellness indicator "
                "and is not a clinical score."
            ),
        }