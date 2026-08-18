import os
import tempfile

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    HTTPException
)

from app.ocr.service import (
    validate_image,
    extract_text_from_image
)


router = APIRouter(
    prefix="/ocr",
    tags=["OCR"]
)


@router.post("/prescription")
async def prescription_ocr(
    file: UploadFile = File(...)
):
    if not file.filename:
        raise HTTPException(
            status_code=400,
            detail="No file provided."
        )

    if not validate_image(file.filename):
        raise HTTPException(
            status_code=400,
            detail="Unsupported image format."
        )

    suffix = os.path.splitext(
        file.filename
    )[1].lower()

    temp_path = None

    try:
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=suffix
        ) as temp_file:

            temp_path = temp_file.name

            content = await file.read()

            temp_file.write(content)

        extracted_text = extract_text_from_image(
            temp_path
        )

        return {
            "success": True,
            "filename": file.filename,
            "text": extracted_text
        }

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=f"OCR processing failed: {exc}"
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)