import axios from "axios";

const weatherApiBase = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  params: { appid: process.env.REACT_APP_WEATHER_KEY }
});

export const weatherApis = {
  currentWeather: q => weatherApiBase.get("weather", { params: { q } }),
  weatherForecast: (q, cnt) =>
    weatherApiBase.get("forecast", { params: { q, cnt } })
};
