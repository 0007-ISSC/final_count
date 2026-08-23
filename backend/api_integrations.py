"""Free/public API integrations used by HealthGPT.

External services are used as enrichment layers. The app keeps working when
an external API is unavailable, and no API key is hard-coded in the repository.
"""

import os
from typing import Any
import httpx

GEMINI_KEY = os.getenv("GEMINI_API_KEY", "")
GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-3.1-flash-lite")


async def gemini_chat(message: str, context: str = "", history: list[dict[str, str]] | None = None) -> dict[str, Any]:
    if not GEMINI_KEY:
        return {"ok": False, "reason": "GEMINI_API_KEY is not configured"}
    system = (
        "You are HealthGPT, a warm, intelligent healthcare information assistant. "
        "Be conversational and remember context supplied in the conversation. "
        "Do not claim to be a doctor, do not provide definitive diagnosis or prescriptions, "
        "do not invent facts, and clearly recommend professional care for urgent or serious symptoms. "
        "Use the supplied knowledge context when relevant."
    )
    contents = [{"role": "user", "parts": [{"text": system + "\n\nKnowledge context:\n" + context}]}]
    for item in (history or [])[-12:]:
        contents.append({"role": "model" if item.get("role") == "assistant" else "user", "parts": [{"text": item.get("content", "")} ]})
    contents.append({"role": "user", "parts": [{"text": message}]})
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"
    try:
        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.post(url, params={"key": GEMINI_KEY}, json={"contents": contents})
            response.raise_for_status()
            data = response.json()
            text = data["candidates"][0]["content"]["parts"][0]["text"]
            return {"ok": True, "response": text, "model": GEMINI_MODEL}
    except Exception as exc:
        return {"ok": False, "reason": str(exc)}


async def rxnorm_lookup(name: str) -> dict[str, Any]:
    base = "https://rxnav.nlm.nih.gov/REST"
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            match = await client.get(f"{base}/rxcui.json", params={"name": name, "search": 2})
            match.raise_for_status()
            ids = match.json().get("idGroup", {}).get("rxnormId", [])
            if not ids:
                return {"ok": True, "found": False, "source": "RxNorm"}
            rxcui = ids[0]
            props = await client.get(f"{base}/rxcui/{rxcui}/properties.json")
            props.raise_for_status()
            return {"ok": True, "found": True, "source": "RxNorm", "rxcui": rxcui, "properties": props.json().get("properties", {})}
    except Exception as exc:
        return {"ok": False, "source": "RxNorm", "reason": str(exc)}


async def openfda_drug(name: str) -> dict[str, Any]:
    url = "https://api.fda.gov/drug/label.json"
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(url, params={"search": f'openfda.brand_name:"{name}"', "limit": 3})
            if response.status_code == 404:
                return {"ok": True, "found": False, "source": "openFDA"}
            response.raise_for_status()
            results = response.json().get("results", [])
            cleaned = []
            for item in results:
                cleaned.append({
                    "brand_name": item.get("openfda", {}).get("brand_name", []),
                    "generic_name": item.get("openfda", {}).get("generic_name", []),
                    "purpose": item.get("purpose", [])[:2],
                    "warnings": item.get("warnings", [])[:2],
                    "indications": item.get("indications_and_usage", [])[:2],
                    "route": item.get("openfda", {}).get("route", []),
                })
            return {"ok": True, "found": bool(cleaned), "source": "openFDA", "results": cleaned}
    except Exception as exc:
        return {"ok": False, "source": "openFDA", "reason": str(exc)}


async def food_product(barcode: str) -> dict[str, Any]:
    url = f"https://world.openfoodfacts.org/api/v3/product/{barcode}.json"
    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(url)
            response.raise_for_status()
            product = response.json().get("product", {})
            return {"ok": True, "source": "Open Food Facts", "product": {
                "name": product.get("product_name"),
                "brands": product.get("brands"),
                "ingredients": product.get("ingredients_text"),
                "allergens": product.get("allergens"),
                "nutriscore": product.get("nutriscore_grade"),
                "energy_kcal_100g": product.get("nutriments", {}).get("energy-kcal_100g"),
                "proteins_100g": product.get("nutriments", {}).get("proteins_100g"),
                "sugars_100g": product.get("nutriments", {}).get("sugars_100g"),
                "salt_100g": product.get("nutriments", {}).get("salt_100g"),
            }}
    except Exception as exc:
        return {"ok": False, "source": "Open Food Facts", "reason": str(exc)}


async def pubmed_search(term: str, limit: int = 5) -> dict[str, Any]:
    base = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils"
    try:
        async with httpx.AsyncClient(timeout=25) as client:
            search = await client.get(f"{base}/esearch.fcgi", params={"db": "pubmed", "term": term, "retmode": "json", "retmax": min(limit, 10)})
            search.raise_for_status()
            ids = search.json().get("esearchresult", {}).get("idlist", [])
            if not ids:
                return {"ok": True, "source": "PubMed", "results": []}
            summary = await client.get(f"{base}/esummary.fcgi", params={"db": "pubmed", "id": ",".join(ids), "retmode": "json"})
            summary.raise_for_status()
            data = summary.json().get("result", {})
            results = []
            for pid in ids:
                row = data.get(pid, {})
                results.append({"pmid": pid, "title": row.get("title"), "journal": row.get("fulljournalname"), "pubdate": row.get("pubdate"), "url": f"https://pubmed.ncbi.nlm.nih.gov/{pid}/"})
            return {"ok": True, "source": "PubMed", "results": results}
    except Exception as exc:
        return {"ok": False, "source": "PubMed", "reason": str(exc)}
