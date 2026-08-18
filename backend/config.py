import os
from pathlib import Path

from dotenv import load_dotenv


# ============================================================
# HEALTHGPT CONFIGURATION
# ============================================================

# Project root
BASE_DIR = Path(__file__).resolve().parent

# Load .env from backend folder
ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


class Settings:
    """
    Central configuration for HealthGPT.

    All sensitive values should be stored in .env.
    """

    # ========================================================
    # APPLICATION
    # ========================================================

    APP_NAME = os.getenv(
        "APP_NAME",
        "HealthGPT"
    )

    APP_VERSION = os.getenv(
        "APP_VERSION",
        "1.0.0"
    )

    APP_DESCRIPTION = os.getenv(
        "APP_DESCRIPTION",
        "AI-powered personal health intelligence backend"
    )

    DEBUG = os.getenv(
        "DEBUG",
        "true"
    ).lower() == "true"


    # ========================================================
    # SERVER
    # ========================================================

    HOST = os.getenv(
        "HOST",
        "127.0.0.1"
    )

    PORT = int(
        os.getenv(
            "PORT",
            "8000"
        )
    )

    RELOAD = os.getenv(
        "RELOAD",
        "true"
    ).lower() == "true"


    # ========================================================
    # SECURITY
    # ========================================================

    SECRET_KEY = os.getenv(
        "SECRET_KEY",
        "CHANGE_THIS_SECRET_KEY"
    )

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv(
            "ACCESS_TOKEN_EXPIRE_MINUTES",
            "1440"
        )
    )


    # ========================================================
    # DATABASE
    # ========================================================

    DATABASE_URL = os.getenv(
        "DATABASE_URL",
        "sqlite:///./healthgpt.db"
    )

    DATABASE_ECHO = os.getenv(
        "DATABASE_ECHO",
        "false"
    ).lower() == "true"


    # ========================================================
    # LLM / AI
    # ========================================================

    LLM_PROVIDER = os.getenv(
        "LLM_PROVIDER",
        "demo"
    )

    LLM_API_KEY = os.getenv(
        "LLM_API_KEY",
        ""
    )

    LLM_API_URL = os.getenv(
        "LLM_API_URL",
        ""
    )

    LLM_MODEL = os.getenv(
        "LLM_MODEL",
        ""
    )

    LLM_TEMPERATURE = float(
        os.getenv(
            "LLM_TEMPERATURE",
            "0.2"
        )
    )

    LLM_MAX_TOKENS = int(
        os.getenv(
            "LLM_MAX_TOKENS",
            "1000"
        )
    )


    # ========================================================
    # MACHINE LEARNING
    # ========================================================

    ML_MODEL_DIR = os.getenv(
        "ML_MODEL_DIR",
        str(BASE_DIR / "models")
    )

    DISEASE_MODEL_PATH = os.getenv(
        "DISEASE_MODEL_PATH",
        str(
            BASE_DIR /
            "models" /
            "disease_model.joblib"
        )
    )

    RISK_MODEL_PATH = os.getenv(
        "RISK_MODEL_PATH",
        str(
            BASE_DIR /
            "models" /
            "risk_model.joblib"
        )
    )


    # ========================================================
    # OCR
    # ========================================================

    OCR_ENABLED = os.getenv(
        "OCR_ENABLED",
        "true"
    ).lower() == "true"

    TESSERACT_PATH = os.getenv(
        "TESSERACT_PATH",
        ""
    )


    # ========================================================
    # FILE UPLOADS
    # ========================================================

    UPLOAD_DIR = os.getenv(
        "UPLOAD_DIR",
        str(BASE_DIR / "uploads")
    )

    MAX_UPLOAD_SIZE_MB = int(
        os.getenv(
            "MAX_UPLOAD_SIZE_MB",
            "10"
        )
    )

    ALLOWED_IMAGE_EXTENSIONS = {
        "jpg",
        "jpeg",
        "png",
        "webp"
    }

    ALLOWED_DOCUMENT_EXTENSIONS = {
        "pdf",
        "jpg",
        "jpeg",
        "png",
        "webp"
    }


    # ========================================================
    # CORS
    # ========================================================

    CORS_ORIGINS = os.getenv(
        "CORS_ORIGINS",
        "*"
    )

    @property
    def cors_origins_list(self):
        """
        Convert comma-separated CORS origins
        into a Python list.
        """

        if self.CORS_ORIGINS.strip() == "*":
            return ["*"]

        return [
            origin.strip()
            for origin in self.CORS_ORIGINS.split(",")
            if origin.strip()
        ]


    # ========================================================
    # HEALTHGPT FEATURES
    # ========================================================

    CHATBOT_ENABLED = os.getenv(
        "CHATBOT_ENABLED",
        "true"
    ).lower() == "true"

    SYMPTOM_ANALYSIS_ENABLED = os.getenv(
        "SYMPTOM_ANALYSIS_ENABLED",
        "true"
    ).lower() == "true"

    MEDICINE_ANALYSIS_ENABLED = os.getenv(
        "MEDICINE_ANALYSIS_ENABLED",
        "true"
    ).lower() == "true"

    DISEASE_PREDICTION_ENABLED = os.getenv(
        "DISEASE_PREDICTION_ENABLED",
        "true"
    ).lower() == "true"

    OCR_ENABLED = os.getenv(
        "OCR_ENABLED",
        "true"
    ).lower() == "true"

    HEALTH_ANALYTICS_ENABLED = os.getenv(
        "HEALTH_ANALYTICS_ENABLED",
        "true"
    ).lower() == "true"

    HEALTH_RECORDS_ENABLED = os.getenv(
        "HEALTH_RECORDS_ENABLED",
        "true"
    ).lower() == "true"

    RECOMMENDATIONS_ENABLED = os.getenv(
        "RECOMMENDATIONS_ENABLED",
        "true"
    ).lower() == "true"

    AGENT_ENABLED = os.getenv(
        "AGENT_ENABLED",
        "true"
    ).lower() == "true"


    # ========================================================
    # LOGGING
    # ========================================================

    LOG_LEVEL = os.getenv(
        "LOG_LEVEL",
        "INFO"
    )

    LOG_FILE = os.getenv(
        "LOG_FILE",
        str(BASE_DIR / "healthgpt.log")
    )


# ============================================================
# GLOBAL SETTINGS INSTANCE
# ============================================================

settings = Settings()