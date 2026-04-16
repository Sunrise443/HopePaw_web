import pytest
from deps import require_permission
from fastapi.testclient import TestClient
from main import app
from models.user import User


@pytest.fixture
def client():
    return TestClient(app)


@pytest.fixture
def auth_headers():
    return {"Authorization": "Bearer test_token"}


@pytest.fixture(autouse=True)
def override_auth():
    def fake_user():
        return User(id=1, email="test@test.com")

    app.dependency_overrides[require_permission] = lambda *args, **kwargs: fake_user()

    yield

    app.dependency_overrides.clear()
