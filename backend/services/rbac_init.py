from sqlalchemy.orm import Session

from ..core.permissions import PermissionEnum
from ..models.rbac import Permission, Role


ROLE_MATRIX = {
    "guest": {
        "permissions": [
            PermissionEnum.PRODUCT_VIEW,
            PermissionEnum.PARTNER_VIEW,
        ]
    },
    "user": {
        "permissions": [
            PermissionEnum.PRODUCT_VIEW,
            PermissionEnum.PARTNER_VIEW,
        ]
    },
    "manager": {
        "permissions": [
            PermissionEnum.PARTNER_VIEW,
            PermissionEnum.PARTNER_CREATE,
            PermissionEnum.PARTNER_UPDATE,
            PermissionEnum.PARTNER_DELETE,
            PermissionEnum.PRODUCT_VIEW,
            PermissionEnum.PRODUCT_CREATE,
            PermissionEnum.PRODUCT_UPDATE,
            PermissionEnum.PRODUCT_DELETE,
        ]
    },
    "admin": {
        "permissions": list(PermissionEnum),
    },
}


def init_rbac(db: Session):
    permission_objects = {}

    for perm in PermissionEnum:
        db_perm = db.query(Permission).filter_by(name=perm.value).first()
        if not db_perm:
            db_perm = Permission(
                name=perm.value,
            )
            db.add(db_perm)
        permission_objects[perm] = db_perm

    db.commit()

    for role_name, role_data in ROLE_MATRIX.items():
        role = db.query(Role).filter_by(name=role_name).first()
        if not role:
            role = Role(
                name=role_name,
            )
            db.add(role)
            db.flush()

            for perm_enum in role_data["permissions"]:
                role.permissions.append(permission_objects[perm_enum])

    db.commit()
