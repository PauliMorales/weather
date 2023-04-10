import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import Loading from "./components/Loading";
import SearchIcon from "./assets/icons/search.png";

function App() {
  const apiKey = "81c5255c810867c48a5582673381d0dc";
  const [latLon, setLatLon] = useState();
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [location, setLocation] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const success = (pos) => {
      const obj = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setLatLon(obj);
    };
    const error = (err) => {
      console.log(err);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  useEffect(() => {
    if (latLon) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${apiKey}`;
      axios
        .get(url)
        .then((res) => {
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);

          setTemperature({ celsius, farenheit });
          setWeather(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [latLon]);

  const getWeatherCity = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`
      )
      .then((response) => {
        setError(false);
        const celsius = (response.data.main.temp - 273.15).toFixed(1);
        const farenheit = ((celsius * 9) / 5 + 32).toFixed(1);

        setTemperature({ celsius, farenheit });
        setWeather(response.data);
        setLocation("");
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLocation("");
      });
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(./assets/images/${
          weather?.weather[0].icon || "02d"
        }.jpg)`,
      }}
    >
      {weather ? (
        <div>
          <form className="form-style" onSubmit={getWeatherCity} action="">
            <img src={SearchIcon} alt="" />
            <input
              className="input-style"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onClick={() => setError(false)}
              placeholder="Buscar"
            />
            <button className="button" type="submit">
              Search
            </button>
          </form>
          {error && (
            <p id="text" className="error-text">
              {" "}
              🔴🟡🟢 CITY NOT FOUND 🟢🟡🔴
            </p>
          )}
          <WeatherCard weather={weather} temperature={temperature} />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
