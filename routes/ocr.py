"""
HealthGPT Medical OCR Routes.
"""

from io import BytesIO

from fastapi import (
    APIRouter,
    File,
    UploadFile
)


router = APIRouter(
    prefix="/ocr",
    tags=["05 - Medical OCR"]
)


ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".webp"
}


@router.post("/analyze")
async def analyze_document(
    file: UploadFile = File(...)
):

    filename = file.filename or ""

    extension = ""

    if "." in filename:
        extension = (
            "." +
            filename.rsplit(".", 1)[1].lower()
        )

    if extension not in ALLOWED_EXTENSIONS:

        return {
            "success": False,
            "message": (
                "Unsupported file type. "
                "Upload JPG, JPEG, PNG or WEBP."
            )
        }

    image_bytes = await file.read()

    if not image_bytes:

        return {
            "success": False,
            "message": "Uploaded file is empty."
        }

    # --------------------------------------------------------
    # Try Tesseract OCR
    # --------------------------------------------------------

    try:

        from PIL import Image
        import pytesseract

        image = Image.open(
            BytesIO(image_bytes)
        )

        text = pytesseract.image_to_string(
            image
        )

        return {
            "success": True,
            "module": "Medical OCR",
            "filename": filename,
            "text": text.strip(),
            "character_count": len(text),
            "disclaimer": (
                "OCR extracts text from a document. "
                "Extracted information should be verified against "
                "the original medical report."
            )
        }

    except ImportError:

        return {
            "success": False,
            "module": "Medical OCR",
            "message": (
                "Pillow or pytesseract is not installed."
            )
        }

    except Exception as error:

        return {
            "success": False,
            "module": "Medical OCR",
            "message": str(error)
        }