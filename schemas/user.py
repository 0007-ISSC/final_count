"""
HealthGPT User Schemas.
"""

from datetime import datetime

from pydantic import (
    BaseModel,
    EmailStr,
    Field,
)


class UserCreate(BaseModel):
    """
    User registration data.
    """

    name: str = Field(
        ...,
        min_length=2,
        max_length=100,
    )

    email: EmailStr

    password: str = Field(
        ...,
        min_length=8,
        max_length=128,
    )


class UserLogin(BaseModel):
    """
    User login data.
    """

    email: EmailStr

    password: str = Field(
        ...,
        min_length=1,
        max_length=128,
    )


class UserResponse(BaseModel):
    """
    Public user information.

    Password is intentionally excluded.
    """

    id: int

    name: str

    email: EmailStr

    is_active: bool = True

    created_at: datetime | None = None