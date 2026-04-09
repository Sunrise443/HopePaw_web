import api from "./axios";
import type { WeatherData } from "@/types/weather";

export const getWeather = (city: string) => {
  return api.get<WeatherData>(`/weather/weather/?city=${city}`);
};
