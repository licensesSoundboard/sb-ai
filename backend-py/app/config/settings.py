# app/config/settings.py
from pydantic import BaseSettings  # Use this instead of pydantic_settings
from typing import Optional

class Settings(BaseSettings):
    # Environment
    environment: str = "development"
    log_level: str = "INFO"
    
    # Service URLs
    ts_service_url: str = "http://localhost:4000"

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()