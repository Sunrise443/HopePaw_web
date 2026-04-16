from fastapi.testclient import TestClient
from main import app


client = TestClient(app)


def test_read_items_invalid_page(client):
    response = client.get("/items/items/?page=0")

    assert response.status_code == 422


def test_read_items_per_page_limit(client):
    response = client.get("/items/items/?per_page=101")

    assert response.status_code == 422


def test_read_items_page_not_found(client):
    response = client.get("/items/items/?page=9999")

    assert response.status_code == 404


def test_read_items_empty_result(client):
    response = client.get("/items/items/?max_price=1")

    assert response.status_code == 200
    assert response.json()["items"] == []


def test_delete_item_no_permission(client):
    response = client.delete("/items/item/1/delete/")

    assert response.status_code in [401, 403]
