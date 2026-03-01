from database import get_db
from deps import get_current_user
from fastapi import APIRouter, Depends, HTTPException, status
from models.user import User
from services.crud import get_item_by_id
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/items/{item_id}")
def add_item_to_cart(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = get_item_by_id(db, item_id)

    if not item:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Item not found")

    if item in current_user.cart:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Item already in cart"
        )  # нужно просто добавлять количество

    current_user.cart.append(item)
    db.commit()

    return {"status": "ok"}


@router.get("/items/")
def get_cart_items(
    current_user: User = Depends(get_current_user),
):
    return current_user.cart


@router.delete("/items/{item_id}")
def remove_item_from_cart(
    item_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    item = get_item_by_id(db, item_id)

    if not item or item not in current_user.cart:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not in cart"
        )

    current_user.cart.remove(item)
    db.commit()

    return {"status": "removed"}
