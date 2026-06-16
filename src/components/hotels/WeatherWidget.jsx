import { useState, useEffect } from "react";
import { API } from "../../config";

export default function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`${API}/weather/${city}`);
      if (!res.ok) throw new Error("Weather unavailable");
      const data = await res.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setError("Weather unavailable");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-cloud rounded-2xl p-5 text-sm text-ash">
        Loading weather...
      </div>
    );
  }

  if (error || !weather) {
    return null; // hide the widget if weather fails
  }

  return (
    <div className="bg-skyora-gradient rounded-2xl p-5 text-white flex items-center justify-between">
      <div>
        <p className="text-[13px] font-medium opacity-90">Current weather in</p>
        <p className="text-lg font-extrabold">{weather.city}</p>
        <p className="text-[13px] capitalize opacity-90">
          {weather.description}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.description}
          className="w-14 h-14"
        />
        <p className="text-4xl font-extrabold">{weather.temp}°C</p>
      </div>
    </div>
  );
}
