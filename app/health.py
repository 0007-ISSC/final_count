from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    Float,
    DateTime,
    ForeignKey
)

from app.database import Base


class HealthRecord(Base):

    __tablename__ = "health_records"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    weight = Column(
        Float,
        nullable=True
    )

    height = Column(
        Float,
        nullable=True
    )

    heart_rate = Column(
        Float,
        nullable=True
    )

    sleep_hours = Column(
        Float,
        nullable=True
    )

    water_intake = Column(
        Float,
        nullable=True
    )

    steps = Column(
        Integer,
        nullable=True
    )

    recorded_at = Column(
        DateTime,
        default=datetime.utcnow
    )