import React from "react";
import "../config/css/weather-icons.css";
import styled from "styled-components";

const KetoCe = kelvin => {
  return (kelvin - 273.15).toFixed(1);
};

const Icon = styled.i`
  font-size: 300px;
`;

const FlexContainer = styled.div`
  display: flex;
`;

const WeatherInfo = props => {
  let weatherIcon;
  const weatherId = props.weather.weather[0].id;
  if (weatherId === 800) weatherIcon = "wi-day-sunny";
  else if (weatherId === 801) weatherIcon = "wi-day-cloudy";
  else if (weatherId > 800 && weatherId < 900) weatherIcon = "wi-cloud";
  else if (weatherId > 700 && weatherId < 800) weatherIcon = "wi-dust";
  else if (weatherId >= 600 && weatherId < 700) weatherIcon = "wi-snow";
  else if (weatherId >= 500 && weatherId < 505) weatherIcon = "wi-rain";
  else if (weatherId === 511) weatherIcon = "wi-hail";
  else if (weatherId >= 200 && weatherId < 300) weatherIcon = "wi-thunderstorm";
  else weatherIcon = "wi-showers";

  return (
    <FlexContainer>
      <Icon className={`wi ${weatherIcon}`} />
      <div>
        <h1>{props.weather.name}의 날씨</h1>
        <h2>현재 기온: {KetoCe(props.weather.main.temp)}℃</h2>
        <h2>최고 기온: {KetoCe(props.forecast.maxTemp)}℃</h2>
        <h2>최저 기온: {KetoCe(props.forecast.minTemp)}℃</h2>
      </div>
    </FlexContainer>
  );
};

export default WeatherInfo;
