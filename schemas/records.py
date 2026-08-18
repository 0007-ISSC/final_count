"""
HealthGPT Health Records Schemas.
"""

from datetime import datetime

from pydantic import (
    BaseModel,
    Field,
)


class HealthRecordCreate(BaseModel):
    """
    Data required to create a health record.
    """

    user_id: int = Field(
        ...,
        gt=0,
    )

    record_type: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )

    title: str = Field(
        ...,
        min_length=1,
        max_length=250,
    )

    content: str = Field(
        ...,
        min_length=1,
    )


class HealthRecordResponse(BaseModel):
    """
    Health record returned by the backend.
    """

    id: int

    user_id: int

    record_type: str

    title: str

    content: str

    created_at: datetime | str