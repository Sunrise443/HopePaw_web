from typing import List

from core.permissions import PermissionEnum
from database import get_db
from deps import require_permission
from fastapi import APIRouter, Depends, HTTPException, status
from models.partner import Partner
from models.user import User
from schemas.partners import PartnerBase, PartnerUpdate
from services.crud import get_partner_by_id
from sqlalchemy.orm import Session


router = APIRouter()


@router.post("/partners/", response_model=PartnerBase)
def create_partner(
    partner: PartnerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PARTNER_CREATE)),
):
    db_partner = Partner(**partner.dict())

    db.add(db_partner)
    db.commit()
    db.refresh(db_partner)
    return db_partner


@router.get("/partners/", response_model=List[PartnerBase])
def get_partners(db: Session = Depends(get_db)):
    query = db.query(Partner)

    if query is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, detail="Partners not found")

    return query.all()


@router.delete("/partner/{partner_id}", response_model=PartnerBase)
def delete_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PARTNER_DELETE)),
):
    partner_to_delete = get_partner_by_id(db, partner_id)

    if partner_to_delete is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Partner not found"
        )

    db.delete(partner_to_delete)
    db.commit()

    return partner_to_delete


@router.patch("/partner/{partner_id}/", response_model=PartnerBase)
def edit_partner(
    partner_id: int,
    data: PartnerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_permission(PermissionEnum.PARTNER_UPDATE)),
):
    partner_to_update = get_partner_by_id(db, partner_id)

    if partner_to_update is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Partner not found"
        )

    update_data = data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(partner_to_update, field, value)

    db.commit()
    db.refresh(partner_to_update)

    return partner_to_update
