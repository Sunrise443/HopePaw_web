from database import engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.base import Base
from routers import router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
