from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


def test_items_response_structure():
    response = client.get("/items/items/")
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert "total" in data
    assert "page" in data
    assert "per_page" in data
    assert "total_pages" in data


def test_invalid_input():
    response = client.get("/items/item/invalid")

    assert response.status_code == 422
