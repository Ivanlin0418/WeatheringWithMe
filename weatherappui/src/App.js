import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeather } from './Components/Fetchweather';
import Forecast from './Components/Forecast';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await fetchWeather(query);
      setWeather(data);
    };

    fetchWeatherData();
  }, [query, weather]);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Rochester"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && setQuery(e.target.value)}
        style={{ fontSize: '20px', color: 'black' }}
      />
      {weather.main && (
        <div key={weather.main.temp} className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weather.main.temp * 1.8 + 32)}
            <sup>&deg;F</sup>
          </div>
          <div className="Feels Like">
            <p>
              Feels Like {Math.round(weather.main.feels_like * 1.8 + 32)}
              <sup>&deg;F</sup>
            </p>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
      {weather.main && <Forecast WeatherData={weather}/>}
    </div>
  );
};

export default App;
