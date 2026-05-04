from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    secret_key: str = Field(default="dev-secret-change-in-production")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    refresh_token_expire_days: int = 7

    openweather_api_key: str = ""
    openweather_base_url: str = "https://api.openweathermap.org/data/2.5"

    minio_endpoint: str = "localhost:9000"
    minio_public_endpoint: str = ""
    minio_access_key: str = "minioadmin"
    minio_secret_key: str = "minioadmin"
    minio_bucket: str = "uploads"
    minio_secure: bool = False


settings = Settings()

SECRET_KEY = settings.secret_key
ALGORITHM = settings.algorithm
ACCESS_TOKEN_EXPIRE_MINUTES = settings.access_token_expire_minutes
REFRESH_TOKEN_EXPIRE_DAYS = settings.refresh_token_expire_days

MINIO_ENDPOINT = settings.minio_endpoint
MINIO_PUBLIC_ENDPOINT = settings.minio_public_endpoint
MINIO_ACCESS_KEY = settings.minio_access_key
MINIO_SECRET_KEY = settings.minio_secret_key
MINIO_BUCKET = settings.minio_bucket
MINIO_SECURE = settings.minio_secure
