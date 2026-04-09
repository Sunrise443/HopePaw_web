import httpx
from core.config import settings


class OpenWeatherAdapter:
    def __init__(self):
        self.base_url = settings.openweather_base_url
        self.api_key = settings.openweather_api_key

    async def get_current_weather(self, city: str):
        url = f"{self.base_url}/weather"

        params = {
            "q": city,
            "appid": "6f588fb0556a5606250c067e191afdef",
            "units": "metric",
        }

        async with httpx.AsyncClient(timeout=5.0) as client:
            try:
                response = await client.get(url, params=params)
                print(f"Request URL: {response.request.url}")
                response.raise_for_status()
                return response.json()
            except httpx.RequestError:
                raise Exception("Error connecting to OpenWeather")
            except httpx.HTTPStatusError:
                raise Exception("Error response from OpenWeather")
