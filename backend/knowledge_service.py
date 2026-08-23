"""HealthGPT knowledge base and retrieval layer."""
from sqlalchemy import or_
from sqlalchemy.orm import Session
from .models import KnowledgeEntry


def search_knowledge(db: Session, query: str, limit: int = 8) -> list[KnowledgeEntry]:
    terms = [t.strip().lower() for t in query.split() if len(t.strip()) >= 3]
    if not terms:
        return []
    clauses = []
    for term in terms[:12]:
        like = f"%{term}%"
        clauses.extend([KnowledgeEntry.title.ilike(like), KnowledgeEntry.content.ilike(like), KnowledgeEntry.tags.ilike(like), KnowledgeEntry.category.ilike(like)])
    return db.query(KnowledgeEntry).filter(or_(*clauses)).limit(limit).all()


def build_context(entries: list[KnowledgeEntry]) -> str:
    if not entries:
        return "No matching HealthGPT knowledge-base entry was found."
    return "\n\n".join(f"[{x.category}] {x.title}\n{x.content}" for x in entries)

SEED_KNOWLEDGE = [
    ("general", "Fever", "Fever is an elevated body temperature that can occur with infections and other conditions.", "fever,temperature"),
    ("general", "Cough", "A cough is a protective reflex that clears the airways. Common causes include viral respiratory infections, allergies, asthma, reflux, and irritants.", "cough,respiratory"),
    ("general", "Headache", "Headaches have many causes. A sudden severe headache or headache with neurological symptoms needs urgent evaluation.", "headache,pain,migraine"),
    ("general", "Dehydration", "Dehydration occurs when the body loses more fluid than it takes in. Thirst, dry mouth, dark urine, dizziness, and reduced urination can occur.", "hydration,dehydration,water"),
    ("general", "Sleep", "Adequate regular sleep supports physical and mental wellbeing. Persistent sleep problems deserve professional assessment.", "sleep,rest"),
    ("general", "Blood pressure", "Blood pressure varies with activity, stress, medicines and health conditions. Repeated abnormal readings need clinical context.", "blood pressure,hypertension"),
    ("medicine", "Medication safety", "Medicines should be used according to the label or qualified professional advice. Check allergies, interactions, contraindications and duplicate ingredients.", "medicine,safety,medication"),
    ("medicine", "Antibiotics", "Antibiotics treat certain bacterial infections and do not treat most viral colds. Unnecessary use can cause adverse effects and resistance.", "antibiotic,infection,resistance"),
    ("medicine", "Paracetamol", "Paracetamol is commonly used for pain and fever. Dose depends on age, formulation, other medicines and health conditions; exceeding the labeled maximum can cause serious liver injury.", "paracetamol,acetaminophen,pain,fever"),
    ("nutrition", "Balanced diet", "A balanced diet generally includes vegetables, fruits, whole grains or other high-fiber carbohydrates, protein sources, healthy fats and appropriate fluids.", "nutrition,diet,food"),
    ("nutrition", "Protein", "Protein supports tissue maintenance and many body functions. Sources include pulses, beans, dairy, eggs, fish, meat, soy, nuts and seeds.", "protein,nutrition"),
    ("mental wellness", "Stress", "Stress is a common response to demanding situations. Sleep, activity, relaxation, social support and professional support can help.", "stress,mental health"),
    ("mental wellness", "Anxiety", "Anxiety can involve worry, tension, physical symptoms and avoidance. Persistent or impairing anxiety can benefit from professional assessment.", "anxiety,mental health"),
    ("emergency", "Emergency warning signs", "Chest pain, severe breathing difficulty, signs of stroke, severe allergic reaction, loss of consciousness, major bleeding or rapidly worsening severe symptoms require urgent medical evaluation.", "emergency,urgent,red flags"),
    ("prevention", "Vaccination", "Vaccines train the immune system to recognize specific infections. Recommendations depend on age, location, health conditions and public-health guidance.", "vaccine,vaccination,prevention"),
    ("records", "Health records", "Structured records of diagnoses, medicines, allergies, measurements, reports and dates can help users communicate with healthcare professionals.", "records,history,medical"),
]


def seed_knowledge(db: Session) -> int:
    existing = {x[0] for x in db.query(KnowledgeEntry.title).all()}
    added = 0
    for category, title, content, tags in SEED_KNOWLEDGE:
        if title in existing:
            continue
        db.add(KnowledgeEntry(category=category, title=title, content=content, tags=tags))
        added += 1
    if added:
        db.commit()
    return added
