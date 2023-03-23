import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchWeather } from './Components/Fetchweather';
import Forecast from './Components/Forecast';
import axios from 'axios';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [backgroundImage, setBackgroundImage] = useState('');

  const fetchWeatherData = async (q) => {
    const weatherData = await fetchWeather(q);

    const city = weatherData.name;
    const API_KEY = 'hBl7BeTXO8UrmjW5vTQlbS2ypUVMU16suUIyc1WYReto1Ov0Zq1YZVgy';
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${city}&per_page=1`, {
      headers: {
        Authorization: API_KEY
      }
    });
    const imageUrl = response.data.photos[0].src.original;
    setBackgroundImage(`url(${imageUrl})`);
    setWeather(weatherData);
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchWeatherData(query);
    }
  };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="main-container" style={{backgroundImage: backgroundImage}}>
      <input
        type="text"
        className="search"
        placeholder="Search for a location"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
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
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
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
