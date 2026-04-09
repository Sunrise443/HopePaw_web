import { useWeather } from "@/hooks/useWeather";

export const WeatherWidget = ({ city }: { city: string }) => {
  const { data, loading, error } = useWeather(city);

  if (loading)
    return <p className="text-center text-gray-200">Загрузка погоды...</p>;
  if (error) return <p className="text-center text-red-300">{error}</p>;
  if (!data) return <p className="text-center text-gray-300">Нет данных</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-2">{city}</h2>
      <div className="flex items-center gap-4">
        {data.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
            alt={data.description}
            className="w-20 h-20"
          />
        )}
        <div className="flex flex-col text-center">
          <p className="text-4xl font-bold">{data.temperature}°C</p>
          <p className="capitalize">{data.description}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-around w-full">
        <div className="flex flex-col items-center">
          <p className="font-semibold">Влажность</p>
          <p>{data.humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-semibold">Ветер</p>
          <p>{data.wind_speed} м/с</p>
        </div>
      </div>
    </div>
  );
};
