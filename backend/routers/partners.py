from typing import List

import schemas
from database import get_db
from fastapi import APIRouter, Depends, HTTPException
from models.partner import Partner
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/partners/", response_model=schemas.Partner)
def create_partner(partner: schemas.Partner, db: Session = Depends(get_db)):
    db_partner = Partner(**partner.dict())

    db.add(db_partner)
    db.commit()
    db.refresh(db_partner)
    return db_partner


@router.get("/partners/", response_model=List[schemas.Partner])
def get_partners(db: Session = Depends(get_db)):
    query = db.query(Partner)

    if query is None:
        raise HTTPException(status_code=404, detail="Partners not found")

    return query.all()


@router.delete("/partner/{partner_id}", response_model=schemas.ItemCardRead)
def delete_partner(partner_id: int, db: Session = Depends(get_db)):
    partner_to_delete = db.query(Partner).filter(Partner.id == partner_id).first()

    if partner_to_delete is None:
        raise HTTPException(status_code=404, detail="Item not found")

    db.delete(partner_to_delete)
    db.commit()

    return partner_to_delete
