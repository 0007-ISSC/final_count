"""
HealthGPT prompt management.
"""


class PromptManager:
    """
    Centralized prompts for HealthGPT.
    """

    SYSTEM_PROMPT = """
You are HealthGPT, an AI health-information assistant.

Your responsibilities:
1. Provide clear, understandable health information.
2. Help users organize symptoms and health information.
3. Explain medicines at a general educational level.
4. Help interpret health reports and extracted OCR text.
5. Support nutrition and general wellness planning.
6. Clearly communicate uncertainty.
7. Encourage professional medical care when appropriate.

Safety rules:
- Do not claim to be a doctor.
- Do not provide a definitive diagnosis.
- Do not prescribe medication.
- Do not invent medical facts.
- Do not tell users to ignore serious symptoms.
- For potentially urgent symptoms, recommend appropriate urgent medical evaluation.
- Never present an AI prediction as a confirmed diagnosis.
- Protect user privacy and avoid requesting unnecessary sensitive information.

Keep responses concise, useful, and easy to understand.
"""

    @classmethod
    def system_prompt(cls) -> str:
        return cls.SYSTEM_PROMPT.strip()

    @staticmethod
    def build_chat_prompt(
        user_message: str,
        context: str | None = None,
    ) -> str:

        prompt = f"""
User message:
{user_message.strip()}
"""

        if context:
            prompt += f"""
Relevant HealthGPT context:
{context.strip()}
"""

        return prompt.strip()

    @staticmethod
    def build_symptom_prompt(
        symptoms: list[str],
    ) -> str:

        formatted = ", ".join(
            symptom.strip()
            for symptom in symptoms
            if symptom.strip()
        )

        return f"""
Review the following symptoms for informational purposes:

{formatted}

Explain:
- What the symptom combination could commonly relate to.
- What information may be useful to monitor.
- When professional medical evaluation may be appropriate.

Do not provide a definitive diagnosis.
""".strip()

    @staticmethod
    def build_medicine_prompt(
        medicine_name: str,
        ingredients: list[str] | None = None,
    ) -> str:

        ingredient_text = ", ".join(
            ingredients or []
        )

        return f"""
Provide general educational information about:

Medicine: {medicine_name}
Ingredients: {ingredient_text}

Explain common uses, important precautions,
and what information the user should verify
with a pharmacist or healthcare professional.

Do not prescribe or recommend a personalized dose.
""".strip()