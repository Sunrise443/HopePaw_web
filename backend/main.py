from contextlib import asynccontextmanager

from database import SessionLocal, engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.base import Base
from routers import router
from services.rbac_init import init_rbac


Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up: Init DB")
    db = SessionLocal()
    init_rbac(db)
    db.close()

    yield
    print("Shutting down: Close DB")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
