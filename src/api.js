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

// CORS ISSUE 발생, 서버 필요
const airKoreaApiBase = axios.create({
  baseURL: "http://openapi.airkorea.or.kr/openapi/services/rest/",
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  params: {
    serviceKey: process.env.REACT_APP_AIR_KOREA_KEY,
    _returnType: "json"
  }
});

export const airKoreaApis = {
  findNearStation: (tmX, tmY) =>
    airKoreaApiBase.get("MsrstnInfoInqireSvc/getNearbyMsrstnList", {
      params: {
        tmX,
        tmY
      }
    }),
  airCondition: stationName =>
    airKoreaApiBase.get("ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty", {
      params: {
        stationName,
        dataTerm: "DAILY"
      }
    })
};
