import os
import uuid

import pytest
from adapters.openweather_adapter import OpenWeatherAdapter
from core.minio_init import minio_client
from database import get_db  # noqa: E402
from fastapi.testclient import TestClient
from main import app  # noqa: E402
from models.base import Base
from models.category import Category
from models.file import FileModel
from models.item import Item
from models.partner import Partner
from models.pet_type import PetType
from models.rbac import Role
from models.user import User
from services.minio import FileService
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool


# Dedicated test environment (must be set before app imports)
os.environ.setdefault("TESTING", "1")
os.environ.setdefault("DATABASE_URL", "sqlite+pysqlite:///:memory:")
os.environ.setdefault("openweather_api_key", "test-api-key")
os.environ.setdefault("openweather_base_url", "https://test-weather.local")


@pytest.fixture
def db_session():
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    Base.metadata.create_all(bind=engine)

    db = TestingSessionLocal()
    role = Role(name="user")
    user = User(
        login="test_user",
        hashed_password="hashed",
        is_active=True,
        email="test@test.com",
        city="Test city",
        money_sent=0,
        role=role,
    )
    partner = Partner(name="Test partner", description="Test partner description")
    category = Category(name="Food")
    pet_type = PetType(name="Dog")
    db.add_all([role, user, partner, category, pet_type])
    db.flush()

    file_obj = FileModel(
        id=str(uuid.uuid4()),
        filename="test.jpg",
        key="test/key.jpg",
        size=100,
        content_type="image/jpeg",
        owner_id=user.id,
    )
    item_with_file = Item(
        name="Premium food",
        description="Good food",
        vendor_id=partner.id,
        price=450,
        pet_type_id=pet_type.id,
        category_id=category.id,
        file=file_obj,
    )
    item_without_file = Item(
        name="Toy",
        description="Fun toy",
        vendor_id=partner.id,
        price=50,
        pet_type_id=pet_type.id,
        category_id=category.id,
    )

    db.add_all([file_obj, item_with_file, item_without_file])
    db.commit()

    try:
        yield db
    finally:
        db.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


@pytest.fixture
def client(db_session, monkeypatch):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    monkeypatch.setattr(
        FileService, "get_presigned_url_public", lambda self, file_id: "http://test-url"
    )
    monkeypatch.setattr("main.init_bucket", lambda: None)
    monkeypatch.setattr("main.init_rbac", lambda db: None)

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()


@pytest.fixture(autouse=True)
def mock_external_dependencies(monkeypatch):
    async def fake_weather(self, city: str):
        return {
            "name": city,
            "main": {"temp": 20, "humidity": 50},
            "weather": [{"description": "clear sky", "icon": "01d", "main": "Clear"}],
            "wind": {"speed": 3.0},
        }

    monkeypatch.setattr(OpenWeatherAdapter, "get_current_weather", fake_weather)
    monkeypatch.setattr(minio_client, "put_object", lambda *args, **kwargs: None)
    monkeypatch.setattr(minio_client, "remove_object", lambda *args, **kwargs: None)
    monkeypatch.setattr(
        minio_client, "presigned_get_object", lambda *args, **kwargs: "http://test-url"
    )


@pytest.fixture
def auth_headers():
    return {"Authorization": "Bearer test_token"}
