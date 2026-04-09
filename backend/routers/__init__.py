from fastapi import APIRouter

from .items import router as items_router
from .users import router as users_router
from .partners import router as partners_router
from .auth import router as auth_router
from .cart import router as cart_router
from .files import router as files_router
from .seo import router as seo_router

router = APIRouter()

router.include_router(items_router, prefix="/items", tags=["items"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(partners_router, prefix="/partners", tags=["partners"])
router.include_router(auth_router, prefix="/auth", tags=["auth"])
router.include_router(cart_router, prefix="/cart", tags=["cart"])
router.include_router(files_router, prefix="/files", tags=["files"])
router.include_router(seo_router, prefix="/seo", tags=["seo"])
