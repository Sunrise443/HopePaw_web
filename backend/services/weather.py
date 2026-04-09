from adapters.openweather_adapter import OpenWeatherAdapter


class WeatherService:
    def __init__(self):
        self.adapter = OpenWeatherAdapter()

    async def get_weather(self, city: str):
        data = await self.adapter.get_current_weather(city)

        return {
            "city": data["name"],
            "temperature": data["main"]["temp"],
            "description": data["weather"][0]["description"],
            "icon": data["weather"][0]["icon"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "main": data["weather"][0]["main"],
        }
