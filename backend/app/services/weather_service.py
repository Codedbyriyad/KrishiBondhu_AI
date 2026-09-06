import uuid

import httpx
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.weather_history import WeatherHistory
from app.schemas.weather import WeatherResponse

settings = get_settings()


def generate_agriculture_advice(weather_condition: str, humidity: float, temperature: float) -> str:
    condition_lower = weather_condition.lower()

    if "rain" in condition_lower or "drizzle" in condition_lower or "thunderstorm" in condition_lower:
        return "বৃষ্টির সম্ভাবনা রয়েছে। সার প্রয়োগ ও কীটনাশক স্প্রে করা এড়িয়ে চলুন।"

    if temperature >= 35:
        return "তাপমাত্রা বেশি। ফসলে পর্যাপ্ত সেচ দিন এবং দুপুরের সময় স্প্রে করা এড়িয়ে চলুন।"

    if humidity >= 80:
        return "আর্দ্রতা বেশি হওয়ায় ছত্রাকজনিত রোগের ঝুঁকি বাড়তে পারে, ফসল পর্যবেক্ষণ করুন।"

    if temperature <= 10:
        return "তাপমাত্রা কম। ঠান্ডা-সংবেদনশীল ফসল রক্ষা করার ব্যবস্থা নিন।"

    return "আবহাওয়া অনুকূল রয়েছে। পরিকল্পনা অনুযায়ী কৃষিকাজ চালিয়ে যেতে পারেন।"


async def fetch_current_weather(location_name: str) -> WeatherResponse:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{settings.openweather_base_url}/weather",
            params={
                "q": location_name,
                "appid": settings.openweather_api_key,
                "units": "metric",
            },
            timeout=10.0,
        )

    if response.status_code == 404:
        raise ValueError("Location not found.")

    response.raise_for_status()
    data = response.json()

    weather_condition = data["weather"][0]["main"]
    weather_description = data["weather"][0]["description"]
    temperature = data["main"]["temp"]
    humidity = data["main"]["humidity"]

    advice = generate_agriculture_advice(weather_condition, humidity, temperature)

    return WeatherResponse(
        location_name=data.get("name", location_name),
        latitude=data["coord"]["lat"],
        longitude=data["coord"]["lon"],
        temperature=temperature,
        feels_like=data["main"]["feels_like"],
        humidity=humidity,
        weather_condition=weather_condition,
        weather_description=weather_description,
        wind_speed=data["wind"]["speed"],
        pressure=data["main"]["pressure"],
        agriculture_advice=advice,
    )


async def save_weather_history(
    db: AsyncSession, user_id: uuid.UUID, weather_data: WeatherResponse
) -> WeatherHistory:
    history_entry = WeatherHistory(
        user_id=user_id,
        location_name=weather_data.location_name,
        latitude=weather_data.latitude,
        longitude=weather_data.longitude,
        temperature=weather_data.temperature,
        humidity=weather_data.humidity,
        weather_condition=weather_data.weather_condition,
        agriculture_advice=weather_data.agriculture_advice,
    )
    db.add(history_entry)
    await db.commit()
    await db.refresh(history_entry)
    return history_entry