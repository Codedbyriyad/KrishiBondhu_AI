import uuid
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class WeatherRequest(BaseModel):
    location_name: str = Field(..., min_length=2, max_length=255)


class WeatherResponse(BaseModel):
    location_name: str
    latitude: float
    longitude: float
    temperature: float
    feels_like: float
    humidity: float
    weather_condition: str
    weather_description: str
    wind_speed: float
    pressure: float
    agriculture_advice: str


class WeatherHistoryRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    location_name: str
    latitude: float
    longitude: float
    temperature: float
    humidity: float
    weather_condition: str
    agriculture_advice: str | None
    searched_at: datetime