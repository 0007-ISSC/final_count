from pathlib import Path


ALLOWED_EXTENSIONS = {
    ".png",
    ".jpg",
    ".jpeg",
    ".webp"
}


def validate_image(filename: str) -> bool:
    extension = Path(filename).suffix.lower()

    return extension in ALLOWED_EXTENSIONS


def extract_text_from_image(file_path: str) -> str:
    """
    OCR integration point.

    Replace the implementation with the selected
    OCR engine when OCR is connected.
    """

    try:
        import pytesseract
        from PIL import Image

        image = Image.open(file_path)

        text = pytesseract.image_to_string(
            image
        )

        return text.strip()

    except ImportError:
        raise RuntimeError(
            "OCR dependencies are not installed."
        )