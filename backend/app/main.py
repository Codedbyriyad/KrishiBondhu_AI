from fastapi import APIRouter, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.core.config import get_settings
from app.database.session import engine
from app.routers import auth, weather

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

# All versioned API routes live under /api/v1. Each router below already
# defines its own resource prefix (e.g. "/auth", "/weather"), so mounting
# them on api_router (not directly on `app`) yields /api/v1/auth/*,
# /api/v1/weather/*, etc. with no double-prefixing.
api_router = APIRouter(prefix="/api/v1")
api_router.include_router(auth.router)
api_router.include_router(weather.router)

app.include_router(api_router)


@app.get("/", tags=["Health"])
def read_root() -> dict[str, str]:
    return {"status": "ok", "message": f"{settings.app_name} is running"}


@app.get("/health", tags=["Health"])
def health_check() -> dict[str, str]:
    return {"status": "healthy"}


@app.get("/health/db", tags=["Health"])
async def db_health_check() -> dict[str, str]:
    async with engine.connect() as connection:
        await connection.execute(text("SELECT 1"))
    return {"status": "database connected"}