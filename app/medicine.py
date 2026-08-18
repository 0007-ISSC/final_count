from datetime import datetime

from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DateTime
)

from app.database import Base


class Medicine(Base):

    __tablename__ = "medicines"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String(255),
        nullable=False,
        index=True
    )

    generic_name = Column(
        String(255),
        nullable=True
    )

    dosage = Column(
        String(100),
        nullable=True
    )

    ingredients = Column(
        Text,
        nullable=True
    )

    uses = Column(
        Text,
        nullable=True
    )

    side_effects = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )