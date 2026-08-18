from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from jose import JWTError, jwt
from passlib.context import CryptContext

from sqlalchemy.orm import Session

from ..config import settings
from ..database import get_db


# ---------------------------------------------------------
# Password hashing
# ---------------------------------------------------------

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)


def hash_password(password: str) -> str:
    """
    Hash a plain-text password.
    """

    return password_context.hash(password)


def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """
    Verify a password against its stored hash.
    """

    return password_context.verify(
        plain_password,
        hashed_password
    )


# ---------------------------------------------------------
# JWT authentication
# ---------------------------------------------------------

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/auth/login"
)


def create_access_token(user_id: int) -> str:
    """
    Create JWT access token for a user.
    """

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=settings.access_token_expire_minutes
        )
    )

    payload = {
        "sub": str(user_id),
        "exp": expire
    }

    return jwt.encode(
        payload,
        settings.secret_key,
        algorithm="HS256"
    )


def decode_access_token(token: str) -> int:
    """
    Decode JWT and return user ID.
    """

    try:

        payload = jwt.decode(
            token,
            settings.secret_key,
            algorithms=["HS256"]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise ValueError("Missing user ID")

        return int(user_id)

    except (JWTError, ValueError, TypeError):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )


# ---------------------------------------------------------
# Current user dependency
# ---------------------------------------------------------

def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    """
    Retrieve the authenticated user from the JWT.
    """

    # Imported here to avoid circular imports.
    from ..models.user import User

    user_id = decode_access_token(token)

    user = db.query(User).filter(
        User.id == user_id
    ).first()

    if user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    if not user.is_active:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )

    return user