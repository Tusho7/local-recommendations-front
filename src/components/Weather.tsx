import { useState, useEffect } from "react";
import SunIcon from "../dynamicIcons/Sun";
import { weather } from "../services/admin/weather";
import { WeatherData } from "../types/weather";

const WeatherComponent = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await weather();
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  const translations = {
    title: "ამინდის პროგნოზი",
    currentTemperature: "მიმდინარე ტემპერატურა:",
    windSpeed: "ქარის სიჩქარე:",
    todayOverview: "დღის მიმოხილვა",
    humidity: "ტენიანობა:",
    windDetails: "ქარის დეტალები",
    loading: "ამინდის მონაცემები იტვირთება...",
  };

  return (
    <div className="weather-container bg-white rounded-lg shadow-2xl p-6 mt-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <SunIcon color="#FFA500" size={64} />
          <h2 className="text-2xl font-semibold ml-4">{translations.title}</h2>
        </div>
        {weatherData && (
          <div className="flex items-center">
            <p className="text-lg mr-4">
              <strong>{translations.currentTemperature}</strong>{" "}
              {weatherData.current.temperature_2m} °C
            </p>
            <p className="text-lg">
              <strong>{translations.windSpeed}</strong>{" "}
              {weatherData.current.wind_speed_10m} m/s
            </p>
          </div>
        )}
      </div>

      {weatherData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">
              {translations.todayOverview}
            </h3>
            <p className="text-lg">
              <strong>{translations.currentTemperature}</strong>{" "}
              {weatherData.current.temperature_2m} °C
            </p>
            <p className="text-lg">
              <strong>{translations.humidity}</strong>{" "}
              {weatherData.hourly.relative_humidity_2m[0]} %
            </p>
          </div>

          <div className="bg-green-200 rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">
              {translations.windDetails}
            </h3>
            <p className="text-lg">
              <strong>{translations.windSpeed}</strong>{" "}
              {weatherData.current.wind_speed_10m} m/s
            </p>
          </div>
        </div>
      ) : (
        <p className="text-lg">{translations.loading}</p>
      )}
    </div>
  );
};

export default WeatherComponent;
