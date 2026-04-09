import { useWeather } from "@/hooks/useWeather";

const getWeatherBackground = (main: string, icon: string) => {
  const isDay = icon.endsWith("d");

  switch (main) {
    case "Clear":
      return isDay
        ? "bg-gradient-to-br from-yellow-300 to-orange-400"
        : "bg-gradient-to-br from-gray-800 to-blue-900";
    case "Clouds":
      return isDay
        ? "bg-gradient-to-br from-gray-300 to-gray-500"
        : "bg-gradient-to-br from-gray-700 to-gray-900";
    case "Rain":
    case "Drizzle":
      return "bg-gradient-to-br from-blue-500 to-blue-800";
    case "Thunderstorm":
      return "bg-gradient-to-br from-gray-800 to-black";
    case "Snow":
      return "bg-gradient-to-br from-blue-100 to-white";
    case "Mist":
    case "Fog":
      return "bg-gradient-to-br from-gray-400 to-gray-600";
    default:
      return "bg-gradient-to-br from-gray-200 to-gray-400";
  }
};

export const WeatherWidget = ({ city }: { city: string }) => {
  const { data, loading, error } = useWeather(city);

  if (loading)
    return <p className="text-center text-gray-200">Загрузка погоды...</p>;
  if (error) return <p className="text-center text-red-300">{error}</p>;
  if (!data) return <p className="text-center text-gray-300">Нет данных</p>;

  return (
    <div
      className={`p-6 rounded-[30px] shadow-xl text-white w-[300px] md:w-[400px] ${getWeatherBackground(data.main, data.icon)}`}
    >
      <h2 className="text-2xl font-bold mb-2 text-center">{city}</h2>
      <div className="flex items-center justify-center gap-4">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={
            data.description.charAt(0).toUpperCase() + data.description.slice(1)
          }
          className="w-20 h-20"
        />
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
