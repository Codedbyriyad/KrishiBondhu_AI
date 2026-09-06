from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import get_current_active_user
from app.database.session import get_db
from app.models.user import User
from app.models.weather_history import WeatherHistory
from app.schemas.weather import WeatherHistoryRead, WeatherRequest, WeatherResponse
from app.services.weather_service import fetch_current_weather, save_weather_history

router = APIRouter(prefix="/weather", tags=["Weather"])


@router.post("/current", response_model=WeatherResponse)
async def get_current_weather(
    payload: WeatherRequest,
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
) -> WeatherResponse:
    try:
        weather_data = await fetch_current_weather(payload.location_name)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to fetch weather data. Please try again later.",
        ) from exc

    await save_weather_history(db, current_user.id, weather_data)

    return weather_data


@router.get("/history", response_model=list[WeatherHistoryRead])
async def get_weather_history(
    current_user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
) -> list[WeatherHistoryRead]:
    result = await db.execute(
        select(WeatherHistory)
        .where(WeatherHistory.user_id == current_user.id)
        .order_by(WeatherHistory.searched_at.desc())
    )
    return result.scalars().all()