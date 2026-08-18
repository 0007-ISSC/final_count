"""
Common HealthGPT API schemas.
"""

from typing import Any

from pydantic import BaseModel, Field


class APIResponse(BaseModel):
    """
    Standard successful API response.
    """

    success: bool = True

    message: str = ""

    data: Any = None


class ErrorResponse(BaseModel):
    """
    Standard error response.
    """

    success: bool = False

    message: str

    error_code: str | None = None