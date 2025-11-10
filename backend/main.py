from typing import List, Optional

import schemas
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from models.base import Base
from models.item import Item
from models.partner import Partner
from models.user import User
from sqlalchemy import func
from sqlalchemy.orm import Session


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ITEMS
@app.post("/item/", response_model=schemas.ItemBase)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/items/", response_model=List[schemas.ItemBase])
def read_items(
    db: Session = Depends(get_db),
    max_price: Optional[int] = Query(None, description="Filter items by price"),
    category_id: Optional[int] = Query(None, description="Filter items by category"),
    pet_type_id: Optional[int] = Query(None, description="Filter items by pet_type"),
    sort_by_popularity: bool = Query(False, description="Sort by number of buyers"),
):
    query = db.query(Item)

    if sort_by_popularity:
        query = (
            query.outerjoin(User.user_items)
            .group_by(Item.id)
            .order_by(func.count(User.user_items.c.user_id).desc())
        )

    if max_price is not None:
        query = query.filter(Item.price <= max_price)
    if category_id is not None:
        query = query.filter(Item.category_id == category_id)
    if pet_type_id is not None:
        query = query.filter(Item.pet_type_id == category_id)

    if query is None:
        raise HTTPException(status_code=404, detail="Items not found")

    items = query.all()

    return items


@app.get("/item/{item_id}/", response_model=schemas.ItemCardRead)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(Item).filter(Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


@app.delete("/item/{item_id}", response_model=schemas.ItemCardRead)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    item_to_delete = db.query(Item).filter(Item.id == item_id).first()

    if item_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(item_to_delete)
    db.commit()

    return item_to_delete


# USER
@app.post("/user/", response_model=schemas.UserRead)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/user/{user_id}", response_model=schemas.UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/user/{user_id}", response_model=schemas.UserRead)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in user.dict().items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user


@app.delete("/user/{user_id}", response_model=schemas.UserRead)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_to_delete = db.query(User).filter(User.id == user_id).first()

    if user_to_delete is None:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user_to_delete)
    db.commit()

    return user_to_delete


# PARTNERS
@app.post("/partners/", response_model=schemas.Partner)
def create_partner(partner: schemas.Partner, db: Session = Depends(get_db)):
    db_partner = Partner(**partner.dict())

    db.add(db_partner)
    db.commit()
    db.refresh(db_partner)
    return db_partner


@app.get("/partners/", response_model=List[schemas.Partner])
def get_partners(db: Session = Depends(get_db)):
    query = db.query(Partner)

    if query is None:
        raise HTTPException(status_code=404, detail="Partners not found")

    return query.all()


@app.delete("/partner/{partner_id}", response_model=schemas.ItemCardRead)
def delete_partner(partner_id: int, db: Session = Depends(get_db)):
    partner_to_delete = db.query(Partner).filter(Partner.id == partner_id).first()

    if partner_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(partner_to_delete)
    db.commit()

    return partner_to_delete
