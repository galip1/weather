import React, { useState, useEffect } from "react";
import axios from "axios";
import "./weather.scss";
import moment from "moment";
import { FaSearch } from "react-icons/fa";
const apiKey = "ad59d5cbac87957a0446e23413741628"; // API anahtarınızı buraya girin

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = async (e) => {
    if (e.key === "Enter") {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`
      );
      setWeather(data);
      setLoading(false);
      setQuery("");
    }
  };
  return (
    <div className="App">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Enter city name..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
        <FaSearch className="search-icon" onClick={search} />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {weather.main && (
            <div className="weather-box">
              <div className="city">{weather.name}</div>
              <div className="date">{moment().format("MMMM Do YYYY")}</div>
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Weather;
