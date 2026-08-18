from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# ---------------------------------------------------------
# DATABASE
# ---------------------------------------------------------

# SQLite is used first so HealthGPT can run immediately.
#
# Later you can replace this with PostgreSQL:
#
# postgresql+psycopg2://postgres:password@localhost:5432/healthgpt
#
DATABASE_URL = "sqlite:///./healthgpt.db"


connect_args = {}

if DATABASE_URL.startswith("sqlite"):
    connect_args = {
        "check_same_thread": False
    }


engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


Base = declarative_base()


def get_db():
    """
    Creates a database session for each request.
    """

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()