import React, { useState } from "react";

const WeatherCard = ({ weather, temperature }) => {
  const [isCelsius, setIsCelsius] = useState(true);
  const handleChangeTemp = () => setIsCelsius(!isCelsius);

  return (
    <article className="container">
      <h1>Weather App</h1>
      <h2>
        {weather?.name} , {weather?.sys.country}
      </h2>
      <section className="container-section">
        <header>
          <img
            src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`}
            alt=""
          />
        </header>
        <article className="container-article">
          <h3>{weather?.weather[0].description}</h3>
          <ul>
            <li>
              Wind Speed <span>{weather?.wind.speed} m/s</span>{" "}
            </li>
            <li>
              Clouds <span>{weather?.clouds.all} %</span>{" "}
            </li>
            <li>
              Pressure <span>{weather?.main.pressure} hPa</span>
            </li>
          </ul>
        </article>
      </section>
      <footer>
        <h2>
          {isCelsius
            ? `${temperature?.celsius} °C`
            : `${temperature?.farenheit} °F`}
        </h2>
        <button className="button" onClick={handleChangeTemp}>
          Change to {isCelsius ? "°F" : "°C"}
        </button>
      </footer>
    </article>
  );
};

export default WeatherCard;
