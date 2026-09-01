import os
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# ============================================================
# HEALTHGPT MEDICINE AI
# ============================================================

# Load .env
env_file = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_file)

# Get API key
api_key = os.getenv("HEALTHGPT_MEDICINE_AI") or os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ API key was not found.")
    print(f"Expected .env file: {env_file}")
    raise SystemExit

print("✅ HealthGPT Medicine AI connected!")

# Gemini client
client = genai.Client(api_key=api_key)

# Conversation history
conversation = []

SYSTEM_PROMPT = """
You are HealthGPT Medicine AI, an intelligent medicine information
assistant.

Your job is to provide clear, factual and easy-to-understand
information about medicines.

You can help with:
- Medicine names
- Active ingredients
- Uses
- General mechanism of action
- Common side effects
- Precautions
- Drug interactions
- General dosage information
- Prescription explanations
- Medicine comparisons
- Questions about taking medicines
- Medicine-related general health questions

IMPORTANT SAFETY RULES:
- Do not diagnose diseases.
- Do not tell users to start, stop or change prescription medicines.
- Do not replace a doctor or pharmacist.
- For emergencies, advise the user to seek immediate medical care.
- Clearly mention uncertainty when information is insufficient.
- Encourage consultation with a qualified healthcare professional
  when appropriate.

Always answer in a friendly, professional and understandable way.
"""

print("\n" + "=" * 60)
print("💊 HEALTHGPT MEDICINE AI")
print("=" * 60)
print("Hello! I'm your Medicine AI assistant.")
print("Ask me anything about medicines.")
print("Type 'exit' to close the assistant.")
print("=" * 60)

while True:

    user_message = input("\n👤 You: ").strip()

    # Exit
    if user_message.lower() in ["exit", "quit", "bye"]:
        print("\n🤖 HealthGPT: Goodbye! Stay healthy. ❤️")
        break

    # Empty input
    if not user_message:
        print("🤖 HealthGPT: Please enter a medicine or question.")
        continue

    # Add user message to conversation
    conversation.append(
        f"User: {user_message}"
    )

    # Keep conversation reasonably small
    recent_conversation = "\n".join(conversation[-10:])

    prompt = f"""
{SYSTEM_PROMPT}

Previous conversation:
{recent_conversation}

User's latest question:
{user_message}

Respond naturally and directly.
"""

    try:

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config={
                "tools": []
            }
        )

        answer = response.text

        print("\n🤖 HealthGPT:")
        print(answer)

        # Save AI response to conversation
        conversation.append(
            f"HealthGPT: {answer}"
        )

    except Exception as e:

        print("\n❌ Gemini API Error:")
        print(e)

        print(
            "\n💡 Please try again in a few seconds."
        )
