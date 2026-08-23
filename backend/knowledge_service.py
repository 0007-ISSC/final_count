"""HealthGPT knowledge base and retrieval layer.

The knowledge base is deliberately structured so it can grow from a small
seed set into a large curated healthcare corpus without changing the API.
Entries are educational summaries, not clinical guidelines.
"""

from sqlalchemy import or_
from sqlalchemy.orm import Session
from models import KnowledgeEntry


def search_knowledge(db: Session, query: str, limit: int = 8) -> list[KnowledgeEntry]:
    terms = [t.strip().lower() for t in query.split() if len(t.strip()) >= 3]
    if not terms:
        return []
    clauses = []
    for term in terms[:12]:
        like = f"%{term}%"
        clauses.extend([
            KnowledgeEntry.title.ilike(like),
            KnowledgeEntry.content.ilike(like),
            KnowledgeEntry.tags.ilike(like),
            KnowledgeEntry.category.ilike(like),
        ])
    return db.query(KnowledgeEntry).filter(or_(*clauses)).limit(limit).all()


def build_context(entries: list[KnowledgeEntry]) -> str:
    if not entries:
        return "No matching HealthGPT knowledge-base entry was found. Use the language model's general knowledge cautiously and clearly state uncertainty."
    chunks = []
    for item in entries:
        chunks.append(f"[{item.category}] {item.title}\n{item.content}")
    return "\n\n".join(chunks)


# Curated seed records. These are intentionally general educational statements.
# A production deployment should replace/extend them with reviewed sources.
SEED_KNOWLEDGE = [
    ("general", "Fever", "Fever is an elevated body temperature that can occur with infections and other conditions. Severity depends on the person, duration, associated symptoms, and underlying conditions.", "fever,temperature"),
    ("general", "Cough", "A cough is a protective reflex that clears the airways. Common causes include viral respiratory infections, allergies, asthma, reflux, and environmental irritants.", "cough,respiratory"),
    ("general", "Headache", "Headaches have many possible causes, including tension, migraine, dehydration, illness, and medication effects. A sudden severe headache or one with neurological symptoms needs urgent evaluation.", "headache,pain,migraine"),
    ("general", "Dehydration", "Dehydration occurs when the body loses more fluid than it takes in. Thirst, dry mouth, dark urine, dizziness, and reduced urination can occur.", "hydration,dehydration,water"),
    ("general", "Sleep", "Adequate, regular sleep supports physical and mental wellbeing. Persistent sleep problems or significant daytime impairment should be discussed with a healthcare professional.", "sleep,rest"),
    ("general", "Blood pressure", "Blood pressure varies with activity, stress, medications, and health conditions. Repeated abnormal readings should be interpreted using proper measurement technique and clinical context.", "blood pressure,hypertension"),
    ("general", "Heart rate", "Resting heart rate varies among individuals and can change with fitness, illness, stress, medications, and hydration. Persistent unusual readings or concerning symptoms warrant medical assessment.", "heart rate,pulse"),
    ("medicine", "Medication safety", "Medicines should be taken according to the product label or a qualified healthcare professional's instructions. Check interactions, allergies, contraindications, and duplicate ingredients with a pharmacist.", "medicine,safety,medication"),
    ("medicine", "Antibiotics", "Antibiotics treat certain bacterial infections and do not treat viral illnesses such as most common colds. Unnecessary use can contribute to antibiotic resistance and adverse effects.", "antibiotic,infection,resistance"),
    ("medicine", "Paracetamol", "Paracetamol (acetaminophen) is commonly used for pain and fever. The appropriate dose depends on age, formulation, other medicines, and health conditions; exceeding the labeled maximum can cause serious liver injury.", "paracetamol,acetaminophen,pain,fever"),
    ("nutrition", "Balanced diet", "A balanced diet generally includes vegetables and fruits, whole grains or other high-fiber carbohydrates, protein sources, and appropriate amounts of fats and fluids.", "nutrition,diet,food"),
    ("nutrition", "Protein", "Protein is needed for tissue maintenance and many body functions. Sources include pulses, beans, dairy, eggs, fish, meat, soy, nuts, and seeds.", "protein,nutrition"),
    ("nutrition", "Fiber", "Dietary fiber supports bowel function and is found in vegetables, fruits, legumes, whole grains, nuts, and seeds. Increase fiber gradually with adequate fluids.", "fiber,digestion,nutrition"),
    ("mental wellness", "Stress", "Stress is a common response to demanding situations. Sleep, physical activity, relaxation techniques, social support, and professional support can help when stress becomes difficult to manage.", "stress,mental health"),
    ("mental wellness", "Anxiety", "Anxiety can involve worry, tension, physical symptoms, and avoidance. Persistent or impairing anxiety can benefit from assessment by a qualified mental-health professional.", "anxiety,mental health"),
    ("mental wellness", "Depressive symptoms", "Persistent low mood, loss of interest, hopelessness, sleep or appetite changes, and impaired functioning can occur with depression and deserve professional assessment.", "depression,mood,mental health"),
    ("emergency", "Emergency warning signs", "Chest pain, severe difficulty breathing, signs of stroke, severe allergic reaction, loss of consciousness, major bleeding, or other rapidly worsening severe symptoms require urgent medical evaluation.", "emergency,urgent,red flags"),
    ("prevention", "Hand hygiene", "Regular hand hygiene can reduce transmission of many infectious illnesses, especially before eating and after using the toilet, coughing, sneezing, or caring for someone who is ill.", "hygiene,prevention,infection"),
    ("prevention", "Vaccination", "Vaccines train the immune system to recognize specific infections and are an important preventive-health measure. Recommended vaccines depend on age, location, health conditions, and public-health guidance.", "vaccine,vaccination,prevention"),
    ("records", "Health records", "Keeping a structured record of diagnoses, medicines, allergies, measurements, reports, and important dates can help users communicate more effectively with healthcare professionals.", "records,history,medical"),
]


def seed_knowledge(db: Session) -> int:
    existing = {row.title for row in db.query(KnowledgeEntry.title).all()}
    added = 0
    for category, title, content, tags in SEED_KNOWLEDGE:
        if title in existing:
            continue
        db.add(KnowledgeEntry(category=category, title=title, content=content, tags=tags))
        added += 1
    if added:
        db.commit()
    return added
