from pathlib import Path

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from starlette.middleware.sessions import SessionMiddleware
from werkzeug.security import generate_password_hash, check_password_hash

from .database import Base, engine, SessionLocal
from . import models  # noqa: F401 - registers SQLAlchemy models
from routes import router as api_router


ROOT = Path(__file__).resolve().parents[1]
FRONTEND = ROOT / "frontend"

application = FastAPI(
    title="HealthGPT API",
    version="1.0.0",
    description="HealthGPT backend and frontend application"
)

application.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
application.add_middleware(
    SessionMiddleware,
    secret_key="change-this-secret-before-production",
    max_age=60 * 60 * 24 * 7,
)

Base.metadata.create_all(bind=engine)
application.include_router(api_router)


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    age: int | None = None
    gender: str | None = None


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email.lower()).first()


@application.post("/api/auth/register")
def register(request: RegisterRequest, http_request: Request):
    db = SessionLocal()
    try:
        email = request.email.lower()
        if len(request.password) < 6:
            raise HTTPException(status_code=400, detail="Password must contain at least 6 characters.")
        if get_user_by_email(db, email):
            raise HTTPException(status_code=409, detail="An account with this email already exists.")

        user = models.User(
            name=request.name.strip(),
            email=email,
            password=generate_password_hash(request.password),
            age=request.age,
            gender=request.gender,
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        http_request.session["user_id"] = user.id
        return {"success": True, "user": {"id": user.id, "name": user.name, "email": user.email}}
    finally:
        db.close()


@application.post("/api/auth/login")
def login(request: LoginRequest, http_request: Request):
    db = SessionLocal()
    try:
        user = get_user_by_email(db, request.email)
        if not user or not user.is_active or not check_password_hash(user.password, request.password):
            raise HTTPException(status_code=401, detail="Invalid email or password.")
        http_request.session["user_id"] = user.id
        return {"success": True, "user": {"id": user.id, "name": user.name, "email": user.email}}
    finally:
        db.close()


@application.get("/api/auth/me")
def me(http_request: Request):
    user_id = http_request.session.get("user_id")
    if not user_id:
        raise HTTPException(status_code=401, detail="Not authenticated.")
    db = SessionLocal()
    try:
        user = db.get(models.User, user_id)
        if not user:
            http_request.session.clear()
            raise HTTPException(status_code=401, detail="User not found.")
        return {"success": True, "user": {"id": user.id, "name": user.name, "email": user.email}}
    finally:
        db.close()


@application.post("/api/auth/logout")
def logout(http_request: Request):
    http_request.session.clear()
    return {"success": True}


@application.get("/health")
def health():
    return {"status": "healthy", "backend": "online", "database": "connected"}


@application.get("/")
def home():
    return FileResponse(FRONTEND / "INDEX.HTML")


@application.get("/dashboard")
def dashboard():
    return FileResponse(FRONTEND / "myi10.html")


# Static assets/files remain available at their original paths.
application.mount("/frontend", StaticFiles(directory=FRONTEND), name="frontend")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.application:application", host="0.0.0.0", port=8000, reload=True)
