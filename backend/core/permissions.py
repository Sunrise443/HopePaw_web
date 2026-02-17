from enum import Enum


class PermissionEnum(str, Enum):
    # Products
    PRODUCT_VIEW = "product:view"
    PRODUCT_CREATE = "product:create"
    PRODUCT_UPDATE = "product:update"
    PRODUCT_DELETE = "product:delete"

    # Partners
    PARTNER_VIEW = "partner:view"
    PARTNER_CREATE = "partner:create"
    PARTNER_UPDATE = "partner:update"
    PARTNER_DELETE = "partner:delete"

    # Users
    MANAGE_ROLES = "user:manage_roles"
