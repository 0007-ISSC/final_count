import re


def validate_email(email: str) -> bool:
    pattern = r"^[^@\s]+@[^@\s]+\.[^@\s]+$"

    return bool(
        re.match(pattern, email)
    )


def validate_password(password: str) -> bool:
    if len(password) < 8:
        return False

    return True