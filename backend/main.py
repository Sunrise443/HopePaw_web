from typing import List, Optional

import models
import schemas
from database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from sqlalchemy.orm import Session


models.Base.metadata.create_all(bind=engine)

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
@app.get("/items/", response_model=List[schemas.ItemBase])
def read_items(
    db: Session = Depends(get_db),
    max_price: Optional[int] = Query(None, description="Filter items by price"),
    category_id: Optional[int] = Query(None, description="Filter items by category"),
    pet_type_id: Optional[int] = Query(None, description="Filter items by pet_type"),
    sort_by_popularity: bool = Query(False, description="Sort by number of buyers"),
):
    query = db.query(models.Item)

    if sort_by_popularity:
        query = (
            query.outerjoin(models.user_items)
            .group_by(models.Item.id)
            .order_by(func.count(models.user_items.c.user_id).desc())
        )

    if max_price is not None:
        query = query.filter(models.Item.price <= max_price)
    if category_id is not None:
        query = query.filter(models.Item.category_id == category_id)
    if pet_type_id is not None:
        query = query.filter(models.Item.pet_type_id == category_id)

    if query is None:
        raise HTTPException(status_code=404, detail="Items not found")

    items = query.all()

    return items


@app.post("/item/", response_model=schemas.ItemBase)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = models.Item(**item.dict())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


@app.get("/item/{item_id}/", response_model=schemas.ItemCardRead)
def read_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return item


# USER
@app.post("/user/", response_model=schemas.UserRead)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


@app.get("/user/{user_id}", response_model=schemas.UserRead)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@app.put("/user/{user_id}", response_model=schemas.UserRead)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")

    for field, value in user.dict().items():
        setattr(db_user, field, value)

    db.commit()
    db.refresh(db_user)
    return db_user
