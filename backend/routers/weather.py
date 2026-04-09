from fastapi import APIRouter, HTTPException
from services.weather import WeatherService


router = APIRouter()
service = WeatherService()


@router.get("/weather")
async def get_weather(city: str):
    try:
        return await service.get_weather(city)
    except Exception as e:
        raise HTTPException(e)
