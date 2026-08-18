"""
HealthGPT Medicine Intelligence Service.
"""


class MedicineService:

    MEDICINES = {

        "paracetamol": {
            "generic_name": "Paracetamol",
            "common_uses": [
                "Fever",
                "Mild to moderate pain",
            ],
            "warnings": [
                "Do not exceed the labeled dose.",
                "Check combination products for duplicate ingredients.",
            ],
        },

        "acetaminophen": {
            "generic_name": "Acetaminophen",
            "common_uses": [
                "Fever",
                "Mild to moderate pain",
            ],
            "warnings": [
                "Do not exceed the labeled dose.",
            ],
        },

        "ibuprofen": {
            "generic_name": "Ibuprofen",
            "common_uses": [
                "Pain",
                "Inflammation",
                "Fever",
            ],
            "warnings": [
                "May not be appropriate for everyone.",
                "Check with a healthcare professional if you take other medicines or have relevant medical conditions.",
            ],
        },
    }

    # ========================================================
    # ANALYZE
    # ========================================================

    def analyze(
        self,
        medicine_name: str,
        ingredients: list[str] | None = None,
        age: int | None = None,
        allergies: list[str] | None = None,
    ) -> dict:

        name = medicine_name.strip()

        if not name:

            return {
                "success": False,
                "message": "Medicine name is required.",
            }

        medicine = self.MEDICINES.get(
            name.lower()
        )

        if medicine:

            information = medicine.copy()

        else:

            information = {
                "generic_name": name,
                "common_uses": [],
                "warnings": [
                    "Verify the exact medicine formulation.",
                    "Consult a pharmacist or healthcare professional for personalized advice.",
                ],
            }

        ingredients = ingredients or []
        allergies = allergies or []

        allergy_matches = self._check_allergies(
            ingredients,
            allergies
        )

        return {
            "success": True,
            "medicine": name,
            "ingredients": ingredients,
            "age": age,
            "allergies": allergies,
            "information": information,
            "allergy_alerts": allergy_matches,
            "disclaimer": (
                "HealthGPT provides educational medicine "
                "information and does not prescribe medicines."
            ),
        }

    # ========================================================
    # ALLERGY CHECK
    # ========================================================

    @staticmethod
    def _check_allergies(
        ingredients: list[str],
        allergies: list[str],
    ) -> list[str]:

        normalized_ingredients = {
            item.lower().strip()
            for item in ingredients
        }

        normalized_allergies = {
            item.lower().strip()
            for item in allergies
        }

        matches = sorted(
            normalized_ingredients.intersection(
                normalized_allergies
            )
        )

        return matches