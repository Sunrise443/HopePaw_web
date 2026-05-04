"""Configure process environment before importing application code (import side effects only)."""

import os


os.environ.setdefault("TESTING", "1")
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
os.environ.setdefault("OPENWEATHER_API_KEY", "test-api-key")
os.environ.setdefault("OPENWEATHER_BASE_URL", "https://test-weather.local")
