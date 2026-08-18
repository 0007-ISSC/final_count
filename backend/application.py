from flask import Flask
from flask_cors import CORS

from database import Base, engine
from routes import register_routes


# ============================================================
# HEALTHGPT APPLICATION
# ============================================================

application = Flask(__name__)

# Allow frontend to communicate with backend
CORS(application)


# ============================================================
# DATABASE
# ============================================================

try:
    Base.metadata.create_all(bind=engine)
    print("✅ Database connected and tables checked.")
except Exception as e:
    print("⚠️ Database connection failed:")
    print(e)


# ============================================================
# API ROUTES
# ============================================================

try:
    register_routes(application)
    print("✅ API routes registered successfully.")
except Exception as e:
    print("❌ Failed to register API routes:")
    print(e)


# ============================================================
# HOME
# ============================================================

@application.route("/", methods=["GET"])
def home():
    return {
        "application": "HealthGPT",
        "status": "online",
        "message": "HealthGPT backend is running",
        "api": "available"
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@application.route("/health", methods=["GET"])
def health():
    return {
        "status": "healthy",
        "backend": "online"
    }


# ============================================================
# RUN SERVER
# ============================================================

if __name__ == "__main__":
    print("\n" + "=" * 55)
    print("🚀 HealthGPT Backend Starting...")
    print("=" * 55)
    print("🌐 Server: http://127.0.0.1:5000")
    print("❤️ Health: http://127.0.0.1:5000/health")
    print("🏠 Home:   http://127.0.0.1:5000/")
    print("=" * 55 + "\n")

    application.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )