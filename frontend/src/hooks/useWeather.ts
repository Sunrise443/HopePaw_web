import { useState, useEffect } from "react";
import type { WeatherData } from "@/types/weather";
import { getWeather } from "@/api/weather";

export const useWeather = (city: string) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getWeather(city)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError("Не удалось загрузить данные");
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [city]);

  return { data, loading, error };
};
