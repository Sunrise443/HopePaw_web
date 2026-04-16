from database import get_db
from fastapi.testclient import TestClient
from main import app
from services.minio import FileService


client = TestClient(app)


def override_get_db():
    from database import SessionLocal

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


class OverrideFileService:
    def __init__(self, db):
        pass

    def get_presigned_url_public(self, file_id):
        return "http://test-url"


app.dependency_overrides[get_db] = override_get_db
app.dependency_overrides[FileService] = OverrideFileService


def test_read_items():
    response = client.get("/items/items/")

    assert response.status_code == 200
    data = response.json()

    assert "items" in data
    assert "total" in data
    assert data["page"] == 1


def test_read_items_with_filters():
    response = client.get("/items/items/?max_price=500")

    assert response.status_code == 200
    data = response.json()

    for item in data["items"]:
        assert item["price"] <= 500


def test_read_item_not_found():
    response = client.get("/items/item/999999/")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"
