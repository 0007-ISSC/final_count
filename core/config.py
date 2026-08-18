from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Global HealthGPT application configuration.

    Values can be loaded from a .env file or environment variables.
    """

    # Application
    app_name: str = "HealthGPT"
    app_version: str = "1.0.0"
    debug: bool = True

    # Security
    secret_key: str = "CHANGE_THIS_SECRET_KEY"
    access_token_expire_minutes: int = 60 * 24

    # Database
    # SQLite is used initially so the project can run immediately.
    # Later this can be changed to PostgreSQL.
    database_url: str = "sqlite:///./healthgpt.db"

    # LLM
    llm_provider: str = "demo"
    llm_api_key: str = ""
    llm_api_url: str = ""

    # Frontend
    cors_origins: str = (
        "http://localhost:3000,"
        "http://localhost:5173,"
        "http://127.0.0.1:5500,"
        "http://localhost:5500"
    )

    # Uploads
    max_upload_size_mb: int = 10

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )


settings = Settings()


def get_cors_origins() -> list[str]:
    """
    Convert comma-separated CORS origins into a Python list.
    """

    if not settings.cors_origins:
        return []

    return [
        origin.strip()
        for origin in settings.cors_origins.split(",")
        if origin.strip()
    ]