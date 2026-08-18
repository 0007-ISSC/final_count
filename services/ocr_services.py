"""
HealthGPT Medical OCR Service.
"""

from io import BytesIO


class OCRService:

    def __init__(
        self,
        tesseract_path: str | None = None
    ):
        self.tesseract_path = (
            tesseract_path
        )

    # ========================================================
    # EXTRACT TEXT
    # ========================================================

    async def extract_text(
        self,
        image_bytes: bytes
    ) -> dict:

        if not image_bytes:

            return {
                "success": False,
                "message": "Image is empty.",
            }

        try:

            from PIL import Image
            import pytesseract

            if self.tesseract_path:

                pytesseract.pytesseract.tesseract_cmd = (
                    self.tesseract_path
                )

            image = Image.open(
                BytesIO(image_bytes)
            )

            text = pytesseract.image_to_string(
                image
            )

            return {
                "success": True,
                "text": text.strip(),
                "character_count": len(
                    text
                ),
                "disclaimer": (
                    "OCR extracts text but does not verify "
                    "the medical correctness of the document."
                ),
            }

        except ImportError:

            return {
                "success": False,
                "message": (
                    "Pillow and pytesseract are required "
                    "for OCR."
                ),
            }

        except Exception as exc:

            return {
                "success": False,
                "message": str(exc),
            }