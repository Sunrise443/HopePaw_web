from fastapi import APIRouter

from .items import router as items_router
from .users import router as users_router
from .partners import router as partners_router

router = APIRouter()

router.include_router(items_router, prefix="/items", tags=["items"])
router.include_router(users_router, prefix="/users", tags=["users"])
router.include_router(partners_router, prefix="/partners", tags=["partners"])
