from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import get_settings
from app.database.session import engine
from app.routers import auth, chat, weather

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    description="Production-ready backend for AI-powered agriculture assistant",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API v1
app.include_router(auth.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
app.include_router(weather.router, prefix="/api/v1")


@app.get("/", tags=["Health"])
def read_root() -> dict[str, str]:
    return {
        "status": "ok",
        "message": f"{settings.app_name} is running",
    }


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.get("/health/db", tags=["Health"])
async def db_health_check() -> dict[str, str]:
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))

    return {"status": "database connected"}