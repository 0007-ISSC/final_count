"""
HealthGPT Health Records Routes.

This version provides an API-ready in-memory development
store. Connect it to your SQLAlchemy database once your
database layer is wired into the application.
"""

from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel, Field


router = APIRouter(
    prefix="/records",
    tags=["07 - Health Records"]
)


# ------------------------------------------------------------
# Temporary development storage
# ------------------------------------------------------------

HEALTH_RECORDS = []


class HealthRecordRequest(BaseModel):

    user_id: int

    record_type: str = Field(
        ...,
        min_length=1
    )

    title: str = Field(
        ...,
        min_length=1
    )

    content: str = Field(
        ...,
        min_length=1
    )


@router.post("")
async def create_record(
    request: HealthRecordRequest
):

    record = {

        "id": len(
            HEALTH_RECORDS
        ) + 1,

        "user_id": request.user_id,

        "record_type": request.record_type,

        "title": request.title,

        "content": request.content,

        "created_at": datetime.utcnow().isoformat()
    }

    HEALTH_RECORDS.append(
        record
    )

    return {
        "success": True,
        "module": "Health Records",
        "record": record
    }


@router.get("/{user_id}")
async def get_records(
    user_id: int
):

    records = [
        record
        for record in HEALTH_RECORDS
        if record["user_id"] == user_id
    ]

    return {
        "success": True,
        "module": "Health Records",
        "user_id": user_id,
        "count": len(records),
        "records": records
    }


@router.delete("/{record_id}")
async def delete_record(
    record_id: int
):

    for index, record in enumerate(
        HEALTH_RECORDS
    ):

        if record["id"] == record_id:

            deleted = HEALTH_RECORDS.pop(
                index
            )

            return {
                "success": True,
                "deleted": deleted
            }

    return {
        "success": False,
        "message": "Record not found."
    }