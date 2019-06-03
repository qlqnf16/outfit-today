import axios from "axios";

const weatherApiBase = axios.create({
  baseURL: `https://api.openweathermap.org/data/2.5/`,
  params: { appid: process.env.REACT_APP_WEATHER_KEY }
});

export const weatherApis = {
  currentWeather: (lon, lat) =>
    weatherApiBase.get("weather", { params: { lon, lat } }),
  weatherForecast: (lon, lat, cnt) =>
    weatherApiBase.get("forecast", { params: { lon, lat, cnt } })
};

const kakaoApiBase = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`
  }
});

export const kakaoApis = {
  geoCode: (x, y) =>
    kakaoApiBase.get("/v2/local/geo/coord2regioncode.json", {
      params: {
        x,
        y,
        output_coord: "TM"
      }
    })
};
