from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

from .config import settings


# SQLite requires this option when used with FastAPI's request handling.
connect_args = {}

if settings.database_url.startswith("sqlite"):
    connect_args = {
        "check_same_thread": False
    }


engine = create_engine(
    settings.database_url,
    connect_args=connect_args,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False
)


Base = declarative_base()


def get_db():
    """
    FastAPI database dependency.

    Opens a database session for the request
    and guarantees that it is closed afterwards.
    """

    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()