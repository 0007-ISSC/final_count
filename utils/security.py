import os

from jose import jwt, JWTError


SECRET_KEY = os.getenv(
    "JWT_SECRET_KEY",
    "CHANGE_THIS_SECRET_KEY"
)

ALGORITHM = os.getenv(
    "JWT_ALGORITHM",
    "HS256"
)


def decode_token(token: str):
    try:
        return jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

    except JWTError:
        return None