"""TMS + fuzzy logic + KBA intelligence layer for HealthGPT.

TMS = Truth Maintenance System: keeps hypotheses, supporting evidence,
contradictions and confidence so an answer can be revised when new symptoms
or measurements arrive.

KBA = Knowledge-Based Assistant: retrieves structured rules/knowledge and
combines them with fuzzy scores. This is an educational decision-support
layer, not a diagnostic engine.
"""

from dataclasses import dataclass, field
from typing import Any
import re


@dataclass
class Hypothesis:
    name: str
    confidence: float
    evidence: list[str] = field(default_factory=list)
    contradictions: list[str] = field(default_factory=list)


class FuzzyLogic:
    """Small, transparent fuzzy inference implementation."""

    @staticmethod
    def membership(value: float, low: float, high: float) -> float:
        if high <= low:
            return 0.0
        return max(0.0, min(1.0, (value - low) / (high - low)))

    @staticmethod
    def triangular(value: float, left: float, peak: float, right: float) -> float:
        if value <= left or value >= right:
            return 0.0
        if value == peak:
            return 1.0
        if value < peak:
            return (value - left) / (peak - left)
        return (right - value) / (right - peak)

    @staticmethod
    def classify_severity(symptoms: list[str], duration_days: float = 1.0, stress: float = 0.0) -> dict[str, float]:
        symptom_load = min(1.0, len(symptoms) / 8.0)
        duration = min(1.0, max(0.0, duration_days) / 14.0)
        stress_score = min(1.0, max(0.0, stress) / 10.0)
        mild = max(0.0, 1 - max(symptom_load, duration * .7, stress_score * .4))
        moderate = min(1.0, (symptom_load * .7 + duration * .7 + stress_score * .3))
        severe = min(1.0, symptom_load * .45 + duration * .25 + stress_score * .15)
        return {"mild": round(mild, 3), "moderate": round(moderate, 3), "severe": round(severe, 3)}


@dataclass
class TMS:
    hypotheses: dict[str, Hypothesis] = field(default_factory=dict)

    def support(self, name: str, evidence: list[str], weight: float = .2):
        h = self.hypotheses.setdefault(name, Hypothesis(name=name, confidence=.1))
        h.evidence.extend(evidence)
        h.confidence = min(1.0, h.confidence + weight)

    def contradict(self, name: str, evidence: str, weight: float = .15):
        h = self.hypotheses.setdefault(name, Hypothesis(name=name, confidence=.1))
        h.contradictions.append(evidence)
        h.confidence = max(0.0, h.confidence - weight)

    def revise(self) -> list[dict[str, Any]]:
        return [
            {"hypothesis": h.name, "confidence": round(h.confidence, 3),
             "supporting_evidence": h.evidence, "contradictions": h.contradictions}
            for h in sorted(self.hypotheses.values(), key=lambda x: x.confidence, reverse=True)
        ]


class KBA:
    """Knowledge-Based Assistant with transparent symptom rules."""

    RULES = {
        "respiratory": {"keywords": {"cough", "sore throat", "runny nose", "congestion", "sneeze"}, "advice": "Consider hydration, rest and monitoring symptoms; persistent or worsening symptoms deserve professional assessment."},
        "headache": {"keywords": {"headache", "head pain", "migraine"}, "advice": "Rest, hydration and a calm environment may help some uncomplicated headaches. Sudden severe headache or neurological symptoms require urgent evaluation."},
        "digestive": {"keywords": {"nausea", "vomiting", "diarrhea", "stomach pain", "abdominal pain"}, "advice": "Focus on hydration and monitor severity. Persistent vomiting, severe pain, blood, fainting or dehydration signs need medical assessment."},
        "allergy": {"keywords": {"itching", "rash", "hives", "sneezing", "swelling"}, "advice": "Avoid a suspected trigger when possible. Swelling of the face/tongue or breathing difficulty can be an emergency."},
    }

    @staticmethod
    def normalize(items: list[str]) -> set[str]:
        return {re.sub(r"\s+", " ", x.lower().strip()) for x in items if x.strip()}

    def reason(self, symptoms: list[str], duration_days: float = 1.0, stress: float = 0.0) -> dict[str, Any]:
        normalized = self.normalize(symptoms)
        tms = TMS()
        matches = []
        for name, rule in self.RULES.items():
            overlap = normalized.intersection(rule["keywords"])
            if overlap:
                score = min(.9, .2 + .18 * len(overlap))
                tms.support(name, sorted(overlap), score)
                matches.append({"domain": name, "matched": sorted(overlap), "advice": rule["advice"]})

        severity = FuzzyLogic.classify_severity(symptoms, duration_days, stress)
        highest = max(severity, key=severity.get)
        return {
            "knowledge_based_matches": matches,
            "fuzzy_severity": severity,
            "dominant_severity": highest,
            "tms_beliefs": tms.revise(),
            "explanation": "Results combine transparent knowledge rules, fuzzy scoring and evidence revision. They are not a medical diagnosis.",
        }


class HealthIntelligence:
    """Unified interface for the chatbot and API layer."""

    def analyze(self, symptoms: list[str], duration_days: float = 1.0, stress: float = 0.0):
        return KBA().reason(symptoms, duration_days, stress)
