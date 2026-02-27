from models.item import Item
from models.partner import Partner
from models.rbac import Role
from models.user import User
from sqlalchemy.orm import Session


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, username: int):
    return db.query(User).filter(User.login == username).first()


def get_full_role_by_name(db: Session, role_name):
    return db.query(Role).filter_by(name=role_name).first()


def get_partner_by_id(db: Session, partner_id: int):
    return db.query(Partner).filter(Partner.id == partner_id).first()


def get_item_by_id(db: Session, item_id: int):
    return db.query(Item).filter(Item.id == item_id).first()
