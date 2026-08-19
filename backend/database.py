from pathlib import Path

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Keep the database file beside the backend code so its location is stable.
# Set DATABASE_URL as an environment variable to use PostgreSQL in production.
DATABASE_URL = __import__("os").environ.get(
    "DATABASE_URL",
    f"sqlite:///{Path(__file__).resolve().parent / 'healthgpt.db'}"
)

connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine,
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
