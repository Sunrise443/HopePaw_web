def test_read_items(client):
    response = client.get("/items/items/")

    assert response.status_code == 200
    data = response.json()

    assert "items" in data
    assert "total" in data
    assert data["page"] == 1


def test_read_items_with_filters(client):
    response = client.get("/items/items/?max_price=500")

    assert response.status_code == 200
    data = response.json()

    for item in data["items"]:
        assert item["price"] <= 500


def test_read_item_not_found(client):
    response = client.get("/items/item/999999/")

    assert response.status_code == 404
    assert response.json()["detail"] == "Item not found"
