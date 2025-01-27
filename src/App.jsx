/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { CURRENT_BY_CITY } from "./config/actions";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Header from "./components/Header";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App(props) {
  const [input, setInput] = useState("");
  const [time, setTime] = useState("night");
  const [hour, setHour] = useState(null);

  const dispatch = useDispatch();

  const fetchWeather = (city = "Rabat") => {
    return async (dispatch, getState) => {
      try {
        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
        );
        if (res.ok) {
          const data = await res.json();
          dispatch({ payload: data, type: CURRENT_BY_CITY });
          setHour(
            parseInt(data.location.localtime.split(" ")[1].split(":")[0])
          );
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const search = () => {
    if (input) {
      let city = input.charAt(0).toUpperCase() + input.slice(1);
      dispatch(fetchWeather(city));
      setInput("");
    }
  };

  useEffect(() => {
    if (hour >= 1 && hour <= 6) {
      setTime("night");
    } else if (hour > 6 && hour <= 12) {
      setTime("morning");
    } else if (hour > 12 && hour <= 18) {
      setTime("afternoon");
    } else if (hour > 18) {
      setTime("night");
    }
  }, [hour]);

  useEffect(() => {
    if (props.weather && Object.keys(props.weather).length === 0) {
      dispatch(fetchWeather("Rabat"));
    }
  }, [dispatch, props.weather]);

  if (!props.weather || Object.keys(props.weather).length === 0) {
    return <p>...Loading</p>;
  } else {
    return (
      <div className={"d-flex flex-column app " + time}>
        <Header />
        <div className="d-flex justify-content-center gap-1 mb-5">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <i
            className="bi bi-search btn btn-primary px-3 py-1"
            onClick={search}
          ></i>
        </div>

        <div className="box px-5 col-12 d-flex">
          <div className="container p-5 col-12 d-flex flex-wrap">
            <div id="left" className="col-12 col-md-6 d-flex flex-column p-3">
              <h1>
                {days[props.weather.current.is_day]}
                <img
                  src={props.weather.current.condition.icon}
                  alt="weather icon"
                />
              </h1>
              <h1 className="display-1">
                <b>{props.weather.current.temp_c} &deg;C</b>
              </h1>
              <h5 className="">{props.weather.current.temp_f} &deg;F</h5>
              <p>
                <b>Condition</b>: {props.weather.current.condition.text}
              </p>
            </div>

            <div className="col-12 col-md-6 d-flex flex-column align-items-start justify-content-end p-3">
              <h6>
                <b>Wind</b>: {props.weather.current.wind_kph} Km/h
              </h6>
              <h6>
                <b>Humidity</b>: {props.weather.current.humidity} g/m&#179;
              </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { weather: state.weather }; // Make sure you're accessing the right part of the state
}

function mapDispatchToProps(dispatch) {
  return {
    searchByCity: (city = "Rabat") => {
      dispatch({ type: CURRENT_BY_CITY, city });
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
