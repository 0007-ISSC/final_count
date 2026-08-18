"""
HealthGPT Health Records Service.

Temporary in-memory implementation.
Replace the storage layer with SQLAlchemy/PostgreSQL
when the database layer is connected.
"""

from datetime import datetime


class RecordsService:

    def __init__(self):

        self.records = []

    # ========================================================
    # CREATE
    # ========================================================

    def create_record(
        self,
        user_id: int,
        record_type: str,
        title: str,
        content: str,
    ) -> dict:

        record = {

            "id": len(
                self.records
            ) + 1,

            "user_id": user_id,

            "record_type": record_type,

            "title": title,

            "content": content,

            "created_at": (
                datetime.utcnow()
                .isoformat()
            ),
        }

        self.records.append(
            record
        )

        return record

    # ========================================================
    # GET
    # ========================================================

    def get_user_records(
        self,
        user_id: int
    ) -> list[dict]:

        return [
            record
            for record in self.records
            if record["user_id"] == user_id
        ]

    # ========================================================
    # GET ONE
    # ========================================================

    def get_record(
        self,
        record_id: int
    ):

        for record in self.records:

            if record["id"] == record_id:

                return record

        return None

    # ========================================================
    # DELETE
    # ========================================================

    def delete_record(
        self,
        record_id: int
    ) -> bool:

        for index, record in enumerate(
            self.records
        ):

            if record["id"] == record_id:

                self.records.pop(
                    index
                )

                return True

        return False